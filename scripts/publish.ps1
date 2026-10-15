param([string]$RepositoryName = '')
$ErrorActionPreference = 'Stop'
$projectPath = (Resolve-Path -LiteralPath (Split-Path -Parent $PSScriptRoot)).Path
Set-Location -LiteralPath $projectPath
if (-not (Get-Command gh -ErrorAction SilentlyContinue)) {
    $portableCli = Get-ChildItem -LiteralPath (Join-Path $projectPath 'tmp/github-cli') -Filter gh.exe -Recurse -ErrorAction SilentlyContinue | Select-Object -First 1
    if ($portableCli) { $env:PATH = $portableCli.DirectoryName + [System.IO.Path]::PathSeparator + $env:PATH }
    else { throw 'GitHub CLI is required. Install it from https://cli.github.com or run python scripts/prepare-github-cli.py, then run gh auth login.' }
}
& gh auth status 2>$null
if ($LASTEXITCODE -ne 0) { throw 'Sign in with gh auth login, then run this script again.' }
& node (Join-Path $PSScriptRoot 'verify-static.cjs')
if ($LASTEXITCODE -ne 0) { throw 'Website validation failed.' }
$accountName = & gh api user --jq '.login'
if ($LASTEXITCODE -ne 0) { throw 'Could not read the signed-in GitHub account.' }
if (-not $RepositoryName) { $RepositoryName = "$accountName.github.io" }
$existingRepository = & gh repo view "$accountName/$RepositoryName" --json name 2>$null
if ($LASTEXITCODE -eq 0) { throw 'That GitHub repository already exists. Choose a new name or update it explicitly.' }
$gitRoot = & git rev-parse --show-toplevel 2>$null
if ($LASTEXITCODE -eq 0 -and [System.IO.Path]::GetFullPath($gitRoot) -ne $projectPath) { throw 'This folder belongs to an unrelated parent Git repository.' }
if (-not (Test-Path -LiteralPath (Join-Path $projectPath '.git'))) { & git init -b main; if ($LASTEXITCODE -ne 0) { throw 'Could not initialise Git.' } }
& git add -- .gitignore .github README.md design.md content docs scripts site
if ($LASTEXITCODE -ne 0) { throw 'Could not stage project files.' }
& git diff --cached --quiet
if ($LASTEXITCODE -eq 1) {
    & git -c user.name="$accountName" -c user.email="$accountName@users.noreply.github.com" commit -m 'Create student learning hub'
    if ($LASTEXITCODE -ne 0) { throw 'Could not commit the website.' }
}
& gh repo create "$accountName/$RepositoryName" --public --source . --remote origin --description 'Class 9 to 12 student notes, chapter practice and test papers' --push
if ($LASTEXITCODE -ne 0) { throw 'Repository creation or push failed. Check the returned GitHub error before retrying.' }
& gh api "repos/$accountName/$RepositoryName/pages" --silent 2>$null
if ($LASTEXITCODE -eq 0) { & gh api --method PUT "repos/$accountName/$RepositoryName/pages" -f build_type=workflow }
else { & gh api --method POST "repos/$accountName/$RepositoryName/pages" -f build_type=workflow }
if ($LASTEXITCODE -ne 0) { throw 'Repository was created, but Pages setup failed. Choose GitHub Actions in Settings > Pages.' }
& gh workflow run pages.yml
if ($LASTEXITCODE -ne 0) { throw 'Pages was enabled, but workflow dispatch failed. Run it from the repository Actions tab.' }
Write-Output "Repository: https://github.com/$accountName/$RepositoryName"
if ($RepositoryName -eq "$accountName.github.io") { Write-Output "Website deployment: https://$accountName.github.io/" }
else { Write-Output "Website deployment: https://$accountName.github.io/$RepositoryName/" }
Write-Output 'Check the Actions run for the final deployment status.'
