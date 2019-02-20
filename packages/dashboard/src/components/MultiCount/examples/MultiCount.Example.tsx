import * as React from 'react';
import { AnnotationType, IMultiCountRow, MultiCount } from '@uifabric/dashboard';

import { DefaultPalette } from 'office-ui-fabric-react/lib/Styling';

export class MultiCountExample extends React.Component<{}, {}> {
  public render(): JSX.Element {
    const rows: IMultiCountRow[] = [
      {
        data: 109000,
        bodyText: 'Flagged users',
        annotaionText: 'Annotation Text',
        color: DefaultPalette.accent,
        type: AnnotationType.positive
      },
      {
        data: 8100000,
        bodyText: 'Risky sign-ins',
        annotaionText: 'Decrease in the safety',
        color: DefaultPalette.green,
        type: AnnotationType.negative
      },
      {
        data: 331100000,
        bodyText: 'Risky sign-ins',
        annotaionText: 'Annotation',
        color: DefaultPalette.blue,
        type: AnnotationType.neutral,
        hideIcon: true
      }
    ];

    return (
      <MultiCount multiCountRows={rows} customMessage={'Updatd 6:20pm today'} onClicked={this.onClicked} href={'https://www.google.com'} />
    );
  }
  public onClicked = () => {
    alert('onclick ');
  };
}
