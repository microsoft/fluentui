import { useSlotProps } from '@fluentui/react-bindings';
import { shallow } from 'enzyme';
import * as React from 'react';

interface TestComponentProps {
  circular?: boolean;
  squared?: boolean;
  triangled?: boolean;
}

const getComponent = (mapPropsToSlotPropsChain: ((props: TestComponentProps) => Record<string, object>)[]) => {
  const TestComponent: React.FunctionComponent<TestComponentProps> = props => {
    const getSlotProps = useSlotProps<TestComponentProps>(mapPropsToSlotPropsChain, props);

    return (
      <>
        <div
          id="start"
          className={`circular-${getSlotProps('start').circular} squared-${getSlotProps('start').squared} triangled-${
            getSlotProps('start').triangled
          }`}
        />
        <div
          id="content"
          className={`circular-${getSlotProps('content').circular} squared-${
            getSlotProps('content').squared
          } triangled-${getSlotProps('content').triangled}`}
        />
        <div
          id="end"
          className={`circular-${getSlotProps('end').circular} squared-${getSlotProps('end').squared} triangled-${
            getSlotProps('end').triangled
          }`}
        />
      </>
    );
  };

  return TestComponent;
};

describe('useSlotProps', () => {
  it('applies slotProps to correct slots', () => {
    const mapPropsToSlotPropsChain = [
      (props: TestComponentProps) => ({
        start: { squared: props.squared },
        content: { circular: props.circular },
      }),
    ];

    const TestComponent = getComponent(mapPropsToSlotPropsChain);

    const wrapper = shallow(<TestComponent squared circular />);

    const startClassName = wrapper.find('#start').prop('className');
    expect(startClassName!.includes('squared-true')).toEqual(true);
    expect(startClassName!.includes('circular-undefined')).toEqual(true);
    expect(startClassName!.includes('triangled-undefined')).toEqual(true);

    const contentClassName = wrapper.find('#content').prop('className');
    expect(contentClassName!.includes('circular-true')).toEqual(true);
    expect(contentClassName!.includes('squared-undefined')).toEqual(true);
    expect(contentClassName!.includes('triangled-undefined')).toEqual(true);
  });

  it('merges slotProps along the chain', () => {
    const mapPropsToSlotPropsChain = [
      (props: TestComponentProps) => ({
        start: { squared: props.squared },
        content: { circular: props.circular },
      }),
      (props: TestComponentProps) => ({
        start: { triangled: props.triangled },
        content: { squared: props.squared },
      }),
    ];

    const TestComponent = getComponent(mapPropsToSlotPropsChain);

    const wrapper = shallow(<TestComponent squared circular triangled={false} />);

    const startClassName = wrapper.find('#start').prop('className');
    expect(startClassName!.includes('squared-true')).toEqual(true);
    expect(startClassName!.includes('circular-undefined')).toEqual(true);
    expect(startClassName!.includes('triangled-false')).toEqual(true);

    const contentClassName = wrapper.find('#content').prop('className');
    expect(contentClassName!.includes('circular-true')).toEqual(true);
    expect(contentClassName!.includes('squared-true')).toEqual(true);
    expect(contentClassName!.includes('triangled-undefined')).toEqual(true);
  });

  it('overrides slotProps along the chain', () => {
    const mapPropsToSlotPropsChain = [
      (props: TestComponentProps) => ({
        start: { squared: props.squared },
        content: { circular: props.circular },
      }),
      (props: TestComponentProps) => ({
        start: { squared: false, triangled: props.triangled },
        content: { squared: props.squared, circular: true },
      }),
    ];

    const TestComponent = getComponent(mapPropsToSlotPropsChain);

    const wrapper = shallow(<TestComponent squared circular={false} triangled={false} />);

    const startClassName = wrapper.find('#start').prop('className');
    expect(startClassName!.includes('squared-false')).toEqual(true);
    expect(startClassName!.includes('circular-undefined')).toEqual(true);
    expect(startClassName!.includes('triangled-false')).toEqual(true);

    const contentClassName = wrapper.find('#content').prop('className');
    expect(contentClassName!.includes('circular-true')).toEqual(true);
    expect(contentClassName!.includes('squared-true')).toEqual(true);
    expect(contentClassName!.includes('triangled-undefined')).toEqual(true);
  });
});
