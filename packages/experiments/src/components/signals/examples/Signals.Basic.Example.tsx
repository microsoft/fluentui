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
  NeedsRepublishingSignal
} from '@uifabric/experiments';
import { Checkbox, ChoiceGroup, IChoiceGroupOption, css } from 'office-ui-fabric-react';
import { lorem } from '@uifabric/example-data';
import * as SignalStylesModule from '../Signal.scss';
import * as SignalsExampleStylesModule from './Signals.Example.scss';

// tslint:disable-next-line:no-any
const SignalStyles: any = SignalStylesModule;
// tslint:disable-next-line:no-any
const SignalsExampleStyles: any = SignalsExampleStylesModule;

interface ISignalExampleProps {
  name: string;
  signal: React.ReactNode;
  text?: string;
}

const SignalExample: React.StatelessComponent<ISignalExampleProps> = (props: ISignalExampleProps): JSX.Element => {
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
      isDark: false
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
            onChanged={this._onFontSizeChoiceChanged}
            options={[
              {
                key: 'small',
                text: 'Small'
              },
              {
                key: 'medium',
                text: 'Medium'
              },
              {
                key: 'large',
                text: 'Large'
              }
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
            [`${SignalsExampleStyles.dark} ${SignalStyles.dark}`]: isDark
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
        </div>
      </div>
    );
  }

  private _onFontSizeChoiceChanged = (option: IChoiceGroupOption): void => {
    this.setState({
      fontSize: option.key as ISignalsBasicExampleState['fontSize']
    });
  };

  private _onIsDarkChanged = (ev: React.FormEvent<HTMLElement>, checked: boolean): void => {
    this.setState({
      isDark: checked
    });
  };
}
