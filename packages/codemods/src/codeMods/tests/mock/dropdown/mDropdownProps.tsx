import * as React from 'react';
// @ts-ignore
import { Dropdown } from 'office-ui-fabric-react/lib/Dropdown';

export const RenderDropdown = (props: any) => {
  return (
    <div>
      <Dropdown options={[]} dropdownWidth={0} placeHolder={'placeholder!'} isDisabled={true} />
      <Dropdown options={[]} dropdownWidth={5} placeHolder={'placeholder!'} isDisabled={false}>
        {' '}
        Woo Hoo!{' '}
      </Dropdown>
    </div>
  );
};
