import * as React from 'react';
import { Button, Flex, Provider } from '@fluentui/react-northstar';

const ButtonUsageExampleShorthand = () => (
  <div>
    <Provider
      theme={{
        componentVariables: {
          Button: siteVars => ({
            color: siteVars.colorScheme.brand.foreground,
            colorHover: siteVars.colorScheme.brand.foreground,
            colorFocus: siteVars.colorScheme.default.foreground,
            colorDisabled: siteVars.colorScheme.brandForegroundDisabled,
            backgroundColor: siteVars.colorScheme.default.background,
            backgroundColorActive: siteVars.colorScheme.brandBorderPressed,
            backgroundColorHover: siteVars.colorScheme.brand.backgroundHover1,
            backgroundColorFocus: siteVars.colorScheme.default.background,
            backgroundColorDisabled: siteVars.colorScheme.brand.backgroundDisabled,
            borderColor: siteVars.colorScheme.brandBorder2,
            borderColorHover: siteVars.colorScheme.brandBorderHover,
          }),
        },
      }}
    >
      <Flex gap="gap.smaller">
        <Button content="Tinted Button" />
        <Button disabled content="Tinted Button Disabled" />
      </Flex>
    </Provider>
  </div>
);

export default ButtonUsageExampleShorthand;
