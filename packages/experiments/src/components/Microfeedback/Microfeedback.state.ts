import { IMicrofeedbackProps, IMicrofeedbackViewProps } from './Microfeedback.types';
import { BaseState } from '../../utilities/BaseState';

// Internal state will most likely include a subset of your ViewProps. This template just equates them to start with.
export type IMicrofeedbackState = IMicrofeedbackViewProps;

export class MicrofeedbackState extends BaseState<IMicrofeedbackProps, IMicrofeedbackViewProps, IMicrofeedbackState> {
  constructor(props: MicrofeedbackState['props']) {
    super(props, {
      // Mark controlledProps to ensure that they get priority when provided as a component prop.
      // For props not marked controlled, component state will get priority over component props.
      controlledProps: ['text']
    });

    this.state = {
      text: props.defaultText || 'Default Text',
      status: 'State Text'
    };
  }
}
