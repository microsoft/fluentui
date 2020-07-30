import * as React from 'react';
import { Alert, Ref } from '@fluentui/react-northstar';
import { ExclamationTriangleIcon } from '@fluentui/react-icons-northstar';
import { computeMessage } from '../narration/computeMessage';

export type ReaderTextProps = {
  selector?: string;
  node?: HTMLElement;
};

const AOMDisabledMessage = 'Accessible Object Model (AOM) feature is not enabled.';

export const ReaderText: React.FunctionComponent<ReaderTextProps> = ({ selector, node }) => {
  const ref = React.useRef<HTMLElement>();
  const [text, setText] = React.useState('');
  const [AOMWarning, setShowAOMWarning] = React.useState(false);

  React.useEffect(() => {
    if (ref && ref.current) {
      const element = node || ref.current.ownerDocument.querySelector(selector);
      const aomEnabled = false; // (window as any).getComputedAccessibleNode;
      const narration = computeMessage(element as HTMLElement);

      if (typeof narration === 'string') {
        setText(narration);
      } else {
        narration.then(n => setText(n));
      }

      setShowAOMWarning(!aomEnabled);
    }
  }, [setShowAOMWarning, setText, ref, selector, node]);

  return (
    (selector || node) && (
      <Ref innerRef={ref}>
        <>
          <Alert warning content={text} />
          {AOMWarning && (
            <Alert
              tabIndex={0}
              info
              icon={<ExclamationTriangleIcon />}
              content={AOMDisabledMessage}
              actions={[
                {
                  content: 'More Info',
                  primary: true,
                  onClick: () => window.open('https://wicg.github.io/aom/caniuse.html', '_blank'),
                },
              ]}
            />
          )}
        </>
      </Ref>
    )
  );
};
