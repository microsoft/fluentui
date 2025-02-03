import { IResponsiveContainerStyles } from './ResponsiveContainer.types';

export const getStyles = (): IResponsiveContainerStyles => {
  return {
    root: {
      width: '100%',
      height: '100%',

      '& [class^="chartWrapper"]': {
        width: '100%', // optional
        // To prevent chart height from collapsing while resizing
        height: '100%', // optional

        '> svg': {
          // This overrides the pixel width and height of svg allowing it to resize properly within flexbox
          width: '100%',
          height: '100%',
        },
      },
    },
  };
};
