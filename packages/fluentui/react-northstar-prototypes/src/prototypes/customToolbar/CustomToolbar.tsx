import * as _ from 'lodash';
import * as React from 'react';
import {
  Button,
  Text,
  Toolbar,
  ToolbarItemProps,
  Status,
  ShorthandValue,
  ToolbarProps,
} from '@fluentui/react-northstar';
import {
  CallControlCloseTrayIcon,
  CallControlPresentNewIcon,
  CallEndIcon,
  CallVideoIcon,
  CallVideoOffIcon,
  ChatIcon,
  ChevronDownIcon,
  MicIcon,
  MicOffIcon,
  MoreIcon,
  ParticipantAddIcon,
} from '@fluentui/react-icons-northstar';

const tooltips = {
  videoOn: 'Turn camera off',
  videoOff: 'Turn camera on',
  micOn: 'Mute',
  micOff: 'Unmute',
  share: 'Share',
  shareStop: 'Stop sharing',
  endCall: 'Hang up',
  moreActions: 'More actions',
  chat: 'Show conversation',
  addParticipants: 'Add participants',
  pptNext: 'Navigate forward',
  pptPrevious: 'Navigate back',
};

export interface CustomToolbarProps {
  layout?: 'standard' | 'desktop-share' | 'powerpoint-presenter';

  isRecording?: boolean;

  cameraActive?: boolean;
  onCameraChange?: (state: boolean) => void;

  micActive?: boolean;
  onMicChange?: (state: boolean) => void;

  screenShareActive?: boolean;
  onScreenShareChange?: (state: boolean) => void;

  sidebarSelected: false | 'chat' | 'participant-add';
  onSidebarChange?: (state: false | 'chat' | 'participant-add') => void;

  chatHasNotification?: boolean;

  pptSlide?: string;
  onPptPrevClick?: () => void;
  onPptNextClick?: () => void;

  onEndCallClick?: () => void;
}

type CustomToolbarLayout = (props: CustomToolbarProps) => ToolbarProps['items'];

const commonLayout: CustomToolbarLayout = props =>
  [
    props.isRecording && {
      key: 'recording',
      kind: 'custom' as const,
      focusable: true,
      content: <Status state="error" title="Recording" variables={{ isRecordingIndicator: true }} />,
      variables: { isCtItemPrimary: true, isCtItemIndicator: true },
    },
    {
      key: 'timer-custom',
      kind: 'custom' as const,
      focusable: true,
      content: <Text>10:45</Text>,
      variables: { isCtItemPrimary: true, isCtItemIndicator: true },
    },
    { key: 'timer-divider', kind: 'divider' as const },
    {
      title: props.cameraActive ? tooltips.videoOn : tooltips.videoOff,
      active: props.cameraActive,
      icon: props.cameraActive ? <CallVideoIcon size="large" /> : <CallVideoOffIcon size="large" />,
      key: 'camera',
      onClick: () => _.invoke(props, 'onCameraChange', !props.cameraActive),
      variables: { isCtItemPrimary: true },
    },
    {
      title: props.micActive ? tooltips.micOn : tooltips.micOff,
      active: props.micActive,
      icon: props.micActive ? <MicIcon size="large" /> : <MicOffIcon size="large" />,
      key: 'mic',
      onClick: () => _.invoke(props, 'onMicChange', !props.micActive),
      variables: { isCtItemPrimary: true },
    },
    {
      title: props.screenShareActive ? tooltips.shareStop : tooltips.share,
      active: props.screenShareActive,
      icon: props.screenShareActive ? (
        <CallControlCloseTrayIcon size="large" />
      ) : (
        <CallControlPresentNewIcon size="large" />
      ),
      key: 'screen-share',
      onClick: () => _.invoke(props, 'onScreenShareChange', !props.screenShareActive),
      variables: { isCtItemPrimary: true },
    },
    {
      title: tooltips.moreActions,
      key: 'more',
      icon: <MoreIcon size="large" />,
      onClick: () => _.invoke(props, 'onMoreClick'),
      variables: { isCtItemPrimary: true },
    },
  ].filter(Boolean);

const sidebarButtons: CustomToolbarLayout = props => [
  {
    title: tooltips.chat,
    active: props.sidebarSelected === 'chat',
    icon: <ChatIcon outline size="large" />,
    key: 'chat',
    onClick: () => _.invoke(props, 'onSidebarChange', props.sidebarSelected === 'chat' ? false : 'chat'),
    variables: { isCtItemWithNotification: props.chatHasNotification, isCtItemIconNoFill: true },
  },
  {
    title: tooltips.addParticipants,
    active: props.sidebarSelected === 'participant-add',
    icon: <ParticipantAddIcon outline size="large" />,
    key: 'participant-add',
    onClick: () =>
      _.invoke(props, 'onSidebarChange', props.sidebarSelected === 'participant-add' ? false : 'participant-add'),
    variables: { isCtItemIconNoFill: true },
  },
];

const layoutItems: ShorthandValue<ToolbarItemProps> = {
  endCall: props => ({
    title: tooltips.endCall,
    key: 'end-call',
    icon: <CallEndIcon size="large" />,
    onClick: () => _.invoke(props, 'onEndCallClick'),
    variables: { isCtItemDanger: true },
  }),
};

const layouts: Record<CustomToolbarProps['layout'], CustomToolbarLayout> = {
  standard: props => [...commonLayout(props), ...sidebarButtons(props), layoutItems.endCall(props)],

  'desktop-share': props => [
    ...commonLayout(props),
    ...sidebarButtons(props),
    { key: 'divider-sidebar', kind: 'divider' },
    {
      key: 'stop-sharing',
      kind: 'custom',
      content: <Button content="Stop Sharing" />,
    },

    layoutItems.endCall(props),
  ],

  'powerpoint-presenter': props => [
    ...commonLayout(props),
    ...sidebarButtons(props),
    { key: 'divider-sidebar', kind: 'divider' },

    {
      title: tooltips.shareStop,
      key: 'stop-sharing',
      icon: <CallControlPresentNewIcon size="large" />,
      onClick: () => _.invoke(props, 'onStopSharingClick'),
    },

    {
      'aria-label': `${props.pptSlide} ${tooltips.pptPrevious}`,
      title: tooltips.pptPrevious,
      key: 'ppt-prev',
      icon: <ChevronDownIcon rotate={90} outline />,
      onClick: () => _.invoke(props, 'onPptPrevClick'),
    },

    {
      key: 'ppt-slide-number',
      kind: 'custom',
      fitted: true,
      content: <Text size="small">{props.pptSlide}</Text>,
    },

    {
      'aria-label': `${props.pptSlide} ${tooltips.pptNext}`,
      title: tooltips.pptNext,
      key: 'ppt-next',
      icon: <ChevronDownIcon rotate={-90} outline />,
      onClick: () => _.invoke(props, 'onPptNextClick'),
    },

    layoutItems.endCall(props),
  ],
};

const CustomToolbar: React.FunctionComponent<CustomToolbarProps> = props => {
  const { layout = 'standard' } = props;

  return <Toolbar variables={{ isCt: true }} items={layouts[layout](props)} />;
};

export default CustomToolbar;
