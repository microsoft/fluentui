import * as React from 'react';
import { Alert, Ref, Dropdown, DropdownProps } from '@fluentui/react-northstar';
import { IAriaElement } from './../narration/NarrationComputer';
import { DescendantsNarrationsComputer } from './../narration/DescendantsNarrationsComputer';

const computer = new DescendantsNarrationsComputer();
let narrationPath = null;
let narrationPaths = [];
let narrationTexts = {};
const aomMissing = !(window as any).getComputedAccessibleNode;

export type ReaderNarrationProps = {
  selector: string;
  inUseMode: boolean;
};

export const ReaderNarration: React.FunctionComponent<ReaderNarrationProps> = ({ selector, inUseMode }) => {
  const ref = React.useRef<HTMLElement>();
  const [selectedNarrationPath, setSelectedNarrationPath] = React.useState(null);
  const [narrationText, setNarrationText] = React.useState('');

  // Computes and saves the narration paths and texts for the given parent element and its focusable descendants
  const computeAndSave = React.useCallback(element => {
    computer.compute(element, 'Win/JAWS').then(narrations => {
      narrationPaths = [];
      narrationTexts = {};
      narrations.forEach(narration => {
        // Begin forEach 1
        const path = narration.path.join(' > ');
        narrationPaths.push(path);
        narrationTexts[path] = narration.text;
      }); // End forEach 1

      // If narration path has not been selected by user, preselect the first path and its associated narration as defaults
      const text = narrationPath == null ? narrations[0]?.text || null : narrationTexts[narrationPath];
      if (narrationPath == null && narrationPaths.length > 1) {
        // Begin if 1
        setSelectedNarrationPath(narrationPaths[0]);
      } // End if 1

      setCompleteText(text);
    }); // End compute
  }, []); // End computeAndSave

  // Sets the complete screen reader narration text to be displayed.
  const setCompleteText = text => {
    setNarrationText(text !== null ? `Narration: ${text}` : null);
  }; // End setCompleteText

  // Handles the "focusin" event by computing and saving the narration paths and texts.
  const handleFocusIn = React.useCallback(
    event => {
      computeAndSave(event.target as IAriaElement);
    },
    [computeAndSave],
  ); // End handleFocusIn

  // Handles the narration path dropdown change event by saving the narration path.
  const handleNarrationPathChange = (event: any, props: DropdownProps) => {
    narrationPath = props.value as string;
    setSelectedNarrationPath(narrationPath);
    const text = narrationTexts[narrationPath];
    setCompleteText(text);
  }; // End handleNarrationPathChange

  // Recomputes the narration paths and texts upon every render.
  React.useEffect(() => {
    if (inUseMode || !ref.current || aomMissing) {
      return;
    }

    // Compute and save the narration paths and texts for the selected component's parent element and its focusable descendants
    const element = ref.current.ownerDocument.querySelector(selector) as IAriaElement;
    computeAndSave(element);
  }); // End useEffect

  // Resets the narration path to its defaults if selector changes.
  React.useEffect(() => {
    narrationPath = null;
  }, [selector]); // End useEffect

  // If in the use mode, sets up the "focusin" event listener.
  React.useEffect(() => {
    const alert = ref.current;
    if (!inUseMode || !alert) {
      return null;
    }
    alert.ownerDocument.addEventListener('focusin', handleFocusIn);
    return () => {
      alert.ownerDocument.removeEventListener('focusin', handleFocusIn);
    }; // End return
  }, [inUseMode, handleFocusIn]); // End useEffect

  if (selector == null && !inUseMode) {
    return null;
  }
  return (
    <>
      {narrationPaths.length > 1 && (
        <Dropdown
          items={narrationPaths}
          defaultValue={selectedNarrationPath}
          value={selectedNarrationPath}
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
          content={
            aomMissing ? (
              <>
                AOM is not available.{' '}
                <a target="_blank" href="http://wicg.github.io/aom/caniuse.html">
                  Enable AOM
                </a>
              </>
            ) : narrationText !== null ? (
              narrationText
            ) : (
              'The selected component has no focusable elements.'
            )
          }
        />
      </Ref>
    </>
  );
};
