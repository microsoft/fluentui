import { IStyleFunctionOrObject } from '../../Utilities';
import { IStyle, ITheme } from '../../Styling';

// Optional interface to use for componentRef. This should be limited in scope with the most common scenario being for focusing elements.

export type VoteType = 'dislike' | 'no_vote' | 'like';

// Extending IStyleableComponentProps will automatically add styleable props for you, such as styles, tokens and theme.
// If you don't want these props to be included in your component, just remove this extension.
export interface IMicroFeedbackProps {
  sendFeedback?: (vote: VoteType) => void; // Callback for sending feedback to a backend
  sendFollowupIndex?: (index: number) => void; // Callback for sending followup index to a backend
  thumbsUpTitle?: string; // Localized string for the thumbsUp icon
  thumbsDownTitle?: string; // Localized string for the thumbsDown icon
  thumbsUpQuestion?: IMicroFeedbackQuestion; // Optional question to be asked if user selected thumbsUp
  thumbsDownQuestion?: IMicroFeedbackQuestion; // Optional question to be asked if user selectes thumbsDown
  defaultText?: string;

  styles?: IStyleFunctionOrObject<IMicroFeedbackStyleProps, IMicroFeedbackStyles>;
  theme?: ITheme;
}

export interface IMicroFeedbackStyleProps {
  theme?: ITheme;
}

export interface IMicroFeedbackQuestion {
  question: string; // Question to be asked after a vote
  options: string[]; // List of options to be shown as answers
}

export interface IMicroFeedbackStyles {
  //  Base styles for the root element of buttons and followup
  root?: IStyle;

  //  Styles for container elmeent of follow up question and options
  followUpContainer?: IStyle;

  // Styles for follow up question
  followUpQuestion?: IStyle;

  // Styles for follow up option container
  followUpOptionContainer?: IStyle;

  // Styles for follow up option
  followUpOptionText?: IStyle;
}
