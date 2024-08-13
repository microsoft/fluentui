import { GriffelStyle, tokens } from '@fluentui/react-components';
import { spinner } from './SpinnerMigration.mixins';

const testMixin = (mixin: GriffelStyle | undefined, expectedStyle: GriffelStyle | undefined) => {
  const name = expectedStyle ? JSON.stringify(expectedStyle) : 'empty';
  test(name, () => {
    const result = { ...mixin };
    expect(result).toEqual(expectedStyle || {});
  });
};

describe('SpinnerMigration.mixins', () => {
  describe('inline', () => {
    const styles = {
      display: 'inline-flex',
    };
    testMixin(spinner.v0Inline(), styles);
  });

  describe('v0 spinner label style', () => {
    const styles = {
      '& .fui-Label': {
        fontSize: '14px',
        fontWeight: tokens.fontWeightMedium,
      },
    };
    testMixin(spinner.v0SpinnerLabelStyle(), styles);
  });
});
