import * as React from 'react';
import { DetailsListShimmerPage } from '@uifabric/fabric-website-resources/lib/components/pages/DetailsList/DetailsListShimmerPage';

export class DetailsListShimmerComponentPage extends React.Component<any, any> {
  public render(): JSX.Element {
    return <DetailsListShimmerPage isHeaderVisible={false} />;
  }
}
