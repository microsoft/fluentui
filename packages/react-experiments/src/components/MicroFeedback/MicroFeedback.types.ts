import * as React from 'react';
import type { IComponent, IComponentStyles, ISlotProp, IStyleableComponentProps } from '@fluentui/foundation-legacy';
import type { IButtonSlot, ICalloutSlot, IListSlot } from '../../utilities/factoryComponents.types';
import type { IBaseProps } from '../../Utilities';
import type { IStackSlot, ITextSlot } from '@fluentui/react';

export type IMicroFeedbackComponent = IComponent<
  IMicroFeedbackProps,
  IMicroFeedbackTokens,
  IMicroFeedbackStyles,
  IMicroFeedbackViewProps
>;

// These types are redundant with IMicroFeedbackComponent but are needed until TS function return widening issue
// is resolved: https://github.com/Microsoft/TypeScript/issues/241
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
   * Defines a list of options from which to choose as an answer to the given question.
   */
  options: string[];

  /**
   * Defines an identifier that correlates the question to the Like or Dislike.
   */
  id: string;
}

export interface IMicroFeedbackSlots {
  /**
   * Defines the root slot of the component.
   */
  root?: IStackSlot;

  /**
   * Defines the stack container for the Like/Dislike pair of icons.
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
   * Defines the list of options that can be chosen as an answer to the follow up question.
   */
  followUpOptionList?: IListSlot;

  /**
   * Defines the options available for the follow up questions.
   */
  followUpOption?: IButtonSlot;

  /**
   * Defines the text that is provided in the options available for the follow up questions.
   */
  followUpOptionText?: ITextSlot;

  /**
   * Defines the thanks that follows after a vote or followup.
   */
  thanksContainer?: ICalloutSlot;
}

export interface IMicroFeedback {}

export interface IMicroFeedbackProps
  extends IMicroFeedbackSlots,
    IStyleableComponentProps<IMicroFeedbackProps, IMicroFeedbackTokens, IMicroFeedbackStyles>,
    IBaseProps<IMicroFeedback> {
  /**
   * Defines a callback that sends the feedback to a potential backend.
   */
  sendFeedback?: (vote: VoteType) => void;

  /**
   * Defines a callback for sending the index of the chosen option for the follow up question to a potential backend.
   */
  sendFollowUpIndex?: (id: string, index: number) => void;

  /**
   * Defines a localized string for the Like icon.
   */
  likeIconTitle?: string;

  /**
   * Defines a localized string for the Dislike icon.
   */
  dislikeIconTitle?: string;

  /**
   * Defines a localized string for the aria label of the Like icon for the benefit of screen readers.
   */
  likeIconAriaLabel?: string;

  /**
   * Defines a localized string for the aria label of the Dislike icon for the benefit of screen readers.
   */
  dislikeIconAriaLabel?: string;

  /**
   * Defines an optional question that is asked if Like is selected.
   */
  likeQuestion?: IMicroFeedbackQuestion;

  /**
   * Defines an optional question that is asked if Dislike is selected.
   */
  dislikeQuestion?: IMicroFeedbackQuestion;

  /**
   * Determines if this is a Stack or Callout followup.
   */

  inline?: boolean;

  /**
   * Determines if a thank you note needs to be shown
   */

  thanksText?: string;
}

export interface IMicroFeedbackViewProps extends IMicroFeedbackProps {
  /**
   * Defines the current vote selection so far.
   * @defaultvalue 'no_vote'
   */
  vote: VoteType;

  /**
   * Determines if the follow up section is visible or not.
   * @defaultvalue false
   */
  isFollowUpVisible?: boolean;

  /**
   * Determines if the Callout with the "thank you" message is visible or not.
   * @defaultvalue false
   */
  isThanksVisible?: boolean;

  /**
   * Defines a reference for the Like button.
   */
  likeRef: React.RefObject<HTMLDivElement>;

  /**
   * Defines a reference for the Dislike button.
   */
  dislikeRef: React.RefObject<HTMLDivElement>;

  /**
   * Defines a callback that is called when the Callout is dismissed.
   */
  onCalloutDismiss: () => void;

  /**
   * Defines a callback that is called when the Thanks is dismissed.
   */
  onThanksDismiss: () => void;

  /**
   * Defines a callback that is called when the Thanks is shown.
   */
  onThanksShow: () => void;

  /**
   * Defines a callback that is called when Like is selected.
   */
  onLikeVote: () => void;

  /**
   * Defines a callback that is called when Dislike is selected.
   */
  onDislikeVote: () => void;
}

export interface IMicroFeedbackTokens {
  followUpBackgroundColor?: string;
  questionMargin?: number | string;
  width?: number | string;
}

export type IMicroFeedbackStyles = IComponentStyles<IMicroFeedbackSlots>;
