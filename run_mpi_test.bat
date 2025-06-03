@echo off
REM נווט לתיקייה הרצוייה
cd /d C:\Users\User\mpi-test

REM בנה את התמונה
echo Building Docker image...
docker build -t mpi-c-hello .
if errorlevel 1 (
    echo Failed to build Docker image.
    pause
    exit /b 1
)

REM צור תיקיית results אם לא קיימת
if not exist results (
    mkdir results
)

REM הרץ את המכולה עם מיפוי תיקיית results
echo Running Docker container...
docker run --rm -v "%cd%\results:/results" mpi-c-hello > results\output.txt
set EXIT_CODE=%ERRORLEVEL%

REM בדוק אם קוד היציאה 0
if %EXIT_CODE% neq 0 (
    echo Container exited with error code %EXIT_CODE%
    pause
    exit /b %EXIT_CODE%
)

echo Test finished successfully, output saved to results\output.txt
pause
