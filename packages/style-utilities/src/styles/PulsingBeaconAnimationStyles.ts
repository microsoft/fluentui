import { keyframes } from '@fluentui/merge-styles';
import type { IRawStyle } from '@fluentui/merge-styles';

const DEFAULT_DURATION = '14s';
const DEFAULT_DELAY = '2s';
const DEFAULT_ITERATION_COUNT = '1';

function _continuousPulseStepOne(beaconColorOne: string, innerDimension: string): IRawStyle {
  return {
    borderColor: beaconColorOne,
    borderWidth: '0px',
    width: innerDimension,
    height: innerDimension,
  };
}

function _continuousPulseStepTwo(borderWidth: string): IRawStyle {
  return {
    opacity: 1,
    borderWidth: borderWidth,
  };
}

function _continuousPulseStepThree(): IRawStyle {
  return {
    opacity: 1,
  };
}

function _continuousPulseStepFour(beaconColorTwo: string, outerDimension: string): IRawStyle {
  return {
    borderWidth: '0',
    width: outerDimension,
    height: outerDimension,
    opacity: 0,
    borderColor: beaconColorTwo,
  };
}

function _continuousPulseStepFive(beaconColorOne: string, innerDimension: string): IRawStyle {
  return {
    ..._continuousPulseStepOne(beaconColorOne, innerDimension),
    ...{
      opacity: 0,
    },
  };
}

function _continuousPulseAnimationDouble(
  beaconColorOne: string,
  beaconColorTwo: string,
  innerDimension: string,
  outerDimension: string,
  borderWidth: string,
): string {
  return keyframes({
    '0%': _continuousPulseStepOne(beaconColorOne, innerDimension),
    '1.42%': _continuousPulseStepTwo(borderWidth),
    '3.57%': _continuousPulseStepThree(),
    '7.14%': _continuousPulseStepFour(beaconColorTwo, outerDimension),
    '8%': _continuousPulseStepFive(beaconColorOne, innerDimension),
    '29.99%': _continuousPulseStepFive(beaconColorOne, innerDimension),
    '30%': _continuousPulseStepOne(beaconColorOne, innerDimension),
    '31.42%': _continuousPulseStepTwo(borderWidth),
    '33.57%': _continuousPulseStepThree(),
    '37.14%': _continuousPulseStepFour(beaconColorTwo, outerDimension),
    '38%': _continuousPulseStepFive(beaconColorOne, innerDimension),
    '79.42%': _continuousPulseStepFive(beaconColorOne, innerDimension),
    '79.43': _continuousPulseStepOne(beaconColorOne, innerDimension),
    '81.85': _continuousPulseStepTwo(borderWidth),
    '83.42': _continuousPulseStepThree(),
    '87%': _continuousPulseStepFour(beaconColorTwo, outerDimension),
    '100%': {},
  });
}

function _continuousPulseAnimationSingle(
  beaconColorOne: string,
  beaconColorTwo: string,
  innerDimension: string,
  outerDimension: string,
  borderWidth: string,
): string {
  return keyframes({
    '0%': _continuousPulseStepOne(beaconColorOne, innerDimension),
    '14.2%': _continuousPulseStepTwo(borderWidth),
    '35.7%': _continuousPulseStepThree(),
    '71.4%': _continuousPulseStepFour(beaconColorTwo, outerDimension),
    '100%': {},
  });
}

function _createDefaultAnimation(animationName: string, delayLength?: string): IRawStyle {
  return {
    animationName,
    animationIterationCount: DEFAULT_ITERATION_COUNT,
    animationDuration: DEFAULT_DURATION,
    animationDelay: delayLength || DEFAULT_DELAY,
  };
}

export const PulsingBeaconAnimationStyles = {
  continuousPulseAnimationDouble: _continuousPulseAnimationDouble,
  continuousPulseAnimationSingle: _continuousPulseAnimationSingle,
  createDefaultAnimation: _createDefaultAnimation,
};
