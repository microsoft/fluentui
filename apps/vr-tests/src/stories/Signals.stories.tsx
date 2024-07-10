import * as React from 'react';
import {
  SharedSignal,
  SignalField,
  YouCheckedOutSignal,
  MalwareDetectedSignal,
  BlockedSignal,
  MissingMetadataSignal,
  WarningSignal,
  AwaitingApprovalSignal,
  TrendingSignal,
  SomeoneCheckedOutSignal,
  NewSignal,
  MentionSignal,
  CommentsSignal,
  UnseenReplySignal,
  UnseenEditSignal,
  EmailedSignal,
  RecordSignal,
  ReadOnlySignal,
  FollowedSignal,
  NotFollowedSignal,
} from '@fluentui/react-experiments';
import { Steps } from 'storywright';
import { Fabric } from '@fluentui/react';
import { StoryWrightDecorator, TestWrapperDecorator } from '../utilities';

interface ISignalExampleProps {
  name: string;
  signal: React.ReactNode;
}

const SignalExample: React.FunctionComponent<ISignalExampleProps> = (
  props: ISignalExampleProps,
): JSX.Element => {
  return (
    <div>
      <Fabric>
        <SignalField before={props.signal}>{props.name}</SignalField>
      </Fabric>
    </div>
  );
};

export default {
  title: 'Signals',

  decorators: [
    TestWrapperDecorator,
    StoryWrightDecorator(new Steps().snapshot('default', { cropTo: '.testWrapper' }).end()),
  ],
};

export const YouCheckedOut = () => (
  <SignalExample name="You checked out" signal={<YouCheckedOutSignal />} />
);

YouCheckedOut.storyName = 'You checked out';

export const MalwareDetected = () => (
  <SignalExample name="Malware detected" signal={<MalwareDetectedSignal />} />
);

MalwareDetected.storyName = 'Malware detected';

export const Blocked = () => <SignalExample name="Blocked" signal={<BlockedSignal />} />;

export const MissingMetadata = () => (
  <SignalExample name="Missing metadata" signal={<MissingMetadataSignal />} />
);

MissingMetadata.storyName = 'Missing metadata';

export const Warning = () => <SignalExample name="Warning" signal={<WarningSignal />} />;

export const AwaitingApproval = () => (
  <SignalExample name="Awaiting approval" signal={<AwaitingApprovalSignal />} />
);

AwaitingApproval.storyName = 'Awaiting approval';

export const Trending = () => <SignalExample name="Trending" signal={<TrendingSignal />} />;

export const SomeoneCheckedOut = () => (
  <SignalExample name="Someone checked out" signal={<SomeoneCheckedOutSignal />} />
);

SomeoneCheckedOut.storyName = 'Someone checked out';

export const New = () => <SignalExample name="New" signal={<NewSignal />} />;
export const NewPositioning = () => <SignalExample name="O" signal={<NewSignal />} />;

NewPositioning.storyName = 'New (positioning)';

export const Mention = () => <SignalExample name="Mention" signal={<MentionSignal />} />;
export const Comments = () => <SignalExample name="Comments" signal={<CommentsSignal />} />;

export const CommentsCount = () => (
  <SignalExample name="Comments" signal={<CommentsSignal>2</CommentsSignal>} />
);

CommentsCount.storyName = 'Comments (count)';

export const UnseenReply = () => (
  <SignalExample name="Unseen reply" signal={<UnseenReplySignal />} />
);

UnseenReply.storyName = 'Unseen reply';

export const UnseenEdit = () => <SignalExample name="Unseen edit" signal={<UnseenEditSignal />} />;

UnseenEdit.storyName = 'Unseen edit';

export const Emailed = () => <SignalExample name="Emailed" signal={<EmailedSignal />} />;
export const Record = () => <SignalExample name="Record" signal={<RecordSignal />} />;
export const ReadOnly = () => <SignalExample name="Read-only" signal={<ReadOnlySignal />} />;

ReadOnly.storyName = 'Read-only';

export const Shared = () => <SignalExample name="Shared" signal={<SharedSignal />} />;
export const Follow = () => <SignalExample name="Save for later" signal={<FollowedSignal />} />;

export const NotFollow = () => (
  <SignalExample name="Remove from saved" signal={<NotFollowedSignal />} />
);

NotFollow.storyName = 'NotFollow';
