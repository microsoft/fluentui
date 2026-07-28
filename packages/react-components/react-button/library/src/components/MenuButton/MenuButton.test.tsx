import * as React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CLASSNAME_OVERRIDES_WIN_TEST_NAME, classNameOverridesWin } from '@fluentui/react-conformance';
import { isConformant } from '../../testing/isConformant';
import { MenuButton } from './MenuButton';
import type { MenuButtonProps } from './MenuButton.types';
import { menuButtonClassNames } from './useMenuButtonStyles.styles';

describe('MenuButton', () => {
  isConformant({
    Component: MenuButton as React.FunctionComponent<MenuButtonProps>,
    displayName: 'MenuButton',
    // Griffel → Tailwind + CSS Modules migration (migration/griffel-to-tailwind).
    // `make-styles-overrides-win` jest-mocks `@griffel/react`'s mergeClasses and asserts
    // it was called with the consumer className last; this component now composes with
    // clsx and never calls mergeClasses, so the test can no longer observe the contract.
    // `classname-overrides-win` below is its cascade-native replacement (DECISIONS.md D9).
    disabledTests: ['make-styles-overrides-win'],
    extraTests: { [CLASSNAME_OVERRIDES_WIN_TEST_NAME]: classNameOverridesWin },
    testOptions: {
      'has-static-classnames': [
        {
          props: {
            icon: 'Test Icon',
            menuIcon: 'Test MenuIcon',
          },
          expectedClassNames: {
            root: menuButtonClassNames.root,
            icon: menuButtonClassNames.icon,
          },
        },
        {
          props: {
            menuIcon: 'Test MenuIcon',
          },
          expectedClassNames: {
            root: menuButtonClassNames.root,
            menuIcon: menuButtonClassNames.menuIcon,
          },
        },
      ],
    },
  });

  describe('when rendered as a button', () => {
    it('renders correctly', () => {
      const { getByRole } = render(<MenuButton>This is a button</MenuButton>);
      const button = getByRole('button');

      expect(button.tagName).toBe('BUTTON');
    });

    it('can be focused', () => {
      const { getByRole } = render(<MenuButton>This is a button</MenuButton>);
      const button = getByRole('button');

      expect(document.activeElement).not.toEqual(button);
      userEvent.tab();
      expect(document.activeElement).toEqual(button);
    });

    it('cannot be focused when disabled has been passed to the component', () => {
      const { getByRole } = render(<MenuButton disabled>This is a button</MenuButton>);
      const button = getByRole('button');

      expect(document.activeElement).not.toEqual(button);
      userEvent.tab();
      expect(document.activeElement).not.toEqual(button);
    });

    it('can be focused when disabledFocusable has been passed to the component', () => {
      const { getByRole } = render(<MenuButton disabledFocusable>This is a button</MenuButton>);
      const button = getByRole('button');

      expect(document.activeElement).not.toEqual(button);
      userEvent.tab();
      expect(document.activeElement).toEqual(button);
    });

    it('can trigger a function by being clicked', () => {
      const onClick = jest.fn();
      const { getByRole } = render(<MenuButton onClick={onClick}>This is a button</MenuButton>);

      userEvent.click(getByRole('button'));
      expect(onClick).toHaveBeenCalled();
    });

    it('does not trigger a function by being clicked when disabled has been passed to the component', () => {
      const onClick = jest.fn();
      const { getByRole } = render(
        <MenuButton disabled onClick={onClick}>
          This is a button
        </MenuButton>,
      );

      userEvent.click(getByRole('button'));
      expect(onClick).not.toHaveBeenCalled();
    });

    it('does not trigger a function by being clicked when disabledFocusable has been passed to the component', () => {
      const onClick = jest.fn();
      const { getByRole } = render(
        <MenuButton disabledFocusable onClick={onClick}>
          This is a button
        </MenuButton>,
      );

      userEvent.click(getByRole('button'));
      expect(onClick).not.toHaveBeenCalled();
    });
  });

  describe('when rendered as an anchor', () => {
    it('renders correctly', () => {
      const { getByRole } = render(
        <MenuButton as="a" href="https://www.bing.com">
          This is a button
        </MenuButton>,
      );
      const anchor = getByRole('link');

      expect(anchor.tagName).toBe('A');
    });

    it('can be focused', () => {
      const { getByRole } = render(
        <MenuButton as="a" href="https://www.bing.com">
          This is a button
        </MenuButton>,
      );
      const anchor = getByRole('link');

      expect(document.activeElement).not.toEqual(anchor);
      anchor.focus();
      expect(document.activeElement).toEqual(anchor);
    });

    it('cannot be focused when disabled has been passed to the component', () => {
      const { getByRole } = render(
        <MenuButton as="a" disabled href="https://www.bing.com">
          This is a button
        </MenuButton>,
      );
      const anchor = getByRole('link');

      expect(document.activeElement).not.toEqual(anchor);
      anchor.focus();
      expect(document.activeElement).not.toEqual(anchor);
    });

    it('can be focused when disabledFocusable has been passed to the component', () => {
      const { getByRole } = render(
        <MenuButton as="a" disabledFocusable href="https://www.bing.com">
          This is a button
        </MenuButton>,
      );
      const anchor = getByRole('link');

      expect(document.activeElement).not.toEqual(anchor);
      anchor.focus();
      expect(document.activeElement).toEqual(anchor);
    });
  });
});
