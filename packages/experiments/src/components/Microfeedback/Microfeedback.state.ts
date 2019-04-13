import { IMicrofeedbackProps, IMicrofeedbackViewProps, VoteType } from './Microfeedback.types';
import { BaseState } from '../../utilities/BaseState';

export interface IMicrofeedbackState extends IMicrofeedbackViewProps {
  vote: VoteType;
  isFollowupVisible: boolean;
}

export class MicrofeedbackState extends BaseState<IMicrofeedbackProps, IMicrofeedbackViewProps, IMicrofeedbackState> {
  constructor(props: MicrofeedbackState['props']) {
    super(props, {});

    this.state = {
      vote: 'no_vote',
      isFollowupVisible: false
    };
  }
}
