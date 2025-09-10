import * as React from 'react';
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
});
