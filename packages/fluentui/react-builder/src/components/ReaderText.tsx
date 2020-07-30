import * as React from 'react';
import { Alert, Ref } from '@fluentui/react-northstar';

export type ReaderTextProps = {
  selector?: string;
  node?: HTMLElement;
};

export const ReaderText: React.FunctionComponent<ReaderTextProps> = ({ selector, node }) => {
  const ref = React.createRef<HTMLElement>();
  const [text, setText] = React.useState('');

  React.useEffect(() => {
    if (ref.current) {
      const element = node || ref.current.ownerDocument.querySelector(selector);
      const t = element?.getAttribute('aria-label') || element?.textContent;
      setText(t);
    }
    // eslint-disable-next-line
  }, [setText, ref.current, selector, node]);

  if (!selector && !node) {
    return null;
  }

  return (
    <Ref innerRef={ref}>
      <Alert warning content={text} />
    </Ref>
  );
};
