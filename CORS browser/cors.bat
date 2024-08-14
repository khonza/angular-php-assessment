@echo off
set "qtpath=C:\Program Files (x86)\Google\Chrome\Application"
set "execpath=%qtpath%\chrome.exe"
echo "%execpath%"
"%execpath%" --user-data-dir="C:/CORS" --disable-web-security
exit