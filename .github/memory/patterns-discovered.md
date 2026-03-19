# Patterns Discovered

Accumulated code patterns and learnings from development sessions. This file grows over time as new patterns emerge.

---

## Pattern Template

### Pattern: [Name]
**Context**: [When this pattern applies]
**Problem**: [What issue it solves]
**Solution**: [How to implement it]
**Example**:
```javascript
// Code example
```
**Related Files**: [File paths where this pattern is used]

---

## Pattern: Service Initialization (Empty Array vs Null)
**Context**: Initializing in-memory data stores for REST API services
**Problem**: Using `null` instead of an empty array causes crashes when array methods (`.find()`, `.filter()`, `.push()`) are called on the data store
**Solution**: Always initialize collection variables as empty arrays `[]` instead of `null`
**Example**:
```javascript
// BAD - causes TypeError when array methods are called
let todos = null;

// GOOD - safe to call array methods immediately
let todos = [];
```
**Related Files**: `packages/backend/src/app.js`
