import { ComponentMeta } from '@storybook/react';
import { Form } from '@fluentui/react-northstar';
import FormExampleRtl from '../../examples/components/Form/Rtl/FormExample.rtl';
import FormExample from '../../examples/components/Form/Types/FormExampleBase';
import FormExampleCheckbox from '../../examples/components/Form/Usage/FormExampleCheckbox';
import FormExampleDatepicker from '../../examples/components/Form/Usage/FormExampleDatepicker';
import FormExampleErrorAndSatisfactory from '../../examples/components/Form/Usage/FormExampleErrorAndSuccessful';
import FormExampleSlider from '../../examples/components/Form/Usage/FormExampleSlider';
import FormExampleComponents from '../../examples/components/Form/Variants/FormExampleComponents';

export default { component: Form, title: 'Form' } as ComponentMeta<typeof Form>;

export {
  FormExampleRtl,
  FormExample,
  FormExampleCheckbox,
  FormExampleDatepicker,
  FormExampleErrorAndSatisfactory,
  FormExampleSlider,
  FormExampleComponents,
};
