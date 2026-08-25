import * as React from 'react';
import { render } from '@testing-library/react';
import type { PositioningProps } from '@fluentui/react-headless-components-preview/positioning';

import { isConformant } from '../../testing/isConformant';
import { PopoverSurface } from '../PopoverSurface/PopoverSurface';
import surfaceStyles from '../PopoverSurface/PopoverSurface.module.css';
import { PopoverTrigger } from '../PopoverTrigger/PopoverTrigger';
import type { PopoverProps } from './Popover.types';
import { Popover } from './Popover';

// Frozen-state guard: freezes the headless hook's return so any in-place write anywhere in the
// pipeline throws instead of succeeding silently — see testing/freezeState.ts. The same mock
// records what Popover hands the headless hook, which is where the arrow-offset merge lands.
jest.mock('@fluentui/react-headless-components-preview/popover', () => {
  const actual = jest.requireActual('@fluentui/react-headless-components-preview/popover');
  const { deepFreezeState } = require('../../testing/freezeState');

  return {
    ...actual,
    usePopover: (...args: Parameters<typeof actual.usePopover>) => {
      hookProps.push(args[0] as HeadlessPopoverProps);

      return deepFreezeState(actual.usePopover(...args));
    },
  };
});

type HeadlessPopoverProps = { withArrow?: boolean; positioning?: PositioningProps };
const hookProps: HeadlessPopoverProps[] = [];

beforeEach(() => {
  hookProps.length = 0;
});

const renderPopover = (props: Partial<PopoverProps> = {}) => {
  const result = render(
    <Popover defaultOpen {...props}>
      <PopoverTrigger>
        <button>Trigger</button>
      </PopoverTrigger>
      <PopoverSurface>Content</PopoverSurface>
    </Popover>,
  );

  return { ...result, surface: result.container.querySelector<HTMLElement>('[data-popover-surface]')! };
};

/** What Popover handed the headless hook on its first render. */
const handedOver = () => hookProps[0];

describe('Popover', () => {
  isConformant({
    Component: Popover,
    displayName: 'Popover',
    requiredProps: { children: <PopoverSurface>Content</PopoverSurface> } as never,
    // Popover renders no element of its own, so there is no root to take a ref, a className or
    // native props.
    disabledTests: ['component-handles-ref', 'component-has-root-ref', 'component-handles-classname'],
  });

  it('renders the trigger and the surface, and no element of its own', () => {
    const { container, getByRole, surface } = renderPopover();

    expect(getByRole('button')).toHaveTextContent('Trigger');
    expect(surface).toHaveTextContent('Content');
    expect(container.children).toHaveLength(2);
  });

  it('carries the look to a surface rendered as a separate child', () => {
    expect(renderPopover({ size: 'large' }).surface).toHaveClass(surfaceStyles.large);
    expect(renderPopover({ appearance: 'brand' }).surface).toHaveClass(surfaceStyles.brand);
    expect(renderPopover({ appearance: 'inverted' }).surface).toHaveClass(surfaceStyles.inverted);
  });

  it('merges the arrow height into the offset, per size', () => {
    renderPopover({ withArrow: true, size: 'small' });
    expect(handedOver().positioning!.offset).toBe(6);

    hookProps.length = 0;
    renderPopover({ withArrow: true });
    expect(handedOver().positioning!.offset).toBe(8);

    hookProps.length = 0;
    renderPopover({ withArrow: true, size: 'large' });
    expect(handedOver().positioning!.offset).toBe(8);
  });

  it('leaves the offset alone without an arrow', () => {
    renderPopover();
    expect(handedOver().positioning!.offset).toBeUndefined();

    hookProps.length = 0;
    renderPopover({ positioning: { offset: 10 } });
    expect(handedOver().positioning!.offset).toBe(10);
  });

  it('adds the arrow height to a numeric consumer offset and honours every other form', () => {
    renderPopover({ withArrow: true, positioning: { offset: 10 } });
    expect(handedOver().positioning!.offset).toBe(18);

    hookProps.length = 0;
    renderPopover({ withArrow: true, positioning: { offset: { mainAxis: 10, crossAxis: 4 } } });
    expect(handedOver().positioning!.offset).toEqual({ mainAxis: 10, crossAxis: 4 });
  });

  it('drops the arrow when the surface covers its target', () => {
    renderPopover({ withArrow: true, positioning: { coverTarget: true } });

    expect(handedOver().withArrow).toBe(false);
    expect(handedOver().positioning!.offset).toBeUndefined();
  });

  it('resolves a positioning shorthand before handing it over', () => {
    renderPopover({ withArrow: true, positioning: 'below-end' });

    expect(handedOver().positioning).toMatchObject({ position: 'below', align: 'end', offset: 8 });
  });

  it('passes everything else through to the headless hook untouched', () => {
    const onOpenChange = jest.fn();
    renderPopover({ onOpenChange, openOnHover: true, trapFocus: true, mouseLeaveDelay: 42, id: 'given' });

    expect(handedOver()).toMatchObject({
      onOpenChange,
      openOnHover: true,
      trapFocus: true,
      mouseLeaveDelay: 42,
      id: 'given',
    });
    expect(handedOver()).not.toHaveProperty('size');
    expect(handedOver()).not.toHaveProperty('appearance');
  });
});
