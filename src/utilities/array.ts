export function findIndex(array: any[], cb: (item: any, index?: number) => boolean): number {
  let index = -1;

  for (let i = 0; array && i < array.length; i++) {
    if (cb(array[i], i)) {
      index = i;
      break;
    }
  }

  return index;
}
