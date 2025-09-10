# Motion Components Testing Utilities

This directory contains comprehensive testing utilities for FluentUI motion components and atoms.

## Overview

The testing utilities are organized into two main categories:

### Component-Level Testing (`testUtils.ts`)

Utilities for testing presence motion components:

- `expectPresenceMotionObject()` - Validates motion objects with enter/exit states
- `expectPresenceMotionArray()` - Validates motion arrays for complex animations
- `expectPresenceMotionFunction()` - Validates motion function structure
- `mockAnimation()` - Mock Animation object for testing

### Atom-Level Testing (`atomTestUtils.ts`)

Specialized utilities for testing motion atoms:

- `expectValidAtomMotion()` - Validates basic atom motion structure
- `expectReversedKeyframes()` - Ensures enter/exit atoms have properly reversed keyframes
- `expectConsistentTiming()` - Validates timing properties across multiple atoms
- `expectCustomParameters()` - Validates custom timing parameters
- `expectKeyframeProperty()` - Validates specific CSS properties in keyframes

**Note**: Atom-specific validators like `expectFadeAtom()`, `expectScaleAtom()`, and `expectSlideAtom()` are defined within their respective test files to maintain better organization and reduce coupling.

## Usage Examples

### Testing a Motion Component

```typescript
import { expectPresenceMotionObject } from '../testing';
import { Fade } from './Fade';

it('creates valid presence motion', () => {
  const component = createPresenceComponent(createFadePresence());
  expectPresenceMotionObject(component);
});
```

### Testing Motion Atoms

```typescript
import { expectValidAtomMotion } from '../testing';
import { fadeAtom } from './fade-atom';

// Atom-specific validators are defined within each test file
function expectFadeAtom(atom, direction, fromOpacity = 0, toOpacity = 1) {
  // Implementation specific to fade atom testing
}

it('creates valid fade atom', () => {
  const atom = fadeAtom({ direction: 'enter', duration: 300 });
  expectValidAtomMotion(atom);
  expectFadeAtom(atom, 'enter');
});
```

### Testing Custom Parameters

```typescript
import { expectCustomParameters } from '../testing';

it('applies custom timing', () => {
  const atom = fadeAtom({
    direction: 'enter',
    duration: 500,
    delay: 100,
    easing: 'ease-out',
  });

  expectCustomParameters(atom, {
    duration: 500,
    delay: 100,
    easing: 'ease-out',
  });
});
```

### Testing Keyframe Reversals

```typescript
import { expectReversedKeyframes } from '../testing';

it('has properly reversed enter/exit keyframes', () => {
  const enterAtom = scaleAtom({ direction: 'enter', duration: 300 });
  const exitAtom = scaleAtom({ direction: 'exit', duration: 300 });

  expectReversedKeyframes(enterAtom, exitAtom);
});
```

## Benefits

1. **Consistency**: Standardized validation across all motion components and atoms
2. **Type Safety**: TypeScript-first utilities with proper type checking
3. **Comprehensive Coverage**: From basic structure validation to specific animation behavior
4. **Maintainability**: Centralized test logic reduces code duplication
5. **Developer Experience**: Clear, descriptive assertion failures with helpful error messages

## File Organization

```
testing/
├── index.ts              # Exports all testing utilities
├── testUtils.ts          # Component-level testing utilities
├── atomTestUtils.ts      # Atom-level testing utilities
└── README.md            # This documentation
```

## Adding New Test Utilities

When adding new motion atoms or components:

1. Add atom-specific validators to `atomTestUtils.ts`
2. Update the main exports in `index.ts`
3. Create comprehensive test files using the utilities
4. Update this README with usage examples

## Test Coverage

Current test coverage includes:

- ✅ Fade atoms with opacity animations and fill modes
- ✅ Scale atoms with transform scaling
- ✅ Slide atoms with translate transforms
- ✅ Blur atoms with filter effects
- ✅ Rotate atoms with rotation transforms
- ✅ All motion components (Fade, Scale, Slide, Blur, Rotate, Collapse)
