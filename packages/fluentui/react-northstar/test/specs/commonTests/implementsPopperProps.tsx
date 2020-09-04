import * as React from 'react';

import { Popper, PositioningProps } from 'src/utils/positioner';
import { mountWithProvider as mount } from 'test/utils';

type ImplementsPopperPropsOptions<P> = {
  requiredProps?: Partial<P>;
};

export const positioningProps: Required<PositioningProps> = {
  align: 'bottom',
  flipBoundary: document.body,
  offset: [20, 20],
  overflowBoundary: document.body,
  popperRef: React.createRef(),
  position: 'above',
  positionFixed: true,
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
  });
}
