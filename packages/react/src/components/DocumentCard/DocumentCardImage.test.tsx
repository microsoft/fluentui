import * as React from 'react';
import { render } from '@testing-library/react';

import { TestImages } from '@fluentui/example-data';
import { ImageFit } from '../../Image';
import { DocumentCardImage } from './DocumentCardImage';

describe('DocumentCard', () => {
  it('renders DocumentCardImage correctly without an image provided', () => {
    const { container } = render(
      <DocumentCardImage
        height={150}
        iconProps={{
          iconName: 'OneNoteLogo',
          styles: { root: { color: '#813a7c', fontSize: '120px', width: '120px', height: '120px' } },
        }}
      />,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders DocumentCardImage correctly with an invalid image', () => {
    const { container } = render(
      <DocumentCardImage
        height={150}
        imageSrc={'someinvalidurl'}
        iconProps={{
          iconName: 'OneNoteLogo',
          styles: { root: { color: '#813a7c', fontSize: '120px', width: '120px', height: '120px' } },
        }}
      />,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders DocumentCardImage correctly with a valid image', () => {
    const { container } = render(
      <DocumentCardImage
        height={100}
        imageFit={ImageFit.cover}
        iconProps={{ iconName: 'OneNoteLogo', styles: { root: { color: '#813a7c' } } }}
        imageSrc={TestImages.documentPreviewTwo}
      />,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders DocumentCardImage correctly without an image or icon', () => {
    const { container } = render(<DocumentCardImage height={100} />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
