import { compose } from '@fluentui/react-theming';
import { SliderBase } from './Slider.base';
import styles from './Slider.styles';
import tokens from './Slider.tokens';

/*
What if items-view uses sliderbase, or something like it, that can receive class map from context.

We could technically just compose a slider which has a themeName of "Slider" and export it.

If items-view want a DetailsSlider specialized slider component, they could:

<ThemeProvider theme={ [itemsViewTheme] }>
  <BaseSlider themeName="DetaisSlider"/>
</ThemeProvider>

or:

applyDefaultStyling(ItemsViewThemeLight)

or:

none of this! They have css. The site can apply style overrides and tokens.

*/
export const Slider = compose(SliderBase, {
  name: 'Slider',
  styles,
  tokens,
});
