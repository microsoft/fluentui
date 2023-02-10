import { ComponentMeta } from '@storybook/react';
import { TextArea } from '@fluentui/react-northstar';
import TextAreaDisabledExample from '../../examples/components/TextArea/States/TextAreaDisabledExample.shorthand';
import TextAreaValueExample from '../../examples/components/TextArea/States/TextAreaValueExample.shorthand';
import TextAreaExampleHeight from '../../examples/components/TextArea/Usage/TextAreaExampleHeight.shorthand';
import TextAreaExampleMaxLength from '../../examples/components/TextArea/Usage/TextAreaExampleMaxLength.shorthand';
import TextAreaExampleResize from '../../examples/components/TextArea/Usage/TextAreaExampleResize.shorthand';
import TextAreaExampleFluid from '../../examples/components/TextArea/Variations/TextAreaExampleFluid.shorthand';

export default { component: TextArea, title: 'TextArea' } as ComponentMeta<typeof TextArea>;

export {
  TextAreaDisabledExample,
  TextAreaValueExample,
  TextAreaExampleHeight,
  TextAreaExampleMaxLength,
  TextAreaExampleResize,
  TextAreaExampleFluid,
};
