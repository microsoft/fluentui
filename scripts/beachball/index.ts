import { BeachballConfig } from 'beachball';
import { renderHeader, renderEntry } from './customRenderers';

export const config: BeachballConfig = {
  groups: [
    {
      name: 'Fluent UI React',
      include: ['packages/office-ui-fabric-react', 'packages/react'],
      disallowedChangeTypes: ['major'],
    },
  ],
  // This prevents accidental major changes. You can manually do a major change by selecting
  // "minor" on the command line and then changing it to "major" by editing the change file.
  disallowedChangeTypes: ['major'],
  changelog: {
    customRenderers: {
      renderHeader,
      renderEntry,
    },
  },
};
