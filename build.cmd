@echo off

REM Restore dependencies

call npm install -g grunt-cli
call npm install
nuget restore app\Epiphany.InputPlusPlus\Epiphany.InputPlusPlus.sln

REM Build the nuget package
call grunt nuget