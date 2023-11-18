import { GriffelStyle } from '@fluentui/react-components';
import { slider } from './Slider.mixins';

const testMixin = (mixin: GriffelStyle | undefined, expectedStyle: GriffelStyle | undefined) => {
  const name = expectedStyle ? JSON.stringify(expectedStyle) : 'empty';
  test(name, () => {
    const result = { ...mixin };
    expect(result).toEqual(expectedStyle || {});
  });
};

describe('Slider.mixins', () => {
  describe('fluid', () => {
    testMixin(slider.fluid(), { width: '100%' });
  });
});
