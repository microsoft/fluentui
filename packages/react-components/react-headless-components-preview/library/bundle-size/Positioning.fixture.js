// Named imports only - a namespace import keeps every export name as a string property in the minified output,
// which no consumer ships, and inflates the measured size.
import {
  ALIGNMENTS,
  POSITIONS,
  getPlacementString,
  resolvePositioningShorthand,
  usePositioning,
} from '@fluentui/react-headless-components-preview/positioning';

console.log(ALIGNMENTS, POSITIONS, getPlacementString, resolvePositioningShorthand, usePositioning);

export default {
  name: '@fluentui/react-headless-components-preview/positioning',
};
