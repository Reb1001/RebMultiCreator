# Electron App Otomatik Build Script
# Bu script projeyi build eder ve Windows için .exe dosyası oluşturur

Write-Host "=== Electron App Build Scripti Başlatıldı ===" -ForegroundColor Cyan
Write-Host ""

# Node modules kontrolü
if (-not (Test-Path "node_modules")) {
    Write-Host "node_modules bulunamadı. npm install çalıştırılıyor..." -ForegroundColor Yellow
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "npm install başarısız oldu!" -ForegroundColor Red
        exit 1
    }
    Write-Host "npm install tamamlandı." -ForegroundColor Green
    Write-Host ""
} else {
    Write-Host "node_modules mevcut." -ForegroundColor Green
    Write-Host ""
}

# Eski build dosyalarını temizle
Write-Host "Eski build dosyaları temizleniyor..." -ForegroundColor Yellow
if (Test-Path "dist") {
    Remove-Item -Recurse -Force "dist"
}
if (Test-Path "release") {
    Remove-Item -Recurse -Force "release"
}
Write-Host "Temizlik tamamlandı." -ForegroundColor Green
Write-Host ""

# Build işlemi
Write-Host "Build işlemi başlatılıyor..." -ForegroundColor Yellow
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "Build işlemi başarısız oldu!" -ForegroundColor Red
    exit 1
}
Write-Host "Build işlemi tamamlandı." -ForegroundColor Green
Write-Host ""

# Release klasörünü kontrol et
Write-Host "Oluşturulan dosyalar:" -ForegroundColor Cyan
if (Test-Path "release") {
    Get-ChildItem -Path "release" -Recurse -Include *.exe,*.AppImage | ForEach-Object {
        Write-Host "  - $($_.FullName)" -ForegroundColor White
        $sizeMB = [math]::Round($_.Length / 1MB, 2)
        Write-Host "    Boyut: $sizeMB MB" -ForegroundColor Gray
    }
} else {
    Write-Host "Release klasörü bulunamadı!" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "=== Build işlemi başarıyla tamamlandı! ===" -ForegroundColor Green
Write-Host ""
Write-Host "Uygulamanızı 'release' klasöründe bulabilirsiniz." -ForegroundColor Cyan
