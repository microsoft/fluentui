import {
  ComponentStyleFunctionParam,
  ThemeInput,
  ToolbarProps,
  ToolbarItemProps,
  ToolbarCustomItemProps,
  ToolbarDividerProps,
  StatusProps,
  pxToRem,
} from '@fluentui/react-northstar';

export type CustomStatusVariables = {
  isRecordingIndicator?: boolean;

  recordingIndicatorBorderColor?: string;
  recordingIndicatorBorderStyle?: string;
  recordingIndicatorBorderWidth?: string;
};

export type CustomToolbarVariables = {
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

export const darkThemeOverrides: ThemeInput = {
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
