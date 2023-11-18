import * as React from 'react';
import { ChoiceGroup, IChoiceGroupOption } from '@fluentui/react/lib/ChoiceGroup';
import { mergeStyles } from '@fluentui/react/lib/Styling';
import { CatIcon } from '@fluentui/react-icons-mdl2';

export const ChoiceGroupCustomExample: React.FunctionComponent = () => {
  return <ChoiceGroup defaultSelectedKey="B" options={options} label="Pick one" />;
};

const optionRootClass = mergeStyles({ display: 'flex', alignItems: 'center', gap: '5px' });

const options: IChoiceGroupOption[] = [
  {
    key: 'A',
    text: 'A label with an icon',
    ariaLabel: 'A label with a cat icon',
    onRenderField: (props, render) => {
      return (
        <div className={optionRootClass}>
          {render!(props)}
          <CatIcon />
        </div>
      );
    },
  },
  { key: 'B', text: 'Option B', styles: { root: { border: '1px solid green' } } },
  { key: 'C', text: 'Option C', disabled: true },
  { key: 'D', text: 'Option D' },
];
