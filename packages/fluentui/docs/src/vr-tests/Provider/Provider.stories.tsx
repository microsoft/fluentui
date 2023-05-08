import { ComponentMeta } from '@storybook/react';
import { Provider } from '@fluentui/react-northstar';
import ProviderExampleAnimation from '../../examples/components/Provider/Types/ProviderDisableAnimationsExample.shorthand';
import ProviderExampleShorthand from '../../examples/components/Provider/Types/ProviderExample.shorthand';
import ProviderExampleScrollbar from '../../examples/components/Provider/Types/ProviderExampleScrollbar.shorthand';
import ProviderRtlExample from '../../examples/components/Provider/Types/ProviderRtlExample.shorthand';
import ProviderExampleTarget from '../../examples/components/Provider/Usage/ProviderExampleTarget';
import ProviderExampleTargetFrame from '../../examples/components/Provider/Usage/ProviderExampleTargetFrame';

export default { component: Provider, title: 'Provider' } as ComponentMeta<typeof Provider>;

export {
  ProviderExampleAnimation,
  ProviderExampleShorthand,
  ProviderExampleScrollbar,
  ProviderRtlExample,
  ProviderExampleTarget,
  ProviderExampleTargetFrame,
};
