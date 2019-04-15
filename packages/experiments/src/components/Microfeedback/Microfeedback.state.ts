import { IMicrofeedbackViewProps, VoteType } from './Microfeedback.types';

export interface IMicrofeedbackState extends IMicrofeedbackViewProps {
  vote: VoteType;
  isFollowupVisible: boolean;
}
