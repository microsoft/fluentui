import * as React from 'react';
import { ReactWrapper } from 'enzyme';
import { mountWithProvider as mount } from 'test/utils';

import { Box } from 'src/components/Box/Box';
import { Props, ShorthandValue } from 'src/types';

export interface ImplementsWrapperPropOptions {
  wrapppedComponentSelector: any;
  WrapperComponent?: any;
}

type WrapperProps = {
  wrapper?: ShorthandValue<Props>;
};

export const implementsWrapperProp = (
  Component: React.ComponentType<WrapperProps>,
  options: ImplementsWrapperPropOptions,
) => {
  const { wrapppedComponentSelector, WrapperComponent = Box } = options;

  const wrapperTests = (wrapper: ReactWrapper) => {
    expect(wrapper.length).toBeGreaterThan(0);
    expect(wrapper.find(wrapppedComponentSelector).length).toBeGreaterThan(0);
  };

  describe('"wrapper" prop', () => {
    it('wraps the component by default', () => {
      wrapperTests(mount(<Component />).find(WrapperComponent));
    });

    it('wraps the component with a custom element using "as" prop', () => {
      wrapperTests(mount(<Component wrapper={{ as: 'p' }} />).find('p'));
    });
  });
};
