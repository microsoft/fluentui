import * as React from 'react';
import { AnnotationType, MultiCountChart } from '@uifabric/dashboard';

export class MultiCountChartExample extends React.Component<{}, {}> {
  public render(): JSX.Element {
    const rows = [
      {
        data: 13000,
        bodyText: 'Flagged users',
        annotaionText: 'Annotation Text',
        color: 'blue',
        type: AnnotationType.positive
      },
      {
        data: 8000000,
        bodyText: 'Risky sign-ins',
        annotaionText: 'Decrease in the safety',
        color: 'green',
        type: AnnotationType.negative
      },
      {
        data: 331100000,
        bodyText: 'Risky sign-ins',
        annotaionText: 'Annotation',
        color: 'red',
        type: AnnotationType.neutral
      }
    ];
    return <MultiCountChart multiCountRows={rows} />;
  }
}
