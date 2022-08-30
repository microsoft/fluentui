# @fluentui/react-persona Spec

Convergence epic issue: #24213

## Background

A Persona is a visual representation that showcases an Avatar, Icon, Image, or Badge. This composite component is not a card, therefore it will not provide a visual board or a popup when the user hovers the Avatar.

Persona is used in PeoplePicker, Team's left rail and menus, chiclets, and Card.

_**Persona Figma spec:**_ [link](https://www.figma.com/file/ayf1r31NnONkfiE00g9QOv/Persona?node-id=1741%3A2221)

## Prior Art

- OpenUI research: [Avatar/Persona](https://open-ui.org/components/avatar.research)
- v7/v8: [link](https://developer.microsoft.com/en-us/fluentui#/controls/web/persona)
  - > Note: v8's Persona is a combination of v9's Persona and Avatar (v8's Persona has a sub-component PersonaCoin that would count as Avatar, but is not exposed.). In v9 we've taken the approach of having a single component Avatar and another component Persona.
- v0: Does not have equivalent component.

## Anatomy

![](https://i.imgur.com/A3QXgpD.png)

### Media

_Avatar vs PersonaCoin_: As mentioned in Prior Art, v8's Persona is not quite the same as v9's. v8's Persona is only able to showcase PersonaCoin while v9 showcases Avatar (including Avatar + PresenceBadge, Avatar + image, and Avatar + Icon). Note that PersonaCoin does not support custom icons, the only icon options are the size 8 icon shown below and the unknown PersonaCoin.

| v8 PersonaCoin ([link](https://developer.microsoft.com/en-us/fluentui#/controls/web/persona)) | v9 Avatar ([link](https://react.fluentui.dev/?path=/docs/components-avatar--default)) |
| :-------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------: |
|                             ![](https://i.imgur.com/TuUXN7t.png)                              |                         ![](https://i.imgur.com/BbEhlc3.png)                          |
|                             ![](https://i.imgur.com/pXEFFmu.png)                              |                         ![](https://i.imgur.com/hbms9Bp.png)                          |

_Icon vs PersonaCoin_: PersonaCoin allows you to have icon only when there's no image available or it's the unknown PersonaCoin variant. In v9's Persona, you have the option of showcasing an icon through the Avatar or showcasing only the icon.

- Note: The icon only shows up if there's no presence and size is `tiny`, `size8`, or `size16`.

_Image vs PersonaCoin_: PersonaCoin allows you to have an image only within the Avatar. This can be avoided by rendering a custom coin, but there's still all the dom and styling overhead that comes with PersonaCoin. v9's Persona allows you use a single image with no extra dom.

_PresenceBadge vs PersonaCoin_: PersonaCoin allows you to have only a PresenceBadge when the size of the coin is `tiny`, `size8`, or `size16`. In v9's Persona you are able to render the PresenceBadge alone.

### Text lines

Other than styling and naming, the text lines in Persona remain the same.

## Sample Code

Persona with Avatar:

![](https://i.imgur.com/yGUDnXG.png)

```jsx
<Persona primaryText="Kevin Sturgis" secondaryText="Software Engineer" avatar={{ name: 'Kevin Sturgis' }} />
```

Persona with Avatar + PresenceBadge:

![](https://i.imgur.com/ALUEjSz.png)

```jsx
<Persona
  primaryText="Kevin Sturgis"
  secondaryText="Software Engineer"
  tertiaryText="Offline"
  avatar={{ name: 'Kevin Sturgis' }}
  badge={{ status: 'offline', outOfOffice: true }}
/>
```

Persona with icon:

![](https://i.imgur.com/fPCtht4.png)

```jsx
<Persona primaryText="Person Call Icon" icon={<PersonCallRegular />} />
```

Persona with PresenceBadge:

![](https://i.imgur.com/Wtusjhl.png)

```jsx
<Persona primaryText="Kevin Sturgis" badge={{ status: 'offline', outOfOffice: true }} />
```

Persona with image:

![](https://i.imgur.com/14ClUNj.png)

```jsx
<Persona
  primaryText="Katri Athokas"
  secondaryText="Software Engineer"
  tertiaryText="CXE"
  quaternaryText="Offline"
  image={{ src: 'https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/KatriAthokas.jpg' }}
/>
```

## Variants

There are three alignment variants:

- start: Media on the left and text on the right.
- center: Media on top and text on the bottom.
- end: Media on the right and text on the left.

There are 5 Media variants:

- Badge
- icon
- Avatar
- Avatar + Badge
  - > Note: When there's an Avatar and a Badge and the Avatar provided already has a Badge, the provided Badge will take over the provided Badge.
- image

There are 2 sizing variants:

- stretch: When the text lines have a larger height compared to the Media, stretch the Media to fit text lines height.
- fixed: Keep the Media the same size, no matter the height of the text lines.

**⚠️Responsive text variants will be left out of the initial implementation due to the accessibility concerns, they are added to this spec to start a discussion⚠️**

There are 4 responsive text variants:

- truncate: simple text truncation when the text doesn't fit in the container.
  - > Note: after a talk offline, it was brought up that this might be an accessibility concern. @smhighley could you confirm these scenarios are concerns for the text?
- hidden: same as truncate, but has a default `min-width` of 36px. If the width is less than `min-width`, then the text is hidden.
- wrap: simple text wrap.
- lineclamp truncate: wraps text until specified number of lines and after those lines it truncates the text.

## API

**Slots**

- `root`: The root slot for Persona.
- `avatar`: The Avatar, if provided.
- `badge`: The PresenceBadge, if provided.
- `icon`: The icon, if provided.
- `image`: The image, if provided.
- `primaryText`: Primary text, this is the only required slot. I decided to have at least this slot required since it doesn't make sense to have just the Media without the text. ⚠️ Open to feedback though.
- `secondaryText`: Secondary text, if provided.
- `tertiaryText`: Tertiary text, if provided.
- `quaternaryText`: Quaternary text, if provided.

**Media slots precedence**

1. Avatar + PresenceBadge
2. Avatar
3. Image
4. icon
5. PresenceBadge

**`default`**: Empty Avatar.

**Types**

```ts
type PersonaSlots = {
  root: Slot<'div'>;

  avatar?: Slot<typeof Avatar>;

  /**
   * The Persona's image.
   *
   * Usage e.g.: `image={{ src: '...' }}`
   */
  image?: Slot<'img'>;

  /**
   * Icon to be displayed.
   */
  icon?: Slot<'span'>;

  /**
   * Badge to display.
   *
   * When an Avatar and a PresenceBadge are provided, the badge provided will be used on the Avatar.
   */
  badge?: Slot<typeof PresenceBadge>;

  /**
   * Primary text to be displayed.
   */
  primaryText: NonNullable<Slot<'span'>>;

  /**
   * Secondary text to be displayed.
   */
  secondaryText?: Slot<'span'>;

  /**
   * Tertiary text to be displayed.
   */
  tertiaryText?: Slot<'span'>;

  /**
   * Quaternary text to be displayed.
   */
  quaternaryText?: Slot<'span'>;
};

type PersonaProps = ComponentProps<PersonaSlots> & {
  /**
   * Type of sizing to be used. When using fixed, the Media will not resize. When using stretch,
   * the Media will resize depending on the combined text's height.
   *
   * @default stretch
   */
  sizingStyle?: 'fixed' | 'stretch';

  /**
   * Where the Media is positioned relative to the text.
   *
   * @default start
   */
  mediaPosition?: 'start' | 'center' | 'end';
};
```

## Structure

To avoid the [issue](https://github.com/microsoft/fluentui/issues/23386) v8 has, a css grid will be used instead of a flexbox that requires a general wrapper and a text container wrapper.

- _**CSS Grid**_
  - Start
    ![](https://i.imgur.com/ADospcu.png)
  - End
    ![](https://i.imgur.com/Oc4D5zU.png)
  - Center
    ![](https://i.imgur.com/RTs5pDq.png)

> ⚠️ Open to feedback: When using `grid-template-areas`, even if the rows are empty, `rowGap`/`columnGap` adds the spacing between them. To avoid this, a padding in the items could be used instead. While it's not a huge problem, it would impact the design.

- _**Internal**_

```jsx
const textSlots = (
  <>
    <slots.primaryText {...slotProps.primaryText} />
    {slots.secondaryText && <slots.secondaryText {...slotProps.secondaryText} />}
    {slots.tertiaryText && <slots.tertiaryText {...slotProps.tertiaryText} />}
    {slots.quaternaryText && <slots.quaternaryText {...slotProps.quaternaryText} />}
  </>
);

return (
  <slots.root {...slotProps.root}>
    {position === 'end' && textSlots}
    {slots.avatar && <slots.avatar {...slotProps.avatar} />}
    {slots.badge && <slots.badge {...slotProps.badge} />}
    {slots.icon && <slots.icon {...slotProps.icon} />}
    {slots.image && <slots.image {...slotProps.image} />}
    {(position === 'start' || position === 'center') && textSlots}
  </slots.root>
);
```

- _**DOM**_

```html
<div class="fui-Persona">
  <span class="fui-Persona__avatar fui-Avatar">{/* Avatar */}</span>
  <span class="fui-Persona__primaryText">Primary Text</span>
  <span class="fui-Persona__secondaryText">Secondary Text</span>
  <span class="fui-Persona__tertiaryText">Tertiary Text</span>
  <span class="fui-Persona__quaternaryText">Quaternary Text</span>
</div>
```

## Migration

See [MIGRATION.md](./MIGRATION.md) for details.

## Behaviors

_Explain how the component will behave in use, including:_

- _Component States_
  - There are no states for this component, it's a visual representation.
- _Interaction_
  - _Keyboard_
    - Doesn't receive focus.
  - _Cursor_
    - Doesn't interact with cursor.
  - _Touch_
    - Doesn't interact with touch.
  - _Screen readers_
    - It first focuses on the media and then goes through each text line available.

## Accessibility

- There's no need for `aria-*` or/and`role`. Avatar, Badge, Image, and icon are already accessible and the text labels won't need anything as well.
