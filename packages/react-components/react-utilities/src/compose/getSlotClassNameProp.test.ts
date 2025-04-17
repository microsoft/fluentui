import { getSlotClassNameProp } from './getSlotClassNameProp';
import * as slot from './slot';
import type { ComponentProps, Slot } from './types';

type TestSlots = {
  slotA: NonNullable<Slot<'div'>>;
};

type TestProps = ComponentProps<TestSlots>;

const mergeClasses = (...classNames: (string | false | undefined)[]) => classNames.filter(Boolean).join(' ');

describe('getSlotClassNameProp', () => {
  it('returns the original class name even if the slot className is modified', () => {
    const props: TestProps = { slotA: { className: 'originalClassName' } };
    const slotA = slot.always(props.slotA, { elementType: 'div' });
    slotA.className = mergeClasses(slotA.className, 'overrideClassName');

    expect(getSlotClassNameProp(slotA)).toEqual('originalClassName');
    expect(slotA.className).toEqual('originalClassName overrideClassName');
  });
  it('returns undefined if the slot does not have a className', () => {
    const props: TestProps = { slotA: {} };
    const slotA = slot.always(props.slotA, { elementType: 'div' });
    slotA.className = mergeClasses(slotA.className, 'overrideClassName');

    expect(getSlotClassNameProp(slotA)).toBeUndefined();
    expect(slotA.className).toEqual('overrideClassName');
  });
});
