import type { AtomMotion, MotionParam } from '@fluentui/react-motion';

/**
 * Test utility to validate that an atom motion object has all required properties
 * with correct types and expected default values.
 */
export function expectValidAtomMotion(atom: AtomMotion): void {
  expect(atom).toMatchObject({
    keyframes: expect.any(Array),
    duration: expect.any(Number),
    easing: expect.any(String),
    delay: expect.any(Number),
  });

  // Ensure keyframes array is not empty
  expect(atom.keyframes.length).toBeGreaterThan(0);

  // Ensure duration is positive
  expect(atom.duration).toBeGreaterThan(0);

  // Ensure delay is non-negative
  expect(atom.delay).toBeGreaterThanOrEqual(0);
}

/**
 * Test utility to validate that enter and exit atoms are properly reversed versions
 * of each other (keyframes should be in opposite order).
 */
export function expectReversedKeyframes(enterAtom: AtomMotion, exitAtom: AtomMotion): void {
  expect(enterAtom.keyframes).toHaveLength(exitAtom.keyframes.length);

  const enterKeyframes = enterAtom.keyframes;
  const exitKeyframes = exitAtom.keyframes;

  // Check that keyframes are reversed
  for (let i = 0; i < enterKeyframes.length; i++) {
    const enterFrame = enterKeyframes[i];
    const exitFrame = exitKeyframes[exitKeyframes.length - 1 - i];
    expect(enterFrame).toEqual(exitFrame);
  }
}

/**
 * Test utility to validate that atom motion objects have consistent timing properties.
 */
export function expectConsistentTiming(atoms: AtomMotion[], expectedDuration: number, expectedDelay: number = 0): void {
  atoms.forEach(atom => {
    expect(atom.duration).toBe(expectedDuration);
    expect(atom.delay).toBe(expectedDelay);
  });
}

/**
 * Test utility to validate that an atom properly applies custom parameters.
 */
export function expectCustomParameters(
  atom: AtomMotion,
  expectedParams: {
    duration?: number;
    easing?: string;
    delay?: number;
  },
): void {
  if (expectedParams.duration !== undefined) {
    expect(atom.duration).toBe(expectedParams.duration);
  }
  if (expectedParams.easing !== undefined) {
    expect(atom.easing).toBe(expectedParams.easing);
  }
  if (expectedParams.delay !== undefined) {
    expect(atom.delay).toBe(expectedParams.delay);
  }
}

/**
 * Test utility to validate keyframe structure for specific CSS properties.
 */
export function expectKeyframeProperty(atom: AtomMotion, property: string, expectedValues: MotionParam[]): void {
  expect(atom.keyframes).toHaveLength(expectedValues.length);

  atom.keyframes.forEach((frame, index) => {
    expect(frame).toHaveProperty(property, expectedValues[index]);
  });
}
