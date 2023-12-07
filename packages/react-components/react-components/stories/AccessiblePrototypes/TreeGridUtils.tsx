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
  // alert(columnNumber);
  let targetCell = targetRow.querySelector('[role="gridcell"]') as HTMLElement;
  for (let i = 1; i < columnNumber; i++) {
    if (targetCell.nextElementSibling) {
      targetCell = targetCell.nextElementSibling as HTMLElement;
    }
  }
  const firstActiveElement = targetCell.querySelector('button');
  // alert(firstActiveElement?.innerText);
  return firstActiveElement;
};
