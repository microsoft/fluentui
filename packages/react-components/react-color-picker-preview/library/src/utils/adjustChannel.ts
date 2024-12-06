import type { ColorChannel } from '../components/ColorSlider/ColorSlider.types';
import { MIN, HUE_MAX, MAX as COLOR_MAX } from './constants';
import { clamp } from '@fluentui/react-utilities';

export function clampValue(value: number, channel: ColorChannel = 'hue') {
  const MAX = channel === 'hue' ? HUE_MAX : COLOR_MAX;
  return clamp(value, MIN, MAX);
}

export type ChannelActions<T> = {
  hue: T;
  saturation: T;
  value: T;
};

export function adjustChannel<T>(channel: ColorChannel, actions: ChannelActions<T>): T {
  switch (channel) {
    case 'hue':
    default:
      return actions.hue;
    case 'saturation':
      return actions.saturation;
    case 'value':
      return actions.value;
  }
}
