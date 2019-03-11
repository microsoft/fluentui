import { IComponent, IComponentStyles, IHTMLSlot, IStyleableComponentProps } from '../../Foundation';
import { ITextSlot } from '../../Text';
import { IBaseProps } from '../../Utilities';

export type IMicrofeedbackComponent = IComponent<IMicrofeedbackProps, IMicrofeedbackTokens, IMicrofeedbackStyles, IMicrofeedbackViewProps>;

// These types are redundant with IMicrofeedbackComponent but are needed until TS function return widening issue is resolved:
// https://github.com/Microsoft/TypeScript/issues/241
// For now, these helper types can be used to provide return type safety for tokens and styles functions.
export type IMicrofeedbackTokenReturnType = ReturnType<Extract<IMicrofeedbackComponent['tokens'], Function>>;
export type IMicrofeedbackStylesReturnType = ReturnType<Extract<IMicrofeedbackComponent['styles'], Function>>;

// Optional interface to use for componentRef. This should be limited in scope with the most common scenario being for focusing elements.
export interface IMicrofeedback {}

export interface IMicrofeedbackSlots {
  // All props for your component are to be defined here.
  /**
   * Root element.
   */
  root?: IHTMLSlot;

  /**
   * Component sample prop. If provided, component is controlled.
   * @defaultValue defaultText
   */
  text?: ITextSlot;
}

// Extending IStyleableComponentProps will automatically add styleable props for you, such as styles, tokens and theme.
// If you don't want these props to be included in your component, just remove this extension.
export interface IMicrofeedbackProps
  extends IMicrofeedbackSlots,
    IStyleableComponentProps<IMicrofeedbackViewProps, IMicrofeedbackTokens, IMicrofeedbackStyles>,
    IBaseProps<IMicrofeedback> {
  // All props for your component are to be defined here.
  /**
   * Component sample default prop for use if component is uncontrolled.
   * @defaultValue 'Default Text'
   */
  defaultText?: string;

  // Setting this prop to true will apply different styling to the text slot.
  warning?: boolean;
}

export interface IMicrofeedbackViewProps extends IMicrofeedbackProps {
  // You can define view only props here.
  /**
   * Sample prop internal to component. These types of props aren't exposed
   *   externally to consumers and their values are typically determined by component state.
   */
  status: string;
}

export interface IMicrofeedbackTokens {
  // Define tokens for your component here. Tokens are styling 'knobs' that your component will automatically
  // apply to styling sections in the styles file.
  textColor?: string;
}

export type IMicrofeedbackStyles = IComponentStyles<IMicrofeedbackSlots>;
