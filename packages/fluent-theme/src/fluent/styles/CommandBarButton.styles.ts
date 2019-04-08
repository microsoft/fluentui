import { getFocusStyles } from 'office-ui-fabric-react/lib/Styling';
import { IButtonStyles, IButtonProps } from 'office-ui-fabric-react/lib/Button';

export const CommandBarButtonStyles = (props: IButtonProps): Partial<IButtonStyles> => {
  const { theme } = props;
  if (!theme) {
    throw new Error('Theme is undefined or null.');
  }

  return {
    root: {
      ...getFocusStyles(theme, { inset: 2 })
    }
  };
};
