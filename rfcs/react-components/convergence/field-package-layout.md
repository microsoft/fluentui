# RFC: Field Package Layout

---

Contributors: @behowell

## Summary

This RFC explores several options for which packages Field-related components should live in.

## Problem statement

Currently, all Field versions of the components are exported from a single package: `@fluentui/react-field` (this is described in more detail as Option 0 below). This results in a large package with unrelated components exported from it. This RFC aims to decide what is the best place to put the Field component definitions.

## Background

All form components have both a base version without a label (e.g. `Input`), and a Field version that adds a label, message, and layout options (e.g. `InputField`).

### Current package layout: export all from `@fluentui/react-field`

This is how the packages are currently organized: the `@fluentui/react-field` package exports all of the individual component field types (`InputField`, `TextareaField`, etc.), and has dependencies on each components' packages.

**Exports**

- `@fluentui/react-field` exports:
  - Field utilities (`useField_unstable`, etc.)
  - `CheckboxField`
  - `ComboboxField`
  - `InputField`
  - `ProgressField`
  - `RadioGroupField`
  - `SelectField`
  - `SliderField`
  - `SpinButtonField`
  - `SwitchField`
  - `TextareaField`

**Dependencies**

- `@fluentui/react-field` depends on:
  - `@fluentui/react-checkbox`
  - `@fluentui/react-combobox`
  - `@fluentui/react-input`
  - `@fluentui/react-progress`
  - `@fluentui/react-radio`
  - `@fluentui/react-select`
  - `@fluentui/react-slider`
  - `@fluentui/react-spinbutton`
  - `@fluentui/react-switch`
  - `@fluentui/react-textarea`
  - `@fluentui/react-icons`
  - `@fluentui/react-label`

## Detailed Design or Proposal

### ✅ Option 1: Export Field version from base component package

This would invert the dependencies, and have `@fluentui/react-field` be a utility package that only exports the definitions required to create Field components.

**Exports**

- `@fluentui/react-field` exports:
  - Field utilities (`useField_unstable`, etc.)
- `@fluentui/react-input` exports:
  - `Input`
  - `InputField`
- (Similar for other form component packages)

**Dependencies**

- `@fluentui/react-input` adds dependencies on:
  - `@fluentui/react-field`
    - `@fluentui/react-icons`
    - `@fluentui/react-label`
- (Similar for other form component packages)

#### Pros

- Keeps code related to a component and its Field version in the same place, and doesn't require modifying the base `@fluentui/react-field` package when adding a new component.
- Third parties can use the `@fluentui/react-field` package to create Field versions of their own components without pulling in dependencies on all input controls.

#### Cons

- Adds dependencies on field, label, and icons, to all form component packages. However, this should be tree-shaken out.

## Discarded solutions

### ❌ Option 0: Keep things as they are today

No change: export all field components from `@fluentui/react-field`

#### Pros

- Keeps react-field dependencies (including `@fluentui/react-label` and `@fluentui/react-icons`) out of base component packages.
- All Field-related code is in the same package.

#### Cons

- The `@fluentui/react-field` package depends on many other packages that are unrelated to each other.
- The code related to the base component and its Field version are split between two packages.
- Potentially unexpected that `Input` and `InputField` are in different packages.

### ❌ Option 2: Add `-field` versions of each package

Add the following packages:

- `@fluentui/react-checkbox-field`
- `@fluentui/react-combobox-field`
- `@fluentui/react-input-field`
- `@fluentui/react-progress-field`
- `@fluentui/react-radio-field`
- `@fluentui/react-select-field`
- `@fluentui/react-slider-field`
- `@fluentui/react-spinbutton-field`
- `@fluentui/react-switch-field`
- `@fluentui/react-textarea-field`

**Exports**

- `@fluentui/react-input-field` exports:
  - `InputField`
- (Similar for other new packages)

**Dependencies**

- `@fluentui/react-input-field` depends on:
  - `@fluentui/react-input`
  - `@fluentui/react-field`
    - `@fluentui/react-icons`
    - `@fluentui/react-label`
- (Similar for other new packages)

#### Pros

- Clean dependency graph; keeps Field and base components separate

#### Cons

- Much more overhead to create and maintain 10+ new packages
