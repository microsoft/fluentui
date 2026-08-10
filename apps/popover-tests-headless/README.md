# @fluentui/popover-tests-headless

Private test application for the Headless overlay runtime.

The app exercises both implementations behind the same component APIs:

- native HTML Popover/Dialog and CSS Anchor Positioning;
- lazy Portal, Tabster, and `react-positioning` fallback.

No Playwright tests are included yet. The initial workflow is manual
verification, followed by Playwright coverage after the scenarios are approved.

## CSR manual verification

Start the private Storybook from the repository root:

```bash
yarn nx storybook popover-tests-headless
```

Open:

```text
http://localhost:6006/?path=/story/overlay-runtime--manual-verification
```

The story provides reload controls for:

- auto-detected mode;
- forced native mode;
- forced fallback mode.

It covers Popover placement and nesting, Menu, Tooltip, Dropdown, Dialog, and
Toast. Stable `data-testid` hooks are included for future Playwright tests.

## SSR verification

Run the SSR harness:

```bash
yarn nx run popover-tests-headless:test-ssr
```

The **Overlay Runtime / Server Rendered** story intentionally renders open
Popover, Menu, Tooltip, Dropdown, and Dialog state on the server. The same story
can also be opened in Storybook to inspect client hydration:

```text
http://localhost:6006/?path=/story/overlay-runtime--server-rendered
```
