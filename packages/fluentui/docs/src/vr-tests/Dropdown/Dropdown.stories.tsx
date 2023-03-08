import { ComponentMeta } from '@storybook/react';
import { Dropdown } from '@fluentui/react-northstar';
import DropdownExampleFreeform from '../../examples/components/Dropdown/Types/DropdownExampleFreeform.shorthand';
import DropdownExampleInline from '../../examples/components/Dropdown/Types/DropdownExampleInline.shorthand';
import DropdownExampleInverted from '../../examples/components/Dropdown/Types/DropdownExampleInverted.shorthand';
import DropdownExampleSearch from '../../examples/components/Dropdown/Types/DropdownExampleSearch.shorthand';
import DropdownExampleRender from '../../examples/components/Dropdown/Usage/DropdownExampleRender.shorthand';
import DropdownExamplePosition from '../../examples/components/Dropdown/Variations/DropdownExamplePosition.shorthand';
import DropdownExampleSearchMultipleFluid from '../../examples/components/Dropdown/Variations/DropdownExampleSearchMultipleFluid.shorthand';
import DropdownExampleSearchMultipleFrenchLanguage from '../../examples/components/Dropdown/Variations/DropdownExampleSearchMultipleFrenchLanguage.shorthand';
import DropdownExampleSearchMultipleImageAndContent from '../../examples/components/Dropdown/Variations/DropdownExampleSearchMultipleImageAndContent.shorthand';

export default { component: Dropdown, title: 'Dropdown' } as ComponentMeta<typeof Dropdown>;

export {
  DropdownExampleFreeform,
  DropdownExampleInline,
  DropdownExampleInverted,
  DropdownExampleSearch,
  DropdownExampleRender,
  DropdownExamplePosition,
  DropdownExampleSearchMultipleFluid,
  DropdownExampleSearchMultipleFrenchLanguage,
  DropdownExampleSearchMultipleImageAndContent,
};
