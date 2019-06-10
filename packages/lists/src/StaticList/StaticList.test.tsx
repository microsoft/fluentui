import * as React from 'react';
import { StaticList } from './StaticList';
import { shallow } from 'enzyme';

describe('StaticList', () => {
  it('renders no children if no items provided', () => {
    const wrapper = shallow(<StaticList>{(_item: number, index: number) => <li key={index}>{`Item #${index}`}</li>}</StaticList>);

    expect(wrapper.children().length).toBe(0);
  });

  it('invokes render function per item provided', () => {
    const COUNT = 50;
    const items = new Array(COUNT).fill(0);
    const mockRenderFunction = jest.fn();

    shallow(<StaticList items={items}>{mockRenderFunction}</StaticList>);

    expect(mockRenderFunction).toHaveBeenCalledTimes(COUNT);
  });

  it('renders custom root tag if provided', () => {
    const COUNT = 50;
    const items = new Array(COUNT).fill(0);
    const mockRenderFunction = jest.fn();

    const wrapper = shallow(
      <StaticList as={'ol'} items={items}>
        {mockRenderFunction}
      </StaticList>
    );

    expect(wrapper.matchesElement(<ol />)).toBe(true);
  });

  it('renders child render function per item provided', () => {
    const COUNT = 50;
    const items = new Array(COUNT).fill(0);

    const wrapper = shallow(
      <StaticList items={items}>{(_item: number, index: number) => <li key={index}>{`Item #${index}`}</li>}</StaticList>
    );

    expect(wrapper.children().length).toBe(COUNT);
  });
});
