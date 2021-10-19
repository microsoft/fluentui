import { getSlotsCompat } from './getSlotsCompat';

describe('getSlotsCompat', () => {
  it('does not propagate the `as` prop', () => {
    const { slots, slotProps } = getSlotsCompat(
      {
        as: 'label',
        className: 'cool-styles',
        slot: { as: 'h4', className: 'cool-slot-styles', children: 'Cool slot' },
      },
      ['slot'],
    );

    expect(slots.root).toEqual('label');
    expect(slotProps.root).toEqual({
      className: 'cool-styles',
    });

    expect(slots.slot).toEqual('h4');
    expect(slotProps.slot).toEqual({
      className: 'cool-slot-styles',
      children: 'Cool slot',
    });
  });
});
