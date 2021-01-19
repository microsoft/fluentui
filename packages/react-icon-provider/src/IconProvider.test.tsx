import * as React from 'react';
import { mount } from 'enzyme';
import { createIconOverride } from './createOverride';
import { createSvgIcon } from '@fluentui/react-icons-mdl2';
import { IconProvider, useIcon } from './IconProvider';
import { IIconSubset } from '@fluentui/style-utilities';

const testOverridenSvg = () => <svg id="test-overriden-id" />;
const TestOverriddenIcon = createSvgIcon({ svg: testOverridenSvg, displayName: 'TestIcon' });
const testOverride = createIconOverride({
  TestIcon: <TestOverriddenIcon id="test-overridden-icon-id" />,
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
      TestIcon: <TestOverriddenIcon id="test-overridden-icon-id" />,
    });
    expect(resolvedIcon).toEqual(expectedIcon);
  });
});
