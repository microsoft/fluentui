import { IComponent, IComponentStyles, IStyleableComponentProps } from '../../Foundation';
import { IBaseProps } from '../../Utilities';

export type IMicrofeedbackComponent = IComponent<IMicrofeedbackProps, IMicrofeedbackTokens, IMicrofeedbackStyles, IMicrofeedbackViewProps>;

// These types are redundant with IMicrofeedbackComponent but are needed until TS function return widening issue is resolved:
// https://github.com/Microsoft/TypeScript/issues/241
// For now, these helper types can be used to provide return type safety for tokens and styles functions.
export type IMicrofeedbackTokenReturnType = ReturnType<Extract<IMicrofeedbackComponent['tokens'], Function>>;
export type IMicrofeedbackStylesReturnType = ReturnType<Extract<IMicrofeedbackComponent['styles'], Function>>;

// Optional interface to use for componentRef. This should be limited in scope with the most common scenario being for focusing elements.
export interface IMicrofeedback {}

export interface IMicrofeedbackSlots {}

// Extending IStyleableComponentProps will automatically add styleable props for you, such as styles, tokens and theme.
// If you don't want these props to be included in your component, just remove this extension.
export interface IMicrofeedbackProps
  extends IMicrofeedbackSlots,
    IStyleableComponentProps<IMicrofeedbackViewProps, IMicrofeedbackTokens, IMicrofeedbackStyles>,
    IBaseProps<IMicrofeedback> {
  sendFeedback?: any; // Callback for sending feedback to a backend such as OCV or substrate
  thumbsUpTitle?: string; // Localized string for the thumbsUp icon
  thumbsDownTitle?: string; // Localized string for the thumbsDown icon
  ThumbsUpQuestion?: MicrofeedbackQuestion; // Optional question to be asked if user selected thumbsUp
  ThumbsDownQuestion?: MicrofeedbackQuestion; // Optional question to be asked if user selectes thumbsDown
  defaultText?: string;
}

export class MicrofeedbackQuestion {
  public question: string; // Question to be asked after a vote
  public options: string[]; // List of options to be shown as answers
}

export interface IMicrofeedbackViewProps extends IMicrofeedbackProps {}

export interface IMicrofeedbackTokens {}

export type IMicrofeedbackStyles = IComponentStyles<IMicrofeedbackSlots>;
