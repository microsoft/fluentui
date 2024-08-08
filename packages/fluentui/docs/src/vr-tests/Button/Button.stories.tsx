import { Meta } from '@storybook/react';
import { Button } from '@fluentui/react-northstar';
import ButtonDefaultBsize from '../../examples/components/Button/Performance/ButtonDefault.bsize';
import ButtonExampleRtl from '../../examples/components/Button/Rtl/ButtonExample.rtl';

import ButtonExampleDisabledFocusable from '../../examples/components/Button/States/ButtonExampleDisabledFocusable.shorthand';
import ButtonExampleLoading from '../../examples/components/Button/States/ButtonExampleLoading.shorthand';

import ButtonExampleEmphasis from '../../examples/components/Button/Types/ButtonExampleEmphasis.shorthand';
import ButtonExampleIconOnly from '../../examples/components/Button/Types/ButtonExampleIconOnly.shorthand';
import ButtonExampleInverted from '../../examples/components/Button/Types/ButtonExampleInverted';
import ButtonExampleText from '../../examples/components/Button/Types/ButtonExampleText';

import ButtonExampleOverflow from '../../examples/components/Button/Usage/ButtonExampleOverflow.shorthand';
import ButtonUsageExampleShorthand from '../../examples/components/Button/Usage/ButtonUsageExample.shorthand';
import ButtonExampleCircular from '../../examples/components/Button/Variations/ButtonExampleCircular.shorthand';
import ButtonExampleFlat from '../../examples/components/Button/Variations/ButtonExampleFlat.shorthand';
import ButtonExampleFluid from '../../examples/components/Button/Variations/ButtonExampleFluid.shorthand';
import ButtonExampleSizeShorthand from '../../examples/components/Button/Variations/ButtonExampleSize.shorthand';

export default { component: Button, title: 'Button' } as Meta<typeof Button>;

export {
  ButtonDefaultBsize,
  ButtonExampleRtl,
  ButtonExampleDisabledFocusable,
  ButtonExampleLoading,
  ButtonExampleEmphasis,
  ButtonExampleIconOnly,
  ButtonExampleInverted,
  ButtonExampleText,
  ButtonExampleOverflow,
  ButtonUsageExampleShorthand,
  ButtonExampleCircular,
  ButtonExampleFlat,
  ButtonExampleFluid,
  ButtonExampleSizeShorthand,
};
