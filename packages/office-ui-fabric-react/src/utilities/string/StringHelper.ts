// Regex that finds {#} so it can be replaced by the arguments in string format
const FORMAT_REGEX = /\{(\d+)\}/g;

/**
 * String Format is like C# string format. Usage Example: "hello {0}!".format("world")
 * will return "hello world". Calling format on a string with less arguments than
 * specified in the format will substitute "undefined"
 */
export function format(template: string | undefined, ...values: any[]): string {
  if (template) {
    return template.replace(FORMAT_REGEX, (match: string, valueIndex: any) => {
      const value = values[valueIndex];
      return value;
    });
  }
  return '';
}