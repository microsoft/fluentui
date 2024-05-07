import { useFluent } from '@fluentui/react-components';

export const useCaretPosition = () => {
  const { targetDocument } = useFluent();

  const overrideSelection = (element: HTMLElement | null, direction: string) => {
    const win = targetDocument?.defaultView;
    if (!win || element === null) {
      return false;
    }
    const selection = win.getSelection();
    if (!selection || selection.rangeCount === 0) {
      return false;
    }
    const range = selection.getRangeAt(0);

    if (direction === 'Left') {
      // Override the left boundary of selection
      const startContainer = range.startContainer;
      const startOffset = range.startOffset;
      const startParent = startContainer.parentNode as HTMLElement;
      if (startParent?.classList.contains('pickedItem') && startOffset !== 0) {
        range.setStart(startContainer, 0);
        return true;
      }
    } else if (direction === 'Right') {
      // Override the right boundary of selection
      const endContainer = range.endContainer;
      const endOffset = range.endOffset;
      const endParent = endContainer.parentNode as HTMLElement;
      // const prevSibling = endParent.previousSibling;
      const endContainerRange = range.cloneRange();
      endContainerRange.selectNodeContents(endContainer);
      const nextSibling = endContainer.nextSibling;
      if (nextSibling && endParent?.classList.contains('pickerInput') && endOffset === endContainerRange.endOffset) {
        // alert(endOffset);
        const nextSiblingRange = range.cloneRange();
        nextSiblingRange.selectNodeContents(nextSibling);
        range.setEnd(nextSiblingRange.endContainer, nextSiblingRange.endOffset);
        return true;
      }
    }
  };

  const getCaretPosition = (element: HTMLElement) => {
    const win = targetDocument?.defaultView;
    if (!win) {
      return 0;
    }
    const sel = win.getSelection();
    if (!sel || sel.rangeCount === 0) {
      return 0;
    }
    const range = sel.getRangeAt(0);
    const preCaretRange = range.cloneRange();
    preCaretRange.selectNodeContents(element);
    preCaretRange.setEnd(range.endContainer, range.endOffset);
    const caretOffset = preCaretRange.toString().length;
    return caretOffset;
  };
  return {
    overrideSelection,
    getCaretPosition,
  };
};
