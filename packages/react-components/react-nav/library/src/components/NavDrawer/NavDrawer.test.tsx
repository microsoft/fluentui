import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { NavDrawer } from './NavDrawer';
import type { NavDrawerProps } from './NavDrawer.types';

/**
 * Why these tests are disabled:
 * component-handles-ref|component-has-root-ref: Drawer (NavDrawer's base) uses the Dialog under the hood and Dialog do not handle ref, as it is a renderless component
 * component-handles-classname|component-has-static-classnames-object|make-styles-overrides-win: Drawer uses the DialogSurface component to render the classname, so the main component do not handle classname.
 * consistent-callback-args: Disabled that as the Drawer callback function uses the same signature as the Dialog, and Dialog has those tests disabled.
 */

describe('NavDrawer', () => {
  isConformant<NavDrawerProps>({
    Component: NavDrawer,
    displayName: 'NavDrawer',
    disabledTests: [
      'component-handles-ref',
      'component-has-root-ref',
      'component-handles-classname',
      'component-has-static-classnames-object',
      'consistent-callback-args',
      'make-styles-overrides-win',
    ],
  });
});

describe('NavDrawer DOM attributes', () => {
  const controlledNavProps: Partial<NavDrawerProps> = {
    openCategories: ['2'],
    selectedValue: '1',
    selectedCategoryValue: '2',
  };
  const uncontrolledNavProps: Partial<NavDrawerProps> = {
    defaultSelectedValue: '1',
    defaultSelectedCategoryValue: '2',
    defaultOpenCategories: ['2'],
  };

  it.each([
    ['inline', 'controlled', controlledNavProps],
    ['inline', 'uncontrolled', uncontrolledNavProps],
    ['overlay', 'controlled', controlledNavProps],
    ['overlay', 'uncontrolled', uncontrolledNavProps],
  ] as const)('does not render Nav props as DOM attributes on the drawer (%s, %s)', (type, _, navProps) => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => undefined);
    const customProps = { 'custom-attribute': 'custom-value' } as {};

    render(
      <NavDrawer
        type={type}
        open
        id="nav-drawer"
        data-testid="nav-drawer"
        aria-label="Navigation"
        {...navProps}
        multiple={false}
        onNavItemSelect={jest.fn()}
        onNavCategoryItemToggle={jest.fn()}
        density="small"
        tabbable
        {...customProps}
      >
        Nav
      </NavDrawer>,
    );

    const drawer = document.getElementById('nav-drawer') as HTMLElement;

    expect(consoleError).not.toHaveBeenCalled();
    consoleError.mockRestore();

    expect(drawer.getAttribute('role')).toBe('navigation');
    expect(drawer.getAttribute('aria-label')).toBe('Navigation');
    expect(drawer.getAttribute('data-testid')).toBe('nav-drawer');
    expect(drawer.getAttribute('custom-attribute')).toBe('custom-value');
    [
      'type',
      'defaultselectedvalue',
      'defaultselectedcategoryvalue',
      'defaultopencategories',
      'opencategories',
      'selectedvalue',
      'selectedcategoryvalue',
      'multiple',
      'onnavitemselect',
      'onnavcategoryitemtoggle',
      'density',
      'tabbable',
    ].forEach(attribute => expect(drawer.hasAttribute(attribute)).toBe(false));
  });
});
