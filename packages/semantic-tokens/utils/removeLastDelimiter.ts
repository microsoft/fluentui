export const removeLastDelimiter = (str: string, delimiter: string) => {
  const lastIndex = str.lastIndexOf(delimiter);
  if (lastIndex === -1) {
    // Delimiter not found
    return str;
  }
  return str.substring(0, lastIndex);
};
