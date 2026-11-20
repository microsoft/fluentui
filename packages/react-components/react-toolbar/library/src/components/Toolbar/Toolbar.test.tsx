import * as React from 'react';
import { render, renderHook } from '@testing-library/react';
import { Toolbar } from './Toolbar';
import { isConformant } from '../../testing/isConformant';
import { useToolbarBase_unstable } from './useToolbar';

describe('Toolbar', () => {
  isConformant({
    Component: Toolbar,
    displayName: 'Toolbar',
    testOptions: {
      'consistent-callback-args': {
        legacyCallbacks: ['onCheckedValueChange'],
      },
    },
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<Toolbar>Default Toolbar</Toolbar>);
    expect(result.container).toMatchSnapshot();
  });
});

describe('Toolbar DOM attributes', () => {
  it('does not render component props as DOM attributes', () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => undefined);
    const { container } = render(
      <Toolbar defaultCheckedValues={{}} onCheckedValueChange={jest.fn()} size="large" vertical />,
    );

    expect(consoleError).not.toHaveBeenCalled();
    consoleError.mockRestore();
    expect((container.firstElementChild as HTMLElement).getAttributeNames().sort()).toEqual([
      'aria-orientation',
      'class',
      'data-tabster',
      'role',
    ]);
  });
});

describe('useToolbarBase_unstable base hook', () => {
  it('does not forward component props to the root slot', () => {
    const { result } = renderHook(() =>
      useToolbarBase_unstable(
        { defaultCheckedValues: {}, onCheckedValueChange: jest.fn(), vertical: true },
        React.createRef(),
      ),
    );

    expect(result.current.root).not.toHaveProperty('checkedValues');
    expect(result.current.root).not.toHaveProperty('defaultCheckedValues');
    expect(result.current.root).not.toHaveProperty('onCheckedValueChange');
    expect(result.current.root).not.toHaveProperty('vertical');
  });
});
