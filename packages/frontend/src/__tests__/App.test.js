import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from '../App';

// Create a test query client with no retries for predictable testing
const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
      mutations: {
        retry: false,
      },
    },
  });

const renderApp = () => {
  const testQueryClient = createTestQueryClient();
  return render(
    <QueryClientProvider client={testQueryClient}>
      <App />
    </QueryClientProvider>
  );
};

// Helper to set up fetch mock with todos
const mockFetchWithTodos = (todos) => {
  global.fetch = jest.fn((url, options) => {
    if (options && options.method === 'DELETE') {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(todos.find((t) => url.includes(t.id))),
      });
    }
    if (options && options.method === 'PUT') {
      const body = JSON.parse(options.body);
      const id = parseInt(url.split('/').pop());
      const todo = todos.find((t) => t.id === id);
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ ...todo, ...body }),
      });
    }
    return Promise.resolve({
      ok: true,
      json: () => Promise.resolve(todos),
    });
  });
};

afterEach(() => {
  jest.restoreAllMocks();
});

test('renders TODO App heading', async () => {
  mockFetchWithTodos([]);
  renderApp();
  const headingElement = await screen.findByText(/TODO App/i);
  expect(headingElement).toBeInTheDocument();
});

describe('Empty state', () => {
  test('shows empty state message when there are no todos', async () => {
    mockFetchWithTodos([]);
    renderApp();
    const emptyMessage = await screen.findByText(/no todos yet/i);
    expect(emptyMessage).toBeInTheDocument();
  });
});

describe('Stats', () => {
  test('shows correct count of incomplete items', async () => {
    mockFetchWithTodos([
      { id: 1, title: 'Todo 1', completed: false, createdAt: new Date().toISOString() },
      { id: 2, title: 'Todo 2', completed: true, createdAt: new Date().toISOString() },
      { id: 3, title: 'Todo 3', completed: false, createdAt: new Date().toISOString() },
    ]);
    renderApp();
    const itemsLeft = await screen.findByText(/2 items left/i);
    expect(itemsLeft).toBeInTheDocument();
  });

  test('shows correct count of completed items', async () => {
    mockFetchWithTodos([
      { id: 1, title: 'Todo 1', completed: false, createdAt: new Date().toISOString() },
      { id: 2, title: 'Todo 2', completed: true, createdAt: new Date().toISOString() },
      { id: 3, title: 'Todo 3', completed: true, createdAt: new Date().toISOString() },
    ]);
    renderApp();
    const completed = await screen.findByText(/2 completed/i);
    expect(completed).toBeInTheDocument();
  });
});

describe('Delete functionality', () => {
  test('calls delete API when delete button is clicked', async () => {
    const user = userEvent.setup();
    const todos = [
      { id: 1, title: 'Test Todo', completed: false, createdAt: new Date().toISOString() },
    ];
    mockFetchWithTodos(todos);
    renderApp();

    // Wait for todo to render
    await screen.findByText('Test Todo');

    // Find and click the delete button by its aria-label
    const deleteButton = screen.getByRole('button', { name: /delete test todo/i });
    await user.click(deleteButton);

    // Verify fetch was called with DELETE method
    await waitFor(() => {
      const deleteCalls = global.fetch.mock.calls.filter(
        (call) => call[1] && call[1].method === 'DELETE'
      );
      expect(deleteCalls.length).toBe(1);
    });
  });
});

describe('Error handling', () => {
  test('shows error message when API fetch fails', async () => {
    global.fetch = jest.fn(() => Promise.reject(new Error('Network error')));
    renderApp();
    const errorMessage = await screen.findByText(/error/i);
    expect(errorMessage).toBeInTheDocument();
  });
});
