import { getPersonaInitialsColor } from '@fluentui/react/lib/Persona';
import type { IPersonaProps } from '@fluentui/react';
import type { IPersonaCoinComponent, IPersonaCoinStylesReturnType } from './PersonaCoin.types';

export const DEFAULT_PERSONA_COIN_SIZE = 48;

export const PersonaCoinStyles: IPersonaCoinComponent['styles'] = (
  props,
  theme,
  tokens,
): IPersonaCoinStylesReturnType => {
  const personaProps: IPersonaProps = {
    text: props.text,
    initialsColor: props.initialsColor,
  };

  const {
    size = DEFAULT_PERSONA_COIN_SIZE,
    coinColor = getPersonaInitialsColor(personaProps),
    initialsColor = 'white',
  } = props;

  return {
    root: {
      position: 'relative',
      backgroundColor: props.isPictureLoaded ? undefined : coinColor,
      color: initialsColor,
      width: size,
      height: size,
      borderRadius: '50%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    initials: {
      fontSize: `${size / 2.5}px`,
    },
    image: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: size,
      height: size,
      borderRadius: '50%',
      overflow: 'hidden',
    },
    presence: {
      position: 'absolute',
      right: `${getPresenceOffsetForCoinSize(size)}px`,
      bottom: `${getPresenceOffsetForCoinSize(size)}px`,
    },
  };
};

function getPresenceOffsetForCoinSize(size: number) {
  // TODO: Tweak this as currently it's more of an approximation.
  return -(size / 15);
}
