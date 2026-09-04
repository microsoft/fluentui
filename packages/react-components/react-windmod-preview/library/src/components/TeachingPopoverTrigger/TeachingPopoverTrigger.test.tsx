import * as React from 'react';
import { render } from '@testing-library/react';

import { isConformant } from '../../testing/isConformant';
import { TeachingPopover } from '../TeachingPopover/TeachingPopover';
import { TeachingPopoverSurface } from '../TeachingPopoverSurface/TeachingPopoverSurface';
import { TeachingPopoverTrigger } from './TeachingPopoverTrigger';
import { teachingPopoverTriggerClassNames, useTeachingPopoverTriggerStyles } from './useTeachingPopoverTriggerStyles';

const renderTrigger = (child: React.ReactElement = <button>Trigger</button>) => {
  const result = render(
    <TeachingPopover defaultOpen>
      <TeachingPopoverTrigger>{child}</TeachingPopoverTrigger>
      <TeachingPopoverSurface>Content</TeachingPopoverSurface>
    </TeachingPopover>,
  );

  return { ...result, trigger: result.getByRole('button') };
};

describe('TeachingPopoverTrigger', () => {
  isConformant({
    Component: TeachingPopoverTrigger,
    displayName: 'TeachingPopoverTrigger',
    requiredProps: { children: <button /> } as never,
    // The trigger renders the consumer's own element, so there is no root of its own to take a
    // ref or native props, and its only class contribution is the marker pair.
    disabledTests: ['component-handles-ref', 'component-has-root-ref', 'component-handles-classname'],
  });

  it('stamps the marker pair on the cloned child, in order', () => {
    const { trigger } = renderTrigger();
    const names = trigger.getAttribute('class')!.split(/\s+/);

    expect(names[0]).toBe('fui-teaching-popover-trigger');
    expect(names[1]).toBe('group/fui-teaching-popover-trigger');
    expect(teachingPopoverTriggerClassNames.root).toBe(
      'fui-teaching-popover-trigger group/fui-teaching-popover-trigger',
    );
  });

  it('MERGES the child className rather than replacing it', () => {
    const { trigger } = renderTrigger(<button className="own">Trigger</button>);

    expect(trigger).toHaveClass('own');
    expect(trigger).toHaveClass('fui-teaching-popover-trigger');
  });

  it('keeps the headless aria wiring', () => {
    const { trigger, container } = renderTrigger();
    const surface = container.querySelector('[data-popover-surface]')!;

    expect(trigger.getAttribute('aria-expanded')).toBe('true');
    expect(trigger.getAttribute('aria-details')).toBe(surface.id);
  });

  it('returns new state without mutating what it was given', () => {
    const children = <button className="own" />;
    const state = Object.freeze({ children }) as never;

    const next = useTeachingPopoverTriggerStyles(state);

    expect(next).not.toBe(state);
    expect(next.children).not.toBe(children);
  });
});
