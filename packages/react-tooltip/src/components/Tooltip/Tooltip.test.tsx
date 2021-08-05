import * as React from 'react';
import { Tooltip } from './Tooltip';
import { isConformant } from '../../common/isConformant';
import { render } from '@testing-library/react';

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

  it('renders only aria-label for a simple label tooltip', () => {
    const tooltipText = 'The tooltip text';
    const result = render(
      <Tooltip content={tooltipText}>
        <button data-testid="the-target" />
      </Tooltip>,
    );

    const target = result.getByTestId('the-target');
    expect(target.getAttribute('aria-label')).toBe(tooltipText);

    expect(result.baseElement).toMatchSnapshot();
  });

  it('renders the content of a nontrivial tooltip', () => {
    const result = render(
      <Tooltip
        id="the-tooltip-id"
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

    const tooltip = result.getByTestId('the-tooltip');
    const target = result.getByTestId('the-target');
    expect(tooltip.id).toBe('the-tooltip-id');
    expect(target.getAttribute('aria-labelledby')).toBe('the-tooltip-id');

    expect(result.baseElement).toMatchSnapshot();
  });

  it('renders a description tooltip content always', () => {
    const result = render(
      <Tooltip content="Description tooltip" triggerAriaAttribute="describedby" data-testid="the-tooltip">
        <button data-testid="the-target" />
      </Tooltip>,
    );

    const tooltip = result.getByTestId('the-tooltip');
    const target = result.getByTestId('the-target');
    expect(target.getAttribute('aria-describedby')).toBe(tooltip.id);

    expect(result.baseElement).toMatchSnapshot();
  });
});
