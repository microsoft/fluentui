/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */
import * as React from 'react';
import { Dropdown, IDropdownProps } from 'office-ui-fabric-react/lib/Dropdown';

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

export const RenderLetDropdown = (props: any) => {
  let propsTest = { options: [], isDisabled: false };
  return (
    <div>
      <Dropdown {...propsTest}>Dropdown!</Dropdown>
      {/* include self closing Dropdown check */}
      <Dropdown {...propsTest} />
    </div>
  );
};

export const RenderDropdownProps = (props: IDropdownProps) => {
  return (
    <div>
      <Dropdown {...props}>Dropdown!</Dropdown>
      {/* include self closing Dropdown check */}
      <Dropdown {...props} />
    </div>
  );
};

export function RenderDropdownPropsFunc(props: IDropdownProps) {
  return (
    <div>
      <Dropdown {...props}>Dropdown!</Dropdown>
      {/* include self closing Dropdown check */}
      <Dropdown {...props} />
    </div>
  );
}
