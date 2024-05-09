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
      const endContainreNextSiblingRange = range.cloneRange();
      endContainreNextSiblingRange.selectNodeContents(endContainerNextSibling);
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
    getCaretPosition,
  };
};
