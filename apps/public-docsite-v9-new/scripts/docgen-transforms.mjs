/**
 * Pure transforms over react-docgen-typescript output.
 *
 * These port the heuristics in `FluentDocsPage.tsx`, with one deliberate change: there they
 * MUTATE `story.argTypes`, `__docgenInfo.props` and every subcomponent's `__docgenInfo` in
 * place (the source carries a comment saying so), and they are applied by the docs page but
 * NOT by the LLM extractor — so the two published surfaces disagree today.
 *
 * Here they are pure and applied once, when the manifest is built, so every consumer sees the
 * same abbreviated types (`docsite/component-page`: "Abbreviation is applied uniformly").
 */

/** Matches the `as?: "span"` marker inside an expanded slot shorthand type. */
const SLOT_AS_REGEX = /as\?:\s*"([^"]+)"/;

const SLOT_SHORTHAND_MARKER = 'WithSlotShorthandValue';

/**
 * Resolves a react-docgen-typescript type into a displayable type string.
 *
 * With `shouldExtractLiteralValuesFromEnum` enabled, unions arrive as
 * `{ name: 'enum', value: [{ value: '"small"' }, ...] }` rather than a type string, so the
 * literal values have to be re-joined. Anything else already carries a usable `name`.
 *
 * @param {{ name?: string, value?: Array<{ value?: string }> }} type
 * @returns {string}
 */
export function resolveTypeName(type) {
  if (!type) {
    return '';
  }

  if (type.name === 'enum' && Array.isArray(type.value)) {
    const literals = type.value.map(entry => entry?.value).filter(value => typeof value === 'string');

    if (literals.length > 0) {
      return [...new Set(literals)].join(' | ');
    }
  }

  return type.name ?? '';
}

/**
 * Collapses an expanded slot type into its readable short form.
 *
 * `WithSlotShorthandValue<{ as?: "span"; } & Omit<...>>` becomes `Slot<"span">`, and a slot
 * type with no discernible element becomes `Slot`.
 *
 * @param {string} typeName
 * @returns {{ type: string, isSlot: boolean }}
 */
export function abbreviateSlotType(typeName) {
  if (typeof typeName !== 'string' || typeName.length === 0) {
    return { type: typeName, isSlot: false };
  }

  const match = typeName.match(SLOT_AS_REGEX);

  if (match) {
    return { type: `Slot<"${match[1]}">`, isSlot: true };
  }

  if (typeName.includes(SLOT_SHORTHAND_MARKER)) {
    return { type: 'Slot', isSlot: true };
  }

  return { type: typeName, isSlot: false };
}

/**
 * Extracts the native elements a component forwards props to, from its `as` prop.
 *
 * Returns `null` when the component does not expose `as` as a union of element names,
 * which is how "this component does not forward native props" is expressed.
 *
 * @param {Record<string, { type?: object }>} props
 * @returns {string[] | null}
 */
export function getNativeElements(props) {
  const asProp = props?.as;

  if (!asProp?.type) {
    return null;
  }

  const elements = resolveTypeName(asProp.type)
    .split('|')
    .map(part => part.trim().replace(/^["']|["']$/g, ''))
    .filter(part => part.length > 0 && /^[a-z][a-z0-9]*$/.test(part));

  return elements.length > 0 ? elements : null;
}

/**
 * Normalises one react-docgen-typescript component entry into the manifest shape,
 * applying the slot abbreviation to every prop.
 *
 * @returns {{ displayName: string, description: string, hasSlots: boolean, nativeElements: string[] | null, props: Array<object> }}
 */
export function normalizeComponent(doc) {
  let hasSlots = false;

  const props = Object.entries(doc.props ?? {})
    .filter(([name]) => name !== 'children')
    .map(([name, prop]) => {
      const { type, isSlot } = abbreviateSlotType(resolveTypeName(prop.type));
      hasSlots = hasSlots || isSlot;

      return {
        name,
        type,
        required: Boolean(prop.required),
        defaultValue: prop.defaultValue?.value ?? null,
        description: prop.description ?? '',
      };
    })
    .sort((a, b) => a.name.localeCompare(b.name));

  return {
    displayName: doc.displayName,
    description: doc.description ?? '',
    hasSlots,
    nativeElements: getNativeElements(doc.props ?? {}),
    props,
  };
}
