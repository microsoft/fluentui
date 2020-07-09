import talking from './animations';

const themeOverrides = {
  componentStyles: {
    Flex: {
      root: ({ variables: v }) => ({
        ...(v.isContainer && {
          maxWidth: '360px',
        }),
        ...(v.isRosterSearch && {
          margin: '0rem 1rem',
        }),
        ...(v.isCallingRosterSectionTitle && {
          marginTop: '0.5rem',
          marginBottom: '0.5rem',
          paddingRight: '1rem',
        }),
      }),
    },
    Button: {
      root: ({ variables: v }) => ({
        ...(v.vAlignCenter && {
          marginTop: 'auto',
          marginBottom: 'auto',
        }),
        ...(v.isRosterButtonOutside && {
          marginRight: '.5rem',
          marginLeft: '-.8rem',
          maxWidth: '3.2rem',
          minWidth: '3.2rem',
          padding: 0,
          ':hover': {
            boxShadow: 'none',
          },
        }),
      }),
    },
    ListItem: {
      root: ({ theme: { siteVariables } }) => ({
        marginLeft: '0rem',
        marginRight: '1.5rem',
        padding: '0.2rem 0.3rem',
        ':hover': {
          background: siteVariables.colorScheme.brand.background4,
        },
      }),
    },
    Header: {
      root: ({ theme: { siteVariables } }) => ({
        color: siteVariables.colorScheme.brand.foreground4,
        maxWidth: '57rem',
        lineHeight: '3rem',
        marginLeft: '1.2rem',
        overflow: 'hidden',
        textAlign: 'center',
        display: '-webkit-box',
        WebkitBoxOrient: 'vertical',
        WebkitLineClamp: '2',
      }),
    },
    Menu: {
      root: ({ theme: { siteVariables } }) => ({
        background: siteVariables.colorScheme.brand.borderDisabled,
        maxWidth: '24.6rem',
        maxHeight: '30rem',
        border: '1px solid',
        marginRight: '-1.4rem',
        marginLeft: '-1.4rem',
        marginTop: '-.5rem',
        borderRadius: '0rem',
        padding: '0',
        borderColor: siteVariables.colorScheme.brand.border,
      }),
    },
    Text: {
      root: ({ variables: v, theme: { siteVariables } }) => ({
        color: siteVariables.colorScheme.brand.foreground4,
        ...(v.isRoleText && {
          color: siteVariables.colorScheme.brand.border,
        }),
      }),
    },
    MenuButton: {
      root: ({ theme: { siteVariables } }) => ({
        color: siteVariables.colorScheme.brand.border,
        marginTop: 'auto',
        marginBottom: 'auto',
      }),
    },
    FlexItem: {
      root: ({ theme: { siteVariables } }) => ({
        color: siteVariables.colorScheme.brand.border,
        marginTop: 'auto',
        marginBottom: 'auto',
      }),
    },
    Tree: {
      root: {
        marginTop: '2rem',
        marginLeft: '1rem',
      },
    },
  },
  animations: {
    talking,
  },
};
export default themeOverrides;
