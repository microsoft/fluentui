import * as React from 'react';
// @ts-ignore
import { Dropdown } from 'office-ui-fabric-react/lib/Dropdown';

export const RenderDropdown = (props: any) => {
  const propsTest = { options: [], isDisabled: false };
  return (
    <div>
      <Dropdown {...propsTest}>Dropdown!</Dropdown>
      {/* include self closing Dropdown check */}
      <Dropdown {...propsTest} />
    </div>
  );
};
