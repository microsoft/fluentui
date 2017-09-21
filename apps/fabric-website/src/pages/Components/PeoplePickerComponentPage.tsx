import * as React from 'react';
import { PeoplePickerPage } from 'office-ui-fabric-react/lib/components/pickers/PeoplePicker/PeoplePickerPage';
import { PageHeader } from '../../components/PageHeader/PageHeader';
import { ComponentPage } from '../../components/ComponentPage/ComponentPage';
const pageStyles: any = require('../PageStyles.module.scss');

export class PeoplePickerComponentPage extends React.Component<any, any> {
  public render() {
    return (
      <div ref='pageElement' className={ pageStyles.pageTypography }>
        <ComponentPage>
          <PageHeader pageTitle='PeoplePicker' backgroundColor='#038387'
            links={
              [
                {
                  'text': 'Overview',
                  'location': 'Overview'
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
          <PeoplePickerPage isHeaderVisible={ false } />
        </ComponentPage>
      </div>
    );
  }
}
