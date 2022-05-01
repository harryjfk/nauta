import os
from bs4 import BeautifulSoup
cmd = 'curl -s --cookie cookies.txt "https://mi.cubacel.net/primary/_-ijqJlSHh"'
#cmd = 'curl -s "http://localhost/etecsa_login.html"'
html = os.popen(cmd).read()
soup = BeautifulSoup(html, 'html.parser')
value = soup.find_all(class_="charts_data")
nac = value[0].findChildren("div" , recursive=False)[0];
inte = value[1].findChildren("div" , recursive=False)[0];
Expire_date = soup.find_all(class_="expires_date")
expires_hours = soup.find_all(class_="expires_hours")
if len(value)== 0:
    print("Disconnected");
else:
    print(nac.attrs["data-text"]+" "+nac.attrs["data-info"]+"("+Expire_date[0].text+"d)-"+inte.attrs["data-text"]+" "+ inte.attrs["data-info"]+"("+Expire_date[1].text+"d)")

