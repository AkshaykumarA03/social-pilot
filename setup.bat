@echo off
REM Bliz Social Pilot - Quick Start Guide (Windows)

echo 🚀 Bliz Social Pilot - Setup Guide
echo ====================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Node.js is not installed. Please install Node.js first.
    echo Download from: https://nodejs.org/
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
for /f "tokens=*" %%i in ('npm --version') do set NPM_VERSION=%%i

echo ✅ Node.js found: %NODE_VERSION%
echo ✅ npm found: %NPM_VERSION%
echo.

REM Install dependencies
echo 📦 Installing dependencies...
call npm install

echo.
echo ✅ Installation complete!
echo.
echo 🎯 To start the server, run:
echo    npm start
echo.
echo 📖 Then open index.html in your browser
echo    file:///%cd%\index.html
echo.
echo Happy posting! 🎉
pause
