import * as React from 'react';
import { ChoiceGroup, IChoiceGroupOption } from 'office-ui-fabric-react/lib/ChoiceGroup';
import { Dropdown, IDropdownStyles, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { mergeStyles } from 'office-ui-fabric-react/lib/Styling';

export const ChoiceGroupCustomExample: React.FunctionComponent = () => {
  return <ChoiceGroup defaultSelectedKey="B" options={options} label="Pick one" />;
};

const optionRootClass = mergeStyles({ display: 'flex', alignItems: 'baseline' });
const dropdownStyles: Partial<IDropdownStyles> = {
  root: { marginBottom: 0, marginLeft: 5 },
};
const dropdownOptions: IDropdownOption[] = [
  { key: 'A', text: '5 seconds' },
  { key: 'B', text: '10 seconds' },
  { key: 'C', text: '20 seconds' },
];

const options: IChoiceGroupOption[] = [
  {
    key: 'A',
    text: 'Mark displayed items as read after',
    ariaLabel: 'Mark displayed items as read after - Press tab for further action',
    onRenderField: (props, render) => {
      return (
        <div className={optionRootClass}>
          {render!(props)}
          <Dropdown
            defaultSelectedKey="A"
            styles={dropdownStyles}
            options={dropdownOptions}
            // tslint:disable-next-line:deprecation
            disabled={props ? !props.checked : false}
            ariaLabel="Select a time span"
          />
        </div>
      );
    },
  },
  { key: 'B', text: 'Option B', styles: { root: { border: '1px solid green' } } },
  { key: 'C', text: 'Option C', disabled: true },
  { key: 'D', text: 'Option D' },
];
