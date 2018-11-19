import { IStyle } from '../../../Styling';

export type IActivityItemExampleStyleProps = {};

export interface IActivityItemExampleStyles {
  exampleRoot?: IStyle;
  nameText?: IStyle;
}

export const getStyles = (props: IActivityItemExampleStyleProps): IActivityItemExampleStyles => {
  return {
    exampleRoot: {
      marginTop: '20px'
    },
    nameText: {
      fontWeight: 'bold'
    }
  };
};
