export const getNextSuggestionIndex = <T>(suggestions: T[], currentIndex: number): number => {
  if (suggestions && suggestions.length) {
    if (currentIndex < suggestions.length - 1) {
      return currentIndex + 1;
    } else if (currentIndex === suggestions.length - 1) {
      return 0;
    }
  }

  return -1;
};
