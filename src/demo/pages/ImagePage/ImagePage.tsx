import * as React from 'react';
import {
  ExampleCard,
  PropertiesTableSet
} from '../../components/index';

import { ImageDefaultExample } from './examples/Image.Default.Example';
import { ImageCenterExample } from './examples/Image.Center.Example';
import { ImageCoverExample } from './examples/Image.Cover.Example';
import { ImageScaleExample } from './examples/Image.Scale.Example';
import { ImageNoneExample } from './examples/Image.None.Example';

const ImageDefaultExampleCode = require('./examples/Image.Default.Example.tsx');
const ImageCenterExampleCode = require('./examples/Image.Center.Example.tsx');
const ImageCoverExampleCode = require('./examples/Image.Cover.Example.tsx');
const ImageNoneExampleCode = require('./examples/Image.None.Example.tsx');
const ImageScaleExampleCode = require('./examples/Image.Scale.Example.tsx');

export class ImagePage extends React.Component<any, any> {
  public render() {
    return (
      <div className='ms-ImageExample'>
        <h1 className='ms-font-xxl'>Image</h1>
        <div>
          <span> Images render an image.</span>
        </div>
        <h2 className='ms-font-xl'>Examples</h2>

        <ExampleCard title='ImageFit: Default' code={ ImageDefaultExampleCode }>
          <ImageDefaultExample />
        </ExampleCard>
        <ExampleCard title='ImageFit: None' code={ ImageNoneExampleCode }>
          <ImageNoneExample />
        </ExampleCard>
        <ExampleCard title='ImageFit: Center' code={ ImageCenterExampleCode }>
          <ImageCenterExample />
        </ExampleCard>
        <ExampleCard title='ImageFit: Cover' code={ ImageCoverExampleCode }>
          <ImageCoverExample />
        </ExampleCard>
        <ExampleCard title='ImageFit: Scale' code={ ImageScaleExampleCode }>
          <ImageScaleExample />
        </ExampleCard>

        <PropertiesTableSet componentName='Image' />
      </div>
    );
  }
}
