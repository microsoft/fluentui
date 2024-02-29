export const durations = {
  durationUltraFast: 50,
  durationFaster: 100,
  durationFast: 150,
  durationNormal: 200,
  durationGentle: 250,
  durationSlow: 300,
  durationSlower: 400,
  durationUltraSlow: 500,
} as const;

export const curves = {
  curveAccelerateMax: 'cubic-bezier(0.9,0.1,1,0.2)',
  curveAccelerateMid: 'cubic-bezier(1,0,1,1)',
  curveAccelerateMin: 'cubic-bezier(0.8,0,0.78,1)',
  curveDecelerateMax: 'cubic-bezier(0.1,0.9,0.2,1)',
  curveDecelerateMid: 'cubic-bezier(0,0,0,1)',
  curveDecelerateMin: 'cubic-bezier(0.33,0,0.1,1)',
  curveEasyEaseMax: 'cubic-bezier(0.8,0,0.2,1)',
  curveEasyEase: 'cubic-bezier(0.33,0,0.67,1)',
  curveLinear: 'cubic-bezier(0,0,1,1)',
} as const;

export const motionTokens = {
  // For flat lookup
  ...durations,
  ...curves,
};

// TODO: consider when TypeScript 4.4 is allowed:
// type DurationKey = `duration${Capitalize<string>}`;
// type DurationValue = `${number}ms`;
// type CurveKey = `curve${Capitalize<string>}`;
// type CurveValue = `cubic-bezier(${number},${number},${number},${number})`;
