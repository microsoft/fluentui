import * as React from 'react';
import { Tag } from './Tag';
import { isConformant } from '../../testing/isConformant';
import { TagProps } from './Tag.types';
import { render } from '@testing-library/react';

const requiredProps: TagProps = {
  dismissible: true,
  icon: 'i',
  media: 'media',
  primaryText: 'Primary text',
  secondaryText: 'Secondary text',
};

describe('Tag', () => {
  isConformant<TagProps>({
    Component: Tag,
    displayName: 'Tag',
    requiredProps,
  });

  it('should render root as a span', () => {
    const { getByTestId } = render(<Tag data-testid="testid">Tag</Tag>);
    expect(getByTestId('testid').tagName).toBe('SPAN');
  });

  it('should render root as a button for dismissible tag', () => {
    const { queryByRole } = render(<Tag dismissible>Tag</Tag>);
    expect(queryByRole('button')).not.toBe(null);
  });
});
