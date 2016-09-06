import * as React from 'react';
import {
  ExampleCard,
  PropertiesTableSet
} from '../../components/index';
import './ImagePage.scss';

import { ImageDefaultExample } from './examples/Image.Default.Example';
import { ImageCenterExample } from './examples/Image.Center.Example';
import { ImageContainExample } from './examples/Image.Contain.Example';
import { ImageCoverExample } from './examples/Image.Cover.Example';
import { ImageNoneExample } from './examples/Image.None.Example';

const ImageDefaultExampleCode = require('./examples/Image.Default.Example.tsx');
const ImageCenterExampleCode = require('./examples/Image.Center.Example.tsx');
const ImageContainExampleCode = require('./examples/Image.Contain.Example.tsx');
const ImageCoverExampleCode = require('./examples/Image.Cover.Example.tsx');
const ImageNoneExampleCode = require('./examples/Image.None.Example.tsx');

export class ImagePage extends React.Component<any, any> {
  public render() {
    return (
      <div className='ImageExample'>
        <h1 className='ms-font-xxl'>Image</h1>
        <div>
          <span>
            Images render an image.
            The borders have been added to these examples in order to help visualize empty space in the image frame.
          </span>
        </div>
        <h2 className='ms-font-xl'>Examples</h2>

        <ExampleCard title='Default Behavior' code={ ImageDefaultExampleCode }>
          <ImageDefaultExample />
        </ExampleCard>
        <ExampleCard title='ImageFit: None' code={ ImageNoneExampleCode }>
          <ImageNoneExample />
        </ExampleCard>
        <ExampleCard title='ImageFit: Center' code={ ImageCenterExampleCode }>
          <ImageCenterExample />
        </ExampleCard>
        <ExampleCard title='ImageFit: Contain' code={ ImageContainExampleCode }>
          <ImageContainExample />
        </ExampleCard>
        <ExampleCard title='ImageFit: Cover' code={ ImageCoverExampleCode }>
          <ImageCoverExample />
        </ExampleCard>

        <PropertiesTableSet componentName='Image' />
      </div>
    );
  }
}
