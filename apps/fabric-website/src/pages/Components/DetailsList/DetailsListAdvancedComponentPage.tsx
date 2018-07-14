import * as React from 'react';
import { DetailsListAdvancedPage } from '@uifabric/fabric-website-resources/lib/components/pages/DetailsList/DetailsListAdvancedPage';

export class DetailsListAdvancedComponentPage extends React.Component<any, any> {
  public render(): JSX.Element {
    return <DetailsListAdvancedPage isHeaderVisible={false} />;
  }
}
