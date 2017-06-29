/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
import { ActivityItem } from '../ActivityItem';
import './ActivityItemExample.scss';
import { activityItemCommentExamples } from './ActivityItemExampleData';

export class ActivityItemCommentExample extends React.Component<React.Props<ActivityItemCommentExample>, {}> {
  public render() {
    let activityExampleList = [];
    activityItemCommentExamples.forEach((item) => {
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
