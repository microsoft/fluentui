# @fluentui/react-headless-components-preview

**React Headless Components for [Fluent UI React](https://react.fluentui.dev/)**

> [!WARNING] > **This package is in preview and not production-ready.** APIs may change without notice before final release. **Do not use in production.**
>
> This package exposes unstyled, headless Fluent UI v9 primitives for teams building custom design systems. For most teams, [`@fluentui/react-components`](https://www.npmjs.com/package/@fluentui/react-components) remains the recommended default.

## State selector contract

Headless components expose resolved interaction and structural state through `data-*` attributes. Consumers that wrap these components, including visual-system packages, must preserve the attributes on the slot where headless emits them.

Boolean state attributes are present with an empty value when active and absent otherwise. Resolved disabled and read-only state belongs on the control's styling root; AvatarGroup overflow state belongs on the item root, and popover open state belongs on its trigger button. Persona exposes its text-line count as `data-text-lines`, and icon-only Badge content is identified by `data-icon-only`.

Field uses `data-validation-state` to match its `validationState` prop. This corrects the previous `data-validate-state` spelling: consumers must update selectors using the old name. ProgressBar continues to use `data-indeterminate`; a second `data-state` attribute is unnecessary.

Visual axes such as appearance, size, shape, density, and Field/RadioGroup layout are intentionally not part of the headless contract. Styled wrappers can re-resolve slots with their own components, icons, layout wrappers, and typography. The existing Field label and `validationMessageIcon` slots support this composition; a separate label-component API is not required. Popover and Tooltip offsets likewise remain the visual system's responsibility.

TeachingPopoverSurface defaults to dialog semantics without enabling modal focus trapping. Header and title dismiss buttons render by default, use `type="button"`, and receive initial focus. Consumers can suppress either slot with `dismissButton={null}` or opt out with `dismissButton={{ autoFocus: false }}`. Dismissal respects a consumer's `preventDefault()` and delegates focus restoration to the headless Popover's native close lifecycle.
