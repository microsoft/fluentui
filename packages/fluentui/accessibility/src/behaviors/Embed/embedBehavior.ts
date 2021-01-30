import { keyboardKey, SpacebarKey } from '../../keyboard-key';
import { Accessibility } from '../../types';

/**
 * @description
 * GIFs are visual representation only so hidden unless alt or title applied.
 * Enter/space keys play and pause the gif respectively
 *
 * @specification
 * Adds role 'presentation' to 'root' slot.
 * Adds attribute 'aria-hidden=true', if there is no 'alt' property provided.
 * Adds attribute 'tabIndex=0' to 'root' slot.
 */
export const embedBehavior: Accessibility<EmbedBehaviorProps> = props => ({
  attributes: {
    root: {
      'aria-hidden': props.alt || props.title ? undefined : true,
      role: 'presentation',
      tabIndex: 0,
    },
  },
  keyActions: {
    root: {
      performClick: {
        keyCombinations: [{ keyCode: keyboardKey.Enter }, { keyCode: SpacebarKey }],
      },
    },
  },
});

export type EmbedBehaviorProps = {
  /** Corresponds to HTML title attribute. */
  title?: string;
  /** Alternative text. */
  alt?: string;
};
