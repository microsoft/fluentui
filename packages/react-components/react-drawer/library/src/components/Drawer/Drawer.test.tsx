import * as React from 'react';
import { render } from '@testing-library/react';
import { resetIdsForTests } from '@fluentui/react-utilities';

import { isConformant } from '../../testing/isConformant';
import { Drawer } from './Drawer';
import type { DrawerProps } from './Drawer.types';

describe('Drawer', () => {
  const testid = 'test';
  const props = {
    'data-testid': testid,
  } as DrawerProps;

  beforeEach(() => {
    resetIdsForTests();
  });

  /**
   * Note: see more visual regression tests for Drawer in /apps/vr-tests.
   *
   * Why these tests are disabled:
   * component-handles-ref|component-has-root-ref: Drawer uses the Dialog under the hood and Dialog do not handle ref, as it is a renderless component
   * component-handles-classname|component-has-static-classnames-object|make-styles-overrides-win: Drawer uses the DialogSurface component to render the classname, so the main component do not handle classname.
   * consistent-callback-args: Disabled that as the Drawer callback function uses the same signature as the Dialog, and Dialog has those tests disabled.
   */
  isConformant<DrawerProps>({
    Component: Drawer,
    displayName: 'Drawer',
    disabledTests: [
      'component-handles-ref',
      'component-has-root-ref',
      'component-handles-classname',
      'component-has-static-classnames-object',
      'consistent-callback-args',
      'make-styles-overrides-win',
    ],
    requiredProps: props,
    getTargetElement: result => result.getByTestId(testid),
  });

  it('renders a default state', () => {
    const result = render(<Drawer>Default Drawer</Drawer>);
    expect(result.container).toMatchInlineSnapshot(`<div />`);
  });
});

describe('Drawer DOM attributes', () => {
  it.each(['inline', 'overlay'] as const)('does not render the variant type as a DOM attribute (%s)', type => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => undefined);
    render(
      <Drawer type={type} id="drawer" data-testid="drawer" open>
        Drawer
      </Drawer>,
    );

    const drawer = document.getElementById('drawer') as HTMLElement;

    expect(consoleError).not.toHaveBeenCalled();
    consoleError.mockRestore();
    expect(drawer.getAttribute('data-testid')).toBe('drawer');
    expect(drawer.hasAttribute('type')).toBe(false);
  });

  it('forwards only the active variant props when switching types', () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => undefined);
    const customProps = { 'custom-attribute': 'custom-value' } as {};
    const renderDrawer = (type: 'inline' | 'overlay') => (
      <Drawer
        type={type}
        id="drawer"
        data-testid="drawer"
        open
        separator
        modalType="non-modal"
        inertTrapFocus
        onOpenChange={jest.fn()}
        backdrop={{ className: 'backdrop' }}
        backdropMotion={{}}
        mountNode={document.body}
        surfaceMotion={{}}
        position="end"
        size="large"
        unmountOnClose={false}
        {...customProps}
      >
        Drawer
      </Drawer>
    );
    const forbiddenAttributes = [
      'type',
      'separator',
      'modaltype',
      'inerttrapfocus',
      'onopenchange',
      'backdrop',
      'backdropmotion',
      'mountnode',
      'surfacemotion',
      'position',
      'size',
      'open',
      'unmountonclose',
    ];
    const assertDrawer = () => {
      const drawer = document.getElementById('drawer') as HTMLElement;

      expect(drawer.getAttribute('data-testid')).toBe('drawer');
      expect(drawer.getAttribute('custom-attribute')).toBe('custom-value');
      forbiddenAttributes.forEach(attribute => expect(drawer.hasAttribute(attribute)).toBe(false));

      return drawer;
    };

    const { rerender } = render(renderDrawer('inline'));
    expect(assertDrawer().getAttribute('role')).toBeNull();

    rerender(renderDrawer('overlay'));
    expect(assertDrawer().getAttribute('role')).toBe('dialog');

    rerender(renderDrawer('inline'));
    expect(assertDrawer().getAttribute('role')).toBeNull();

    expect(consoleError).not.toHaveBeenCalled();
    consoleError.mockRestore();
  });
});
