import * as React from 'react';
import * as renderer from 'react-test-renderer';

import { resetIds } from '../../Utilities';

import { Pivot, PivotItem, PivotLinkFormat, PivotLinkSize } from './index';

describe('Pivot', () => {
  beforeEach(() => {
    // Resetting ids to create predictability in generated ids.
    resetIds();
  });

  it('renders link Pivot correctly', () => {
    const component = renderer.create(
      <Pivot>
        <PivotItem linkText="Test Link 1" />
        <PivotItem linkText="" />
      </Pivot>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders large link Pivot correctly', () => {
    const component = renderer.create(
      <Pivot linkSize={PivotLinkSize.large}>
        <PivotItem linkText="Test Link 1" />
        <PivotItem linkText="" />
      </Pivot>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders tabbed Pivot correctly', () => {
    const component = renderer.create(
      <Pivot linkFormat={PivotLinkFormat.tabs}>
        <PivotItem linkText="Test Link 1" />
        <PivotItem linkText="" />
      </Pivot>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders large tabbed Pivot correctly', () => {
    const component = renderer.create(
      <Pivot linkFormat={PivotLinkFormat.tabs} linkSize={PivotLinkSize.large}>
        <PivotItem linkText="Test Link 1" />
        <PivotItem linkText="" />
      </Pivot>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders Pivot correctly with custom className', () => {
    const component = renderer.create(
      <Pivot className="specialClassName">
        <PivotItem linkText="Test Link 1" className="specialClassName" />
        <PivotItem linkText="Test Link 2" />
      </Pivot>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders Pivot correctly with icon, text and count', () => {
    const component = renderer.create(
      <Pivot>
        <PivotItem itemCount={12} />
        <PivotItem linkText="Test Link" itemCount={12} />
        <PivotItem linkText="Text with icon" itemIcon="Recent" />
      </Pivot>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
