import * as React from 'react';
import { render } from '@testing-library/react';
import { linkBehaviorDefinition, validateBehavior, ComponentTestFacade } from '@fluentui/a11y-testing';
import { isConformant } from '../../common/isConformant';
import { Link } from './Link';
import { LinkProps } from './Link.types';

describe('Link', () => {
  isConformant<LinkProps>({
    Component: Link,
    displayName: 'Link',
  });

  describe('meets accessibility requirements', () => {
    const testFacade = new ComponentTestFacade(Link, {});
    const errors = validateBehavior(linkBehaviorDefinition, testFacade);
    expect(errors).toEqual([]);

    afterAll(() => {
      // Reset body after behavioral checks are done
      document.body.innerHTML = '';
    });
  });

  describe('when rendered as an anchor', () => {
    it('renders correctly', () => {
      const result = render(<Link href="https://www.bing.com">This is a link</Link>);
      const anchor = result.getByRole('link');
      expect(anchor.tagName).toBe('A');

      expect(result.container).toMatchSnapshot();
    });

    it('can be focused', () => {
      const result = render(<Link href="https://www.bing.com">This is a link</Link>);
      const anchor = result.getByRole('link');

      expect(document.activeElement).not.toEqual(anchor);
      anchor.focus();
      expect(document.activeElement).toEqual(anchor);
    });

    it('cannot be focused when disabled has been passed to the component', () => {
      const result = render(
        <Link href="https://www.bing.com" disabled>
          This is a link
        </Link>,
      );
      const anchor = result.getByRole('link');

      expect(document.activeElement).not.toEqual(anchor);
      anchor.focus();
      expect(document.activeElement).not.toEqual(anchor);
    });

    it('can be focused when disabledFocusable has been passed to the component', () => {
      const result = render(
        <Link href="https://www.bing.com" disabledFocusable>
          This is a link
        </Link>,
      );
      const anchor = result.getByRole('link');

      expect(document.activeElement).not.toEqual(anchor);
      anchor.focus();
      expect(document.activeElement).toEqual(anchor);
    });
  });

  describe('when rendered as a button', () => {
    it('renders correctly', () => {
      const result = render(<Link>This is a link</Link>);
      const button = result.getByRole('button');
      expect(button.tagName).toBe('BUTTON');

      expect(result.container).toMatchSnapshot();
    });

    it('can be focused', () => {
      const result = render(<Link>This is a link</Link>);
      const button = result.getByRole('button');

      expect(document.activeElement).not.toEqual(button);
      button.focus();
      expect(document.activeElement).toEqual(button);
    });

    it('cannot be focused when rendered disabled has been passed to the component', () => {
      const result = render(<Link disabled>This is a link</Link>);
      const button = result.getByRole('button');

      expect(document.activeElement).not.toEqual(button);
      button.focus();
      expect(document.activeElement).not.toEqual(button);
    });

    it('can be focused when disabledFocusable has been passed to the component', () => {
      const result = render(<Link disabledFocusable>This is a link</Link>);
      const button = result.getByRole('button');

      expect(document.activeElement).not.toEqual(button);
      button.focus();
      expect(document.activeElement).toEqual(button);
    });
  });
});
