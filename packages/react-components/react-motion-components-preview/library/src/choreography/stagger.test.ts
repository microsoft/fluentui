import { motionTokens, type AtomMotion } from '@fluentui/react-motion';
import { fadeIn } from '../atoms/fade-atom';
import { scaleIn } from '../atoms/scale-atom';
import { slideIn } from '../atoms/slide-atom';
import { cloneMotionToTargets, layer, resolveChoreography, stagger } from './stagger';

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
  const translation = slideIn({ from: { x: '24px' }, duration: 400, easing: motionTokens.curveLinear });
  const scaling = scaleIn({ from: 0.5, duration: 100, easing: motionTokens.curveLinear });

  describe('layer, cloneMotionToTargets, and stagger POJOs', () => {
    it('returns plain canonical data that survives JSON round-tripping', () => {
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

    it('clones inline atoms without sharing mutable references across targets', () => {
      const motion = [entrance, translation];
      const layers = cloneMotionToTargets(['a', 'b'], motion, { delay: 15 });

      expect(layers).toHaveLength(2);
      expect(layers[0].delay).toBe(15);
      expect(layers[1].delay).toBe(15);
      expect(layers[0].motion).not.toBe(motion);
      expect(layers[0].motion).not.toBe(layers[1].motion);
      expect((layers[0].motion as AtomMotion[])[0]).not.toBe((layers[1].motion as AtomMotion[])[0]);
    });

    it.each([-1, Number.NaN, Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY])(
      'rejects invalid startInterval %s',
      startInterval => {
        expect(() => stagger([layer(':scope > *', entrance)], { startInterval })).toThrow(RangeError);
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

  describe('resolveChoreography', () => {
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

      // Inputs were never mutated
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

    it('combines root atoms, standalone layers, and staggers in one parallel choreography array', () => {
      const { root, items } = createListDom(2, 'data-part');
      const rootAtom: AtomMotion = { keyframes: [{ maxHeight: '0px' }, { maxHeight: '200px' }], duration: 300 };

      const atoms = resolveChoreography(
        [
          rootAtom,
          layer('[data-part="item-0"]', entrance),
          stagger([layer(':scope > *', translation, { delay: 100 })], { startInterval: 50 }),
        ],
        root,
      );

      expect(atoms).toHaveLength(4);
      expect(atoms[0].target).toBeUndefined();
      expect(atoms[0].duration).toBe(300);
      expect(atoms[1].target).toBe(items[0]);
      expect(atoms[2].target).toBe(items[0]);
      expect(atoms[2].delay).toBe(100);
      expect(atoms[3].target).toBe(items[1]);
      expect(atoms[3].delay).toBe(150);
    });
  });
});
