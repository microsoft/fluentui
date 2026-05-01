import * as React from 'react';
import { render } from '@testing-library/react';
import { resetIdsForTests } from '@fluentui/react-utilities';
import { isConformant } from '../../testing/isConformant';
import type { IsConformantOptions } from '@fluentui/react-conformance';
import type { RenderResult } from '@testing-library/react';
import { Tooltip } from './Tooltip';

function queryByRoleTooltip(result: RenderResult) {
  const tooltips = result.baseElement.querySelectorAll('*[role="tooltip"]');
  if (!tooltips?.length) {
    return null;
  } else {
    expect(tooltips.length).toBe(1);
    return tooltips.item(0) as HTMLElement;
  }
}

function getByRoleTooltip(result: RenderResult) {
  const tooltip = queryByRoleTooltip(result);
  expect(tooltip).not.toBeNull();
  return tooltip!;
}

export const getTooltipElement: IsConformantOptions['getTargetElement'] = result => {
  return queryByRoleTooltip(result)!;
};

describe('Tooltip', () => {
  isConformant({
    Component: Tooltip,
    displayName: 'Tooltip',
    requiredProps: {
      content: 'Example tooltip',
      relationship: 'label',
      children: <button aria-label="trigger" />,
      visible: true,
    },
    getTargetElement: getTooltipElement,
    disabledTests: [
      // Tooltip is a wrapper with no root DOM element — ref/className tests don't apply
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

  it('renders trigger and tooltip content with correct positioning attributes', async () => {
    const result = render(
      <Tooltip
        content="Default Tooltip"
        relationship="label"
        visible
        positioning={{ position: 'above', align: 'center' }}
      >
        <button>Trigger</button>
      </Tooltip>,
    );

    const trigger = result.getByRole('button');
    const tooltip = getByRoleTooltip(result);

    // Trigger gets aria-label from label relationship.
    expect(trigger).toHaveAttribute('aria-label', 'Default Tooltip');

    // Content renders with popover API attribute.
    expect(tooltip).toHaveAttribute('popover', 'manual');
  });

  it('renders only aria-label for a simple label tooltip', () => {
    const tooltipText = 'The tooltip text';
    const result = render(
      <Tooltip content={tooltipText} relationship="label">
        <button data-testid="the-target">Trigger</button>
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
        <button>Trigger</button>
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
        <button>Trigger</button>
      </Tooltip>,
    );

    const tooltip = getByRoleTooltip(result);
    const target = result.getByRole('button');
    expect(target.getAttribute('aria-describedby')).toBe(tooltip.id);
  });

  it('renders arrow element when withArrow is true', () => {
    const result = render(
      <Tooltip content="Arrow tooltip" relationship="label" visible withArrow>
        <button>Trigger</button>
      </Tooltip>,
    );

    const tooltip = getByRoleTooltip(result);
    expect(tooltip.querySelector('[data-arrow]')).not.toBeNull();
  });

  it('does not render arrow element when withArrow is false', () => {
    const result = render(
      <Tooltip content="No arrow tooltip" relationship="label" visible>
        <button>Trigger</button>
      </Tooltip>,
    );

    const tooltip = getByRoleTooltip(result);
    expect(tooltip.querySelector('[data-arrow]')).toBeNull();
  });

  it("doesn't set any aria attributes for relationship='inaccessible'", () => {
    const result = render(
      <Tooltip content="Inaccessible tooltip" relationship="inaccessible">
        <button>Trigger</button>
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
        <button aria-labelledby="test-labelledby">Trigger</button>
      </Tooltip>,
    );

    const target = result.getByRole('button');
    expect(target.getAttribute('aria-labelledby')).toBe('test-labelledby');
  });

  it("doesn't override trigger's aria-describedby", () => {
    const result = render(
      <Tooltip content="Description tooltip" relationship="description">
        <button aria-describedby="test-describedby">Trigger</button>
      </Tooltip>,
    );

    const target = result.getByRole('button');
    expect(target.getAttribute('aria-description')).toBe(null);
    expect(target.getAttribute('aria-describedby')).toBe('test-describedby');
  });
});
