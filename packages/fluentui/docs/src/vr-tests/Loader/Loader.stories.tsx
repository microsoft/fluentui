import { ComponentMeta } from '@storybook/react';
import { Loader } from '@fluentui/react-northstar';
import LoaderExampleRtl from '../../examples/components/Loader/Rtl/LoaderExample.rtl';
import LoaderExample from '../../examples/components/Loader/Types/LoaderExample.shorthand';
import LoaderExampleLabel from '../../examples/components/Loader/Types/LoaderExampleLabel.shorthand';
import LoaderExampleDelay from '../../examples/components/Loader/Usage/LoaderExampleDelay';
import LoaderExampleInline from '../../examples/components/Loader/Variations/LoaderExampleInline';
import LoaderExampleSecondary from '../../examples/components/Loader/Variations/LoaderExampleSecondary';
import LoaderExampleSize from '../../examples/components/Loader/Variations/LoaderExampleSize';

export default { component: Loader, title: 'Loader' } as ComponentMeta<typeof Loader>;

export {
  LoaderExampleRtl,
  LoaderExample,
  LoaderExampleLabel,
  LoaderExampleDelay,
  LoaderExampleInline,
  LoaderExampleSecondary,
  LoaderExampleSize,
};
