import talking from './animations';

const themeOverrides = {
  componentStyles: {
    Flex: {
      root: ({ variables: v }) => ({
        ...(v.isContainer && {
          maxWidth: '360px',
          overflow: 'hidden',
        }),
        ...(v.isRosterSearch && {
          margin: '0rem 1rem',
        }),
        ...(v.isCallingRosterSectionTitle && {
          marginTop: '0.5rem',
          marginBottom: '0.5rem',
          paddingRight: '1rem',
        }),
        ...(v.isRelative && {
          position: 'relative',
        }),
      }),
    },
    Button: {
      root: ({ variables: v, theme: { siteVariables } }) => ({
        ...(v.isCloseButton && {
          marginTop: 'auto',
          marginBottom: 'auto',
          marginRight: '1.5rem',
          ':focus': {
            color: siteVariables.colorScheme.brand.foregroundHover1,
          },
          ':hover': {
            color: siteVariables.colorScheme.brand.foregroundHover1,
          },
        }),
        ...(v.isSearchButton && {
          marginRight: '.5rem',
          marginLeft: '-.8rem',
          maxWidth: '3.2rem',
          minWidth: '3.2rem',
          padding: 0,
          ':focus': {
            color: siteVariables.colorScheme.brand.foregroundHover1,
          },
          ':hover': {
            color: siteVariables.colorScheme.brand.foregroundHover1,
          },
        }),
      }),
    },
    TreeItem: {
      root: ({ theme: { siteVariables } }) => ({
        marginLeft: '0.2rem',
        marginRight: '3.2rem',
        marginTop: '0.5rem',
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
    MenuItem: {
      root: ({ theme: { siteVariables } }) => ({
        ':hover': {
          color: siteVariables.colorScheme.brand.foregroundHover1,
          background: siteVariables.colorScheme.brand.borderDisabled,
        },
      }),
    },
    Text: {
      root: ({ variables: v, theme: { siteVariables } }) => ({
        color: siteVariables.colorScheme.brand.foreground4,
        ...(v.isRoleText && {
          color: siteVariables.colorScheme.brand.border,
          fontSize: '0.75rem',
        }),
        ...(v.isNameText && {
          fontSize: '0.9rem',
        }),
      }),
    },
    Avatar: {
      root: ({ theme: { siteVariables } }) => ({
        borderRadius: '50%',
        boxShadow: `0 0 0 0.2rem ${siteVariables.colorScheme.brand.background2}`,
      }),
    },
    MenuButton: {
      root: ({ theme: { siteVariables } }) => ({
        color: siteVariables.colorScheme.brand.border,
        marginTop: 'auto',
        marginBottom: 'auto',
        ':focus': {
          color: siteVariables.colorScheme.brand.foregroundHover1,
        },
        ':hover': {
          color: siteVariables.colorScheme.brand.foregroundHover1,
        },
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
        paddingLeft: '0rem',
        paddingRight: '0rem',
      },
    },
    Input: {
      root: {
        padding: '0.1rem 0.2rem',
        fontSize: '1.1rem',
      },
    },
  },
  animations: {
    talking,
  },
};
export default themeOverrides;
