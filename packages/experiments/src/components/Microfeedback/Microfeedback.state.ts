import { IMicrofeedbackProps, IMicrofeedbackViewProps } from './Microfeedback.types';
import { BaseState } from '../../utilities/BaseState';

// Internal state will most likely include a subset of your ViewProps. This template just equates them to start with.
export type IMicrofeedbackState = IMicrofeedbackViewProps;

export class MicrofeedbackState extends BaseState<IMicrofeedbackProps, IMicrofeedbackViewProps, IMicrofeedbackState> {
  constructor(props: MicrofeedbackState['props']) {
    super(props, {});

    this.state = {
      isDisliked: false,
      isLiked: false
    };
  }
}
