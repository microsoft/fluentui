# Fluent UI Charts Accessibility Prompt Add-on

This file provides **Fluent UI charts-specific context** to be used in conjunction with `accessibility_fix.prompt.md`.

---

### Repository Structure

- **Monorepo Structure:**
  Fluent UI is a monorepo.
- **Charts Packages:**
  - `packages/charts/react-charting` → v8 charts implementation (reference only).
  - `packages/charts/react-charts/library` → v9 charts implementation (fixes should be made here).

---

### Development Commands

**Don't use && as it runs on yarn workspace in powershell**

- Build package -

  ```bash
  yarn --cwd packages/charts/react-charts/library nx run react-charts:build
  ```

- Start Storybook server for development -
  ```bash
  yarn --cwd packages/charts/react-charts/library nx run react-charts:start
  ```
