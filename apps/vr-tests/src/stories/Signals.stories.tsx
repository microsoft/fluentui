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
  NotFollowedSignal
} from '@uifabric/experiments';
import Screener from 'screener-storybook/src/screener';
import { storiesOf } from '@storybook/react';
import { FabricDecorator } from '../utilities';
import { Fabric } from 'office-ui-fabric-react';

interface ISignalExampleProps {
  name: string;
  signal: React.ReactNode;
}

const SignalExample: React.StatelessComponent<ISignalExampleProps> = (props: ISignalExampleProps): JSX.Element => {
  return (
    <div>
      <Fabric>
        <SignalField before={props.signal}>{props.name}</SignalField>
      </Fabric>
    </div>
  );
};

storiesOf('Signals', module)
  .addDecorator(FabricDecorator)
  .addDecorator(story => <Screener steps={new Screener.Steps().snapshot('default', { cropTo: '.testWrapper' }).end()}>{story()}</Screener>)
  .addStory('You checked out', () => <SignalExample name="You checked out" signal={<YouCheckedOutSignal />} />)
  .addStory('Malware detected', () => <SignalExample name="Malware detected" signal={<MalwareDetectedSignal />} />)
  .addStory('Blocked', () => <SignalExample name="Blocked" signal={<BlockedSignal />} />)
  .addStory('Missing metadata', () => <SignalExample name="Missing metadata" signal={<MissingMetadataSignal />} />)
  .addStory('Warning', () => <SignalExample name="Warning" signal={<WarningSignal />} />)
  .addStory('Awaiting approval', () => <SignalExample name="Awaiting approval" signal={<AwaitingApprovalSignal />} />)
  .addStory('Trending', () => <SignalExample name="Trending" signal={<TrendingSignal />} />)
  .addStory('Someone checked out', () => <SignalExample name="Someone checked out" signal={<SomeoneCheckedOutSignal />} />)
  .addStory('New', () => <SignalExample name="New" signal={<NewSignal />} />)
  .addStory('New (positioning)', () => <SignalExample name="O" signal={<NewSignal />} />)
  .addStory('Mention', () => <SignalExample name="Mention" signal={<MentionSignal />} />)
  .addStory('Comments', () => <SignalExample name="Comments" signal={<CommentsSignal />} />)
  .addStory('Comments (count)', () => <SignalExample name="Comments" signal={<CommentsSignal>2</CommentsSignal>} />)
  .addStory('Unseen reply', () => <SignalExample name="Unseen reply" signal={<UnseenReplySignal />} />)
  .addStory('Unseen edit', () => <SignalExample name="Unseen edit" signal={<UnseenEditSignal />} />)
  .addStory('Emailed', () => <SignalExample name="Emailed" signal={<EmailedSignal />} />)
  .addStory('Record', () => <SignalExample name="Record" signal={<RecordSignal />} />)
  .addStory('Read-only', () => <SignalExample name="Read-only" signal={<ReadOnlySignal />} />)
  .addStory('Shared', () => <SignalExample name="Shared" signal={<SharedSignal />} />)
  .addStory('Follow', () => <SignalExample name="Save for later" signal={<FollowedSignal />} />)
  .addStory('NotFollow', () => <SignalExample name="Remove from saved" signal={<NotFollowedSignal />} />);
