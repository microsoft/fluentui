import * as React from 'react';
import * as _ from 'lodash';
import { useFluentContext } from '@fluentui/react-bindings';
import { Box, Ref } from '@fluentui/react-northstar';
// fabric component
// import { Announced } from '@fluentui/react/lib/Announced';

interface InstructionMessageProps {
  message: string;
  role?: string;
  'aria-label'?: string;
}

const InstructionMessage: React.FunctionComponent<InstructionMessageProps> = props => {
  const { children, message, ...rest } = props;

  const narrationHappened = React.useRef(false);
  const instructionRef = React.useRef<HTMLElement>();
  const timeoutMessageNarrate = React.useRef<number>();
  const timeoutMessageRemove = React.useRef<number>();
  const context = useFluentContext();
  // fabric component
  // const [shouldAnnounce, setShouldAnnounce] = React.useState<boolean>(false);

  const narrate = (instructionMessage, priority = 'polite') => {
    const element = document.createElement('div');
    element.setAttribute(
      'style',
      'position: absolute; left: -10000px; top: auto; width: 1px; height: 1px; overflow: hidden;',
    );
    element.setAttribute('aria-live', priority);
    document.body.appendChild(element);

    timeoutMessageNarrate.current = context.target.defaultView.setTimeout(() => {
      element.innerText = instructionMessage;
    }, 2000);

    timeoutMessageRemove.current = context.target.defaultView.setTimeout(() => {
      document.body.removeChild(element);
    }, 2300);

    timeoutMessageNarrate.current = context.target.defaultView.setTimeout(() => {
      console.log('announcing...');
      // fabric component
      // setShouldAnnounce(true);
    }, 2000);
  };

  const handleFocus = React.useCallback(() => {
    if (!narrationHappened.current) {
      narrate(message);
      narrationHappened.current = true;
    }
  }, []);

  const handleBlur = React.useCallback(event => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      clearTimeout(timeoutMessageNarrate.current);
      // fabric component
      // setShouldAnnounce(false);
      narrationHappened.current = false;
    }
  }, []);

  return (
    <Ref innerRef={instructionRef}>
      <Box onFocus={handleFocus} onBlur={handleBlur} {...rest}>
        {children}
        {/* fabric component */}
        {/* {shouldAnnounce && <Announced message={message} aria-live={'assertive'} />} */}
      </Box>
    </Ref>
  );
};

export default InstructionMessage;
