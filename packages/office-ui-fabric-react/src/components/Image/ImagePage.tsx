import * as React from 'react';
import './ImagePage.scss';
import { DemoPage } from '../../demo/components/DemoPage';
import { IDemoPageProps } from '../../demo/components/DemoPage.types';
import { ImageDefaultExample } from './examples/Image.Default.Example';
import { ImageCenterExample } from './examples/Image.Center.Example';
import { ImageContainExample } from './examples/Image.Contain.Example';
import { ImageCoverExample } from './examples/Image.Cover.Example';
import { ImageNoneExample } from './examples/Image.None.Example';
import { ImageMaximizeFrameExample } from './examples/Image.MaximizeFrame.Example';
import { ImageStatus } from './Image.checklist';

const ImageDefaultExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Image/examples/Image.Default.Example.tsx') as string;
const ImageCenterExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Image/examples/Image.Center.Example.tsx') as string;
const ImageContainExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Image/examples/Image.Contain.Example.tsx') as string;
const ImageCoverExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Image/examples/Image.Cover.Example.tsx') as string;
const ImageNoneExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Image/examples/Image.None.Example.tsx') as string;
const ImageMaximizeFrameExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Image/examples/Image.MaximizeFrame.Example.tsx') as string;

export const ImagePageProps: IDemoPageProps = {
  title: 'Image',
  componentName: 'Image',
  componentUrl:
    'https://github.com/OfficeDev/office-ui-fabric-react/tree/master/packages/office-ui-fabric-react/src/components/Image',
  componentStatus: ImageStatus,
  examples: [
    {
      title: 'ImageFit: Not specified',
      code: ImageDefaultExampleCode,
      view: <ImageDefaultExample />
    },
    {
      title: 'ImageFit: None',
      code: ImageNoneExampleCode,
      view: <ImageNoneExample />
    },
    {
      title: 'ImageFit: Center',
      code: ImageCenterExampleCode,
      view: <ImageCenterExample />
    },
    {
      title: 'ImageFit: Contain',
      code: ImageContainExampleCode,
      view: <ImageContainExample />
    },
    {
      title: 'ImageFit: Cover',
      code: ImageCoverExampleCode,
      view: <ImageCoverExample />
    },
    {
      title: 'Maximizing the image frame',
      code: ImageMaximizeFrameExampleCode,
      view: <ImageMaximizeFrameExample />
    }
  ],
  propertiesTablesSources: [
    require<
      string
    >('!raw-loader!office-ui-fabric-react/src/components/Image/Image.types.ts')
  ],
  overview: require<
    string
  >('!raw-loader!office-ui-fabric-react/src/components/Image/docs/ImageOverview.md'),
  bestPractices: '',
  dos: require<
    string
  >('!raw-loader!office-ui-fabric-react/src/components/Image/docs/ImageDos.md'),
  donts: require<
    string
  >('!raw-loader!office-ui-fabric-react/src/components/Image/docs/ImageDonts.md'),
  isHeaderVisible: true,
  allowNativeProps: true,
  nativePropsElement: 'img'
};

export const ImagePage = (props: { isHeaderVisible: boolean }) =>
  <DemoPage {...{ ...ImagePageProps, ...props }} />;
