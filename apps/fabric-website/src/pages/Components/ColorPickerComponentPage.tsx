import * as React from 'react';
import { ColorPickerPage } from 'office-ui-fabric-react/lib/demo/pages/ColorPickerPage/ColorPickerPage';
import { PageHeader } from '../../components/PageHeader/PageHeader';
import { ComponentPage } from '../../components/ComponentPage/ComponentPage';

export class ColorPickerComponentPage extends React.Component<any, any> {
  public render() {
    return (
      <div ref='pageElement'>
        <ComponentPage>
          <PageHeader pageTitle='ColorPicker' backgroundColor='#038387'
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
          <ColorPickerPage isHeaderVisible={ false } />
        </ComponentPage>
      </div>
    );
  }
}
