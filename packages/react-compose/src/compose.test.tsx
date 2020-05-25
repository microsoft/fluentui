import * as React from 'react';
import compose from './compose';
import { shallow } from 'enzyme';

describe('compose', () => {
  describe('shorthandConfig', () => {
    it('is passed via composeOptions', () => {
      const BaseComponent = compose(
        (props, ref, composeOptions) => {
          return (
            <div
              data-mapped-prop={composeOptions.shorthandConfig.mappedProp}
              data-allows-jsx={composeOptions.shorthandConfig.allowsJSX}
            />
          );
        },
        {
          shorthandConfig: {
            allowsJSX: false,
            mappedProp: 'content',
          },
        },
      );

      const ComposedComponent = compose(BaseComponent, {
        shorthandConfig: {
          mappedProp: 'as',
        },
      });

      const wrapper = shallow(<BaseComponent />);
      const composedWrapper = shallow(<ComposedComponent />);

      expect(wrapper.prop('data-mapped-prop')).toEqual('content');
      expect(wrapper.prop('data-allows-jsx')).toEqual(false);
      expect(composedWrapper.prop('data-mapped-prop')).toEqual('as');
      expect(composedWrapper.prop('data-allows-jsx')).toEqual(false);
    });
  });
});
