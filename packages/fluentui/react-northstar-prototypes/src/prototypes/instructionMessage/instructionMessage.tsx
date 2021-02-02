import * as React from 'react';
import * as _ from 'lodash';
import { useFluentContext } from '@fluentui/react-bindings';
import { Box } from '@fluentui/react-northstar';

let narrationHasHappened = false;

interface InstructionMessageProps {
  message: string;
  role?: string;
  'aria-label'?: string;
}

const InstructionMessage: React.FunctionComponent<InstructionMessageProps> = props => {
  const { message, ...rest } = props;
  const [areaId, setAreaId] = React.useState(_.uniqueId('instruction-message-'));
  // const [areaFocusableElements, setAreaFocusableElements] = React.useState(null);
  // const [currentArea, setcurrentArea] = React.useState(null);

  const timeoutMessageNarrate = React.useRef<number>();
  const timeoutMessageRemove = React.useRef<number>();
  const context = useFluentContext();
  const { children } = props;
  const currentArea = () => document.querySelector(`#${areaId}`);
  const areaFocusableElements = (currentArea: Element) =>
    currentArea?.querySelectorAll('a, button, input, textarea, select, details, [tabindex]');

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
  };

  const handleFocus = React.useCallback(
    event => {
      if (!areaId) {
        setAreaId(() => _.uniqueId('instruction-message-'));
      }
      const focElements = areaFocusableElements(currentArea());
      if (!narrationHasHappened && focElements && Array.from(focElements).includes(event.target)) {
        narrate(message);
        narrationHasHappened = true;
      }
    },
    [areaFocusableElements],
  );

  const handleBlur = React.useCallback(
    event => {
      if (areaFocusableElements && !Array.from(areaFocusableElements(currentArea())).includes(event.relatedTarget)) {
        clearTimeout(timeoutMessageNarrate.current);
        narrationHasHappened = false;
      }
    },
    [areaFocusableElements],
  );

  return (
    <Box id={areaId} onFocus={handleFocus} onBlur={handleBlur} {...rest}>
      {children}
    </Box>
  );
};

export default InstructionMessage;
