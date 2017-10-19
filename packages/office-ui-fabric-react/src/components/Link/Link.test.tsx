import * as React from 'react';
import * as renderer from 'react-test-renderer';

import { Link } from './Link';

describe('Link', () => {
  it('renders Link correctly', () => {
    const component = renderer.create(<Link href='#'>I'm a link</Link>);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});