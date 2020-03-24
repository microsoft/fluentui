import * as React from 'react';

import { Popper, PositioningProps } from 'src/utils/positioner';
import { mountWithProvider as mount } from 'test/utils';

type ImplementsPopperPropsOptions<P> = {
  requiredProps?: Partial<P>;
};

export const positioningProps: Required<PositioningProps> = {
  align: 'bottom',
  offset: '20px',
  position: 'above',
  positionFixed: true,
  unstable_pinned: true,
};

function implementsPopperProps<P>(Component: React.ComponentType<P>, options: ImplementsPopperPropsOptions<P> = {}) {
  describe('implements all positioning props for Popper', () => {
    Object.keys(positioningProps).forEach((positioningProp: keyof PositioningProps) => {
      test(`"${positioningProp}" is passed to a Popper component`, () => {
        const wrapper = mount(
          React.createElement(Component, {
            ...(options.requiredProps as P),
            [positioningProp]: positioningProps[positioningProp],
          }),
        );
        const popper = wrapper.find(Popper);

        expect(popper.prop(positioningProp)).toBe(positioningProps[positioningProp]);
      });
    });
  });
}

export default implementsPopperProps;
