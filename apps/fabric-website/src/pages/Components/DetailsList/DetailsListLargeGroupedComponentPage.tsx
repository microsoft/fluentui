import * as React from 'react';
import { DetailsListLargeGroupedPage } from '@uifabric/fabric-website-resources/lib/components/pages/DetailsList/DetailsListLargeGroupedPage';

export class DetailsListLargeGroupedComponentPage extends React.Component<any, any> {
  public render(): JSX.Element {
    return <DetailsListLargeGroupedPage isHeaderVisible={false} />;
  }
}
