import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { mount, ReactWrapper } from 'enzyme';
import { linkBehaviorDefinition, validateBehavior, ComponentTestFacade } from '@fluentui/a11y-testing';
import { isConformant } from '../../common/isConformant';
import { Link } from './Link';
import { LinkProps } from './Link.types';

describe('Link', () => {
  let wrapper: ReactWrapper | undefined;

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount();
      wrapper = undefined;
    }
  });

  isConformant<LinkProps>({
    Component: Link,
    displayName: 'Link',
  });

  describe('AccessibilityLinkBehavior', () => {
    const testFacade = new ComponentTestFacade(Link, {});
    const errors = validateBehavior(linkBehaviorDefinition, testFacade);
    expect(errors).toEqual([]);
  });

  it('renders as a button if no href is provided', () => {
    const component = renderer.create(<Link>This is a link</Link>);
    const button = component.root.findAllByType('button');
    const anchor = component.root.findAllByType('a');
    expect(button.length).toBe(1);
    expect(anchor.length).toBe(0);

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders as an anchor when href is provided', () => {
    const component = renderer.create(<Link href="https://www.bing.com">This is a link</Link>);
    const button = component.root.findAllByType('button');
    const anchor = component.root.findAllByType('a');
    expect(button.length).toBe(0);
    expect(anchor.length).toBe(1);

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('can be focused when rendered as an anchor', () => {
    const rootRef = React.createRef<HTMLAnchorElement>();

    wrapper = mount(
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

    wrapper = mount(<Link ref={rootRef}>This is a link</Link>);

    expect(typeof rootRef.current).toEqual('object');
    expect(document.activeElement).not.toEqual(rootRef.current);

    rootRef.current?.focus();

    expect(document.activeElement).toEqual(rootRef.current);
  });
});
