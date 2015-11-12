@echo off

REM Restore dependencies
call npm install
app\Epiphany.InputPlusPlus\.nuget\nuget.exe restore app\Epiphany.InputPlusPlus\Epiphany.InputPlusPlus.sln

REM Build the nuget package
call grunt nuget