import * as React from 'react';
import * as renderer from 'react-test-renderer';

import { ChicletXsmall } from './ChicletXsmall';
import { ChicletCard } from './ChicletCard';
import { IChicletCardProps } from './ChicletCard.types';
import { mergeStyles } from '../../Styling';
import { mount } from 'enzyme';

describe('Chiclet', () => {
  it('renders Xsmall chiclet with a title, icon, onClick, and url', () => {
    const chicletCardProps: IChicletCardProps = {
      url: 'contoso.sharepoint.com',
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
      url: 'contoso.sharepoint.com',
      title: 'My Daily Notes',
      itemType: 'docx',
      image: 'https://imaging.nikon.com/lineup/dslr/df/img/sample/img_01.jpg',
      onClick: () => alert('test')
    };
    const component = renderer.create(<ChicletXsmall {...chicletCardProps} />);

    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders Xsmall Chiclet with the correct icon from a file extension', () => {
    const chicletCardProps: IChicletCardProps = {
      url: 'contoso.sharepoint.com',
      title: 'My Daily Notes.xlsx',
      onClick: () => alert('test')
    };
    const component = renderer.create(<ChicletXsmall {...chicletCardProps} />);

    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders Medium chiclet with title, icon, onClick, and url', () => {
    const chicletCardProps: IChicletCardProps = {
      url: 'contoso.sharepoint.com',
      title: 'My Daily Notes',
      itemType: 'docx',
      onClick: () => alert('test')
    };
    const component = renderer.create(<ChicletCard {...chicletCardProps} />);

    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });
});

describe('Class Change', () => {
  it('should change the classname', () => {
    const test = mergeStyles({
      maxWidth: '100%'
    });
    const Prev: React.FunctionComponent<{ className: string }> = props => {
      const { className } = props;

      return <img src="http://placehold.it/100x100" className={className} />;
    };

    const component = renderer.create(<Prev className={test} />);

    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should have the correct styling', () => {
    const chicletCardProps: IChicletCardProps = {
      url: 'contoso.sharepoint.com',
      title: 'My Daily Notes',
      itemType: 'docx',
      onClick: () => alert('test')
    };

    const Prev: React.FunctionComponent<{}> = props => {
      return <img src="http://placehold.it/100x100" {...props} />;
    };

    const component = mount(<ChicletCard {...chicletCardProps} preview={Prev} />);
    const root = component.getDOMNode() as HTMLElement;
    const prev = root.getElementsByClassName('ms-ChicletCard-preview')[0];
    const innerPrev = prev.firstChild as HTMLElement;

    const style = getComputedStyle(innerPrev);

    expect(style.height).toBe('126px');
    expect(style.width).toBe('100%');
    expect(style.objectFit).toBe('contain');
  });
});
