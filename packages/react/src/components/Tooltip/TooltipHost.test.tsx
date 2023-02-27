import * as React from 'react';
import * as renderer from 'react-test-renderer';

import { mount } from 'enzyme';
import { DirectionalHint } from '../../common/DirectionalHint';
import { assign } from '../../Utilities';
import { TooltipHost } from './TooltipHost';
import { TooltipDelay } from './Tooltip.types';
import type { ICalloutProps } from '../../Callout';
import type { ITooltipProps } from './Tooltip.types';

describe('TooltipHost', () => {
  it('renders correctly', () => {
    const component = renderer.create(<TooltipHost />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('uses default documented properties', () => {
    const component = mount(<TooltipHost />);

    const tooltip = component.find('TooltipHostBase');

    expect(tooltip.prop('delay')).toEqual(TooltipDelay.medium);
    // TODO: should be tested or doc updated. https://github.com/microsoft/fluentui/issues/4708
    // expect(component.prop('directionalHint')).toEqual(DirectionalHint.topCenter);
  });

  it('uses specified properties', () => {
    const calloutProps: ICalloutProps = {
      isBeakVisible: false,
      beakWidth: 0,
      gapSpace: 10,
      setInitialFocus: false,
      doNotLayer: true,
    };
    const content = 'test content';
    const delay = TooltipDelay.zero;
    const directionalHint = DirectionalHint.bottomLeftEdge;
    const directionalHintForRTL = DirectionalHint.topRightEdge;
    const tooltipProps: ITooltipProps = {
      maxWidth: 'test width',
      delay: TooltipDelay.zero,
    };
    let onTooltipToggleCalled = false;

    // TODO: Remove assign. Temporarily used to create new object due to issue:
    //        https://github.com/microsoft/fluentui/issues/4715
    const component = mount(
      <TooltipHost
        calloutProps={assign({}, calloutProps)}
        content={content}
        delay={delay}
        directionalHint={directionalHint}
        directionalHintForRTL={directionalHintForRTL}
        onTooltipToggle={() => {
          onTooltipToggleCalled = true;
          return null;
        }}
        tooltipProps={tooltipProps}
      />,
    );

    component.find('.ms-TooltipHost').simulate('mouseenter');

    const tooltip = component.find('TooltipBase');

    expect(onTooltipToggleCalled).toEqual(true);

    expect(tooltip.prop('calloutProps')).toMatchObject(calloutProps);
    expect(tooltip.prop('content')).toEqual(content);
    expect(tooltip.prop('delay')).toEqual(delay);
    expect(tooltip.prop('directionalHint')).toEqual(directionalHint);
    expect(tooltip.prop('directionalHintForRTL')).toEqual(directionalHintForRTL);

    Object.keys(tooltipProps).forEach((key: keyof ITooltipProps) => {
      expect(tooltip.prop(key)).toEqual(tooltipProps[key]);
    });
  });

  it('does not mutate calloutProps', () => {
    const calloutProps: ICalloutProps = {
      isBeakVisible: false,
      beakWidth: 0,
      gapSpace: 10,
      setInitialFocus: false,
      doNotLayer: true,
    };
    const content = 'test content';
    let onTooltipToggleCalled = false;

    const calloutPropsBefore = assign({}, calloutProps);

    const component = mount(
      <TooltipHost
        calloutProps={calloutProps}
        content={content}
        delay={TooltipDelay.zero}
        onTooltipToggle={() => {
          onTooltipToggleCalled = true;
          return null;
        }}
      />,
    );

    // simulate mouse enter to trigger use of calloutProps
    component.find('.ms-TooltipHost').simulate('mouseenter');

    expect(onTooltipToggleCalled).toEqual(true);
    expect(calloutPropsBefore).toEqual(calloutProps);
  });

  it('uses onRenderContent for description text', () => {
    const tooltipProps = {
      onRenderContent: () => <span>test</span>,
    };

    const component = mount(<TooltipHost content={'should not be used'} id="tooltipId" tooltipProps={tooltipProps} />);
    const descriptionText = component.find('#tooltipId').at(0).text();
    expect(descriptionText).toEqual('test');
  });

  it('passes props and render function to onRenderContent', () => {
    const tooltipProps: ITooltipProps = {
      onRenderContent: (props, render) => render?.({ ...props, content: props?.content + ' suffix' }) || null,
    };

    const component = mount(<TooltipHost content={'prefix'} id="tooltipId" tooltipProps={tooltipProps} />);
    const descriptionText = component.find('#tooltipId').at(0).text();
    expect(descriptionText).toEqual('prefix suffix');
  });
});
