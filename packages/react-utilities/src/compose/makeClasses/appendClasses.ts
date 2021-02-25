export function appendClasses(...classes: string[]) {
  let result = '';
  for (const className of classes) {
    if (className) {
      result = (result ? `${result} ` : '') + className;
    }
  }

  return result;
}
