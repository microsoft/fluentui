import * as React from 'react';
import { Alert, Ref } from '@fluentui/react-northstar';
import { ExclamationTriangleIcon } from '@fluentui/react-icons-northstar';

export type ReaderTextProps = {
  selector?: string;
  node?: HTMLElement;
};

const AOMDisabledMessage = 'Accessible Object Model (AOM) feature is not enable.';

export const ReaderText: React.FunctionComponent<ReaderTextProps> = ({ selector, node }) => {
  const ref = React.createRef<HTMLElement>();
  const [text, setText] = React.useState('');
  const [AOMWarning, setAOMWarning] = React.useState(false);

  React.useEffect(() => {
    const getComputedAccessibleNode = async () => {
      if (ref.current) {
        const element = ref.current.ownerDocument.querySelector(selector);
        let t = element?.getAttribute('aria-label') || element?.textContent;

        if (!!window.getComputedAccessibleNode) {
          const accessibleNode = await window.getComputedAccessibleNode(element);
          t = `Role:  ${accessibleNode.role} ${accessibleNode.name || ''}`;
        } else {
          setAOMWarning(true);
        }

        setText(t);
      }
    };

    getComputedAccessibleNode();
    // eslint-disable-next-line
  }, [setText, ref.current, selector]);

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
