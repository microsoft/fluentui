interface ISelectionLayout {
  getItemIndexAbove(focusIndex: number): number;
  getItemIndexBelow(focusIndex: number): number;
  getItemIndexLeft(focusIndex: number): number;
  getItemIndexRight(focusIndex: number): number;
}

export default ISelectionLayout;
