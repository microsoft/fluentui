import { resetIdsForTests } from '@fluentui/react-utilities';
import * as React from 'react';
import { Divider } from './Divider';
import * as renderer from 'react-test-renderer';
import { isConformant } from '../../common/isConformant';

describe('Divider', () => {
  afterEach(() => {
    resetIdsForTests();
  });

  isConformant({
    Component: Divider,
    displayName: 'Divider',
  });

  /**
   * Note: see more visual regression tests for Divider in /apps/vr-tests.
   */
  it('renders a default divider', () => {
    const component = renderer.create(<Divider />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders a divider with content', () => {
    const component = renderer.create(<Divider>Default Divider</Divider>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders a divider with inset', () => {
    const component = renderer.create(<Divider inset>Inset</Divider>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders a subtle state with content', () => {
    const component = renderer.create(<Divider appearance="subtle">Subtle</Divider>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders a brand state with content', () => {
    const component = renderer.create(<Divider appearance="brand">Brand</Divider>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders a strong state with content', () => {
    const component = renderer.create(<Divider appearance="strong">Strong</Divider>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders a content aligned start', () => {
    const component = renderer.create(<Divider alignContent="start">Start</Divider>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders a content aligned center', () => {
    const component = renderer.create(<Divider alignContent="center">Center</Divider>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders a content aligned end', () => {
    const component = renderer.create(<Divider alignContent="end">End</Divider>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders a divider with important', () => {
    const component = renderer.create(<Divider important>Important</Divider>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders a divider with different color', () => {
    const component = renderer.create(<Divider color="#FF00FF" />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders a vertical divider', () => {
    const component = renderer.create(<Divider vertical />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders a vertical divider with content', () => {
    const component = renderer.create(<Divider>Vertical</Divider>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders a vertical a fixed height', () => {
    const component = renderer.create(<Divider style={{ height: 100 }}>fixed 100px height</Divider>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders a horizontal a fixed width', () => {
    const component = renderer.create(<Divider style={{ width: 100 }}>fixed 100px width</Divider>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
