// Main test utilities for presence motion components
export {
  expectPresenceMotionObject,
  expectPresenceMotionArray,
  expectPresenceMotionFunction,
  mockAnimation,
} from './testUtils';

// Specialized test utilities for atom-level testing
export {
  expectValidAtomMotion,
  expectReversedKeyframes,
  expectConsistentTiming,
  expectCustomParameters,
  expectKeyframeProperty,
} from './atomTestUtils';
