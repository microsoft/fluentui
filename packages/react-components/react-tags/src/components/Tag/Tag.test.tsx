import * as React from 'react';
import { Tag } from './Tag';
import { isConformant } from '../../testing/isConformant';
import { TagProps } from './Tag.types';
import { render, fireEvent } from '@testing-library/react';
import { tagClassNames } from './useTagStyles.styles';

const requiredProps: TagProps = {
  dismissible: true,
  icon: 'i',
  media: 'media',
  primaryText: 'Primary text',
  secondaryText: 'Secondary text',
};

describe('Tag', () => {
  isConformant({
    Component: Tag,
    displayName: 'Tag',
    requiredProps,
    disabledTests: [
      // onDismiss: A second (data) argument is not needed
      'consistent-callback-args',
    ],
  });

  it('should render root as a button', () => {
    const { getByRole } = render(<Tag>Tag</Tag>);
    expect(getByRole('button').className.includes(tagClassNames.root)).toBe(true);
  });

  it('should invoke onDismiss on click', () => {
    const onDismiss = jest.fn();
    const { getByRole } = render(
      <Tag dismissible onDismiss={onDismiss}>
        Tag
      </Tag>,
    );

    fireEvent.click(getByRole('button'));

    expect(onDismiss).toHaveBeenCalledTimes(1);
  });

  it('should invoke onDismiss on delete keyDown', () => {
    const onDismiss = jest.fn();
    const { getByRole } = render(
      <Tag dismissible onDismiss={onDismiss}>
        Tag
      </Tag>,
    );

    fireEvent.keyDown(getByRole('button'), { key: 'Delete' });

    expect(onDismiss).toHaveBeenCalledTimes(1);
  });
});
