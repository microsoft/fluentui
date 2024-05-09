import { useFluent } from '@fluentui/react-components';

export const useCaretManipulation = () => {
  const { targetDocument } = useFluent();

  const getRange = (element: HTMLElement | null) => {
    const win = targetDocument?.defaultView;
    if (!win || element === null) {
      return null;
    }
    const selection = win.getSelection();
    if (!selection || selection.rangeCount === 0) {
      return null;
    }
    const range = selection.getRangeAt(0);
    return range;
  };

  const overrideLeftArrow = (element: HTMLElement | null) => {
    const range = getRange(element);
    if (range === null) {
      return false;
    }
    const startContainer = range.startContainer;
    const startOffset = range.startOffset;
    const startParent = startContainer.parentNode as HTMLElement;
    if (startParent?.classList.contains('pickedItem') && startOffset !== 0) {
      range.setStart(startContainer, 0);
      return true;
    }
    return false;
  };

  const overrideRightArrow = (element: HTMLElement | null) => {
    const range = getRange(element);
    if (range === null) {
      return false;
    }
    const endContainer = range.endContainer;
    const startOffset = range.startOffset;
    const endOffset = range.endOffset;
    const endParent = endContainer.parentNode as HTMLElement;
    const endContainerRange = range.cloneRange();
    endContainerRange.selectNodeContents(endContainer);
    const endContainerNextSibling = endContainer.nextSibling as HTMLElement;
    const isTextEndRightBeforeItem =
      endContainerNextSibling &&
      endParent?.classList.contains('pickerInput') &&
      endOffset === endContainerRange.endOffset;
    if (isTextEndRightBeforeItem) {
      const endContainerNextSiblingText = endContainerNextSibling.firstChild as ChildNode;
      const endContainreNextSiblingRange = range.cloneRange();
      endContainreNextSiblingRange.selectNodeContents(endContainerNextSiblingText);
      range.setEnd(endContainreNextSiblingRange.endContainer, endContainreNextSiblingRange.endOffset);
      return true;
    }
    const endParentNextSibling = endParent.nextSibling as HTMLElement;
    const endParentNextSiblingText = endParentNextSibling.firstChild as ChildNode;
    const isItemEndRightBeforeItem =
      startOffset === endOffset &&
      endOffset === endContainerRange.endOffset &&
      endParent.classList.contains('pickedItem') &&
      endParentNextSibling.classList.contains('pickedItem');
    if (isItemEndRightBeforeItem) {
      const endParentNextSiblingRange = range.cloneRange();
      endParentNextSiblingRange.selectNodeContents(endParentNextSiblingText);
      // alert(endParentNextSiblingRange.endOffset);
      range.setEnd(endParentNextSiblingRange.endContainer, endParentNextSiblingRange.endOffset);
      return true;
    }
    endContainerRange.selectNodeContents(endContainer);
    const isEndInsideItem = endParent?.classList.contains('pickedItem') && endOffset < endContainerRange.endOffset;
    if (isEndInsideItem) {
      range.selectNodeContents(endContainer);
      return true;
    }
  };

  const moveCaretFromItem = (element: HTMLElement | null, character: string) => {
    const range = getRange(element);
    if (range === null) {
      return false;
    }
    const startContainer = range.startContainer;
    const startOffset = range.startOffset;
    const startParent = startContainer.parentNode as HTMLElement;
    // const startContainerRange = range.cloneRange();
    // startContainerRange.selectNodeContents(startContainer);
    // const isAtItemEnd = startParent?.classList.contains('pickedItem') && startOffset === startContainerRange.endOffset;
    const isAtItemStart = startParent?.classList.contains('pickedItem') && startOffset === 0;
    if (isAtItemStart) {
      let prevSibling = startParent.previousSibling;
      let characterInserted = false;
      if (prevSibling === null || prevSibling.nodeType !== Node.TEXT_NODE) {
        prevSibling = targetDocument?.createTextNode(character) as Text;
        startParent.parentNode?.insertBefore(prevSibling, startParent);
        characterInserted = true;
      }
      const newPosition = prevSibling.toString().length;
      range.setStart(prevSibling, newPosition);
      range.setEnd(prevSibling, newPosition);
      return characterInserted;
    }
    return false;
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
    overrideLeftArrow,
    overrideRightArrow,
    moveCaretFromItem,
    getCaretPosition,
  };
};
