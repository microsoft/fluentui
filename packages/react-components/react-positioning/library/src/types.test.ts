import * as React from 'react';
import type { OnPositioningEndEvent } from './types';
import { PositioningProps } from './types';

describe('PositioningProps', () => {
  it('should not break API', () => {
    const props: PositioningProps = {
      align: 'bottom',
      arrowPadding: 0,
      autoSize: 'always',
      coverTarget: true,
      flipBoundary: null,
      offset: 0,
      overflowBoundary: null,
      overflowBoundaryPadding: 0,
      pinned: true,
      position: 'above',
      positioningRef: React.createRef(),
      target: null,
    };

    // assertion is useless, we just want typescript to check the positioning props
    expect(props).toBeTruthy;
  });

  it('accepts () => void for onPositioningEnd (backwards compatibility)', () => {
    // The signature changed from () => void to (e: OnPositioningEndEvent) => void.
    // TypeScript's function parameter compatibility ensures () => void still works.
    const callback: () => void = () => {
      /* noop */
    };

    const props: PositioningProps = {
      onPositioningEnd: callback,
    };

    expect(props.onPositioningEnd).toBeDefined();
  });

  it('accepts (e: OnPositioningEndEvent) => void for onPositioningEnd', () => {
    const callback = (e: OnPositioningEndEvent) => {
      // Access detail.placement to verify the type shape
      const _placement: string = e.detail.placement;
      _placement;
    };

    const props: PositioningProps = {
      onPositioningEnd: callback,
    };

    expect(props.onPositioningEnd).toBeDefined();
  });
});
