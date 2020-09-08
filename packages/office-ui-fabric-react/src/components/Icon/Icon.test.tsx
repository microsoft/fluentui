import * as React from 'react';
import * as renderer from 'react-test-renderer';

import { Icon } from './index';
import { TestImages } from '@uifabric/example-data';
import { isConformant } from '../../common/isConformant';

describe('Icon', () => {
  it('renders Icon correctly', () => {
    const component = renderer.create(<Icon iconName="CompassNW" ariaLabel="asdf" />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders Icon correctly using iconName', () => {
    const component = renderer.create(<Icon iconName="Upload" />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders Icon with imageProps correctly', () => {
    const component = renderer.create(<Icon iconName="CompassNW" imageProps={{ src: TestImages.iconOne }} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders Icon with children correctly', () => {
    const component = renderer.create(
      <Icon iconName="Upload">
        <span>This icon has children that are rendered inside of it</span>
      </Icon>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders Icon with custom styles', () => {
    const component = renderer.create(
      <Icon iconName="Upload" styles={{ root: 'root', imageContainer: 'imageContainer' }} />,
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('renders Icon with getStyles', () => {
    const customStyles = (props: {}) => ({ root: 'root', imageContainer: 'imageContainer' });

    const component = renderer.create(<Icon className="className" iconName="Upload" styles={customStyles} />);
    expect(component.toJSON()).toMatchSnapshot();
  });

  isConformant({
    Component: Icon,
    displayName: 'Icon',
    disabledTests: ['component-has-displayname'],
  });
});
