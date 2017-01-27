import * as React from 'react';
import { ImagePage } from 'office-ui-fabric-react/lib/demo/pages/ImagePage/ImagePage';
import { PageHeader } from '../../components/PageHeader/PageHeader';
import { ComponentPage } from '../../components/ComponentPage/ComponentPage';

export class ImageComponentPage extends React.Component<any, any> {
  public render() {
    return (
      <div ref='pageElement'>
        <ComponentPage>
          <PageHeader pageTitle='Image' backgroundColor='#038387'
            links={
            [
              {
                'text': 'Overview',
                'location': 'Overview'
              },
              {
                'text': 'Best Practices',
                'location': 'Best Practices'
              },
              {
                'text': 'Variants',
                'location': 'Variants'
              },
              {
                'text': 'Implementation',
                'location': 'Implementation'
              }
            ]
          }/>
          <ImagePage isHeaderVisible={ false } />
        </ComponentPage>
      </div>
    );
  }
}
