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
      name: 'React Charting',
      include: ['packages/charting', 'stub-packages/react-charting'],
      disallowedChangeTypes: ['major'],
    },
    {
      name: 'Styling',
      include: ['packages/styling', 'stub-packages/style-utilities'],
      disallowedChangeTypes: ['major'],
    },
    {
      name: 'Icons',
      include: ['packages/icons', 'stub-packages/font-icons-mdl2'],
      disallowedChangeTypes: ['major'],
    },
    {
      name: 'Experiments',
      include: ['packages/experiments', 'stub-packages/experiments'],
      disallowedChangeTypes: ['major'],
    },
    {
      name: 'File Type Icons',
      include: ['packages/file-type-icons', 'stub-packages/react-file-type-icons'],
      disallowedChangeTypes: ['major'],
    },
    {
      name: 'Utilities',
      include: ['packages/utilities', 'stub-packages/utilities'],
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
