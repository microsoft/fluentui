import * as React from 'react';
import * as renderer from 'react-test-renderer';

import { Text } from './Text';

describe('Text', () => {
  it('renders default Text correctly', () => {
    const component = renderer.create(<Text>I'm default text</Text>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders Text with {0} as its children correctly', () => {
    const component = renderer.create(<Text>{0}</Text>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
