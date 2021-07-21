/**
 * Gets the current position or dimension from a specified style attribute.
 *
 * @param styleAttribute
 */
export const getSlotStyles = (styleAttribute: string) => {
  return (value: number) => {
    return {
      [styleAttribute]: `${value}%`,
    };
  };
};
