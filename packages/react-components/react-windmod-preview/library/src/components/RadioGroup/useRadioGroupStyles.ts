import { clsx } from 'clsx';

import { componentMarkers } from '../../utils/groupMarker';
import type { RadioGroupState } from './RadioGroup.types';

import styles from './RadioGroup.module.css';

/** The only public identity classes — see componentMarkers; internals are hashed idents. */
export const radioGroupClassNames: { root: string } = {
  root: componentMarkers('radio-group'),
};

type RadioGroupRootDataAttributes = {
  'data-layout'?: RadioGroupState['layout'];
};

/** Applies the visual contract, returning new state. The headless radio-group hook stamps no data
 * attributes at all, so `data-layout` is windmod's alone; the layout also travels to the child
 * Radios through the headless group context, which is why the state carries it. */
export const useRadioGroupStyles = (state: RadioGroupState): RadioGroupState => {
  const root: RadioGroupState['root'] & RadioGroupRootDataAttributes = {
    ...state.root,
    'data-layout': state.layout,
    className: clsx(radioGroupClassNames.root, styles.root, state.root.className),
  };

  return { ...state, root };
};
