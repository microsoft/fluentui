import * as React from 'react';
import { IDocPageProps } from '../../common/DocPage.types';
import { ImageCenterExample } from './examples/Image.Center.Example';
import { ImageCenterContainExample } from './examples/Image.CenterContain.Example';
import { ImageCenterCoverExample } from './examples/Image.CenterCover.Example';
import { ImageContainExample } from './examples/Image.Contain.Example';
import { ImageCoverExample } from './examples/Image.Cover.Example';
import { ImageDefaultExample } from './examples/Image.Default.Example';
import { ImageMaximizeFrameExample } from './examples/Image.MaximizeFrame.Example';
import { ImageNoneExample } from './examples/Image.None.Example';
import './ImagePage.global.scss';

const ImageDefaultExampleCode = require('!raw-loader!@fluentui/react-next/src/components/Image/examples/Image.Default.Example.tsx') as string;
const ImageCenterExampleCode = require('!raw-loader!@fluentui/react-next/src/components/Image/examples/Image.Center.Example.tsx') as string;
const ImageContainExampleCode = require('!raw-loader!@fluentui/react-next/src/components/Image/examples/Image.Contain.Example.tsx') as string;
const ImageCoverExampleCode = require('!raw-loader!@fluentui/react-next/src/components/Image/examples/Image.Cover.Example.tsx') as string;
const ImageCenterContainExampleCode = require('!raw-loader!@fluentui/react-next/src/components/Image/examples/Image.CenterContain.Example.tsx') as string;
const ImageCenterCoverExampleCode = require('!raw-loader!@fluentui/react-next/src/components/Image/examples/Image.CenterCover.Example.tsx') as string;
const ImageNoneExampleCode = require('!raw-loader!@fluentui/react-next/src/components/Image/examples/Image.None.Example.tsx') as string;
const ImageMaximizeFrameExampleCode = require('!raw-loader!@fluentui/react-next/src/components/Image/examples/Image.MaximizeFrame.Example.tsx') as string;

export const ImagePageProps: IDocPageProps = {
  title: 'Image',
  componentName: 'Image',
  componentUrl: 'https://github.com/microsoft/fluentui/tree/master/packages/react-next/src/components/Image',
  examples: [
    {
      title: 'ImageFit: Not specified',
      code: ImageDefaultExampleCode,
      view: <ImageDefaultExample />,
    },
    {
      title: 'ImageFit: None',
      code: ImageNoneExampleCode,
      view: <ImageNoneExample />,
    },
    {
      title: 'ImageFit: Center',
      code: ImageCenterExampleCode,
      view: <ImageCenterExample />,
    },
    {
      title: 'ImageFit: Contain',
      code: ImageContainExampleCode,
      view: <ImageContainExample />,
    },
    {
      title: 'ImageFit: Cover',
      code: ImageCoverExampleCode,
      view: <ImageCoverExample />,
    },
    {
      title: 'ImageFit: CenterContain',
      code: ImageCenterContainExampleCode,
      view: <ImageCenterContainExample />,
    },
    {
      title: 'ImageFit: CenterCover',
      code: ImageCenterCoverExampleCode,
      view: <ImageCenterCoverExample />,
    },
    {
      title: 'Maximizing the image frame',
      code: ImageMaximizeFrameExampleCode,
      view: <ImageMaximizeFrameExample />,
    },
  ],
  overview: require<string>('!raw-loader!@fluentui/react-next/src/components/Image/docs/ImageOverview.md'),
  bestPractices: require<string>('!raw-loader!@fluentui/react-next/src/components/Image/docs/ImageBestPractices.md'),
  dos: require<string>('!raw-loader!@fluentui/react-next/src/components/Image/docs/ImageDos.md'),
  donts: require<string>('!raw-loader!@fluentui/react-next/src/components/Image/docs/ImageDonts.md'),
  isHeaderVisible: true,
  isFeedbackVisible: true,
  allowNativeProps: true,
  nativePropsElement: 'img',
};
