import { useBoolean, useId } from '@fluentui/react-hooks';
import * as React from 'react';
import { Listbox, Option, ListboxProps } from '../index';

export const Default = (props: Partial<ListboxProps>) => {
  const ops = ['Cat', 'Dog', 'Ferret', 'Fish'];
  const moreOps = [...ops, 'Hamster', 'Snake'];
  const [showMore, { toggle: setShowMore }] = useBoolean(false);
  const idBase = useId('listbox-default');

  const optionData = showMore ? moreOps : ops;
  return (
    <>
      <Listbox {...props}>
        <div>Test header</div>
        {optionData.map(option => (
          <Option key={option} id={`${idBase}-${option}`}>
            {option}
          </Option>
        ))}
      </Listbox>
      <button onClick={setShowMore}>toggle more options</button>
    </>
  );
};
