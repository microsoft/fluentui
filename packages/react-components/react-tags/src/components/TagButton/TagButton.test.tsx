import * as React from 'react';
import { TagButton } from './TagButton';
import { isConformant } from '../../testing/isConformant';
import { render, fireEvent } from '@testing-library/react';

const requiredProps = {
  media: 'media',
  icon: 'i',
  primaryText: 'Primary text',
  secondaryText: 'Secondary text',
  dismissible: true,
};

describe('TagButton', () => {
  isConformant({
    Component: TagButton,
    displayName: 'TagButton',
    requiredProps,
    disabledTests: [
      // onDismiss: A second (data) argument is not needed
      'consistent-callback-args',
    ],
  });

  it('should invoke onDismiss on dismiss button click', () => {
    const onDismiss = jest.fn();
    const { getByTestId } = render(
      <TagButton dismissible onDismiss={onDismiss} dismissButton={<div data-testid="foo" />}>
        Tag
      </TagButton>,
    );

    fireEvent.click(getByTestId('foo'));

    expect(onDismiss).toHaveBeenCalledTimes(1);
  });

  it('should invoke onDismiss on dismiss button delete keyDown', () => {
    const onDismiss = jest.fn();
    const { getByTestId } = render(
      <TagButton dismissible onDismiss={onDismiss} dismissButton={<div data-testid="foo" />}>
        Tag
      </TagButton>,
    );

    fireEvent.keyDown(getByTestId('foo'), { key: 'Delete' });

    expect(onDismiss).toHaveBeenCalledTimes(1);
  });
});
