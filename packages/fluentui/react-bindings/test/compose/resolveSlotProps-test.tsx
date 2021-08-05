import * as React from 'react';
import { ComposePreparedOptions, defaultComposeOptions } from '../../src/compose/consts';
import { resolveSlotProps, NullRender } from '../../src/compose/resolveSlotProps';

const nullRenderer = () => null;

describe('resolveSlotProps', () => {
  const selfSlot = { __self: defaultComposeOptions.slots.__self };

  const getDefaultSlots = () => ({
    slots: {
      ...selfSlot,
      root: nullRenderer,
      slot1: nullRenderer,
      slot2: nullRenderer,
      slot3: nullRenderer,
    },
  });

  const defaultOptionsWithSlots: ComposePreparedOptions = {
    ...defaultComposeOptions,
    ...getDefaultSlots(),
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
          ...getDefaultSlots(),
          state,
          slotProps: {},
        },
        defaultOptionsWithSlots,
      ),
    ).toEqual({
      ...getDefaultSlots(),
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
          ...getDefaultSlots(),
          slotProps: {},
          state,
        },
        defaultOptionsWithSlots,
      ),
    ).toEqual({
      slots: {
        ...getDefaultSlots().slots,
        slot1: React.Fragment,
      },
      state,
      slotProps: {
        root: {},
        slot1: { children: slotContent },
      },
    });
  });

  it('provide children function correct params', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const renderFunction = (Component: React.ElementType, props: any) => {
      expect(Component).toEqual(nullRenderer);
      expect(props).toEqual({
        className: 'slot1',
        parentProp: 'parentProp',
      });

      return <button />;
    };

    const slotContent = <button />;
    const state = { slot1: { className: 'slot1', children: renderFunction } };

    expect(
      resolveSlotProps(
        {
          ...getDefaultSlots(),
          slotProps: {
            slot1: { parentProp: 'parentProp' },
          },
          state,
        },
        defaultOptionsWithSlots,
      ),
    ).toEqual({
      slots: {
        ...getDefaultSlots().slots,
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
          ...getDefaultSlots(),
          slotProps: {},
          state,
        },
        defaultOptionsWithSlots,
      ),
    ).toEqual({
      slots: {
        ...getDefaultSlots().slots,
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
            ...getDefaultSlots().slots,
            slot1: null,
          },
          slotProps: {},
          state,
        },
        defaultOptionsWithSlots,
      ),
    ).toEqual({
      slots: {
        ...getDefaultSlots().slots,
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
  //           ...getDefaultSlots().slots,
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
  //       ...getDefaultSlots().slots,
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
