import * as React from 'react';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Tag, tagClassNames } from './';

expect.extend(toHaveNoViolations);

describe('Tag', () => {
  it('has the expected display name and forwards its ref', () => {
    const ref = React.createRef<HTMLSpanElement>();
    render(<Tag ref={ref}>Tag</Tag>);

    expect(Tag.displayName).toBe('Tag');
    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
  });

  it('has no axe violations', async () => {
    const { baseElement } = render(<Tag>Accessible tag</Tag>);

    expect(await axe(baseElement, { rules: { region: { enabled: false } } })).toHaveNoViolations();
  });

  it('renders default visual state and stable classes', () => {
    const { getByText } = render(<Tag>Default tag</Tag>);
    const root = getByText('Default tag').closest(`.${tagClassNames.root}`);

    expect(root).toHaveAttribute('data-appearance', 'filled');
    expect(root).toHaveAttribute('data-shape', 'rounded');
    expect(root).toHaveAttribute('data-size', 'medium');
  });

  it('maps visual props and preserves consumer classes', () => {
    const { getByRole } = render(
      <Tag appearance="brand" className="consumer-class" dismissible shape="circular" size="small">
        Custom tag
      </Tag>,
    );
    const root = getByRole('button');

    expect(root).toHaveAttribute('data-appearance', 'brand');
    expect(root).toHaveAttribute('data-shape', 'circular');
    expect(root).toHaveAttribute('data-size', 'small');
    expect(root).toHaveClass(tagClassNames.root, 'consumer-class');
    expect(root.querySelector('[data-default-icon]')).not.toBeNull();
  });
});
