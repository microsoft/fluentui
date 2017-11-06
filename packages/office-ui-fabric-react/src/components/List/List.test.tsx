import * as React from 'react';
import * as renderer from 'react-test-renderer';

import { List } from './List';

describe('List', () => {
  it('renders List correctly', () => {
    List.prototype.componentDidMount = jest.fn();

    const component = renderer.create(
      // tslint:disable-next-line:jsx-no-lambda
      <List items={ [] } onRenderCell={ () => null } />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});