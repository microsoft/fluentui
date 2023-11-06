import * as React from 'react';
import { Combobox, Option, makeStyles, useId } from '@fluentui/react-components';
import type { ComboboxProps } from '@fluentui/react-components';

import { Virtualizer, useStaticVirtualizerMeasure } from '@fluentui/react-components/unstable';

const useStyles = makeStyles({
  listbox: {
    maxHeight: '250px',
  },
  option: {
    height: '32px',
  },
});

export const ComboboxVirtualizer = (props: Partial<ComboboxProps>) => {
  const comboId = useId('combobox');

  const itemHeight = 32; //This should match the height of each item in the listbox
  const numberOfItems = 10000;

  const { virtualizerLength, bufferItems, bufferSize, scrollRef } = useStaticVirtualizerMeasure({
    defaultItemSize: itemHeight,
    direction: 'vertical',
  });

  const styles = useStyles();

  return (
    <div>
      <div>
        <label htmlFor={`${comboId}`}>Medium</label>
        <Combobox
          id={`${comboId}`}
          placeholder="Select a number"
          listbox={{ ref: scrollRef, className: styles.listbox }}
        >
          <Virtualizer
            numItems={numberOfItems}
            virtualizerLength={virtualizerLength}
            bufferItems={bufferItems}
            bufferSize={bufferSize}
            itemSize={itemHeight}
          >
            {index => {
              return (
                <Option
                  className={styles.option}
                  aria-posinset={index}
                  aria-setsize={numberOfItems}
                  key={`item-${index}`}
                >{`Item ${index + 1}`}</Option>
              );
            }}
          </Virtualizer>
        </Combobox>
      </div>
    </div>
  );
};

ComboboxVirtualizer.parameters = {
  docs: {
    description: {
      story: 'A Combobox can use Virtualizer to display a large number of options.',
    },
  },
};
