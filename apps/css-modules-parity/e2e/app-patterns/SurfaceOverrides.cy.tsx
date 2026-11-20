import * as React from 'react';
import { Menu, MenuTrigger, Popover, PopoverTrigger } from '@fluentui/react-components';
import type { PositioningProps } from '@fluentui/react-components';
import type { JSXElement } from '@fluentui/react-utilities';
import { describeParity } from '../harness';
import type { AppPattern, ComponentSpec, Implementation, PositionedElements } from '../harness';
import { patternMatrix } from './matrix';
import type { PatternFactory } from './matrix';
import { InContainer, P, TRIGGER_ATTRIBUTE, query } from './patternComponents';
import { useSurfaceOverrideStyles } from './useSurfaceOverrideStyles.styles';

type SurfaceOptions = {
  positioning?: PositioningProps;
  /** Renders into this node instead of inline (Popover, Menu) or the tooltip's own mount node. */
  mountNode?: HTMLElement;
  triggerClassName?: string;
};

const trigger = (className?: string) => (
  <button className={className} {...{ [TRIGGER_ATTRIBUTE]: '' }}>
    Trigger
  </button>
);

/** Opens each surface on mount around the element under test, inline unless a mount node is given. */
function openSurface(name: string, element: JSXElement, options: SurfaceOptions): JSXElement {
  const { positioning, mountNode, triggerClassName } = options;
  if (name === 'PopoverSurface') {
    return (
      <Popover open inline={!mountNode} mountNode={mountNode} positioning={positioning}>
        <PopoverTrigger disableButtonEnhancement>{trigger(triggerClassName)}</PopoverTrigger>
        {element}
      </Popover>
    );
  }
  if (name === 'MenuPopover') {
    return (
      <Menu open inline={!mountNode} mountNode={mountNode} positioning={positioning}>
        <MenuTrigger disableButtonEnhancement>{trigger(triggerClassName)}</MenuTrigger>
        {element}
      </Menu>
    );
  }
  // The recomposed Tooltip takes the options as props.
  return React.cloneElement(element, options);
}

const positioned =
  (surfaceSelector: string) =>
  (container: HTMLElement): PositionedElements | undefined => {
    // Floating UI clips every boundary to the viewport: measure only once the container is fully in view (returning
    // `undefined` makes the harness wait, and Floating UI repositions on scroll).
    const rect = container.getBoundingClientRect();
    const viewport = container.ownerDocument.documentElement;
    if (rect.top < 0 || rect.bottom > viewport.clientHeight) {
      container.scrollIntoView({ block: 'center' });
      return undefined;
    }
    const surface = container.querySelector<HTMLElement>(surfaceSelector);
    const triggerElement = container.querySelector(`[${TRIGGER_ATTRIBUTE}]`);
    return surface && triggerElement ? { trigger: triggerElement, surface } : undefined;
  };

/** Taller than the space above the trigger in the bounded layout, so `autoSize` caps the surface. */
const longContent = Array.from({ length: 4 }, () => 'Surface content that wraps over several lines.').join(' ');

/**
 * Unbounded layouts open below: the implementations' containers sit at different page offsets, and a default `above`
 * placement could flip for one and not the other near the top of the page.
 */
const below: PositioningProps = { position: 'below' };

/**
 * One variant each: geometry is compared relative to the trigger, and the bounded layouts must stay inside the
 * viewport for Floating UI to clip against the app's boundary only.
 */
const components: Record<string, ComponentSpec> = {
  PopoverSurface: {
    ...P.PopoverSurface,
    findRoot: query('.fui-PopoverSurface'),
    geometry: positioned('.fui-PopoverSurface'),
    sampledSlots: [],
    interactive: false,
    props: { children: 'Popover content' },
    variants: [{}],
  },
  MenuPopover: {
    ...P.MenuPopover,
    findRoot: query('.fui-MenuPopover'),
    geometry: positioned('.fui-MenuPopover'),
    sampledSlots: ['fui-MenuList'],
    interactive: false,
    props: (implementation: Implementation) => {
      const List = P.MenuList[implementation];
      const Item = P.MenuItem[implementation];
      return {
        children: (
          <List>
            <Item>Item A</Item>
            <Item>Item B</Item>
            <Item>Item C</Item>
          </List>
        ),
      };
    },
    variants: [{}],
  },
  Tooltip: {
    ...P.Tooltip,
    customStyleHook: 'useTooltipStyles_unstable',
    findRoot: query('.fui-Tooltip__content'),
    geometry: positioned('.fui-Tooltip__content'),
    sampledSlots: [],
    interactive: false,
    props: {},
    variants: [{ appearance: 'inverted' }],
  },
};

type Layout = 'plain' | 'bounded' | 'layer';

/** App surface overrides with `positioning` options, in the app's layout. */
const surfaceCase =
  (layout: Layout, positioning?: PositioningProps, props?: Record<string, unknown>): PatternFactory =>
  name => ({
    useAppPattern: function useSurfaceOverrides(): AppPattern {
      const classes = useSurfaceOverrideStyles();
      return {
        className: classes.surface,
        // Only PopoverSurface takes text children; MenuPopover keeps its MenuList, Tooltip its fixed content.
        props: name === 'PopoverSurface' ? props : undefined,
        wrap: element => {
          const surface = (options: SurfaceOptions) => openSurface(name, element, options);
          if (layout === 'layer') {
            return (
              <InContainer className={classes.layer}>{mountNode => surface({ positioning, mountNode })}</InContainer>
            );
          }
          if (layout === 'bounded') {
            return (
              <div className={classes.boundary}>
                {surface({ positioning, triggerClassName: classes.bottomTrigger })}
              </div>
            );
          }
          return surface({ positioning });
        },
      };
    },
  });

describeParity(
  'app pattern: surface overrides',
  patternMatrix(components, {
    'size, overflow and z-index overrides': surfaceCase('plain', below),
    fallbackPositions: surfaceCase('bounded', { position: 'below', fallbackPositions: ['after', 'above'] }),
    coverTarget: surfaceCase('plain', { ...below, coverTarget: true }),
    autoSize: surfaceCase('bounded', { position: 'above', autoSize: true }, { children: longContent }),
    'mountNode in a z-indexed container': surfaceCase('layer', below),
  }),
  { scenarios: ['app pattern'] },
);
