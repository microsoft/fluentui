# Consistency Check

The following components and their props were reviewed as of 9/7/2021 for consistency.

Accordian, AccordianHeader, AccordianItem, AccordianPanel
Avatar
Badge, CounterBadge, PresenceBadge,
Button, CompoundButton, MenuButton, ToggleButton,
Divider,
Image,
Label,
Link,Menu, MenuDivider, MenuGroup, MenuGroupHeader,MenuItem, MenuItemCheckbox, MenuItemRadio, MenuList, MenuPopover, MenuTrigger
Popover, PopoverSurface, PopoverTrigger
Portal

## Nit: Explicit component type declaration

> Some components declare their type explicity, others do not.

**Recommendations**

- Based on [forwardRef PR](https://github.com/microsoft/fluentui/pull/19812) from Ben, prefer allowing the component types to be inferred

**Proposed Work Items**

- [ ] Update components to use new forwardRef

**Details**

```tsx
export const Accordion: React.FunctionComponent<AccordionProps & React.RefAttributes<HTMLElement>> = React.forwardRef<
  HTMLElement,
  AccordionProps
>((props, ref) =>
```

```tsx
export const Avatar = React.forwardRef((props: AvatarProps, ref: React.Ref<HTMLElement>) =>
```

## Props declared as interfaces vs types

> Some props are defined as interfaces and extended. Others are defined as types and intersected. This isn't always consistent within the same component.

**Documentation**

- [TS docs](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#differences-between-type-aliases-and-interfaces)
- [TS playgroud](https://www.typescriptlang.org/play?q=414#example/types-vs-interfaces) recommends interfaces, but may be outdated :
  - interfaces provide better error messages
  - you can extend an interface by declaring it a second time
- [StackOverflow thread](https://stackoverflow.com/questions/37233735/interfaces-vs-types-in-typescript/52682220#52682220) adds more information:
  - Type aliases can be used for primitives, unions, and tuples.
  - Classes canot implement a type alias that use sa union type.
- [Team discussion](https://github.com/microsoft/fluentui/pull/19376#discussion_r700046363)
  - Types can be inlined leading to inflated declaration files
  - Non-exported interfaces required by a declaration give an error (because they can't be inlined)
  - No clear decision at the time.

**Recommendations**

- Use types and intersections over interfaces.
  - Even though Typescript recommends interfaces, their recommendation is in the context of using classes. React hooks is functional programming and I think types are the expected approach.
  - Unless the types cause so much duplication that we have a bundle size problem, I think they are worth it especially with the union problem.
  - I don't think we want to leverage the declaration merging of interfaces, so that isn't a key requirement.
  - The interface error messages are only marginally better than the types. The component composition is complex enough that devs will need to decipher it either way.
  - I think we can look at ways to make the API documentation better. I'm happy to investigate that.

**Proposed Work Items**

- [ ] Update all vNext component props to use types and intersections.

**Details**

Note: I won't list out every component here. We can scrub once we decide the right approach.

```ts
export interface AccordionProps extends ComponentProps<AccordionSlots>, Partial<AccordionCommons>

export type AccordionSlots
export interface AccordionCommons
```

```ts
export interface AccordionHeaderProps extends ComponentProps<AccordionHeaderSlots>, Partial<AccordionHeaderCommons>

export type AccordionHeaderSlots
export interface AccordionHeaderCommons
```

## Props extending ComponentProps vs. ComponentPropsCompat

**Recommendations**

- (none)

**Proposed Work Items**

- (none)

**Details**

> Some props are still extended from ComponentPropsCompat

AvatarProps, BadgeProps, ButtonProps, ...

> Some props have properties using ShorthandPropsCompat

AvatarProps (badge, image, label, icon), BadgeProps (icon), ButtonProps (icon), ...

## Slots and HTML attributes

**Recommendations**

- (none)

**Proposed Work Items**

- (none)

**Details**

> Only Accordian and Menu components use ComponentProps<> with slots currently.

AccordionSlots

```ts
root: ObjectShorthandProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
```

AccordionHeaderSlots

```ts
root: ObjectShorthandProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
  button: ARIAButtonShorthandProps;
  expandIcon: AccordionHeaderExpandIconProps;
  icon?: ObjectShorthandProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
  children: ObjectShorthandProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
```

AccordianItemSlots, AccordianPanelSlots

```ts
root: ObjectShorthandProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
```

MenuSlots

```ts
(empty type)
```

MenuDividerSlots, MenuGroupSlots, MenuGroupHeaderSlots, MenuListSlots, MenuPopoverSlots

```ts
root: ObjectShorthandProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
```

MenuItemSlots

```ts
root: ObjectShorthandProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
icon?: React.HTMLAttributes<HTMLElement>;
checkmark?: React.HTMLAttributes<HTMLElement>;
submenuIndicator?: React.HTMLAttributes<HTMLElement>;
content: React.HTMLAttributes<HTMLElement>;
secondaryContent?: React.HTMLAttributes<HTMLElement>;
```

## Compat and HTML attributes

**Recommendations**

- (none)

**Proposed Work Items**

- (none)

**Details**

> The components not yet using slots extend ComponentPropsCompat and provide HTML attributes by extending the associated React HTML attribute types (e.g `React.HTMLAttributes<HTMLElement>`).
> PortalProps and PopoverTriggerProps do not extend any HTML attributes, but provide children as a property directly in their types.

AvatarProps,BadgeProps,DividerProps, TooltipProps

```ts
extends ComponentPropsCompat, React.HTMLAttributes<HTMLElement>
```

ButtonProps

```ts
ButtonProps = ComponentPropsCompat & React.ButtonHTMLAttributes<HTMLElement> & {...}
```

MenuButtonProps/MenuTriggerChildProps

```ts
MenuButtonProps = Omit<ButtonProps, 'iconPosition'>  & Partial<MenuTriggerChildProps> & {}

MenuTriggerChildProps extends Required<Pick<React.HTMLAttributes<HTMLElement>,
      | 'onClick'
      | 'onMouseEnter'
      | 'onMouseLeave'
      | 'onContextMenu'
      | 'onKeyDown'
      | 'aria-haspopup'
      | 'aria-expanded'
      | 'id'
    >
```

ImageProps

```ts
extends ComponentPropsCompat,
React.ImgHTMLAttributes<HTMLImageElement>
```

LabelProps

```ts
extends ComponentPropsCompat,
React.LabelHTMLAttributes<HTMLLabelElement>
```

LinkProps

```ts
LinkProps = ComponentPropsCompat &
  React.AnchorHTMLAttributes<HTMLAnchorElement | HTMLButtonElement | HTMLElement> &
  Omit<React.ButtonHTMLAttributes<HTMLAnchorElement | HTMLButtonElement | HTMLElement>, 'type'> & {...}
```

PopoverProps

```ts
// PortalProps is an interface with children and mountNode.
// It does not provide HTML attributes
extends Pick<PortalProps, 'mountNode'>
```

PopoverSurfaceProps

```ts
extends ComponentPropsCompat,
React.HTMLAttributes<HTMLElement>
```

## Property overrides of native properties

> Several components declare properties that are also declared by extending from the DOM types (e.g. React.HtmlAttributes<T>).

checked, children, color, defaultChecked, disabled, href, image, name, onClick, open, ref, target, type, value

> Several components declare properties that are also HTML element names.

button, label strong

**Recommendations**

- Avoid re-declaring a native property and redefining its type.
- Avoid naming properties that conflict with native prop names.
- Provide a suffix of 'slot' to properties that provide a slot.
- Prefer semanitic slot property names; prefer names aligned with the part names from the figma desng.

**Proposed Work Items**

- [ ] Add slot prefix to slot properties.

# Layout properties

> Positioning is defined differently based on component layout specifics.
> Some props define a type for their enums like start | end, other's don't.
> Some props leverage Popper positioning.

**Recommendations**

- Prefer distributed unions (e.g. layout: 'inline' or layout: 'horizontal') to booleans (e.g. inline) where there maybe other values in the future.

**Proposed Work Items**

- [ ] Update AccordionHeaderCommons to inline expandIconPosition values

**Details**

AccordionHeaderCommons

```ts
// AccordionHeaderExpandIconPosition = 'start' | 'end'
expandIconPosition: AccordionHeaderExpandIconPosition;
inline: boolean;
```

BadgeProps

```ts
iconPosition: 'before' | 'after';
```

ButtonProps

```ts
iconPosition: 'before' | 'after';
```

ButtonProps

DividerProps

```ts
alignContent: 'start' | 'end' | 'center';
```

ImageProps

```ts
fit: 'none' | 'center' | 'contain' | 'cover';
```

LinkProps

```ts
inline: boolean;
```

MenuProps, PopoverProps, TooltipProps

```ts
// PositioningShorthand = PositioningProps | PositioningShorthandValue
// PositioningShorthandValue = 'above'  | 'above-start'  | 'above-end'  | below'  | 'below-start'  | 'below-end'  | 'before'  | 'before-top'  | before-bottom'  | 'after'  | 'after-top'  | 'after-bottom'
positioning: PositioningShorthand;
```

## Size properties

> Some components use different sets of semantic sizes. Avatar uses a set of numbers.
> The property name for filling available space is sometimes block and sometimes fluid. The fit property value of cover could also be considered filling available space.

**Recommendations**

- Use a consistent set of size names: 'extra-small' | 'small' | 'medium' | 'large' | 'extra-large'
  - T-shirt sizes are semantic and avoid too many options.
  - OK if a particular component doesn't support them all.
- Prefer using unions inline.
  - If a union set of values is used for more than one property, then extract to a type defintion.

**Proposed Work Items**

- [ ] Update AccordionHeaderCommons size to inline 'small' | 'medium' | 'large' | 'extra-large'
- [ ] Rename AvatarProps size to indicate what part is being sized and inline values.
- [ ] Update BadgeProps size to use 'extra-small' | 'small' | 'medium' | 'large' | 'extra-large' (inline)
- [ ] Update ButtonProps and ImageProps to both use either fluid or block to indicate taking up space.
      Consider discriminated untion if there will be additional values later.
- [ ] Update ImageProps fit to remove 'none' if that is the default when not specified OR document the default.
- [ ] Update ImageProps to reconcile fit vs. fluid. Unclear if affecting same aspect of layout.
- [ ] Update PopoverProps size to inline 'small' | 'medium' | 'large'

**Details**

AccordionHeaderCommons

```ts
// AccordianHeaderSize = 'small' | 'medium' | 'large' | 'extra-large'
size?: AccordionHeaderSize;
```

AvatarProps

```ts
// AvatarSizeValue = 20 | 24 | 28 | 32 | 36 | 40 | 48 | 56 | 64 | 72 | 96 | 120 | 128
size: AvatarSizeValue;
```

BadgeProps

```ts
// BadgeSize = 'smallest' | 'smaller' | 'small' | 'medium' | 'large' | 'larger' | 'largest'
size: BadgeSize;
showZero: boolean;
```

CounterBadgeProps

```ts
showZero: boolean;
```

ButtonProps

```ts
block: boolean;
size: 'small' | 'medium' | 'large';
```

ImageProps

```ts
fit: 'none' | 'center' | 'contain' | 'cover';
fluid: boolean;
```

LabelProps

```ts
size: 'small' | 'medium' | 'large';
```

PopoverProps

```ts
//PopoverSize = 'small' | 'medium' | 'large'
size: PopoverSize;
```

## Appearance properties

> Some components have mutually exclusive booleans and others use discriminated unions.
> Some components define a color property that are a set of colors, others are a set semantic names.
> Some naming is inconsistent (e.g. noArrow, pointing)

**Recommendations**

- Use a single property with discriminated unions when appearance configuration is mutually exclusive.
- Prefer inline unions when only used in one place; extract to a type definition when used in multiple places.
  - Prefer prefixing properties with the target when it isn't targeting the component top-level (e.g. borderAppearance, backgroundShape).
  - Corollary to this is to avoid repeating the component name when targeting top-level (i.e. prefer shape over badgeShape)
  - Consider a prefix if the property name would conflict with a native property name.
  - Prefer using a name that matches what the part is called in the design breakdown.
- Prefer to use an optional property with a single string over a boolean for appearance (e.g. appearance?: 'brand' over brand?: boolean).
  - This provides extensibility in the future and avoids confusion of appearance and behavioral properties.
- If a component's appearance for a given property union value is similar to other components, prefer to use the same value. (e.g. subtle, colorful, glow)
- Prefer making an appearance property optional rather than specifying a 'default' or 'normal' value in the discriminated union.

**Proposed Work Items**

- [ ] Update AvatarProps to rename activeDisplay to activeAppearance
- [ ] Update AvatarProps to rename color to iconColor
- [ ] Update AvatarProps to replace square with shape?: 'square'
- [ ] Update BadgeProps to inline BadgeAppearance, BadgeShape, and BadgeColors union values
- [ ] Update CounterBadgeProps to inline CounterBadgeColors union values
- [ ] Update CounterBadgeProps dot to indicatorAppearance: 'dot'
- [ ] Update ButtonProps to replace primary, outline, subtle, transparent properties with appearance?: 'primary' | 'outline' | 'subtle' | 'transparent'
- [ ] Update ButtonProps to replace circular with shape?: 'circular'
- [ ] Update DividerProps appearance to remove the 'default' value
- [ ] Update DividerProps comments to better describe important vs. appearance: 'strong' or remove important.
- [ ] Rename DividerProps inset to padContent. This helps associate with alignContent.
- [ ] Update ImageProps to replace circular and rounded with appearance?: 'circular' | 'rounded'
- [ ] Update ImageProps to replace bordered with borderShape?: 'square'
- [ ] Update LabelProps to replace strong with contentAppearance?: 'strong'
- [ ] Update LinkProps to replace secondary with appearance?: 'secondary'
- [ ] Update PopoverProps to replace brand, inverted with appearance?: 'brand', 'inverted'
- [ ] Update TooltipProps to replace inverted with appearance?: 'inverted'
- [ ] Update TooltipProps to replace pointing with indicatorAppearance?: 'arrow'

**Details**

AvatarProps

```ts
activeDisplay: 'ring' | 'shadow' | 'glow' | 'ring-shadow' | 'ring-glow';
// AvatarNamedColor = 'darkRed' | 'cranberry' ...
color: 'neutral' | 'brand' | 'colorful' | AvatarNamedColor;
square: boolean;
```

BadgeProps

```ts
// BadgeAppearance = 'filled' | 'outline' | 'ghost' | 'tint'
appearance: BadgeAppearance;
// BadgeShape = 'rounded' | 'square' | 'circular'
shape: BadgeShape;
// BadgeColors =  | 'brand'  | 'danger'  | 'severe'  | 'warning'  | 'success'  | 'important'  | 'informative'  | 'subtle'
color: BadgeColors;
```

CounterBadgeProps

```ts
dot: boolean;
```

ButtonProps

```ts
circular: boolean;
outline: boolean;
primary: boolean;
subtle: boolean;
transparent: boolean;
```

DividerProps

```ts
appearance: 'default' | 'subtle' | 'brand' | 'strong';
important: boolean;
inset: boolean;
```

ImageProps

```ts
bordered: boolean;
circular: boolean;
rounded: boolean;
```

LabelProps

```ts
strong: boolean;
```

LinkProps

```ts
secondary: boolean;
```

PopoverProps

```ts
brand: boolean;
inverted: boolean;
noArrow: boolean;
```

TooltipProps

```ts
inverted: boolean;
pointing: boolean;
```
