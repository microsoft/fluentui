import * as React from 'react';
import { InfoButton } from '@fluentui/react-infobutton';
import { useId } from '@fluentui/react-components';

export const AriaOwns = () => {
  const labelId = useId('label-');
  const infoButtonId = useId('infobutton-');
  const infoButtonContentId = useId('infobuttonContent-');

  return (
    <div aria-owns={infoButtonContentId}>
      <label id={labelId}>Example label</label>
      <InfoButton id={infoButtonId} aria-labelledby={`${labelId} ${infoButtonId}`} info={{ id: infoButtonContentId }} />
    </div>
  );
};
