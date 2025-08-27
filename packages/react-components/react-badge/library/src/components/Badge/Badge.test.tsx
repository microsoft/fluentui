import * as React from 'react';
import { Badge } from './Badge';
import { render } from '@testing-library/react';

import { isConformant } from '../../testing/isConformant';

describe('Badge', () => {
  isConformant({
    Component: Badge,
    displayName: 'Badge',
    testOptions: {
      'has-static-classnames': [
        {
          props: { icon: 'Test Icon' },
        },
      ],
    },
  });

  /**
   * Note: see more visual regression tests for Badge in /apps/vr-tests.
   */
  it('renders a default state', () => {
    const { container } = render(<Badge>Default Badge</Badge>);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('applies icon margin classes when content is falsy but valid (e.g., 0)', () => {
    const TestIcon = () => <span data-testid="test-icon">icon</span>;
    const { container } = render(<Badge icon={<TestIcon />}>{0}</Badge>);
    const icon = container.querySelector('[data-testid="test-icon"]');
    const iconParent = icon?.parentElement;
    
    // Let's also test with normal text content to see the difference
    const { container: containerWithText } = render(<Badge icon={<TestIcon />}>text</Badge>);
    const iconWithText = containerWithText.querySelector('[data-testid="test-icon"]');
    const iconParentWithText = iconWithText?.parentElement;
    
    // The icon should have the same number of classes when content is 0 vs text (both should get margin classes)
    const classesWithZero = iconParent?.className.split(' ').length || 0;
    const classesWithText = iconParentWithText?.className.split(' ').length || 0;
    
    expect(classesWithZero).toBe(classesWithText);
  });

  it('does not apply icon margin classes when there is truly no content', () => {
    const TestIcon = () => <span data-testid="test-icon">icon</span>;
    const { container } = render(<Badge icon={<TestIcon />} />);
    const icon = container.querySelector('[data-testid="test-icon"]');
    const iconParent = icon?.parentElement;
    
    // The icon should not have margin classes when there is no content
    expect(iconParent?.className).not.toContain('beforeText');
  });

  it('handles other falsy but valid content like empty string', () => {
    const TestIcon = () => <span data-testid="test-icon">icon</span>;
    const { container } = render(<Badge icon={<TestIcon />}>{''}</Badge>);
    const icon = container.querySelector('[data-testid="test-icon"]');
    const iconParent = icon?.parentElement;
    
    // Compare with text content
    const { container: containerWithText } = render(<Badge icon={<TestIcon />}>text</Badge>);
    const iconWithText = containerWithText.querySelector('[data-testid="test-icon"]');
    const iconParentWithText = iconWithText?.parentElement;
    
    const classesWithEmptyString = iconParent?.className.split(' ').length || 0;
    const classesWithText = iconParentWithText?.className.split(' ').length || 0;
    
    expect(classesWithEmptyString).toBe(classesWithText);
  });

  it('does not apply icon margin classes for null and undefined content', () => {
    const TestIcon = () => <span data-testid="test-icon">icon</span>;
    
    // Test null content
    const { container: containerNull } = render(<Badge icon={<TestIcon />}>{null}</Badge>);
    const iconNull = containerNull.querySelector('[data-testid="test-icon"]');
    const iconParentNull = iconNull?.parentElement;
    
    // Test undefined content (no children)
    const { container: containerUndefined } = render(<Badge icon={<TestIcon />} />);
    const iconUndefined = containerUndefined.querySelector('[data-testid="test-icon"]');
    const iconParentUndefined = iconUndefined?.parentElement;
    
    const classesWithNull = iconParentNull?.className.split(' ').length || 0;
    const classesWithUndefined = iconParentUndefined?.className.split(' ').length || 0;
    
    // Both should have the same number of classes (no margin classes)
    expect(classesWithNull).toBe(classesWithUndefined);
    expect(classesWithNull).toBe(2); // Just base classes, no margin classes
  });
});
