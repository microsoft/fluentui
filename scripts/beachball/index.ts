import { BeachballConfig } from 'beachball';
import { renderHeader, renderEntry } from './customRenderers';

export const config: BeachballConfig = {
  disallowedChangeTypes: ['major', 'minor', 'patch'],
  tag: 'beta',
  changelog: {
    customRenderers: {
      renderHeader,
      renderEntry,
    },
  },
};
