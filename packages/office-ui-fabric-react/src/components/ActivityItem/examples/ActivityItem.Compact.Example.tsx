import * as React from 'react';
import { ActivityItem, css, classNamesFunction, IActivityItemProps, Icon, IStyle } from 'office-ui-fabric-react';
import { TestImages } from '../../../common/TestImages';

type IActivityItemExampleStyleProps = {};

interface IActivityItemExampleStyles {
  exampleRoot?: IStyle;
  nameText?: IStyle;
}

const exampleStyles: IActivityItemExampleStyles = {
  exampleRoot: {
    marginTop: '20px'
  },
  nameText: {
    fontWeight: 'bold'
  }
};

const getClassNames = classNamesFunction<IActivityItemExampleStyleProps, IActivityItemExampleStyles>();
const classNames = getClassNames(exampleStyles, {});

export class ActivityItemCompactExample extends React.Component<React.ClassAttributes<ActivityItemCompactExample>, {}> {
  public render(): JSX.Element {
    const activityItemExamples: Partial<IActivityItemProps & React.ClassAttributes<{}>>[] = [
      {
        key: 1,
        activityDescription: [
          <span key={1} className={css(classNames.nameText)}>
            Tahlia Whittle
          </span>,
          <span key={2}> edited this file</span>
        ],
        activityPersonas: [
          {
            imageUrl: TestImages.personaFemale
          }
        ],
        isCompact: true
      },
      {
        key: 2,
        activityDescription: [
          <span key={1} className={css(classNames.nameText)}>
            Patrick Loton
          </span>,
          <span key={2}> and </span>,
          <span key={3} className={css(classNames.nameText)}>
            {' '}
            6 others
          </span>
        ],
        activityPersonas: [
          {
            imageInitials: 'PT',
            text: 'Robert Larsson'
          },
          {
            imageUrl: TestImages.personaMale
          },
          {
            imageInitials: 'EC',
            text: 'Eduarda Costa'
          }
        ],
        isCompact: true
      },
      {
        key: 3,
        activityDescription: [
          <span key={1} className={css(classNames.nameText)}>
            Sabrina De Luca
          </span>,
          <span key={2}> added this file</span>
        ],
        activityIcon: <Icon iconName={'Add'} />,
        isCompact: true
      },
      {
        key: 4,
        activityDescription: [
          <span key={1} className={css(classNames.nameText)}>
            Chuan Rojumanong
          </span>,
          <span key={2}> shared this file</span>
        ],
        activityIcon: <Icon iconName={'Share'} />,
        isCompact: true
      }
    ];

    const activityExampleList: Array<JSX.Element> = [];
    activityItemExamples.forEach((item: { key: string | number }) => {
      const props = item;
      activityExampleList.push(<ActivityItem {...props as IActivityItemProps} key={item.key} className={css(classNames.exampleRoot)} />);
    });

    return <div>{activityExampleList}</div>;
  }
}
