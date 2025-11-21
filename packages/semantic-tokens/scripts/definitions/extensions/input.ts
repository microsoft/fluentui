import { GroupPart } from '../groups.types';

// Group button tokens
export const fluentInputGroup: GroupPart = {
  components: ['input'],
  exceptions: [
    {
      // Input has a darker filled background variant
      variants: ['filled.darker'],
      variantProperties: ['background'],
    },
  ],
};
