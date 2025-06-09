import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { render } from '@testing-library/react';

import { DirectionalHint } from '../../common/DirectionalHint';
import { TooltipBase } from './Tooltip.base';
import { Callout, type ICalloutProps } from '../../Callout';

const defaultCalloutProps: ICalloutProps = {
  isBeakVisible: true,
  beakWidth: 16,
  gapSpace: 0,
  setInitialFocus: true,
  doNotLayer: false,
};

jest.mock('react-dom', () => {
  return {
    ...jest.requireActual('react-dom'),
    // Mock createPortal to capture its component hierarchy in snapshot output.
    createPortal: jest.fn((node: any) => node),
  };
});

describe('Tooltip', () => {
  it('renders default Tooltip correctly', () => {
    const component = renderer.create(<TooltipBase />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('uses default documented properties', () => {
    const component = renderer.create(<TooltipBase />);
    const instance = component.getInstance()!;

    expect(instance.props.directionalHint).toEqual(DirectionalHint.topCenter);
    expect(instance.props.maxWidth).toEqual('364px');
    expect(instance.props.calloutProps).toEqual(defaultCalloutProps);
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
    const { container } = render(<div data-testid="tooltip-target" />);
    const targetElement = container.firstElementChild as HTMLElement;

    let onRenderCalled = false;

    const component = renderer.create(
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

    const callout = component.root.findByType(Callout);

    Object.keys(calloutProps).forEach((key: keyof ICalloutProps) => {
      expect(callout.props[key]).toEqual(calloutProps[key]);
    });

    expect(callout.props.tabIndex).toEqual(-1);
    expect(callout.props.directionalHint).toEqual(directionalHint);
    expect(callout.props.directionalHintForRTL).toEqual(directionalHintForRTL);
    expect(callout.props.target).toEqual(targetElement);
  });
});
