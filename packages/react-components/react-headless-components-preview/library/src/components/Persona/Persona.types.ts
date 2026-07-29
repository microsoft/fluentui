import type {
  PersonaSlots as PersonaBaseSlots,
  PersonaProps as PersonaBaseProps,
  PersonaState as PersonaBaseState,
} from '@fluentui/react-persona';
import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import type { Avatar } from '../Avatar';

export type PersonaSlots = Omit<PersonaBaseSlots, 'avatar' | 'presence'> & {
  avatar?: Slot<typeof Avatar>;
};

/**
 * Persona Props
 */
export type PersonaProps = ComponentProps<PersonaSlots> & Pick<PersonaBaseProps, 'name' | 'textPosition'>;

/**
 * State used in rendering Persona
 */
export type PersonaState = ComponentState<PersonaSlots> & Pick<PersonaBaseState, 'textPosition' | 'numTextLines'>;
