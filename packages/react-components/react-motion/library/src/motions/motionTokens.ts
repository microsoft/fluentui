// Copied from packages/tokens/src/global/durations.ts
// Values are numeric in milliseconds for ease of use in Web Animations API
// (rather than parsing '__ms')
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

// Copied from packages/tokens/src/global/curves.ts
// Names and values are preserved exactly
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

// A merged flat lookup for convenience
export const motionTokens = {
  ...durations,
  ...curves,
};

/*
TODO: enforce naming conventions when TypeScript 4.4 features are supported in Fluent:

type DurationKey = `duration${Capitalize<string>}`;
type CurveKey = `curve${Capitalize<string>}`;
type CurveValue = `cubic-bezier(${number},${number},${number},${number})`;

type DurationTokens = Record<DurationKey, number>;
type CurveTokens = Record<CurveKey, CurveValue>;
*/
