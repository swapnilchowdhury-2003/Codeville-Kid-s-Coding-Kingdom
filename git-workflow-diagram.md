# Git Connection Workflow

## Process Flow Diagram

```mermaid
flowchart TD
    A[Start: Local Project] --> B{Git Initialized?}
    B -->|No| C[Run: git init]
    B -->|Yes| D[Skip initialization]
    C --> E[Configure git user if needed]
    D --> E
    E --> F[Add remote repository]
    F --> G[Stage files: git add .]
    G --> H[Create commit: git commit -m message]
    H --> I[Set branch to main: git branch -M main]
    I --> J{Remote has content?}
    J -->|Yes| K[Pull with: git pull origin main --allow-unrelated-histories]
    J -->|No| L[Skip pull]
    K --> M[Push to GitHub: git push -u origin main]
    L --> M
    M --> N{Success?}
    N -->|Yes| O[Connection Complete]
    N -->|No| P[Check authentication]
    P --> Q[Use PAT or SSH]
    Q --> M
    O --> R[Ready for development]
```

## Quick Command Reference

### Initial Setup
```bash
# 1. Initialize repository
git init

# 2. Add remote
git remote add origin https://github.com/swapnilchowdhury-2003/Codeville-Kid-s-Coding-Kingdom.git

# 3. Stage and commit
git add .
git commit -m "Initial commit"

# 4. Set main branch
git branch -M main

# 5. Push to GitHub
git push -u origin main
```

### Daily Workflow
```bash
# Check status
git status

# Stage changes
git add .

# Commit changes
git commit -m "Description of changes"

# Push to GitHub
git push

# Pull from GitHub
git pull
```

## Repository Structure

```
Kids coding project/
├── .git/                 (created after git init)
├── index.html           (existing file)
├── git-setup-plan.md    (this planning document)
└── git-workflow-diagram.md
```

## Authentication Options

### Option 1: HTTPS with Personal Access Token
- Generate PAT from GitHub Settings > Developer settings > Personal access tokens
- Use PAT as password when prompted

### Option 2: SSH Keys
- Generate SSH key: `ssh-keygen -t ed25519 -C "your_email@example.com"`
- Add to GitHub: Settings > SSH and GPG keys
- Use SSH URL: `git@github.com:swapnilchowdhury-2003/Codeville-Kid-s-Coding-Kingdom.git`

### Option 3: GitHub CLI
- Install GitHub CLI
- Run: `gh auth login`
- Follow prompts