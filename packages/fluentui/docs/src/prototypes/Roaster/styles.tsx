import talking from './animations';
const themeOverrides = {
  componentStyles: {
    Flex: {
      root: ({ variables: v }) => ({
        ...(v.isContainer && {
          maxWidth: '310px',
        }),
      }),
    },
    Button: {
      root: ({ variables: v }) => ({
        ...(v.vAlignCenter && {
          marginTop: 'auto',
          marginBottom: 'auto',
        }),
      }),
    },
    Tree: {
      root: {
        marginTop: '20px',
      },
    },
  },
  animations: {
    talking,
  },
};
export default themeOverrides;
