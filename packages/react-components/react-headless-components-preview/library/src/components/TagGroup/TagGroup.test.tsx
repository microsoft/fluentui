import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { TagGroup } from './TagGroup';
import { Tag } from '../Tag';

describe('TagGroup', () => {
  isConformant({
    Component: TagGroup,
    displayName: 'TagGroup',
  });

  it('should invoke onDismiss when a child dismissible Tag is clicked', () => {
    const onDismiss = jest.fn();
    const { getByRole } = render(
      <TagGroup onDismiss={onDismiss}>
        <Tag value="1" dismissible>
          tag
        </Tag>
      </TagGroup>,
    );

    fireEvent.click(getByRole('button'));

    expect(onDismiss).toHaveBeenCalledWith(expect.anything(), { value: '1' });
  });

  it('sets data-disabled when disabled', () => {
    const { getByRole } = render(
      <TagGroup disabled>
        <Tag value="1">tag</Tag>
      </TagGroup>,
    );
    expect(getByRole('toolbar')).toHaveAttribute('data-disabled');
  });

  it('does NOT spread Tabster arrow-navigation attributes onto root (headless)', () => {
    const { getByRole } = render(
      <TagGroup>
        <Tag value="1">tag</Tag>
      </TagGroup>,
    );
    expect(getByRole('toolbar').getAttribute('data-tabster')).toBeNull();
  });
});
