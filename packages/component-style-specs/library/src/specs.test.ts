import { normalizeSpec, validateSpec } from '@fluentui/style-spec';
import { allSpecs } from './allSpecs';

describe('component style specs', () => {
  for (const [name, spec] of Object.entries(allSpecs)) {
    describe(name, () => {
      it('is a valid spec', () => {
        expect(validateSpec(spec)).toEqual({ valid: true, issues: [] });
      });

      it('is plain JSON (round-trips unchanged)', () => {
        expect(JSON.parse(JSON.stringify(spec))).toEqual(spec);
      });

      it('normalizes to a stable IR', () => {
        const first = normalizeSpec(spec);
        const second = normalizeSpec(JSON.parse(JSON.stringify(spec)));
        expect(second).toEqual(first);
        expect(first.rules.length).toBe(spec.rules.length);
      });
    });
  }
});
