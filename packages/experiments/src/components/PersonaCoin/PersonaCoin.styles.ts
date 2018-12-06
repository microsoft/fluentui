import { IPersonaCoinComponent } from './PersonaCoin.types';
// tslint:disable-next-line
import { initialsColorPropToColorCode } from '../../../../../packages/office-ui-fabric-react/src/components/Persona/PersonaInitialsColor';

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
      alignItems: 'center',
      fontSize: size / 2.5
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
      // TODO: Pull out the following calculation into a function
      right: `-${(size / 3 < 40 ? size / 3 : 40) / 4}px`,
      bottom: `-${(size / 3 < 40 ? size / 3 : 40) / 4}px`
    }
  };
};
