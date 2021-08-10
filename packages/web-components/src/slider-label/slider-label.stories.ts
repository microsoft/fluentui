import { fluentSlider } from '../slider/index';

export default {
  title: 'Components/Slider Label',
  components: fluentSlider,
  argTypes: {
    disabled: {
      control: { type: 'boolean' },
    },
    hideMark: {
      control: { type: 'boolean' },
    },
    position: {
      control: { type: 'number' },
    },
  },
};

const SliderLabelTemplate = ({ disabled, hideMark, label, orientation, position }) =>
  `<fluent-slider-label
    ${disabled ? 'disabled' : ''}
    hide-mark="${hideMark}"
    position="${position}"
  >${label}</fluent-slider-label>`;

export const SliderLabel = SliderLabelTemplate.bind({});

SliderLabel.args = {
  hideMark: false,
  label: 'Label',
};
