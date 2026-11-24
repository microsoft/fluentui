import { motionTokens, type AtomMotion } from '@fluentui/react-motion';
import { fadeIn, fadeOut } from '../atoms/fade-atom';
import { scaleIn, scaleOut } from '../atoms/scale-atom';
import { slideIn, slideOut } from '../atoms/slide-atom';
import { cloneMotionToTargets, hold, layer, resolveChoreography, sequence, stagger } from './choreography';

function createListDom(count: number, attr?: string): { root: HTMLDivElement; items: HTMLDivElement[] } {
  const root = document.createElement('div');
  const items: HTMLDivElement[] = [];

  for (let i = 0; i < count; i += 1) {
    const item = document.createElement('div');
    if (attr) {
      item.setAttribute(attr, `item-${i}`);
    }
    root.appendChild(item);
    items.push(item);
  }

  return { root, items };
}

describe('choreography POJO builders and lowering', () => {
  const entrance = fadeIn({ duration: 200, easing: motionTokens.curveLinear });
  const exit = fadeOut({ duration: 200, easing: motionTokens.curveLinear });
  const translation = slideIn({ from: { x: '24px' }, duration: 400, easing: motionTokens.curveLinear });
  const translationOut = slideOut({ to: { x: '24px' }, duration: 400, easing: motionTokens.curveLinear });
  const scaling = scaleIn({ from: 0.5, duration: 100, easing: motionTokens.curveLinear });
  const scalingOut = scaleOut({ to: 0.5, duration: 100, easing: motionTokens.curveLinear });

  describe('layer, cloneMotionToTargets, stagger, hold, and sequence POJOs', () => {
    it('returns plain canonical stagger data that survives JSON round-tripping', () => {
      const layers = cloneMotionToTargets(['[data-part="header"]', '[data-part="body"]'], entrance);
      const authored = stagger(layers, { startInterval: 60 });

      expect(authored).toEqual({
        kind: 'stagger',
        startInterval: 60,
        members: [
          { kind: 'layer', target: '[data-part="header"]', motion: entrance },
          { kind: 'layer', target: '[data-part="body"]', motion: entrance },
        ],
      });
      expect(JSON.parse(JSON.stringify(authored))).toEqual(authored);
      expect(Object.keys(authored)).toEqual(['kind', 'startInterval', 'members']);
    });

    it('returns plain canonical sequence and hold data that survives JSON round-tripping', () => {
      const authored = sequence([[entrance, translation], hold(1200), [exit, translationOut]], { gap: -50 });

      expect(authored).toEqual({
        kind: 'sequence',
        gap: -50,
        children: [[entrance, translation], { kind: 'hold', duration: 1200 }, [exit, translationOut]],
      });
      expect(JSON.parse(JSON.stringify(authored))).toEqual(authored);
    });

    it('deep-clones inline atoms and nested sequences without sharing mutable references', () => {
      const motif = sequence([entrance, hold(500), exit]);
      const layers = cloneMotionToTargets(['a', 'b'], motif, { delay: 15 });

      expect(layers).toHaveLength(2);
      expect(layers[0].delay).toBe(15);
      expect(layers[1].delay).toBe(15);
      expect(layers[0].motion).not.toBe(motif);
      expect(layers[0].motion).not.toBe(layers[1].motion);
    });

    it.each([-1, Number.NaN, Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY])(
      'rejects invalid startInterval %s',
      startInterval => {
        expect(() => stagger([layer(':scope > *', entrance)], { startInterval })).toThrow(RangeError);
      },
    );

    it.each([-1, Number.NaN, Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY])(
      'rejects invalid hold duration %s',
      duration => {
        expect(() => hold(duration)).toThrow(RangeError);
      },
    );

    it.each([Number.NaN, Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY])(
      'rejects non-finite sequence gap %s',
      gap => {
        expect(() => sequence([entrance], { gap })).toThrow(RangeError);
      },
    );

    it.each([Number.NaN, Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY])(
      'rejects non-finite layer delay %s',
      delay => {
        expect(() => layer(':scope > *', entrance, { delay })).toThrow(RangeError);
      },
    );

    it('allows negative layer delays for phase-shifted loops', () => {
      const delayed = layer(':scope > *', entrance, { delay: -100 });
      expect(delayed.delay).toBe(-100);
    });
  });

  describe('resolveChoreography — stagger and layers', () => {
    it('adds layer delay, internal atom delay, and stagger offset exactly once without mutating inputs', () => {
      const { items } = createListDom(3);
      const delayedEntrance: AtomMotion = { ...entrance, delay: 7 };
      const members = [
        layer(items[0], entrance, { delay: 10 }),
        layer(items[1], [translation, delayedEntrance]),
        layer(items[2], scaling, { delay: 5 }),
      ];
      const wave = stagger(members, { startInterval: 60 });
      const snapshot = members.map(member => ({
        ...member,
        motion: Array.isArray(member.motion) ? member.motion.map(a => ({ ...a })) : { ...member.motion },
      }));

      const first = resolveChoreography(wave);
      const second = resolveChoreography(wave);

      expect(first).toEqual(second);
      expect(first.map(atom => [atom.target, atom.delay])).toEqual([
        [items[0], 10],
        [items[1], 60],
        [items[1], 67],
        [items[2], 125],
      ]);
      expect(members).toEqual(snapshot);
    });

    it('expands multi-match CSS selectors into consecutive stagger steps and respects reverse order', () => {
      const { root, items } = createListDom(4, 'data-part');

      const forward = resolveChoreography(stagger([layer(':scope > *', translation)], { startInterval: 50 }), root);
      expect(forward.map(atom => [atom.target, atom.delay])).toEqual([
        [items[0], 0],
        [items[1], 50],
        [items[2], 100],
        [items[3], 150],
      ]);

      const reversed = resolveChoreography(
        stagger([layer(':scope > *', translation)], { startInterval: 50, order: 'reverse' }),
        root,
      );
      expect(reversed.map(atom => [atom.target, atom.delay])).toEqual([
        [items[0], 150],
        [items[1], 100],
        [items[2], 50],
        [items[3], 0],
      ]);
    });

    it('handles zero startInterval, empty members, and zero selector matches gracefully', () => {
      const { root, items } = createListDom(2);

      expect(resolveChoreography(stagger([], { startInterval: 60 }), root)).toEqual([]);
      expect(resolveChoreography(stagger([layer('[data-missing]', entrance)], { startInterval: 60 }), root)).toEqual(
        [],
      );

      const zeroInterval = resolveChoreography(
        stagger(cloneMotionToTargets(items, entrance), { startInterval: 0 }),
        root,
      );
      expect(zeroInterval.map(atom => atom.delay)).toEqual([0, 0]);
    });

    it('supports custom resolveTarget binders for logical Prism-style target IDs', () => {
      const header = document.createElement('header');
      const footer = document.createElement('footer');
      const targets: Record<string, Element> = {
        'dialog.header': header,
        'dialog.footer': footer,
      };

      const wave = stagger([layer('dialog.header', entrance), layer('dialog.footer', translation, { delay: 15 })], {
        startInterval: 80,
      });

      const atoms = resolveChoreography(wave, {
        resolveTarget: id => targets[id],
      });

      expect(atoms.map(atom => [atom.target, atom.delay])).toEqual([
        [header, 0],
        [footer, 95],
      ]);
    });

    it('throws when resolving a string target without a rootElement or resolveTarget', () => {
      const wave = stagger([layer(':scope > *', entrance)], { startInterval: 60 });
      expect(() => resolveChoreography(wave)).toThrow(/rootElement|resolveTarget/);
    });

    it('defaults fill to "both" on staggered atoms while preserving explicit fill', () => {
      const { items } = createListDom(2);
      const explicitFill: AtomMotion = { ...translation, fill: 'none' };

      const atoms = resolveChoreography(
        stagger([layer(items[0], translation), layer(items[1], explicitFill)], { startInterval: 50 }),
      );

      expect(atoms[0].fill).toBe('both');
      expect(atoms[1].fill).toBe('none');
    });

    it('zeros stagger delays under reducedMotion while preserving explicit reducedMotion overrides', () => {
      const { items } = createListDom(3);
      const withCustomDuration: AtomMotion = { ...translation, reducedMotion: { duration: 120 } };
      const withExplicitDelay: AtomMotion = { ...translation, reducedMotion: { duration: 120, delay: 40 } };

      const atoms = resolveChoreography(
        stagger(
          [layer(items[0], translation), layer(items[1], withCustomDuration), layer(items[2], withExplicitDelay)],
          { startInterval: 100 },
        ),
      );

      expect(atoms[0].reducedMotion).toEqual({ duration: 1, delay: 0 });
      expect(atoms[1].reducedMotion).toEqual({ duration: 120, delay: 0 });
      expect(atoms[2].reducedMotion).toEqual({ duration: 120, delay: 40 });
    });
  });

  describe('resolveChoreography — sequence, hold, and fill normalization', () => {
    it('sequences enter -> hold -> exit on one target and strips backwards fill on repeated properties', () => {
      const seq = sequence([[entrance, translation], hold(1200), [exit, translationOut]]);
      const atoms = resolveChoreography(seq);

      // Parallel step 0 has max duration 400ms (200ms fade, 400ms slide); hold adds 1200ms -> step 2 starts at 1600ms.
      expect(atoms.map(a => [a.delay, a.duration, a.fill])).toEqual([
        [0, 200, 'both'],
        [0, 400, 'both'],
        [1600, 200, 'forwards'],
        [1600, 400, 'forwards'],
      ]);
      // Reduced motion collapses choreography delays to 0
      expect(atoms.map(a => a.reducedMotion)).toEqual([
        { duration: 1, delay: 0 },
        { duration: 1, delay: 0 },
        { duration: 1, delay: 0 },
        { duration: 1, delay: 0 },
      ]);
    });

    it('keeps fill: "both" on later sequence steps when they animate disjoint properties', () => {
      // Step 0 animates opacity only; step 1 animates translate only -> step 1 should still hold its start translate during step 0.
      const atoms = resolveChoreography(sequence([entrance, translation]));

      expect(atoms.map(a => [a.delay, a.fill])).toEqual([
        [0, 'both'],
        [200, 'both'],
      ]);
    });

    it('preserves explicit fill: "none" on subsequent same-property steps', () => {
      const explicitNone: AtomMotion = { ...exit, fill: 'none' };
      const atoms = resolveChoreography(sequence([entrance, explicitNone]));

      expect(atoms[0].fill).toBe('both');
      expect(atoms[1].fill).toBe('none');
    });

    it('supports positive and negative sequence gaps and rejects gaps that push start time below 0', () => {
      const withPositiveGap = resolveChoreography(sequence([entrance, scaling], { gap: 100 }));
      expect(withPositiveGap.map(a => a.delay)).toEqual([0, 300]);

      const withOverlap = resolveChoreography(sequence([translation, entrance], { gap: -150 }));
      expect(withOverlap.map(a => a.delay)).toEqual([0, 250]);

      expect(() => resolveChoreography(sequence([scaling, entrance], { gap: -150 }))).toThrow(RangeError);
    });

    it('emits a zero-property timing spacer only when a trailing hold extends past the last animation end', () => {
      // Interior hold: no spacer emitted
      const interior = resolveChoreography(sequence([entrance, hold(500), exit]));
      expect(interior).toHaveLength(2);

      // Trailing hold: emits spacer from 200ms to 700ms
      const trailing = resolveChoreography(sequence([entrance, hold(500)]));
      expect(trailing).toHaveLength(2);
      expect(trailing[1]).toEqual({
        keyframes: [],
        duration: 500,
        delay: 200,
        reducedMotion: { duration: 1, delay: 0 },
      });

      // Zero hold: emits nothing
      expect(resolveChoreography(hold(0))).toEqual([]);
    });

    it('rejects sequencing additional steps after an infinite-duration motion', () => {
      const infiniteLoop: AtomMotion = { ...entrance, iterations: Infinity };
      expect(() => resolveChoreography(sequence([infiniteLoop, exit]))).toThrow(RangeError);

      // An infinite motion as the final step is valid
      expect(resolveChoreography(sequence([scaling, infiniteLoop])).map(a => a.delay)).toEqual([0, 100]);
    });

    it('composes sequence, stagger, layer, and hold recursively', () => {
      const { root, items } = createListDom(3, 'data-part');

      // 1. Stagger over sequenced items (each photo enters -> holds -> exits)
      const staggeredPhotos = stagger([layer(':scope > *', sequence([scaling, hold(1000), scalingOut]))], {
        startInterval: 100,
      });
      // Photo 0: [0..100, 1100..1200], Photo 1: [100..200, 1200..1300], Photo 2: [200..300, 1300..1400]
      // Total stagger extent = 1400ms; container exit follows automatically at 1400ms!
      const containerExit: AtomMotion = { keyframes: [{ maxHeight: '300px' }, { maxHeight: '0px' }], duration: 250 };

      const atoms = resolveChoreography(sequence([staggeredPhotos, containerExit]), root);

      expect(atoms.map(a => [a.target, a.delay, a.duration, a.fill])).toEqual([
        [items[0], 0, 100, 'both'],
        [items[0], 1100, 100, 'forwards'],
        [items[1], 100, 100, 'both'],
        [items[1], 1200, 100, 'forwards'],
        [items[2], 200, 100, 'both'],
        [items[2], 1300, 100, 'forwards'],
        [undefined, 1400, 250, 'both'],
      ]);
    });
  });
});
