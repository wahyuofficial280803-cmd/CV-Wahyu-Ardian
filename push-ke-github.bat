@echo off
chcp 65001 >nul
title Upload Website CV Wahyu Ardian ke GitHub & Vercel
echo ====================================================================
echo      🚀 PROSES PUSH WEBSITE CV WAHYU ARDIAN KE GITHUB
echo ====================================================================
echo.
set "PATH=C:\Users\ASUS\AppData\Local\Microsoft\WinGet\Packages\Git.MinGit_Microsoft.Winget.Source_8wekyb3d8bbwe\cmd;C:\Users\ASUS\AppData\Local\Programs\Git Credential Manager;%PATH%"

cd /d "%~dp0"

echo Target Repository: https://github.com/wahyuofficial280803-cmd/CV-Wahyu-Ardian.git
echo.
echo Sedang mengunggah semua file dan folder assets...
echo (Jika muncul jendela browser, silakan klik 'Sign in with your browser' / 'Authorize')...
echo.

git push origin main

echo.
if %ERRORLEVEL% equ 0 (
    echo ====================================================================
    echo   🎉 SELAMAT! Seluruh berkas website dan folder assets berhasil terupload!
    echo   Buka link GitHub: https://github.com/wahyuofficial280803-cmd/CV-Wahyu-Ardian
    echo   Sekarang Anda bisa langsung Import repo ini di Vercel!
    echo ====================================================================
) else (
    echo ====================================================================
    echo   ⚠️ Jika push gagal karena perlu autentikasi, pastikan Anda klik
    echo   'Sign in with your browser' atau masukkan Token GitHub.
    echo ====================================================================
)
echo.
echo Tekan sembarang tombol untuk menutup...
pause >nul
