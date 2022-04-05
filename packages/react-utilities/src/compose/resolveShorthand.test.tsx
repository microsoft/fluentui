import * as React from 'react';
import { resolveShorthand } from './resolveShorthand';
import type { Slot } from './types';

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
    const resolvedProps = resolveShorthand(props.slotA);

    expect(resolvedProps).toEqual({ children: 'hello' });
  });

  it('resolves a JSX element', () => {
    const props: TestProps = { slotA: <div>hello</div> };
    const resolvedProps = resolveShorthand(props.slotA);

    expect(resolvedProps).toEqual({ children: <div>hello</div> });
  });

  it('resolves a number', () => {
    const props: TestProps = { slotA: 42 };
    const resolvedProps = resolveShorthand(props.slotA);

    expect(resolvedProps).toEqual({ children: 42 });
  });

  it('resolves "null" without creating a child element', () => {
    const props: TestProps = { slotA: null, slotB: null };

    expect(resolveShorthand(props.slotA)).toEqual(undefined);
    expect(resolveShorthand(null, { required: true })).toEqual(undefined);
  });

  it('resolves undefined without creating a child element', () => {
    const props: TestProps = { slotA: undefined };
    const resolvedProps = resolveShorthand(props.slotA);

    expect(resolvedProps).toEqual(undefined);
  });

  it('resolves to empty object creating a child element', () => {
    const props: TestProps = { slotA: undefined };
    const resolvedProps = resolveShorthand(props.slotA, { required: true });

    expect(resolvedProps).toEqual({});
  });
});
