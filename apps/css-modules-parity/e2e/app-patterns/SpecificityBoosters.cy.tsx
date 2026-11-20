import * as React from 'react';
import { Dialog } from '@fluentui/react-components';
import { FluentProvider } from '@fluentui/react-provider';
import { getSlotClassNameProp_unstable } from '@fluentui/react-utilities';
import type { JSXElement } from '@fluentui/react-utilities';
import { mergeClasses } from '@griffel/react';
import { coreComponents } from '../components/core';
import { describeParity, icon } from '../harness';
import type { AppPattern, ComponentSpec, Implementation } from '../harness';
import { patternMatrix, tolerate } from './matrix';
import type { PatternFactory } from './matrix';
import { InContainer, P, query } from './patternComponents';
import { useSpecificityBoosterStyles } from './useSpecificityBoosterStyles.styles';

type SlotState = { className?: string };

/**
 * Surrounding markup per component; the app's nested `FluentProvider` (with its custom style hook) goes around it.
 * DialogSurface renders non-modal into a mount node inside the container, like in `Overlays.cy.tsx`.
 */
function surround(name: string, element: JSXElement, implementation: Implementation): JSXElement {
  if (name === 'MenuItem') {
    const List = P.MenuList[implementation];
    return <List>{element}</List>;
  }
  if (name === 'DialogSurface') {
    return (
      <InContainer>
        {mountNode => (
          <Dialog open modalType="non-modal">
            {React.cloneElement(element, { mountNode } as Record<string, unknown>)}
          </Dialog>
        )}
      </InContainer>
    );
  }
  return element;
}

const components: Record<string, ComponentSpec> = {
  Button: { ...coreComponents.Button, findRoot: query('.fui-Button') },
  MenuItem: {
    ...P.MenuItem,
    findRoot: query('.fui-MenuItem'),
    sampledSlots: ['fui-MenuItem__icon', 'fui-MenuItem__content'],
    interactive: true,
    props: { icon, children: 'Item' },
    variants: [{}, { disabled: true }],
  },
  DialogSurface: {
    ...P.DialogSurface,
    findRoot: query('.fui-DialogSurface'),
    sampledSlots: [],
    interactive: false,
    props: { children: 'Dialog content' },
    variants: [{}],
  },
};

/**
 * A repeated-class booster, a global custom style hook ending with `getSlotClassNameProp_unstable` (so the app's
 * `className` stays last) and the app's `className`, as design systems layered on Fluent stack them. The hook is set
 * on a nested `FluentProvider` around the component.
 */
const boosted =
  (booster: 'booster2' | 'booster3' | undefined): PatternFactory =>
  name => ({
    useAppPattern: function useBoosters(): AppPattern {
      const classes = useSpecificityBoosterStyles();
      const hookName = `use${name}Styles_unstable`;
      const customStyleHooks = {
        [hookName]: (state: unknown) => {
          const root = (state as { root: SlotState }).root;
          root.className = mergeClasses(root.className, classes.hook, getSlotClassNameProp_unstable(root));
        },
      };
      return {
        className: mergeClasses(booster && classes[booster], classes.className),
        wrap: (element, implementation) => (
          <FluentProvider customStyleHooks_unstable={customStyleHooks}>
            {surround(name, element, implementation)}
          </FluentProvider>
        ),
      };
    },
  });

/**
 * `&&&` compiles to a doubled class, the specificity of a component state rule (`.root:hover`), but without a
 * pseudo-class, so Griffel put it in its default bucket and the component's state colors won. As a separate, earlier
 * stylesheet, CSS Modules component rules now lose to it: the booster's values also apply in that state. `&&` compiles
 * to a single class and needs no tolerance: it behaves like any app class.
 */
const boosterValues = {
  'root background-color': ['--colorPaletteBerryBackground2'],
  'root color': ['--colorPaletteBerryForeground2'],
};

describeParity(
  'app pattern: specificity boosters',
  patternMatrix(components, {
    'custom style hook + className': boosted(undefined),
    '&& booster + custom style hook + className': boosted('booster2'),
    '&&& booster + custom style hook + className': tolerate(boosted('booster3'), boosterValues),
  }),
  { scenarios: ['app pattern'] },
);
