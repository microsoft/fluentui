
import * as React from 'react';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { css } from 'office-ui-fabric-react/lib/Utilities';
import { Signal, ISignalProps } from './Signal';
import * as SignalsStylesModule from './Signals.scss';
import * as SignalStylesModule from './Signal.scss';

// tslint:disable-next-line:no-any
const SignalsStyles = SignalsStylesModule as any;
// tslint:disable-next-line:no-any
const SignalStyles = SignalStylesModule as any;

export * from './Signal';
export * from './SignalField';

export const YouCheckedOutSignal: Signal = (props: ISignalProps): JSX.Element => {
  return (
    <Icon
      ariaLabel={ props.ariaLabel }
      className={ css(SignalStyles.signal, SignalsStyles.youCheckedOutl) }
      iconName=''
    /> // TODO get correct icon
  );
};

export const BlockedSignal: Signal = (props: ISignalProps): JSX.Element => {
  return (
    <Icon
      ariaLabel={ props.ariaLabel }
      className={ css(SignalStyles.signal, SignalsStyles.blocked) }
      iconName='blocked2'
    />
  );
};

export const MissingMetadataSignal: Signal = (props: ISignalProps): JSX.Element => {
  return (
    <Icon
      ariaLabel={ props.ariaLabel }
      className={ css(SignalStyles.signal, SignalsStyles.missingMetadata) }
      iconName='info'
    />
  );
};

export const WarningSignal: Signal = (props: ISignalProps): JSX.Element => {
  return (
    <Icon
      ariaLabel={ props.ariaLabel }
      className={ css(SignalStyles.signal, SignalsStyles.warning) }
      iconName='warning'
    />
  );
};

export const AwaitingApprovalSignal: Signal = (props: ISignalProps): JSX.Element => {
  return (
    <Icon
      ariaLabel={ props.ariaLabel }
      className={ css(SignalStyles.signal, SignalsStyles.awaitingApproval) }
      iconName='documentmanagement'
    /> // TODO get correct icon
  );
};

export const TrendingSignal: Signal = (props: ISignalProps): JSX.Element => {
  return (
    <Icon
      ariaLabel={ props.ariaLabel }
      className={ css(SignalStyles.signal, SignalsStyles.trending) }
      iconName='market'
    />
  );
};

export const SomeoneCheckedOutSignal: Signal = (props: ISignalProps): JSX.Element => {
  return (
    <Icon
      ariaLabel={ props.ariaLabel }
      className={ css(SignalStyles.signal, SignalsStyles.someoneCheckedOut) }
      iconName='navigateforward'
    /> // TODO get correct icon
  );
};

/**
 * Renders a signal marking the proceeding content as new.
 */
export const NewSignal: Signal = (props: ISignalProps): JSX.Element => {
  const {
    ariaLabel,
    ...spanProps
  } = props;

  return (
    <span
      { ...spanProps }
      className={ css(SignalStyles.signal, SignalsStyles.newSignal) }
    >
      <Icon
        ariaLabel={ props.ariaLabel }
        className={ css(SignalsStyles.newIcon) }
        iconName='glimmer'
      />
    </span>
  );
};

/**
 * Renders a signal for a live-edit scenario.
 */
export const LiveEditSignal: Signal = (props: ISignalProps): JSX.Element => {
  const {
    className,
    ...spanProps
  } = props;

  return (
    <Signal
      className={ css(className, SignalsStyles.liveEdit) }
      { ...spanProps }
    />
  );
};

export const MentionSignal: Signal = (props: ISignalProps): JSX.Element => {
  return (
    <Icon
      ariaLabel={ props.ariaLabel }
      className={ css(SignalStyles.signal, SignalsStyles.mention) }
      iconName='accounts'
    />
  );
};

/**
 * Renders a signal for a number of comments.
 */
export const CommentsSignal: Signal = (props: ISignalProps): JSX.Element => {
  const {
    ariaLabel,
    className,
    children,
    ...spanProps
  } = props;

  return (
    <Signal
      className={ css(SignalsStyles.comments, className) }
      { ...spanProps }
    >
      <Icon
        ariaLabel={ props.ariaLabel }
        className={ css(SignalsStyles.commentsIcon) }
        iconName='MessageFill'
      />
      {
        children ? (
          <span className={ css(SignalsStyles.commentsCount) }>
            { children }
          </span>
        ) : null
      }
    </Signal>
  );
};

export const UnseenEditSignal: Signal = (props: ISignalProps): JSX.Element => {
  return (
    <Icon
      ariaLabel={ props.ariaLabel }
      className={ css(SignalStyles.signal, SignalsStyles.unseenEdit) }
      iconName='edit'
    /> // TODO get correct icon
  );
};

export const ReadOnlySignal: Signal = (props: ISignalProps): JSX.Element => {
  return (
    <Icon
      ariaLabel={ props.ariaLabel }
      className={ css(SignalStyles.signal, SignalsStyles.readOnly) }
      iconName=''
    /> // TODO get correct icon
  );
};

export const SharedSignal: Signal = (props: ISignalProps): JSX.Element => {
  return (
    <Icon
      ariaLabel={ props.ariaLabel }
      className={ css(SignalStyles.signal, SignalsStyles.shared) }
      iconName='people'
    />
  );
};

export const MalwareDetectedSignal: Signal = (props: ISignalProps): JSX.Element => {
  return (
    <Icon
      ariaLabel={ props.ariaLabel }
      className={ css(SignalStyles.signal, SignalsStyles.malwareDetected) }
      iconName='ATPLogo'
    />
  );
};

export const ATPSignal: Signal = MalwareDetectedSignal; // TODO Delete on next major version.

/**
 * Renders a signal for an external item.
 */
export const ExternalSignal: Signal = (props: ISignalProps): JSX.Element => {
  const {
    ariaLabel,
    ...spanProps
  } = props;

  return (
    <span
      { ...spanProps }
      className={ css(SignalStyles.signal, SignalStyles.centeredSignal) }
    >
      <Icon
        ariaLabel={ props.ariaLabel }
        className={ css(SignalStyles.signal, SignalStyles.external) }
        iconName='Globe'
      />
    </span>
  );
};
