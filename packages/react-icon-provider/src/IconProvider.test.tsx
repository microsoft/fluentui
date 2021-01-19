import * as React from 'react';
import { mount } from 'enzyme';
import { createIconOverride } from './createOverride';
import { IconProvider, useIcon } from './IconProvider';
import { IIconSubset } from '@fluentui/style-utilities';

const TestOverriddenIcon = () => {
  return null;
};
const testOverride = createIconOverride({
  TestIcon: <TestOverriddenIcon />,
});
describe('IconProvider', () => {
  it('returns a valid React component', () => {
    const iconOverride = createIconOverride({
      TestIcon: <TestOverriddenIcon />,
    });
    expect(React.isValidElement(<IconProvider icons={iconOverride} />)).toEqual(true);
  });

  it('overrides a default Icon element', () => {
    let resolvedIcon: IIconSubset | undefined;
    const TestComponent = () => {
      resolvedIcon = useIcon();
      return null;
    };
    mount(
      <IconProvider icons={testOverride}>
        <TestComponent />
      </IconProvider>,
    );
    const expectedIcon = createIconOverride({
      TestIcon: <TestOverriddenIcon />,
    });
    expect(resolvedIcon).toEqual(expectedIcon);
  });
});
