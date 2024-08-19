import '@testing-library/jest-dom';
import * as React from 'react';
import { TagGroup } from './TagGroup';
import { isConformant } from '../../testing/isConformant';
import { render, fireEvent } from '@testing-library/react';
import { Tag } from '../Tag/index';

describe('TagGroup', () => {
  isConformant({
    Component: TagGroup,
    displayName: 'TagGroup',
  });

  it('should invoke onDismiss when clicking on children Tag', () => {
    const onDismiss = jest.fn();
    const { getByRole } = render(
      <TagGroup onDismiss={onDismiss}>
        <Tag value={'1'} dismissible />
      </TagGroup>,
    );

    fireEvent.click(getByRole('button'));

    expect(onDismiss).toHaveBeenCalledWith(expect.anything(), { value: '1' });
  });

  it('should invoke onDismiss on children Tag delete keyDown', () => {
    const onDismiss = jest.fn();
    const { getByRole } = render(
      <TagGroup onDismiss={onDismiss}>
        <Tag value={'1'} dismissible />
      </TagGroup>,
    );

    fireEvent.keyDown(getByRole('button'), { key: 'Delete' });

    expect(onDismiss).toHaveBeenCalledWith(expect.anything(), { value: '1' });
  });

  it('if disabled, should disable children Tags', () => {
    const { getByRole } = render(
      <TagGroup disabled>
        <Tag value={'1'} dismissible />
      </TagGroup>,
    );

    expect(getByRole('button')).toBeDisabled();
  });

  it('if disabled, should override children Tags disabled prop', () => {
    const { getByRole } = render(
      <TagGroup disabled>
        <Tag value={'1'} disabled={false} dismissible />
      </TagGroup>,
    );

    expect(getByRole('button')).toBeDisabled();
  });
});
