/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
import { ActivityItem } from '../ActivityItem';
import './ActivityItemExample.scss';
import { activityItemCompactExamples } from './ActivityItemExampleData';

export class ActivityItemCompactExample extends React.Component<React.Props<ActivityItemCompactExample>, {}> {
  public render() {
    let activityExampleList = [];
    activityItemCompactExamples.forEach((item) => {
      let props = item;
      activityExampleList.push(
        <ActivityItem {...props} isCompact={ true } />
      );
    });

    return (
      <div>
        { activityExampleList }
      </div>
    );
  }
}
