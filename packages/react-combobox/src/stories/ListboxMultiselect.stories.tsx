import { useBoolean, useId } from '@fluentui/react-utilities';
import * as React from 'react';
import { Listbox, Option, ListboxProps } from '../index';

export const Multiselect = (props: Partial<ListboxProps>) => {
  const ops = ['Cat', 'Dog', 'Ferret', 'Fish'];
  const moreOps = [...ops, 'Hamster', 'Snake'];
  const [showMore, { toggle: setShowMore }] = useBoolean(false);
  const idBase = useId('listbox-default');

  const optionData = showMore ? moreOps : ops;
  return (
    <>
      <Listbox multiselect={true} {...props}>
        <div>Test header</div>
        {optionData.map(option => (
          <Option key={option} itemKey={option} id={`${idBase}-${option}`}>
            {option}
          </Option>
        ))}
      </Listbox>
      <button onClick={setShowMore}>toggle more options</button>
    </>
  );
};
