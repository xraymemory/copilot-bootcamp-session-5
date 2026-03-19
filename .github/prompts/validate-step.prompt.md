---
description: Validate that all success criteria for the current step are met
agent: code-reviewer
tools:
  - search
  - read
  - execute
  - web
  - todo
---

# Validate Step

Validate that all success criteria for the specified step are met.

## Input
- Step number: ${{step-number}} (REQUIRED, e.g., "5-0", "5-1")

## Instructions

1. Use `gh issue list --state open` to find the main exercise issue (look for "Exercise:" in the title)
2. Get the issue with comments: `gh issue view <issue-number> --comments`
3. Search through the issue to find "# Step ${{step-number}}:"
4. Extract the "Success Criteria" section from that step
5. Check each criterion against the current workspace state:
   - Verify files exist where required
   - Check file contents match expectations
   - Run tests if criteria require passing tests
   - Run lint if criteria require no lint errors
6. Report completion status with specific guidance for any incomplete items

## Output Format
For each criterion, report:
- ✅ [Criterion] - Met (with brief explanation)
- ❌ [Criterion] - Not met (with specific guidance to fix)
