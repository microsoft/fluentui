import * as React from 'react';
import { StaticList } from './StaticList';
import { shallow } from 'enzyme';
import * as renderer from 'react-test-renderer';

const COUNT = 50;
let items: number[] = [];

describe('StaticList', () => {
  beforeEach(() => {
    items = new Array(COUNT).fill(0);
  });

  it('renders empty list correctly', () => {
    const mockRenderFunction = jest.fn();
    const component = renderer.create(<StaticList>{mockRenderFunction}</StaticList>);
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders no children if no items provided', () => {
    const mockRenderFunction = jest.fn();
    const wrapper = shallow(<StaticList>{mockRenderFunction}</StaticList>);

    expect(mockRenderFunction).not.toHaveBeenCalled();
    expect(wrapper.children().length).toBe(0);
  });

  it('invokes render function per item provided', () => {
    const mockRenderFunction = jest.fn();

    shallow(<StaticList items={items}>{mockRenderFunction}</StaticList>);

    expect(mockRenderFunction).toHaveBeenCalledTimes(COUNT);
  });

  it('renders custom root tag if provided', () => {
    const mockRenderFunction = jest.fn();

    const wrapper = shallow(
      <StaticList as={'ol'} items={items}>
        {mockRenderFunction}
      </StaticList>
    );

    expect(wrapper.matchesElement(<ol />)).toBe(true);
  });

  it('renders child render function per item provided', () => {
    const wrapper = shallow(
      <StaticList items={items}>{(_item: number, index: number) => <li key={index}>{`Item #${index}`}</li>}</StaticList>
    );

    expect(wrapper.children().length).toBe(COUNT);
  });

  it('re-renders when items array mutates', () => {
    const wrapper = shallow(
      <StaticList items={items}>{(_item: number, index: number) => <li key={index}>{`Item #${index}`}</li>}</StaticList>
    );

    wrapper.setProps<'items'>({ items: [...items, ...items] });

    expect(wrapper.children().length).toBe(100);
  });
});
