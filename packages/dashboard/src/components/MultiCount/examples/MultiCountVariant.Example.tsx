import * as React from 'react';
import { AnnotationType, IMultiCountRow, MultiCount } from '@uifabric/dashboard';
import { DefaultPalette } from 'office-ui-fabric-react/lib/Styling';

export class MultiCountVariantExample extends React.Component<{}, {}> {
  public render(): JSX.Element {
    const rows: IMultiCountRow[] = [
      {
        data: 13100,
        bodyText: 'Flagged users',
        annotaionText: 'Annotation Text ',
        color: DefaultPalette.blue,
        type: AnnotationType.positive
      },
      {
        data: 7100000000,
        bodyText: 'Risky sign-ins',
        annotaionText: 'Decrease in the safety',
        color: DefaultPalette.blue,
        type: AnnotationType.negative
      },
      {
        data: 7000000000,
        bodyText: 'Risky sign-ins',
        annotaionText: 'Decrease in the safety',
        color: DefaultPalette.blue,
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
    return (
      <MultiCount
        multiCountRows={rows}
        bodyTextFontSize={'16px'}
        annotationTextColor={DefaultPalette.green}
        annotationTextFontSize={'12px'}
        bodyTextColor={DefaultPalette.green}
      />
    );
  }
}
