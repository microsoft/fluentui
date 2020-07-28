import * as React from 'react';
import { compose } from './compose';
import { safeMount } from '@uifabric/test-utilities';
import { ShorthandProps } from './types';

describe('compose', () => {
  const Foo = compose<{ text?: string }>(
    // render
    (state: { text?: string }) => <div>{state.text}</div>,
    // options
    {
      displayName: 'Foo',
      defaultProps: { text: 'hello' },
    },
  );

  it('can create a renderable component', () => {
    expect(Foo.displayName);

    safeMount(<Foo />, wrapper => {
      expect(wrapper.html()).toEqual('<div>hello</div>');
    });

    safeMount(<Foo text="world" />, wrapper => {
      expect(wrapper.html()).toEqual('<div>world</div>');
    });
  });

  it('can create an extendable component', () => {
    const Bar = Foo.extend<{ text?: string }>({
      defaultProps: {
        text: 'new text',
      },
    });

    safeMount(<Bar />, wrapper => {
      expect(wrapper.html()).toEqual('<div>new text</div>');
    });
  });

  it('can simplify shorthand on merging', () => {
    let lastSlotValue;

    const Bar = compose<{ slot1?: ShorthandProps }>(
      (state: { slot1?: ShorthandProps }) => {
        lastSlotValue = state.slot1;
        return <div />;
      },
      {
        defaultProps: {
          slot1: { as: 'span', children: 'hello' },
        },
        shorthandPropNames: ['slot1'],
      },
    );

    safeMount(<Bar />, () => undefined);
    expect(lastSlotValue).toEqual({ as: 'span', children: 'hello' });

    safeMount(<Bar slot1={{ id: '123' }} />, () => undefined);
    expect(lastSlotValue).toEqual({ as: 'span', id: '123', children: 'hello' });

    safeMount(<Bar slot1="goodbye" />, () => undefined);
    expect(lastSlotValue).toEqual({ as: 'span', children: 'goodbye' });

    safeMount(<Bar slot1={<div />} />, () => undefined);
    expect(lastSlotValue).toEqual({ as: 'span', children: <div /> });
  });
});
