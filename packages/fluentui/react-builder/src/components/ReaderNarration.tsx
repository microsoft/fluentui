import * as React from 'react';
import { Alert, Dropdown, DropdownProps } from '@fluentui/react-northstar';
import { Ref } from '@fluentui/react-component-ref';
import { NarrationComputer, IAriaElement, SRNCPlatform } from './../narration/NarrationComputer';

const computer: NarrationComputer = new NarrationComputer();
let prevSelector: string = null;
let prevVcElement: HTMLElement = null;
let allowVirtualCursor: boolean = true;
let focusableElements: Record<string, IAriaElement> = {};
let elementsPaths: string[] = [];
let selectedElementPath: string = null;
let prevNarrationElement: IAriaElement = null;
const aomMissing: boolean = !window.hasOwnProperty('getComputedAccessibleNode');

export type ReaderNarrationProps = {
  vcElement: HTMLElement;
  selector: string;
  inUseMode: boolean;
};

export const ReaderNarration: React.FunctionComponent<ReaderNarrationProps> = ({ vcElement, selector, inUseMode }) => {
  const ref = React.useRef<HTMLElement>();
  const [narrationElement, setNarrationElement] = React.useState<IAriaElement>(null);
  const [narrationText, setNarrationText] = React.useState('');

  // Sets the complete screen reader narration text to be displayed.
  const setCompleteText = text => {
    setNarrationText(text !== null ? `Narration: ${text}` : null);
  }; // End setCompleteText

  // Handles the element path dropdown change event by updating the current and previous narration elements.
  const handleElementPathChange = (event: React.SyntheticEvent, props: DropdownProps) => {
    selectedElementPath = props.value as string;
    prevNarrationElement = narrationElement;
    setNarrationElement(focusableElements[selectedElementPath]);
  }; // End handleElementPathChange

  // Handles the "focusin" event by updating the current and previous narration elements.
  const handleFocusIn = React.useCallback(
    event => {
      allowVirtualCursor = false;
      prevNarrationElement = narrationElement;
      setNarrationElement(event.target as IAriaElement);
    },
    [narrationElement],
  ); // End handleFocusIn

  // Recomputes the narration text upon every render.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(() => {
    if (!ref.current || aomMissing) {
      return;
    }

    async function getFocusableElementsItems() {
      // Recompute and save the focusable elements and their paths for the tree rooted at the selector's element upon every selector change
      if (selector !== prevSelector) {
        // Begin if 1
        const element = ref.current.ownerDocument.querySelector(selector) as IAriaElement;
        const focusableElementsItems = await computer.getFocusableElements(element);
        focusableElements = {};
        elementsPaths = [];
        const pathSeparator = ' > ';
        focusableElementsItems.forEach(focusableElementItem => {
          // Begin forEach 1
          const path = focusableElementItem.path.join(pathSeparator);
          focusableElements[path] = focusableElementItem.element;
          elementsPaths.push(path);
        }); // End forEach 1
        prevNarrationElement = narrationElement;
        if (elementsPaths.length >= 1) {
          // Begin if 2
          // Preselect the path and the narration element to the first focusable element with tabindex >= 0
          const preselectedElementItem =
            focusableElementsItems.find(item => item.element.tabIndex >= 0) || focusableElementsItems[0];
          selectedElementPath = preselectedElementItem.path.join(pathSeparator);
          setNarrationElement(preselectedElementItem.element);
        } else {
          // Else if 2
          selectedElementPath = null;
          setNarrationElement(null);
        } // End if 2

        prevSelector = selector;
      } // End if 1

      // Update the current and previous narration elements upon every virtual cursor element change
      if (vcElement !== prevVcElement) {
        allowVirtualCursor = true;
        // Begin if 1
        prevNarrationElement = narrationElement;
        setNarrationElement(vcElement as IAriaElement);
        prevVcElement = vcElement;
      } // End if 1

      // The null value of the narration element means no focusable element has been found
      if (narrationElement == null) {
        // Begin if 1
        // The not null value of the previous narration element means some element has been set before
        if (prevNarrationElement != null) {
          // Begin if 2
          setCompleteText(null);
        } // End if 2
        return;
      } // End if 1

      // The following condition is a fix for the repeated narration
      if (narrationElement === prevNarrationElement) {
        // Begin if 1
        return;
      } // End if 1

      // Compute and save the narration text for the current and previous elements and platform
      const platform: SRNCPlatform = vcElement && allowVirtualCursor ? 'Win/JAWS/VPC' : 'Win/JAWS';
      computer.getNarration(narrationElement, prevNarrationElement, platform).then(text => {
        setCompleteText(text);
      }); // En getNarration
    }
    getFocusableElementsItems();
  }); // End useEffect

  // Sets up the "focusin" event listener if in the use mode.
  React.useEffect(() => {
    const alertElement = ref.current;
    if (!inUseMode || !alertElement || aomMissing) {
      return undefined;
    }
    alertElement.ownerDocument.addEventListener('focusin', handleFocusIn);
    return () => {
      alertElement.ownerDocument.removeEventListener('focusin', handleFocusIn);
    }; // End return
  }, [inUseMode, handleFocusIn]); // End useEffect

  return (
    <>
      {!inUseMode && elementsPaths.length >= 2 && (
        <Dropdown
          items={elementsPaths}
          defaultValue={selectedElementPath}
          value={selectedElementPath}
          onChange={handleElementPathChange}
          getA11ySelectionMessage={{
            onAdd: item => `${item} has been selected.`,
          }}
          placeholder="Select the narration element"
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
}; // End ReaderNarration
