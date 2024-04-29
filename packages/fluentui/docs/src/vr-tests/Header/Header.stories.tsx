import { ComponentMeta } from '@storybook/react';
import { Header } from '@fluentui/react-northstar';
import HeaderExampleRtl from '../../examples/components/Header/Rtl/HeaderExample.rtl';
import HeadersExampleShorthand from '../../examples/components/Header/Types/HeaderExample.shorthand';
import HeaderExample from '../../examples/components/Header/Types/HeaderExample';
import HeaderExampleAlign from '../../examples/components/Header/Variations/HeaderExample.shorthand';
import HeaderExampleColor from '../../examples/components/Header/Variations/HeaderExampleColor.shorthand';
import HeaderExampleDescriptionShorthand from '../../examples/components/Header/Variations/HeaderExampleDescription.shorthand';
import HeaderExampleDescription from '../../examples/components/Header/Variations/HeaderExampleDescription';
import HeaderExampleDescriptionCustomizationShorthand from '../../examples/components/Header/Variations/HeaderExampleDescriptionCustomization.shorthand';
import HeaderExampleDescriptionCustomization from '../../examples/components/Header/Variations/HeaderExampleDescriptionCustomization';

export default { component: Header, title: 'Header' } as ComponentMeta<typeof Header>;

export {
  HeaderExampleRtl,
  HeadersExampleShorthand,
  HeaderExample,
  HeaderExampleAlign,
  HeaderExampleColor,
  HeaderExampleDescriptionShorthand,
  HeaderExampleDescription,
  HeaderExampleDescriptionCustomizationShorthand,
  HeaderExampleDescriptionCustomization,
};
