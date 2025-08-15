import * as React from 'react';
import { AriaLiveAnnouncer, Field, Input, useId } from '@fluentui/react-components';
import type { InputProps } from '@fluentui/react-components';
import { useTypingAnnounce } from '../../../library/src/useTypingAnnounce/useTypingAnnounce';

export const Default = () => {
  const [overLimit, setOverLimit] = React.useState(false);
  const announceId = useId('charLimit');

  const { typingAnnounce, inputRef } = useTypingAnnounce<HTMLInputElement>();

  const onChange: InputProps['onChange'] = (_, data) => {
    setOverLimit(data.value.length > 20);

    if (data.value.length > 20) {
      typingAnnounce('You have reached the maximum character limit', { batchId: announceId });
    }
  };

  return (
    <AriaLiveAnnouncer>
      <Field label="A field with a maxlength of 20" validationState={overLimit ? 'error' : undefined}>
        <Input onChange={onChange} ref={inputRef} />
      </Field>
    </AriaLiveAnnouncer>
  );
};
