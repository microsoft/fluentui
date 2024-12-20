import { makeStyles, mergeClasses } from '@griffel/react';
import { ResponsiveContainerProps, ResponsiveContainerStyles } from './ResponsiveContainer.types';

export const responsiveContainerClassNames: ResponsiveContainerStyles = {
  root: 'fui-charts-resp__root',
};

const useStyles = makeStyles({
  root: {
    width: '100%',
    height: '100%',

    '& [class*="chartWrapper"]': {
      width: '100%', // optional
      // To prevent chart height from collapsing while resizing
      height: '100%', // optional
    },

    '& svg': {
      // This overrides the pixel width and height of svg allowing it to resize properly within flexbox
      width: '100%',
      height: '100%',
    },
  },
});

export const useResponsiveContainerStyles_unstable = (props: ResponsiveContainerProps): ResponsiveContainerStyles => {
  const baseStyles = useStyles();

  return {
    root: mergeClasses(responsiveContainerClassNames.root, baseStyles.root),
  };
};
