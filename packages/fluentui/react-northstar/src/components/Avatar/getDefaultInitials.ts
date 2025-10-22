export function getDefaultInitials(name: string): string {
  if (!name) {
    return '';
  }

  const reducedName = name
    .replace(/\s+/g, ' ')
    .replace(/\s*\(.*?\)\s*/g, ' ')
    .replace(/\s*{.*?}\s*/g, ' ')
    .replace(/\s*\[.*?]\s*/g, ' ');

  const initials = reducedName
    .split(' ')
    .filter(item => item !== '')
    .map(item => item.charAt(0))
    .reduce((accumulator, currentValue) => accumulator + currentValue, '');

  if (initials.length > 2) {
    return initials.charAt(0) + initials.charAt(initials.length - 1);
  }
  return initials;
}
