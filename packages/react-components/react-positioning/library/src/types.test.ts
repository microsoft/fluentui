/* eslint-disable @typescript-eslint/naming-convention */
import * as React from 'react';
import { createPositioningManager_unstable } from './createPositioningManager_unstable';
import type { CreatePositioningManagerOptions, PositionManager } from './types';
import type { OnPositioningEndEvent } from './types';
import type { PositioningProps } from './types';

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
      // Access detail fields to verify the type shape
      const _placement: string = e.detail.placement;
      const _escaped: boolean = e.detail.escaped;
      const _referenceHidden: boolean = e.detail.referenceHidden;
      _placement;
      _escaped;
      _referenceHidden;
    };

    const props: PositioningProps = {
      onPositioningEnd: callback,
    };

    expect(props.onPositioningEnd).toBeDefined();
  });
});

describe('createPositioningManager_unstable', () => {
  it('should not break the factory option and return types', () => {
    const factory: (options: CreatePositioningManagerOptions) => PositionManager = createPositioningManager_unstable;
    const options: CreatePositioningManagerOptions = {
      arrow: null,
      container: document.createElement('div'),
      dir: 'rtl',
      enabled: true,
      positionFixed: true,
      target: document.createElement('button'),
      targetDocument: document,
      unstable_disableShift: true,
      unstable_disableTether: 'all',
      unstable_flipFallbackStrategy: 'initialPlacement',
    };

    expect(factory).toBeDefined();
    expect(options).toBeTruthy;
  });
});
