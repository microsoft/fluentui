import * as React from 'react';
import * as renderer from 'react-test-renderer';

import { ImageIcon } from './index';
import { Image } from '../Image/Image';
import { TestImages } from '@fluentui/example-data';

describe('ImageIcon', () => {
  it('renders ImageIcon correctly', () => {
    const component = renderer.create(<ImageIcon imageProps={{ src: TestImages.iconOne }} />);
    const iconInstance = component.root.findByType('div');

    expect(iconInstance.props['aria-hidden']).toBe(true);

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders named ImageIcon correctly', () => {
    const component = renderer.create(<ImageIcon imageProps={{ src: TestImages.iconOne, alt: 'image one' }} />);
    const iconInstance = component.root.findByType('div');
    const imageInstance = component.root.findByType(Image);

    expect(iconInstance.props['aria-hidden']).toBeUndefined();
    expect(imageInstance.props.alt).toBe('image one');
  });

  it('renders ImageIcon correctly with image aria-label', () => {
    const component = renderer.create(
      <ImageIcon
        imageProps={{
          src: TestImages.iconOne,
          'aria-label': 'image one',
        }}
      />,
    );
    const iconInstance = component.root.findByType('div');
    const imageInstance = component.root.findByType(Image);

    expect(iconInstance.props['aria-hidden']).toBeUndefined();
    expect(imageInstance.props['aria-label']).toBe('image one');
  });

  it('renders ImageIcon correctly with container aria-label', () => {
    const component = renderer.create(<ImageIcon aria-label="image one" imageProps={{ src: TestImages.iconOne }} />);
    const iconInstance = component.root.findByType('div');
    const imageInstance = component.root.findByType(Image);

    expect(iconInstance.props['aria-hidden']).toBeUndefined();
    expect(imageInstance.props.alt).toBe('image one');
  });

  it('renders ImageIcon correctly with image title', () => {
    const component = renderer.create(<ImageIcon imageProps={{ src: TestImages.iconOne, title: 'image one' }} />);
    const iconInstance = component.root.findByType('div');
    const imageInstance = component.root.findByType(Image);

    expect(iconInstance.props['aria-hidden']).toBeUndefined();
    expect(imageInstance.props.title).toBe('image one');
  });

  it('renders ImageIcon correctly with container aria-labelledby', () => {
    const component = renderer.create(<ImageIcon aria-labelledby="id" imageProps={{ src: TestImages.iconOne }} />);
    const iconInstance = component.root.findByType('div');
    const imageInstance = component.root.findByType(Image);

    expect(iconInstance.props['aria-hidden']).toBeUndefined();
    expect(imageInstance.props['aria-labelledby']).toBe('id');
  });
});
