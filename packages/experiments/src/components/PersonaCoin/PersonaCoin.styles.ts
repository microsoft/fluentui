import { IPersonaCoinComponent } from './PersonaCoin.types';

export const PersonaCoinStyles: IPersonaCoinComponent['styles'] = props => {
  const { theme, size, imageUrl, color } = props;

  return {
    root: {
      position: 'relative',
      backgroundColor: color,
      backgroundSize: '100% 100%',
      width: size,
      height: size,
      borderRadius: '50%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: size / 3,
      overflow: 'hidden'
    },
    image: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: size,
      height: size,
      borderRadius: '50%',
      overflow: 'hidden'
    }
  };
};
