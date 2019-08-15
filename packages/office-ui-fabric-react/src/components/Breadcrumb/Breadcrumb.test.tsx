import * as React from 'react';
import { mount } from 'enzyme';
import * as renderer from 'react-test-renderer';
import { Breadcrumb, IBreadcrumbItem } from './index';

describe('Breadcrumb', () => {
  it('renders empty breadcrumb', () => {
    const component = renderer.create(<Breadcrumb items={[]} />);

    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });

  describe('basic rendering', () => {
    const items: IBreadcrumbItem[] = [
      { text: 'TestText1', key: 'TestKey1' },
      { text: 'TestText2', key: 'TestKey2' },
      { text: 'TestText3', key: 'TestKey3' },
      { text: 'TestText4', key: 'TestKey4' }
    ];

    const divider = () => <span>*</span>;

    it('renders breadcumb correctly 1', () => {
      const component = renderer.create(<Breadcrumb items={items} />);

      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('renders breadcumb correctly 2', () => {
      // With overflow
      const component = renderer.create(<Breadcrumb items={items} maxDisplayedItems={2} />);

      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('renders breadcumb correctly 3', () => {
      // With custom divider
      const component = renderer.create(<Breadcrumb items={items} dividerAs={divider} />);

      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('renders breadcumb correctly 4', () => {
      // With overflow and overflowIndex
      const component = renderer.create(<Breadcrumb items={items} maxDisplayedItems={2} overflowIndex={1} />);

      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('renders breadcumb correctly 5', () => {
      // With maxDisplayedItems and overflowIndex
      const component = renderer.create(<Breadcrumb items={items} maxDisplayedItems={1} overflowIndex={1} />);

      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('renders breadcumb correctly 6', () => {
      // With maxDisplayedItems and overflowIndex as 0
      const component = renderer.create(<Breadcrumb items={items} maxDisplayedItems={0} overflowIndex={0} />);

      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  it('can call the callback when an item is clicked', () => {
    let callbackValue;
    const clickCallback = (ev: React.MouseEvent<HTMLElement>, item: IBreadcrumbItem) => {
      callbackValue = item.key;
    };

    const items: IBreadcrumbItem[] = [{ text: 'TestText', key: 'TestKey', onClick: clickCallback }];

    const wrapper = mount(<Breadcrumb items={items} />);

    wrapper
      .find('.ms-Breadcrumb-itemLink')
      .first()
      .simulate('click');

    expect(callbackValue).toEqual('TestKey');
  });

  it('moves items to overflow in the correct order', () => {
    const items: IBreadcrumbItem[] = [
      { text: 'TestText1', key: 'TestKey1' },
      { text: 'TestText2', key: 'TestKey2' },
      { text: 'TestText3', key: 'TestKey3' },
      { text: 'TestText4', key: 'TestKey4' }
    ];

    const wrapper = mount(<Breadcrumb items={items} maxDisplayedItems={2} />);

    expect(
      wrapper
        .find('.ms-Breadcrumb-item')
        .first()
        .text()
    ).toEqual('TestText3');
  });

  it('supports native props on the root element', () => {
    const items: IBreadcrumbItem[] = [
      { text: 'TestText1', key: 'TestKey1' },
      { text: 'TestText2', key: 'TestKey2' },
      { text: 'TestText3', key: 'TestKey3' },
      { text: 'TestText4', key: 'TestKey4' }
    ];

    const wrapper = mount(<Breadcrumb items={items} maxDisplayedItems={2} role="region" />);

    expect(
      wrapper
        .find('.ms-Breadcrumb')
        .getDOMNode()
        .getAttribute('role')
    ).toEqual('region');
  });
});
