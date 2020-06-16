import { ICSSInJSStyle } from '@fluentui/styles';

const itemLayoutStyles = {
  root: ({ variables }): ICSSInJSStyle => {
    return {
      gridTemplateRows: `minmax(${variables.height}, max-content)`,
      paddingLeft: variables.paddingLeft,
      paddingRight: variables.paddingRight,
    };
  },
};

export default itemLayoutStyles;
