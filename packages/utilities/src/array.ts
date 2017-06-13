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

export function createArray(size: number, getItem: (index?: number) => any) {
  let array = [];

  for (let i = 0; i < size; i++) {
    array.push(getItem(i));
  }

  return array;
}
