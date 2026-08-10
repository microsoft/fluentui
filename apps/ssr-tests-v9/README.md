# @fluentui/ssr-tests-v9

**Tests for Server-side rendering (SSR) in [Fluent UI React v9](https://react.fluentui.dev)**.

# Internal stories for SSR tests

This project is not configured to host a storybook but contains
storyfiles. The storyfiles in this folder are used for test cases that we do
not want on the public docsite.

The project does not actually need to host a storybook, but the storybook
setup is still applied for consistency with other projects.

## Overlay runtime manual verification

The **Overlay Runtime / Manual Verification** story exercises the Headless
native Popover/Anchor implementation and its lazy Portal/Floating UI fallback.
It includes stable `data-testid` hooks for future Playwright coverage, but no
Playwright tests are added yet.

Start the private Storybook from the repository root:

```bash
yarn nx storybook ssr-tests-v9
```

Open:

```text
http://localhost:6006/?path=/story/overlay-runtime--manual-verification
```

Use the story's reload controls to run the checklist in:

- auto-detected mode;
- forced native mode;
- forced fallback mode.

The selected mode is stored in the `overlayRuntime` query parameter, and the
story displays the runtime actually applied to the rendered overlay surfaces.
