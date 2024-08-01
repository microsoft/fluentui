import { GriffelStyle, tokens } from '@fluentui/react-components';
import { input } from './Input.mixins';

const testMixin = (mixin: GriffelStyle | undefined, expectedStyle: GriffelStyle | undefined) => {
  const name = expectedStyle ? JSON.stringify(expectedStyle) : 'empty';
  test(name, () => {
    const result = { ...mixin };
    expect(result).toEqual(expectedStyle || {});
  });
};

describe('Input.mixins', () => {
  describe('error', () => {
    testMixin(input.error(), { border: `1px solid ${tokens.colorPaletteRedBorderActive}` });
  });

  describe('errorIndicator', () => {
    testMixin(input.errorIndicator(), {
      color: tokens.colorPaletteRedBorderActive,
    });
  });

  describe('fluid', () => {
    testMixin(input.fluid(), { width: '100%' });
  });

  describe('successIndicator', () => {
    testMixin(input.successIndicator(), {
      color: tokens.colorPaletteGreenForeground1,
    });
  });
});
