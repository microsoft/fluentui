import { clampValue, adjustChannel, ChannelActions } from './adjustChannel';
import { MIN, HUE_MAX, MAX as COLOR_MAX } from './constants';

describe('clampValue', () => {
  it('should clamp value within the hue range', () => {
    expect(clampValue(-10, 'hue')).toBe(MIN);
    expect(clampValue(370, 'hue')).toBe(HUE_MAX);
    expect(clampValue(180, 'hue')).toBe(180);
  });

  it('should clamp value within the saturation/value range', () => {
    expect(clampValue(-10, 'saturation')).toBe(MIN);
    expect(clampValue(110, 'saturation')).toBe(COLOR_MAX);
    expect(clampValue(50, 'saturation')).toBe(50);

    expect(clampValue(-10, 'value')).toBe(MIN);
    expect(clampValue(110, 'value')).toBe(COLOR_MAX);
    expect(clampValue(50, 'value')).toBe(50);
  });

  it('should default to hue if no channel is provided', () => {
    expect(clampValue(-10)).toBe(MIN);
    expect(clampValue(370)).toBe(HUE_MAX);
    expect(clampValue(180)).toBe(180);
  });
});

describe('adjustChannel', () => {
  const actions: ChannelActions<string> = {
    hue: 'hueAction',
    saturation: 'saturationAction',
    value: 'valueAction',
  };

  it('should return the correct action for the given channel', () => {
    expect(adjustChannel('hue', actions)).toBe('hueAction');
    expect(adjustChannel('saturation', actions)).toBe('saturationAction');
    expect(adjustChannel('value', actions)).toBe('valueAction');
  });
});
