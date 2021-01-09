import * as _ from 'lodash';
import * as React from 'react';
import {
  Button,
  Text,
  Toolbar,
  Status,
  ShorthandValue,
  ComponentStyleFunctionParam,
  ThemeInput,
  ToolbarProps,
  ToolbarItemProps,
  ToolbarCustomItemProps,
  ToolbarDividerProps,
  StatusProps,
  pxToRem,
  Provider,
  mergeThemes,
  Tooltip,
  tooltipAsLabelBehavior,
  teamsDarkTheme,
} from '@fluentui/react-northstar';
import {
  CallControlCloseTrayIcon,
  CallControlPresentNewIcon,
  CallControlStopPresentingNewIcon,
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

type CustomStatusVariables = {
  isRecordingIndicator?: boolean;

  recordingIndicatorBorderColor?: string;
  recordingIndicatorBorderStyle?: string;
  recordingIndicatorBorderWidth?: string;
};

type CustomToolbarVariables = {
  isCt?: boolean;

  isCtItemDanger?: boolean;
  isCtItemPrimary?: boolean;
  isCtItemIconNoFill?: boolean;
  isCtItemIndicator?: boolean;
  isCtItemWithNotification?: boolean;

  ctBorderRadius: string;
  ctBorderStyle: string;
  ctBorderWidth: string;
  ctHeight: string;

  ctItemBackground: string;
  ctItemBackgroundHover: string;
  ctItemBorderColorFocus: string;
  ctItemColor: string;
  ctItemColorFocus: string;
  ctItemColorHover: string;

  ctItemActiveColor: string;
  ctItemActiveBackground: string;
  ctItemActiveBackgroundOverlay: string;

  ctItemDangerBackground: string;
  ctItemDangerColorHover: string;
  ctItemDangerBackgroundHover: string;

  ctItemIndicatorPadding: string;

  ctItemNotificationBackgroundColor: string;
  ctItemNotificationSize: string;

  ctItemPrimaryBackground: string;
  ctItemPrimaryBackgroundHover: string;
  ctItemPrimaryColorHover: string;
};

const toolbarVariables = (siteVars): CustomToolbarVariables => ({
  ctBorderRadius: '4px',
  ctBorderStyle: 'solid',
  ctBorderWidth: '2px',
  ctHeight: '4rem',

  ctItemBackground: siteVars.colorScheme.default.background1,
  ctItemBackgroundHover: siteVars.colorScheme.brand.backgroundHover1,
  ctItemBorderColorFocus: siteVars.colorScheme.default.borderFocus,
  ctItemColor: siteVars.colorScheme.default.foreground,
  ctItemColorFocus: siteVars.colorScheme.default.foregroundFocus,
  ctItemColorHover: siteVars.colorScheme.default.foregroundHover,

  ctItemActiveBackground: siteVars.colorScheme.default.backgroundActive1,
  // FIXME: use variables for colors!
  ctItemActiveBackgroundOverlay:
    'linear-gradient(90deg,rgba(60,62,93,.6),rgba(60,62,93,0) 33%),linear-gradient(135deg,rgba(60,62,93,.6) 33%,rgba(60,62,93,0) 70%),linear-gradient(180deg,rgba(60,62,93,.6) 70%,rgba(60,62,93,0) 94%),linear-gradient(225deg,rgba(60,62,93,.6) 33%,rgba(60,62,93,0) 73%),linear-gradient(270deg,rgba(60,62,93,.6),rgba(60,62,93,0) 33%),linear-gradient(0deg,rgba(98,100,167,.75) 6%,rgba(98,100,167,0) 70%)',
  ctItemActiveColor: siteVars.colorScheme.default.foregroundActive1,

  ctItemDangerBackground: siteVars.colorScheme.red.background2,
  ctItemDangerBackgroundHover: siteVars.colorScheme.red.backgroundHover,
  ctItemDangerColorHover: siteVars.colorScheme.red.foregroundHover,

  ctItemIndicatorPadding: pxToRem(8),

  ctItemNotificationBackgroundColor: siteVars.colors.red[400],
  ctItemNotificationSize: pxToRem(8),

  ctItemPrimaryBackground: siteVars.colorScheme.default.background3,
  ctItemPrimaryBackgroundHover: siteVars.colorScheme.brand.backgroundHover1,
  ctItemPrimaryColorHover: siteVars.colorScheme.brand.foregroundHover1,
});

const darkThemeOverrides: ThemeInput = {
  componentVariables: {
    Status: (siteVars): CustomStatusVariables => ({
      recordingIndicatorBorderColor: siteVars.colors.white,
      recordingIndicatorBorderStyle: 'solid',
      recordingIndicatorBorderWidth: '2px',
    }),

    Toolbar: toolbarVariables,
    ToolbarCustomItem: toolbarVariables,
    ToolbarDivider: toolbarVariables,
    ToolbarItem: toolbarVariables,
  },
  componentStyles: {
    Status: {
      root: ({ variables: v }: ComponentStyleFunctionParam<StatusProps, CustomStatusVariables>) => ({
        ...(v.isRecordingIndicator && {
          boxSizing: 'content-box',
          borderColor: v.recordingIndicatorBorderColor,
          borderStyle: v.recordingIndicatorBorderStyle,
          borderWidth: v.recordingIndicatorBorderWidth,
        }),
      }),
    },
    Toolbar: {
      root: ({ variables: v }: ComponentStyleFunctionParam<ToolbarProps, CustomToolbarVariables>) => ({
        ...(v.isCt && {
          borderRadius: v.ctBorderRadius,
          height: v.ctHeight,
          overflow: 'hidden',
        }),
      }),
    },

    ToolbarCustomItem: {
      root: ({
        props: p,
        variables: v,
      }: ComponentStyleFunctionParam<ToolbarCustomItemProps, CustomToolbarVariables>) => ({
        ...(v.isCt && {
          background: v.ctItemBackground,
          borderStyle: v.ctBorderStyle,
          borderWidth: v.ctBorderWidth,
          height: v.ctHeight,

          ...(v.isCtItemPrimary && { background: v.ctItemPrimaryBackground }),
          ...(v.isCtItemIndicator && { padding: v.ctItemIndicatorPadding }),

          ':focus-visible': {
            background: v.ctItemBackgroundHover,
            borderColor: v.ctItemBorderColorFocus,
            color: v.ctItemColorFocus,
          },
        }),
      }),
    },

    ToolbarItem: {
      root: ({ props: p, variables: v }: ComponentStyleFunctionParam<ToolbarItemProps, CustomToolbarVariables>) => {
        return {
          ...(v.isCt && {
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'center',
            position: 'relative',

            background: v.ctItemBackground,
            borderStyle: v.ctBorderStyle,
            borderWidth: v.ctBorderWidth,
            borderRadius: 0,
            height: v.ctHeight,
            minWidth: v.ctHeight,
            color: v.ctItemColor,

            ...(p.active &&
              !v.isCtItemPrimary && {
                // active intentionally before primary and danger, only affects regular items
                color: v.ctItemActiveColor,
                background: v.ctItemActiveBackground,

                '::before': {
                  content: `''`,
                  position: 'absolute',
                  top: `-${v.ctBorderWidth}`,
                  left: `-${v.ctBorderWidth}`,
                  bottom: `-${v.ctBorderWidth}`,
                  right: `-${v.ctBorderWidth}`,
                  background: v.ctItemActiveBackgroundOverlay,

                  ':focus-visible': {
                    borderStyle: v.ctBorderStyle,
                    borderWidth: v.ctBorderWidth,
                    borderColor: v.ctItemBorderColorFocus,
                  },
                },
              }),

            ...(v.isCtItemDanger && {
              background: v.ctItemDangerBackground,
            }),

            ...(v.isCtItemPrimary && {
              background: v.ctItemPrimaryBackground,
            }),

            ':hover': {
              color: v.ctItemColorHover,
              background: v.ctItemBackgroundHover,

              ...(v.isCtItemDanger && {
                color: v.ctItemDangerColorHover,
                background: v.ctItemDangerBackgroundHover,
              }),

              ...(v.isCtItemPrimary && {
                color: v.ctItemPrimaryColorHover,
                background: v.ctItemPrimaryBackgroundHover,
              }),
            },

            ...(v.isCtItemWithNotification && {
              '::after': {
                content: `''`,
                position: 'absolute',
                width: v.ctItemNotificationSize,
                height: v.ctItemNotificationSize,
                borderRadius: '50%',
                background: v.ctItemNotificationBackgroundColor,
                transform: 'translateX(100%) translateY(-100%)',
              },
            }),

            ':focus-visible': {
              background: v.ctItemBackgroundHover,
              borderColor: v.ctItemBorderColorFocus,
              color: v.ctItemColorFocus,

              ...(v.isCtItemDanger && {
                color: v.ctItemDangerColorHover,
                background: v.ctItemDangerBackgroundHover,
              }),

              ...(v.isCtItemPrimary && {
                color: v.ctItemPrimaryColorHover,
                background: v.ctItemPrimaryBackgroundHover,
              }),
            },
          }),

          ...(v.isCtItemIconNoFill && {
            '& .ui-icon__filled': {
              display: 'none',
            },
            '& .ui-icon__outline': {
              display: 'block',
            },
            '&:hover .ui-icon__filled': {
              display: 'none',
            },
            '&:hover .ui-icon__outline': {
              display: 'block',
            },
          }),
        };
      },
    },

    ToolbarDivider: {
      root: ({ props: p, variables: v }: ComponentStyleFunctionParam<ToolbarDividerProps, CustomToolbarVariables>) => ({
        ...(v.isCt && {
          margin: 0,
        }),
      }),
    },
  },
};

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

interface CustomToolbarProps {
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
      tooltip: props.cameraActive ? tooltips.videoOn : tooltips.videoOff,
      active: props.cameraActive,
      icon: props.cameraActive ? <CallVideoIcon size="large" /> : <CallVideoOffIcon size="large" />,
      key: 'camera',
      onClick: () => _.invoke(props, 'onCameraChange', !props.cameraActive),
      variables: { isCtItemPrimary: true },
    },
    {
      tooltip: props.micActive ? tooltips.micOn : tooltips.micOff,
      active: props.micActive,
      icon: props.micActive ? <MicIcon size="large" /> : <MicOffIcon size="large" />,
      key: 'mic',
      onClick: () => _.invoke(props, 'onMicChange', !props.micActive),
      variables: { isCtItemPrimary: true },
    },
    {
      tooltip: props.screenShareActive ? tooltips.shareStop : tooltips.share,
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
      tooltip: tooltips.moreActions,
      key: 'more',
      icon: <MoreIcon size="large" />,
      onClick: () => _.invoke(props, 'onMoreClick'),
      variables: { isCtItemPrimary: true },
    },
  ].filter(Boolean);

const sidebarButtons: CustomToolbarLayout = props => [
  {
    tooltip: tooltips.chat,
    active: props.sidebarSelected === 'chat',
    icon: <ChatIcon outline size="large" />,
    key: 'chat',
    onClick: () => _.invoke(props, 'onSidebarChange', props.sidebarSelected === 'chat' ? false : 'chat'),
    variables: { isCtItemWithNotification: props.chatHasNotification, isCtItemIconNoFill: true },
  },
  {
    tooltip: tooltips.addParticipants,
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
    tooltip: tooltips.endCall,
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
      tooltip: tooltips.shareStop,
      key: 'stop-sharing',
      icon: <CallControlStopPresentingNewIcon size="large" />,
      onClick: () => _.invoke(props, 'onStopSharingClick'),
    },

    {
      'aria-label': `${props.pptSlide} ${tooltips.pptPrevious}`,
      tooltip: tooltips.pptPrevious,
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
      tooltip: tooltips.pptNext,
      key: 'ppt-next',
      icon: <ChevronDownIcon rotate={-90} outline />,
      onClick: () => _.invoke(props, 'onPptNextClick'),
    },

    layoutItems.endCall(props),
  ],
};

const CustomToolbar: React.FunctionComponent<CustomToolbarProps> = props => {
  const { layout = 'standard' } = props;

  const items = layouts[layout](props).map((item: ToolbarItemProps) => ({
    ...item,
    children: (item as any).tooltip
      ? (ToolbarItem, props) => {
          const { tooltip, key, ...rest } = props; // Adding tooltipAsLabelBehavior as the ToolbarItems contains only icon

          return (
            <Tooltip
              key={key}
              trigger={<ToolbarItem {...rest} />}
              accessibility={tooltipAsLabelBehavior}
              content={tooltip}
            />
          );
        }
      : null,
  }));

  return <Toolbar aria-label="Performance custom" variables={{ isCt: true }} items={items} />;
};

const CustomToolbarPrototype = () => {
  const theme = mergeThemes(teamsDarkTheme, darkThemeOverrides);

  return (
    <Provider theme={theme}>
      <CustomToolbar
        layout="standard"
        isRecording={true}
        cameraActive={true}
        micActive={true}
        screenShareActive={true}
        sidebarSelected={false}
        chatHasNotification={true}
        pptSlide={`${1} of ${2}`}
      />
    </Provider>
  );
};

CustomToolbarPrototype.iterations = 100;
CustomToolbarPrototype.filename = 'CustomToolbar.perf.tsx';

export default CustomToolbarPrototype;
