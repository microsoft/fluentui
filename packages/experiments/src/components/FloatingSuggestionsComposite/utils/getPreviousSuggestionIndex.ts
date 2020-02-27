export const getPreviousSuggestionIndex = <T>(suggestions: T[], currentIndex: number): number => {
  if (suggestions && suggestions.length) {
    if (currentIndex > 0) {
      return currentIndex - 1;
    } else if (currentIndex === 0) {
      return suggestions.length - 1;
    }
  }

  return -1;
};
