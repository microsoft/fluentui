import * as React from 'react';
import { Dropdown, IDropdownProps } from 'office-ui-fabric-react/lib/Dropdown';

// tslint:disable-next-line: no-any
export const RenderDropdown = (props: any) => {
  const propsTest = { options: [], isDisabled: false };
  return (
    <div>
      <Dropdown options={[]} isDisabled={false}>
        Dropdown!
      </Dropdown>
      {/* include self closing Dropdown check */}
      <Dropdown options={[]} isDisabled={false} />
    </div>
  );
};

// tslint:disable-next-line: no-any
export const RenderLetDropdown = (props: any) => {
  // tslint:disable-next-line: prefer-const
  let propsTest = { options: [], isDisabled: false };

  return (
    <div>
      <Dropdown options={[]} isDisabled={false}>
        Dropdown!
      </Dropdown>
      {/* include self closing Dropdown check */}
      <Dropdown options={[]} isDisabled={false} />
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
