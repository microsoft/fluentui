import * as React from 'react';
import { Customizer, DefaultButton, PrimaryButton, TextField, Stack, Fabric } from 'office-ui-fabric-react';
import { AzureCustomizationsLight, AzureCustomizationsDark } from '../../index';

const Example = () => (
  // tslint:disable-next-line:jsx-ban-props
  <Stack gap={8} horizontalAlign="center" style={{ maxWidth: 400 }}>
    <DefaultButton text="Hello, world" />
    <PrimaryButton text="Hello, world" />
    <TextField value="Hello, world" />
  </Stack>
);

export const Light = () => (
  <Customizer {...AzureCustomizationsLight}>
    <Fabric applyThemeToBody>
      <Example />
    </Fabric>
  </Customizer>
);

export const Dark = () => (
  <Customizer {...AzureCustomizationsDark}>
    <Fabric applyThemeToBody>
      <Example />
    </Fabric>
  </Customizer>
);
