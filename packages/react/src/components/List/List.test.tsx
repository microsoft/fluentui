import { render } from '@testing-library/react';
import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { mount } from 'enzyme';

import { List } from './List';
import { isConformant } from '../../common/isConformant';
import type { IPage, IListProps } from './List.types';

type IMockItem = { key: number; name: string; value: number };

function mockData(count: number = 0): IMockItem[] {
  const data: IMockItem[] = [];
  let item: IMockItem;

  for (let i = 0; i < count; i++) {
    item = {
      key: i,
      name: 'Item ' + i,
      value: i,
    };

    data.push(item);
  }

  return data;
}

describe('List', () => {
  it('renders List correctly', () => {
    const onRenderCell = () => null;
    const component = renderer.create(<List items={[]} onRenderCell={onRenderCell} />);
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });

  isConformant({
    Component: List,
    displayName: 'List',
    // Problem: Ref doesn't match DOM node and returns null.
    // Solution: Ensure ref is passed correctly to the root element.
    disabledTests: ['component-handles-ref', 'component-has-root-ref'],
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

    it("does not set the root element's role in case of an empty list", done => {
      const wrapper = mount(<List items={mockData(0)} />);

      wrapper.setProps({ items: mockData(0), onPagesUpdated: (pages: IPage[]) => done() });

      const listRoot = wrapper.find(List);

      expect(listRoot.getDOMNode().getAttribute('role')).toBeNull();
    });

    it("sets the row elements' role to 'listitem'", done => {
      const wrapper = mount(<List items={mockData(100)} />);

      wrapper.setProps({ items: mockData(100), onPagesUpdated: (pages: IPage[]) => done() });

      const firstRow = wrapper.find('.ms-List-cell').first();

      expect(firstRow.getDOMNode().getAttribute('role')).toEqual('listitem');
    });

    it('renders rows for a sparse array containing items that are primitive values', done => {
      const wrapper = mount(<List />);

      const onRenderCell = (item: any, index: number, isScrolling: boolean) => (
        <div className="cell" key={index}>
          {item}
        </div>
      );

      // eslint-disable-next-line no-sparse-arrays
      wrapper.setProps({ items: [, , 'foo', 'bar'], onRenderCell, onPagesUpdated: (pages: IPage[]) => done() });

      const rows = wrapper.find('.cell');

      expect(rows).toHaveLength(4);
    });

    it('renders rows for a sparse array of items that are undefined', done => {
      const wrapper = mount(<List />);

      const onRenderCell = (item: any, index: number, isScrolling: boolean) => (
        <div className="cell" key={index}>
          {item}
        </div>
      );

      // eslint-disable-next-line no-sparse-arrays
      wrapper.setProps({ items: [, , , ,], onRenderCell, onPagesUpdated: (pages: IPage[]) => done() });

      const rows = wrapper.find('.cell');

      expect(rows).toHaveLength(4);
    });

    it('renders List correctly when `renderEarly={true}`', () => {
      const onRenderCell = () => null;
      const component = renderer.create(<List items={[]} onRenderCell={onRenderCell} renderEarly={true} />);
      const tree = component.toJSON();

      expect(tree).toMatchSnapshot();
    });
  });

  describe('if provided', () => {
    // This test is causing intermittent PR failures so it's disabled for now.
    xit('invokes optional onRenderCell prop per item render', done => {
      const onRenderCellMock = jest.fn();
      const wrapper = mount(<List items={mockData(100)} />);

      wrapper.setProps({
        items: mockData(100),
        onRenderCell: onRenderCellMock,
        onPagesUpdated: (pages: IPage[]) => done(),
      });

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
      const data = mockData(100);

      const wrapper = mount(<List items={data} />);

      wrapper.setProps({ items: data, className: 'foo' });

      const listRoot = wrapper.find(List);

      expect(listRoot.getDOMNode().className).toContain('foo');

      done();
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

  describe('getPageSpecification', () => {
    it('calls an actual reference for getPageSpecification', () => {
      const getPageSpecificationA = jest.fn().mockImplementation(() => ({}));
      const getPageSpecificationB = jest.fn().mockImplementation(() => ({}));

      const { rerender } = render(<List getPageSpecification={getPageSpecificationA} items={mockData(5)} />);

      jest.clearAllMocks();
      rerender(<List getPageSpecification={getPageSpecificationB} items={mockData(5)} />);

      expect(getPageSpecificationA).toHaveBeenCalledTimes(0);
      expect(getPageSpecificationB).toHaveBeenCalledTimes(1);
    });
  });
});
