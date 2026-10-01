import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../../testing/isConformant';
import { NavDrawer, navDrawerClassNames } from './';

describe('NavDrawer', () => {
  beforeAll(() => {
    HTMLDialogElement.prototype.show = function () {
      this.open = true;
    };
    HTMLDialogElement.prototype.showModal = function () {
      this.open = true;
    };
    HTMLDialogElement.prototype.close = function () {
      this.open = false;
    };
  });

  isConformant({
    Component: NavDrawer,
    displayName: 'NavDrawer',
    disableTypeTests: true,
    requiredProps: { children: 'Navigation', open: true, type: 'inline' },
    disabledTests: ['consistent-callback-args', 'exported-top-level', 'has-top-level-file', 'has-top-level-file-extra'],
  });

  it('composes the modern inline drawer and preserves nav visual defaults', () => {
    const { getByRole } = render(
      <NavDrawer className="consumer-class" open type="inline">
        Navigation
      </NavDrawer>,
    );
    const drawer = getByRole('navigation');

    expect(drawer).toHaveAttribute('data-nav-default-size');
    expect(drawer).toHaveAttribute('data-type', 'inline');
    expect(drawer).toHaveClass(navDrawerClassNames.root, 'fui-InlineDrawer', 'consumer-class');
  });

  it('supports custom drawer surface motion', () => {
    const { getByTestId } = render(
      <NavDrawer
        open
        surfaceMotion={{
          children: (_, motionProps) => <div data-testid="custom-motion">{motionProps.children}</div>,
        }}
      >
        Navigation
      </NavDrawer>,
    );

    expect(getByTestId('custom-motion')).toHaveTextContent('Navigation');
  });
});
