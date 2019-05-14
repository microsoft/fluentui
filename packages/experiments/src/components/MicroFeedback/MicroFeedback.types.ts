import { IComponent, IComponentStyles, ISlotProp, IStyleableComponentProps } from '../../Foundation';
import { ICalloutSlot } from '../../utilities/factoryComponents.types';
import { IBaseProps } from '../../Utilities';
import { IButtonSlot } from '@uifabric/experiments';
import { IStackSlot, ITextSlot } from 'office-ui-fabric-react';

export type IMicroFeedbackComponent = IComponent<IMicroFeedbackProps, IMicroFeedbackTokens, IMicroFeedbackStyles, IMicroFeedbackViewProps>;

// These types are redundant with IMicroFeedbackComponent but are needed until TS function return widening issue is resolved:
// https://github.com/Microsoft/TypeScript/issues/241
// For now, these helper types can be used to provide return type safety when specifying tokens and styles functions.
export type IMicroFeedbackTokenReturnType = ReturnType<Extract<IMicroFeedbackComponent['tokens'], Function>>;
export type IMicroFeedbackStylesReturnType = ReturnType<Extract<IMicroFeedbackComponent['styles'], Function>>;

export type IMicroFeedbackSlot = ISlotProp<IMicroFeedbackProps>;

/**
 * Defines the type of feedback that is being given (positive, none or negative).
 */
export type VoteType = 'dislike' | 'no_vote' | 'like';

export interface IMicroFeedbackQuestion {
  /**
   * Defines the text of the question to be asked after a vote is given.
   */
  question: string;

  /**
   * Defines a list of options from which to choose as answers to the given question.
   */
  options: string[];

  /**
   * Defines an identifier that correlates the question to the thumbs up or thumbs down.
   */
  id: string;
}

export interface IMicroFeedbackSlots {
  /**
   * Defines the root slot of the component.
   */
  root?: IStackSlot;

  /**
   * Defines the stack container for the like/dislike pair of icons.
   */
  iconContainer?: IStackSlot;

  /**
   * Defines the container element that includes the follow up question and options.
   */
  followUpContainer?: ICalloutSlot | IStackSlot;

  /**
   * Defines the follow up question text.
   */
  followUpQuestion?: ITextSlot;

  /**
   * Defines the options available for the follow up questions.
   */
  followUpOption?: IButtonSlot;
}

export interface IMicroFeedback {}

export interface IMicroFeedbackProps
  extends IMicroFeedbackSlots,
    IStyleableComponentProps<IMicroFeedbackProps, IMicroFeedbackTokens, IMicroFeedbackStyles>,
    IBaseProps<IMicroFeedback> {
  /**
   * Defines a callback that sends the feedback to backend.
   */
  sendFeedback?: (vote: VoteType) => void;

  /**
   * Defines a callback for sending the index of the chosen option for the follow up question to backend.
   */
  sendFollowUpIndex?: (id: string, index: number) => void;

  /**
   * Defines a localized string for the thumbs up icon.
   */
  thumbsUpTitle?: string;

  /**
   * Defines a localized string for the thumbs down icon.
   */
  thumbsDownTitle?: string;

  /**
   * Defines an optional question that is asked if thumbs up is selected.
   */
  thumbsUpQuestion?: IMicroFeedbackQuestion;

  /**
   * Defines an optional question that is asked if thumbs down is selected.
   */
  thumbsDownQuestion?: IMicroFeedbackQuestion;

  // defaultText?: string;
  // renderFollowupContainer?: (
  //   children: JSX.Element,
  //   classNames: IProcessedStyleSet<IMicroFeedbackStyles>,
  //   targetElement: HTMLDivElement | null,
  //   onCalloutDismiss: () => void
  // ) => JSX.Element;
}

export interface IMicroFeedbackViewProps extends IMicroFeedbackProps {}

export interface IMicroFeedbackTokens {}

export type IMicroFeedbackStyles = IComponentStyles<IMicroFeedbackSlots>;
