#!/usr/bin/python3
# coding: utf-8
#
# A simple indicator applet displaying cpu and memory information
#
# Author: Alex Eftimie <alex@eftimie.ro>
# Fork Author: fossfreedom <foss.freedom@gmail.com>
# Original Homepage: http://launchpad.net/indicator-sysmonitor
# Fork Homepage: https://github.com/fossfreedom/indicator-sysmonitor
# License: GPL v3

import json
import time
from threading import Thread
import subprocess
import copy
import logging
import re
import os
import platform
from gettext import gettext as _
from bs4 import BeautifulSoup
import psutil as ps

ps_v1_api = int(ps.__version__.split('.')[0]) <= 1


B_UNITS = ['', 'KB', 'MB', 'GB', 'TB']
cpu_load = []


def bytes_to_human(num, suffix='B'):
    for unit in ['','Ki','Mi','Gi','Ti','Pi','Ei','Zi']:
        if abs(num) < 1024.0:
            return "%3.2f %s%s" % (num, unit, suffix)
        num /= 1024.0
    return "%.2f %s%s" % (num, 'Yi', suffix)

class ISMError(Exception):
    """General exception."""

    def __init__(self, msg):
        Exception.__init__(self, msg)


class SensorManager(object):
    """Singleton"""
    _instance = None

    SETTINGS_FILE = os.getenv("HOME") + '/.indicator-nauta.json'
    digit_regex = re.compile(r'''\d+''')

    class __impl:

        settings = {
            'custom_text': 'cpu: {cpu} mem: {mem}',
            'interval': 2,
            'on_startup': False,
            'sensors': {
                # 'name' => (desc, cmd)
            }
        }

        supported_sensors = None

        def __init__(self):
            self.sensor_instances = [DataNacSensor(), DataNacExpSensor(),
                                     DataInterSensor(), DataInterExpSensor()
                                     ]

            for sensor in self.sensor_instances:
                self.settings['sensors'][sensor.name] = (sensor.desc, sensor.cmd)

            self._last_net_usage = [0, 0]  # (up, down)

        # @staticmethod
        @classmethod
        def update_regex(self, names=None):
            if names is None:
                names = list(self.settings["sensors"].keys())

            reg = '|'.join(names)
            reg = "\A({})\Z".format(reg)
            # global supported_sensors
            self.supported_sensors = re.compile("{}".format(reg))

        def get(self, name):
            """
            :param name: of the sensor
            :return: the sensor instance
            """

            for sensor in self.sensor_instances:
                if sensor.check(name) is not None:
                    return sensor

            return None

        # @staticmethod
        def exists(self, name):
            """Checks if the sensor name exists"""
            return bool(self.supported_sensors.match(name))

        # @staticmethod
        def check(self, sensor_string):
            for sensor in self.sensor_instances:
                sensor.check(sensor_string)

        def add(self, name, desc, cmd):
            """Adds a custom sensors."""
            if self.exists(name):
                raise ISMError(_("Sensor name already in use."))

            self.settings["sensors"][name] = (desc, cmd)
            self.update_regex()

        def delete(self, name):
            """Deletes a custom sensors."""
            sensors = self.settings['sensors']
            names = list(sensors.keys())
            if name not in names:
                raise ISMError(_("Sensor is not defined."))

            _desc, default = sensors[name]
            if default is True:
                raise ISMError(_("Can not delete default sensors."))

            del sensors[name]
            self.update_regex()

        def edit(self, name, newname, desc, cmd):
            """Edits a custom sensors."""
            try:
                sensors = self.settings['sensors']
                _desc, default = sensors[name]

            except KeyError:
                raise ISMError(_("Sensor does not exists."))

            if default is True:
                raise ISMError(_("Can not edit default sensors."))
            if newname != name:
                if newname in list(sensors.keys()):
                    raise ISMError(_("Sensor name already in use."))

            sensors[newname] = (desc, cmd)
            del sensors[name]
            self.settings["custom_text"] = self.settings["custom_text"].replace(
                name, newname)
            self.update_regex()

        def load_settings(self):
            """It gets the settings from the config file and
            sets them to the correct vars"""
            try:
                with open(SensorManager.SETTINGS_FILE, 'r') as f:
                    cfg = json.load(f)

                if cfg['custom_text'] is not None:
                    self.settings['custom_text'] = cfg['custom_text']
                if cfg['interval'] is not None:
                    self.settings['interval'] = cfg['interval']
                if cfg['on_startup'] is not None:
                    self.settings['on_startup'] = cfg['on_startup']
                if cfg['sensors'] is not None:
                    # need to merge our current list of sensors with what was previously saved
                    newcopy = self.settings['sensors']
                    newcopy.update(cfg['sensors'])
                    self.settings['sensors'] = newcopy

                self.update_regex()

            except Exception as ex:
                logging.exception(ex)
                logging.error('Reading settings failed')

        def save_settings(self):
            """It stores the current settings to the config file."""
            # TODO: use gsettings
            try:
                with open(SensorManager.SETTINGS_FILE, 'w') as f:
                    f.write(json.dumps(self.settings))

            except Exception as ex:
                logging.exception(ex)
                logging.error('Writing settings failed')

        def get_guide(self):
            """Updates the label guide from appindicator."""

            # foss - I'm doubtful any of this guide stuff works - this needs to be recoded
            # each sensor needs a sensor guide
            data = self._fetcher.fetch()

            for key in data:
                if key.startswith('fs'):
                    data[key] = '000gB'
                    break

            data['mem'] = data['cpu'] = data['bat'] = '000%'
            data['net'] = '↓666kB/s ↑666kB/s'

            self.settings['custom_text'].format(**data)
            return self.settings['custom_text'].format(**data)

        def get_label(self, data):
            """It updates the appindicator text with the the values
            from data"""
            try:
                label = self.settings["custom_text"].format(**data) if len(data) \
                    else _("(no output)")

            except KeyError as ex:
                label = _("Invalid Sensor: {}").format(ex)
            except Exception as ex:
                logging.exception(ex)
                label = _("Unknown error: ").format(ex)

            return label

        def initiate_fetcher(self, parent):
            self._fetcher = StatusFetcher(parent)
            self._fetcher.start()
            logging.info("Fetcher started")

        def fill_liststore(self, list_store):

            sensors = self.settings['sensors']
            for name in list(sensors.keys()):
                list_store.append([name, sensors[name][0]])

        def get_command(self, name):
            cmd = self.settings["sensors"][name][1]

            return cmd

        def set_custom_text(self, custom_text):
            self.settings["custom_text"] = custom_text

        def get_custom_text(self):
            return self.settings["custom_text"]

        def set_interval(self, interval):
            self.settings["interval"] = interval

        def get_interval(self):
            return self.settings["interval"]

        def get_basedata(self):
            cmd = 'curl -m 5 --connect-timeout 5 -s --cookie /usr/lib/indicator-nauta/cookies.txt "https://mi.cubacel.net/primary/_-ijqJlSHh"'
            #cmd = 'curl -s "http://localhost/etecsa_login.html"'
            html = os.popen(cmd).read()
            soup = BeautifulSoup(html, 'html.parser')
            return soup

        def get_results(self):
            """Return a dict whose element are the sensors
            and their values"""
            res = {}
            from preferences import Preferences

            # We call this only once per update
            global baseData
            baseData = self.get_basedata()

            # print (self.settings["custom_text"]) custom_text is the full visible string seen in Preferences edit field
            for sensor in Preferences.sensors_regex.findall(
                    self.settings["custom_text"]):

                sensor = sensor[1:-1]
                instance = self.get(sensor)

                if instance:
                    value = instance.get_value(sensor, baseData)
                    if value:
                        res[sensor] = value

                # else:  # custom sensor
                #     res[sensor] = BaseSensor.script_exec(self.settings["sensors"][sensor][1])

            return res

    def __init__(self):

        if SensorManager._instance is None:
            SensorManager._instance = SensorManager.__impl()

        # Store instance reference as the only member in the handle
        self.__dict__['_SensorManager__instance'] = SensorManager._instance

    def __getattr__(self, attr):
        """ Delegate access to implementation """
        return getattr(self.__instance, attr)

    def __setattr__(self, attr, value):
        """ Delegate access to implementation """
        return setattr(self.__instance, attr, value)


class BaseSensor(object):
    name = ''
    desc = ''
    cmd = True

    def check(self, sensor):
        '''
        checks to see if the sensor string passed in valid
        :param sensor: string representation of the sensor
        :return: True if the sensor is understood and passes the check or
          an Exception if the format of the sensor string is wrong
          None is returned if the sensor string is nothing to-do with the Sensor name
        '''
        if sensor == self.name:
            return True

    def get_value(self, sensor_data, basedata):
        return None

    @staticmethod
    def script_exec(command):
        """Execute a custom command."""
        try:
            output = subprocess.Popen(command, stdout=subprocess.PIPE,
                                      shell=True).communicate()[0].strip()
        except:
            output = _("Error")
            logging.error(_("Error running: {}").format(command))

        return output.decode('utf-8') if output else _("(no output)")





class DataNacSensor(BaseSensor):
    name = 'dataNac'
    desc = _('Devuelve el valor de datos nacionales')
    last = None

    def get_value(self, sensor, basedata):
        if sensor == 'dataNac':
            value = baseData.find_all(class_="charts_data")
            if len(value) == 0:
                return "Desconectado"
            nac = value[0].findChildren("div", recursive=False)[0]
            return nac.attrs["data-text"]+" "+nac.attrs["data-info"]

        return None


class DataNacExpSensor(BaseSensor):
    name = 'NacExp'
    desc = _('Devuelve el tiempo que qda para q expiren de datos nacionales')
    last = None

    def get_value(self, sensor, basedata):
        if sensor == 'NacExp':
            Expire_date = baseData.find_all(class_="expires_date")
            if len(Expire_date) == 0:
                return "Desconectado"
            return Expire_date[0].text

        return None


class DataInterSensor(BaseSensor):
    name = 'dataInter'
    desc = _('Devuelve el valor de datos internacionales')
    last = None

    def get_value(self, sensor, basedata):
        if sensor == 'dataInter':
            value = baseData.find_all(class_="charts_data")
            if len(value) == 0:
                return "Desconectado"
            nac = value[1].findChildren("div", recursive=False)[0]
            return nac.attrs["data-text"]+" "+nac.attrs["data-info"]

        return None


class DataInterExpSensor(BaseSensor):
    name = 'dataInterExp'
    desc = _('Devuelve el tiempo que qda para q expiren de datos internacionales')
    last = None

    def get_value(self, sensor, basedata):
        if sensor == 'dataInterExp':
            Expire_date = baseData.find_all(class_="expires_date")
            if len(Expire_date) == 0:
                return "Desconectado"
            return Expire_date[1].text

        return None


class StatusFetcher(Thread):
    """It recollects the info about the sensors."""

    def __init__(self, parent):
        Thread.__init__(self)
        self._parent = parent
        self.mgr = SensorManager()

    def fetch(self):
        return self.mgr.get_results()

    def run(self):
        """It is the main loop."""
        while self._parent.alive.isSet():
            data = self.fetch()
            self._parent.update(data)
            time.sleep(self.mgr.get_interval())
