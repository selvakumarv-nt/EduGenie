Write-Host "Starting EduGenie Services..."

# Start Backend
Write-Host "Starting FastAPI Backend..."
Start-Process -FilePath "powershell" -ArgumentList "-Command `"cd backend; python -m uvicorn main:app --host 0.0.0.0 --port 8000 --reload`"" -WindowStyle Normal

# Start Frontend
Write-Host "Starting Next.js Frontend..."
Set-Location -Path "frontend"
npm run dev
