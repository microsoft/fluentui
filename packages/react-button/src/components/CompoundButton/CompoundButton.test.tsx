import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { isConformant } from '../../common/isConformant';
import { CompoundButton } from './CompoundButton';
import { CompoundButtonProps } from './CompoundButton.types';

describe('CompoundButton', () => {
  isConformant({
    Component: CompoundButton as React.FunctionComponent<CompoundButtonProps>,
    displayName: 'CompoundButton',
  });

  describe('when rendered as a button', () => {
    it('renders correctly', () => {
      const result = render(<CompoundButton>This is a button</CompoundButton>);
      const button = result.getByRole('button');

      expect(button).toBeTruthy();
      expect(button.tagName).toBe('BUTTON');
    });

    it('can be focused', () => {
      const result = render(<CompoundButton>This is a button</CompoundButton>);
      const button = result.getByRole('button');

      expect(document.activeElement).not.toEqual(button);
      button.focus();
      expect(document.activeElement).toEqual(button);
    });

    it('cannot be focused when disabled has been passed to the component', () => {
      const result = render(<CompoundButton disabled>This is a button</CompoundButton>);
      const button = result.getByRole('button');

      expect(document.activeElement).not.toEqual(button);
      button.focus();
      expect(document.activeElement).not.toEqual(button);
    });

    it('can be focused when disabledFocusable has been passed to the component', () => {
      const result = render(<CompoundButton disabledFocusable>This is a button</CompoundButton>);
      const button = result.getByRole('button');

      expect(document.activeElement).not.toEqual(button);
      button.focus();
      expect(document.activeElement).toEqual(button);
    });

    it('can trigger a function by being clicked', () => {
      const onClick = jest.fn();
      const result = render(<CompoundButton onClick={onClick}>This is a button</CompoundButton>);

      fireEvent.click(result.getByRole('button'));
      expect(onClick).toHaveBeenCalled();
    });

    it('does not trigger a function by being clicked when disabled has been passed to the component', () => {
      const onClick = jest.fn();
      const result = render(
        <CompoundButton disabled onClick={onClick}>
          This is a button
        </CompoundButton>,
      );

      fireEvent.click(result.getByRole('button'));
      expect(onClick).not.toHaveBeenCalled();
    });

    it('does not trigger a function by being clicked when disabledFocusable has been passed to the component', () => {
      const onClick = jest.fn();
      const result = render(
        <CompoundButton disabledFocusable onClick={onClick}>
          This is a button
        </CompoundButton>,
      );

      fireEvent.click(result.getByRole('button'));
      expect(onClick).not.toHaveBeenCalled();
    });
  });

  describe('when rendered as an anchor', () => {
    it('renders correctly', () => {
      const result = render(
        <CompoundButton as="a" href="https://www.bing.com">
          This is a button
        </CompoundButton>,
      );
      const anchor = result.getByRole('button');

      expect(anchor).toBeTruthy();
      expect(anchor.tagName).toBe('A');
    });

    it('can be focused', () => {
      const result = render(
        <CompoundButton as="a" href="https://www.bing.com">
          This is a button
        </CompoundButton>,
      );
      const anchor = result.getByRole('button');

      expect(document.activeElement).not.toEqual(anchor);
      anchor.focus();
      expect(document.activeElement).toEqual(anchor);
    });

    it('cannot be focused when disabled has been passed to the component', () => {
      const result = render(
        <CompoundButton as="a" disabled href="https://www.bing.com">
          This is a button
        </CompoundButton>,
      );
      const anchor = result.getByRole('button');

      expect(document.activeElement).not.toEqual(anchor);
      anchor.focus();
      expect(document.activeElement).not.toEqual(anchor);
    });

    it('can be focused when disabledFocusable has been passed to the component', () => {
      const result = render(
        <CompoundButton as="a" disabledFocusable href="https://www.bing.com">
          This is a button
        </CompoundButton>,
      );
      const anchor = result.getByRole('button');

      expect(document.activeElement).not.toEqual(anchor);
      anchor.focus();
      expect(document.activeElement).toEqual(anchor);
    });
  });
});
