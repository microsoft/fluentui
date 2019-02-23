import { ITagItemStyleProps, ITagItemStyles } from 'office-ui-fabric-react/lib/Pickers';

export const TagItemStyles = (props: ITagItemStyleProps): Partial<ITagItemStyles> => {
  const { theme } = props;
  if (!theme) {
    throw new Error('Theme is undefined or null.');
  }
  const { effects } = theme;

  return {
    root: {
      borderRadius: effects.roundedCorner2
    },
    close: {
      background: 'transparent',
      borderRadius: `0 ${effects.roundedCorner2} ${effects.roundedCorner2} 0`
    }
  };
};
