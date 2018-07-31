import { IPanelStyleProps, IPanelStyles } from './Panel.types';

export const getStyles = (props: IPanelStyleProps): IPanelStyles => {
  const { className } = props;

  return {
    root: ['ms-Panel', {}, className]
  };
};
