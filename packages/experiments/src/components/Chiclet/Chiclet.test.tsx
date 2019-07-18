import * as React from 'react';
import * as renderer from 'react-test-renderer';

import { ChicletXsmall } from './ChicletXsmall';
import { ChicletCard } from './ChicletCard';
import { IChicletCardProps } from './ChicletCard.types';

describe('Chiclet', () => {
  it('renders Xsmall chiclet with title, icon, onClick, and url', () => {
    const chicletCardProps: IChicletCardProps = {
      url: 'contuso.sharepoint.com',
      title: 'My Daily Notes',
      itemType: 'docx',
      onClick: () => alert('test')
    };
    const component = renderer.create(<ChicletXsmall {...chicletCardProps} />);

    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders Xsmall chiclet with title, preview, onClick, and url', () => {
    const chicletCardProps: IChicletCardProps = {
      url: 'contuso.sharepoint.com',
      title: 'My Daily Notes',
      itemType: 'docx',
      image: 'https://imaging.nikon.com/lineup/dslr/df/img/sample/img_01.jpg',
      onClick: () => alert('test')
    };
    const component = renderer.create(<ChicletXsmall {...chicletCardProps} />);

    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders the correct icon from a file extension for Xsmall Chiclet', () => {
    const chicletCardProps: IChicletCardProps = {
      url: 'contuso.sharepoint.com',
      title: 'My Daily Notes.xlsx',
      onClick: () => alert('test')
    };
    const component = renderer.create(<ChicletXsmall {...chicletCardProps} />);

    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders Medium chiclet with title, icon, onClick, and url', () => {
    const chicletCardProps: IChicletCardProps = {
      url: 'contuso.sharepoint.com',
      title: 'My Daily Notes',
      itemType: 'docx',
      onClick: () => alert('test')
    };
    const component = renderer.create(<ChicletCard {...chicletCardProps} />);

    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });
});
