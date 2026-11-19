import * as React from 'react';
import { render, screen } from '@testing-library/react';

import { classOccurrences } from '../../testing/classOccurrences';
import { isConformant } from '../../testing/isConformant';
import { Tooltip } from './Tooltip';
import type { TooltipProps, TooltipState } from './Tooltip.types';
import { tooltipClassNames, useTooltipStyles } from './useTooltipStyles';

import styles from './Tooltip.module.css';

// Frozen-state guard — see testing/freezeState.ts.
jest.mock('@fluentui/react-headless-components-preview/tooltip', () => {
  const actual = jest.requireActual('@fluentui/react-headless-components-preview/tooltip');
  const { deepFreezeState } = require('../../testing/freezeState');

  return {
    ...actual,
    useTooltip: (...args: Parameters<typeof actual.useTooltip>) => deepFreezeState(actual.useTooltip(...args)),
  };
});

const renderTooltip = (props: Partial<TooltipProps> = {}) => {
  const result = render(
    <Tooltip content="Example tooltip" relationship="label" visible {...props}>
      <button>Trigger</button>
    </Tooltip>,
  );

  // Every render leaves its tooltip mounted, so the content is scoped to this render's container.
  return { ...result, content: result.container.querySelector<HTMLElement>('[role="tooltip"]')! };
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
    getTargetElement: () => screen.queryByRole('tooltip') as HTMLElement,
    // Tooltip wraps its trigger and renders no root element of its own, so there is nothing to
    // take a ref or a className prop.
    disabledTests: ['component-handles-ref', 'component-has-root-ref', 'component-handles-classname'],
    testOptions: {
      'consistent-callback-args': {
        legacyCallbacks: ['onVisibleChange'],
      },
    },
  });

  it('stamps its marker pair, slash-free class first', () => {
    const { content } = renderTooltip();

    expect(content).toHaveClass('fui-tooltip');
    expect(content).toHaveClass('group/fui-tooltip');
    expect(content.classList[0]).toBe('fui-tooltip');
    expect(tooltipClassNames.root).toBe('fui-tooltip group/fui-tooltip');
  });

  it('carries the content module class exactly once', () => {
    const { content } = renderTooltip();

    expect(classOccurrences(content, styles.content)).toBe(1);
  });

  it('keeps a consumer className on the content slot exactly once', () => {
    const { content } = renderTooltip({ content: { children: 'Example tooltip', className: 'consumer' } });

    expect(content).toHaveClass('consumer');
    expect(classOccurrences(content, 'consumer')).toBe(1);
    expect(classOccurrences(content, styles.content)).toBe(1);
  });

  it('leaves the headless stamps to the headless hook', () => {
    const { content } = renderTooltip();

    expect(content).toHaveAttribute('popover', 'hint');
    expect(content).toHaveAttribute('data-open');
  });

  it('applies the inverted surface only for appearance="inverted"', () => {
    expect(renderTooltip().content).not.toHaveClass(styles.inverted);

    const { content } = renderTooltip({ appearance: 'inverted' });

    expect(content).toHaveClass(styles.inverted);
  });

  it('does not mutate the state it is given', () => {
    const state = {
      appearance: 'inverted',
      arrowClassName: 'consumer-arrow',
      components: { content: 'div' },
      content: { className: 'consumer' },
    } as unknown as TooltipState;

    const styled = useTooltipStyles(state);

    expect(styled).not.toBe(state);
    expect(state.arrowClassName).toBe('consumer-arrow');
    expect(state.content.className).toBe('consumer');
    expect(styled.content.className).toContain('consumer');
    expect(styled.content.className).toContain(tooltipClassNames.root);
    expect(styled.content.className).toContain(styles.inverted);
    expect(styled.arrowClassName).toContain('consumer-arrow');
    expect(styled.arrowClassName).toContain(styles.arrow);
  });

  it('leaves the arrow class off no state, and the inverted class off the base appearance', () => {
    const state = {
      appearance: 'normal',
      components: { content: 'div' },
      content: {},
    } as unknown as TooltipState;

    const styled = useTooltipStyles(state);

    expect(styled.arrowClassName).toContain(styles.arrow);
    expect(styled.content.className).toContain(tooltipClassNames.root);
    expect(styled.content.className).not.toContain(styles.inverted);
  });
});
