@echo off
set "qtpath=C:\Program Files\Google\Chrome\Application"
set "execpath=%qtpath%\chrome.exe"
echo "%execpath%"
"%execpath%" --user-data-dir="C:/CORS" --disable-web-security
exit