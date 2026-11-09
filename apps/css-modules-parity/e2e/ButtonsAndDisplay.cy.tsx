import * as React from 'react';
import {
  AvatarGroup,
  AvatarGroupItem,
  AvatarGroupPopover,
  Body1,
  Body1Strong,
  Body1Stronger,
  Body2,
  Caption1,
  Caption1Strong,
  Caption1Stronger,
  Caption2,
  Caption2Strong,
  Card,
  CardFooter,
  CardHeader,
  CardPreview,
  CompoundButton,
  CounterBadge,
  Display,
  Divider,
  Image,
  Label,
  LargeTitle,
  MenuButton,
  Persona,
  PresenceBadge,
  SplitButton,
  Subtitle1,
  Subtitle2,
  Subtitle2Stronger,
  Text,
  Title1,
  Title2,
  Title3,
  mergeClasses,
  renderAvatarGroupItem_unstable,
  renderAvatarGroupPopover_unstable,
  renderAvatarGroup_unstable,
  renderAvatar_unstable,
  renderBadge_unstable,
  renderButton_unstable,
  renderCardFooter_unstable,
  renderCardHeader_unstable,
  renderCardPreview_unstable,
  renderCard_unstable,
  renderCompoundButton_unstable,
  renderDivider_unstable,
  renderImage_unstable,
  renderLabel_unstable,
  renderMenuButton_unstable,
  renderPersona_unstable,
  renderSplitButton_unstable,
  renderText_unstable,
  useAvatarGroupContextValues,
  useAvatarGroupItem_unstable,
  useAvatarGroupPopoverContextValues_unstable,
  useAvatarGroupPopover_unstable,
  useAvatarGroup_unstable,
  useAvatar_unstable,
  useButton_unstable,
  useCardFooter_unstable,
  useCardHeader_unstable,
  useCardPreview_unstable,
  useCard_unstable,
  useCompoundButton_unstable,
  useCounterBadge_unstable,
  useDivider_unstable,
  useImage_unstable,
  useLabel_unstable,
  useMenuButton_unstable,
  usePersona_unstable,
  usePresenceBadge_unstable,
  useSplitButton_unstable,
  useText_unstable,
} from '@fluentui/react-components';
import type { TextPresetProps } from '@fluentui/react-components';
import { SLOT_ELEMENT_TYPE_SYMBOL } from '@fluentui/react-utilities';
import type { JSXElement, RefAttributes } from '@fluentui/react-utilities';
import { useCardContextValue } from '../../../packages/react-components/react-card/library/src/components/Card/useCardContextValue';
// Explicit `.ts` imports bypass the CSS Modules resolution, giving the original Griffel implementations.
import { useButtonStyles_unstable as useGriffelButtonStyles } from '../../../packages/react-components/react-button/library/src/components/Button/useButtonStyles.styles.ts';
import { useCompoundButtonStyles_unstable as useGriffelCompoundButtonStyles } from '../../../packages/react-components/react-button/library/src/components/CompoundButton/useCompoundButtonStyles.styles.ts';
import { useMenuButtonStyles_unstable as useGriffelMenuButtonStyles } from '../../../packages/react-components/react-button/library/src/components/MenuButton/useMenuButtonStyles.styles.ts';
import { useSplitButtonStyles_unstable as useGriffelSplitButtonStyles } from '../../../packages/react-components/react-button/library/src/components/SplitButton/useSplitButtonStyles.styles.ts';
import { useAvatarStyles_unstable as useGriffelAvatarStyles } from '../../../packages/react-components/react-avatar/library/src/components/Avatar/useAvatarStyles.styles.ts';
import { useAvatarGroupStyles_unstable as useGriffelAvatarGroupStyles } from '../../../packages/react-components/react-avatar/library/src/components/AvatarGroup/useAvatarGroupStyles.styles.ts';
import { useAvatarGroupItemStyles_unstable as useGriffelAvatarGroupItemStyles } from '../../../packages/react-components/react-avatar/library/src/components/AvatarGroupItem/useAvatarGroupItemStyles.styles.ts';
import { useAvatarGroupPopoverStyles_unstable as useGriffelAvatarGroupPopoverStyles } from '../../../packages/react-components/react-avatar/library/src/components/AvatarGroupPopover/useAvatarGroupPopoverStyles.styles.ts';
import { useCounterBadgeStyles_unstable as useGriffelCounterBadgeStyles } from '../../../packages/react-components/react-badge/library/src/components/CounterBadge/useCounterBadgeStyles.styles.ts';
import { usePresenceBadgeStyles_unstable as useGriffelPresenceBadgeStyles } from '../../../packages/react-components/react-badge/library/src/components/PresenceBadge/usePresenceBadgeStyles.styles.ts';
import { useCardStyles_unstable as useGriffelCardStyles } from '../../../packages/react-components/react-card/library/src/components/Card/useCardStyles.styles.ts';
import { useCardHeaderStyles_unstable as useGriffelCardHeaderStyles } from '../../../packages/react-components/react-card/library/src/components/CardHeader/useCardHeaderStyles.styles.ts';
import { useCardPreviewStyles_unstable as useGriffelCardPreviewStyles } from '../../../packages/react-components/react-card/library/src/components/CardPreview/useCardPreviewStyles.styles.ts';
import { useCardFooterStyles_unstable as useGriffelCardFooterStyles } from '../../../packages/react-components/react-card/library/src/components/CardFooter/useCardFooterStyles.styles.ts';
import { usePersonaStyles_unstable as useGriffelPersonaStyles } from '../../../packages/react-components/react-persona/library/src/components/Persona/usePersonaStyles.styles.ts';
import { useImageStyles_unstable as useGriffelImageStyles } from '../../../packages/react-components/react-image/library/src/components/Image/useImageStyles.styles.ts';
import { useTextStyles_unstable as useGriffelTextStyles } from '../../../packages/react-components/react-text/library/src/components/Text/useTextStyles.styles.ts';
import { useBody1Styles } from '../../../packages/react-components/react-text/library/src/components/presets/Body1/useBody1Styles.styles.ts';
import { useBody1StrongStyles } from '../../../packages/react-components/react-text/library/src/components/presets/Body1Strong/useBody1StrongStyles.styles.ts';
import { useBody1StrongerStyles } from '../../../packages/react-components/react-text/library/src/components/presets/Body1Stronger/useBody1StrongerStyles.styles.ts';
import { useBody2Styles } from '../../../packages/react-components/react-text/library/src/components/presets/Body2/useBody2Styles.styles.ts';
import { useCaption1Styles } from '../../../packages/react-components/react-text/library/src/components/presets/Caption1/useCaption1Styles.styles.ts';
import { useCaption1StrongStyles } from '../../../packages/react-components/react-text/library/src/components/presets/Caption1Strong/useCaption1StrongStyles.styles.ts';
import { useCaption1StrongerStyles } from '../../../packages/react-components/react-text/library/src/components/presets/Caption1Stronger/useCaption1Stronger.styles.ts';
import { useCaption2Styles } from '../../../packages/react-components/react-text/library/src/components/presets/Caption2/useCaption2Styles.styles.ts';
import { useCaption2StrongStyles } from '../../../packages/react-components/react-text/library/src/components/presets/Caption2Strong/useCaption2StrongStyles.styles.ts';
import { useDisplayStyles } from '../../../packages/react-components/react-text/library/src/components/presets/Display/useDisplayStyles.styles.ts';
import { useLargeTitleStyles } from '../../../packages/react-components/react-text/library/src/components/presets/LargeTitle/useLargeTitleStyles.styles.ts';
import { useSubtitle1Styles } from '../../../packages/react-components/react-text/library/src/components/presets/Subtitle1/useSubtitle1Styles.styles.ts';
import { useSubtitle2Styles } from '../../../packages/react-components/react-text/library/src/components/presets/Subtitle2/useSubtitle2Styles.styles.ts';
import { useSubtitle2StrongerStyles } from '../../../packages/react-components/react-text/library/src/components/presets/Subtitle2Stronger/useSubtitle2Stronger.styles.ts';
import { useTitle1Styles } from '../../../packages/react-components/react-text/library/src/components/presets/Title1/useTitle1Styles.styles.ts';
import { useTitle2Styles } from '../../../packages/react-components/react-text/library/src/components/presets/Title2/useTitle2Styles.styles.ts';
import { useTitle3Styles } from '../../../packages/react-components/react-text/library/src/components/presets/Title3/useTitle3Styles.styles.ts';
import { useLabelStyles_unstable as useGriffelLabelStyles } from '../../../packages/react-components/react-label/library/src/components/Label/useLabelStyles.styles.ts';
import { useDividerStyles_unstable as useGriffelDividerStyles } from '../../../packages/react-components/react-divider/library/src/components/Divider/useDividerStyles.styles.ts';
import { describeParity, griffel, icon } from './harness';
import type { AnyComponent, Implementation } from './harness';

type AnyProps = Record<string, unknown>;
type StateWithComponents = Record<string, unknown> & { components: Record<string, unknown> };

/**
 * Replaces component-typed slots (for example the Avatar inside a Persona) so a Griffel baseline renders Griffel
 * children; the default children resolve their CSS Modules alternatives.
 */
function withSlotComponents(
  useState: (props: never, ref: never) => unknown,
  components: Record<string, AnyComponent>,
): (props: never, ref: never) => unknown {
  return (props, ref) => {
    const state = useState(props, ref) as StateWithComponents;
    for (const [slotName, component] of Object.entries(components)) {
      state.components[slotName] = component;
      const slot = state[slotName] as Record<symbol, unknown> | undefined;
      if (slot) {
        slot[SLOT_ELEMENT_TYPE_SYMBOL] = component;
      }
    }
    return state;
  };
}

const noop = () => undefined;
const findBySelector = (selector: string) => (container: HTMLElement) =>
  container.querySelector<HTMLElement>(selector)!;

const GriffelButton = griffel('Button', useButton_unstable, useGriffelButtonStyles, renderButton_unstable);
const GriffelMenuButton = griffel(
  'MenuButton',
  useMenuButton_unstable,
  useGriffelMenuButtonStyles,
  renderMenuButton_unstable,
);
const GriffelPresenceBadge = griffel(
  'PresenceBadge',
  usePresenceBadge_unstable,
  useGriffelPresenceBadgeStyles,
  renderBadge_unstable,
);
const GriffelAvatar = griffel(
  'Avatar',
  withSlotComponents(useAvatar_unstable, { badge: GriffelPresenceBadge }),
  useGriffelAvatarStyles,
  renderAvatar_unstable,
);
const GriffelAvatarGroup = griffel(
  'AvatarGroup',
  useAvatarGroup_unstable,
  useGriffelAvatarGroupStyles,
  renderAvatarGroup_unstable,
  useAvatarGroupContextValues,
);
const GriffelAvatarGroupItem = griffel(
  'AvatarGroupItem',
  withSlotComponents(useAvatarGroupItem_unstable, { avatar: GriffelAvatar }),
  useGriffelAvatarGroupItemStyles,
  renderAvatarGroupItem_unstable,
);
const GriffelAvatarGroupPopover = griffel(
  'AvatarGroupPopover',
  useAvatarGroupPopover_unstable,
  useGriffelAvatarGroupPopoverStyles,
  renderAvatarGroupPopover_unstable,
  useAvatarGroupPopoverContextValues_unstable,
);
const GriffelCard = griffel('Card', useCard_unstable, useGriffelCardStyles, renderCard_unstable, useCardContextValue);

const avatarGroup = {
  griffel: { Group: GriffelAvatarGroup, Item: GriffelAvatarGroupItem, Popover: GriffelAvatarGroupPopover },
  css: {
    Group: AvatarGroup as AnyComponent,
    Item: AvatarGroupItem as AnyComponent,
    Popover: AvatarGroupPopover as unknown as AnyComponent,
  },
};

/**
 * An AvatarGroupItem inside its AvatarGroup, so group props (layout, size) can vary per variant. `overflow` renders
 * the item inside an open, inline AvatarGroupPopover (the overflow list).
 */
function groupedItem(implementation: Implementation): AnyComponent {
  const { Group, Item, Popover } = avatarGroup[implementation];
  const GroupedItem = React.forwardRef<HTMLElement, AnyProps>(({ layout, size, overflow, ...props }, ref) => (
    <Group layout={layout} size={size}>
      {overflow ? (
        <Popover open inline trapFocus={false}>
          <Item ref={ref} {...props} />
        </Popover>
      ) : (
        <Item ref={ref} {...props} />
      )}
    </Group>
  ));
  GroupedItem.displayName = `GroupedAvatarGroupItem`;
  return GroupedItem as unknown as AnyComponent;
}

/**
 * AvatarGroupPopover's root is a Popover (no DOM element), so app class names are redirected to its trigger button,
 * the component's only styled, non-portaled element. Group props (layout, size) vary per variant.
 */
function groupedPopover(implementation: Implementation): AnyComponent {
  const { Group, Item, Popover } = avatarGroup[implementation];
  const GroupedPopover = React.forwardRef<HTMLElement, AnyProps>(
    ({ layout, size, className, triggerButton, ...props }, ref) => (
      <Group layout={layout} size={size}>
        <Item name="Ada Lovelace" />
        <Popover
          {...props}
          triggerButton={{
            ...(triggerButton as AnyProps),
            ref,
            className: mergeClasses(className as string, (triggerButton as AnyProps | undefined)?.className as string),
          }}
        >
          <Item name="Grace Hopper" />
        </Popover>
      </Group>
    ),
  );
  GroupedPopover.displayName = `GroupedAvatarGroupPopover`;
  return GroupedPopover as unknown as AnyComponent;
}

const presetHooks = {
  Body1: useBody1Styles,
  Body1Strong: useBody1StrongStyles,
  Body1Stronger: useBody1StrongerStyles,
  Body2: useBody2Styles,
  Caption1: useCaption1Styles,
  Caption1Strong: useCaption1StrongStyles,
  Caption1Stronger: useCaption1StrongerStyles,
  Caption2: useCaption2Styles,
  Caption2Strong: useCaption2StrongStyles,
  Subtitle1: useSubtitle1Styles,
  Subtitle2: useSubtitle2Styles,
  Subtitle2Stronger: useSubtitle2StrongerStyles,
  Title1: useTitle1Styles,
  Title2: useTitle2Styles,
  Title3: useTitle3Styles,
  LargeTitle: useLargeTitleStyles,
  Display: useDisplayStyles,
};
type Preset = keyof typeof presetHooks;
const cssPresets: Record<Preset, React.FunctionComponent<TextPresetProps>> = {
  Body1,
  Body1Strong,
  Body1Stronger,
  Body2,
  Caption1,
  Caption1Strong,
  Caption1Stronger,
  Caption2,
  Caption2Strong,
  Subtitle1,
  Subtitle2,
  Subtitle2Stronger,
  Title1,
  Title2,
  Title3,
  LargeTitle,
  Display,
};

/** Recomposes `createPreset` with the original Griffel Text and preset style hooks. */
function griffelPreset(preset: Preset): React.ComponentType<AnyProps & RefAttributes<HTMLElement>> {
  const useStyles = presetHooks[preset];
  const className = `fui-${preset}`;
  const Component = React.forwardRef<HTMLElement, AnyProps>((props, ref) => {
    const styles = useStyles();
    const state = useText_unstable(props, ref as React.Ref<HTMLElement>);
    useGriffelTextStyles(state);
    state.root.className = mergeClasses(className, state.root.className, styles.root, props.className as string);
    return renderText_unstable(state);
  });
  Component.displayName = `Griffel${preset}`;
  return Component;
}
const griffelPresets = Object.fromEntries(
  (Object.keys(presetHooks) as Preset[]).map(preset => [preset, griffelPreset(preset)]),
) as Record<Preset, React.ComponentType<AnyProps & RefAttributes<HTMLElement>>>;

/** Renders the preset named by the `preset` variant prop. */
function textPreset(implementation: Implementation): AnyComponent {
  const TextPreset = React.forwardRef<HTMLElement, AnyProps>(({ preset, ...props }, ref) => {
    const Component = (implementation === 'css' ? cssPresets : griffelPresets)[preset as Preset] as AnyComponent;
    return <Component ref={ref} {...props} />;
  });
  TextPreset.displayName = `TextPreset`;
  return TextPreset as unknown as AnyComponent;
}

const cardChildren = (text: string): AnyProps => ({ children: <div>{text}</div> });
const inCard = (element: JSXElement, implementation: Implementation) => {
  const CardImplementation = implementation === 'css' ? (Card as AnyComponent) : GriffelCard;
  return <CardImplementation>{element}</CardImplementation>;
};

describeParity('buttons and display', {
  CompoundButton: {
    css: CompoundButton as AnyComponent,
    griffel: griffel(
      'CompoundButton',
      useCompoundButton_unstable,
      useGriffelCompoundButtonStyles,
      renderCompoundButton_unstable,
    ),
    slot: 'icon',
    sampledSlots: [
      'fui-CompoundButton__icon',
      'fui-CompoundButton__contentContainer',
      'fui-CompoundButton__secondaryContent',
    ],
    interactive: true,
    props: { icon, secondaryContent: 'Secondary', children: 'Compound' },
    variants: [
      { appearance: 'secondary' },
      { appearance: 'primary' },
      { appearance: 'outline', size: 'small' },
      { appearance: 'subtle', size: 'large' },
      { appearance: 'transparent', iconPosition: 'after' },
      { appearance: 'primary', disabled: true },
    ],
  },
  MenuButton: {
    css: MenuButton as AnyComponent,
    griffel: GriffelMenuButton,
    slot: 'icon',
    sampledSlots: ['fui-MenuButton__icon', 'fui-MenuButton__menuIcon'],
    interactive: true,
    props: { icon, children: 'Menu' },
    variants: [
      { appearance: 'secondary' },
      { appearance: 'primary' },
      { appearance: 'subtle', size: 'small' },
      { appearance: 'transparent', size: 'large' },
      { appearance: 'outline', shape: 'circular' },
      { appearance: 'primary', disabled: true },
    ],
  },
  SplitButton: {
    css: SplitButton as AnyComponent,
    griffel: griffel(
      'SplitButton',
      withSlotComponents(useSplitButton_unstable, {
        menuButton: GriffelMenuButton,
        primaryActionButton: GriffelButton,
      }),
      useGriffelSplitButtonStyles,
      renderSplitButton_unstable,
    ),
    slot: 'primaryActionButton',
    sampledSlots: ['fui-SplitButton__primaryActionButton', 'fui-SplitButton__menuButton'],
    interactive: true,
    props: { icon, children: 'Split' },
    variants: [
      { appearance: 'secondary' },
      { appearance: 'primary' },
      { appearance: 'outline', size: 'small' },
      { appearance: 'subtle', size: 'large' },
      { appearance: 'transparent' },
      { appearance: 'primary', disabled: true },
    ],
  },
  AvatarGroup: {
    css: AvatarGroup as AnyComponent,
    griffel: GriffelAvatarGroup,
    sampledSlots: ['fui-AvatarGroupItem', 'fui-AvatarGroupItem__avatar', 'fui-AvatarGroupPopover__triggerButton'],
    interactive: false,
    props: implementation => {
      const { Item, Popover } = avatarGroup[implementation];
      return {
        children: [
          <Item key="1" name="Ada Lovelace" />,
          <Item key="2" name="Grace Hopper" />,
          <Popover key="overflow">
            <Item name="Alan Turing" />
          </Popover>,
        ],
      };
    },
    variants: [{ layout: 'spread' }, { layout: 'stack' }, { layout: 'pie' }, { layout: 'stack', size: 56 }],
  },
  AvatarGroupItem: {
    css: groupedItem('css'),
    griffel: groupedItem('griffel'),
    customStyleHook: 'useAvatarGroupItemStyles_unstable',
    slot: 'avatar',
    sampledSlots: ['fui-AvatarGroupItem__avatar', 'fui-Avatar__initials', 'fui-AvatarGroupItem__overflowLabel'],
    interactive: false,
    findRoot: findBySelector('.fui-AvatarGroupItem'),
    props: { name: 'Ada Lovelace' },
    variants: [
      { layout: 'spread' },
      { layout: 'stack', size: 24 },
      { layout: 'pie' },
      { layout: 'spread', size: 72 },
      { overflow: true },
    ],
  },
  AvatarGroupPopover: {
    css: groupedPopover('css'),
    griffel: groupedPopover('griffel'),
    customStyleHook: 'useAvatarGroupPopoverStyles_unstable',
    slot: 'triggerButton',
    sampledSlots: [],
    interactive: true,
    findRoot: findBySelector('.fui-AvatarGroupPopover__triggerButton'),
    props: {},
    variants: [
      { layout: 'spread' },
      { layout: 'stack', size: 24 },
      { layout: 'pie' },
      { layout: 'spread', indicator: 'icon', size: 48 },
      { layout: 'stack', size: 96 },
    ],
  },
  CounterBadge: {
    css: CounterBadge as AnyComponent,
    griffel: griffel('CounterBadge', useCounterBadge_unstable, useGriffelCounterBadgeStyles, renderBadge_unstable),
    slot: 'icon',
    sampledSlots: ['fui-CounterBadge__icon'],
    interactive: false,
    props: { icon, count: 5 },
    variants: [
      { appearance: 'filled' },
      { appearance: 'ghost' },
      { color: 'danger', size: 'small' },
      { color: 'informative', shape: 'rounded' },
      { dot: true },
      { count: 1000, overflowCount: 99, size: 'large' },
    ],
  },
  PresenceBadge: {
    css: PresenceBadge as AnyComponent,
    griffel: GriffelPresenceBadge,
    slot: 'icon',
    sampledSlots: ['fui-PresenceBadge__icon'],
    interactive: false,
    props: {},
    variants: [
      { status: 'available' },
      { status: 'busy', size: 'large' },
      { status: 'away', size: 'small' },
      { status: 'offline', outOfOffice: true },
      { status: 'do-not-disturb', size: 'extra-large' },
      { status: 'blocked', size: 'tiny' },
    ],
  },
  Card: {
    css: Card as AnyComponent,
    griffel: GriffelCard,
    sampledSlots: [],
    interactive: false,
    props: cardChildren('Card'),
    variants: [
      { appearance: 'filled' },
      { appearance: 'filled-alternative' },
      { appearance: 'outline', orientation: 'horizontal' },
      { appearance: 'subtle', size: 'small' },
      { size: 'large' },
      { appearance: 'outline', disabled: true },
    ],
  },
  CardInteractive: {
    css: Card as AnyComponent,
    griffel: GriffelCard,
    customStyleHook: 'useCardStyles_unstable',
    sampledSlots: [],
    interactive: true,
    props: { ...cardChildren('Interactive card'), onClick: noop },
    variants: [
      { appearance: 'filled' },
      { appearance: 'filled-alternative' },
      { appearance: 'outline' },
      { appearance: 'subtle' },
      { appearance: 'outline', disabled: true },
    ],
  },
  CardSelectable: {
    css: Card as AnyComponent,
    griffel: GriffelCard,
    customStyleHook: 'useCardStyles_unstable',
    sampledSlots: ['fui-Card__checkbox'],
    interactive: true,
    props: { ...cardChildren('Selectable card'), onSelectionChange: noop },
    variants: [
      { appearance: 'filled', selected: true },
      { appearance: 'filled-alternative', selected: true },
      { appearance: 'outline', selected: true },
      { appearance: 'subtle', selected: true },
      { appearance: 'outline', selected: false },
    ],
  },
  CardHeader: {
    css: CardHeader as AnyComponent,
    griffel: griffel('CardHeader', useCardHeader_unstable, useGriffelCardHeaderStyles, renderCardHeader_unstable),
    slot: 'header',
    sampledSlots: [
      'fui-CardHeader__image',
      'fui-CardHeader__header',
      'fui-CardHeader__description',
      'fui-CardHeader__action',
    ],
    interactive: false,
    wrap: inCard,
    findRoot: findBySelector('.fui-CardHeader'),
    props: {
      image: <span>Image</span>,
      header: 'Header',
      description: 'Description',
      action: <button>Action</button>,
    },
    variants: [{}, { description: undefined }],
  },
  CardPreview: {
    css: CardPreview as AnyComponent,
    griffel: griffel('CardPreview', useCardPreview_unstable, useGriffelCardPreviewStyles, renderCardPreview_unstable),
    slot: 'logo',
    sampledSlots: ['fui-CardPreview__logo'],
    interactive: false,
    wrap: inCard,
    findRoot: findBySelector('.fui-CardPreview'),
    props: { logo: <span>Logo</span>, children: <div style={{ height: 40 }}>Preview</div> },
    variants: [{}, { logo: undefined }],
  },
  CardFooter: {
    css: CardFooter as AnyComponent,
    griffel: griffel('CardFooter', useCardFooter_unstable, useGriffelCardFooterStyles, renderCardFooter_unstable),
    slot: 'action',
    sampledSlots: ['fui-CardFooter__action'],
    interactive: false,
    wrap: inCard,
    findRoot: findBySelector('.fui-CardFooter'),
    props: { action: <button>Action</button>, children: <button>Footer</button> },
    variants: [{}, { action: undefined }],
  },
  Persona: {
    css: Persona as AnyComponent,
    griffel: griffel(
      'Persona',
      withSlotComponents(usePersona_unstable, { avatar: GriffelAvatar, presence: GriffelPresenceBadge }),
      useGriffelPersonaStyles,
      renderPersona_unstable,
    ),
    slot: 'primaryText',
    sampledSlots: [
      'fui-Persona__avatar',
      'fui-Persona__primaryText',
      'fui-Persona__secondaryText',
      'fui-Persona__tertiaryText',
      'fui-Persona__presence',
    ],
    interactive: false,
    props: { name: 'Ada Lovelace', secondaryText: 'Available', tertiaryText: 'Engineer' },
    variants: [
      {},
      { textPosition: 'below', size: 'huge' },
      { textPosition: 'before', size: 'small' },
      { textAlignment: 'center', size: 'extra-large' },
      { presenceOnly: true, presence: { status: 'available' }, size: 'large' },
      { presence: { status: 'busy' }, size: 'extra-small' },
    ],
  },
  Image: {
    css: Image as AnyComponent,
    griffel: griffel('Image', useImage_unstable, useGriffelImageStyles, renderImage_unstable),
    sampledSlots: [],
    interactive: false,
    props: { alt: 'Parity', width: 40, height: 40 },
    variants: [
      {},
      { shape: 'circular', bordered: true },
      { shape: 'rounded', shadow: true },
      { fit: 'cover', block: true },
      { fit: 'contain' },
      { fit: 'none' },
    ],
  },
  Text: {
    css: Text as AnyComponent,
    griffel: griffel('Text', useText_unstable, useGriffelTextStyles, renderText_unstable),
    sampledSlots: [],
    interactive: false,
    props: { children: 'Text' },
    variants: [
      {},
      { size: 600, weight: 'semibold' },
      { italic: true, underline: true },
      { truncate: true, wrap: false, block: true },
      { align: 'center', font: 'monospace', strikethrough: true },
      { size: 100, font: 'numeric', weight: 'bold' },
    ],
  },
  TextPresets: {
    css: textPreset('css'),
    griffel: textPreset('griffel'),
    // Presets never call a custom style hook.
    customStyleHook: 'useTextPresetStyles_unstable',
    sampledSlots: [],
    interactive: false,
    props: { children: 'Preset' },
    variants: (Object.keys(presetHooks) as Preset[]).map(preset => ({ preset })),
  },
  Label: {
    css: Label as AnyComponent,
    griffel: griffel('Label', useLabel_unstable, useGriffelLabelStyles, renderLabel_unstable),
    sampledSlots: ['fui-Label__required'],
    interactive: false,
    props: { children: 'Label' },
    variants: [{}, { required: true }, { size: 'small' }, { size: 'large', weight: 'semibold' }, { disabled: true }],
  },
  Divider: {
    css: Divider as AnyComponent,
    griffel: griffel('Divider', useDivider_unstable, useGriffelDividerStyles, renderDivider_unstable),
    sampledSlots: ['fui-Divider__wrapper'],
    interactive: false,
    props: { children: 'Divider' },
    variants: [
      {},
      { alignContent: 'start', appearance: 'brand' },
      { alignContent: 'end', appearance: 'strong' },
      { appearance: 'subtle', inset: true },
      { vertical: true, style: { height: 60 } },
      { children: undefined },
    ],
  },
});
