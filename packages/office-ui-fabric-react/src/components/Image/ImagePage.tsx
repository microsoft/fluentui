import * as React from 'react';
import {
  ExampleCard,
  IComponentDemoPageProps,
  ComponentPage,
  PropertiesTableSet
} from '@uifabric/example-app-base';
import './ImagePage.scss';
import { ImageDefaultExample } from './examples/Image.Default.Example';
import { ImageCenterExample } from './examples/Image.Center.Example';
import { ImageContainExample } from './examples/Image.Contain.Example';
import { ImageCoverExample } from './examples/Image.Cover.Example';
import { ImageNoneExample } from './examples/Image.None.Example';
import { ImageMaximizeFrameExample } from './examples/Image.MaximizeFrame.Example';

const ImageDefaultExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Image/examples/Image.Default.Example.tsx') as string;
const ImageCenterExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Image/examples/Image.Center.Example.tsx') as string;
const ImageContainExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Image/examples/Image.Contain.Example.tsx') as string;
const ImageCoverExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Image/examples/Image.Cover.Example.tsx') as string;
const ImageNoneExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Image/examples/Image.None.Example.tsx') as string;
const ImageMaximizeFrameExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Image/examples/Image.MaximizeFrame.Example.tsx') as string;

export class ImagePage extends React.Component<IComponentDemoPageProps, {}> {
  public render() {
    return (
      <ComponentPage
        title='Image'
        componentName='ImageExample'
        exampleCards={
          <div>
            <ExampleCard title='ImageFit: Not specified' code={ ImageDefaultExampleCode }>
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
            <ExampleCard title='Maximizing the image frame' code={ ImageMaximizeFrameExampleCode }>
              <ImageMaximizeFrameExample />
            </ExampleCard>
          </div>
        }
        propertiesTables={
          <PropertiesTableSet
            sources={ [
              require<string>('!raw-loader!office-ui-fabric-react/src/components/Image/Image.Props.ts')
            ] }
          />
        }
        overview={
          <div>
            Images render an image. The borders have been added to these examples in order to help visualize empty space in the image frame.
          </div>
        }
        bestPractices={
          <div/>
        }
        dos={
          <div>
            <ul>
              <li>Provide descriptive values for the alt text attribute for all images.</li>
            </ul>
          </div>
        }
        donts={
          <div/>
        }
        isHeaderVisible={ this.props.isHeaderVisible }
      />
    );
  }
}
