import { IStyle } from '../../../Styling';

export interface IOverlayExampleStyles {
  root: IStyle;
}

export const getStyles = (): IOverlayExampleStyles => {
  return {
    root: [
      'OverlayExample-content',
      {
        background: 'blue',
        bottom: '0',
        color: 'white',
        left: '0',
        padding: '10px',
        position: 'absolute',
        right: '0'
      }
    ]
  };
};
