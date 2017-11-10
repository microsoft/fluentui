/* tslint:disable-next-line:no-unused-variable */
import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { ActivityItem } from './ActivityItem';
import { Icon } from '../Icon';

const defaultProps = {
  key: 1,
  activityDescription: <span>description text</span>,
  comments: <span>comment text</span>,
  timeStamp: 'timestamp text'
};

describe('ActivityItem', () => {

  it('renders ActivityItem with an icon, description, comment, and timestamp', () => {
    let component = renderer.create(
      <ActivityItem
        {...defaultProps}
        activityIcon={ <Icon iconName={ 'Message' } /> }
      />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders ActivityItem with persona correctly', () => {
    let component = renderer.create(
      <ActivityItem />
    );

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

});
