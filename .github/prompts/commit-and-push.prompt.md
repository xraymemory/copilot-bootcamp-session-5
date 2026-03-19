---
description: Analyze changes, generate commit message, and push to feature branch
tools:
  - read
  - execute
  - todo
---

# Commit and Push

Analyze current changes, generate a descriptive commit message, and push to the specified branch.

## Input
- Branch name: ${{branch-name}} (REQUIRED - ask if not provided)

## Instructions

1. If no branch name is provided, ask the user for it
2. Analyze changes using `git diff` and `git status`
3. Generate a descriptive commit message using conventional commit format:
   - `feat:` for new features
   - `fix:` for bug fixes
   - `chore:` for maintenance tasks
   - `docs:` for documentation changes
4. Create the specified branch if it doesn't exist: `git checkout -b <branch-name>`
5. If the branch exists, switch to it: `git checkout <branch-name>`
6. Stage all changes: `git add .`
7. Commit with the generated message
8. Push to the specified branch: `git push origin <branch-name>`

## Important
- DO NOT commit to main or any other branch - ONLY use the user-provided branch name
- Always use conventional commit format
- Include a meaningful description of what changed
