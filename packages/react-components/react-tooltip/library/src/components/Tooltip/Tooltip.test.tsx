import * as React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { Tooltip } from './Tooltip';
import { isConformant } from '../../testing/isConformant';
import type { IsConformantOptions } from '@fluentui/react-conformance';
import type { RenderResult } from '@testing-library/react';
import { act, fireEvent, render } from '@testing-library/react';
import { resetIdsForTests, SSRProvider } from '@fluentui/react-utilities';

// testing-library's queryByRole function doesn't look inside portals
function queryByRoleTooltip(result: RenderResult) {
  const tooltips = result.baseElement.querySelectorAll('*[role="tooltip"]');
  if (!tooltips?.length) {
    return null;
  } else {
    expect(tooltips.length).toBe(1);
    return tooltips.item(0) as HTMLElement;
  }
}

// testing-library's getByRole function doesn't look inside portals
function getByRoleTooltip(result: RenderResult) {
  const tooltip = queryByRoleTooltip(result);
  expect(tooltip).not.toBeNull();
  return tooltip!;
}

export const getTooltipElement: IsConformantOptions['getTargetElement'] = (result, attr) => {
  return queryByRoleTooltip(result)!;
};

describe('Tooltip', () => {
  isConformant({
    Component: Tooltip,
    displayName: 'Tooltip',
    requiredProps: { content: 'Example', children: <button />, visible: true },
    getTargetElement: getTooltipElement,
    disabledTests: [
      // Tooltip renders into a Portal, which confuses these tests
      'component-handles-ref',
      'component-has-root-ref',
      'component-handles-classname',
    ],
    testOptions: {
      'consistent-callback-args': {
        legacyCallbacks: ['onVisibleChange'],
      },
      'has-static-classnames': [
        {
          props: {
            secondaryContent: 'Test secondary content',
          },
        },
      ],
    },
  });

  afterEach(() => {
    resetIdsForTests();
  });

  it('renders only aria-label for a simple label tooltip', () => {
    const tooltipText = 'The tooltip text';
    const result = render(
      <Tooltip content={tooltipText} relationship="label">
        <button data-testid="the-target" />
      </Tooltip>,
    );

    const tooltip = queryByRoleTooltip(result);
    const target = result.getByRole('button');
    expect(tooltip).toBeNull();
    expect(target.getAttribute('aria-label')).toBe(tooltipText);
  });

  it('renders the content of a nontrivial label tooltip', () => {
    const result = render(
      <Tooltip
        relationship="label"
        content={{
          children: (
            <span>
              This is a <strong>formatted</strong> tooltip
            </span>
          ),
          id: 'the-tooltip-id',
        }}
      >
        <button />
      </Tooltip>,
    );

    const tooltip = getByRoleTooltip(result);
    const target = result.getByRole('button');
    expect(tooltip.id).toBe('the-tooltip-id');
    expect(target.getAttribute('aria-labelledby')).toBe('the-tooltip-id');
  });

  it('includes secondary content in the accessible label', () => {
    const result = render(
      <Tooltip content="Bold" secondaryContent="Ctrl+B" relationship="label" visible>
        <button />
      </Tooltip>,
    );

    const tooltip = getByRoleTooltip(result);
    const target = result.getByRole('button');
    const secondaryContent = tooltip.querySelector('.fui-Tooltip__secondaryContent');

    expect(tooltip.textContent).toBe('BoldCtrl+B');
    expect(target.getAttribute('aria-label')).toBe('Bold Ctrl+B');
    expect(target.getAttribute('aria-labelledby')).toBeNull();
    expect(secondaryContent?.hasAttribute('aria-hidden')).toBe(false);
  });

  it('includes secondary content in a rich accessible label', () => {
    const result = render(
      <Tooltip content={<span>Bold</span>} secondaryContent="Ctrl+B" relationship="label">
        <button />
      </Tooltip>,
    );

    const tooltip = getByRoleTooltip(result);
    const target = result.getByRole('button');
    const secondaryContent = tooltip.querySelector('.fui-Tooltip__secondaryContent');

    expect(target.getAttribute('aria-labelledby')).toBe(tooltip.id);
    expect(secondaryContent?.hasAttribute('aria-hidden')).toBe(false);
  });

  it('keeps a string label with secondary content when the trigger popup is expanded', () => {
    const result = render(
      <Tooltip content="Bold" secondaryContent="Ctrl+B" relationship="label" visible>
        <button aria-haspopup="menu" aria-expanded="true" />
      </Tooltip>,
    );

    expect(queryByRoleTooltip(result)).toBeNull();
    expect(result.getByRole('button').getAttribute('aria-label')).toBe('Bold Ctrl+B');
  });

  it('keeps a generic secondary content label when the trigger popup is expanded', () => {
    const result = render(
      <Tooltip content="Bold" secondaryContent={<span>Ctrl+B</span>} relationship="label" visible>
        <button aria-haspopup="menu" aria-expanded="true" />
      </Tooltip>,
    );

    const tooltip = getByRoleTooltip(result);
    const target = result.getByRole('button');

    expect(target.getAttribute('aria-label')).toBeNull();
    expect(target.getAttribute('aria-labelledby')).toBe(tooltip.id);
    expect(tooltip.textContent).toBe('BoldCtrl+B');
  });

  it('dismisses internal visibility with Escape while the trigger popup is expanded', () => {
    const onVisibleChange = jest.fn();
    render(
      <Tooltip content="Bold" secondaryContent="Ctrl+B" relationship="label" visible onVisibleChange={onVisibleChange}>
        <button aria-haspopup="menu" aria-expanded="true" />
      </Tooltip>,
    );

    act(() => {
      fireEvent.keyDown(document, { key: 'Escape' });
    });

    expect(onVisibleChange).toHaveBeenCalledWith(undefined, expect.objectContaining({ visible: false }));
  });

  it('keeps the primary string label during SSR with generic secondary content', () => {
    const html = renderToStaticMarkup(
      <SSRProvider>
        <Tooltip content="Bold" secondaryContent={<span>Ctrl+B</span>} relationship="label">
          <button />
        </Tooltip>
      </SSRProvider>,
    );

    expect(html).toContain('aria-label="Bold"');
    expect(html).not.toContain('aria-labelledby');
  });

  it('includes secondary content in the accessible description', () => {
    const result = render(
      <Tooltip content="Bold" secondaryContent="Ctrl+B" relationship="description">
        <button />
      </Tooltip>,
    );

    const tooltip = getByRoleTooltip(result);
    const target = result.getByRole('button');
    const secondaryContent = tooltip.querySelector('.fui-Tooltip__secondaryContent');

    expect(target.getAttribute('aria-describedby')).toBe(tooltip.id);
    expect(secondaryContent?.hasAttribute('aria-hidden')).toBe(false);
  });

  it('renders a description tooltip content always', () => {
    const result = render(
      <Tooltip content="Description tooltip" relationship="description">
        <button />
      </Tooltip>,
    );

    const tooltip = getByRoleTooltip(result);
    const target = result.getByRole('button');
    expect(target.getAttribute('aria-describedby')).toBe(tooltip.id);
  });

  it("doesn't set any aria attributes for relationship='inaccessible'", () => {
    const result = render(
      <Tooltip content="Inaccessible tooltip" relationship="inaccessible">
        <button />
      </Tooltip>,
    );

    const target = result.getByRole('button');
    expect(target.hasAttribute('aria-label')).toBe(false);
    expect(target.hasAttribute('aria-labelledby')).toBe(false);
    expect(target.hasAttribute('aria-description')).toBe(false);
    expect(target.hasAttribute('aria-describedby')).toBe(false);
  });

  it("doesn't override trigger's aria-label", () => {
    const result = render(
      <Tooltip content="Label tooltip" relationship="label">
        <button aria-label="test-label" />
      </Tooltip>,
    );

    const target = result.getByRole('button');
    expect(target.getAttribute('aria-label')).toBe('test-label');
    expect(target.getAttribute('aria-labelledby')).toBe(null);
  });

  it("doesn't override trigger's aria-labelledby", () => {
    const result = render(
      <Tooltip content="Label tooltip" relationship="label">
        <button aria-labelledby="test-labelledby" />
      </Tooltip>,
    );

    const target = result.getByRole('button');
    expect(target.getAttribute('aria-labelledby')).toBe('test-labelledby');
  });

  it("doesn't override trigger's aria-describedby", () => {
    const result = render(
      <Tooltip content="Description tooltip" relationship="description">
        <button aria-describedby="test-describedby" />
      </Tooltip>,
    );

    const target = result.getByRole('button');
    expect(target.getAttribute('aria-description')).toBe(null);
    expect(target.getAttribute('aria-describedby')).toBe('test-describedby');
  });

  it('hides the tooltip when the document becomes hidden (e.g. tab backgrounded on mobile)', () => {
    const onVisibleChange = jest.fn();
    const result = render(
      <Tooltip content="Tooltip content" relationship="label" visible onVisibleChange={onVisibleChange}>
        <button />
      </Tooltip>,
    );

    // Tooltip starts visible
    expect(queryByRoleTooltip(result)).not.toBeNull();

    // Simulate the tab being backgrounded / app switched on mobile
    const visibilityStateSpy = jest.spyOn(document, 'visibilityState', 'get').mockReturnValue('hidden');
    act(() => {
      fireEvent(document, new Event('visibilitychange'));
    });

    expect(onVisibleChange).toHaveBeenCalledWith(undefined, expect.objectContaining({ visible: false }));

    visibilityStateSpy.mockRestore();
  });

  it.each([
    { escaped: true, referenceHidden: false },
    { escaped: false, referenceHidden: true },
  ])('hides and restores the tooltip based on positioning visibility flags', flags => {
    const onPositioningEnd = jest.fn();
    const result = render(
      <Tooltip content="Tooltip content" relationship="label" visible positioning={{ onPositioningEnd }}>
        <button />
      </Tooltip>,
    );
    const tooltip = getByRoleTooltip(result);

    const hiddenEvent = new CustomEvent('fui-positioningend', {
      detail: { placement: 'top', ...flags },
    });
    act(() => tooltip.dispatchEvent(hiddenEvent));

    expect(getByRoleTooltip(result)).toBe(tooltip);
    expect(getComputedStyle(tooltip).visibility).toBe('hidden');
    expect(getComputedStyle(tooltip).pointerEvents).toBe('none');
    expect(onPositioningEnd).toHaveBeenCalledWith(hiddenEvent);

    const visibleEvent = new CustomEvent('fui-positioningend', {
      detail: { placement: 'top', escaped: false, referenceHidden: false },
    });
    act(() => tooltip.dispatchEvent(visibleEvent));

    expect(getByRoleTooltip(result)).toBe(tooltip);
    expect(getComputedStyle(tooltip).visibility).not.toBe('hidden');
    expect(onPositioningEnd).toHaveBeenCalledWith(visibleEvent);
  });
});
