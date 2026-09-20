import type {
  PersonaProps as PersonaBaseProps,
  PersonaSlots as PersonaBaseSlots,
  PersonaState as PersonaBaseState,
} from '@fluentui/react-headless-components-preview/persona';
import type { ComponentState, Slot } from '@fluentui/react-utilities';
import type { Avatar } from '../Avatar';

export type PersonaSlots = Omit<PersonaBaseSlots, 'avatar'> & {
  avatar?: Slot<typeof Avatar>;
};

export type PersonaProps = Omit<PersonaBaseProps, 'avatar'> & {
  avatar?: PersonaSlots['avatar'];
  /** @default 'medium' */
  size?: 'extra-small' | 'small' | 'medium' | 'large' | 'extra-large' | 'huge';
  /** @default 'start' */
  textAlignment?: 'center' | 'start';
};

export type PersonaState = Omit<PersonaBaseState, 'avatar' | 'components' | 'root'> &
  ComponentState<PersonaSlots> & {
    size: NonNullable<PersonaProps['size']>;
    textAlignment: NonNullable<PersonaProps['textAlignment']>;
    root: PersonaBaseState['root'] &
      ComponentState<PersonaSlots>['root'] & {
        'data-size': NonNullable<PersonaProps['size']>;
        'data-text-alignment': NonNullable<PersonaProps['textAlignment']>;
        'data-text-position'?: PersonaBaseState['textPosition'];
      };
  };
