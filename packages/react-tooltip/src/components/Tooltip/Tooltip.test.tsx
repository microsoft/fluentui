import * as React from 'react';
import { Tooltip } from './Tooltip';
import { isConformant } from '../../common/isConformant';
import { render, RenderResult } from '@testing-library/react';

describe('Tooltip', () => {
  isConformant({
    Component: Tooltip,
    displayName: 'Tooltip',
    requiredProps: { content: 'Example', children: <button /> },
    disabledTests: [
      // Tooltip renders into a Portal, which confuses these tests
      'component-handles-ref',
      'component-has-root-ref',
      'component-handles-classname',
      'as-renders-fc',
      'as-passes-as-value',
      'as-renders-html',
    ],
  });

  let wrapper: RenderResult | undefined;

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount();
      wrapper = undefined;
    }
  });

  it('renders only aria-label for a simple label tooltip', () => {
    const tooltipText = 'The tooltip text';
    wrapper = render(
      <Tooltip content={tooltipText}>
        <button data-testid="the-target" />
      </Tooltip>,
    );

    const target = wrapper.getByTestId('the-target');
    expect(target.getAttribute('aria-label')).toBe(tooltipText);

    expect(wrapper.baseElement).toMatchSnapshot();
  });

  it('renders the content of a nontrivial tooltip', () => {
    const tooltipId = 'the-tooltip-id';
    wrapper = render(
      <Tooltip
        id={tooltipId}
        data-testid="the-tooltip"
        content={
          <span>
            This is a <strong>formatted</strong> tooltip
          </span>
        }
      >
        <button data-testid="the-target" />
      </Tooltip>,
    );

    const tooltip = wrapper.getByTestId('the-tooltip');
    const target = wrapper.getByTestId('the-target');
    expect(tooltip.id).toBe(tooltipId);
    expect(target.getAttribute('aria-labelledby')).toBe(tooltipId);

    expect(wrapper.baseElement).toMatchSnapshot();
  });

  it('renders a description tooltip content always', () => {
    wrapper = render(
      <Tooltip content="Description tooltip" type="description" data-testid="the-tooltip">
        <button data-testid="the-target" />
      </Tooltip>,
    );

    const tooltip = wrapper.getByTestId('the-tooltip');
    const target = wrapper.getByTestId('the-target');
    expect(target.getAttribute('aria-describedby')).toBe(tooltip.id);

    expect(wrapper.baseElement).toMatchSnapshot();
  });
});
