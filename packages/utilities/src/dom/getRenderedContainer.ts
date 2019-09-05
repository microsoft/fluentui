import { IPoint } from '../IPoint';
import { Rectangle } from '../Rectangle';

export function getRenderedContainer(
  content?: Element | string | MouseEvent | IPoint | null | React.RefObject<Element>,
  possibleContainers?: DOMRect[] | ClientRect[]
): DOMRect | ClientRect | undefined {
  if (!content || !possibleContainers || possibleContainers.length <= 0) {
    return undefined;
  }

  let contentRect: DOMRect | ClientRect | Rectangle;

  if ((content as MouseEvent).preventDefault) {
    const ev = content as MouseEvent;
    contentRect = new Rectangle(ev.clientX, ev.clientX, ev.clientY, ev.clientY);
  } else if ((content as Element).getBoundingClientRect) {
    contentRect = (content as Element).getBoundingClientRect();
  } else if (content as IPoint) {
    const point: IPoint = content as IPoint;
    contentRect = new Rectangle(point.x, point.x, point.y, point.y);
  } else {
    return undefined;
  }

  return (
    possibleContainers &&
    possibleContainers.find((possibleContainerRect: DOMRect | ClientRect) => {
      return (
        contentRect.left >= possibleContainerRect.left &&
        contentRect.top >= possibleContainerRect.top &&
        contentRect.right <= possibleContainerRect.left + possibleContainerRect.width &&
        contentRect.bottom <= possibleContainerRect.top + possibleContainerRect.height
      );
    })
  );
}
