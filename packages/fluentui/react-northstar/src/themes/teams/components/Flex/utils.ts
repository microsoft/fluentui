export const toFlexAlignment = (propValue: string) => {
  const trimmedValue = propValue.trim();

  if (trimmedValue === 'start' || trimmedValue === 'end') {
    return `flex-${trimmedValue}`;
  }

  return trimmedValue;
};

export const toFlexItemSizeValues = (sizeValue: string) => ({
  flexBasis: sizeValue,
});
