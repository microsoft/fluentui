import * as React from 'react';
import * as renderer from 'react-test-renderer';

import { ImageIcon } from './index';
import { TestImages } from '@fluentui/example-data';

describe('ImageIcon', () => {
  it('renders ImageIcon correctly', () => {
    const component = renderer.create(<ImageIcon imageProps={{ src: TestImages.iconOne }} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders named ImageIcon correctly', () => {
    const component = renderer.create(<ImageIcon imageProps={{ src: TestImages.iconOne, alt: 'image one' }} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
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
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders ImageIcon correctly with container aria-label', () => {
    const component = renderer.create(<ImageIcon aria-label="image one" imageProps={{ src: TestImages.iconOne }} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders ImageIcon correctly with image title', () => {
    const component = renderer.create(<ImageIcon imageProps={{ src: TestImages.iconOne, title: '"image one' }} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders ImageIcon correctly with container aria-labelledby', () => {
    const component = renderer.create(<ImageIcon aria-labelledby="id" imageProps={{ src: TestImages.iconOne }} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
