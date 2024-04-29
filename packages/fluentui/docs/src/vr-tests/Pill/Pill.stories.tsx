import { ComponentMeta } from '@storybook/react';
import { Pill } from '@fluentui/react-northstar';
import PillExampleDisabled from '../../examples/components/Pill/State/PillExampleDisabled';
import PillExample from '../../examples/components/Pill/Types/PillExample';
import PillGroupExample from '../../examples/components/Pill/Types/PillsExample';
import PillActionableExample from '../../examples/components/Pill/Variations/PillExampleActionable';
import PillAppearanceExample from '../../examples/components/Pill/Variations/PillExampleAppearance';
import PillIconExample from '../../examples/components/Pill/Variations/PillExampleIcon';
import PillImageExample from '../../examples/components/Pill/Variations/PillExampleImage';
import PillRectangularExample from '../../examples/components/Pill/Variations/PillExampleRectangular';
import PillSelectableExample from '../../examples/components/Pill/Variations/PillExampleSelectable';
import PillSizesExample from '../../examples/components/Pill/Variations/PillExampleSizes';

export default { component: Pill, title: 'Pill' } as ComponentMeta<typeof Pill>;

export {
  PillExampleDisabled,
  PillExample,
  PillGroupExample,
  PillActionableExample,
  PillAppearanceExample,
  PillIconExample,
  PillImageExample,
  PillRectangularExample,
  PillSelectableExample,
  PillSizesExample,
};
