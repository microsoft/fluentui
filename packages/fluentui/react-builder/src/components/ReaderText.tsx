import * as React from 'react';
import { Alert, Ref } from '@fluentui/react-northstar';

export type ReaderTextProps = {
  selector: string;
};

export const ReaderText: React.FunctionComponent<ReaderTextProps> = ({ selector }) => {
  const ref = React.createRef<HTMLElement>();
  const [delayedText, setDelayedText] = React.useState('');

  React.useEffect(() => {
    if (ref.current) {
      const t = ref.current.ownerDocument.querySelector(selector)?.textContent;
      setTimeout(() => setDelayedText(t), 3000);
    }
  });

  if (!selector) {
    return null;
  }

  return (
    <Ref innerRef={ref}>
      <Alert warning content={delayedText} />
    </Ref>
  );
};
