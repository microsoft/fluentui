import * as React from 'react';
import { mount } from 'enzyme';
import * as renderer from 'react-test-renderer';
import { HorizontalStack } from '../index';

describe('HorizontalStack', () => {
  it('can handle having no children', () => {
    const createEmptyStack = () => {
      mount(<HorizontalStack />);
    };

    expect(createEmptyStack).not.toThrow();
  });

  it('renders default HorizontalStack correctly', () => {
    const component = renderer.create(
      <HorizontalStack>
        <div>Item 1</div>
        <div>Item 2</div>
      </HorizontalStack>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders gap correctly', () => {
    const component = renderer.create(
      <HorizontalStack gap={5}>
        <div>Item 1</div>
        <div>Item 2</div>
      </HorizontalStack>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders growing items correctly', () => {
    const component = renderer.create(
      <HorizontalStack>
        <HorizontalStack.Item>Item 1</HorizontalStack.Item>
        <HorizontalStack.Item>Item 2</HorizontalStack.Item>
      </HorizontalStack>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders shrinking items correctly', () => {
    const component = renderer.create(
      <HorizontalStack shrinkItems>
        <HorizontalStack.Item>Item 1</HorizontalStack.Item>
        <HorizontalStack.Item preventShrink>Item 2</HorizontalStack.Item>
      </HorizontalStack>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders item alignments correctly', () => {
    const component = renderer.create(
      <HorizontalStack>
        <HorizontalStack.Item align="auto">Auto</HorizontalStack.Item>
        <HorizontalStack.Item align="stretch">Stretch</HorizontalStack.Item>
        <HorizontalStack.Item align="baseline">Baseline</HorizontalStack.Item>
        <HorizontalStack.Item align="start">Start</HorizontalStack.Item>
        <HorizontalStack.Item align="center">Center</HorizontalStack.Item>
        <HorizontalStack.Item align="end">End</HorizontalStack.Item>
      </HorizontalStack>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders wrapped HorizontalStack correctly', () => {
    const component = renderer.create(
      <HorizontalStack wrap>
        <HorizontalStack.Item>1</HorizontalStack.Item>
        <HorizontalStack.Item>2</HorizontalStack.Item>
        <HorizontalStack.Item>3</HorizontalStack.Item>
      </HorizontalStack>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
