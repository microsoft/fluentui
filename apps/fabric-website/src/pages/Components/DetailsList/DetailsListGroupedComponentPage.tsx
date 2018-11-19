import * as React from 'react';
import { DetailsListSimpleGroupedPage } from '@uifabric/fabric-website-resources/lib/components/pages/DetailsList/DetailsListSimpleGroupedPage';

export class DetailsListGroupedComponentPage extends React.Component<any, any> {
  public render(): JSX.Element {
    return <DetailsListSimpleGroupedPage isHeaderVisible={false} />;
  }
}
