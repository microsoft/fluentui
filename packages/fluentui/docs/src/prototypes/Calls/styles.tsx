const themeOverrides = {
  componentStyles: {
    Button: {
      root: ({ variables: v, theme: { siteVariables } }) => ({
        ...(v.isAddButton && {
          margin: '0rem',
        }),
        ...(v.isCall && {
          margin: '1rem 0rem',
        }),
        ...(v.isCallPark && {
          margin: '1rem auto',
          maxWidth: '10rem',
        }),
      }),
    },
    Flex: {
      root: ({ variables: v, theme: { siteVariables } }) => ({
        ...(v.isSpeedDial && {
          width: 'calc(20% - 0.7rem)',
          paddingLeft: '0.7rem',
        }),
        ...(v.isSuggestions && {
          width: 'calc(27% - 0.7rem)',
          paddingRight: '0.7rem',
          borderRight: `.1rem solid ${siteVariables.colorScheme.brand.borderActive}`,
        }),
        ...(v.isHistory && {
          width: '53%',
          borderRight: `.1rem solid ${siteVariables.colorScheme.brand.borderActive}`,
        }),
        ...(v.isSearch && {
          marginBottom: '1.5rem',
        }),
        ...(v.isHistoryHeaderContainer && {
          marginTop: '1rem',
          padding: '0rem 1rem',
        }),
      }),
    },
    ListItem: {
      root: {
        padding: '0.5rem',
      },
    },
    Header: {
      root: ({ variables: v }) => ({
        margin: '0.3rem 0.2rem',
        fontSize: '0.95rem',
        ...(v.isHistoryHeader && {
          margin: '0.5rem',
        }),
      }),
    },
    TableCell: {
      root: ({ variables: v }) => ({
        ...(v.isHistoryAvatar && {
          maxWidth: '3rem',
        }),
        ...(v.isHistoryLength && {
          maxWidth: '5rem',
        }),
        ...(v.isHistoryDate && {
          maxWidth: '10rem',
        }),
      }),
    },
    Text: {
      root: ({ variables: v }) => ({
        ...(v.isNameText && {
          marginLeft: '0.7rem',
        }),
        ...(v.isWorkNumber && {
          fontSize: '0.9rem',
          marginBottom: '1rem',
          textAlign: 'center',
        }),
      }),
    },
    Menu: {
      root: ({ variables: v }) => ({
        ...(v.isHistroyFilter && {
          alignItems: 'center',
          background: 'transparent',
          border: '0',
          margin: '0rem',
          padding: '0rem',
        }),
      }),
    },
    MenuItemWrapper: {
      root: {
        ':hover': {
          background: 'transparent',
        },
      },
    },
    MenuItem: {
      root: ({ variables: v }) => ({
        ...(v.isHistoryMenuItem && {
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0',
          boxShadow: 'none',
          margin: '0rem',
          padding: '0.3rem 0rem',
        }),
      }),
    },
    Table: {
      root: {
        margin: '1rem',
      },
    },
    Label: {
      root: ({ variables: v, theme: { siteVariables } }) => ({
        ...(v.isHistoryStatus && {
          fontSize: '0.8rem',
          backgroundColor: siteVariables.colorScheme.brand.border,
          borderRadius: '0rem',
          fontWeight: '700',
          padding: '0.5rem',
        }),
        ...(v.isHistoryFilterLabel && {
          fontSize: '0.9rem',
          backgroundColor: siteVariables.colorScheme.brand.backgroundDisabled,
          border: `.1rem solid transparent`,
          padding: `0.6rem`,
          ':hover': {
            backgroundColor: siteVariables.colorScheme.brand.foregroundDisabled,
            cursor: 'pointer',
          },
          ':focus': {
            cursor: 'pointer',
          },
        }),
        ...(v.isSelected && {
          backgroundColor: siteVariables.colorScheme.brand.border1,
          border: `.1rem solid ${siteVariables.colorScheme.brand.foregroundFocus1}`,
          color: siteVariables.colorScheme.brand.foregroundFocus1,
          padding: `0.6rem`,
          ':hover': {
            backgroundColor: siteVariables.colorScheme.brand.border1,
            cursor: 'pointer',
          },
        }),
      }),
    },
  },
};
export default themeOverrides;
