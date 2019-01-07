import { IStyle, FontSizes } from 'office-ui-fabric-react/lib/Styling';

export interface IAddCardStyles {
  /**
   * Style set for the add card item
   */
  container: IStyle;
  title: IStyle;
  titleText: IStyle;
  body: IStyle;
}

export const getStyles = (): IAddCardStyles => {
  return {
    container: {
      zIndex: 10,
      touchAction: 'none',
      position: 'absolute',
      backgroundColor: 'rgb(255, 255, 255)',
      borderRadius: '2px',
      boxShadow: '0 2.4px 7.2px rgba(0, 0, 0, 0.18), 0 12.8px 28.8px rgba(0, 0, 0, 0.22)',
      pointerEvents: 'none'
    },
    title: {
      width: '100%-4px',
      height: '20px',
      borderTopLeftRadius: '2px',
      borderTopRightRadius: '2px',
      borderBottom: '1px solid rgb(0, 0, 0, 0.1)',
      position: 'relative',
      color: 'rgb(0, 0, 0)',
      fontFamily: 'Segoe UI',
      fontWeight: '600',
      lineHeight: '16px',
      fontSize: FontSizes.medium,
      outline: 'transparent',
      paddingTop: '17px',
      paddingLeft: '15px'
    },
    titleText: {},
    body: {
      display: 'flex',
      justifyContent: 'center',
      height: '250px'
    }
  };
};
