import * as React from 'react';
import { Alert, Ref } from '@fluentui/react-northstar';
import { computeMessage } from '../narration/computeMessage';

export type ReaderTextProps = {
  selector?: string;
  node?: HTMLElement;
};

export const ReaderText: React.FunctionComponent<ReaderTextProps> = ({ selector, node }) => {
  const ref = React.useRef<HTMLElement>();
  const [text, setText] = React.useState('');

  React.useEffect(() => {
    if (ref && ref.current) {
      const element = node || ref.current.ownerDocument.querySelector(selector);
      const narration = computeMessage(element as HTMLElement);
      if (typeof narration === 'string') {
        setText(narration);
      } else {
        narration.then(n => setText(n));
      }
    }
  }, [setText, ref, selector, node]);

  if (!selector && !node) {
    return null;
  }

  return (
    <Ref innerRef={ref}>
      <Alert warning content={text} />
    </Ref>
  );
};
