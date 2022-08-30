import { BeachballConfig } from 'beachball';
import { renderHeader, renderEntry } from './customRenderers';

export const config: BeachballConfig = {
  disallowedChangeTypes: ['major'],
  groups: [
    {
      name: 'Fluent UI React',
      include: ['packages/office-ui-fabric-react', 'packages/react'],
      disallowedChangeTypes: ['major'],
    },
    {
      name: 'Styling',
      include: ['packages/styling', 'stub-packages/style-utilities'],
      disallowedChangeTypes: ['major'],
    },
  ],
  changelog: {
    customRenderers: {
      renderHeader,
      renderEntry,
    },
  },
};
