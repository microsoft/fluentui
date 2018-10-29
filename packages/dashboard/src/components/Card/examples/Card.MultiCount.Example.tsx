import * as React from 'react';
import { AnnotationType, Card, CardContentType, CardSize, ICardProps, IMultiCountRow, Priority } from '@uifabric/dashboard';
import { DefaultPalette } from 'office-ui-fabric-react/lib/Styling';

export class MultiCountExample extends React.Component<{}, {}> {
  constructor(props: ICardProps) {
    super(props);
  }

  public render(): JSX.Element {
    const cardFrameContent = {
      cardTitle: 'Multicount example',
      cardDropDownOptions: [
        {
          key: 'Remove',
          name: 'Remove',
          icon: 'PageRemove',
          ariaLabel: 'Remove card',
          title: 'Remove card',
          onClick: () => {
            alert('Remove clicked');
          }
        }
      ]
    };

    const rows: IMultiCountRow[] = [
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

    const contentAreaList = [
      {
        priority: Priority.Priority1,
        cardContentType: CardContentType.MultiCount,
        content: {
          multiCountRows: rows
        }
      }
    ];

    const header = {
      headerText: 'Header Text ',
      annotationText: 'Annotation Text '
    };

    return <Card cardFrameContent={cardFrameContent} header={header} cardContentList={contentAreaList} cardSize={CardSize.small} />;
  }
}
