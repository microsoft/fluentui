import * as React from 'react';
import { render } from '@testing-library/react';
import { linkBehaviorDefinition, validateBehavior, ComponentTestFacade } from '@fluentui/a11y-testing';
import { isConformant } from '../../common/isConformant';
import { Link } from './Link';
import { LinkProps } from './Link.types';

describe('Link', () => {
  const testId = 'test-anchor';

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

  it('renders as a button if no href is provided', () => {
    const result = render(<Link data-testid={testId}>This is a link</Link>);
    const button = result.getByTestId(testId);
    expect(button.tagName).toBe('BUTTON');

    expect(result.container).toMatchSnapshot();
  });

  it('renders as an anchor when href is provided', () => {
    const result = render(
      <Link data-testid={testId} href="https://www.bing.com">
        This is a link
      </Link>,
    );
    const anchor = result.getByTestId(testId);
    expect(anchor.tagName).toBe('A');

    expect(result.container).toMatchSnapshot();
  });

  it('can be focused when rendered as an anchor', () => {
    const rootRef = React.createRef<HTMLAnchorElement>();

    render(
      <Link href="https://www.bing.com" ref={rootRef}>
        This is a link
      </Link>,
    );

    expect(typeof rootRef.current).toEqual('object');
    expect(document.activeElement).not.toEqual(rootRef.current);

    rootRef.current?.focus();

    expect(document.activeElement).toEqual(rootRef.current);
  });

  it('can be focused when rendered as a button', () => {
    const rootRef = React.createRef<HTMLAnchorElement>();

    render(<Link ref={rootRef}>This is a link</Link>);

    expect(typeof rootRef.current).toEqual('object');
    expect(document.activeElement).not.toEqual(rootRef.current);

    rootRef.current?.focus();

    expect(document.activeElement).toEqual(rootRef.current);
  });

  it('cannot be focused when rendered as an anchor and disabled has been passed to the component', () => {
    const rootRef = React.createRef<HTMLAnchorElement>();

    render(
      <Link href="https://www.bing.com" disabled ref={rootRef}>
        This is a link
      </Link>,
    );

    expect(typeof rootRef.current).toEqual('object');
    expect(document.activeElement).not.toEqual(rootRef.current);

    rootRef.current?.focus();

    expect(document.activeElement).not.toEqual(rootRef.current);
  });

  it('cannot be focused when rendered as a button and disabled has been passed to the component', () => {
    const rootRef = React.createRef<HTMLAnchorElement>();

    render(
      <Link disabled ref={rootRef}>
        This is a link
      </Link>,
    );

    expect(typeof rootRef.current).toEqual('object');
    expect(document.activeElement).not.toEqual(rootRef.current);

    rootRef.current?.focus();

    expect(document.activeElement).not.toEqual(rootRef.current);
  });

  it('can be focused when rendered as an anchor and disabledFocusable has been passed to the component', () => {
    const rootRef = React.createRef<HTMLAnchorElement>();

    render(
      <Link href="https://www.bing.com" disabledFocusable ref={rootRef}>
        This is a link
      </Link>,
    );

    expect(typeof rootRef.current).toEqual('object');
    expect(document.activeElement).not.toEqual(rootRef.current);

    rootRef.current?.focus();

    expect(document.activeElement).toEqual(rootRef.current);
  });

  it('can be focused when rendered as a button and disabledFocusable has been passed to the component', () => {
    const rootRef = React.createRef<HTMLAnchorElement>();

    render(
      <Link disabledFocusable ref={rootRef}>
        This is a link
      </Link>,
    );

    expect(typeof rootRef.current).toEqual('object');
    expect(document.activeElement).not.toEqual(rootRef.current);

    rootRef.current?.focus();

    expect(document.activeElement).toEqual(rootRef.current);
  });
});
