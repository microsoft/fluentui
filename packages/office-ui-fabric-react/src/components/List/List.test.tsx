import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { mount } from 'enzyme';

import { List } from './List';

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
  it('can complete rendering', (done) => {
    mount(<List items={[]} onRenderComplete={done} />);
  });
});
