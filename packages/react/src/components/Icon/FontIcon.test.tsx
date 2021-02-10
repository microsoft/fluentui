import * as React from 'react';
import * as renderer from 'react-test-renderer';

import { FontIcon } from './index';

describe('FontIcon', () => {
  it('renders FontIcon correctly', () => {
    const component = renderer.create(<FontIcon iconName="CompassNW" />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders named FontIcon correctly', () => {
    const component = renderer.create(<FontIcon iconName="CompassNW" aria-label="compass" />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders FontIcon correctly with aria-labelledby', () => {
    const component = renderer.create(<FontIcon iconName="CompassNW" aria-labelledby="id" />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders FontIcon correctly with a name from title', () => {
    const component = renderer.create(<FontIcon iconName="CompassNW" title="compass" />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders FontIcon with children correctly', () => {
    const component = renderer.create(
      <FontIcon iconName="Upload">
        <span>This font-icon has children that are rendered inside of it</span>
      </FontIcon>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
