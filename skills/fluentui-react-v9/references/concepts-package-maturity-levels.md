# Package Maturity Levels

This document explains the different maturity levels of Fluent UI v9 packages to help you make informed decisions about which components to use in your applications.

## Overview

Fluent UI v9 packages are categorized into four main maturity levels that indicate their stability and readiness for production use:

- **🟢 Stable**: Production-ready packages with stable APIs
- **🟡 Preview**: Early access packages in development with the intention to become stable
- **🔵 Compat**: Fluent UI v8 packages adapted to use v9 dependencies and APIs
- **🔴 Deprecated**: Unsupported packages with available alternatives

## Package Categories

### 🟢 Stable Packages

**Characteristics:**

- Production-ready with stable APIs
- Full support and maintenance
- Version format: `9.x.x`
- Available from `@fluentui/react-components` suite
- Naming convention: `@fluentui/react-<name>`

**Examples:** `@fluentui/react-button`, `@fluentui/react-text`

**Import path:** `@fluentui/react-components`

**When to use:** For all production applications where stability and long-term support are important.

---

### 🟡 Preview Packages

**Characteristics:**

- Early access components not yet part of the stable suite
- May introduce breaking changes
- Active development with intention to become stable
- Version format: `0.x.x` (Note: translates to `0.major.(minor|patch)`)
- Not available from `@fluentui/react-components` suite
- Naming convention: `@fluentui/react-<name>-preview` (with `-preview` suffix)

**Examples:** `@fluentui/react-nav-preview`

**Import path:** `@fluentui/react-<name>-preview`

**When to use:** When you need early access to new functionality and can tolerate potential breaking changes during updates.

**💡 Legacy Exemptions:**

Some packages don't follow the preview naming convention but are still considered preview status, as they were created before the preview phase was introduced:

- `@fluentui/theme`

---

### 🔵 Compat Packages

**Characteristics:**

- Fluent UI v8 components adapted to use v9 dependencies and APIs
- Maintain familiar v8 APIs for easier migration
- Serve as bridge components during v8 to v9 transition
- May introduce breaking changes
- Version format: `0.x.x` (Note: translates to `0.major.(minor|patch)`)
- Not available from `@fluentui/react-components` suite
- Naming convention: `@fluentui/react-<name>-compat` (with `-compat` suffix)

**Examples:** `@fluentui/react-datepicker-compat`, `@fluentui/react-calendar-compat`

**Import path:** `@fluentui/react-<name>-compat`

**When to use:** During migration from v8 to v9 when native v9 equivalents aren't available, or when you need time to gradually migrate complex implementations.

**Migration strategy:** Plan to migrate to native v9 components as they become available and stable.

---

### 🔴 Deprecated Packages

**Characteristics:**

- No longer supported or maintained
- Stable alternatives are typically available
- May not receive security updates or bug fixes
- Version format: varies (typically `9.0.0-alpha.x` or `9.0.0-beta.x`)
- Available from deprecated suite api `@fluentui/react-components/unstable`
- Naming convention: `@fluentui/react-<name>`

**Examples:** `@fluentui/react-alert`, `@fluentui/react-infobutton`

**Import path:** `@fluentui/react-components/unstable` (⚠️ **Note:** The `/unstable` API is deprecated)

**When to use:** Not recommended for new development. Migrate to stable alternatives immediately.

**Migration Guide:**

| Deprecated Package           | Stable Alternative                                   |
| ---------------------------- | ---------------------------------------------------- |
| `@fluentui/react-alert`      | `@fluentui/react-components` (`Toast`, `MessageBar`) |
| `@fluentui/react-infobutton` | `@fluentui/react-components` (`InfoLabel`)           |

**Migration strategy:** Migrate to stable alternatives as soon as possible. Deprecated packages may not receive updates or security fixes.

## Quick Reference

| Maturity Level | Version Format | Production Ready    | Breaking Changes | Import Source                         |
| -------------- | -------------- | ------------------- | ---------------- | ------------------------------------- |
| 🟢 Stable      | `9.x.x`        | ✅ Yes              | ❌ No            | `@fluentui/react-components`          |
| 🟡 Preview     | `0.x.x`        | ⚠️ Use with caution | ✅ Possible      | `@fluentui/react--preview`            |
| 🔵 Compat      | `0.x.x`        | ⚠️ Migration only   | ✅ Possible      | `@fluentui/react--compat`             |
| 🔴 Deprecated  | various        | ❌ No               | N/A              | `@fluentui/react-components/unstable` |
