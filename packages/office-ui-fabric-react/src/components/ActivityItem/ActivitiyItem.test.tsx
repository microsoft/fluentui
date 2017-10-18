import * as React from 'react';
import * as renderer from 'react-test-renderer';

import { ActivityItem } from './ActivityItem';

const defaultProps = {
  key: 1,
  activityDescription: <span>Activity description content</span>,
  comments: <span>Comment content</span>,
  timeStamp: 'Timestamp content'
};

describe('ActivityItem', () => {
  it('renders ActivitiyItem correctly', () => {
    const component = renderer.create(<ActivityItem {...defaultProps} />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});