import * as React from 'react';
import { Alert, Ref, Dropdown, DropdownProps } from '@fluentui/react-northstar';
import { IAriaElement } from './../narration/NarrationComputer';
import { DescendantsNarrationsComputer } from './../narration/DescendantsNarrationsComputer';

const computer: DescendantsNarrationsComputer = new DescendantsNarrationsComputer();
let narrationTexts: Record<string, string> = {};

export type ReaderNarrationProps = {
  selector: string;
};

export const ReaderNarration: React.FunctionComponent<ReaderNarrationProps> = ({ selector }) => {
  const ref = React.useRef<HTMLElement>();
  const [narrationText, setNarrationText] = React.useState('');
  const [narrationPath, setNarrationPath] = React.useState('');
  const [narrationPaths, setNarrationPaths] = React.useState([]);

  React.useEffect(() => {
    if (ref.current) {
      // Begin if 1
      const element = ref.current.ownerDocument.querySelector(selector) as IAriaElement;

      // Compute and store the narrations for the element and its focusable descendants
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

        // If some narration has been retrieved, choose the first one as the narration to be displayed
        const text = narrations[0]?.text || null;
        setCompleteText(text);
      }); // End compute
    } // End if 1
  }, [setNarrationText, setNarrationPath, setNarrationPaths, ref, selector]);

  const setCompleteText = text => {
    setNarrationText(`Narration: ${text}`);
  }; // End setCompleteText

  const handleNarrationPathChange = (event: any, props: DropdownProps) => {
    setNarrationPath(props.value as string);
    const text = narrationTexts[props.value as string];
    setCompleteText(text);
  }; // End handleNarrationPathChange

  if (!selector) {
    return null;
  }

  return (
    <>
      {narrationPaths.length > 1 && (
        <Dropdown
          items={narrationPaths}
          defaultValue={narrationPath}
          value={narrationPath}
          onChange={handleNarrationPathChange}
          getA11ySelectionMessage={{
            onAdd: item => `${item} has been selected.`,
          }}
          placeholder="Select a descendant element"
        />
      )}
      <Ref innerRef={ref}>
        <Alert
          warning
          content={narrationText !== null ? narrationText : 'The selected component has no focusable elements.'}
        />
      </Ref>
    </>
  );
};
