import { useSlotProps } from '@fluentui/react-bindings';
import { shallow } from 'enzyme';
import * as React from 'react';

interface TestComponentProps {
  circular?: boolean;
  squared?: boolean;
  triangled?: boolean;
}

const getComponent = (slotPropsChain: Record<string, (props: TestComponentProps) => object>[]) => {
  const TestComponent: React.FunctionComponent<TestComponentProps> = props => {
    const getSlotProps = useSlotProps<TestComponentProps>(slotPropsChain, props);

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
    const slotPropsChain = [
      {
        start: props => ({ squared: props.squared }),
        content: props => ({ circular: props.circular }),
      },
    ];

    const TestComponent = getComponent(slotPropsChain);

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
    const slotPropsChain = [
      {
        start: props => ({ squared: props.squared }),
        content: props => ({ circular: props.circular }),
      },
      {
        start: props => ({ triangled: props.triangled }),
        content: props => ({ squared: props.squared }),
      },
    ];

    const TestComponent = getComponent(slotPropsChain);

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
    const slotPropsChain = [
      {
        start: props => ({ squared: props.squared }),
        content: props => ({ circular: props.circular }),
      },
      {
        start: props => ({ squared: false, triangled: props.triangled }),
        content: props => ({ squared: props.squared, circular: true }),
      },
    ];

    const TestComponent = getComponent(slotPropsChain);

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
