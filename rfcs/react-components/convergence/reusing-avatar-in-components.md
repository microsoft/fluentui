# RFC: Reusing Avatar in other components

@ling1726

## Summary

This RFC enumerates the possible ways to handle:

- Avatar default props
- Avatar default sizing

When the component is reused within other v9 components. There is a broader question of how to
internally reuse components in general, hopefully resolving the problem described in this RFC
will help us make easier decisions for component reuse in the future.

## Background

Fluent UI v9 has design requirements on each of its components. These requirements are compiled from product
usage. This is a good thing since our components can be easily used to power products. However one of the consequences
of stricter design requirements it the resuse of our own components. Sometimes the component reusage can involve
different defaults. How can we handle this in React Library?

## Problem statement

Let's use `Avatar` as an example. We have concrete problems here that involve the `Table` and `Persona` components.
Both of these components use `Avatar` and require a default size when used in those components.

```tsx
<Table size="smaller">
  <TableBody>
    <TableRow>
      <TableCell>
        {/* The Avatar should have size 20 to follow the Table size */}
        <TableCellLayout media={<Avatar />}>Main content</TableCellLayout>
      </TabeCell>
    </TableRow>
  </TableBody>
</Table>
```

The default size for the `Avatar` component is `32`. This means that the component that is reusing the avatar needs
to do some extra work to make sure that the avatar follows design guidance.

## Detailed Design or Proposal

### Shared context

We could consider a `AvatarContext` that is a part of `react-shared-contexts` that can be used by components that wish
to reuse the `Avatar`.

This solution is prototyped in [#24807](https://github.com/microsoft/fluentui/pull/24807)

```tsx
const tableAvatarSizeMap = {
  small: 24,
  smaller: 20,
};

export const renderTableCellLayout_unstable = state => {
  const { slots, slotProps } = getSlots<TableCellLayoutSlots>(state);

  return (
    <slots.root {...slotProps.root}>
      {/* Only affects the specific slot */}
      <AvatarContextProvider value={tableAvatarSizeGroup[state.size]}>
        {slots.media && <slots.media {...slotProps.media} />}
      </AvatarContextProvider>
    </slots.root>
  );
};
```

#### Pros

- We also use context for lots of other user cases - it works
- Can be targeted to the speific slot that needs these overrides
- Cheap cost of context ([#24991](https://github.com/microsoft/fluentui/pull/24991) measures perf

#### Cons

- Extra code in base component
- Needs prototyping and investigation
- If the slot is not speicfic enough -> all avatars under this context will be affected
- This might not scale - AvatarContext, IconContext...

## Discarded Solutions

### Userland problem

We could treat this as a userland problem, and require that apps/features follow design guidance when using an
avatar with these components.

```tsx
<Table size="smaller">
  <TableBody>
    <TableRow>
      <TableCell>
        {/* Explicitly set the size */}
        <TableCellLayout media={<Avatar size={20} />}>Main content</TableCellLayout>
      </TabeCell>
    </TableRow>
  </TableBody>
</Table>
```

#### Pros

- No extra logic in Fluent code

#### Cons

- Users must know about design guidance
- Cannot ship design updates i.e. users will need to upgrade all usages if design decides that "64px" will be new size
- Extra work for users

### Style override

This is a method that is already done to support a similar problem for icons in:

- PresenceBadge
- Combobox

The component should use selectors to target the contents of the slot and force the size. In the case of icons
a simple `svg` selector would work

```tsx
const useStyles = makeStyles({
  iconSlot: {
    '& svg': {
      width: '10px',
      height: '10px',
    },
  },
});
```

However when using this method with other components we would use the className selectors:

```tsx
const useStyles = makeStyles({
  avatarSlot: {
    '& fui-Avatar': {
      width: '10px',
      height: '10px',
    },
  },
});
```

#### Pros

- Users can use base components normally
- Override can be scoped to the single slot -> doesn't affect other slots

#### Cons

- Does not handle props
- Harder for users to override styles since selectors are more specific
- Not obvious for users how base component adjusts to the parent component - magic
- Scope is not necessarily certain, in the case of avatar there are many factors that affect overrides
  - font size
  - icon size
  - extra overrides for the badge

### Recompose components

This solution is used in `Toolbar` where `ToolbarButton` is recomposed from the normal `Button`

```tsx
const tableAvatarSizeMap = {
  small: 24,
  smaller: 20,
};

export function TableAvatar: React.FC<AvatarProps>(props) {
  // recomposed TableAvatar can read TableContext to adapt to its size prop
  const { size } = useTableContext();

   const state = useAvatar({...props, size: tableAvatarSizeMap[size]});
   state = useAvatarStyles(props);
   return renderAvatar(state);
}
```

```tsx
<Table size="smaller">
  <TableBody>
    <TableRow>
      <TableCell>
        {/* This will be sized automtically */}
        <TableCellLayout media={<TableAvatar />}>Main content</TableCellLayout>
      </TabeCell>
    </TableRow>
  </TableBody>
</Table>
```

#### Pros

- Best level of support for component reuse
- Can control everything from style override to props

#### Cons

- Lots of variations of a base component, TableAvatar, PersonaAvatar, ToolarAvatar...
- How do users know they should use a 'special' variant of the component?

### Separate slots

This solution is what the `Alert` currently does (however, it does not seem necessary in that component):

```tsx
export function useTableCellLayout() {
  const state = {
    components: {
      icon: 'span',
      avatar: Avatar,
    }
    avatar: resolveShorthand(props.avatar);
  }

  /** Avatar prop takes precedence over the icon*/
  if (!avatar) {
    icon = resolveShorthand(props.icon, {
      defaultProps: {
        children: defaultIcon,
      },
    });
    state.icon = icon;
  }

  return state;
}

export function renderTableCellLayout() {

}
```

```tsx
<Table size="smaller">
  <TableBody>
    <TableRow>
      <TableCell>
        <TableCellLayout icon={<Icon />}>Main content</TableCellLayout>
      </TabeCell>
      <TableCell>
        {/* Internally the slot will override the size */}
        <TableCellLayout avatar={{ presence: 'available' }}>Main content</TableCellLayout>
      </TabeCell>
    </TableRow>
  </TableBody>
</Table>
```

#### Pros

- Very obvious to know what 'media' components are supported
- Can configure the component through our well defined (and typesafe) shorthand API

#### Cons

- Bundle size - users who don't want to use avatar will have it in their bundle
- Confusing priorities - One slot wins over the other, it's why we have `appearance` prop

## Open Issues

<!-- Optional section, but useful for first drafts. Use this section to track open issues on unanswered questions regarding the design or proposal.  -->
