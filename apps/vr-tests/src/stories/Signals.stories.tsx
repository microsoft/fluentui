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

const SignalExample: React.StatelessComponent<ISignalExampleProps> = (
  props: ISignalExampleProps
): JSX.Element => {
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
  .addDecorator(story => (
    <Screener steps={new Screener.Steps().snapshot('default', { cropTo: '.testWrapper' }).end()}>
      {story()}
    </Screener>
  ))
  .add('You checked out', () => (
    <SignalExample name="You checked out" signal={<YouCheckedOutSignal />} />
  ))
  .add('Malware detected', () => (
    <SignalExample name="Malware detected" signal={<MalwareDetectedSignal />} />
  ))
  .add('Blocked', () => <SignalExample name="Blocked" signal={<BlockedSignal />} />)
  .add('Missing metadata', () => (
    <SignalExample name="Missing metadata" signal={<MissingMetadataSignal />} />
  ))
  .add('Warning', () => <SignalExample name="Warning" signal={<WarningSignal />} />)
  .add('Awaiting approval', () => (
    <SignalExample name="Awaiting approval" signal={<AwaitingApprovalSignal />} />
  ))
  .add('Trending', () => <SignalExample name="Trending" signal={<TrendingSignal />} />)
  .add('Someone checked out', () => (
    <SignalExample name="Someone checked out" signal={<SomeoneCheckedOutSignal />} />
  ))
  .add('New', () => <SignalExample name="New" signal={<NewSignal />} />)
  .add('New (positioning)', () => <SignalExample name="O" signal={<NewSignal />} />)
  .add('Mention', () => <SignalExample name="Mention" signal={<MentionSignal />} />)
  .add('Comments', () => <SignalExample name="Comments" signal={<CommentsSignal />} />)
  .add('Comments (count)', () => (
    <SignalExample name="Comments" signal={<CommentsSignal>2</CommentsSignal>} />
  ))
  .add('Unseen reply', () => <SignalExample name="Unseen reply" signal={<UnseenReplySignal />} />)
  .add('Unseen edit', () => <SignalExample name="Unseen edit" signal={<UnseenEditSignal />} />)
  .add('Emailed', () => <SignalExample name="Emailed" signal={<EmailedSignal />} />)
  .add('Record', () => <SignalExample name="Record" signal={<RecordSignal />} />)
  .add('Read-only', () => <SignalExample name="Read-only" signal={<ReadOnlySignal />} />)
  .add('Shared', () => <SignalExample name="Shared" signal={<SharedSignal />} />)
  .add('Follow', () => <SignalExample name="Save for later" signal={<FollowedSignal />} />)
  .add('NotFollow', () => (
    <SignalExample name="Remove from saved" signal={<NotFollowedSignal />} />
  ));
