import * as React from 'react';
import { DetailsListBasicPage } from '@uifabric/fabric-website-resources/lib/components/pages/DetailsList/DetailsListBasicPage';

export class DetailsListBasicComponentPage extends React.Component<any, any> {
  public render(): JSX.Element {
    return <DetailsListBasicPage isHeaderVisible={false} />;
  }
}
