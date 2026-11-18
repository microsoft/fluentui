import * as React from 'react';
import {
  Combobox,
  Dropdown,
  InfoLabel,
  InlineDrawer,
  Menu,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
  Option,
  OverlayDrawer,
  Popover,
  PopoverSurface,
  PopoverTrigger,
  TeachingPopover,
  TeachingPopoverSurface,
  TeachingPopoverTrigger,
  renderCombobox_unstable,
  renderDropdown_unstable,
  renderInfoLabel_unstable,
  renderInlineDrawer_unstable,
  renderMenuItem_unstable,
  renderMenuList_unstable,
  renderMenuPopover_unstable,
  renderOverlayDrawer_unstable,
  renderPopoverSurface_unstable,
  renderTeachingPopoverSurface_unstable,
  renderTooltip_unstable,
  useComboboxContextValues,
  useCombobox_unstable,
  useDrawerContextValue,
  useDropdown_unstable,
  useInfoLabel_unstable,
  useInlineDrawer_unstable,
  useMenuItem_unstable,
  useMenuListContextValues_unstable,
  useMenuList_unstable,
  useMenuPopover_unstable,
  useOverlayDrawer_unstable,
  usePopoverSurface_unstable,
  useTeachingPopoverSurface_unstable,
  useTooltipStyles_unstable,
  useTooltip_unstable,
} from '@fluentui/react-components';
import type { JSXElement } from '@fluentui/react-components';
// Explicit `.ts` imports bypass the CSS Modules resolution, giving the original Griffel implementations.
import { useComboboxStyles_unstable as useGriffelComboboxStyles } from '../../../packages/react-components/react-combobox/library/src/components/Combobox/useComboboxStyles.styles.ts';
import { useDropdownStyles_unstable as useGriffelDropdownStyles } from '../../../packages/react-components/react-combobox/library/src/components/Dropdown/useDropdownStyles.styles.ts';
import { useInlineDrawerStyles_unstable as useGriffelInlineDrawerStyles } from '../../../packages/react-components/react-drawer/library/src/components/InlineDrawer/useInlineDrawerStyles.styles.ts';
import { useOverlayDrawerStyles_unstable as useGriffelOverlayDrawerStyles } from '../../../packages/react-components/react-drawer/library/src/components/OverlayDrawer/useOverlayDrawerStyles.styles.ts';
import { useInfoLabelStyles_unstable as useGriffelInfoLabelStyles } from '../../../packages/react-components/react-infolabel/library/src/components/InfoLabel/useInfoLabelStyles.styles.ts';
import { useMenuItemStyles_unstable as useGriffelMenuItemStyles } from '../../../packages/react-components/react-menu/library/src/components/MenuItem/useMenuItemStyles.styles.ts';
import { useMenuListStyles_unstable as useGriffelMenuListStyles } from '../../../packages/react-components/react-menu/library/src/components/MenuList/useMenuListStyles.styles.ts';
import { useMenuPopoverStyles_unstable as useGriffelMenuPopoverStyles } from '../../../packages/react-components/react-menu/library/src/components/MenuPopover/useMenuPopoverStyles.styles.ts';
import { usePopoverSurfaceStyles_unstable as useGriffelPopoverSurfaceStyles } from '../../../packages/react-components/react-popover/library/src/components/PopoverSurface/usePopoverSurfaceStyles.styles.ts';
import { useTeachingPopoverSurfaceStyles_unstable as useGriffelTeachingPopoverSurfaceStyles } from '../../../packages/react-components/react-teaching-popover/library/src/components/TeachingPopoverSurface/useTeachingPopoverSurfaceStyles.styles.ts';
import { useTooltipStyles_unstable as useGriffelTooltipStyles } from '../../../packages/react-components/react-tooltip/library/src/components/Tooltip/useTooltipStyles.styles.ts';
import { describeParity, griffel } from './harness';
import type { AnyComponent, ComponentSpec, Implementation, ParityVariant, PositionedElements } from './harness';

/**
 * Geometry of positioned surfaces (see `ComponentSpec.geometry`). Floating UI computes positions in JS, the same for
 * both implementations, so differences come from CSS that changes sizes: padding, borders, arrow size, min/max sizes.
 *
 * Every variant renders its trigger and open surface inside a fixed-size stage that is the surface's flip and overflow
 * boundary. Floating UI also clips every boundary to the viewport, so `geometry` scrolls the stage into view before it
 * is measured: positions then depend only on the stage, not on the container's page offset.
 */

type AnyProps = Record<string, unknown>;
type Pair = Record<Implementation, AnyComponent>;

const pair = (css: unknown, griffelComponent: AnyComponent): Pair => ({
  css: css as AnyComponent,
  griffel: griffelComponent,
});

/** Removes wrapper options (consumed by `wrap`) from the variant props spread on the component under test. */
function split(element: JSXElement, keys: string[]): [JSXElement, AnyProps] {
  const props = { ...(element.props as AnyProps) };
  const picked: AnyProps = {};
  for (const key of keys) {
    if (key in props) {
      picked[key] = props[key];
      delete props[key];
    }
  }
  return [React.createElement(element.type as React.ElementType, props), picked];
}

// --- Stage ------------------------------------------------------------------------------------------------------

/**
 * - `center` (default): trigger in the middle, room on every side.
 * - `corner`: trigger at the top start corner (submenus open towards the end).
 * - `short`: a low stage with the trigger at the top, so `autoSize` limits the surface height.
 */
type StageLayout = 'center' | 'corner' | 'short';

const stageWidth = 440;
// Fits the Cypress component viewport (500x500) with the container's start button above it.
const stageHeight = 340;
const shortStageHeight = 140;

/**
 * Fixed-size positioning boundary. It is the offset parent of inline surfaces and a mount node for portaled ones;
 * `containFixed` makes it the containing block of `position: fixed` surfaces (OverlayDrawer).
 */
const Stage = ({
  layout = 'center',
  containFixed,
  style,
  children,
}: {
  layout?: StageLayout;
  containFixed?: boolean;
  style?: React.CSSProperties;
  children: (stage: HTMLElement) => React.ReactNode;
}) => {
  const [stage, setStage] = React.useState<HTMLElement | null>(null);
  return (
    <div
      ref={setStage}
      data-parity-stage=""
      style={{
        position: 'relative',
        boxSizing: 'border-box',
        width: stageWidth,
        height: layout === 'short' ? shortStageHeight : stageHeight,
        overflow: 'hidden',
        display: 'flex',
        alignItems: layout === 'center' ? 'center' : 'flex-start',
        justifyContent: layout === 'corner' ? 'flex-start' : 'center',
        ...(containFixed && { transform: 'translateZ(0)' }),
        ...style,
      }}
    >
      {stage ? children(stage) : null}
    </div>
  );
};

/** Bounds flipping, shifting and `autoSize` by the stage instead of the page. */
const bounded = (positioning: unknown, stage: HTMLElement) => ({
  ...(positioning as AnyProps | undefined),
  overflowBoundary: stage,
  flipBoundary: stage,
});

/**
 * Wraps a finder of positioned elements: until the stage is fully inside the viewport, scrolls it into view and
 * reports nothing, so the harness retries after Floating UI repositioned on scroll.
 */
function inStage(find: (stage: HTMLElement) => PositionedElements | undefined) {
  return (container: HTMLElement): PositionedElements | undefined => {
    const stage = container.querySelector<HTMLElement>('[data-parity-stage]');
    if (!stage) {
      return undefined;
    }
    const viewport = stage.ownerDocument.documentElement;
    const rect = stage.getBoundingClientRect();
    if (rect.top < 0 || rect.left < 0 || rect.bottom > viewport.clientHeight || rect.right > viewport.clientWidth) {
      stage.scrollIntoView({ block: 'center', inline: 'nearest' });
      return undefined;
    }
    return find(stage);
  };
}

/** Arrows are an empty first child of the surface (content in these specs is text or has text). */
const arrowOf = (surface: HTMLElement) => {
  const first = surface.firstElementChild;
  return first && !first.textContent ? first : null;
};

/** Geometry of `surfaceSelector` relative to `triggerSelector`, both inside the stage. */
const surfaceGeometry = (triggerSelector: string, surfaceSelector: string) =>
  inStage(stage => {
    const trigger = stage.querySelector(triggerSelector);
    const surface = stage.querySelector<HTMLElement>(surfaceSelector);
    return trigger && surface ? { trigger, surface, arrow: arrowOf(surface) } : undefined;
  });

/** A drawer's rect relative to its stage; drawers are laid out by CSS, not placed by Floating UI. */
const drawerGeometry = (drawerSelector: string) =>
  inStage(stage => {
    const surface = stage.querySelector<HTMLElement>(drawerSelector);
    return surface ? { trigger: stage, surface, positioned: false } : undefined;
  });

const query = (selector: string) => (container: HTMLElement) => container.querySelector<HTMLElement>(selector)!;

const lines = (count: number) => Array.from({ length: count }, (_, index) => <div key={index}>Line {index + 1}</div>);

// --- Variant matrices ---------------------------------------------------------------------------------------------

const positions = ['above', 'below', 'before', 'after'] as const;
const aligns = ['start', 'center', 'end'] as const;

/**
 * Popover gets the full position x align matrix: it is the base surface of Popover, InfoLabel and TeachingPopover, and
 * its arrow moves with the alignment. The other components use the same middleware, so they get a reduced set: their
 * default placement, the opposite side and one side placement where their size allows it. Option variants (offset,
 * autoSize, coverTarget, matchTargetSize) run on Popover only; Combobox and Dropdown use `autoSize` and
 * `matchTargetSize: 'width'` by default.
 */
const matrix: ParityVariant[] = positions.flatMap(position =>
  aligns.map(align => ({ positioning: { position, align } })),
);

// --- Components ---------------------------------------------------------------------------------------------------

const C = {
  PopoverSurface: pair(
    PopoverSurface,
    griffel(
      'PopoverSurface',
      usePopoverSurface_unstable,
      useGriffelPopoverSurfaceStyles,
      renderPopoverSurface_unstable,
    ),
  ),
  MenuPopover: pair(
    MenuPopover,
    griffel('MenuPopover', useMenuPopover_unstable, useGriffelMenuPopoverStyles, renderMenuPopover_unstable),
  ),
  MenuList: pair(
    MenuList,
    griffel(
      'MenuList',
      useMenuList_unstable,
      useGriffelMenuListStyles,
      renderMenuList_unstable,
      useMenuListContextValues_unstable,
    ),
  ),
  MenuItem: pair(
    MenuItem,
    griffel('MenuItem', useMenuItem_unstable, useGriffelMenuItemStyles, renderMenuItem_unstable),
  ),
  Combobox: pair(
    Combobox,
    griffel(
      'Combobox',
      useCombobox_unstable,
      useGriffelComboboxStyles,
      renderCombobox_unstable,
      useComboboxContextValues,
    ),
  ),
  Dropdown: pair(
    Dropdown,
    griffel(
      'Dropdown',
      useDropdown_unstable,
      useGriffelDropdownStyles,
      renderDropdown_unstable,
      useComboboxContextValues,
    ),
  ),
  InfoLabel: pair(
    InfoLabel,
    griffel('InfoLabel', useInfoLabel_unstable, useGriffelInfoLabelStyles, renderInfoLabel_unstable),
  ),
  TeachingPopoverSurface: pair(
    TeachingPopoverSurface,
    griffel(
      'TeachingPopoverSurface',
      useTeachingPopoverSurface_unstable,
      useGriffelTeachingPopoverSurfaceStyles,
      renderTeachingPopoverSurface_unstable,
    ),
  ),
  InlineDrawer: pair(
    InlineDrawer,
    griffel(
      'InlineDrawer',
      useInlineDrawer_unstable,
      useGriffelInlineDrawerStyles,
      renderInlineDrawer_unstable,
      useDrawerContextValue,
    ),
  ),
  OverlayDrawer: pair(
    OverlayDrawer,
    griffel(
      'OverlayDrawer',
      useOverlayDrawer_unstable,
      useGriffelOverlayDrawerStyles,
      renderOverlayDrawer_unstable,
      useDrawerContextValue,
    ),
  ),
  Tooltip: {} as Pair,
};

/**
 * Tooltip has no root slot and no `className` prop: it is recomposed so the app's class name goes to `content`, and it
 * renders visible into the mount node it receives.
 */
function tooltip(useStyles: (state: never) => unknown, name: string): AnyComponent {
  const Inner = (props: AnyProps) => {
    const state = useTooltip_unstable(props as never);
    useStyles(state as never);
    return renderTooltip_unstable(state);
  };
  const Component = React.forwardRef<HTMLElement, AnyProps>(({ className, ...props }, _ref) => (
    <Inner relationship="description" visible {...props} content={{ children: 'Tooltip content', className }}>
      <button>Trigger</button>
    </Inner>
  ));
  Component.displayName = name;
  return Component as unknown as AnyComponent;
}
C.Tooltip = {
  css: tooltip(useTooltipStyles_unstable, 'CssTooltip'),
  griffel: tooltip(useGriffelTooltipStyles, 'GriffelTooltip'),
};

// --- Wrappers -----------------------------------------------------------------------------------------------------

const wrapperKeys = ['positioning', 'stage', 'long', 'withArrow'];

const popover = (element: JSXElement): JSXElement => {
  const [surface, { positioning, stage, long, withArrow }] = split(element, wrapperKeys);
  return (
    <Stage layout={stage as StageLayout}>
      {node => (
        <Popover open inline withArrow={withArrow as boolean} positioning={bounded(positioning, node)}>
          <PopoverTrigger disableButtonEnhancement>
            <button>Trigger</button>
          </PopoverTrigger>
          {long ? React.cloneElement(surface, { children: lines(10) } as AnyProps) : surface}
        </Popover>
      )}
    </Stage>
  );
};

const menuItems = (implementation: Implementation) => {
  const Item = C.MenuItem[implementation];
  return ['New', 'Open', 'Save'].map(label => <Item key={label}>{label}</Item>);
};

const menu = (element: JSXElement, implementation: Implementation): JSXElement => {
  const [menuPopover, { positioning }] = split(element, wrapperKeys);
  const List = C.MenuList[implementation];
  return (
    <Stage>
      {node => (
        <Menu open inline positioning={bounded(positioning, node)}>
          <MenuTrigger disableButtonEnhancement>
            <button>Trigger</button>
          </MenuTrigger>
          {React.cloneElement(menuPopover, { children: <List>{menuItems(implementation)}</List> } as AnyProps)}
        </Menu>
      )}
    </Stage>
  );
};

/** The component under test is the submenu's popover; the parent menu opens below a trigger in the stage corner. */
const submenu = (element: JSXElement, implementation: Implementation): JSXElement => {
  const [submenuPopover, { positioning }] = split(element, wrapperKeys);
  const ParentPopover = C.MenuPopover[implementation];
  const List = C.MenuList[implementation];
  const Item = C.MenuItem[implementation];
  return (
    <Stage layout="corner">
      {node => (
        <Menu open inline positioning={bounded({ position: 'below', align: 'start' }, node)}>
          <MenuTrigger disableButtonEnhancement>
            <button>Trigger</button>
          </MenuTrigger>
          <ParentPopover>
            <List>
              <Item>New</Item>
              <Menu open inline positioning={bounded(positioning, node)}>
                <MenuTrigger disableButtonEnhancement>
                  <Item>Share</Item>
                </MenuTrigger>
                {React.cloneElement(submenuPopover, { children: <List>{menuItems(implementation)}</List> } as AnyProps)}
              </Menu>
            </List>
          </ParentPopover>
        </Menu>
      )}
    </Stage>
  );
};

const tooltipInStage = (element: JSXElement): JSXElement => {
  const [tip, { positioning }] = split(element, ['positioning']);
  return <Stage>{node => React.cloneElement(tip, { mountNode: node, positioning: bounded(positioning, node) })}</Stage>;
};

/** Combobox and Dropdown: the listbox renders inline; `long` adds options until `autoSize` limits its height. */
const listboxTrigger = (element: JSXElement): JSXElement => {
  const [field, { positioning, stage, long }] = split(element, wrapperKeys);
  const options = ['Red', 'Green', 'Blue', ...(long ? ['Cyan', 'Magenta', 'Yellow', 'Black', 'White'] : [])];
  return (
    <Stage layout={stage as StageLayout}>
      {node =>
        React.cloneElement(field, {
          positioning: bounded(positioning, node),
          children: options.map(option => <Option key={option}>{option}</Option>),
        } as AnyProps)
      }
    </Stage>
  );
};

/**
 * Opens InfoLabel's info popover. Both InfoLabels render their default (CSS Modules) InfoButton, like `Forms.cy.tsx`;
 * InfoButton itself is compared there.
 */
const infoLabel = (element: JSXElement): JSXElement => {
  const [label, { positioning }] = split(element, ['positioning']);
  return (
    <Stage>
      {node => {
        const popoverProps = { open: true, positioning: bounded(positioning, node) };
        return React.cloneElement(label, { infoButton: { popover: popoverProps } } as AnyProps);
      }}
    </Stage>
  );
};

// Auto focus and focus trapping would move focus into whichever surface mounts last.
const teachingPopover = (element: JSXElement): JSXElement => {
  const [surface, { positioning }] = split(element, wrapperKeys);
  return (
    <Stage>
      {node => (
        <TeachingPopover
          open
          inline
          trapFocus={false}
          unstable_disableAutoFocus
          positioning={bounded(positioning, node)}
        >
          <TeachingPopoverTrigger disableButtonEnhancement>
            <button>Trigger</button>
          </TeachingPopoverTrigger>
          {surface}
        </TeachingPopover>
      )}
    </Stage>
  );
};

/** InlineDrawer next to the stage content, on the side its position names (bottom: below it). */
const inlineDrawer = (element: JSXElement): JSXElement => {
  const position = (element.props as AnyProps).position;
  const content = <div style={{ flex: 1 }}>Content</div>;
  return (
    <Stage style={{ flexDirection: position === 'bottom' ? 'column' : 'row', alignItems: 'stretch' }}>
      {() =>
        (position === 'start' ? [element, content] : [content, element]).map((child, index) =>
          React.cloneElement(child, { key: index }),
        )
      }
    </Stage>
  );
};

/** OverlayDrawer is `position: fixed`: the stage is its containing block, so it covers the stage, not the page. */
const overlayDrawer = (element: JSXElement): JSXElement => (
  <Stage containFixed>
    {node => React.cloneElement(element, { mountNode: node, modalType: 'non-modal' } as AnyProps)}
  </Stage>
);

// --- Specs --------------------------------------------------------------------------------------------------------

const specs: Record<string, ComponentSpec> = {
  Popover: {
    ...C.PopoverSurface,
    findRoot: query('.fui-PopoverSurface'),
    geometry: surfaceGeometry(':scope > button', '.fui-PopoverSurface'),
    sampledSlots: [],
    interactive: false,
    props: { children: 'Popover content', withArrow: true },
    variants: matrix,
    wrap: popover,
  },
  'Popover options': {
    ...C.PopoverSurface,
    findRoot: query('.fui-PopoverSurface'),
    geometry: surfaceGeometry(':scope > button', '.fui-PopoverSurface'),
    sampledSlots: [],
    interactive: false,
    props: { children: 'Popover content' },
    variants: [
      { positioning: { position: 'below', offset: 12 } },
      { positioning: { position: 'after', align: 'start', offset: { mainAxis: 8, crossAxis: 16 } } },
      { positioning: { position: 'above', offset: 8 }, withArrow: true },
      // `pinned`: the surface stays below and `autoSize` limits it to the stage instead of flipping.
      { positioning: { position: 'below', autoSize: true, pinned: true }, stage: 'short', long: true },
      { positioning: { position: 'below', autoSize: 'height', pinned: true }, stage: 'short', long: true },
      { positioning: { position: 'below', coverTarget: true } },
      { positioning: { position: 'above', align: 'start', matchTargetSize: 'width' } },
    ],
    wrap: popover,
  },
  Menu: {
    ...C.MenuPopover,
    findRoot: query('.fui-MenuPopover'),
    geometry: surfaceGeometry(':scope > button', '.fui-MenuPopover'),
    sampledSlots: ['fui-MenuList'],
    interactive: false,
    props: {},
    variants: [
      {},
      { positioning: { position: 'above', align: 'end' } },
      { positioning: { position: 'before', align: 'top' } },
      { positioning: { position: 'after', align: 'bottom' } },
    ],
    wrap: menu,
  },
  'Menu submenu': {
    ...C.MenuPopover,
    findRoot: query('.fui-MenuPopover .fui-MenuPopover'),
    geometry: surfaceGeometry('.fui-MenuList [aria-haspopup]', '.fui-MenuPopover .fui-MenuPopover'),
    sampledSlots: ['fui-MenuList'],
    interactive: false,
    props: {},
    variants: [{}, { positioning: { position: 'after', align: 'bottom' } }],
    wrap: submenu,
  },
  Tooltip: {
    ...C.Tooltip,
    findRoot: query('.fui-Tooltip__content'),
    geometry: surfaceGeometry(':scope > button', '.fui-Tooltip__content'),
    sampledSlots: [],
    interactive: false,
    props: { withArrow: true },
    variants: [
      {},
      { positioning: { position: 'below', align: 'start' } },
      { positioning: { position: 'before', align: 'center' } },
      { positioning: { position: 'after', align: 'end' } },
      { positioning: { position: 'above', align: 'end' }, appearance: 'inverted' },
    ],
    wrap: tooltipInStage,
  },
  Combobox: {
    ...C.Combobox,
    findRoot: query('.fui-Combobox'),
    geometry: surfaceGeometry('.fui-Combobox', '.fui-Combobox__listbox'),
    sampledSlots: ['fui-Combobox__listbox'],
    interactive: false,
    props: { open: true, inlinePopup: true, placeholder: 'Pick one' },
    variants: [
      {},
      { positioning: { position: 'above' } },
      { size: 'small', appearance: 'underline' },
      { stage: 'short', long: true },
    ],
    wrap: listboxTrigger,
  },
  Dropdown: {
    ...C.Dropdown,
    findRoot: query('.fui-Dropdown'),
    geometry: surfaceGeometry('.fui-Dropdown', '.fui-Dropdown__listbox'),
    sampledSlots: ['fui-Dropdown__listbox'],
    interactive: false,
    props: { open: true, inlinePopup: true, placeholder: 'Pick one' },
    variants: [
      {},
      { positioning: { position: 'above' } },
      { size: 'large', appearance: 'filled-darker' },
      { stage: 'short', long: true },
    ],
    wrap: listboxTrigger,
  },
  InfoLabel: {
    ...C.InfoLabel,
    findRoot: query('.fui-InfoLabel'),
    geometry: surfaceGeometry('.fui-InfoButton', '.fui-InfoButton__info'),
    sampledSlots: ['fui-InfoButton__info'],
    interactive: false,
    props: { info: 'Info', children: 'Label' },
    variants: [
      // InfoButton's default placement.
      { positioning: { position: 'above', align: 'start' } },
      { positioning: { position: 'below', align: 'end' } },
      { positioning: { position: 'after', align: 'center' }, size: 'large' },
      { positioning: { position: 'before', align: 'center' }, size: 'small' },
    ],
    wrap: infoLabel,
  },
  TeachingPopover: {
    ...C.TeachingPopoverSurface,
    findRoot: query('.fui-TeachingPopoverSurface'),
    geometry: surfaceGeometry(':scope > button', '.fui-TeachingPopoverSurface'),
    sampledSlots: [],
    interactive: false,
    props: { children: 'Teaching content' },
    // The surface is at least 320px wide: no room beside the trigger, so only above and below.
    variants: (['above', 'below'] as const).flatMap(position =>
      aligns.map(align => ({ positioning: { position, align } })),
    ),
    wrap: teachingPopover,
  },
  // Drawers are laid out by CSS, not Floating UI: their rect is compared relative to the fixed-size stage.
  InlineDrawer: {
    ...C.InlineDrawer,
    findRoot: query('.fui-InlineDrawer'),
    geometry: drawerGeometry('.fui-InlineDrawer'),
    sampledSlots: [],
    interactive: false,
    props: { open: true, children: 'Drawer content' },
    variants: [{ position: 'start' }, { position: 'end', separator: true }, { position: 'bottom', size: 'small' }],
    wrap: inlineDrawer,
  },
  OverlayDrawer: {
    ...C.OverlayDrawer,
    findRoot: query('.fui-OverlayDrawer'),
    geometry: drawerGeometry('.fui-OverlayDrawer'),
    sampledSlots: [],
    interactive: false,
    props: { open: true, children: 'Drawer content' },
    variants: [{ position: 'start' }, { position: 'end', size: 'large' }, { position: 'bottom' }],
    wrap: overlayDrawer,
  },
};

describeParity('positioning', specs, { scenarios: ['no app styles', 'layout makeStyles override'] });
