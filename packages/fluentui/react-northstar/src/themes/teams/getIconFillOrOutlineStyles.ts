import { ICSSInJSStyle } from '@fluentui/styles';
import { iconClassNames, svgIconClassName } from '@fluentui/react-icons-northstar';

const getIconFillOrOutlineStyles = ({ outline }: { outline: boolean }): ICSSInJSStyle => ({
  [`& .${svgIconClassName} .${iconClassNames.filled}`]: {
    display: outline ? 'none' : 'block',
  },

  [`& .${svgIconClassName} .${iconClassNames.outline}`]: {
    display: outline ? 'block' : 'none',
  },
});

export default getIconFillOrOutlineStyles;
