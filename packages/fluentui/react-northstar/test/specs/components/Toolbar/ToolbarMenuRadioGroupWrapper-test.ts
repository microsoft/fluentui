import { isConformant } from 'test/specs/commonTests';
import { ToolbarMenuRadioGroupWrapper } from 'src/components/Toolbar/ToolbarMenuRadioGroupWrapper';

describe('ToolbarMenuRadioGroupWrapper', () => {
  isConformant(ToolbarMenuRadioGroupWrapper, { testPath: __filename, constructorName: 'ToolbarMenuRadioGroupWrapper' });
});
