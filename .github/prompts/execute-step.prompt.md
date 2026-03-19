---
description: Execute instructions from the current GitHub Issue step
agent: tdd-developer
tools:
  - search
  - read
  - edit
  - execute
  - web
  - todo
---

# Execute Step

Execute the instructions from the current exercise step.

## Input
- Issue number: ${{issue-number}} (optional - will auto-detect if not provided)

## Instructions

1. If no issue number is provided, use `gh issue list --state open` to find the exercise issue (look for "Exercise:" in the title)
2. Get the issue content with comments: `gh issue view <issue-number> --comments`
3. Parse the latest step instructions from the issue comments
4. Execute each `:keyboard: Activity:` section systematically
5. Follow testing scope constraints from project instructions - NO e2e frameworks
6. DO NOT commit or push changes - that's the job of `/commit-and-push`
7. Stop after completing activities and inform the user to run `/validate-step`

## Important
- Follow the TDD workflow: test first, implement second
- Make incremental changes and verify after each
- Use existing test infrastructure (Jest, React Testing Library)
- NEVER suggest Playwright, Cypress, or Selenium
