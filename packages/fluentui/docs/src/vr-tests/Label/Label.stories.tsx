import { ComponentMeta } from '@storybook/react';
import { Label } from '@fluentui/react-northstar';
import LabelExampleShorthand from '../../examples/components/Label/Content/LabelExample.shorthand';
import LabelExample from '../../examples/components/Label/Content/LabelExample';
import LabelExampleContentCustomizationShorthand from '../../examples/components/Label/Content/LabelExampleContentCustomization.shorthand';
import LabelExampleIconShorthand from '../../examples/components/Label/Content/LabelExampleIcon.shorthand';
import LabelExampleIconPositionShorthand from '../../examples/components/Label/Content/LabelExampleIconPosition.shorthand';
import LabelExampleImageShorthand from '../../examples/components/Label/Content/LabelExampleImage.shorthand';
import LabelExampleRtl from '../../examples/components/Label/Rtl/LabelExample.rtl';
import LabelExampleCircularShorthand from '../../examples/components/Label/Variations/LabelExampleCircular.shorthand';
import LabelExampleColor from '../../examples/components/Label/Variations/LabelExampleColor.shorthand';

export default { component: Label, title: 'Label' } as ComponentMeta<typeof Label>;

export {
  LabelExampleShorthand,
  LabelExample,
  LabelExampleContentCustomizationShorthand,
  LabelExampleIconShorthand,
  LabelExampleIconPositionShorthand,
  LabelExampleImageShorthand,
  LabelExampleRtl,
  LabelExampleCircularShorthand,
  LabelExampleColor,
};
