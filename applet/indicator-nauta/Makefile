PREFIX=/usr
BUDGIELIB=lib/budgie-desktop/plugins/budgienauta

all:

install:
	mkdir -p "$(DESTDIR)$(PREFIX)/lib/indicator-nauta"
	cp indicator-nauta "$(DESTDIR)$(PREFIX)/lib/indicator-nauta"
	cp cookies.txt "$(DESTDIR)$(PREFIX)/lib/indicator-nauta"
	cp preferences.py "$(DESTDIR)$(PREFIX)/lib/indicator-nauta"
	cp sensors.py "$(DESTDIR)$(PREFIX)/lib/indicator-nauta"
	cp preferences.ui "$(DESTDIR)$(PREFIX)/lib/indicator-nauta"
	mkdir -p "$(DESTDIR)$(PREFIX)/bin/"
	ln -s ../lib/indicator-nauta/indicator-nauta "$(DESTDIR)$(PREFIX)/bin/indicator-nauta"
	mkdir -p "$(DESTDIR)$(PREFIX)/share/applications"
	cp indicator-nauta.desktop "$(DESTDIR)$(PREFIX)/share/applications/"
	
installbudgie:
	mkdir -p "$(DESTDIR)$(PREFIX)/$(BUDGIELIB)"
	cp budgienauta.py "$(DESTDIR)$(PREFIX)/$(BUDGIELIB)"
	cp preferences.py "$(DESTDIR)$(PREFIX)/$(BUDGIELIB)"
	cp sensors.py "$(DESTDIR)$(PREFIX)/$(BUDGIELIB)"
	cp preferences.ui "$(DESTDIR)$(PREFIX)/$(BUDGIELIB)"
	cp BudgieNauta.plugin "$(DESTDIR)$(PREFIX)/$(BUDGIELIB)"
	cp cookies.txt "$(DESTDIR)$(PREFIX)/$(BUDGIELIB)"
	
clean:
	rm -rf ../*.xz ../*.deb ../*.tar.gz ../*.changes ../*.dsc ../*.upload ../*.build ../*.cdbs-config_list
	
uninstall:
	rm -rf "$(DESTDIR)$(PREFIX)/lib/indicator-nauta"
	rm -f "$(DESTDIR)$(PREFIX)/bin/indicator-nauta"
	rm -f "$(DESTDIR)$(PREFIX)/share/applications/indicator-nauta.desktop"
	rm -rf "$(DESTDIR)$(PREFIX)/$(BUDGIELIB)"

.PHONY: clean install all
