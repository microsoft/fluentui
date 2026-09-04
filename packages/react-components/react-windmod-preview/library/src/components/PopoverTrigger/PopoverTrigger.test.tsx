import * as React from 'react';
import { render } from '@testing-library/react';

import { isConformant } from '../../testing/isConformant';
import { Popover } from '../Popover/Popover';
import { PopoverSurface } from '../PopoverSurface/PopoverSurface';
import { PopoverTrigger } from './PopoverTrigger';
import { popoverTriggerClassNames, usePopoverTriggerStyles } from './usePopoverTriggerStyles';

const renderTrigger = (child: React.ReactElement = <button>Trigger</button>) => {
  const result = render(
    <Popover defaultOpen>
      <PopoverTrigger>{child}</PopoverTrigger>
      <PopoverSurface>Content</PopoverSurface>
    </Popover>,
  );

  return { ...result, trigger: result.container.firstElementChild as HTMLElement };
};

describe('PopoverTrigger', () => {
  isConformant({
    Component: PopoverTrigger,
    displayName: 'PopoverTrigger',
    requiredProps: { children: <button>Trigger</button> } as never,
    // PopoverTrigger renders the consumer's own element, so there is no root of its own to take a
    // ref, and it accepts no className prop.
    disabledTests: ['component-handles-ref', 'component-has-root-ref', 'component-handles-classname'],
  });

  it('stamps the marker pair on the cloned child', () => {
    const { trigger } = renderTrigger();

    expect(trigger.tagName).toBe('BUTTON');
    expect(trigger).toHaveClass('fui-popover-trigger');
    expect(trigger).toHaveClass('group/fui-popover-trigger');
    expect(trigger.classList[0]).toBe('fui-popover-trigger');
    expect(popoverTriggerClassNames.root).toBe('fui-popover-trigger group/fui-popover-trigger');
  });

  it('keeps the child className beside the marker pair, exactly once', () => {
    const { trigger } = renderTrigger(<button className="consumer">Trigger</button>);

    expect(
      trigger
        .getAttribute('class')!
        .split(/\s+/)
        .filter(name => name === 'consumer'),
    ).toHaveLength(1);
    expect(trigger).toHaveClass('fui-popover-trigger');
  });

  it('leaves the headless aria wiring intact', () => {
    const { trigger } = renderTrigger();

    expect(trigger.getAttribute('aria-expanded')).toBe('true');
    expect(trigger.getAttribute('aria-haspopup')).toBe('true');
    expect(trigger.getAttribute('aria-details')).toMatch(/^fui-popover-surface-/);
    expect(trigger.getAttribute('data-open')).toBe('');
  });

  it('returns new state without mutating what it was given', () => {
    const children = <button className="given">Trigger</button>;
    const state = Object.freeze({ children });

    const next = usePopoverTriggerStyles(state);

    expect(next).not.toBe(state);
    expect(next.children).not.toBe(children);
    expect((children.props as { className: string }).className).toBe('given');
  });

  it('leaves an empty trigger alone', () => {
    const state = Object.freeze({ children: null });

    expect(usePopoverTriggerStyles(state)).toBe(state);
  });
});
