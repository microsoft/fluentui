import * as React from 'react';
import { AnnotationType, MultiCount } from '@uifabric/dashboard';

import { DefaultPalette } from 'office-ui-fabric-react/lib/Styling';

export class MultiCountExample extends React.Component<{}, {}> {
  public render(): JSX.Element {
    const rows = [
      {
        data: 13000,
        bodyText: 'Flagged users',
        annotaionText: 'Annotation Text',
        color: DefaultPalette.accent,
        type: AnnotationType.positive
      },
      {
        data: 8000000,
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
        type: AnnotationType.neutral
      }
    ];
    return <MultiCount multiCountRows={rows} />;
  }
}
