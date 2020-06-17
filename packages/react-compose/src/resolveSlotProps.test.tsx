import * as React from 'react';
import { resolveSlotProps, NullRender } from './resolveSlotProps';
import { defaultComposeOptions } from './defaultComposeOptions';
import { ComposePreparedOptions } from './types';

const nullRenderer = () => null;

describe('resolveSlotProps', () => {
  const selfSlot = { __self: defaultComposeOptions.slots.__self };

  const defaultSlots = {
    slots: {
      ...selfSlot,
      root: nullRenderer,
      slot1: nullRenderer,
      slot2: nullRenderer,
      slot3: nullRenderer,
    },
  };

  const defaultOptionsWithSlots: ComposePreparedOptions = {
    ...defaultComposeOptions,
    ...defaultSlots,
    classes: [{ root: 'root' }, () => ({ foo: 'foo' }), { bar: 'bar', baz: 'baz' }],
  };

  it('can expand strings, booleans, and numbers as children', () => {
    const state: { slot1: string; slot2: number; slot3: boolean } = {
      slot1: 'text',
      slot2: 0,
      slot3: false,
    };

    expect(
      resolveSlotProps(
        {
          slots: defaultOptionsWithSlots.slots,
          state,
          slotProps: {},
        },
        defaultOptionsWithSlots,
      ),
    ).toEqual({
      slots: defaultOptionsWithSlots.slots,
      state,
      slotProps: {
        root: {},
        slot1: { children: 'text' },
        slot2: { children: 0 },
        slot3: { children: false },
      },
    });
  });

  it('can expand JSX', () => {
    const slotContent = <button />;
    const state = { slot1: slotContent };

    expect(
      resolveSlotProps(
        {
          ...defaultSlots,
          state,
          slotProps: {},
        },
        defaultOptionsWithSlots,
      ),
    ).toEqual({
      ...defaultSlots,
      state,
      slotProps: {
        root: {},
        slot1: { children: slotContent },
      },
    });
  });

  it('can expand children functions', () => {
    const renderFunction = () => <button />;
    const slotContent = <button />;
    const state = { slot1: { children: renderFunction } };

    expect(
      resolveSlotProps(
        {
          ...defaultSlots,
          slotProps: {},
          state,
        },
        defaultOptionsWithSlots,
      ),
    ).toEqual({
      slots: {
        ...defaultSlots.slots,
        slot1: React.Fragment,
      },
      state,
      slotProps: {
        root: {},
        slot1: { children: slotContent },
      },
    });
  });

  it('can expand null slots from state', () => {
    const state = { slot1: null };

    expect(
      resolveSlotProps(
        {
          ...defaultSlots,
          slotProps: {},
          state,
        },
        defaultOptionsWithSlots,
      ),
    ).toEqual({
      slots: {
        ...defaultSlots.slots,
        slot1: NullRender,
      },
      state,
      slotProps: {
        root: {},
      },
    });
  });

  it('can expand null slots from config', () => {
    const state = {};

    expect(
      resolveSlotProps(
        {
          slots: {
            ...defaultSlots.slots,
            slot1: null,
          },
          slotProps: {},
          state,
        },
        defaultOptionsWithSlots,
      ),
    ).toEqual({
      slots: {
        ...defaultSlots.slots,
        slot1: NullRender,
      },
      state,
      slotProps: {
        root: {},
      },
    });
  });

  // TODO: separate checkin.
  // it('merges style prop', () => {
  //   const state = {
  //     style: { padding: 1, background: 'black' },
  //   };

  //   expect(
  //     resolveSlotProps(
  //       {
  //         slots: {
  //           ...defaultSlots.slots,
  //           slot1: null,
  //         },
  //         slotProps: {
  //           root: {
  //             style: { background: 'red', margin: 1 },
  //           },
  //         },
  //         state,
  //       },
  //       defaultOptionsWithSlots,
  //     ),
  //   ).toEqual({
  //     slots: {
  //       ...defaultSlots.slots,
  //       slot1: NullRender,
  //     },
  //     state,
  //     slotProps: {
  //       root: {
  //         style: { padding: 1, background: 'black', margin: 1 },
  //       },
  //     },
  //   });
  // });

  // it('merges style prop and handles user overrides', () => {});
});
