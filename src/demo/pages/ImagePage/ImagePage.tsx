import * as React from 'react';
import {
  ExampleCard,
  PropertiesTableSet,
  ComponentPage
} from '../../components/index';
import './ImagePage.scss';

import { ImageDefaultExample } from './examples/Image.Default.Example';
import { ImageCenterExample } from './examples/Image.Center.Example';
import { ImageContainExample } from './examples/Image.Contain.Example';
import { ImageCoverExample } from './examples/Image.Cover.Example';
import { ImageNoneExample } from './examples/Image.None.Example';
import { getPageRouteFromState } from '../../utilities/pageroute';
import { AppState } from '../../components/App/AppState';
import { IComponentDemoPageProps } from '../../components/ComponentPage/IComponentDemoPageProps';

const ImageDefaultExampleCode = require('./examples/Image.Default.Example.tsx');
const ImageCenterExampleCode = require('./examples/Image.Center.Example.tsx');
const ImageContainExampleCode = require('./examples/Image.Contain.Example.tsx');
const ImageCoverExampleCode = require('./examples/Image.Cover.Example.tsx');
const ImageNoneExampleCode = require('./examples/Image.None.Example.tsx');

export class ImagePage extends React.Component<IComponentDemoPageProps, any> {
  private _url: string;

  constructor() {
    super();
    this._url = getPageRouteFromState(AppState, 'Basic components', 'Image');
  }

  public render() {
    return (
      <ComponentPage
        title='Image'
        componentName='ImageExample'
        exampleCards={
          <div>
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
          </div>
        }
        propertiesTables={
          <PropertiesTableSet componentName='Image' />
        }
        overview={
          <div>
            Images render an image. The borders have been added to these examples in order to help visualize empty space in the image frame.
          </div>
        }
        route={ this._url }
        isHeaderVisible={ this.props.isHeaderVisible }>
      </ComponentPage>
    );
  }
}
