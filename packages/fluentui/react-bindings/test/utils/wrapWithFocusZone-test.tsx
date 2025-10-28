import * as React from 'react';

import { emptyBehavior } from '../../src/accessibility/getAccessibility';
import { FocusZone } from '../../src/FocusZone/FocusZone';
import { wrapWithFocusZone } from '../../src/utils/wrapWithFocusZone';
import type { ReactAccessibilityBehavior } from '../../src/accessibility/types';

describe('wrapWithFocusZone', () => {
  it('do not render FocusZone without the definition in a behavior', () => {
    const definition: ReactAccessibilityBehavior = {
      ...emptyBehavior,
      focusZone: undefined,
    };

    expect(wrapWithFocusZone(definition, <div />)).toMatchObject({ type: 'div' });
  });

  it('renders FocusZone with the definition in a behavior', () => {
    const definition: ReactAccessibilityBehavior = {
      ...emptyBehavior,
      focusZone: {
        props: {
          disabled: true,
          shouldFocusOnMount: true,
        },
      },
    };

    expect(wrapWithFocusZone(definition, <div />)).toMatchObject({ type: FocusZone });
  });

  it('applies props from the behavior to a FocusZone component', () => {
    const definition: ReactAccessibilityBehavior = {
      ...emptyBehavior,
      focusZone: {
        props: {
          disabled: true,
          shouldFocusOnMount: true,
        },
      },
    };
    const result = wrapWithFocusZone(definition, <div />);

    expect(result).toMatchObject({ type: FocusZone });
    expect(result.props).toEqual(
      expect.objectContaining({
        disabled: true,
        shouldFocusOnMount: true,
      }),
    );
  });

  it('applies default props for FocusZone', () => {
    const definition: ReactAccessibilityBehavior = {
      ...emptyBehavior,
      focusZone: {
        props: {
          disabled: true,
          shouldFocusOnMount: true,
        },
      },
    };
    const result = wrapWithFocusZone(definition, <div />);

    expect(result).toMatchObject({ type: FocusZone });
    expect(result.props).toEqual(
      expect.objectContaining({
        preventDefaultWhenHandled: true,
        shouldRaiseClicks: false,
      }),
    );
  });

  it('passes "rtl" value', () => {
    const ltrDefinition: ReactAccessibilityBehavior = {
      ...emptyBehavior,
      rtl: false,
      focusZone: {
        props: {
          disabled: true,
          shouldFocusOnMount: true,
        },
      },
    };
    const rtlDefinition: ReactAccessibilityBehavior = {
      ...ltrDefinition,
      rtl: true,
    };

    expect(wrapWithFocusZone(ltrDefinition, <div />).props).toMatchObject({ isRtl: false });
    expect(wrapWithFocusZone(rtlDefinition, <div />).props).toMatchObject({ isRtl: true });
  });
});
