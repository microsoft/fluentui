import * as React from 'react';
import { Button, mergeClasses, renderButton_unstable, useButton_unstable } from '@fluentui/react-components';
// Explicit `.ts` import bypasses the CSS Modules resolution, giving the original Griffel implementation.
import { useButtonStyles_unstable as useGriffelButtonStyles } from '../../../../packages/react-components/react-button/library/src/components/Button/useButtonStyles.styles.ts';
import { describeParity, griffel, icon } from '../harness';
import type { AnyComponent, AppPattern, ComponentSpec } from '../harness';
import { COLLAPSE_BREAKPOINT, useSegmentedToggleStyles } from './useSegmentedToggleStyles.styles';

const GriffelButton = griffel('Button', useButton_unstable, useGriffelButtonStyles, renderButton_unstable);

/**
 * A segmented "first | last" toggle reduced from a production app (see `useSegmentedToggleStyles`). The first button is
 * sampled; the last one is rendered with the same implementation so both share the flex container like in the app.
 * Toggling swaps the selection, which changes font weight and therefore the buttons' min-content widths.
 */
function createSegmentedToggle(containerWidth: number) {
  return function useSegmentedToggle(toggled: boolean): AppPattern {
    const classes = useSegmentedToggleStyles();
    const buttonClassName = (selected: boolean) =>
      mergeClasses(classes.toggleButton, classes.toggleButtonNormal, selected ? classes.selected : classes.notSelected);

    return {
      className: buttonClassName(!toggled),
      props: { 'data-position': 'first', icon, children: 'First' },
      wrap: (element, implementation) => {
        const Component = implementation === 'griffel' ? GriffelButton : (Button as AnyComponent);
        return (
          <div className={classes.query} style={{ width: containerWidth }}>
            <div className={classes.buttonContainer}>
              <div className={classes.firstWrapper}>{element}</div>
              <div className={classes.lastWrapper}>
                <Component data-position="last" icon={icon} className={buttonClassName(toggled)}>
                  Last
                </Component>
              </div>
            </div>
          </div>
        );
      },
    };
  };
}

const segmentedToggle = (containerWidth: number): ComponentSpec => ({
  css: Button as AnyComponent,
  griffel: GriffelButton,
  sampledSlots: ['fui-Button__icon'],
  interactive: true,
  props: {},
  variants: [{ appearance: 'secondary' }, { appearance: 'subtle' }],
  findRoot: container => container.querySelector<HTMLElement>('[data-position="first"]')!,
  useAppPattern: createSegmentedToggle(containerWidth),
  toggles: true,
  knownDifferences: {
    // `&[data-position="first"]` has the specificity of a component `:hover` rule but Griffel puts it in the default
    // bucket, so the subtle Button's `:hover` border color (transparent) beat it. As a separate, earlier stylesheet,
    // CSS Modules component styles lose to the app rule. The border is 0px wide here, so nothing renders differently.
    'app pattern': { 'root border-inline-end-color': ['--colorNeutralStroke2'] },
  },
});

describeParity(
  'app pattern: segmented toggle',
  {
    'SegmentedToggle (expanded)': segmentedToggle(COLLAPSE_BREAKPOINT + 100),
    'SegmentedToggle (collapsed)': segmentedToggle(COLLAPSE_BREAKPOINT - 100),
  },
  { scenarios: ['app pattern'] },
);
