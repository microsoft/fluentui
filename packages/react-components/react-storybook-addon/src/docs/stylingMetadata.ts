import type { FluentParameters } from '../hooks';

/** Single-component styling hooks for the API reference. */
export type StylingMetadata = {
  classNames?: { classNames: Readonly<Record<string, string>> };
  dataAttributes?: {
    attributes: Readonly<Record<string, Readonly<Record<string, `data-${string}`>>>>;
    /** Omitted values mean presence; [] means any string; null means unknown (not rendered). */
    values?: Readonly<Record<string, Readonly<Record<string, readonly (string | number | boolean)[] | null>>>>;
  };
};

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
