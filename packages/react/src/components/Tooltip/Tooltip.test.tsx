import * as React from 'react';
import * as ReactTestUtils from 'react-dom/test-utils';
import * as renderer from 'react-test-renderer';

import { mount } from 'enzyme';

import { DirectionalHint } from '../../common/DirectionalHint';
import { TooltipBase } from './Tooltip.base';
import type { ICalloutProps } from '../../Callout';

const defaultCalloutProps: ICalloutProps = {
  isBeakVisible: true,
  beakWidth: 16,
  gapSpace: 0,
  setInitialFocus: true,
  doNotLayer: false,
};

describe('Tooltip', () => {
  it('renders default Tooltip correctly', () => {
    // Mock createPortal to capture its component hierarchy in snapshot output.
    const ReactDOM = require('react-dom');
    const createPortal = ReactDOM.createPortal;
    ReactDOM.createPortal = jest.fn(element => {
      return element;
    });

    const component = renderer.create(<TooltipBase />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();

    ReactDOM.createPortal = createPortal;
  });

  it('uses default documented properties', () => {
    const component = mount(<TooltipBase />);

    expect(component.prop('directionalHint')).toEqual(DirectionalHint.topCenter);
    expect(component.prop('maxWidth')).toEqual('364px');
    expect(component.prop('calloutProps')).toEqual(defaultCalloutProps);
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
    const targetElement = ReactTestUtils.renderIntoDocument(<div />) as unknown as HTMLElement;
    let onRenderCalled = false;

    const component = mount(
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

    const callout = component.find('Callout');

    Object.keys(calloutProps).forEach((key: keyof ICalloutProps) => {
      expect(callout.prop(key)).toEqual(calloutProps[key]);
    });

    expect(callout.prop('tabIndex')).toEqual(-1);
    expect(callout.prop('directionalHint')).toEqual(directionalHint);
    expect(callout.prop('directionalHintForRTL')).toEqual(directionalHintForRTL);
    expect(callout.prop('target')).toEqual(targetElement);
  });
});
