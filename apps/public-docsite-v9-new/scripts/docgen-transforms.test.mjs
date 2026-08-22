import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { abbreviateSlotType, getNativeElements, normalizeComponent, resolveTypeName } from './docgen-transforms.mjs';

describe('resolveTypeName', () => {
  it('re-joins enum literals extracted by docgen', () => {
    assert.equal(
      resolveTypeName({ name: 'enum', value: [{ value: '"small"' }, { value: '"large"' }] }),
      '"small" | "large"',
    );
  });

  it('de-duplicates repeated literals', () => {
    assert.equal(resolveTypeName({ name: 'enum', value: [{ value: 'a' }, { value: 'a' }] }), 'a');
  });

  it('passes through non-enum types', () => {
    assert.equal(resolveTypeName({ name: 'boolean' }), 'boolean');
  });

  it('falls back to the name when an enum carries no values', () => {
    assert.equal(resolveTypeName({ name: 'enum' }), 'enum');
  });

  it('tolerates a missing type', () => {
    assert.equal(resolveTypeName(undefined), '');
  });
});

describe('abbreviateSlotType', () => {
  it('collapses an expanded slot shorthand to Slot<"element">', () => {
    const raw =
      'WithSlotShorthandValue<{ as?: "span"; } & Omit<Omit<DetailedHTMLProps<...>, "ref"> & {...}, "children"> & {...}> | null';

    assert.deepEqual(abbreviateSlotType(raw), { type: 'Slot<"span">', isSlot: true });
  });

  it('falls back to bare Slot when no element is discernible', () => {
    assert.deepEqual(abbreviateSlotType('WithSlotShorthandValue<SomeOpaqueThing>'), {
      type: 'Slot',
      isSlot: true,
    });
  });

  it('leaves ordinary types untouched', () => {
    assert.deepEqual(abbreviateSlotType('"small" | "medium" | "large"'), {
      type: '"small" | "medium" | "large"',
      isSlot: false,
    });
  });

  it('tolerates empty and non-string input', () => {
    assert.deepEqual(abbreviateSlotType(''), { type: '', isSlot: false });
    assert.deepEqual(abbreviateSlotType(undefined), { type: undefined, isSlot: false });
  });
});

describe('getNativeElements', () => {
  it('reads the element union from the `as` prop', () => {
    assert.deepEqual(
      getNativeElements({ as: { type: { name: 'enum', value: [{ value: '"a"' }, { value: '"button"' }] } } }),
      ['a', 'button'],
    );
  });

  it('returns null when `as` is absent', () => {
    assert.equal(getNativeElements({ size: { type: { name: 'string' } } }), null);
  });

  it('returns null when `as` is not a union of element names', () => {
    assert.equal(getNativeElements({ as: { type: { name: 'ElementType' } } }), null);
  });
});

describe('normalizeComponent', () => {
  const doc = {
    displayName: 'Button',
    description: 'A button triggers an action.',
    props: {
      children: { type: { name: 'ReactNode' } },
      icon: { type: { name: 'WithSlotShorthandValue<{ as?: "span"; }>' }, required: false, description: 'An icon.' },
      as: { type: { name: 'enum', value: [{ value: '"a"' }, { value: '"button"' }] }, required: false },
      appearance: { type: { name: '"primary"' }, required: true, defaultValue: { value: 'primary' } },
    },
  };

  const result = normalizeComponent(doc);

  it('drops children, sorts props, and abbreviates slots', () => {
    assert.deepEqual(
      result.props.map(p => p.name),
      ['appearance', 'as', 'icon'],
    );
    assert.equal(result.props.find(p => p.name === 'icon').type, 'Slot<"span">');
  });

  it('reports slot support and native elements', () => {
    assert.equal(result.hasSlots, true);
    assert.deepEqual(result.nativeElements, ['a', 'button']);
  });

  it('preserves required flags and defaults', () => {
    const appearance = result.props.find(p => p.name === 'appearance');
    assert.equal(appearance.required, true);
    assert.equal(appearance.defaultValue, 'primary');
  });

  it('does not mutate its input', () => {
    assert.equal(doc.props.icon.type.name, 'WithSlotShorthandValue<{ as?: "span"; }>');
  });
});
