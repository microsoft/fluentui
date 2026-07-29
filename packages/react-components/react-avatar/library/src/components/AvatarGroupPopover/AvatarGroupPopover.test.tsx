import * as React from 'react';
import { AvatarGroupItem } from '../AvatarGroupItem/AvatarGroupItem';
import { AvatarGroupPopover } from './AvatarGroupPopover';
import { isConformant } from '../../testing/isConformant';
import { render, screen } from '@testing-library/react';

describe('AvatarGroupPopover', () => {
  isConformant({
    Component: AvatarGroupPopover,
    displayName: 'AvatarGroupPopover',
    // Statics removal (DECISIONS.md D16.1): AvatarGroupPopover no longer publishes BEM
    // statics, so `component-has-static-classnames-object` is disabled — its sub-tests
    // hard-code the `fui-AvatarGroupPopover__<slot>` format (defaultTests.tsx:244-245, 277)
    // and fail under the retained-constant policy exactly as they would under deletion
    // (D16.6). The `has-static-classnames` variant options that drove it are removed with
    // it, along with the portal helper they needed.
    //
    // `component-has-group-marker` is deliberately NOT opted in here. This hook is still
    // Griffel, so it stamps no marker yet (D15.1, unconverted siblings), and the component's
    // `root` slot is a `<Popover>` that renders no DOM element of its own — there is nothing
    // for the test to target. It opts in when the hook converts.
    disabledTests: [
      'component-handles-ref',

      'component-has-root-ref',

      'component-handles-classname',

      'make-styles-overrides-win',

      'component-has-static-classnames-object',
      // Stamps no named-group marker, so it opts out of `component-has-group-marker` (a
      // default test since DECISIONS.md D16.6).

      'component-has-group-marker',
    ],
    testOptions: {
      'consistent-callback-args': {
        legacyCallbacks: ['onOpenChange'],
      },
    },
    requiredProps: {
      children: (
        <>
          <AvatarGroupItem name="Allan Munger" />
          <AvatarGroupItem name="Daisy Phillips" />
          <AvatarGroupItem name="Robert Tolbert" />
          <AvatarGroupItem name="Kevin Sturgis" />
        </>
      ),
      count: 4,
    },
  });

  it('respects a custom count', () => {
    render(
      <AvatarGroupPopover count={20}>
        <AvatarGroupItem name="Allan Munger" />
        <AvatarGroupItem name="Daisy Phillips" />
        <AvatarGroupItem name="Robert Tolbert" />
        <AvatarGroupItem name="Kevin Sturgis" />
      </AvatarGroupPopover>,
    );

    expect(screen.getByRole('button').textContent).toBe('+20');
  });

  it('does not render a count greater than 99', () => {
    render(
      <AvatarGroupPopover count={120}>
        <AvatarGroupItem name="Allan Munger" />
        <AvatarGroupItem name="Daisy Phillips" />
        <AvatarGroupItem name="Robert Tolbert" />
        <AvatarGroupItem name="Kevin Sturgis" />
      </AvatarGroupPopover>,
    );

    expect(screen.getByRole('button').textContent).toBe('99+');
  });
});
