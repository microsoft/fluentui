import * as React from 'react';
import { DetailsListCompactPage } from '@uifabric/fabric-website-resources/lib/components/pages/DetailsList/DetailsListCompactPage';

export class DetailsListCompactComponentPage extends React.Component<any, any> {
  public render(): JSX.Element {
    return <DetailsListCompactPage isHeaderVisible={false} />;
  }
}
