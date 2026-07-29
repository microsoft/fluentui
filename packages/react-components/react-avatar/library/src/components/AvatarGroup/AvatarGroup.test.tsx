import * as React from 'react';
import { CLASSNAME_OVERRIDES_WIN_TEST_NAME, classNameOverridesWin } from '@fluentui/react-conformance';
import { AvatarGroup } from './AvatarGroup';
import { AvatarGroupItem } from '../AvatarGroupItem';
import { isConformant } from '../../testing/isConformant';
import { AvatarGroupPopover } from '../AvatarGroupPopover/AvatarGroupPopover';
import { render, screen } from '@testing-library/react';

describe('AvatarGroup', () => {
  isConformant({
    Component: AvatarGroup,
    displayName: 'AvatarGroup',
    // `make-styles-overrides-win` was already disabled here before the Griffel → Tailwind +
    // CSS Modules migration (migration/griffel-to-tailwind). It is now doubly inapplicable:
    // the hook composes with clsx and never calls mergeClasses, so the mock the test
    // installs is never hit. `classname-overrides-win` is its cascade-native replacement —
    // consumer `className` last on the root, with unlayered consumer CSS beating the
    // `@layer fui.*` rules (DECISIONS.md D2/D9).
    //
    // `component-has-static-classnames-object` is disabled because AvatarGroup no longer
    // publishes BEM statics (DECISIONS.md D16.1). Its sub-tests hard-code the
    // `fui-AvatarGroup` format (defaultTests.tsx:244-245, 277), so it fails under the
    // retained-constant policy just as it would under outright deletion (D16.6).
    // `component-has-group-marker` (now a default test) is its replacement.
    disabledTests: ['make-styles-overrides-win', 'component-has-static-classnames-object'],
    extraTests: {
      [CLASSNAME_OVERRIDES_WIN_TEST_NAME]: classNameOverridesWin,
    },
    requiredProps: {
      children: (
        <>
          <AvatarGroupItem name="Mona Kane" />
          <AvatarGroupItem name="Allan Munger" />
          <AvatarGroupItem name="Daisy Phillips" />
          <AvatarGroupItem name="Robert Tolbert" />
          <AvatarGroupItem name="Kevin Sturgis" />
          <AvatarGroupPopover>
            <AvatarGroupItem name="Allan Munger" />
            <AvatarGroupItem name="Daisy Phillips" />
            <AvatarGroupItem name="Robert Tolbert" />
            <AvatarGroupItem name="Kevin Sturgis" />
          </AvatarGroupPopover>
        </>
      ),
    },
  });

  it('renders an icon overflow indicator when size is less than 24', () => {
    render(
      <AvatarGroup size={16}>
        <AvatarGroupItem name="Mona Kane" />
        <AvatarGroupItem name="Allan Munger" />
        <AvatarGroupItem name="Daisy Phillips" />
        <AvatarGroupItem name="Robert Tolbert" />
        <AvatarGroupPopover>
          <AvatarGroupItem name="Allan Munger" />
          <AvatarGroupItem name="Daisy Phillips" />
          <AvatarGroupItem name="Robert Tolbert" />
          <AvatarGroupItem name="Kevin Sturgis" />
        </AvatarGroupPopover>
      </AvatarGroup>,
    );

    expect(screen.getByRole('button').textContent).toBe('');
  });
});
