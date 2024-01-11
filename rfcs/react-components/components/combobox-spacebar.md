# RFC: Combobox spacebar behavior

@smhigley @jurokapsiar

## Summary

This RFC deals with how to provide space-to-type behavior in v9 Comboboxes.

## Background

The central issue is that spacebar is both a common selection key and a typeable character, and Combobox is a control with both selection and typing functionality.

While this RFC deals only with Combobox and not Dropdown, it is important to note that semantically Combobox and Dropdown are essentially the same. Expectations among screen reader users for keyboard behavior seem to easily carry over between the two. Non-editable comboboxes are a more common and simple control, and are likely influencing keyboard expectations with editable comboboxes.

Another important factor to note is that using Enter to select is not as common as might be expected, since it is also the key that submits a form, and often avoided within forms for that reason. This is less of an issue with a standalone combobox where selection and submission are not different interactions.

Currently, there is an agreement on inserting a space character when freeform variant is used and the user has not interacted with the dropdown list. See [feat: react-combobox space conditionally inserts character when freeform is true](https://github.com/microsoft/fluentui/pull/27025) for details.

## Precedence

- In v8 Combobox and v0 Dropdown, spacebar did not select
- Office editable comboboxes select on space when opened with alt+down, but not when opened with the down arrow alone
- On Windows, non-editable comboboxes (similar to v9 Dropdown) in Settings select with space. Editable comboboxes in apps like Explorer and Activity monitor allow space as a character

## User study

In an A/B user study focusing primarily on screen reader users and alternative input users (keyboard, switch, voice control), people using the keyboard overwhelmingly expected space to select in all comboboxes. In variations where space did not select, this was called out as one of the primary confusing things about the component, particularly strongly with multiselect comboboxes.

The two caveats to consider when evaluating the user study are that it is impossible to fully and realistically recreate real-world app context and expectations in an isolated test UI, and also that it focused on a small group (~12) of participants who all used some form of assistive tech. It points towards an expected behavior, but is not an absolute conclusion.

## Context

The surrounding context of an app or website is also likely to influence user expectations on keyboard behavior. Typing a name into a `To: ` input in Outlook or Teams is likely to influence users to expect space to insert a character. Moving through multiple fields in a form is more likely to influence users to expect space to select. The ideal spacebar behavior is likely to differ based on how and where the v9 Combobox is being used.

The content of options also influences user expectations -- there would be a greater expectation of space-to-type when options contain a space in them, for example multi-word options, names, states or cities.

One of the risks is that the developers and designers may not be in a position to make a correct decision on the value of the prop. This is because options are usually either translations or user data, which may contain spaces that the authoring team was not aware of. We generally can't expect authors to understand all possible translations across supported languages or the specific validations of the user data at UI authoring time. While the occaisonal space character does not necessarily mean that space should not select, translations and user data do introduce the possibility of frequent spaces within multiple options.

## Problem statement

We cannot fully know whether the ideal spacebar behavior is to select or insert a character, since we don't know the full context of usage. Our choices mostly revolve around balancing providing more flexibility vs. more consistency, and choosing the best default if we do provide flexibility.

## Solution

After the offline discussion (happened at 17th May 23) we went with the following solution.

### 3. Always allow space to insert a character

- `Dropdown` does select on space
- `Combobox` does not select on space, always inserts a character in the input

#### Pros

- Authors don't need to try to figure out what the ideal space key behavior is on a case-by-case basis / less authoring overhead for an already complex component
- Consistent behavior across all apps using Fluent

#### Cons

- There is no way to opt into space-to-select behavior

## Rejected options

### 1. `allowSpaceCharacter` prop, default to `true`

This is the option that allows authors to choose the best behavior for their use case, defaulting to allowing space to insert a character. This borrows the behavior from the freeform PR, where space will still select if the user is actively interacting with the dropdown listbox (i.e. it is open, and the last interaction was to navigate through options).

We would likely include author guidance that all Comboboxes within their app use the same behavior for `allowSpaceCharacter`.

#### Pros

- Allows authors to choose the best behavior per use case
- Defaulting to `true` means the default probably(?) matches the majority of Combobox usage
- Defaulting to `true` means that often-missed use cases like spaces in translated strings or user-generated options won't cause issues

#### Cons

- Defaulting to `true` means the simplest/most basic use case is not the default
- Defaulting to `true` means the Combobox space behavior is different from Dropdown by default, which primarily affects keyboard and screen reader users.
- Providing a prop to alter the space key behavior potentially means inconsistent behavior within an app, or across related apps
- This behavior is not aligned with the results of the user study

### 2. `allowSpaceCharacter` prop, default to `false`

This is the same as (1), but with a different default. The Pros/Cons list is essentially the same, but reversed.

### 4. Always allow space to insert a character on single-select Comboboxes, always select on multi-select comboboxes

Since options visually look like they have check marks and semantically use `aria-checked` instead of `aria-selected`, there is a stronger expectation of space-to-select. Additionally, multiselect comboboxes are already hitting a limit of too much complexity for one component, and most use cases would benefit from using either the multiselect Dropdown or single-select Combobox + tags instead. Opting into a simpler, more intuitive but less feature-rich UX might result in a less error-prone UX in this variant in particular.

#### Pros

- Authors don't need to figure out ideal space key behavior on a case-by-case basis
- Consistent behavior across all apps using Fluent
- The variant with the strongest expectation of space-to-select keeps that behavior

#### Cons

- There is no way to opt into space-to-select on single-select combos, or space-to-type on multiselect combos

### 5. Provide a context that sets spacebar default behavior

In this option, we would still have an `allowSpaceCharacter` prop with one of the defaults in (1) or (2), but also provide a context that allows an entire app to change the default for all Comboboxes within it.

#### Pros

- Allows an app team to choose the best behavior for all Comboboxes within it
- Splits some of the difference between choice vs. consistency

#### Cons

- Requires a new top-level context
- Still has a lack of standardization between apps, which may or may not be an issue
- Use cases may vary within an app, which still comes with the same pros/cons of options (1) and (2)

## Open Issues

Spacebar behavior issues: https://github.com/microsoft/fluentui/issues/26361, https://github.com/microsoft/fluentui/issues/26295
Freeform PR: https://github.com/microsoft/fluentui/pull/27025
