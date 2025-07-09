**NOTE:**

This is a local fork of `@types/enzyme` npm package.

**why is this needed:**

- We need this to properly pin enzyme react types usage to v17.
- Fix invalid import of `JSX` namespace form `react`
- yarn v1 nested resolution doesn't work
  - if we used `{ resolutions": { "@types/enzyme/@types/react":"^17" }}`, it would force @types/react@17 in every package instead following monorepo v18, which cause all sort of build failures of clashing/incompatible react types
