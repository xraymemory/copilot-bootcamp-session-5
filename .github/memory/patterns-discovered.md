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

---

## Pattern: REST API ID Management
**Context**: In-memory REST APIs that auto-assign IDs to new resources
**Problem**: Hardcoding IDs or not tracking the next available ID leads to duplicate IDs after deletions
**Solution**: Maintain a separate `nextId` counter that only increments, never resets
**Example**:
```javascript
let nextId = 1;

app.post('/api/todos', (req, res) => {
  const todo = { id: nextId++, title: req.body.title, completed: false };
  todos.push(todo);
  res.status(201).json(todo);
});
```
**Related Files**: `packages/backend/src/app.js`

---

## Pattern: Non-Mutating Array Delete
**Context**: Deleting items from an in-memory collection in a REST API
**Problem**: Using `.splice()` with `.findIndex()` is error-prone and mutates in place; returning wrong value
**Solution**: Use `.filter()` to create a new array excluding the deleted item
**Example**:
```javascript
app.delete('/api/todos/:id', (req, res) => {
  const todo = todos.find(t => t.id === parseInt(req.params.id));
  if (!todo) return res.status(404).json({ error: 'Not found' });
  todos = todos.filter(t => t.id !== todo.id);
  res.json(todo);
});
```
**Related Files**: `packages/backend/src/app.js`

---

## Pattern: Testing-Library Accessible Queries
**Context**: Testing MUI components with `@testing-library/react` and `eslint-plugin-testing-library`
**Problem**: `testing-library/no-node-access` forbids DOM traversal like `.closest()`, `.querySelector()`, `.parentElement`
**Solution**: Add `aria-label` attributes to components and use `screen.getByRole()` with `name` option
**Example**:
```jsx
// In component — add aria-label
<IconButton aria-label={`delete ${todo.title}`} onClick={() => handleDelete(todo.id)}>
  <DeleteIcon />
</IconButton>

// In test — query by role + accessible name
const deleteButton = screen.getByRole('button', { name: /delete test todo/i });
await user.click(deleteButton);
```
**Related Files**: `packages/frontend/src/App.js`, `packages/frontend/src/__tests__/App.test.js`

---

## Pattern: Single Assertion per waitFor
**Context**: Async testing with `@testing-library/react`
**Problem**: `testing-library/no-wait-for-multiple-assertions` lint rule forbids multiple `expect()` calls inside `waitFor()`
**Solution**: Use separate `waitFor()` blocks for each assertion, or restructure to use `findBy*` queries
**Example**:
```javascript
// BAD
await waitFor(() => {
  expect(screen.getByText('A')).toBeInTheDocument();
  expect(screen.getByText('B')).toBeInTheDocument();
});

// GOOD
await waitFor(() => {
  expect(screen.getByText('A')).toBeInTheDocument();
});
expect(screen.getByText('B')).toBeInTheDocument();
```
**Related Files**: `packages/frontend/src/__tests__/App.test.js`

---

## Pattern: Relative API URLs with CRA Proxy
**Context**: Create React App frontend communicating with a backend API during development
**Problem**: Hardcoding `http://localhost:3001/api/todos` breaks in production and bypasses the CRA proxy
**Solution**: Use relative URLs (`/api/todos`) and configure the `proxy` field in `package.json`
**Example**:
```javascript
// In App.js
const API_URL = '/api/todos';

// In package.json
{ "proxy": "http://localhost:3001" }
```
**Related Files**: `packages/frontend/src/App.js`, `packages/frontend/package.json`
