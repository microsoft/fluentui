import * as React from 'react';
import { resolveShorthandProps } from './resolveShorthandProps';
import { ShorthandProps } from './types';

type TestProps = {
  slotA?: ShorthandProps<React.HTMLAttributes<HTMLElement>>;
  slotB?: ShorthandProps<React.HTMLAttributes<HTMLElement>>;
  slotC?: ShorthandProps<React.HTMLAttributes<HTMLElement>>;
  notASlot?: string;
  alsoNotASlot?: number;
};

const testShorthandProps = ['slotA', 'slotB', 'slotC'] as const;

describe('resolveShorthandProps', () => {
  it('resolves a string', () => {
    const props: TestProps = { slotA: 'hello' };
    const resolvedProps = resolveShorthandProps(props, testShorthandProps);

    expect(resolvedProps).toEqual({ slotA: { children: 'hello' } });
  });

  it('resolves a JSX element', () => {
    const props: TestProps = { slotA: <div>hello</div> };
    const resolvedProps = resolveShorthandProps(props, testShorthandProps);

    expect(resolvedProps).toEqual({ slotA: { children: <div>hello</div> } });
  });

  it('resolves a number', () => {
    const props: TestProps = { slotA: 42 };
    const resolvedProps = resolveShorthandProps(props, testShorthandProps);

    expect(resolvedProps).toEqual({ slotA: { children: 42 } });
  });

  it('resolves undefined without creating a child element', () => {
    const props: TestProps = { slotA: undefined };
    const resolvedProps = resolveShorthandProps(props, testShorthandProps);

    expect(resolvedProps).toEqual({ slotA: undefined });
  });

  it('resolves mutliple slots', () => {
    const props: TestProps = {
      slotA: 'hello',
      slotB: <>world</>,
      slotC: 1701,
      notASlot: 'test',
      alsoNotASlot: 42,
    };
    const resolvedProps = resolveShorthandProps(props, testShorthandProps);

    expect(resolvedProps).toEqual({
      slotA: { children: 'hello' },
      slotB: { children: <>world</> },
      slotC: { children: 1701 },
      notASlot: 'test',
      alsoNotASlot: 42,
    });
  });

  it('creates a copy of props if it is modified', () => {
    const props: TestProps = { slotA: 'hello' };
    const resolvedProps = resolveShorthandProps(props, testShorthandProps);

    expect(resolvedProps).not.toBe(props);
    expect(resolvedProps.slotA).not.toBe(props.slotA);
    expect(props.slotA).toBe('hello');
  });

  it('does not create a copy of props if there are no slot values', () => {
    const props: TestProps = { notASlot: 'test', alsoNotASlot: 42 };
    const resolvedProps = resolveShorthandProps(props, testShorthandProps);

    expect(resolvedProps).toBe(props);
  });

  it('does not create a copy of props if the slot does not need to be resolved', () => {
    const props: TestProps = { slotA: { children: 'hello' } };
    const resolvedProps = resolveShorthandProps(props, testShorthandProps);

    expect(resolvedProps).toBe(props);
  });
});
