import * as React from 'react';
import * as renderer from 'react-test-renderer';

import { Icon } from './index';
import { Image } from '../Image/Image';
import { TestImages } from '@fluentui/example-data';
import { isConformant } from '../../common/isConformant';

describe('Icon', () => {
  it('renders Icon correctly using iconName', () => {
    const component = renderer.create(<Icon iconName="Upload" />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('sets Icon name with ariaLabel', () => {
    const component = renderer.create(<Icon iconName="CompassNW" ariaLabel="asdf" />);
    const iconInstance = component.root.findByType('i');

    expect(iconInstance.props.role).toBe('img');
    expect(iconInstance.props['aria-label']).toBe('asdf');
    expect(iconInstance.props['aria-hidden']).toBeFalsy();
  });

  it('sets Icon name with aria-labelledby', () => {
    const component = renderer.create(<Icon iconName="Upload" aria-labelledby="id" />);
    const iconInstance = component.root.findByType('i');

    expect(iconInstance.props.role).toBe('img');
    expect(iconInstance.props['aria-label']).toBeFalsy();
    expect(iconInstance.props['aria-hidden']).toBeFalsy();
    expect(iconInstance.props['aria-labelledby']).toBe('id');
  });

  it('renders Icon with imageProps correctly', () => {
    const component = renderer.create(<Icon iconName="CompassNW" imageProps={{ src: TestImages.iconOne }} />);

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('sets Icon name with imageProps correctly', () => {
    const component = renderer.create(
      <Icon
        iconName="Upload"
        imageProps={{
          src: TestImages.iconOne,
          alt: 'icon one',
        }}
      />,
    );
    const iconInstance = component.root.findByType('span');
    const imageInstance = component.root.findByType(Image);

    expect(iconInstance.props.role).toBeUndefined();
    expect(iconInstance.props['aria-label']).toBeUndefined();
    expect(iconInstance.props['aria-hidden']).toBeFalsy();
    expect(imageInstance.props.alt).toBe('icon one');
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
    // Problem: Ref is not supported
    // Solution: Convert to FunctionComponent and support using forwardRef
    disabledTests: ['component-has-root-ref', 'component-handles-ref'],
  });
});
