import { IStyle } from '../../../Styling';

export interface IActivityItemExampleStyleProps {
  /**
   * 404 No Style Props Found
   */
}

export interface IActivityItemExampleStyles {
  exampleRoot?: IStyle;
  nameText?: IStyle;
}

export const getStyles = (props: IActivityItemExampleStyleProps): IActivityItemExampleStyles => {
  return ({
    exampleRoot: {
      marginTop: '20px'
    },
    nameText: {
      fontWeight: 'bold'
    }
  });
};