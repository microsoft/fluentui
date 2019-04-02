import { IStyle } from 'office-ui-fabric-react/lib/Styling';
import { IStyleFunctionOrObject } from 'office-ui-fabric-react/lib/Utilities';

export interface IFeedbackListProps {
  title: string;
  /** Optional override styles */
  styles?: IStyleFunctionOrObject<IFeedbackListStyleProps, IFeedbackListStyles>;
}

export type IFeedbackListStyleProps = {};

export interface IFeedbackListStyles {
  root: IStyle;
  pivot: IStyle;
  issueList: IStyle;
  button: IStyle;
  itemLabel: IStyle;
  itemCell: IStyle;
  itemName: IStyle;
  timeStamp: IStyle;
}
