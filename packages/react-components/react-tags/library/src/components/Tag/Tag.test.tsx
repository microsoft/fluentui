import * as React from 'react';
import { Tag } from './Tag';
import { isConformant } from '../../testing/isConformant';
import type { TagProps } from './Tag.types';
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

describe('Tag DOM attributes', () => {
  it('does not render component props as DOM attributes', () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => undefined);
    const { container } = render(
      <Tag
        appearance="brand"
        disabled
        dismissIcon="d"
        icon="i"
        media="m"
        primaryText="p"
        secondaryText="s"
        selected
        shape="circular"
        size="small"
        value="tag-value"
      />,
    );

    expect(consoleError).not.toHaveBeenCalled();
    consoleError.mockRestore();
    expect((container.firstElementChild as HTMLElement).getAttributeNames().sort()).toEqual([
      'aria-pressed',
      'class',
      'id',
    ]);
  });

  it('renders disabled on a dismissible root', () => {
    const { container } = render(<Tag dismissible disabled value="tag-value" />);

    expect((container.firstElementChild as HTMLElement).getAttributeNames().sort()).toEqual([
      'class',
      'disabled',
      'id',
      'type',
    ]);
  });

  it('renders disabled on a button root override', () => {
    const { getByRole } = render(<Tag as="button" disabled />);

    expect((getByRole('button') as HTMLButtonElement).disabled).toBe(true);
  });

  it('does not render disabled on a span root override', () => {
    const { getByTestId } = render(<Tag as="span" dismissible disabled data-testid="tag" />);

    expect(getByTestId('tag').tagName).toBe('SPAN');
    expect(getByTestId('tag').hasAttribute('disabled')).toBe(false);
  });
});
