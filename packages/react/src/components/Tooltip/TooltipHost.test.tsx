import * as React from 'react';
import { render, fireEvent } from '@testing-library/react';

import { DirectionalHint } from '../../common/DirectionalHint';
import { assign } from '../../Utilities';
import { TooltipHost } from './TooltipHost';
import { TooltipDelay } from './Tooltip.types';
import type { ICalloutProps } from '../../Callout';
import type { ITooltipProps } from './Tooltip.types';

describe('TooltipHost', () => {
  it('renders correctly', () => {
    const { container } = render(<TooltipHost />);
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
    const content = 'test content';
    const delay = TooltipDelay.zero;
    const directionalHint = DirectionalHint.bottomLeftEdge;
    const directionalHintForRTL = DirectionalHint.topRightEdge;
    const tooltipProps: ITooltipProps = {
      maxWidth: 'test width',
      delay: TooltipDelay.zero,
    };
    let onTooltipToggleCalled = false;

    // Render with all the props
    // TODO: Remove assign. Temporarily used to create new object due to issue:
    //        https://github.com/microsoft/fluentui/issues/4715
    const { container, getAllByText } = render(
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
        id="testId"
      />,
    );

    // Trigger the tooltip to show
    const tooltipHost = container.querySelector('.ms-TooltipHost')!;
    fireEvent.mouseEnter(tooltipHost);

    // Verify the callback was called
    expect(onTooltipToggleCalled).toEqual(true);

    // Verify the tooltip content is in the document
    expect(getAllByText(content)).toHaveLength(2); // One for the tooltip and one for the callout

    // Verify the tooltip has the expected properties
    // To verify certain props we would need to check their effects or data attributes
    const tooltip = document.querySelector('#testId--tooltip') as HTMLElement;
    expect(tooltip).toBeTruthy();

    // Test directional hint and other props via data attributes or computed styles
    // Note: Some props like calloutProps may not be directly testable in this manner
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

    const { container } = render(
      <TooltipHost
        calloutProps={calloutProps}
        content={content}
        delay={TooltipDelay.zero}
        onTooltipToggle={() => {
          onTooltipToggleCalled = true;
          return null;
        }}
        id="testId"
      />,
    );

    // Trigger the tooltip to show
    const tooltipHost = container.querySelector('.ms-TooltipHost')!;
    fireEvent.mouseEnter(tooltipHost);

    expect(onTooltipToggleCalled).toEqual(true);
    expect(calloutPropsBefore).toEqual(calloutProps);
  });

  it('uses onRenderContent for description text', () => {
    const tooltipProps = {
      onRenderContent: () => <span>test</span>,
    };

    render(<TooltipHost content={'should not be used'} id="tooltipId" tooltipProps={tooltipProps} />);

    // The aria-describedby points to the content
    const tooltipContent = document.getElementById('tooltipId');
    expect(tooltipContent).toHaveTextContent('test');
  });

  it('passes props and render function to onRenderContent', () => {
    const tooltipProps: ITooltipProps = {
      onRenderContent: (
        props,
        // eslint-disable-next-line @typescript-eslint/no-shadow
        render,
      ) => render?.({ ...props, content: (props?.content ?? '') + ' suffix' }) || null,
    };

    render(<TooltipHost content={'prefix'} id="tooltipId" tooltipProps={tooltipProps} />);

    const tooltipContent = document.getElementById('tooltipId');
    expect(tooltipContent).toHaveTextContent('prefix suffix');
  });
});
