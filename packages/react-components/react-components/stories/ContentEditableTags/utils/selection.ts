import { useFluent } from '@fluentui/react-components';

export const useCaretPosition = () => {
  const { targetDocument } = useFluent();

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
  return { getCaretPosition };
};
