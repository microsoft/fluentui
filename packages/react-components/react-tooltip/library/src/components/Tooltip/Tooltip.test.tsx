import * as React from 'react';
import { Tooltip } from './Tooltip';
import { isConformant } from '../../testing/isConformant';
import type { IsConformantOptions } from '@fluentui/react-conformance';
import type { RenderResult } from '@testing-library/react';
import { act, fireEvent, render, waitFor } from '@testing-library/react';
import { resetIdsForTests } from '@fluentui/react-utilities';

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

  it('remains visible when positioning geometry is unavailable', async () => {
    const onPositioningEnd = jest.fn();
    const result = render(
      <Tooltip content="Tooltip content" relationship="label" visible positioning={{ onPositioningEnd }}>
        <button />
      </Tooltip>,
    );
    const tooltip = getByRoleTooltip(result);

    await waitFor(() => expect(onPositioningEnd).toHaveBeenCalled());

    expect(onPositioningEnd.mock.calls.at(-1)?.[0].detail).toEqual(
      expect.objectContaining({ escaped: false, referenceHidden: false }),
    );
    expect(getComputedStyle(tooltip).visibility).not.toBe('hidden');
  });

  it.each([
    { escaped: false, referenceHidden: false },
    { escaped: true, referenceHidden: false },
    { escaped: false, referenceHidden: true },
    { escaped: true, referenceHidden: true },
  ])('follows reference visibility for positioning flags %o', flags => {
    const onPositioningEnd = jest.fn();
    const result = render(
      <Tooltip content="Tooltip content" relationship="label" visible positioning={{ onPositioningEnd }}>
        <button />
      </Tooltip>,
    );
    const tooltip = getByRoleTooltip(result);

    const positioningEvent = new CustomEvent('fui-positioningend', {
      detail: { placement: 'top', ...flags },
    });
    act(() => tooltip.dispatchEvent(positioningEvent));

    expect(getByRoleTooltip(result)).toBe(tooltip);
    expect(getComputedStyle(tooltip).visibility === 'hidden').toBe(flags.referenceHidden);
    if (flags.referenceHidden) {
      expect(getComputedStyle(tooltip).pointerEvents).toBe('none');
    }
    expect(onPositioningEnd).toHaveBeenCalledTimes(1);
    expect(onPositioningEnd).toHaveBeenLastCalledWith(positioningEvent);

    const visibleEvent = new CustomEvent('fui-positioningend', {
      detail: { placement: 'top', escaped: flags.escaped, referenceHidden: false },
    });
    act(() => tooltip.dispatchEvent(visibleEvent));

    expect(getByRoleTooltip(result)).toBe(tooltip);
    expect(getComputedStyle(tooltip).visibility).not.toBe('hidden');
    expect(onPositioningEnd).toHaveBeenCalledTimes(2);
    expect(onPositioningEnd).toHaveBeenLastCalledWith(visibleEvent);
  });
});
