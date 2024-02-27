export const durationUltraFast = 50;
export const durationFaster = 100;
export const durationFast = 150;
export const durationNormal = 200;
export const durationSlow = 300;
export const durationSlower = 400;
export const durationUltraSlow = 500;

export const easingAccelerateMax = 'cubic-bezier(0.9,0.1,1,0.2)';
export const easingAccelerateMid = 'cubic-bezier(1,0,1,1)';
export const easingAccelerateMin = 'cubic-bezier(0.8,0,0.78,1)';
export const easingDecelerateMax = 'cubic-bezier(0.1,0.9,0.2,1)';
export const easingDecelerateMid = 'cubic-bezier(0,0,0,1)';
export const easingDecelerateMin = 'cubic-bezier(0.33,0,0.1,1)';
export const easingEasyEaseMax = 'cubic-bezier(0.8,0,0.2,1)';
export const easingEasyEase = 'cubic-bezier(0.33,0,0.67,1)';
export const easingLinear = 'cubic-bezier(0,0,1,1)';

// TODO: settle on a token naming and structure, i.e. flat vs objects
// Below matches @fluentui/tokens, which currently only export these as CSS variables.
// If we make @fluentui/tokens export the JS values as well, we wouldn't have to duplicate these here.
// For simplicity, let's not rename `curve...` to `easing...`.
// These tokens will be renamed to the new Fluent scheme anyway.

type DurationKey = `duration${Capitalize<string>}`;
type DurationValue = `${number}ms`;

export const durations: Record<DurationKey, DurationValue> = {
  durationUltraFast: '50ms',
  durationFaster: '100ms',
  durationFast: '150ms',
  durationNormal: '200ms',
  durationGentle: '250ms',
  durationSlow: '300ms',
  durationSlower: '400ms',
  durationUltraSlow: '500ms',
};

type CurveKey = `curve${Capitalize<string>}`;
type CurveValue = `cubic-bezier(${number},${number},${number},${number})`;

export const curves: Record<CurveKey, CurveValue> = {
  curveAccelerateMax: 'cubic-bezier(0.9,0.1,1,0.2)',
  curveAccelerateMid: 'cubic-bezier(1,0,1,1)',
  curveAccelerateMin: 'cubic-bezier(0.8,0,0.78,1)',
  curveDecelerateMax: 'cubic-bezier(0.1,0.9,0.2,1)',
  curveDecelerateMid: 'cubic-bezier(0,0,0,1)',
  curveDecelerateMin: 'cubic-bezier(0.33,0,0.1,1)',
  curveEasyEaseMax: 'cubic-bezier(0.8,0,0.2,1)',
  curveEasyEase: 'cubic-bezier(0.33,0,0.67,1)',
  curveLinear: 'cubic-bezier(0,0,1,1)',
};
