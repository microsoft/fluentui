import type { ColorChannel } from '../components/ColorSlider/ColorSlider.types';
import { MIN, HUE_MAX, MAX as COLOR_MAX } from './constants';
import { clamp } from '@fluentui/react-utilities';

/**
 * Clamps a given value to the valid range for a specified color channel.
 *
 * @param value - The numeric value to be clamped.
 * @param channel - The color channel to use for clamping. Defaults to 'hue'.
 * @returns The clamped value within the range defined by the color channel.
 */
export function clampValue(value: number, channel: ColorChannel = 'hue'): number {
  const MAX = channel === 'hue' ? HUE_MAX : COLOR_MAX;
  return clamp(value, MIN, MAX);
}

export type ChannelActions<T> = {
  hue: T;
  saturation: T;
  value: T;
};

/**
 * Adjusts the specified color channel using the provided actions.
 *
 * @template T - The type of the result returned by the actions.
 * @param {ColorChannel} channel - The color channel to adjust.
 * @param {ChannelActions<T>} actions - An object containing actions for each color channel.
 * @returns {T} - The result of the action corresponding to the specified channel, or the hue action if the channel is not found.
 */
export function adjustChannel<T>(channel: ColorChannel, actions: ChannelActions<T>): T {
  return actions[channel] || actions.hue;
}
