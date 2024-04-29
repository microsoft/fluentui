import { ICSSInJSStyle } from '@fluentui/styles';
import { iconClassNames } from '@fluentui/react-icons-northstar';

export const getIconFillOrOutlineStyles = ({ outline }: { outline: boolean }): ICSSInJSStyle => ({
  [`& .${iconClassNames.filled}`]: {
    display: outline ? 'none' : 'block',
  },

  [`& .${iconClassNames.outline}`]: {
    display: outline ? 'block' : 'none',
  },
});
