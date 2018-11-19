import * as React from 'react';
import { DetailsListCustomRowsPage } from '@uifabric/fabric-website-resources/lib/components/pages/DetailsList/DetailsListCustomRowsPage';

export class DetailsListCustomRowsComponentPage extends React.Component<any, any> {
  public render(): JSX.Element {
    return <DetailsListCustomRowsPage isHeaderVisible={false} />;
  }
}
