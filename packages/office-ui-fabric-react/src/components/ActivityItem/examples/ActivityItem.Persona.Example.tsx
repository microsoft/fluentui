/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
import { css, classNamesFunction } from '../../../Utilities';
import { ActivityItem } from '../ActivityItem';
import {
  getStyles,
  IActivityItemExampleStyleProps,
  IActivityItemExampleStyles
} from './ActivityItem.Example.styles';
import { TestImages } from '../../../common/TestImages';
import { Link } from '../../../Link';

export class ActivityItemPersonaExample extends React.Component<React.Props<ActivityItemPersonaExample>, {}> {
  public render() {
    const getClassNames = classNamesFunction<IActivityItemExampleStyleProps, IActivityItemExampleStyles>();
    const classNames = getClassNames(getStyles);

    // tslint:disable:jsx-no-lambda
    const activityItemExamples = [
      {
        key: 1,
        activityDescription: [
          <Link key={ 1 } className={ css(classNames.nameText) } onClick={ () => { alert('A name was clicked.'); } } >Jack Howden</Link>,
          <span key={ 2 }> renamed </span>,
          <span key={ 3 } className={ css(classNames.nameText) }>DocumentTitle.docx</span>
        ],
        activityPersonas: [
          {
            imageUrl: TestImages.personaMale
          }
        ],
        comments: 'Hello, this is the text of my basic comment!',
        timeStamp: '23m ago'
      },
      {
        key: 2,
        activityDescription: [
          <Link key={ 1 } className={ css(classNames.nameText) } onClick={ () => { alert('A name was clicked.'); } } >Javiera Márquez</Link>,
          <span key={ 2 }> and </span>,
          <Link key={ 3 } className={ css(classNames.nameText) } onClick={ () => { alert('A name was clicked.'); } } >Amelia Povalіy</Link>,
          <span key={ 4 }> edited </span>,
          <Link key={ 5 } className={ css(classNames.nameText) } onClick={ () => { alert('A document was clicked.'); } } >SpreadsheetTitle.xlsx</Link>
        ],
        activityPersonas: [
          {
            imageInitials: 'JM',
            primaryText: 'Javiera Márquez'
          },
          {
            imageUrl: TestImages.personaFemale
          }
        ],
        timeStamp: '9:27 am'
      },
      {
        key: 3,
        activityDescription: [
          <Link key={ 1 } className={ css(classNames.nameText) } onClick={ () => { alert('A name was clicked.'); } } >Robert Larsson</Link>,
          <span key={ 2 }> and </span>,
          <Link key={ 3 } className={ css(classNames.nameText) } onClick={ () => { alert('A name was clicked.'); } } >2 others</Link>,
          <span key={ 4 }> commented </span>
        ],
        activityPersonas: [
          {
            imageInitials: 'RL',
            primaryText: 'Robert Larsson'
          },
          {
            imageUrl: TestImages.personaMale
          },
          {
            imageUrl: TestImages.personaFemale
          }
        ],
        timeStamp: '3 days ago'
      },
      {
        key: 4,
        activityDescription: [
          <Link key={ 1 } className={ css(classNames.nameText) } onClick={ () => { alert('A name was clicked.'); } } >Jin Cheng</Link>,
          <span key={ 2 }> and </span>,
          <Link key={ 3 } className={ css(classNames.nameText) } onClick={ () => { alert('A name was clicked.'); } } >5 others</Link>,
          <span key={ 4 }> edited this file</span>
        ],
        activityPersonas: [
          {
            imageInitials: 'JC',
            primaryText: 'Jin Cheng'
          },
          {
            imageUrl: TestImages.personaMale
          },
          {
            imageInitials: 'AL',
            primaryText: 'Annie Lindqvist'
          },
          {
            imageUrl: TestImages.personaFemale
          },
          {
            imageUrl: TestImages.personaMale
          },
          {
            imageUrl: TestImages.personaMale
          }
        ],
        timeStamp: 'August 3, 2017'
      }
    ];

    const activityExampleList: Array<JSX.Element> = [];
    activityItemExamples.forEach((item) => {
      const props = item;
      activityExampleList.push(
        <ActivityItem {...props} key={ item.key } className={ css(classNames.exampleRoot) } />
      );
    });

    return (
      <div>
        { activityExampleList }
      </div>
    );
  }
}
