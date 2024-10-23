import { IDocumentCardPreviewProps, ImageFit } from '@fluentui/react';
import { TestImages } from '@fluentui/example-data';

export const previewProps: IDocumentCardPreviewProps = {
  previewImages: [
    {
      name: 'Revenue stream proposal fiscal year 2016 version02.pptx',
      linkProps: {
        href: 'http://bing.com',
      },
      previewImageSrc: TestImages.documentPreview,
      iconSrc: TestImages.iconPpt,
      imageFit: ImageFit.cover,
      width: 318,
      height: 196,
    },
  ],
};
