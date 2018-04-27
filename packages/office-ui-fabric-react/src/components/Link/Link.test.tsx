import * as React from 'react';
import * as ReactDOM from 'react-dom/server';
import * as renderer from 'react-test-renderer';
import { Customizer } from '../../Utilities';
import { createTheme } from '../../Styling';

import { Link } from './Link';

describe('Link', () => {
  it('renders Link correctly', () => {
    const component = renderer.create(<Link href='#'>I'm a link</Link>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('renders disabled Link correctly', () => {
    const component = renderer.create(<Link href='#' disabled={ true }>I'm a disabled link</Link>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('renders Link with no href as a button', () => {
    const component = renderer.create(<Link>I'm a link as a button</Link>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('renders disabled Link with no href as a button correctly', () => {
    const component = renderer.create(<Link disabled={ true }>I'm a link as a button</Link>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('renders Link with a custom class name', () => {
    const component = renderer.create(<Link href='#' className='customClassName'>I'm a link</Link>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('can have the global styles for Link component be disabled', () => {
    const NoClassNamesTheme = createTheme({ disableGlobalClassNames: true });

    expect(ReactDOM.renderToStaticMarkup(
      <Customizer settings={ { theme: NoClassNamesTheme } }>
        <Link href='helloworld.html'>My Link</Link>
      </Customizer >
    )).toEqual('<a href=\"helloworld.html\" class=\"root-33\">My Link</a>');
  });
});