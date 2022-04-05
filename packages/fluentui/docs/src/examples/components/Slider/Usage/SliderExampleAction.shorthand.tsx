import * as React from 'react';
import { Button, Input, Slider, Flex } from '@fluentui/react-northstar';
import { useBooleanKnob } from '@fluentui/docs-components';
import { MicIcon, MicOffIcon } from '@fluentui/react-icons-northstar';

interface SliderAction {
  type: 'toggle_mute' | 'change_value';
  value?: string | number;
}

interface SliderState {
  mute: boolean;
  value: string | number;
  currentValue: string | number;
  minValue: string | number;
}

const stateReducer = (state: SliderState, action: SliderAction) => {
  switch (action.type) {
    case 'toggle_mute':
      const mute = !state.mute;
      const value = mute ? state.minValue : state.currentValue;

      if (!mute && value <= state.minValue) return { ...state };
      return { ...state, mute, value, currentValue: state.value };

    case 'change_value':
      return { ...state, mute: action.value <= state.minValue, value: action.value };

    default:
      throw new Error(`Action ${action.type} is not supported`);
  }
};

const SliderExampleActionShorthand = () => {
  const [vertical] = useBooleanKnob({ name: 'vertical', initialValue: false });
  const { min, max } = { min: 0, max: 100 };

  const [state, dispatch] = React.useReducer(stateReducer, {
    mute: false,
    value: min + (max - min) / 2,
    currentValue: min,
    minValue: min,
  });

  const handleChange = React.useCallback((e, data) => dispatch({ type: 'change_value', value: data.value }), []);

  const commonProps = { min, max, value: state.value, onChange: handleChange };

  return (
    <Flex inline hAlign="center" vAlign="center" gap="gap.smaller" column={vertical}>
      <Button
        text
        iconOnly
        icon={state.mute ? <MicOffIcon /> : <MicIcon />}
        onClick={() => dispatch({ type: 'toggle_mute' })}
        title="Toggle mute"
      />
      <Slider {...commonProps} vertical={vertical} />
      <Input type="number" input={{ styles: { width: '64px' } }} {...commonProps} />
    </Flex>
  );
};

export default SliderExampleActionShorthand;
