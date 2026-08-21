import type { StrictArgTypes } from 'storybook/internal/types';

/**
 * React's native extractor must be wrapped because Storybook calls docs.extractArgTypes directly for primary
 * components and subcomponents. argTypesEnhancers are not equivalent, and this path is an explicit export of the
 * supported Storybook peer version.
 */
import { parameters as nativeParameters } from '@storybook/react/dist/entry-preview-argtypes.mjs';

import { createStateDataAttributesExtractor } from './stateDataAttributesArgTypes';

declare const FLUENT_STATE_DATA_ATTRIBUTE_ARG_TYPES: Record<string, StrictArgTypes>;

export const parameters = {
  docs: {
    extractArgTypes: createStateDataAttributesExtractor(
      nativeParameters.docs.extractArgTypes,
      FLUENT_STATE_DATA_ATTRIBUTE_ARG_TYPES,
    ),
  },
};
