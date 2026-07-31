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
    // `component-has-group-marker` (a default test since D16.6) is now LIVE: the hook is
    // converted and stamps `group/fui-avatar-group-popover` on the trigger button, which is
    // the outermost element this component renders and therefore what `getTargetElement`
    // resolves to. No `testOptions['has-group-marker']` override is needed — the marker is
    // derivable from the displayName.
    //
    // `classname-overrides-win` (DECISIONS.md D9) is NOT applicable to this component, for
    // exactly the reason `component-handles-classname` is disabled below: the
    // consumer's `className` lands on the `root` slot, which is a `<Popover>` that renders no
    // DOM element, so no rendered element ever carries it. Both halves of that test — "the
    // consumer's className reaches the root slot" and "nothing follows it" — are unassertable
    // here rather than violated. Consumer overrides still win by cascade on every slot that
    // DOES render: `state.<slot>.className` is the last `clsx` argument on all three, and
    // unlayered consumer CSS beats every `@layer fui.*` rule (DECISIONS.md D2/D9).
    disabledTests: [
      // `root` is a `<Popover>`, which renders no DOM element of its own.
      'component-handles-ref',

      'component-has-root-ref',

      'component-handles-classname',

      'component-has-static-classnames-object',
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
