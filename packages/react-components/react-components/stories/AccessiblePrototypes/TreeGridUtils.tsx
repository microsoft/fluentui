let narrateTimeout;

export const srNarrate = (message: string, priority = 'polite') => {
  const element = document.createElement('div');
  element.setAttribute(
    'style',
    'position: absolute; left: -10000px; top: auto; width: 1px; height: 1px; overflow: hidden;',
  );
  element.setAttribute('aria-live', priority);
  document.body.appendChild(element);

  narrateTimeout = setTimeout(() => {
    element.innerText = message;
  }, 800);

  setTimeout(() => {
    document.body.removeChild(element);
  }, 1100);
};

export const getNearestGridCellAncestorOrSelf = (element: HTMLElement) => {
  while (element.role !== 'gridcell') {
    if (element === document.body) {
      return undefined;
    }
    element = element.parentElement as HTMLElement;
  }
  return element;
};

export const getNearestRowAncestor = (element: HTMLElement) => {
  let parent = element.parentElement as HTMLElement;
  while (parent.role !== 'row') {
    parent = parent.parentElement as HTMLElement;
  }
  return parent;
};

export const getFirstCellChild = (element: HTMLElement) => {
  return element?.querySelectorAll('[role="gridcell"]')[0] as HTMLElement;
};

export const getFirstActiveElementInVerticalNavigation = (originCell: HTMLElement, targetRow: HTMLElement) => {
  let columnNumber = 1;
  let cell = originCell;
  while (cell) {
    if (cell.previousElementSibling && cell.previousElementSibling.role === 'gridcell') {
      columnNumber += 1;
    }
    cell = cell.previousElementSibling as HTMLElement;
  }
  let targetCell = targetRow.querySelector('[role="gridcell"]') as HTMLElement;
  for (let i = 1; i < columnNumber; i++) {
    if (targetCell.nextElementSibling) {
      targetCell = targetCell.nextElementSibling as HTMLElement;
    }
  }
  const firstActiveElement = targetCell.querySelector('button');
  return firstActiveElement;
};

export const getNextOrPrevFocusable = (
  row: HTMLElement,
  current: HTMLElement | undefined,
  direction: 'next' | 'prev',
): HTMLElement | undefined => {
  const focusables = Array.from(row.querySelectorAll('a, button, input, select, [tabindex="0"]')).filter(focusable => {
    return !focusable.getAttribute('data-tabster-dummy');
  });
  if (!current && focusables.length >= 1) {
    return focusables[0] as HTMLElement;
  }
  let result;
  focusables.forEach((focusable, index) => {
    if (focusable === current) {
      if (direction === 'next' && index + 1 < focusables.length) {
        result = focusables[index + 1];
      } else if (direction === 'prev' && index > 0) {
        result = focusables[index - 1];
      }
      return;
    }
  });
  return result;
};
