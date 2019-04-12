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
  // All props for your component are to be defined here.
  sendFeedback?: any;
  thumbsUpTitle?: string;
  thumbsDownTitle?: string;
  ThumbsUpQuestion?: MicrofeedbackQuestion;
  ThumbsDownQuestion?: MicrofeedbackQuestion;
  defaultText?: string;
}

export class MicrofeedbackQuestion {
  public question: string;
  public options: string[];
}

export interface IMicrofeedbackViewProps extends IMicrofeedbackProps {}

export interface IMicrofeedbackTokens {}

export type IMicrofeedbackStyles = IComponentStyles<IMicrofeedbackSlots>;
