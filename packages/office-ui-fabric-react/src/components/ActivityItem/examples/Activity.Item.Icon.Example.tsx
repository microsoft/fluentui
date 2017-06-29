/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
import { ActivityItem } from '../ActivityItem';
import './ActivityItemExample.scss';
import { activityItemIconExamples } from './ActivityItemExampleData';

export class ActivityItemIconExample extends React.Component<React.Props<ActivityItemIconExample>, {}> {
  public render() {
    let activityExampleList = [];
    activityItemIconExamples.forEach((item) => {
      let props = item;
      activityExampleList.push(
        <ActivityItem {...props} />
      );
    });

    return (
      <div>
        { activityExampleList }
      </div>
    );
  }
}
