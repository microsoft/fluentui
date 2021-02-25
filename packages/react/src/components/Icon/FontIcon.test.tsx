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
    const iconInstance = component.root.findByType('i');

    expect(iconInstance.props.role).toBe('img');
    expect(iconInstance.props['aria-hidden']).toBe(undefined);
    expect(iconInstance.props['aria-label']).toBe('compass');

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('handles aria-labelledby correctly', () => {
    const component = renderer.create(<FontIcon iconName="CompassNW" aria-labelledby="id" />);
    const iconInstance = component.root.findByType('i');

    expect(iconInstance.props.role).toBe('img');
    expect(iconInstance.props['aria-hidden']).toBe(undefined);
    expect(iconInstance.props['aria-labelledby']).toBe('id');
  });

  it('renders FontIcon correctly with a name from title', () => {
    const component = renderer.create(<FontIcon iconName="CompassNW" title="compass" />);
    const iconInstance = component.root.findByType('i');

    expect(iconInstance.props.role).toBe('img');
    expect(iconInstance.props['aria-hidden']).toBeUndefined();
    expect(iconInstance.props.title).toBe('compass');
  });

  it('renders unnamed FontIcon as presentational', () => {
    const component = renderer.create(<FontIcon iconName="CompassNW" />);
    const iconInstance = component.root.findByType('i');

    expect(iconInstance.props.role).toBeFalsy();
    expect(iconInstance.props['aria-hidden']).toBe(true);
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
