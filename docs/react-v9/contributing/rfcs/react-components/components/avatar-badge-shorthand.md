# RFC: Avatar badge shorthand

@behowell

## Problem statement

How should the shorthand for `Avatar`'s `badge` slot work?

The `Avatar` control's `badge` slot currently uses non-standard shorthand syntax, which is inconsistent with other controls.

For `badge` Unlike other slots, the content of the badge is the `status` prop of the `PresenceBadge` component, rather than the `children` prop.

E.g. with `<Avatar badge="away" />`, the badge slot renders `<PresenceBadge status="away" size="smaller" />`

## Possible solutions

Here's a summary of the 4 options that are detailed below:

1. `<Avatar badge="away" />`
2. `<Avatar badge={{ status: 'away' }} />`
3. `<Avatar badge={<PresenceBadge status="away" size="smaller" />} />`
4. `<Avatar status="away" />`

---

### Option 1. (CURRENT) Shorthand is the `status` of the `PresenceBadge`

```jsx
<Avatar badge="away" />
```

#### Pros

- Simple for the common use case
- Current behavior of alpha Avatar
- Any of the other options would be a breaking change from the current alpha version of Avatar.

#### Cons

- Non-standard shorthand (the value is the `status` instead of `children`)
- Adding text to the badge requires longhand (but this is probably uncommon?):
  `<Avatar badge={{ children: 'DF' }} />`
- Hard-coded to use `PresenceBadge`, with no way to use a custom component
  - `react-avatar` includes `PresenceBadge` in the bundle even if it's not used

---

### Option 2. The badge slot is a `PresenceBadge` with normal shorthand syntax

```jsx
<Avatar badge={{ status: 'away' }} />
```

#### Pros

- Matches behavior of other slots
- Adding children to the badge is the same as other slots (again, probably uncommon):
  `<Avatar badge="DF" />`

#### Cons

- Hard-coded to use `PresenceBadge`, with no way to use a custom component
- `react-avatar` includes `PresenceBadge` in the bundle even if it's not used

---

### Option 3. The badge slot is a `<span>` that can contain anything

```jsx
<Avatar badge={<PresenceBadge status="away" size="smaller" />} />
```

#### Pros

- Most versatile; not restricted to only using `PresenceBadge`:
  ```jsx
  <Avatar badge={<Badge>DF</Badge>} />
  ```
- `@fluentui/react-avatar` package doesn't pull in `PresenceBadge`

#### Cons

- User must pass the appropriate `size` prop to the badge (it can't be automatically calculated from the Avatar's `size`).
  - Badge's default size `medium` doesn't line up with Avatar's default size (should use badge size `smaller` at the default Avatar size).
  - We could possibly use a React context to solve this.
- More verbose syntax
- Extra `<span>` wrapper required around the badge

---

### Option 4. Add a `status` prop to Avatar

In this case, the `badge` slot would work the same as option 3, but adds a new `status` prop to Avatar:

```jsx
<Avatar status="away" />
```

This would add a default child to the `badge` slot, with its status and size props set:
`<PresenceBadge status="away" size="smaller" />`

#### Pros

- Simple to use `PresenceBadge`, which is the common case
- Supports any component for the `badge` slot

#### Cons

- `react-avatar` includes `PresenceBadge` in the bundle even if it's not used
- Two ways of accomplishing the same thing (could either write option 2)

## Proposed solution

After some discussion in [#19527](https://github.com/microsoft/fluentui/pull/19527) Option 2 above, where the proposal is for the badge slot to be a `PresenceBadge` with normal shorthand syntax, has emerged as the preferred solution that we are going to be implementing going forward.
