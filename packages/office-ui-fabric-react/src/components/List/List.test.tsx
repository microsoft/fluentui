import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { mount } from 'enzyme';

import { List } from './List';
import { IPage, IListProps } from './List.types';

type IMockItem = { key: number; name: string; value: number };

function mockData(count: number = 0): IMockItem[] {
  const data: IMockItem[] = [];
  let item: IMockItem;

  for (let i = 0; i < count; i++) {
    item = {
      key: i,
      name: 'Item ' + i,
      value: i
    };

    data.push(item);
  }

  return data;
}

describe('List', () => {
  it('renders List correctly', () => {
    List.prototype.componentDidMount = jest.fn();

    const onRenderCell = () => null;
    const component = renderer.create(<List items={[]} onRenderCell={onRenderCell} />);
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('can complete rendering', done => {
    const wrapper = mount(<List items={mockData(50)} />);

    wrapper.setProps({ items: mockData(100), onPagesUpdated: (pages: IPage[]) => done() });
  });

  describe('by default', () => {
    it('renders 1 page containing 10 rows', done => {
      const wrapper = mount(<List items={mockData(100)} />);

      wrapper.setProps({ items: mockData(100), onPagesUpdated: (pages: IPage[]) => done() });

      const rows = wrapper.find('.ms-List-cell');

      expect(rows).toHaveLength(10);
    });

    it("sets each row's key equal to the row's index value", done => {
      const wrapper = mount(<List items={mockData(100)} />);

      wrapper.setProps({ items: mockData(100), onPagesUpdated: (pages: IPage[]) => done() });

      const firstRow = wrapper.find('.ms-List-cell').first();

      expect(firstRow.key()).toEqual('0');
    });

    it("sets the root element's role to 'list'", done => {
      const wrapper = mount(<List items={mockData(100)} />);

      wrapper.setProps({ items: mockData(100), onPagesUpdated: (pages: IPage[]) => done() });

      const listRoot = wrapper.find(List);

      expect(listRoot.getDOMNode().getAttribute('role')).toEqual('list');
    });

    it("sets the row elements' role to 'listitem'", done => {
      const wrapper = mount(<List items={mockData(100)} />);

      wrapper.setProps({ items: mockData(100), onPagesUpdated: (pages: IPage[]) => done() });

      const firstRow = wrapper.find('.ms-List-cell').first();

      expect(firstRow.getDOMNode().getAttribute('role')).toEqual('listitem');
    });
  });

  describe('if provided', () => {
    it('invokes optional onRenderCell prop per item render', done => {
      const onRenderCellMock = jest.fn();
      const wrapper = mount(<List items={mockData(100)} />);

      wrapper.setProps({ items: mockData(100), onRenderCell: onRenderCellMock, onPagesUpdated: (pages: IPage[]) => done() });

      expect(onRenderCellMock).toHaveBeenCalledTimes(10);
    });

    it('respects optional startIndex prop during row rendering', done => {
      const wrapper = mount(<List items={mockData(100)} />);

      wrapper.setProps({ items: mockData(10), startIndex: 5, onPagesUpdated: (pages: IPage[]) => done() });

      const rows = wrapper.find('.ms-List-cell');

      expect(rows).toHaveLength(5);
    });

    it('respects optional renderCount prop as row rendering limit', done => {
      const wrapper = mount(<List items={mockData(100)} />);

      wrapper.setProps({ items: mockData(100), renderCount: 5, onPagesUpdated: (pages: IPage[]) => done() });

      const rows = wrapper.find('.ms-List-cell');

      expect(rows).toHaveLength(5);
    });

    it("sets optional className to List's root", done => {
      const wrapper = mount(<List items={mockData(100)} />);

      wrapper.setProps({ items: mockData(100), className: 'foo', onPagesUpdated: (pages: IPage[]) => done() });

      const listRoot = wrapper.find(List);

      expect(listRoot.getDOMNode().className).toContain('foo');
    });

    it('renders the return value of optional onRenderCell prop per row', done => {
      const wrapper = mount(<List items={mockData(100)} />);
      const onRenderCell = (item: any, index: number, isScrolling: boolean) => <div className="foo">{item.name}</div>;

      wrapper.setProps({ items: mockData(100), onRenderCell, onPagesUpdated: (pages: IPage[]) => done() });

      const rows = wrapper.find('.foo');

      expect(rows).toHaveLength(10);
    });

    it('sets the return value of optional getKey prop as React key per row', done => {
      const wrapper = mount(<List items={mockData(100)} />);
      const getKey = (item: any, index: number) => `foo-${item.key}`;

      wrapper.setProps({ items: mockData(100), getKey, onPagesUpdated: (pages: IPage[]) => done() });

      const firstRow = wrapper.find('.ms-List-cell').first();

      expect(firstRow.key()).toEqual('foo-0');
    });

    it('renders all rows if optional onShouldVirtualize prop returns false', done => {
      const wrapper = mount(<List items={mockData(100)} />);
      const onShouldVirtualize = (props: IListProps) => false;

      wrapper.setProps({ items: mockData(100), onShouldVirtualize, onPagesUpdated: (pages: IPage[]) => done() });

      const rows = wrapper.find('.ms-List-cell');

      expect(rows).toHaveLength(100);
    });
  });
});
