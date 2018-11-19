import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { mount } from 'enzyme';

import { List } from './List';

// Populate mock data for testing
function mockData(count: number): any {
  const data = [];
  let _data = {};

  for (let i = 0; i < count; i++) {
    _data = {
      key: i,
      name: 'Item ' + i,
      value: i
    };

    data.push(_data);
  }

  return data;
}

describe('List', () => {
  it('renders List correctly', () => {
    List.prototype.componentDidMount = jest.fn();

    const component = renderer.create(
      // tslint:disable-next-line:jsx-no-lambda
      <List items={[]} onRenderCell={() => null} />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('can complete rendering', done => {
    const wrapper = mount(<List items={mockData(50)} />);
    wrapper.setProps({ items: mockData(100), onPagesUpdated: (pages: any) => done() });
  });
});
