import * as React from 'react';
import { Alert, Ref, Dropdown, DropdownProps } from '@fluentui/react-northstar';
import { IAriaElement } from './../narration/NarrationComputer';
import { DescendantNarrationsComputer } from './../narration/DescendantNarrationsComputer';

const computer: DescendantNarrationsComputer = new DescendantNarrationsComputer();
let narrationTexts: Record<string, string> = {};

export type ReaderTextProps = {
  selector: string;
};

export const ReaderText: React.FunctionComponent<ReaderTextProps> = ({ selector }) => {
  const ref = React.useRef<HTMLElement>();
  const [narrationText, setNarrationText] = React.useState('');
  const [narrationPath, setNarrationPath] = React.useState('');
  const [narrationPaths, setNarrationPaths] = React.useState([]);

  React.useEffect(() => {
    if (ref.current) {
      // Begin if 1
      const element = ref.current.ownerDocument.querySelector(selector) as IAriaElement;

      // Compute and store the narrations for the element and its Tab reachable descendants
      computer.compute(element, 'Win/JAWS').then(narrations => {
        const paths: string[] = [];
        narrationTexts = {};
        narrations.forEach(narration => {
          // Begin forEach 1
          const path = narration.path.join(' > ');
          paths.push(path);
          narrationTexts[path] = narration.text;
        }); // End forEach 1

        // Update the narration paths dropdown values
        setNarrationPaths(paths);

        //  Choose the first narration as the narration to be displayed
        const text = `Narration: ${narrations[0].text}`;
        setNarrationText(narrations.length > 0 ? text : undefined);
      }); // End compute
    } // End if 1
  }, [setNarrationText, setNarrationPath, setNarrationPaths, ref, selector]);

  const handleNarrationPathChange = (event: any, props: DropdownProps) => {
    setNarrationPath(props.value as string);
    const text = `Narration: ${narrationTexts[props.value as string]}`;
    setNarrationText(text);
  }; // End handleNarrationPathChange

  if (!selector) {
    return null;
  }

  return (
    <>
      Testing
      <Dropdown
        items={narrationPaths}
        defaultValue={narrationPath}
        value={narrationPath}
        onChange={handleNarrationPathChange}
        getA11ySelectionMessage={{
          onAdd: item => `${item} has been selected.`,
        }}
        aria-label="Select a descendant element"
      />
      <Ref innerRef={ref}>
        <Alert warning content={narrationText} />
      </Ref>
    </>
  );
};
