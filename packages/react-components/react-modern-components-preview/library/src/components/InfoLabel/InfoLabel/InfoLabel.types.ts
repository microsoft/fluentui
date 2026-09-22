import type {
  InfoLabelProps as InfoLabelBaseProps,
  InfoLabelSlots as InfoLabelBaseSlots,
  InfoLabelState as InfoLabelBaseState,
} from '@fluentui/react-headless-components-preview/info-label';
import type { ComponentState, Slot } from '@fluentui/react-utilities';
import type { InfoButton } from '../InfoButton';
import type { Label } from '../../Label';

export type InfoLabelSlots = Omit<InfoLabelBaseSlots, 'infoButton' | 'label'> & {
  label: NonNullable<Slot<typeof Label>>;
  infoButton: Slot<typeof InfoButton>;
};

export type InfoLabelProps = Omit<InfoLabelBaseProps, 'infoButton' | 'label'> & {
  infoButton?: InfoLabelSlots['infoButton'];
  label?: InfoLabelSlots['label'];
  /** @default 'medium' */
  size?: 'small' | 'medium' | 'large';
};

export type InfoLabelState = Omit<InfoLabelBaseState, 'components' | 'infoButton' | 'label' | 'root'> &
  ComponentState<InfoLabelSlots> & {
    size: NonNullable<InfoLabelProps['size']>;
    root: InfoLabelBaseState['root'] &
      ComponentState<InfoLabelSlots>['root'] & {
        'data-size': NonNullable<InfoLabelProps['size']>;
      };
  };
