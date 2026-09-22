import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { Tag } from '../Tag';
import { TagGroup, tagGroupClassNames } from './';

describe('TagGroup', () => {
  it('has the expected display name and forwards its ref', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<TagGroup ref={ref} />);

    expect(TagGroup.displayName).toBe('TagGroup');
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('renders defaults and preserves consumer classes', () => {
    const { getByRole } = render(<TagGroup className="consumer-class" role="group" />);
    const root = getByRole('group');

    expect(root).toHaveClass(tagGroupClassNames.root, 'consumer-class');
    expect(root).toHaveAttribute('data-appearance', 'filled');
    expect(root).toHaveAttribute('data-size', 'medium');
  });

  it('provides visual and behavioral state to child tags', () => {
    const onDismiss = jest.fn();
    const { getByRole } = render(
      <TagGroup appearance="outline" disabled onDismiss={onDismiss} size="small">
        <Tag dismissible value="tag-1">
          Tag
        </Tag>
      </TagGroup>,
    );
    const tag = getByRole('button');

    expect(tag).toBeDisabled();
    expect(tag).toHaveAttribute('data-appearance', 'outline');
    expect(tag).toHaveAttribute('data-size', 'small');
    fireEvent.click(tag);
    expect(onDismiss).not.toHaveBeenCalled();
  });
});
