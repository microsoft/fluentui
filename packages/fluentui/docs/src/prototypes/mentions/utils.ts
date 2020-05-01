const getRangeAtCursorPosition = () => {
  if (!window.getSelection) {
    return null;
  }

  const sel = window.getSelection();
  if (!sel.getRangeAt || !sel.rangeCount) {
    return null;
  }

  return sel.getRangeAt(0);
};

export const insertSpanAtCursorPosition = (id: string) => {
  if (!id) {
    throw '[insertSpanAtCursorPosition]: id must be supplied';
  }

  const range = getRangeAtCursorPosition();
  if (!range) {
    return null;
  }

  const elem = document.createElement('span');
  elem.id = id;
  range.insertNode(elem);

  return elem;
};

export const insertTextAtCursorPosition = (text: string) => {
  if (!text) {
    return null;
  }

  const range = getRangeAtCursorPosition();
  if (!range) {
    return null;
  }

  const textNode = document.createTextNode(text);
  range.insertNode(textNode);
  range.setStartAfter(textNode);

  return textNode;
};

export const removeElement = (element: string | HTMLElement): HTMLElement => {
  const elementToRemove = typeof element === 'string' ? document.getElementById(element) : element;
  return elementToRemove.parentNode.removeChild(elementToRemove);
};
