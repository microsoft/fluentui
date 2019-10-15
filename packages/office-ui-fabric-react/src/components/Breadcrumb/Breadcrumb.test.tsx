import * as React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import * as renderer from 'react-test-renderer';
import { Breadcrumb, IBreadcrumbItem } from './index';
import { Icon } from '../Icon/Icon';

describe('Breadcrumb', () => {
  const items: IBreadcrumbItem[] = [
    { text: 'TestText1', key: 'TestKey1' },
    { text: 'TestText2', key: 'TestKey2' },
    { text: 'TestText3', key: 'TestKey3' },
    { text: 'TestText4', key: 'TestKey4' }
  ];

  let component: renderer.ReactTestRenderer | undefined;
  let wrapper: ReactWrapper | undefined;

  afterEach(() => {
    if (component) {
      component.unmount();
      component = undefined;
    }
    if (wrapper) {
      wrapper.unmount();
      wrapper = undefined;
    }
  });

  it('renders empty breadcrumb', () => {
    component = renderer.create(<Breadcrumb items={[]} />);

    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });

  describe('rendering', () => {
    it('renders correctly', () => {
      component = renderer.create(<Breadcrumb items={items} />);

      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('renders correctly with overflow', () => {
      component = renderer.create(<Breadcrumb items={items} maxDisplayedItems={2} />);

      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('renders correctly with custom divider', () => {
      const divider = () => <span>*</span>;
      component = renderer.create(<Breadcrumb items={items} dividerAs={divider} />);

      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('renders correctly with overflow and overflowIndex', () => {
      component = renderer.create(<Breadcrumb items={items} maxDisplayedItems={2} overflowIndex={1} />);

      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('renders correctly with maxDisplayedItems and overflowIndex', () => {
      component = renderer.create(<Breadcrumb items={items} maxDisplayedItems={1} overflowIndex={1} />);

      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('renders correctly with maxDisplayedItems and overflowIndex as 0', () => {
      component = renderer.create(<Breadcrumb items={items} maxDisplayedItems={0} overflowIndex={0} />);

      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('renders  correctly with custom overflow icon', () => {
      const overflowIcon = () => <Icon iconName={'ChevronDown'} />;
      component = renderer.create(<Breadcrumb items={items} maxDisplayedItems={2} onRenderOverflowIcon={overflowIcon} />);

      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  it('renders items with expected element type', () => {
    const items2: IBreadcrumbItem[] = [
      { text: 'Test1', key: 'Test1', href: 'http://bing.com', onClick: () => undefined },
      { text: 'Test2', key: 'Test2', onClick: () => undefined },
      { text: 'Test3', key: 'Test3', as: 'h1' }
    ];

    wrapper = mount(<Breadcrumb items={items2} />);

    // get the first child of each list item (the actual item content)
    const renderedItems = wrapper.find('.ms-Breadcrumb-listItem > *:first-child');
    expect(renderedItems).toHaveLength(3);
    // should be a link since it has a href (even though it also has onclick)
    expect(renderedItems.at(0).getDOMNode().tagName).toBe('A');
    // should be a button since it doesn't have a href
    // (can't use a link without a href because it won't respond to key events)
    expect(renderedItems.at(1).getDOMNode().tagName).toBe('BUTTON');
    // specified type of h1 overrides default
    expect(renderedItems.at(2).getDOMNode().tagName).toBe('H1');
  });

  it('calls the callback when an item is clicked', () => {
    let callbackValue;
    const clickCallback = (ev: React.MouseEvent<HTMLElement>, item: IBreadcrumbItem) => {
      ev.preventDefault(); // in case it's a navigation event
      callbackValue = item.key;
    };

    const items2: IBreadcrumbItem[] = [
      { text: 'Test1', key: 'Test1', href: 'http://bing.com', onClick: clickCallback },
      { text: 'Test2', key: 'Test2', onClick: clickCallback }
    ];

    wrapper = mount(<Breadcrumb items={items2} />);

    const renderedItems = wrapper.find('.ms-Breadcrumb-itemLink').hostNodes();

    renderedItems.at(0).simulate('click');
    expect(callbackValue).toEqual('Test1');

    renderedItems.at(1).simulate('click');
    expect(callbackValue).toEqual('Test2');
  });

  it('moves items to overflow in the correct order', () => {
    wrapper = mount(<Breadcrumb items={items} maxDisplayedItems={2} />);

    expect(
      wrapper
        .find('.ms-Breadcrumb-item')
        .first()
        .text()
    ).toEqual('TestText3');
  });

  it('supports native props on the root element', () => {
    wrapper = mount(<Breadcrumb items={items} maxDisplayedItems={2} role="region" />);

    expect(wrapper.find('.ms-Breadcrumb').prop('role')).toEqual('region');
  });

  it('opens the overflow menu on click', () => {
    wrapper = mount(<Breadcrumb items={items} maxDisplayedItems={2} />);

    const overflowButton = wrapper.find('.ms-Breadcrumb-overflowButton');
    // without hostNodes it returns the same element x4
    overflowButton.hostNodes().simulate('click');

    const overfowItems = document.querySelectorAll('.ms-ContextualMenu-item');
    expect(overfowItems).toHaveLength(2);
    expect(overfowItems[0].textContent).toEqual('TestText1');
    expect(overfowItems[1].textContent).toEqual('TestText2');
  });
});
