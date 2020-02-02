import * as React from 'react';
import * as renderer from 'react-test-renderer';

import { TagItem } from './TagItem';
import { resetIds } from '@uifabric/utilities';

describe('TagItem', () => {
  beforeEach(() => {
    resetIds();
  });

  it('renders correctly', () => {
    const component = renderer.create(
      <TagItem item={{ name: 'Red', key: 'red' }} index={0}>
        Red
      </TagItem>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders custom children correctly', () => {
    const component = renderer.create(
      <TagItem item={{ name: 'Red', key: 'red' }} index={0}>
        <span>Red</span>
      </TagItem>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('accepts title override', () => {
    const component = renderer.create(
      <TagItem item={{ name: 'Red', key: 'red' }} title="Red color" index={0}>
        Red color
      </TagItem>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
