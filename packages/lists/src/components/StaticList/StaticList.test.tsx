import * as React from 'react';
import { StaticList } from './StaticList';
import { shallow } from 'enzyme';
import * as renderer from 'react-test-renderer';

function generateItems(count: number): number[] {
  const itemsArray: number[] = [];
  for (let i = 0; i < count; i++) {
    itemsArray.push(i);
  }
  return itemsArray;
}

const COUNT: number = 50;
let items: ReadonlyArray<number>;

describe('StaticList', () => {
  beforeEach(() => {
    items = generateItems(COUNT);
  });

  it('renders empty list correctly', () => {
    const mockRenderFunction = jest.fn();
    const component = renderer.create(<StaticList>{mockRenderFunction}</StaticList>);
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders empty list with custom root tag correctly', () => {
    const mockRenderFunction = jest.fn();
    const component = renderer.create(<StaticList as={'ol'}>{mockRenderFunction}</StaticList>);
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders default unordered-list correctly', () => {
    const component = renderer.create(<StaticList items={items} />);
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders unordered-list with child render function correctly', () => {
    const mockRenderFunction = (_item: number, index: number) => <li key={index}>{`Item #${index}`}</li>;
    const component = renderer.create(<StaticList items={items}>{mockRenderFunction}</StaticList>);
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders ordered-list correctly', () => {
    const mockRenderFunction = (_item: number, index: number) => <li key={index}>{`Item #${index}`}</li>;
    const component = renderer.create(
      <StaticList items={items} as={'ol'}>
        {mockRenderFunction}
      </StaticList>
    );
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

  it('re-renders when "as" value mutates', () => {
    const mockRenderFunction = jest.fn();

    const wrapper = shallow(<StaticList items={items}>{mockRenderFunction}</StaticList>);

    expect(wrapper.matchesElement(<ul />)).toBe(true);

    wrapper.setProps<'as'>({ as: 'ol' });

    expect(wrapper.matchesElement(<ol />)).toBe(true);
  });

  it('re-renders when children mutate', () => {
    const wrapper = shallow(
      <StaticList items={items}>{(_item: number, index: number) => <li className="foo" key={index}>{`Item #${index}`}</li>}</StaticList>
    );

    expect(wrapper.find('.foo').length).toBe(COUNT);

    wrapper.setProps({ children: (_item: number, index: number) => <li className="bar" key={index}>{`Item #${index}`}</li> });

    expect(wrapper.find('.bar').length).toBe(COUNT);
  });
});
