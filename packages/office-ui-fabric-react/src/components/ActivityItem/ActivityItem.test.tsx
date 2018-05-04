/* tslint:disable-next-line:no-unused-variable */
import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { ActivityItem } from './ActivityItem';
import { Icon } from '../../Icon';
import { TestImages } from '../../common/TestImages';

const defaultProps = {
  key: 1,
  activityDescription: <span>description text</span>,
  comments: <span>comment text</span>,
  timeStamp: 'timestamp text'
};

const defaultPersonaProps = [
  {
    imageInitials: 'TN',
    primaryText: 'Test Name'
  },
  {
    imageUrl: TestImages.personaFemale
  },
  {
    imageInitials: 'AN',
    primaryText: 'Another Name'
  },
  {
    imageUrl: TestImages.personaMale
  }
];

describe('ActivityItem', () => {

  it('renders with an icon correctly', () => {
    const component = renderer.create(
      <ActivityItem
        { ...defaultProps }
        activityIcon={ <Icon iconName={ 'Message' } /> }
      />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders with a single persona correctly', () => {
    const component = renderer.create(
      <ActivityItem
        { ...defaultProps }
        activityPersonas={ [defaultPersonaProps[0]] }
      />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders with multiple personas correctly', () => {
    const component = renderer.create(
      <ActivityItem
        { ...defaultProps }
        activityPersonas={ defaultPersonaProps }
      />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders compact with an icon correctly', () => {
    const component = renderer.create(
      <ActivityItem
        { ...defaultProps }
        activityIcon={ <Icon iconName={ 'Message' } /> }
        isCompact={ true }
      />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders compact with a single persona correctly', () => {
    const component = renderer.create(
      <ActivityItem
        { ...defaultProps }
        activityPersonas={ [defaultPersonaProps[0]] }
        isCompact={ true }
      />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders compact with multiple personas correctly', () => {
    const component = renderer.create(
      <ActivityItem
        { ...defaultProps }
        activityPersonas={ defaultPersonaProps }
        isCompact={ true }
      />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders compact with animation correctly', () => {
    const component = renderer.create(
      <ActivityItem
        { ...defaultProps }
        activityPersonas={ [defaultPersonaProps[0]] }
        isCompact={ true }
        animateBeaconSignal={ true }
      />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

});
