import * as React from 'react';
import { Alert, Ref } from '@fluentui/react-northstar';
import { computeMessage } from '../narration/computeMessage';

export type ReaderTextProps = {
  selector: string;
};

export const ReaderText: React.FunctionComponent<ReaderTextProps> = ({ selector }) => {
  const ref = React.createRef<HTMLElement>();
  const [text, setText] = React.useState('');

  React.useEffect(() => {
    if (ref.current) {
      const element = ref.current.ownerDocument.querySelector(selector);
      const narration = computeMessage(element as HTMLElement);
      if (typeof narration === 'string') {
        setText(narration);
      } else {
        narration.then(n => setText(n));
      }
    }
    // eslint-disable-next-line
  }, [setText, ref.current, selector]);

  if (!selector) {
    return null;
  }

  return (
    <Ref innerRef={ref}>
      <Alert warning content={text} />
    </Ref>
  );
};
