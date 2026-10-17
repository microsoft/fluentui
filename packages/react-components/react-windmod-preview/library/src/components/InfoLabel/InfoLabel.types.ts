import type { Slot } from '@fluentui/react-utilities';
import type {
  InfoLabelProps as InfoLabelHeadlessProps,
  InfoLabelState as InfoLabelHeadlessState,
} from '@fluentui/react-headless-components-preview/info-label';

import type { InfoButton } from '../InfoButton';
import type { Label, LabelSize, LabelWeight } from '../Label';

export type { InfoLabelSlots } from '@fluentui/react-headless-components-preview/info-label';

/**
 * Windmod InfoLabel props: the headless info label plus the look props the headless surface
 * deliberately omits. `LabelBaseProps` omits both, so neither reaches the label by inheritance.
 * Both child slots are the windmod components, so their shorthand accepts the look props the
 * headless slots do not.
 */
export type InfoLabelProps = Omit<InfoLabelHeadlessProps, 'infoButton' | 'label'> & {
  label?: NonNullable<Slot<typeof Label>>;
  infoButton?: Slot<typeof InfoButton>;
  /** @default 'medium' */
  size?: LabelSize;
  /** @default 'regular' */
  weight?: LabelWeight;
};

/** Windmod InfoLabel state: headless state plus the resolved size. `weight` is absent because no
 * InfoLabel rule reads it — it is resolved by the Label below. */
export type InfoLabelState = InfoLabelHeadlessState & Required<Pick<InfoLabelProps, 'size'>>;
