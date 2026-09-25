import * as React from 'react';
import {
  Badge,
  Button,
  Field,
  FluentProvider,
  Input,
  Tab,
  TabList,
  webLightTheme,
  type ForwardRefComponent,
} from '@fluentui/react-components';
import { Checkbox } from '@fluentui/react-headless-components-preview/checkbox';
import { Checkmark20Regular } from '@fluentui/react-icons';
import styles from './App.module.css';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

type Filter = 'all' | 'active' | 'completed';

const initialTodos: Todo[] = [
  { id: 1, title: 'Explore installed APIs', completed: true },
  { id: 2, title: 'Build a focused interface', completed: false },
  { id: 3, title: 'Try the headless checkbox', completed: false },
];

export const App: ForwardRefComponent<React.ComponentPropsWithoutRef<'main'>> = React.forwardRef((props, ref) => {
  const [todos, setTodos] = React.useState(initialTodos);
  const [title, setTitle] = React.useState('');
  const [filter, setFilter] = React.useState<Filter>('all');
  const [error, setError] = React.useState('');
  const [announcement, setAnnouncement] = React.useState('');
  const nextId = React.useRef(4);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const remaining = todos.filter(todo => !todo.completed).length;
  const visible = todos.filter(todo => filter === 'all' || (filter === 'completed' ? todo.completed : !todo.completed));

  const addTodo = (event: React.FormEvent) => {
    event.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) {
      setError('Enter a task before adding it.');
      inputRef.current?.focus();
      return;
    }
    const todo = { id: nextId.current++, title: trimmed, completed: false };
    setTodos(current => [...current, todo]);
    setTitle('');
    setError('');
    setFilter('all');
    setAnnouncement(`Added ${trimmed}.`);
    inputRef.current?.focus();
  };

  const toggleTodo = (id: number, checked: boolean) => {
    setTodos(current => current.map(todo => (todo.id === id ? { ...todo, completed: checked } : todo)));
    if (filter !== 'all') {
      inputRef.current?.focus();
    }
  };

  const deleteTodo = (todo: Todo) => {
    setTodos(current => current.filter(item => item.id !== todo.id));
    setAnnouncement(`Deleted ${todo.title}.`);
    inputRef.current?.focus();
  };

  return (
    <FluentProvider theme={webLightTheme} className={styles.provider}>
      <main {...props} ref={ref} className={[styles.app, props.className].filter(Boolean).join(' ')}>
        <header className={styles.header}>
          <p className={styles.eyebrow}>A little focus goes a long way</p>
          <h1 className={styles.heading}>Today's tasks</h1>
          <p className={styles.subtitle}>One clear list. One small step at a time.</p>
        </header>
        <section className={styles.panel} aria-label="Todo workspace">
          <form className={styles.form} onSubmit={addTodo} noValidate>
            <Field
              label="New task"
              className={styles.field}
              validationState={error ? 'error' : 'none'}
              validationMessage={error || undefined}
            >
              <Input
                ref={inputRef}
                value={title}
                placeholder="What would you like to get done?"
                onChange={(_event, data) => {
                  setTitle(data.value);
                  setError('');
                }}
              />
            </Field>
            <Button appearance="primary" type="submit">
              Add task
            </Button>
          </form>
          <div className={styles.toolbar}>
            <TabList
              aria-label="Filter tasks"
              selectedValue={filter}
              onTabSelect={(_event, data) => {
                if (data.value === 'all' || data.value === 'active' || data.value === 'completed') {
                  setFilter(data.value);
                }
              }}
            >
              <Tab id="filter-all" aria-controls="task-panel" value="all">
                All
              </Tab>
              <Tab id="filter-active" aria-controls="task-panel" value="active">
                Active
              </Tab>
              <Tab id="filter-completed" aria-controls="task-panel" value="completed">
                Completed
              </Tab>
            </TabList>
            <Badge appearance="tint" aria-live="polite">
              {remaining} {remaining === 1 ? 'task' : 'tasks'} left
            </Badge>
          </div>
          <div id="task-panel" role="tabpanel" aria-labelledby={`filter-${filter}`}>
            {visible.length ? (
              <ul className={styles.list} aria-label="Tasks">
                {visible.map(todo => (
                  <li key={todo.id} className={styles.row} data-completed={todo.completed}>
                    <Checkbox
                      checked={todo.completed}
                      className={styles.checkbox}
                      input={{ className: styles.checkboxInput }}
                      indicator={{
                        className: styles.indicator,
                        children: todo.completed ? <Checkmark20Regular aria-hidden="true" /> : null,
                      }}
                      label={{ className: styles.label, children: todo.title }}
                      onChange={(_event, data) => toggleTodo(todo.id, data.checked === true)}
                    />
                    <Button appearance="subtle" aria-label={`Delete ${todo.title}`} onClick={() => deleteTodo(todo)}>
                      Delete
                    </Button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className={styles.empty} role="status">
                {filter === 'active'
                  ? 'All caught up.'
                  : filter === 'completed'
                  ? 'No completed tasks yet.'
                  : 'Your list is clear. Add a task to get started.'}
              </p>
            )}
          </div>
          <p className={styles.announcement} role="status">
            {announcement}
          </p>
        </section>
        <footer className={styles.footer}>
          Styled Fluent v9 controls. Headless checkboxes styled with CSS Modules.
          <br />
          Tasks stay in memory for this demo; refreshing starts over.
        </footer>
      </main>
    </FluentProvider>
  );
});
