import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { resetIdsForTests } from '@fluentui/react-utilities';
import { isConformant } from '../../testing/isConformant';
import { Divider } from './Divider';

describe('Divider', () => {
  afterEach(() => {
    resetIdsForTests();
  });

  isConformant({
    Component: Divider,
    displayName: 'Divider',
    testOptions: {
      'has-static-classnames': [
        {
          props: { children: 'Test Children' },
        },
      ],
    },
  });

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

  it('renders a subtle appearance', () => {
    const component = renderer.create(<Divider appearance="subtle">Subtle</Divider>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders a brand appearance', () => {
    const component = renderer.create(<Divider appearance="brand">Brand</Divider>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders a strong appearance', () => {
    const component = renderer.create(<Divider appearance="strong">Strong</Divider>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders content start aligned', () => {
    const component = renderer.create(<Divider alignContent="start">Start</Divider>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders content center aligned', () => {
    const component = renderer.create(<Divider alignContent="center">Center</Divider>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders content end aligned', () => {
    const component = renderer.create(<Divider alignContent="end">End</Divider>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders a divider with a different color', () => {
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
    const component = renderer.create(<Divider vertical>Vertical</Divider>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders a vertical divider with a fixed height', () => {
    const component = renderer.create(
      <Divider style={{ height: 100 }} vertical>
        fixed 100px height
      </Divider>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders a horizontal divider with a fixed width', () => {
    const component = renderer.create(<Divider style={{ width: 100 }}>fixed 100px width</Divider>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
