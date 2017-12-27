import { Promise } from 'es6-promise';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as ReactTestUtils from 'react-dom/test-utils';
import * as renderer from 'react-test-renderer';
import { SearchBox } from './SearchBox';

describe('SearchBox', () => {

  it('renders SearchBox correctly', () => {
    const component = renderer.create(<SearchBox />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});