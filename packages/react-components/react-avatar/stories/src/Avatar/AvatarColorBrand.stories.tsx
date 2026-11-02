import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Avatar } from '@fluentui/react-components';

export const ColorBrand = (): JSXElement => <Avatar color="brand" initials="BR" name="brand color avatar" />;

ColorBrand.storyName = 'Color: brand';

ColorBrand.parameters = {
  docs: {
    description: {
      story: "An avatar can use the brand color from the theme's palette.",
    },
  },
};
