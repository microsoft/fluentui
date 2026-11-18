import * as React from 'react';
import { FluentProvider, Portal, mergeClasses } from '@fluentui/react-components';
import type { JSXElement } from '@fluentui/react-components';
import type { FluentProviderCustomStyleHooks } from '@fluentui/react-provider';
import { coreComponents } from '../components/core';
import { describeParity, icon } from '../harness';
import type { AppPattern, ComponentSpec } from '../harness';
import { around, partSpecs } from './appPatternParts';
import { patternMatrix, pick, withClass } from './matrix';
import type { PatternFactory } from './matrix';
import { usePhysicalOverrideStyles } from './usePhysicalOverrideStyles.styles';

/** Direction of the parity app (`FUI_PARITY_DIR`) and the opposite one. */
const appDir: 'ltr' | 'rtl' = Cypress.env('dir') === 'rtl' ? 'rtl' : 'ltr';
const oppositeDir = appDir === 'rtl' ? 'ltr' : 'rtl';

// --- Physical overrides -------------------------------------------------------------------------------------------

const buttonStyleHook = 'useButtonStyles_unstable';

/** A custom style hook from a nested provider, like an app restyling every Button of a region. */
const paddingFromCustomStyleHook: PatternFactory = (componentName, spec) => {
  const markup = around(componentName, spec, children => children);
  return {
    useAppPattern: function useCustomStyleHookPadding(): AppPattern {
      const classes = usePhysicalOverrideStyles();
      const customStyleHooks = React.useMemo(
        (): FluentProviderCustomStyleHooks => ({
          [buttonStyleHook]: (state: unknown) => {
            const { root } = state as { root: { className?: string } };
            root.className = mergeClasses(root.className, classes.padding);
          },
        }),
        [classes.padding],
      );
      return {
        wrap: (element, implementation) => (
          <FluentProvider customStyleHooks_unstable={customStyleHooks}>
            {markup.wrap(element, implementation)}
          </FluentProvider>
        ),
      };
    },
    findRoot: markup.findRoot,
  };
};

const iconMargin: PatternFactory = () => ({
  useAppPattern: function useIconMargin(): AppPattern {
    return { props: { icon: { className: usePhysicalOverrideStyles().iconMargin, children: icon } } };
  },
});

const physicalOverrides = {
  ...patternMatrix(pick(coreComponents, ['Button']), {
    'paddingLeft/paddingRight className': withClass(usePhysicalOverrideStyles, 'padding'),
    'paddingLeft/paddingRight custom style hook': paddingFromCustomStyleHook,
    'icon marginRight': iconMargin,
    '[dir="rtl"] & transform': withClass(usePhysicalOverrideStyles, 'rtlTransform'),
  }),
  // OverlayDrawer is positioned at the viewport edge, like the Overlays spec renders it (non-modal, sampled at rest).
  ...patternMatrix(pick(partSpecs, ['OverlayDrawer', 'InlineDrawer']), {
    borderLeft: withClass(usePhysicalOverrideStyles, 'borderLeft'),
  }),
};

// --- Direction of portaled and nested content ---------------------------------------------------------------------

/** Renders the component through a Portal into a mount node inside the test container, as Popover and Menu do. */
const PortalInto = ({ dir, children }: { dir?: 'ltr' | 'rtl'; children: JSXElement }): JSXElement => {
  const [mountNode, setMountNode] = React.useState<HTMLElement | null>(null);
  return (
    <>
      {mountNode && <Portal mountNode={mountNode}>{children}</Portal>}
      <div dir={dir} ref={setMountNode} />
    </>
  );
};

const markupPattern =
  (markup: (children: JSXElement) => JSXElement): PatternFactory =>
  (componentName, spec) => {
    const { wrap, findRoot } = around(componentName, spec, markup);
    return {
      useAppPattern: function useMarkup(): AppPattern {
        return { wrap };
      },
      findRoot,
    };
  };

/** A mount node without `dir`: its direction is the provider's. */
const portal = markupPattern(children => <PortalInto>{children}</PortalInto>);
/**
 * A nested provider in the other direction: context and DOM agree. Direction rules must follow the nearest `dir`
 * (`:dir()`), not any `[dir='rtl']` ancestor. A mount node whose `dir` differs from the provider's isn't compared: Griffel
 * resolves direction from React context, CSS from the DOM (see Known differences in the README).
 */
const nestedProviderOppositeDir = markupPattern(children => (
  <FluentProvider dir={oppositeDir}>{children}</FluentProvider>
));

/**
 * Components with direction rules: Link (`:dir(rtl)` text alignment), Switch (`:dir(rtl)` thumb position, the
 * `fui-Icon` thumb is sampled), MenuItemSwitch and Tab (`:dir(rtl)` thumb position and indicator origin).
 */
const directional: Record<string, ComponentSpec> = {
  Link: coreComponents.Link,
  Switch: { ...coreComponents.Switch, sampledSlots: [...coreComponents.Switch.sampledSlots, 'fui-Icon'] },
  MenuItemSwitch: partSpecs.MenuItemSwitch,
  Tab: partSpecs.Tab,
};

/**
 * Physical app overrides in both directions (reduced from apps written for LTR with `paddingLeft`, `marginRight` and
 * `borderLeft`, plus a `[dir="rtl"]` fix-up), and directional components rendered where their direction comes from.
 */
describeParity(
  'app pattern: physical overrides and direction',
  {
    ...physicalOverrides,
    ...patternMatrix(directional, { 'portal, mount node in the provider direction': portal }),
    ...patternMatrix(directional, { 'nested provider in the opposite direction': nestedProviderOppositeDir }),
  },
  { scenarios: ['app pattern'] },
);
