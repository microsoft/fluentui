import * as React from 'react';
import {
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
  LiveEditSignal,
  MentionSignal,
  CommentsSignal,
  UnseenReplySignal,
  UnseenEditSignal,
  ReadOnlySignal,
  SharedSignal,
  EmailedSignal,
  RecordSignal,
  NeedsRepublishingSignal,
  ItemScheduledSignal,
  DesktopSignal,
  DocumentsSignal,
  PicturesSignal,
} from '@fluentui/react-experiments';
import { Checkbox, ChoiceGroup, IChoiceGroupOption, css } from '@fluentui/react';
import { lorem } from '@fluentui/example-data';
import * as SignalStylesModule from '@fluentui/react-experiments/lib/components/signals/Signal.scss';
import * as SignalsExampleStylesModule from './Signals.Example.scss';

const SignalStyles: any = SignalStylesModule;
const SignalsExampleStyles: any = SignalsExampleStylesModule;

interface ISignalExampleProps {
  name: string;
  signal: React.ReactNode;
  text?: string;
}

const SignalExample: React.FunctionComponent<ISignalExampleProps> = (props: ISignalExampleProps): JSX.Element => {
  const { text = lorem(4) } = props;

  return (
    <div>
      <h3>{props.name}</h3>
      <SignalField before={props.signal}>{text}</SignalField>
    </div>
  );
};

export interface ISignalsBasicExampleState {
  fontSize: 'small' | 'medium' | 'large';
  isDark: boolean;
}

export class SignalsBasicExample extends React.Component<{}, ISignalsBasicExampleState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      fontSize: 'small',
      isDark: false,
    };
  }

  public render(): JSX.Element | null {
    const { fontSize, isDark } = this.state;

    return (
      <div>
        <p>
          <ChoiceGroup
            label="Font size"
            defaultSelectedKey={fontSize}
            onChange={this._onFontSizeChoiceChanged}
            options={[
              { key: 'small', text: 'Small' },
              { key: 'medium', text: 'Medium' },
              { key: 'large', text: 'Large' },
            ]}
          />
        </p>
        <p>
          <Checkbox label="Dark?" defaultChecked={isDark} onChange={this._onIsDarkChanged} />
        </p>
        <div
          className={css(SignalsExampleStyles.example, {
            [SignalsExampleStyles.small]: fontSize === 'small',
            [SignalsExampleStyles.medium]: fontSize === 'medium',
            [SignalsExampleStyles.large]: fontSize === 'large',
            [`${SignalsExampleStyles.dark} ${SignalStyles.dark}`]: isDark,
          })}
        >
          <SignalExample name="You checked out" signal={<YouCheckedOutSignal />} />
          <SignalExample name="Malware detected" signal={<MalwareDetectedSignal />} />
          <SignalExample name="Blocked" signal={<BlockedSignal />} />
          <SignalExample name="Missing metadata" signal={<MissingMetadataSignal />} />
          <SignalExample name="Warning" signal={<WarningSignal />} />
          <SignalExample name="Awaiting approval" signal={<AwaitingApprovalSignal />} />
          <SignalExample name="Trending" signal={<TrendingSignal />} />
          <SignalExample name="Someone checked out" signal={<SomeoneCheckedOutSignal />} />
          <SignalExample name="New" signal={<NewSignal />} />
          <SignalExample name="New (positioning)" signal={<NewSignal />} text="O" />
          <SignalExample name="Live edit" signal={<LiveEditSignal />} />
          <SignalExample name="Mention" signal={<MentionSignal />} />
          <SignalExample name="Comments" signal={<CommentsSignal />} />
          <SignalExample name="Comments (count)" signal={<CommentsSignal>2</CommentsSignal>} />
          <SignalExample name="Unseen reply" signal={<UnseenReplySignal />} />
          <SignalExample name="Unseen edit" signal={<UnseenEditSignal />} />
          <SignalExample name="Emailed" signal={<EmailedSignal />} />
          <SignalExample name="Record" signal={<RecordSignal />} />
          <SignalExample name="Read-only" signal={<ReadOnlySignal />} />
          <SignalExample name="Shared" signal={<SharedSignal />} />
          <SignalExample name="Needs Republishing" signal={<NeedsRepublishingSignal />} />
          <SignalExample name="Page Scheduled" signal={<ItemScheduledSignal />} />
          <SignalExample name="Special Folder (Desktop)" signal={<DesktopSignal />} />
          <SignalExample name="Special Folder (Documents)" signal={<DocumentsSignal />} />
          <SignalExample name="Special Folder (Pictures)" signal={<PicturesSignal />} />
        </div>
      </div>
    );
  }

  private _onFontSizeChoiceChanged = (ev: any, option?: IChoiceGroupOption): void => {
    this.setState({
      fontSize: option?.key as ISignalsBasicExampleState['fontSize'],
    });
  };

  private _onIsDarkChanged = (ev: React.FormEvent<HTMLElement>, checked: boolean): void => {
    this.setState({
      isDark: checked,
    });
  };
}
