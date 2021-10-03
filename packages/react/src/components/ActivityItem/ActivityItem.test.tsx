import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { TestImages } from '@fluentui/example-data';
import { ActivityItem } from './ActivityItem';
import { Icon } from '../../Icon';
import { isConformant } from '../../common/isConformant';
import type { IPersonaSharedProps } from '../../Persona';

const defaultProps = {
  key: 1,
  activityDescription: <span>description text</span>,
  comments: <span>comment text</span>,
  timeStamp: 'timestamp text',
};

const defaultPersonaProps: IPersonaSharedProps[] = [
  {
    imageInitials: 'TN',
    text: 'Test Name',
  },
  {
    imageUrl: TestImages.personaFemale,
  },
  {
    imageInitials: 'AN',
    text: 'Another Name',
  },
  {
    imageUrl: TestImages.personaMale,
  },
];

describe('ActivityItem', () => {
  it('renders with an icon correctly', () => {
    const component = renderer.create(<ActivityItem {...defaultProps} activityIcon={<Icon iconName={'Message'} />} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders with a single persona correctly', () => {
    const component = renderer.create(<ActivityItem {...defaultProps} activityPersonas={[defaultPersonaProps[0]]} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders with multiple personas correctly', () => {
    const component = renderer.create(<ActivityItem {...defaultProps} activityPersonas={defaultPersonaProps} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders compact with an icon correctly', () => {
    const component = renderer.create(
      <ActivityItem {...defaultProps} activityIcon={<Icon iconName={'Message'} />} isCompact={true} />,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders compact with a single persona correctly', () => {
    const component = renderer.create(
      <ActivityItem {...defaultProps} activityPersonas={[defaultPersonaProps[0]]} isCompact={true} />,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders compact with multiple personas correctly', () => {
    const component = renderer.create(
      <ActivityItem {...defaultProps} activityPersonas={defaultPersonaProps} isCompact={true} />,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders compact with animation correctly', () => {
    const component = renderer.create(
      <ActivityItem
        {...defaultProps}
        activityPersonas={[defaultPersonaProps[0]]}
        isCompact={true}
        animateBeaconSignal={true}
      />,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  isConformant({
    Component: ActivityItem,
    displayName: 'ActivityItem',
    // Problem: Doesn’t pass ref to the root element.
    // Solution: Ensure ref is passed correctly to the root element.
    disabledTests: ['component-handles-ref', 'component-has-root-ref'],
  });
});
