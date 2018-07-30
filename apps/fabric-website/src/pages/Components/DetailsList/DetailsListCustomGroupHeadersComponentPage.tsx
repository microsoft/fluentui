import * as React from 'react';
import { DetailsListCustomGroupHeadersPage } from '@uifabric/fabric-website-resources/lib/components/pages/DetailsList/DetailsListCustomGroupHeadersPage';

export class DetailsListCustomGroupHeadersComponentPage extends React.Component<any, any> {
  public render(): JSX.Element {
    return <DetailsListCustomGroupHeadersPage isHeaderVisible={false} />;
  }
}
