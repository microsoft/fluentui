import * as React from 'react';
import { render } from '@testing-library/react';
import { resetIdsForTests } from '@fluentui/react-utilities';

import { isConformant } from '../../testing/isConformant';
import { OverlayDrawer } from './OverlayDrawer';
import type { OverlayDrawerProps } from './OverlayDrawer.types';

describe('OverlayDrawer', () => {
  const testid = 'test';
  const props = {
    'data-testid': testid,
  } as OverlayDrawerProps;

  beforeEach(() => resetIdsForTests());

  /**
   * Note: see more visual regression tests for OverlayDrawer in /apps/vr-tests.
   *
   * Why these tests are disabled:
   * component-handles-ref|component-has-root-ref: OverlayDrawer uses the Dialog under the hood and Dialog do not handle ref, as it is a renderless component
   * component-handles-classname|component-has-static-classnames-object|make-styles-overrides-win: OverlayDrawer uses the DialogSurface component to render the className, so the main component do not handle className.
   * consistent-callback-args: Disabled that as the OverlayDrawer callback function uses the same signature as the Dialog, and Dialog has those tests disabled.
   */
  isConformant<OverlayDrawerProps>({
    Component: OverlayDrawer,
    displayName: 'OverlayDrawer',
    disabledTests: [
      'component-handles-ref',
      'component-has-root-ref',
      'component-handles-classname',
      'component-has-static-classnames-object',
      'consistent-callback-args',
    ],
    requiredProps: props,
    getTargetElement: result => result.getByTestId(testid),
  });

  it('renders a default state', () => {
    const result = render(<OverlayDrawer>Default OverlayDrawer</OverlayDrawer>);
    expect(result.container).toMatchInlineSnapshot(`<div />`);
  });

  it('respects the mountNode prop', () => {
    const mountNode = document.createElement('div');
    render(
      <OverlayDrawer id="drawer" mountNode={mountNode} open={true}>
        Default OverlayDrawer
      </OverlayDrawer>,
    );

    const result = mountNode.querySelector('#drawer');
    expect(result).toBeTruthy();
  });

  it('accept mountNode as object with className', () => {
    const customClassName = 'CustomMountNode';

    const { baseElement } = render(
      <OverlayDrawer id="drawer" mountNode={{ className: customClassName }} open={true}>
        Default OverlayDrawer
      </OverlayDrawer>,
    );

    const mountNodeElement = baseElement.querySelector(`.${customClassName}`);
    const drawerInsideMountNode = mountNodeElement?.querySelector('#drawer');

    expect(mountNodeElement).toBeTruthy();
    expect(drawerInsideMountNode).toBeTruthy();
  });
});

describe('OverlayDrawer DOM attributes', () => {
  it('does not render drawer props as DOM attributes on the surface', () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => undefined);
    const onOpenChange = jest.fn();
    const customProps = { 'custom-attribute': 'custom-value' } as {};

    render(
      <OverlayDrawer
        id="drawer"
        data-testid="drawer"
        aria-label="Drawer"
        open
        // eslint-disable-next-line @typescript-eslint/no-deprecated
        defaultOpen
        onOpenChange={onOpenChange}
        modalType="alert"
        inertTrapFocus
        unmountOnClose={false}
        position="end"
        size="large"
        surfaceMotion={{}}
        backdropMotion={{}}
        {...customProps}
      >
        Drawer
      </OverlayDrawer>,
    );

    const drawer = document.getElementById('drawer') as HTMLElement;

    expect(consoleError).not.toHaveBeenCalled();
    consoleError.mockRestore();

    expect(drawer.getAttribute('role')).toBe('alertdialog');
    expect(drawer.getAttribute('aria-label')).toBe('Drawer');
    expect(drawer.getAttribute('data-testid')).toBe('drawer');
    expect(drawer.getAttribute('custom-attribute')).toBe('custom-value');
    [
      'open',
      'defaultopen',
      'onopenchange',
      'modaltype',
      'inerttrapfocus',
      'unmountonclose',
      'position',
      'size',
      'surfacemotion',
      'backdropmotion',
      'mountnode',
    ].forEach(attribute => expect(drawer.hasAttribute(attribute)).toBe(false));
  });
});
