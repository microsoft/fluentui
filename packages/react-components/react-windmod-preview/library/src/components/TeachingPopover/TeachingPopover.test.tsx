import * as React from 'react';
import { render } from '@testing-library/react';
import type { PositioningProps } from '@fluentui/react-headless-components-preview/positioning';

import { isConformant } from '../../testing/isConformant';
import { TeachingPopoverHeader } from '../TeachingPopoverHeader/TeachingPopoverHeader';
import { TeachingPopoverSurface } from '../TeachingPopoverSurface/TeachingPopoverSurface';
import { TeachingPopoverTrigger } from '../TeachingPopoverTrigger/TeachingPopoverTrigger';
import type { TeachingPopoverProps } from './TeachingPopover.types';
import { TeachingPopover } from './TeachingPopover';

import headerStyles from '../TeachingPopoverHeader/TeachingPopoverHeader.module.css';
import popoverSurfaceStyles from '../PopoverSurface/PopoverSurface.module.css';

// Frozen-state guard — see testing/freezeState.ts. The same mock records what TeachingPopover
// hands the headless hook, which is where the arrow-offset merge lands.
jest.mock('@fluentui/react-headless-components-preview/teaching-popover', () => {
  const actual = jest.requireActual('@fluentui/react-headless-components-preview/teaching-popover');
  const { deepFreezeState } = require('../../testing/freezeState');

  return {
    ...actual,
    useTeachingPopover: (...args: Parameters<typeof actual.useTeachingPopover>) => {
      hookProps.push(args[0] as HeadlessProps);

      return deepFreezeState(actual.useTeachingPopover(...args));
    },
  };
});

type HeadlessProps = { withArrow?: boolean; positioning?: PositioningProps };
const hookProps: HeadlessProps[] = [];

beforeEach(() => {
  hookProps.length = 0;
});

const renderPopover = (props: Partial<TeachingPopoverProps> = {}, children?: React.ReactNode) => {
  const result = render(
    <TeachingPopover defaultOpen {...props}>
      <TeachingPopoverTrigger>
        <button>Trigger</button>
      </TeachingPopoverTrigger>
      <TeachingPopoverSurface>{children ?? 'Content'}</TeachingPopoverSurface>
    </TeachingPopover>,
  );

  return { ...result, surface: result.container.querySelector<HTMLElement>('[data-popover-surface]')! };
};

/** What TeachingPopover handed the headless hook on its first render. */
const handedOver = () => hookProps[0];

describe('TeachingPopover', () => {
  isConformant({
    Component: TeachingPopover,
    displayName: 'TeachingPopover',
    requiredProps: { children: <TeachingPopoverSurface>Content</TeachingPopoverSurface> } as never,
    // The root renders no element of its own — it is a pair of providers around the trigger and
    // the surface — so there is no root to take a ref, a className or native props.
    disabledTests: ['component-handles-ref', 'component-has-root-ref', 'component-handles-classname'],
  });

  it('renders the trigger and the surface, and no element of its own', () => {
    const { container, getByRole, surface } = renderPopover();

    expect(getByRole('button')).toHaveTextContent('Trigger');
    expect(surface).toHaveTextContent('Content');
    expect(container.children).toHaveLength(2);
  });

  it('defaults withArrow to TRUE, and a consumer false still wins', () => {
    expect(renderPopover().surface.querySelector('[data-arrow]')).not.toBeNull();
    expect(handedOver().withArrow).toBe(true);

    hookProps.length = 0;
    expect(renderPopover({ withArrow: false }).surface.querySelector('[data-arrow]')).toBeNull();
    expect(handedOver().withArrow).toBe(false);
  });

  it('leaves the offset alone for an arrow that is on by DEFAULT', () => {
    // Griffel resolves the positioning before defaulting the arrow on, so a defaulted arrow gets
    // no offset of its own. Reproduced deliberately: an unconditional merge puts every surface
    // 8px too far from its trigger.
    renderPopover();
    expect(handedOver().withArrow).toBe(true);
    expect(handedOver().positioning!.offset).toBeUndefined();

    hookProps.length = 0;
    renderPopover({ positioning: { offset: 10 } });
    expect(handedOver().positioning!.offset).toBe(10);
  });

  it('merges the arrow height into the offset for an EXPLICIT arrow, per size', () => {
    renderPopover({ withArrow: true, size: 'small' });
    expect(handedOver().positioning!.offset).toBe(6);

    hookProps.length = 0;
    renderPopover({ withArrow: true });
    expect(handedOver().positioning!.offset).toBe(8);

    hookProps.length = 0;
    renderPopover({ withArrow: true, size: 'large' });
    expect(handedOver().positioning!.offset).toBe(8);

    hookProps.length = 0;
    renderPopover({ withArrow: true, positioning: { offset: 10 } });
    expect(handedOver().positioning!.offset).toBe(18);

    hookProps.length = 0;
    renderPopover({ withArrow: false });
    expect(handedOver().positioning!.offset).toBeUndefined();
  });

  it('keeps a covered-target arrow but drops its offset, as Griffel does', () => {
    renderPopover({ withArrow: true, positioning: { coverTarget: true } });

    // Griffel suppresses the arrow inside usePopover and the teaching hook turns it back on, so
    // only the offset is actually dropped.
    expect(handedOver().withArrow).toBe(true);
    expect(handedOver().positioning!.offset).toBeUndefined();
  });

  it('carries the look to parts rendered as separate children', () => {
    expect(renderPopover({ size: 'large' }).surface).toHaveClass(popoverSurfaceStyles.large);

    const brand = renderPopover({ appearance: 'brand' }, <TeachingPopoverHeader>Header</TeachingPopoverHeader>);

    expect(brand.surface).toHaveClass(popoverSurfaceStyles.brand);
    expect(brand.surface.querySelector(`.${CSS.escape(headerStyles.brand)}`)).not.toBeNull();

    const neutral = renderPopover({}, <TeachingPopoverHeader>Header</TeachingPopoverHeader>);

    expect(neutral.surface.querySelector(`.${CSS.escape(headerStyles.brand)}`)).toBeNull();
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
