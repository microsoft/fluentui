import { parent, after } from 'glamor';

export function createFocusBorder(
  color: string = 'black',
  insetSize: string = '0px',
  parentPosition: string = 'relative'): Object {

  return {
    position: parentPosition,

    ":focus": {
      ...(parent('.ms-Fabric.is-focusVisible', {
        ...(after({
          content: '""',
          position: 'absolute',
          left: insetSize,
          top: insetSize,
          right: insetSize,
          bottom: insetSize,
          border: '1px solid ' + color
        }))
      }))
    }
  };
}

