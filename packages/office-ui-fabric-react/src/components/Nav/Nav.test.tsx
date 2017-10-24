import * as React from 'react';
import * as renderer from 'react-test-renderer';

import { Nav } from './Nav';

describe('Nav', () => {
  it('renders Nav correctly', () => {
    const component = renderer.create(
      <Nav
        groups={ [
          {
            links: [
              {
                name: '',
                url: ''
              }]
          }
        ] }
      />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});