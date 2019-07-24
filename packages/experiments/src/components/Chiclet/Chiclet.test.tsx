import * as React from 'react';
import * as renderer from 'react-test-renderer';

import { ChicletXsmall } from './ChicletXsmall';
import { ChicletCard } from './ChicletCard';
import { IChicletCardProps } from './ChicletCard.types';
import { mergeStyles } from '../../Styling';

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

      return (
        <img
          src="https://vetstreet.brightspotcdn.com/dims4/default/ac70f62/2147483647/thumbnail/645x380/quality/90/?url=https%3A%2F%2Fvetstreet-brightspot.s3.amazonaws.com%2F5b%2Fe6%2F1dc93ba2496a9d9c3608cba0b41e%2FDachshund-AP-08EJPM-645sm101513.jpg"
          className={className}
        />
      );
    };

    const component = renderer.create(<Prev className={test} />);

    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });
});
