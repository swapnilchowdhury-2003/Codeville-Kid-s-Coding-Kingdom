# 🔧 Git Setup Instructions for Codeville

## Step 1: Verify Git Installation

After installing Git, you need to **restart your terminal or VS Code** for the changes to take effect.

1. Close VS Code completely
2. Reopen VS Code
3. Open a new terminal in VS Code

Then test if Git is working:
```bash
git --version
```

You should see something like: `git version 2.x.x`

---

## Step 2: Configure Git (First Time Only)

Set your name and email (use your GitHub account email):

```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

Verify configuration:
```bash
git config --list
```

---

## Step 3: Initialize Git Repository

Navigate to your project folder and initialize Git:

```bash
cd "c:/Users/user/Desktop/Kids coding project"
git init
```

You should see: `Initialized empty Git repository`

---

## Step 4: Add Files to Git

Add all files to staging:

```bash
git add .
```

Check what will be committed:
```bash
git status
```

---

## Step 5: Create Initial Commit

Commit your files with a descriptive message:

```bash
git commit -m "Initial commit: Add Codeville home page, CSS, and JavaScript files"
```

---

## Step 6: Connect to GitHub

Add your GitHub repository as remote:

```bash
git remote add origin https://github.com/swapnilchowdhury-2003/Codeville-Kid-s-Coding-Kingdom.git
```

Verify remote:
```bash
git remote -v
```

---

## Step 7: Push to GitHub

Set the default branch to main:
```bash
git branch -M main
```

Push your code to GitHub:
```bash
git push -u origin main
```

**Note:** You may be asked to authenticate with GitHub. Use your GitHub username and a Personal Access Token (not password).

---

## Step 8: Future Commits

After making changes, use these commands:

```bash
# Check what changed
git status

# Add specific files
git add filename.html

# Or add all changes
git add .

# Commit with message
git commit -m "Add dashboard page"

# Push to GitHub
git push
```

---

## 📝 Commit Message Guidelines

Use clear, descriptive commit messages:

✅ Good Examples:
- `"Add profile page with avatar selection"`
- `"Implement Magic Food Table story game"`
- `"Fix navigation menu on mobile devices"`
- `"Update README with installation instructions"`

❌ Bad Examples:
- `"update"`
- `"fix bug"`
- `"changes"`

---

## 🎯 Recommended Commit Structure

For this project, commit after completing each major feature:

1. ✅ `"Initial commit: Add home page, CSS, and JavaScript"`
2. `"Add profile and dashboard pages"`
3. `"Implement Story 1: Magic Food Table"`
4. `"Implement Story 2: Dancing Robot"`
5. `"Implement Story 3: Magic Treasure Box"`
6. `"Implement Story 4: Weather Friend"`
7. `"Implement Story 5: Recipe Robot"`
8. `"Add leaderboard and competition features"`
9. `"Add sound effects and animations"`
10. `"Final polish and bug fixes"`

---

## 🔐 GitHub Authentication

If you need to authenticate:

### Option 1: Personal Access Token (Recommended)
1. Go to GitHub.com → Settings → Developer settings → Personal access tokens
2. Generate new token (classic)
3. Select scopes: `repo` (full control)
4. Copy the token
5. Use token as password when pushing

### Option 2: GitHub CLI
```bash
# Install GitHub CLI first
gh auth login
```

---

## 🆘 Troubleshooting

### Problem: "git: command not found"
**Solution:** Restart terminal/VS Code after installing Git

### Problem: "Permission denied"
**Solution:** Check your GitHub authentication

### Problem: "Remote already exists"
**Solution:** 
```bash
git remote remove origin
git remote add origin https://github.com/swapnilchowdhury-2003/Codeville-Kid-s-Coding-Kingdom.git
```

### Problem: "Merge conflict"
**Solution:**
```bash
git pull origin main --allow-unrelated-histories
# Resolve conflicts manually
git add .
git commit -m "Resolve merge conflicts"
git push
```

---

## 📚 Useful Git Commands

```bash
# View commit history
git log --oneline

# View changes
git diff

# Undo last commit (keep changes)
git reset --soft HEAD~1

# Discard all local changes
git reset --hard HEAD

# Create a new branch
git checkout -b feature-name

# Switch branches
git checkout main

# View all branches
git branch -a

# Delete a branch
git branch -d branch-name
```

---

## ✅ Quick Checklist

- [ ] Git installed
- [ ] Terminal/VS Code restarted
- [ ] Git configured (name & email)
- [ ] Repository initialized
- [ ] Files added and committed
- [ ] Remote added
- [ ] Pushed to GitHub
- [ ] Verified on GitHub.com

---

**Once Git is working, you can commit all the great work we've done! 🎉**