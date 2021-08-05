import * as React from 'react';
import * as renderer from 'react-test-renderer';

import { TagItem } from './TagItem';
import { resetIds } from '@fluentui/utilities';
import { FontIcon } from '../../Icon';

describe('TagItem', () => {
  beforeEach(() => {
    resetIds();
  });

  it('renders correctly', () => {
    const component = renderer.create(
      <TagItem item={{ name: 'Red', key: 'red' }} index={0}>
        Red color
      </TagItem>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('defaults title to item name for non string children', () => {
    const component = renderer.create(
      <TagItem item={{ name: 'Red', key: 'red' }} index={0}>
        <FontIcon iconName="SquareShapeSolid" style={{ color: 'red' }} />
      </TagItem>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('accepts title override', () => {
    const component = renderer.create(
      <TagItem item={{ name: 'Red', key: 'red' }} title="Red color" index={0}>
        Red
      </TagItem>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
