import * as React from 'react';
import { render } from '@testing-library/react';

import { DirectionalHint } from '../../common/DirectionalHint';
import { TooltipBase } from './Tooltip.base';
import type { ICalloutProps } from '../../Callout';

jest.mock('react-dom', () => {
  return {
    ...jest.requireActual('react-dom'),
    // Mock createPortal to capture its component hierarchy in snapshot output.
    createPortal: jest.fn((node: any) => node),
  };
});

describe('Tooltip', () => {
  it('renders default Tooltip correctly', () => {
    const { container } = render(<TooltipBase />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('uses specified properties', () => {
    const calloutProps: ICalloutProps = {
      isBeakVisible: false,
      beakWidth: 0,
      gapSpace: 10,
      setInitialFocus: false,
      doNotLayer: true,
    };

    const directionalHint = DirectionalHint.bottomLeftEdge;
    const directionalHintForRTL = DirectionalHint.topRightEdge;

    // Create a target element with React Testing Library instead of ReactTestUtils
    const { container, rerender } = render(<div data-testid="tooltip-target" />);
    const targetElement = container.firstElementChild as HTMLElement;

    let onRenderCalled = false;

    rerender(
      <TooltipBase
        calloutProps={calloutProps}
        tabIndex={-1}
        directionalHint={directionalHint}
        directionalHintForRTL={directionalHintForRTL}
        onRenderContent={() => {
          onRenderCalled = true;
          return null;
        }}
        targetElement={targetElement}
      />,
    );

    expect(onRenderCalled).toEqual(true);
  });
});
