import * as React from 'react';
import * as renderer from 'react-test-renderer';

import { ActionButton, CommandBarButton, CompoundButton, DefaultButton, IconButton, MessageBarButton, PrimaryButton } from './index';

describe('Button Variants', () => {
  it('renders a DefaultButton correctly', () => {
    const component = renderer.create(<DefaultButton content="Button" />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders a disabled DefaultButton correctly', () => {
    const component = renderer.create(<DefaultButton disabled content="Button" />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders a PrimaryButton correctly', () => {
    const component = renderer.create(<PrimaryButton content="Button" />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders a disabled PrimaryButton correctly', () => {
    const component = renderer.create(<PrimaryButton disabled content="Button" />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders an ActionButton correctly', () => {
    const component = renderer.create(<ActionButton content="Button" />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders a disabled ActionButton correctly', () => {
    const component = renderer.create(<ActionButton disabled content="Button" />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders a CommandBarButton correctly', () => {
    const component = renderer.create(<CommandBarButton content="Button" />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders a disabled CommandBarButton correctly', () => {
    const component = renderer.create(<CommandBarButton disabled content="Button" />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders a default CompoundButton correctly', () => {
    const component = renderer.create(<CompoundButton content="Button" />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders a default disabled CompoundButton correctly', () => {
    const component = renderer.create(<CompoundButton disabled content="Button" />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders a primary CompoundButton correctly', () => {
    const component = renderer.create(<CompoundButton primary content="Button" />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders a primary disabled CompoundButton correctly', () => {
    const component = renderer.create(<CompoundButton primary disabled content="Button" />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders an IconButton correctly', () => {
    const component = renderer.create(<IconButton content="Button" />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders a disabled IconButton correctly', () => {
    const component = renderer.create(<IconButton disabled content="Button" />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders a default MessageBarButton correctly', () => {
    const component = renderer.create(<MessageBarButton content="Button" />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders a default disabled MessageBarButton correctly', () => {
    const component = renderer.create(<MessageBarButton disabled content="Button" />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders a primary MessageBarButton correctly', () => {
    const component = renderer.create(<MessageBarButton primary content="Button" />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders a primary disabled MessageBarButton correctly', () => {
    const component = renderer.create(<MessageBarButton primary disabled content="Button" />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
