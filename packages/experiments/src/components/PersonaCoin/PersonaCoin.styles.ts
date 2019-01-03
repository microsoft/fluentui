import { IPersonaCoinComponent } from './PersonaCoin.types';
import { initialsColorPropToColorCode } from 'office-ui-fabric-react/lib/components/Persona/PersonaInitialsColor';

export const DEFAULT_PERSONA_COIN_SIZE = 48;

export const PersonaCoinStyles: IPersonaCoinComponent['styles'] = props => {
  const { size = DEFAULT_PERSONA_COIN_SIZE, coinColor = initialsColorPropToColorCode(props), initialsColor = 'white' } = props;

  return {
    root: {
      position: 'relative',
      backgroundColor: coinColor,
      color: initialsColor,
      width: size,
      height: size,
      borderRadius: '50%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },
    initials: {
      fontSize: `${size / 2.5}px`
    },
    image: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: size,
      height: size,
      borderRadius: '50%',
      overflow: 'hidden'
    },
    presence: {
      position: 'absolute',
      right: `${getPresenceOffsetForCoinSize(size)}px`,
      bottom: `${getPresenceOffsetForCoinSize(size)}px`
    }
  };
};

function getPresenceOffsetForCoinSize(size: number) {
  // TODO: Tweak this as currently it's more of an approximation.
  return -(size / 15);
}
