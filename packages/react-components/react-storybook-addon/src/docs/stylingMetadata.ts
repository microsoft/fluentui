import type { FluentParameters } from '../hooks';

type ClassNamesDefinition = { classNames: Readonly<Record<string, string>> };

type DataAttributesDefinition = {
  attributes: Readonly<Record<string, Readonly<Record<string, `data-${string}`>>>>;
  /** Omitted values mean presence; [] means any string; null means unknown (not rendered). */
  values?: Readonly<Record<string, Readonly<Record<string, readonly (string | number | boolean)[] | null>>>>;
};

type ComponentFamily<T> = { components: Readonly<Record<string, T>> };

/** Styling hooks for one component or a named component family. */
export type StylingMetadata = {
  classNames?: ClassNamesDefinition | ComponentFamily<ClassNamesDefinition>;
  dataAttributes?: DataAttributesDefinition | ComponentFamily<DataAttributesDefinition>;
};

export function getClassNameGroups(
  config: StylingMetadata['classNames'],
): { name: string; rows: [string, string][] }[] {
  if (!config) {
    return [];
  }
  const definitions: [string, ClassNamesDefinition][] =
    'components' in config ? Object.entries(config.components) : [['', config]];
  return definitions
    .map(([name, definition]) => ({ name, rows: Object.entries(definition.classNames) }))
    .filter(group => group.rows.length > 0);
}

export function getDataAttributeGroups(config: StylingMetadata['dataAttributes']): {
  name: string;
  rows: { slot: string; attribute: `data-${string}`; values?: readonly (string | number | boolean)[] }[];
}[] {
  if (!config) {
    return [];
  }
  const definitions: [string, DataAttributesDefinition][] =
    'components' in config ? Object.entries(config.components) : [['', config]];
  return definitions
    .map(([name, definition]) => ({
      name,
      rows: Object.entries(definition.attributes).flatMap(([slot, attributes]) =>
        Object.entries(attributes).flatMap(([key, attribute]) => {
          const values = definition.values?.[slot]?.[key];
          return values === null ? [] : [{ slot, attribute, values }];
        }),
      ),
    }))
    .filter(group => group.rows.length > 0);
}

export function resolveStylingMetadata(parameters: FluentParameters): StylingMetadata {
  const docs = parameters.reactStorybookAddon?.docs;
  if (docs === false) {
    return {};
  }
  const authored = typeof docs === 'object' && docs !== null ? docs : {};
  return {
    classNames: authored.classNames ?? parameters.__generatedStylingMetadata?.classNames,
    dataAttributes: authored.dataAttributes ?? parameters.__generatedStylingMetadata?.dataAttributes,
  };
}
