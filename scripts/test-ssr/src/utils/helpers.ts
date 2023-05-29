export function hrToSeconds(hrtime: ReturnType<typeof process.hrtime>): string {
  const raw = hrtime[0] + hrtime[1] / 1e9;

  return raw.toFixed(2) + 's';
}

export function containsAriaDescriptionWarning(message: string): boolean {
  return message.startsWith(
    'Warning: Invalid aria prop %s on <%s> tag. For details, see https://reactjs.org/link/invalid-aria-props%s `aria-description`',
  );
}
