import { IMicrofeedbackProps, IMicrofeedbackViewProps } from './Microfeedback.types';
import { BaseState } from '../../utilities/BaseState';

export interface IMicrofeedbackState extends IMicrofeedbackViewProps {
  vote: number; // -1, 0, 1 based on dislike, no vote, like
  isFollowupVisible: boolean;
}

export class MicrofeedbackState extends BaseState<IMicrofeedbackProps, IMicrofeedbackViewProps, IMicrofeedbackState> {
  constructor(props: MicrofeedbackState['props']) {
    super(props, {});

    this.state = {
      vote: 0, // -1, 0, 1 based on dislike, no vote, like
      isFollowupVisible: false
    };
  }
}
