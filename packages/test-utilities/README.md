# @fluentui/test-utilities

Provides a set of common test utilities for testing code within the Fluent UI React repo.

## API

`safeCreate(jsxContent, callback): void` - Abstraction on `create` method in the `react-test-renderer` package which
will auto unmount after executing the given callback.

Example:

```tsx
safeCreate(<Foo />, foo => {
  // assert things about foo
});
```

`safeMount(jsxContent, callback): void` - Abstraction on `mount` method in `enzyme` package which
will auto unmount after executing the given callback.

Example:

```tsx
safeMount(<Foo />, foo => {
  // assert things about foo
});
```
