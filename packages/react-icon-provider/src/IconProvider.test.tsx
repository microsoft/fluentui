import * as React from 'react';
import { mount } from 'enzyme';
import { IconProvider, useIconSubset } from './IconProvider';
import { IIconSubset } from '@fluentui/style-utilities';

const TestOverriddenIcon = () => {
  return null;
};
const testOverride: IIconSubset = {
  icons: {
    TestIcon: <TestOverriddenIcon />,
  },
};
describe('IconProvider', () => {
  it('returns a valid React component', () => {
    const iconOverride: IIconSubset = {
      icons: {
        TestIcon: <TestOverriddenIcon />,
      },
    };
    expect(React.isValidElement(<IconProvider icons={iconOverride} />)).toEqual(true);
  });

  it('overrides a default Icon element', () => {
    let resolvedIcon: IIconSubset | undefined;
    const TestComponent = () => {
      resolvedIcon = useIconSubset();
      return null;
    };
    mount(
      <IconProvider icons={testOverride}>
        <TestComponent />
      </IconProvider>,
    );
    const expectedIcon: IIconSubset = {
      icons: {
        TestIcon: <TestOverriddenIcon />,
      },
    };
    expect(resolvedIcon).toEqual(expectedIcon);
  });
});
