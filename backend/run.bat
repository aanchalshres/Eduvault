@echo off
set "VENV_PATH=%~dp0venv"
if not exist "%VENV_PATH%" (
    echo Virtual environment not found at %VENV_PATH%
    exit /b 1
)
"%VENV_PATH%\Scripts\python.exe" -m uvicorn main:app --reload --host 127.0.0.1 --port 8000
