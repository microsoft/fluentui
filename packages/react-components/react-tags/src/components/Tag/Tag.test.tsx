import * as React from 'react';
import { Tag } from './Tag';
import { isConformant } from '../../testing/isConformant';
import { TagProps } from './Tag.types';
import { render } from '@testing-library/react';
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
  });

  it('should render root as a button', () => {
    const { getByRole } = render(<Tag>Tag</Tag>);
    expect(getByRole('button').className.includes(tagClassNames.root)).toBe(true);
  });
});
