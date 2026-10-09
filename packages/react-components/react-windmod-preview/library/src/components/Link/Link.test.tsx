import * as React from 'react';
import { render } from '@testing-library/react';

import { Link } from './Link';
import { isConformant } from '../../testing/isConformant';
import type { LinkState } from './Link.types';
import { linkClassNames, useLinkStyles } from './useLinkStyles';

import styles from './Link.module.css';

describe('Link', () => {
  isConformant({
    Component: Link,
    displayName: 'Link',
    requiredProps: { children: 'Link' },
  });

  it('stamps data-appearance and the marker class', () => {
    const { getByText } = render(
      <>
        <Link>Default</Link>
        <Link appearance="subtle">Subtle</Link>
      </>,
    );

    expect(getByText('Default').getAttribute('data-appearance')).toBe('default');
    expect(getByText('Subtle').getAttribute('data-appearance')).toBe('subtle');
    expect(getByText('Default').className).toContain(linkClassNames.root);
    expect(getByText('Default')).toHaveClass('fui-link');
    expect(getByText('Default')).toHaveClass('group/fui-link');
    expect(getByText('Default').classList[0]).toBe('fui-link');
  });

  it('stamps data-inline only when inline', () => {
    const { getByText } = render(
      <>
        <Link>Plain</Link>
        <Link inline>Inline</Link>
      </>,
    );

    expect(getByText('Plain').hasAttribute('data-inline')).toBe(false);
    expect(getByText('Inline').hasAttribute('data-inline')).toBe(true);
  });

  it('renders the element type the headless hook resolves', () => {
    const { getByText } = render(
      <>
        <Link>Button</Link>
        <Link href="https://example.com">Anchor</Link>
        <Link as="span">Span</Link>
      </>,
    );

    expect(getByText('Button').tagName).toBe('BUTTON');
    expect(getByText('Button').getAttribute('type')).toBe('button');
    expect(getByText('Anchor').tagName).toBe('A');
    expect(getByText('Anchor').getAttribute('tabindex')).toBe('0');
    expect(getByText('Span').tagName).toBe('SPAN');
    expect(getByText('Span').getAttribute('role')).toBe('button');
  });

  it('applies an element-type module class to exactly the roots that earn one', () => {
    const { getByText } = render(
      <>
        <Link href="https://example.com">Anchor</Link>
        <Link as="a">Anchor without href</Link>
        <Link>Button</Link>
        <Link as="span">Span</Link>
      </>,
    );

    expect(getByText('Anchor')).toHaveClass(styles.href);
    expect(getByText('Anchor')).not.toHaveClass(styles.button);
    expect(getByText('Button')).toHaveClass(styles.button);
    expect(getByText('Button')).not.toHaveClass(styles.href);
    expect(getByText('Anchor without href')).not.toHaveClass(styles.href);
    expect(getByText('Anchor without href')).not.toHaveClass(styles.button);
    expect(getByText('Span')).not.toHaveClass(styles.href);
    expect(getByText('Span')).not.toHaveClass(styles.button);
  });

  it('drops href from a disabled anchor', () => {
    const { getByText } = render(
      <Link as="a" href="https://example.com" disabled>
        Disabled anchor
      </Link>,
    );

    expect(getByText('Disabled anchor').tagName).toBe('A');
    expect(getByText('Disabled anchor').hasAttribute('href')).toBe(false);
    // The styles hook reads state.root after the headless hook strips href, so the anchor
    // falls back to the root font size — matching Griffel, which reads the same value.
    expect(getByText('Disabled anchor')).not.toHaveClass(styles.href);
  });

  it('receives data-disabled for both disabled and disabledFocusable', () => {
    const { getByText } = render(
      <>
        <Link>Enabled</Link>
        <Link disabled>Disabled</Link>
        <Link disabledFocusable>Disabled focusable</Link>
      </>,
    );

    // The CSS selects the disabled look through `data-disabled` alone; headless folds
    // disabledFocusable into it.
    expect(getByText('Enabled').hasAttribute('data-disabled')).toBe(false);
    expect(getByText('Disabled').hasAttribute('data-disabled')).toBe(true);
    expect(getByText('Disabled focusable').hasAttribute('data-disabled')).toBe(true);
    expect(getByText('Disabled').hasAttribute('data-disabled-focusable')).toBe(false);
    expect(getByText('Disabled focusable').hasAttribute('data-disabled-focusable')).toBe(true);
  });

  it('does not mutate the state it is given', () => {
    const state = {
      appearance: 'default',
      components: { root: 'a' },
      disabled: false,
      disabledFocusable: false,
      inline: false,
      root: { as: 'a', href: 'https://example.com', className: 'consumer' },
    } as unknown as LinkState;

    const styled = useLinkStyles(state);

    expect(styled).not.toBe(state);
    expect(state.root).not.toHaveProperty('data-appearance');
    expect(state.root.className).toBe('consumer');
    expect(styled.root.className).toContain('consumer');
  });
});
