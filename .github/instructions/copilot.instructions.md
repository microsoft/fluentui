# Fluent UI Copilot Instructions

You are working in the Microsoft Fluent UI monorepo, a comprehensive design system and UI component library for web applications. This repository contains multiple versions and implementations of Fluent UI components serving millions of users across Microsoft's products.

## Repository Overview

This is a large Nx monorepo (Nx 20.8.1) with the following key characteristics:

- **Package Manager**: Yarn with strict dependency management
- **Build System**: Nx workspace with custom plugins (`tools/workspace-plugin/`)
- **Node.js Versions**: ^20.0.0 || ^22.0.0
- **Languages**: TypeScript (strict mode), React, Web Components
- **Testing**: Jest, Cypress (E2E), Chromatic (VR), SSR testing
- **Documentation**: Storybook sites, API docs via API Extractor
- **Release**: Beachball for version management and change files

## Project Structure

1. **Fluent UI v9** (`@fluentui/react-components`) - **PRIORITIZE FOR NEW WORK**

   - Location: `packages/react-components/`
   - Features: Current stable version, actively developed. Tree-shakeable, atomic CSS classes

2. **Fluent UI v8** (`@fluentui/react`) - **MAINTENANCE ONLY**

   - Location: `packages/react/`
   - Status: Maintenance mode
   - Features: Runtime styling, mature and stable

3. **Web Components** (`@fluentui/web-components`) - Framework-agnostic
   - Location: `packages/web-components/`
   - Used by: Microsoft Edge
   - Features: Platform-agnostic web standards

More information about the projects and their status can be found through NX tags.

## Development Guidelines

### Essential Nx Workspace Commands

This workspace uses **Nx 20.8.1** with custom workspace plugins. Key commands:

```bash
# Initial setup
yarn                                    # Install dependencies and link packages
yarn clean                              # Clean all build artifacts

# Development workflows
yarn start                              # Interactive prompt to choose project to run
yarn nx run <project>:build             # Build specific project with dependencies
yarn nx run-many -t build               # Build multiple projects
yarn nx run <project>:test              # Run tests for specific project
yarn nx run <project>:test -u           # Update Jest snapshots
yarn nx run <project>:start             # Start Storybook for component

# Component generation (v9 only)
yarn create-component                   # Interactive component generator

# Release management
yarn change                             # Create beachball change file (required for PRs)

# Show project targets
yarn nx show projects                   # List all projects
```

### Component Development Workflow

**For v9 components** (preferred):

1. Navigate to `packages/react-components/`
2. Use generator: `yarn create-component` or direct Nx command
3. Follow hook-based architecture pattern exactly
4. Add comprehensive tests and Storybook stories
5. Run `yarn nx run <project>:generate-api` to update API docs
6. Create change file with `yarn change` before PR

**For v8 components** (maintenance only):

- Work in `packages/react/` with extreme caution
- No new features, only critical bug fixes

### Testing Architecture

**Multi-layered testing strategy** ensures quality at scale:

```bash
# Unit Tests - Jest + React Testing Library + SWC transforms
yarn nx run react-button:test
yarn nx run react-button:test -u              # Update snapshots

# Visual Regression - Chromatic via Storybook
yarn nx run react-button:build-storybook
yarn nx run vr-tests-react-components:test-vr

# E2E Integration Tests - Cypress
yarn nx run react-components:e2e

# SSR Compatibility Tests
yarn nx run ssr-tests-v9:test-ssr

# Cross-version React compatibility
yarn nx run react-17-tests-v9:test
yarn nx run react-18-tests-v9:test
yarn nx run react-19-tests-v9:test
```

### Code Quality and Standards

- **Linting**: ESLint with custom `@fluentui/eslint-plugin` rules
- **Formatting**: Prettier (automatic via lint-staged)
- **Type checking**: TypeScript strict mode required
- **Testing**: Jest for unit tests, minimum 80% coverage expected
- **Bundle analysis**: Automated bundle size tracking via build pipeline

## Important Patterns and Conventions

### File Organization Patterns

**CRITICAL**: Every v9 component follows this exact architectural pattern:

```
# v9 Component Structure (EXACT pattern required)
packages/react-components/react-component-name/
├── library/src/                                # Implementation source
│   ├── index.ts                                # Re-exports everything
│   ├── ComponentName.tsx                       # Main component export
│   ├── components/ComponentName/               # Core implementation
│   │   ├── ComponentName.test.tsx              # Unit tests (adjacent)
│   │   ├── ComponentName.tsx                   # ForwardRefComponent
│   │   ├── ComponentName.types.ts              # Props, State, Slots
│   │   ├── index.ts                            # Local exports
│   │   ├── renderComponentName.tsx             # JSX rendering
│   │   ├── useComponentName.ts                 # State management
│   │   └── useComponentNameStyles.styles.ts    # Griffel styling
│   ├── testing/                                # Test utilities
│   └── utils                                   # Reusable utils (if needed)
└── stories/src/                                # Storybook documentation
    ├── ComponentName.stories.tsx               # Component stories
    └── ComponentNameDefault.stories.tsx        # Default story
```

### Component Structure Pattern

```
react-component-name/
├── library/src/
│   ├── index.ts                                # Main package exports
│   ├── ComponentName.ts                        # Main export (calls hooks + render)
│   ├── components/ComponentName/               # Hook-based architecture
│   │   ├── ComponentName.tsx                   # Main component export
│   │   ├── ComponentName.types.ts              # Props, State, Slots types
│   │   ├── useComponentName.ts                 # State management hook
│   │   ├── useComponentNameStyles.styles.ts    # Griffel styling
│   │   └── renderComponentName.tsx             # JSX rendering logic
│   └── index.ts                                # Package exports
└── stories/                                    # Storybook stories
```

### Hook-Based Architecture

Components use three core hooks:

1. **`useComponent_unstable()`** - Processes props, slots and main component logic into normalized state
2. **`useComponentStyles_unstable()`** - Creates Griffel CSS-in-JS styling
3. **`renderComponent_unstable()`** - Pure JSX rendering from state

### Slot System

**Critical Pattern**: All v9 components use slots for extensibility and consistent rendering:

```tsx
// Define slots in types
type ButtonSlots = {
  root: Slot<'button'>;
  icon?: Slot<'span'>;
};

// Create slots in hook using slot.always() or slot.optional()
const state: ButtonState = {
  root: slot.always(props.root, { elementType: 'button' }),
  icon: slot.optional(props.icon, { elementType: 'span' }),
};

// Render slots with assertSlots for type safety
export const renderButton_unstable = (state: ButtonState) => {
  assertSlots<ButtonSlots>(state);
  return (
    <state.root>
      {state.icon && <state.icon />}
      {state.root.children}
    </state.root>
  );
};
```

### Build-Time CSS-in-JS with Atomic Classes

**Critical**: v9 uses Griffel for compile-time CSS generation - styles are extracted into atomic CSS classes at build time, not runtime:

```tsx
// useButtonStyles.styles.ts
import { makeStyles } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';

export const useButtonStyles = makeStyles({
  root: {
    // Use design tokens, not hardcoded values
    color: tokens.colorNeutralForeground1,
    backgroundColor: tokens.colorNeutralBackground1,
    padding: `${tokens.spacingVerticalS} ${tokens.spacingHorizontalM}`,

    // Pseudo-selectors and media queries supported
    ':hover': {
      backgroundColor: tokens.colorNeutralBackground1Hover,
    },

    ':focus-visible': {
      outline: `${tokens.strokeWidthThick} solid ${tokens.colorStrokeFocus2}`,
    },
  },

  // Size variations
  small: { padding: tokens.spacingVerticalXS },
  large: { padding: tokens.spacingVerticalL },
});

// Apply in component hook
export const useButton_unstable = (props, ref) => {
  const classes = useButtonStyles();
  const state = {
    /* ... */
  };

  state.root.className = mergeClasses(
    classes.root,
    props.size === 'small' && classes.small,
    props.size === 'large' && classes.large,
    state.root.className, // Always preserve user className
  );

  return state;
};
```

### Design Tokens System

**Always use design tokens** from `@fluentui/tokens` instead of hardcoded values:

```tsx
// ✅ CORRECT - uses semantic design tokens
color: tokens.colorBrandForeground1;
padding: tokens.spacingVerticalM;
borderRadius: tokens.borderRadiusMedium;

// ❌ AVOID - hardcoded values break theming
color: '#0078d4';
padding: '8px';
borderRadius: '4px';
```

### Theme Architecture

Themes define CSS custom properties consumed by components:

```tsx
// FluentProvider injects CSS variables into DOM
<FluentProvider theme={webLightTheme}>
  <App />
</FluentProvider>;

// Components reference tokens which resolve to CSS variables
makeStyles({
  root: {
    color: tokens.colorNeutralForeground1, // becomes 'var(--colorNeutralForeground1)'
  },
});
```

### TypeScript Patterns (v9)

**Strict typing with consistent interfaces:**

```tsx
// Component.types.ts - REQUIRED pattern
export type ComponentProps = ComponentPropsWithRef<'div'> & {
  appearance?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
};

export type ComponentState = Required<Pick<ComponentProps, 'appearance' | 'size'>> & {
  components: ComponentSlots;
  root: SlotProps<'div'>;
};

export type ComponentSlots = {
  root: Slot<'div'>;
  icon?: Slot<'span'>;
};

// Main component must use ForwardRefComponent
export const Component: ForwardRefComponent<ComponentProps> = React.forwardRef((props, ref) => {
  // Hook pattern implementation
});
```

### Testing Requirements

**Comprehensive testing is mandatory** for all component changes:

### Accessibility Standards

**WCAG 2.1 compliance required** for all interactive components:

- Provide proper ARIA labels and roles
- Support keyboard navigation patterns
- Test with screen readers (NVDA, JAWS, VoiceOver)
- High contrast mode compatibility required

## Documentation and Resources

- **Main docs**: <https://react.fluentui.dev/>
- **v8 docs**: <https://aka.ms/fluentui-react>
- **Web Components docs**: <https://aka.ms/fluentui-web-components>
- **Design specs**: Located in `specs/` directory
- **Storybook**: Run locally with appropriate build commands

### Code Style

- Use TypeScript strict mode
- Follow existing patterns in similar components
- Comprehensive prop interfaces with JSDoc comments
- Consistent naming conventions (PascalCase for components, camelCase for props)
- Use React hooks and modern patterns for v9 components
- Focus on the slot system, Griffel styling, and hook-based architecture for v9

### Testing Requirements

- Unit tests for all public APIs
- Accessibility tests for interactive components
- Visual regression tests via Storybook
- Cross-browser compatibility considerations

## Migration and Compatibility

- v8 and v9 components can coexist in the same application
- Gradual migration is supported and encouraged
- Pay attention to design token usage for consistent theming
- Consider bundle size impact when mixing versions

When working in this repository, always prioritize accessibility, design system consistency, and maintainability. The codebase serves millions of users across Microsoft's products, so quality and reliability are paramount.

## GitHub Issue and Pull Request Labeling

### Issue Labels

The repository uses automated labeling based on issue templates and PR file changes. Understanding the labeling system helps with proper issue categorization and triage.

#### Core Label Categories

**Type Labels** (required for all issues):

- `Type: Bug :bug:` - Bug reports across all platforms
- `Type: Feature` - Feature requests and enhancements
- `Area: Documentation` - Documentation issues and improvements

**Product/Platform Labels** (auto-assigned by issue templates):

- `Fluent UI react-components (v9)` - v9 React components
- `Fluent UI react (v8)` - v8/legacy React components
- `web-components` - Web Components implementation
- `Fluent UI WC (v3)` - Web Components v3 specific
- `Package: charting` - React Charting components

**Triage Labels**:

- `Needs: Triage :mag:` - Automatically applied to new issues, requires team review
- `Area: Build System` - Build tooling and infrastructure

#### Issue Template Mapping

**For React Components v9 bugs**:

```yaml
labels: ['Type: Bug :bug:', 'Needs: Triage :mag:', 'Fluent UI react-components (v9)']
```

**For React v8 bugs**:

```yaml
labels: ['Type: Bug :bug:', 'Needs: Triage :mag:', 'Fluent UI react (v8)']
```

**For Web Components bugs**:

```yaml
labels: ['Type: Bug :bug:', 'Needs: Triage :mag:', 'web-components', 'Fluent UI WC (v3)']
```

**For Feature Requests**:

```yaml
labels: ['Type: Feature', 'Needs: Triage :mag:']
```

**For Documentation Issues**:

```yaml
labels: ['Area: Documentation', 'Needs: Triage :mag:']
```

### Pull Request Labels

PRs receive automatic labels based on file changes via GitHub Actions using `.github/labeler.yml`:

**Workflow Labels**:

- `Type: RFC` - Changes to RFC documentation (`docs/react-v9/contributing/rfcs/**`)
- `CI` - Changes to CI/CD pipelines (`.github/**`, `.devops/**`, `azure-pipelines*.yml`)

**Nx Workspace Labels**:

- `NX: core` - Core Nx configuration changes (`tools/workspace-plugin/**`, `nx.json`, `**/project.json`)
- `NX: workspace generators` - Nx generator changes (`tools/workspace-plugin/src/generators/*`)
- `NX: workspace executors` - Nx executor changes (`tools/workspace-plugin/src/executors/*`)
- `NX: workspace eslint-rules` - ESLint rule changes (`tools/eslint-rules/*`)

### Automated Triage System

The repository uses a triage bot that automatically assigns labels and assignees based on issue content:

**Trigger Keywords** (from `.github/triage-bot.config.json`):

- `(@fluentui/react-northstar)` → `["Fluent UI react-northstar (v0)", "Needs: Triage :mag:"]`
- `(@fluentui/react)` → `["Fluent UI react (v8)", "Needs: Triage :mag:"]`
- `(@fluentui/react-components)` → `["Fluent UI react-components (v9)", "Needs: Triage :mag:"]`
- `(@fluentui/web-components)` → `["web-components"]`

### Best Practices for Contributors

**When Creating Issues**:

1. Use appropriate issue template - labels are automatically applied
2. Select correct component/package from dropdown - helps with routing
3. Include package version and relevant details
4. Don't manually add labels - let automation handle initial triage

**When Creating Pull Requests**:

1. Labels are automatically applied based on changed files
2. Focus on clear PR titles and descriptions
3. Reference related issues with proper syntax (`Fixes #123`)
4. Create change files for breaking changes (`yarn change`)

**For Maintainers**:

1. Review `Needs: Triage :mag:` label for new items
2. Add component-specific labels after triage if needed
3. Use consistent labeling for similar issues to help automation learning
4. Update triage bot configuration when adding new packages/areas
