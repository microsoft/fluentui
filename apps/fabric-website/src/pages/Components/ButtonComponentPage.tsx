import * as React from 'react';
import { ButtonPage } from 'office-ui-fabric-react/lib/components/Button/ButtonPage';
import { PageHeader } from '../../components/PageHeader/PageHeader';
import { ComponentPage } from '../../components/ComponentPage/ComponentPage';
const pageStyles: any = require('../PageStyles.module.scss');

export class ButtonComponentPage extends React.Component<any, any> {
  public render() {
    return (

      <div ref='pageElement' className={ pageStyles.basePage }>
        <ComponentPage>
          <PageHeader pageTitle='Button' backgroundColor='#038387'
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
            } />
          <ButtonPage isHeaderVisible={ false } />
        </ComponentPage>
      </div>
    );
  }
}
