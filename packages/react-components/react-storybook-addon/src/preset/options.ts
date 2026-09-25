import type { PresetConfig } from '../public-types';

const ADDON_PRESET_PATTERN = /(?:^|\/)react-storybook-addon\/(?:temp\/)?preset\.[jt]s$/;

type PresetRegistration = {
  name?: unknown;
  options?: PresetConfig;
};

type StateDataAttributesOptions = {
  stateDataAttributes?: PresetConfig['stateDataAttributes'];
  presetsList?: PresetRegistration[];
};

export function getStateDataAttributesConfig(
  options: StateDataAttributesOptions | undefined,
): PresetConfig['stateDataAttributes'] | undefined {
  if (options?.stateDataAttributes) {
    return options.stateDataAttributes;
  }

  const preset = options?.presetsList?.find(registration =>
    ADDON_PRESET_PATTERN.test(String(registration.name ?? '').replace(/\\/g, '/')),
  );

  return preset?.options?.stateDataAttributes;
}

export function isStateDataAttributesConfigured(options: StateDataAttributesOptions | undefined): boolean {
  return Boolean(getStateDataAttributesConfig(options));
}
