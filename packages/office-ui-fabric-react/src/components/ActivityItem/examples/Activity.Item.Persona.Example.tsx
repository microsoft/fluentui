/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
import { ActivityItem } from '../ActivityItem';
import './ActivityItemExample.scss';
import { activityItemPersonaExamples } from './ActivityItemExampleData';

export class ActivityItemPersonaExample extends React.Component<React.Props<ActivityItemPersonaExample>, {}> {
  public render() {
    let activityExampleList = [];
    activityItemPersonaExamples.forEach((item) => {
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
