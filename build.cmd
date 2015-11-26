@echo off

set PATH=C:\Program Files (x86)\MSBuild\14.0\Bin;%PATH%

REM Restore dependencies

call npm install -g grunt-cli
call npm install
nuget restore app\Epiphany.InputPlusPlus\Epiphany.InputPlusPlus.sln

REM Build the nuget package
call grunt nuget