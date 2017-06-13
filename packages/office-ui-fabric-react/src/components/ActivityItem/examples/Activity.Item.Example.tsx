/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
import { ActivityItem } from '../ActivityItem';
import './ActivityItemExample.scss';
import { TestImages } from '../../../common/TestImages';
import { activityItemExamples } from './ActivityItemExampleData';

export class ActivityItemExample extends React.Component<any, any> {
  public render() {
    let activityExampleList = [];
    activityItemExamples.forEach((item) => {
      let props = item;
      activityExampleList.push(
        <ActivityItem {...props} />
      );
    })

    return (
      <div>
        { activityExampleList }
      </div>
    );
  }
}
