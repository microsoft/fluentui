import * as React from 'react';
import { DetailsListDragDropPage } from '@uifabric/fabric-website-resources/lib/components/pages/DetailsList/DetailsListDragDropPage';

export class DetailsListDragDropComponentPage extends React.Component<any, any> {
  public render(): JSX.Element {
    return <DetailsListDragDropPage isHeaderVisible={false} />;
  }
}
