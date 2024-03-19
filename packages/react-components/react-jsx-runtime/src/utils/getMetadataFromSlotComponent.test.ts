import * as React from 'react';
import { SLOT_ELEMENT_TYPE_SYMBOL, SLOT_RENDER_FUNCTION_SYMBOL } from '@fluentui/react-utilities';
import type { SlotComponentType, SlotRenderFunction } from '@fluentui/react-utilities';
import { getMetadataFromSlotComponent } from './getMetadataFromSlotComponent';

type TestProps = React.HTMLAttributes<HTMLElement> & { as?: 'div' | 'span' };

describe('getMetadataFromSlotComponent', () => {
  it('gets metadata from slot component', () => {
    expect(
      getMetadataFromSlotComponent({
        [SLOT_ELEMENT_TYPE_SYMBOL]: 'div',
        tabIndex: 0,
      } as SlotComponentType<TestProps>),
    ).toEqual({
      elementType: 'div',
      props: { tabIndex: 0 },
      renderFunction: undefined,
    });
  });

  it('handles render props', () => {
    expect(
      getMetadataFromSlotComponent({
        [SLOT_ELEMENT_TYPE_SYMBOL]: 'div',
        [SLOT_RENDER_FUNCTION_SYMBOL]: jest.fn() as SlotRenderFunction<TestProps>,
        tabIndex: 0,
      } as SlotComponentType<TestProps>),
    ).toEqual({
      elementType: 'div',
      props: { tabIndex: 0 },
      renderFunction: expect.any(Function),
    });
  });
  it("should override elementType with 'as' when base element is HTML element", () => {
    expect(
      getMetadataFromSlotComponent({
        [SLOT_ELEMENT_TYPE_SYMBOL]: 'div',
        as: 'span',
        tabIndex: 0,
      } as SlotComponentType<TestProps>),
    ).toEqual({
      elementType: 'span',
      props: { tabIndex: 0 },
      renderFunction: undefined,
    });
  });
  it("should pass 'as' property to base element that aren't HTML element", () => {
    const fn = (props: TestProps) => null;
    expect(
      getMetadataFromSlotComponent({
        [SLOT_ELEMENT_TYPE_SYMBOL]: fn,
        as: 'div',
        tabIndex: 0,
      } as SlotComponentType<TestProps>),
    ).toEqual({
      elementType: fn,
      props: { tabIndex: 0, as: 'div' },
      renderFunction: undefined,
    });
  });
});
