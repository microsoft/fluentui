import * as React from 'react';
import { Alert, Ref } from '@fluentui/react-northstar';
import MessageComputer from './MessageComputer';

const mc: MessageComputer = new MessageComputer();

export type ReaderTextProps = {
  selector: string;
};

export const ReaderText: React.FunctionComponent<ReaderTextProps> = ({ selector }) => {
  const ref = React.useRef<HTMLElement>();
  const [text, setText] = React.useState('');

  React.useEffect(() => {
    if (ref.current) {
      const element = ref.current.ownerDocument.querySelector(selector);
      mc.computeMessage(element, 'Win/JAWS').then(message => {
        setText(`Narration: ${message}`);
      });
    }
  }, [setText, ref, selector]);

  if (!selector) {
    return null;
  }

  return (
    <Ref innerRef={ref}>
      <Alert warning content={text} />
    </Ref>
  );
};
