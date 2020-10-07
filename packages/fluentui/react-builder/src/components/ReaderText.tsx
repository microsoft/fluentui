import * as React from 'react';
import { Alert, Ref } from '@fluentui/react-northstar';
import { NarrationComputer } from './NarrationComputer';

const nc: NarrationComputer = new NarrationComputer();

export type ReaderTextProps = {
  selector: string;
};

export const ReaderText: React.FunctionComponent<ReaderTextProps> = ({ selector }) => {
  const ref = React.useRef<HTMLElement>();
  const [text, setText] = React.useState('');

  React.useEffect(() => {
    if (ref.current) {
      const element = ref.current.ownerDocument.querySelector(selector);
      nc.computeNarration(element, 'Win/JAWS').then(narration => {
        setText(`Narration: ${narration}`);
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
