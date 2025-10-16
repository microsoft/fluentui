import * as React from 'react';
import { render } from '@testing-library/react';

import { ChicletXsmall } from './ChicletXsmall';
import { ChicletCard } from './ChicletCard';
import type { IChicletCardProps } from './ChicletCard.types';

describe('Chiclet', () => {
  it('renders Xsmall chiclet with a title, icon, onClick, and url', () => {
    const chicletCardProps: IChicletCardProps = {
      url: 'contoso.sharepoint.com',
      title: 'My Daily Notes',
      itemType: 'docx',
      onClick: () => console.log('test'),
    };
    const component = render(<ChicletXsmall {...chicletCardProps} />);

    expect(component.container.firstChild).toMatchSnapshot();
  });

  it('renders Xsmall chiclet with title, preview, onClick, and url', () => {
    const chicletCardProps: IChicletCardProps = {
      url: 'contoso.sharepoint.com',
      title: 'My Daily Notes',
      itemType: 'docx',
      image: 'https://imaging.nikon.com/lineup/dslr/df/img/sample/img_01.jpg',
      onClick: () => console.log('test'),
    };
    const component = render(<ChicletXsmall {...chicletCardProps} />);

    expect(component.container.firstChild).toMatchSnapshot();
  });

  it('renders Xsmall Chiclet with the correct icon from a file extension', () => {
    const chicletCardProps: IChicletCardProps = {
      url: 'contoso.sharepoint.com',
      title: 'My Daily Notes.xlsx',
      onClick: () => console.log('test'),
    };
    const component = render(<ChicletXsmall {...chicletCardProps} />);

    expect(component.container.firstChild).toMatchSnapshot();
  });

  it('renders Medium chiclet with title, icon, onClick, and url', () => {
    const chicletCardProps: IChicletCardProps = {
      url: 'contoso.sharepoint.com',
      title: 'My Daily Notes',
      itemType: 'docx',
      onClick: () => console.log('test'),
    };
    const component = render(<ChicletCard {...chicletCardProps} />);

    expect(component.container.firstChild).toMatchSnapshot();
  });

  it('should set className on preview', () => {
    const chicletCardProps: IChicletCardProps = {
      url: 'contoso.sharepoint.com',
      title: 'My Daily Notes',
      itemType: 'docx',
      onClick: () => console.log('test'),
    };

    const Preview: React.FunctionComponent<React.HTMLAttributes<HTMLElement>> = props => {
      return <img src="http://via.placeholder.com/100x100" {...props} />;
    };

    const component = render(<ChicletCard {...chicletCardProps} preview={<Preview />} />);

    expect(component.container.firstChild).toMatchSnapshot();
  });
});
