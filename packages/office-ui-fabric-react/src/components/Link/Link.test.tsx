import * as React from 'react';
import * as renderer from 'react-test-renderer';

import { Link } from './Link';

describe('Link', () => {
  it('renders Link correctly', () => {
    const component = renderer.create(<Link href='#'>I'm a link</Link>);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('renders disabled Link correctly', () => {
    const component = renderer.create(<Link href='#' disabled={ true }>I'm a disabled link</Link>);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('renders Link with no href as a button', () => {
    const component = renderer.create(<Link>I'm a link as a button</Link>);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('renders disabled Link with no href as a button correctly', () => {
    const component = renderer.create(<Link disabled={ true }>I'm a link as a button</Link>);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});