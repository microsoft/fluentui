import { IStyleFunctionOrObject } from '../../Utilities';
import { IStyle, ITheme } from '../../Styling';

// Optional interface to use for componentRef. This should be limited in scope with the most common scenario being for focusing elements.
export interface IMicrofeedback {}

export interface IMicrofeedbackSlots {}

export type VoteType = 'dislike' | 'no_vote' | 'like';

// Extending IStyleableComponentProps will automatically add styleable props for you, such as styles, tokens and theme.
// If you don't want these props to be included in your component, just remove this extension.
export interface IMicrofeedbackProps extends IMicrofeedbackSlots {
  sendFeedback?: (vote: VoteType) => void; // Callback for sending feedback to a backend
  sendFollowupIndex?: (index: number) => void; // Callback for sending followup index to a backend
  thumbsUpTitle?: string; // Localized string for the thumbsUp icon
  thumbsDownTitle?: string; // Localized string for the thumbsDown icon
  ThumbsUpQuestion?: IMicrofeedbackQuestion; // Optional question to be asked if user selected thumbsUp
  ThumbsDownQuestion?: IMicrofeedbackQuestion; // Optional question to be asked if user selectes thumbsDown
  defaultText?: string;

  styles?: IStyleFunctionOrObject<IMicrofeedbackStyleProps, IMicrofeedbackStyles>;
  theme?: ITheme;
}

export interface IMicrofeedbackStyleProps {
  theme?: ITheme;
}

export interface IMicrofeedbackQuestion {
  question: string; // Question to be asked after a vote
  options: string[]; // List of options to be shown as answers
}

export interface IMicrofeedbackViewProps extends IMicrofeedbackProps {}

export interface IMicrofeedbackStyles {
  root: IStyle;
}
