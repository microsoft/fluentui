import * as React from 'react';
import { Icon } from '@fluentui/react/lib/Icon';
import { css } from '@fluentui/react/lib/Utilities';
import { Signal } from './Signal';
import * as SignalsStyles from './Signals.scss';
import * as SignalStyles from './Signal.scss';
import { getRTL } from '../../Utilities';
import type { IIconProps } from '@fluentui/react/lib/Icon';
import type { ISignalProps } from './Signal';

export * from './Signal';
export * from './SignalField';

export const YouCheckedOutSignal: Signal = (props: ISignalProps): JSX.Element => {
  return <IconSignal {...props} signalClass={SignalsStyles.youCheckedOut} iconName="checkedoutbyyou12" />;
};

export const BlockedSignal: Signal = (props: ISignalProps): JSX.Element => {
  return <IconSignal {...props} signalClass={SignalsStyles.blocked} iconName="blocked12" />;
};

export const MissingMetadataSignal: Signal = (props: ISignalProps): JSX.Element => {
  return (
    <IconSignal
      {...props}
      signalClass={SignalsStyles.missingMetadata}
      iconName={getRTL() ? 'TagUnknown12Mirror' : 'TagUnknown12'}
    />
  );
};

export const WarningSignal: Signal = (props: ISignalProps): JSX.Element => {
  return <IconSignal {...props} signalClass={SignalsStyles.warning} iconName="warning12" />;
};

export const AwaitingApprovalSignal: Signal = (props: ISignalProps): JSX.Element => {
  return <IconSignal {...props} signalClass={SignalsStyles.awaitingApproval} iconName="clock" />;
};

export const TrendingSignal: Signal = (props: ISignalProps): JSX.Element => {
  return <IconSignal {...props} signalClass={SignalsStyles.trending} iconName="market" />;
};

export const SomeoneCheckedOutSignal: Signal = (props: ISignalProps): JSX.Element => {
  return <IconSignal {...props} signalClass={SignalsStyles.someoneCheckedOut} iconName="checkedoutbyother12" />;
};

export const RecordSignal: Signal = (props: ISignalProps): JSX.Element => {
  return <IconSignal {...props} signalClass={SignalsStyles.record} iconName="lock" />;
};

export const NeedsRepublishingSignal: Signal = (props: ISignalProps): JSX.Element => {
  return <IconSignal {...props} signalClass={SignalsStyles.needsRepublishing} iconName="readingmode" />;
};

export const ItemScheduledSignal: Signal = (props: ISignalProps): JSX.Element => {
  return <IconSignal {...props} signalClass={SignalsStyles.itemScheduled} iconName="datetime2" />;
};

/**
 * Renders a signal marking the proceeding content as new.
 */
export const NewSignal: Signal = (props: ISignalProps): JSX.Element => {
  const { ariaLabel, ...spanProps } = props;

  return (
    <span {...spanProps} className={css(SignalStyles.signal, SignalsStyles.newSignal)}>
      <Icon ariaLabel={props.ariaLabel} className={css(SignalsStyles.newIcon)} iconName="glimmer" />
    </span>
  );
};

/**
 * Renders a signal for a live-edit scenario.
 */
export const LiveEditSignal: Signal = (props: ISignalProps): JSX.Element => {
  const { className, ...spanProps } = props;

  return <Signal className={css(className, SignalsStyles.liveEdit)} {...spanProps} />;
};

export const MentionSignal: Signal = (props: ISignalProps): JSX.Element => {
  return <IconSignal {...props} signalClass={SignalsStyles.mention} iconName="accounts" />;
};

/**
 * Renders a signal for a number of comments.
 */
export const CommentsSignal: Signal = (props: ISignalProps): JSX.Element => {
  const { ariaLabel, className, children, ...spanProps } = props;

  return (
    <Signal className={css(SignalsStyles.comments, className)} {...spanProps}>
      <Icon ariaLabel={props.ariaLabel} className={css(SignalsStyles.commentsIcon)} iconName="MessageFill" />
      {children ? <span className={css(SignalsStyles.commentsCount)}>{children}</span> : null}
    </Signal>
  );
};

/**
 * Renders a signal for a number of comments.
 */
export const UnseenReplySignal: Signal = (props: ISignalProps): JSX.Element => {
  return <IconSignal {...props} signalClass={SignalsStyles.unseenReply} iconName="commentprevious" />;
};

export const UnseenEditSignal: Signal = (props: ISignalProps): JSX.Element => {
  return <IconSignal {...props} signalClass={SignalsStyles.unseenEdit} iconName="edit" />;
};

export const ReadOnlySignal: Signal = (props: ISignalProps): JSX.Element => {
  return <IconSignal {...props} signalClass={SignalsStyles.readOnly} iconName="uneditablesolid12" />;
};

export const EmailedSignal: Signal = (props: ISignalProps): JSX.Element => {
  return <IconSignal {...props} signalClass={SignalsStyles.emailed} iconName="mail" />;
};

export const SharedSignal: Signal = (props: ISignalProps): JSX.Element => {
  return <IconSignal {...props} signalClass={SignalsStyles.shared} iconName="people" />;
};

export const DesktopSignal: Signal = (props: ISignalProps): JSX.Element => {
  return <IconSignal {...props} signalClass={SignalsStyles.folder} iconName="TVMonitor" />;
};

export const DocumentsSignal: Signal = (props: ISignalProps): JSX.Element => {
  return <IconSignal {...props} signalClass={SignalsStyles.folder} iconName="Page" />;
};

export const PicturesSignal: Signal = (props: ISignalProps): JSX.Element => {
  return <IconSignal {...props} signalClass={SignalsStyles.folder} iconName="Photo2" />;
};

export const MalwareDetectedSignal: Signal = (props: ISignalProps): JSX.Element => {
  return <IconSignal {...props} signalClass={SignalsStyles.malwareDetected} iconName="BlockedSiteSolid12" />;
};

export const ATPSignal: Signal = MalwareDetectedSignal; // TODO Delete on next major version.

/**
 * Renders a signal for an external item.
 */
export const ExternalSignal: Signal = (props: ISignalProps): JSX.Element => {
  return <IconSignal {...props} signalClass={SignalsStyles.external} iconName="Globe" />;
};

export const NotFollowedSignal: Signal = (props: ISignalProps): JSX.Element => {
  return <IconSignal {...props} signalClass={SignalsStyles.bookmarkOutline} iconName="SingleBookmark" />;
};

export const FollowedSignal: Signal = (props: ISignalProps): JSX.Element => {
  return <IconSignal {...props} signalClass={SignalsStyles.bookmarkFilled} iconName="SingleBookmarkSolid" />;
};

type IIconSignalProps = ISignalProps &
  Pick<IIconProps, 'iconName'> & {
    /**
     * The class name to use for the Signal type.
     */
    signalClass: string;
  };

/**
 * Renders a signal as just an Icon. This is the simplest Signal case.
 */
const IconSignal: React.FunctionComponent<IIconSignalProps> = props => {
  const { ariaLabel, className, signalClass, ...spanProps } = props;

  return (
    <Icon {...spanProps} ariaLabel={props.ariaLabel} className={css(SignalStyles.signal, signalClass, className)} />
  );
};
