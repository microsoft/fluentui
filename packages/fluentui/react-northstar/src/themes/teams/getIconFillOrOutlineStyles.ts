import { iconClassNames } from '@fluentui/react-icons-northstar';
import type { ICSSInJSStyle } from '@fluentui/styles';

export const getIconFillOrOutlineStyles = ({ outline }: { outline: boolean }): ICSSInJSStyle => ({
  [`& .${iconClassNames.filled}`]: {
    display: outline ? 'none' : 'block',
  },

  [`& .${iconClassNames.outline}`]: {
    display: outline ? 'block' : 'none',
  },
});
