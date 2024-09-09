import * as React from 'react';
import { resolveShorthand } from './resolveShorthand';
import type { Slot } from '../types';

type TestProps = {
  slotA?: Slot<'div'>;
  slotB?: Slot<'div'>;
  slotC?: Slot<'div'>;
  notASlot?: string;
  alsoNotASlot?: number;
};

describe('resolveShorthand', () => {
  it('resolves a string', () => {
    const props: TestProps = { slotA: 'hello' };
    // eslint-disable-next-line deprecation/deprecation
    const resolvedProps = resolveShorthand(props.slotA);

    expect(resolvedProps).toEqual({
      children: 'hello',
    });
  });

  it('resolves a JSX element', () => {
    const props: TestProps = { slotA: <div>hello</div> };
    // eslint-disable-next-line deprecation/deprecation
    const resolvedProps = resolveShorthand(props.slotA);

    expect(resolvedProps).toEqual({
      children: <div>hello</div>,
    });
  });

  it('resolves a number', () => {
    const props: TestProps = { slotA: 42 };
    // eslint-disable-next-line deprecation/deprecation
    const resolvedProps = resolveShorthand(props.slotA);

    expect(resolvedProps).toEqual({
      children: 42,
    });
  });

  it('resolves an object as its copy', () => {
    const slotA = {};
    const props: TestProps = { slotA };
    // eslint-disable-next-line deprecation/deprecation
    const resolvedProps = resolveShorthand(props.slotA);

    expect(resolvedProps).toEqual({});
    expect(resolvedProps).not.toBe(slotA);
  });

  it('resolves "null" without creating a child element', () => {
    const props: TestProps = { slotA: null, slotB: null };

    // eslint-disable-next-line deprecation/deprecation
    expect(resolveShorthand(props.slotA)).toEqual(undefined);
    // eslint-disable-next-line deprecation/deprecation
    expect(resolveShorthand(null, { required: true })).toEqual(undefined);
  });

  it('resolves undefined without creating a child element', () => {
    const props: TestProps = { slotA: undefined };
    // eslint-disable-next-line deprecation/deprecation
    const resolvedProps = resolveShorthand(props.slotA);

    expect(resolvedProps).toEqual(undefined);
  });

  it('resolves to empty object creating a child element', () => {
    const props: TestProps = { slotA: undefined };
    // eslint-disable-next-line deprecation/deprecation
    const resolvedProps = resolveShorthand(props.slotA, { required: true });

    expect(resolvedProps).toEqual({});
  });
});
