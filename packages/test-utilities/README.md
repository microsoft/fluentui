# @fluentui/test-utilities

Set of common test utilities for testing code within the Fluent UI React repo.

**React support:** 16 and 17.

> [!WARNING]
> ⚠️ Most of this package public API is deprecated and won't work with new React major versions. Pleas migrate to `@testing-library/react` instead
>
> If you gonna run incompatible APIs with new React major versions those will throw Runtime Error with appropriate message.
>
> **Affected APIs:**
>
> - `create` / wont work with React >=19
> - `safeCreate` / wont work with React >=19
> - `safeMount` / wont work with React >=18
