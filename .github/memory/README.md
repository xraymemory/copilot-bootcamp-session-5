# Memory System

## Purpose
Track patterns, decisions, and lessons learned during development sessions. This system enables AI to build on previous discoveries and provide increasingly context-aware assistance.

## Two Types of Memory

### Persistent Memory
**Location**: `.github/copilot-instructions.md`
- Contains foundational principles, workflows, and project context
- Created once and referenced across all sessions
- Provides the baseline knowledge that AI uses for every interaction

### Working Memory
**Location**: `.github/memory/`
- Contains discoveries, patterns, and session-specific notes
- Evolves as you work through development sessions
- Captures learnings that improve future AI interactions

## Directory Structure

```
.github/memory/
├── README.md                    # This file - explains the memory system
├── session-notes.md             # Historical summaries of completed sessions (committed)
├── patterns-discovered.md       # Accumulated code patterns and learnings (committed)
└── scratch/
    ├── .gitignore               # Ignores all files in scratch/ (ephemeral)
    └── working-notes.md         # Active session notes (not committed)
```

## When to Use Each File

### `session-notes.md` (Historical - Committed)
- **When**: At the end of each development session
- **What**: Summary of what was accomplished, key findings, decisions made
- **Why**: Creates a historical record that AI can reference in future sessions
- **Workflow**: After completing a step or session, summarize key takeaways here

### `patterns-discovered.md` (Accumulated - Committed)
- **When**: When you discover a recurring code pattern or important insight
- **What**: Pattern name, context, problem, solution, example, related files
- **Why**: Builds a knowledge base of project-specific patterns over time
- **Workflow**: During TDD, linting, or debugging, document patterns as they emerge

### `scratch/working-notes.md` (Active - Not Committed)
- **When**: During active development work
- **What**: Current task, approach, findings, blockers, next steps
- **Why**: Keeps real-time notes without cluttering git history
- **Workflow**: Take notes as you work; summarize into session-notes.md when done

## How AI Uses These Files

1. **Before starting work**: AI reads persistent memory and accumulated patterns
2. **During work**: AI references working notes for current context
3. **When encountering issues**: AI checks patterns-discovered for known solutions
4. **After completing work**: AI helps summarize findings into session-notes

## The Learning Loop

```
Persistent Memory (copilot-instructions.md)
    ↓ provides foundational knowledge
Active Work (scratch/working-notes.md)
    ↓ captures real-time discoveries
Historical Record (session-notes.md)
    ↓ documents completed sessions
Accumulated Patterns (patterns-discovered.md)
    ↓ preserves learnings over time
AI reads all committed files → applies to future work
```
