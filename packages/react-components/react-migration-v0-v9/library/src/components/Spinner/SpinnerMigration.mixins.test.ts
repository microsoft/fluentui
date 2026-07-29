import type { GriffelStyle } from '@fluentui/react-components';
import { tokens } from '@fluentui/react-components';
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
      // react-label's BEM static `fui-Label` was removed; its public identity class is the
      // named-group marker, with the `/` escaped for use inside a selector (DECISIONS.md D16.1/D16.5).
      '& .group\\/fui-label': {
        fontSize: '14px',
        fontWeight: tokens.fontWeightMedium,
      },
    };
    testMixin(spinner.v0SpinnerLabelStyle(), styles);
  });
});
