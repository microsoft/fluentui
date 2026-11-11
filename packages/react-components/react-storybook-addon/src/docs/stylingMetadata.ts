export type DataAttributeName = `data-${string}`;

export type DataAttributeValue = string | number | boolean;

/** Slot name → attribute key → DOM attribute name. */
export type SlotDataAttributes = Readonly<Record<string, Readonly<Record<string, DataAttributeName>>>>;

type SlotAttributeValues = Readonly<Record<string, readonly DataAttributeValue[] | null>>;

/**
 * Values keyed by slot then attribute key, or by DOM attribute name. Slot/key entries win.
 * An omitted attribute is a presence (boolean) attribute, `[]` means any string, and `null` means the values
 * could not be inferred (the row is not rendered).
 */
export type DataAttributeValues = Readonly<Record<string, readonly DataAttributeValue[] | SlotAttributeValues>>;

export type ElementDataAttribute = {
  /** DOM target that is not a slot, e.g. `Rendered <div>`. */
  target: string;
  attribute: DataAttributeName;
  values?: readonly DataAttributeValue[] | null;
};

export type DataAttributesDefinition = {
  attributes: SlotDataAttributes;
  /** Attributes written on non-slot elements. Kept in the metadata, not rendered. */
  elements?: readonly ElementDataAttribute[];
  values?: DataAttributeValues;
};

/** Slot name → class name. */
export type SlotClassNames = Readonly<Record<string, string>>;

export type ClassNamesDefinition = {
  classNames: SlotClassNames;
};

type ComponentFamily<Definition> = {
  components: Readonly<Record<string, Definition>>;
};

export type DataAttributesConfig =
  | (DataAttributesDefinition & { components?: never })
  | (ComponentFamily<DataAttributesDefinition> & { attributes?: never; values?: never });

export type ClassNamesConfig =
  | (ClassNamesDefinition & { components?: never })
  | (ComponentFamily<ClassNamesDefinition | SlotClassNames> & { classNames?: never });

export type StylingMetadata = {
  dataAttributes?: DataAttributesConfig;
  classNames?: ClassNamesConfig;
};

export type StylingMetadataParameters = {
  /** Injected at build time by `registerStylingMetadataRule` from `@fluentui/scripts-storybook`. */
  __generatedStylingMetadata?: StylingMetadata;
  reactStorybookAddon?: { docs?: unknown };
};

/**
 * Authored `parameters.reactStorybookAddon.docs.{dataAttributes,classNames}` win over generated metadata.
 * `reactStorybookAddon.docs: false` disables both sections.
 */
export function resolveStylingMetadata(parameters: StylingMetadataParameters | undefined): StylingMetadata {
  const docs = parameters?.reactStorybookAddon?.docs;
  if (docs === false) {
    return {};
  }
  const authored: StylingMetadata = typeof docs === 'object' && docs !== null ? (docs as StylingMetadata) : {};
  const generated = parameters?.__generatedStylingMetadata;

  return {
    dataAttributes: authored.dataAttributes ?? generated?.dataAttributes,
    classNames: authored.classNames ?? generated?.classNames,
  };
}

export type DataAttributeRow = {
  component?: string;
  slot: string;
  attribute: DataAttributeName;
  /** `undefined`: presence attribute; `[]`: any string; `null`: unknown. */
  values: readonly DataAttributeValue[] | null | undefined;
};

export type ClassNameRow = {
  component?: string;
  slot: string;
  className: string;
};

function normalizeComponents<Definition>(
  config: (Definition & { components?: never }) | ComponentFamily<Definition>,
): Array<{ component?: string; definition: Definition }> {
  if (config.components !== undefined) {
    return Object.entries(config.components).map(([component, definition]) => ({ component, definition }));
  }

  return [{ definition: config as Definition }];
}

function getValues(
  values: DataAttributeValues | undefined,
  slot: string,
  key: string,
  attribute: DataAttributeName,
): readonly DataAttributeValue[] | null | undefined {
  const slotValues = values?.[slot];
  if (slotValues && !Array.isArray(slotValues) && (slotValues as SlotAttributeValues)[key] !== undefined) {
    return (slotValues as SlotAttributeValues)[key];
  }
  const attributeValues = values?.[attribute];
  return Array.isArray(attributeValues) ? attributeValues : undefined;
}

export function getDataAttributeRows(config?: DataAttributesConfig): DataAttributeRow[] {
  if (!config) {
    return [];
  }

  return normalizeComponents<DataAttributesDefinition>(config).flatMap(
    ({ component, definition: { attributes, values } }) =>
      Object.entries(attributes).flatMap(([slot, slotAttributes]) =>
        Object.entries(slotAttributes).map(([key, attribute]) => ({
          component,
          slot,
          attribute,
          values: getValues(values, slot, key, attribute),
        })),
      ),
  );
}

export function getClassNameRows(config?: ClassNamesConfig): ClassNameRow[] {
  if (!config) {
    return [];
  }

  return normalizeComponents<ClassNamesDefinition | SlotClassNames>(config).flatMap(({ component, definition }) => {
    const classNames =
      typeof definition.classNames === 'object'
        ? (definition as ClassNamesDefinition).classNames
        : (definition as SlotClassNames);
    return Object.entries(classNames).map(([slot, className]) => ({ component, slot, className }));
  });
}
