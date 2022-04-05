import * as React from 'react';

import { Popper, PositioningProps } from 'src/utils/positioner';
import { mountWithProvider as mount } from 'test/utils';

type ImplementsPopperPropsOptions<P> = {
  requiredProps?: Partial<P>;
};

export const positioningProps: Required<Omit<PositioningProps, 'popperRef'>> = {
  align: 'bottom',
  flipBoundary: document.body,
  offset: [20, 20],
  overflowBoundary: document.body,
  position: 'above',
  positionFixed: true,
  unstable_disableTether: 'all',
  autoSize: true,
  unstable_pinned: true,
};

export function implementsPopperProps<P>(
  Component: React.ComponentType<P>,
  options: ImplementsPopperPropsOptions<P> = {},
) {
  describe('implements all positioning props for Popper', () => {
    Object.entries(positioningProps).forEach(([positioningProp, positioningValue]) => {
      test(`"${positioningProp}" is passed to a Popper component`, () => {
        const wrapper = mount(
          React.createElement(Component, {
            ...(options.requiredProps as P),
            [positioningProp]: positioningValue,
          }),
        );
        const popper = wrapper.find(Popper);

        expect(popper.prop(positioningProp)).toBe(positioningValue);
      });
    });

    test('popperRef is handled by Popper component', () => {
      const popperRef = jest.fn();
      mount(
        React.createElement(Component, {
          ...(options.requiredProps as P),
          popperRef,
        }),
      );
      expect(popperRef).toHaveBeenCalledWith({ updatePosition: expect.any(Function) });
    });
  });
}
