import * as React from 'react';
import { mount } from 'enzyme';
import * as renderer from 'react-test-renderer';
import { mergeStyles } from '@uifabric/merge-styles';

import { Stack } from './Stack';

const sampleClass = mergeStyles({
  background: 'red'
});

describe('Stack', () => {
  it('can handle having no children in vertical Stack', () => {
    const createEmptyStack = () => {
      mount(<Stack />);
    };

    expect(createEmptyStack).not.toThrow();
  });

  it('can handle having no children in horizontal Stack', () => {
    const createEmptyStack = () => {
      mount(<Stack horizontal />);
    };

    expect(createEmptyStack).not.toThrow();
  });

  it('renders default vertical Stack correctly', () => {
    const component = renderer.create(
      <Stack>
        <div>Item 1</div>
        <div>Item 2</div>
      </Stack>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders reversed vertical Stack correctly', () => {
    const component = renderer.create(
      <Stack reversed>
        <div>Item 1</div>
        <div>Item 2</div>
      </Stack>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders default horizontal Stack correctly', () => {
    const component = renderer.create(
      <Stack horizontal>
        <div>Item 1</div>
        <div>Item 2</div>
      </Stack>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders reversed horizontal Stack correctly', () => {
    const component = renderer.create(
      <Stack horizontal reversed>
        <div>Item 1</div>
        <div>Item 2</div>
      </Stack>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders vertical Stack with vertical and horizontal alignment correctly', () => {
    const component = renderer.create(
      <Stack horizontalAlign="start" verticalAlign="end">
        <div>Item 1</div>
        <div>Item 2</div>
      </Stack>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders horizontal Stack with vertical and horizontal alignment correctly', () => {
    const component = renderer.create(
      <Stack horizontal horizontalAlign="start" verticalAlign="end">
        <div>Item 1</div>
        <div>Item 2</div>
      </Stack>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders vertical Stack with vertical and horizontal fill correctly', () => {
    const component = renderer.create(
      <Stack horizontalFill verticalFill>
        <div>Item 1</div>
        <div>Item 2</div>
      </Stack>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders horizontal Stack with vertical and horizontal fill correctly', () => {
    const component = renderer.create(
      <Stack horizontal horizontalFill verticalFill>
        <div>Item 1</div>
        <div>Item 2</div>
      </Stack>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders vertical Stack with grow correctly', () => {
    const component = renderer.create(
      <Stack>
        <Stack grow={5}>Item 1</Stack>
        <Stack grow={2}>Item 2</Stack>
        <Stack grow>Item 3</Stack>
      </Stack>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders horizontal Stack with grow correctly', () => {
    const component = renderer.create(
      <Stack horizontal>
        <Stack horizontal grow={5}>
          Item 1
        </Stack>
        <Stack horizontal grow={2}>
          Item 2
        </Stack>
        <Stack horizontal grow>
          Item 3
        </Stack>
      </Stack>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders vertical Stack with StackItems correctly', () => {
    const component = renderer.create(
      <Stack>
        <Stack.Item>Item 1</Stack.Item>
        <Stack.Item>Item 2</Stack.Item>
      </Stack>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders horizontal Stack with StackItems correctly', () => {
    const component = renderer.create(
      <Stack horizontal>
        <Stack.Item>Item 1</Stack.Item>
        <Stack.Item>Item 2</Stack.Item>
      </Stack>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders vertical Stack with a gap correctly', () => {
    const component = renderer.create(
      <Stack gap={10}>
        <Stack.Item>Item 1</Stack.Item>
        <Stack.Item>Item 2</Stack.Item>
      </Stack>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders horizontal Stack with a gap correctly', () => {
    const component = renderer.create(
      <Stack horizontal gap={10}>
        <Stack.Item>Item 1</Stack.Item>
        <Stack.Item>Item 2</Stack.Item>
      </Stack>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders vertical Stack with shrinking StackItems correctly', () => {
    const component = renderer.create(
      <Stack shrinkItems>
        <Stack.Item>Item 1</Stack.Item>
        <Stack.Item>Item 2</Stack.Item>
      </Stack>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders horizontal Stack with shrinking StackItems correctly', () => {
    const component = renderer.create(
      <Stack horizontal shrinkItems>
        <Stack.Item>Item 1</Stack.Item>
        <Stack.Item>Item 2</Stack.Item>
      </Stack>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders vertical Stack with shrinking StackItems correctly', () => {
    const component = renderer.create(
      <Stack shrinkItems>
        <Stack.Item>Item 1</Stack.Item>
        <Stack.Item preventShrink>Item 2</Stack.Item>
      </Stack>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders horizontal Stack with shrinking StackItems correctly', () => {
    const component = renderer.create(
      <Stack horizontal shrinkItems>
        <Stack.Item>Item 1</Stack.Item>
        <Stack.Item preventShrink>Item 2</Stack.Item>
      </Stack>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders vertical Stack with item alignments correctly', () => {
    const component = renderer.create(
      <Stack>
        <Stack.Item align="auto">Auto</Stack.Item>
        <Stack.Item align="stretch">Stretch</Stack.Item>
        <Stack.Item align="baseline">Baseline</Stack.Item>
        <Stack.Item align="start">Start</Stack.Item>
        <Stack.Item align="center">Center</Stack.Item>
        <Stack.Item align="end">End</Stack.Item>
      </Stack>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders horizontal Stack item alignments correctly', () => {
    const component = renderer.create(
      <Stack horizontal>
        <Stack.Item align="auto">Auto</Stack.Item>
        <Stack.Item align="stretch">Stretch</Stack.Item>
        <Stack.Item align="baseline">Baseline</Stack.Item>
        <Stack.Item align="start">Start</Stack.Item>
        <Stack.Item align="center">Center</Stack.Item>
        <Stack.Item align="end">End</Stack.Item>
      </Stack>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders wrapped horizontal Stack correctly', () => {
    const component = renderer.create(
      <Stack horizontal wrap>
        <Stack.Item>1</Stack.Item>
        <Stack.Item>2</Stack.Item>
        <Stack.Item>3</Stack.Item>
      </Stack>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('accepts custom className on child items', () => {
    const component = renderer.create(
      <Stack>
        <Stack.Item className={sampleClass}>Item 1</Stack.Item>
        <div className={sampleClass}>Item 2</div>
      </Stack>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
