import * as React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { linkBehaviorDefinition, validateBehavior, ComponentTestFacade } from '@fluentui/a11y-testing';
import { isConformant } from '../../testing/isConformant';
import { Link } from './Link';
import { LinkProps } from './Link.types';
import { Enter } from '@fluentui/keyboard-keys';

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

    it('allows overriding "tabIndex"', () => {
      const result = render(
        <Link href="https://www.bing.com" tabIndex={-1}>
          This is a link
        </Link>,
      );
      const link = result.getByRole('link');

      expect(link.getAttribute('tabIndex')).toBe('-1');
    });

    it('allows overriding "role"', () => {
      const result = render(
        <Link href="https://www.bing.com" role="button">
          This is a link
        </Link>,
      );
      expect(result.queryAllByRole('link')).toHaveLength(0);
      expect(result.queryAllByRole('button')).toHaveLength(1);
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

    it('allows overriding "tabIndex"', () => {
      const result = render(<Link tabIndex={-1}>This is a link</Link>);
      const button = result.getByRole('button');

      expect(button.getAttribute('tabIndex')).toBe('-1');
    });

    it('allows overriding "role"', () => {
      const result = render(
        <Link href="https://www.bing.com" role="presentation">
          This is a link
        </Link>,
      );
      expect(result.queryAllByRole('link')).toHaveLength(0);
      expect(result.queryAllByRole('presentation')).toHaveLength(1);
    });

    describe('when rendered as span', () => {
      it('should call onClick by pressing Enter', () => {
        const onClick = jest.fn();

        render(
          <Link as="span" onClick={onClick}>
            This is a buttonlink
          </Link>,
        );

        userEvent.tab();
        userEvent.keyboard('{Enter}');

        expect(onClick).toHaveBeenCalledTimes(1);
      });

      it('should trigger onClick once via onKeyDown', () => {
        const onClick = jest.fn();

        render(
          <Link
            as="span"
            onClick={onClick}
            onKeyDown={ev => {
              if (ev.key === Enter) {
                ev.currentTarget.click();
              }
            }}
          >
            This is a buttonlink
          </Link>,
        );

        userEvent.tab();
        userEvent.keyboard('{Enter}');

        expect(onClick).toHaveBeenCalledTimes(1);
      });

      it('should not trigger onClick', () => {
        const onClick = jest.fn();
        const onKeyDown = jest.fn();

        render(
          <Link as="span" onClick={onClick} onKeyDown={onKeyDown}>
            This is a buttonlink
          </Link>,
        );

        userEvent.tab();
        userEvent.keyboard('{Enter}');

        expect(onClick).toHaveBeenCalledTimes(0);
        expect(onKeyDown).toHaveBeenCalledTimes(1);
      });
    });
  });
});
