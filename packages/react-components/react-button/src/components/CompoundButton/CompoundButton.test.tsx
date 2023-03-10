import * as React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { isConformant } from '../../testing/isConformant';
import { CompoundButton } from './CompoundButton';
import { CompoundButtonProps } from './CompoundButton.types';

describe('CompoundButton', () => {
  isConformant({
    Component: CompoundButton as React.FunctionComponent<CompoundButtonProps>,
    displayName: 'CompoundButton',
    testOptions: {
      'has-static-classnames': [
        {
          props: {
            icon: 'Test Icon',
            children: 'Test Children',
            secondaryContent: 'Test Secondary Content',
          },
        },
      ],
    },
  });

  describe('when rendered as a button', () => {
    it('renders correctly', () => {
      const { getByRole } = render(<CompoundButton>This is a button</CompoundButton>);
      const button = getByRole('button');

      expect(button.tagName).toBe('BUTTON');
    });

    it('renders secondaryContent even if no primary content was passed', () => {
      const secondaryContentText = 'Secondary content';
      const { queryByText } = render(<CompoundButton icon="Test icon" secondaryContent={secondaryContentText} />);
      expect(queryByText(secondaryContentText)).toBeTruthy();
    });

    it('can be focused', () => {
      const { getByRole } = render(<CompoundButton>This is a button</CompoundButton>);
      const button = getByRole('button');

      expect(document.activeElement).not.toEqual(button);
      userEvent.tab();
      expect(document.activeElement).toEqual(button);
    });

    it('cannot be focused when disabled has been passed to the component', () => {
      const { getByRole } = render(<CompoundButton disabled>This is a button</CompoundButton>);
      const button = getByRole('button');

      expect(document.activeElement).not.toEqual(button);
      userEvent.tab();
      expect(document.activeElement).not.toEqual(button);
    });

    it('can be focused when disabledFocusable has been passed to the component', () => {
      const { getByRole } = render(<CompoundButton disabledFocusable>This is a button</CompoundButton>);
      const button = getByRole('button');

      expect(document.activeElement).not.toEqual(button);
      userEvent.tab();
      expect(document.activeElement).toEqual(button);
    });

    it('can trigger a function by being clicked', () => {
      const onClick = jest.fn();
      const { getByRole } = render(<CompoundButton onClick={onClick}>This is a button</CompoundButton>);

      userEvent.click(getByRole('button'));
      expect(onClick).toHaveBeenCalled();
    });

    it('does not trigger a function by being clicked when disabled has been passed to the component', () => {
      const onClick = jest.fn();
      const { getByRole } = render(
        <CompoundButton disabled onClick={onClick}>
          This is a button
        </CompoundButton>,
      );

      userEvent.click(getByRole('button'));
      expect(onClick).not.toHaveBeenCalled();
    });

    it('does not trigger a function by being clicked when disabledFocusable has been passed to the component', () => {
      const onClick = jest.fn();
      const { getByRole } = render(
        <CompoundButton disabledFocusable onClick={onClick}>
          This is a button
        </CompoundButton>,
      );

      userEvent.click(getByRole('button'));
      expect(onClick).not.toHaveBeenCalled();
    });
  });

  describe('when rendered as an anchor', () => {
    it('renders correctly', () => {
      const { getByRole } = render(
        <CompoundButton as="a" href="https://www.bing.com">
          This is a button
        </CompoundButton>,
      );
      const anchor = getByRole('button');

      expect(anchor.tagName).toBe('A');
    });

    it('can be focused', () => {
      const { getByRole } = render(
        <CompoundButton as="a" href="https://www.bing.com">
          This is a button
        </CompoundButton>,
      );
      const anchor = getByRole('button');

      expect(document.activeElement).not.toEqual(anchor);
      anchor.focus();
      expect(document.activeElement).toEqual(anchor);
    });

    it('cannot be focused when disabled has been passed to the component', () => {
      const { getByRole } = render(
        <CompoundButton as="a" disabled href="https://www.bing.com">
          This is a button
        </CompoundButton>,
      );
      const anchor = getByRole('button');

      expect(document.activeElement).not.toEqual(anchor);
      anchor.focus();
      expect(document.activeElement).not.toEqual(anchor);
    });

    it('can be focused when disabledFocusable has been passed to the component', () => {
      const { getByRole } = render(
        <CompoundButton as="a" disabledFocusable href="https://www.bing.com">
          This is a button
        </CompoundButton>,
      );
      const anchor = getByRole('button');

      expect(document.activeElement).not.toEqual(anchor);
      anchor.focus();
      expect(document.activeElement).toEqual(anchor);
    });
  });
});
