export function hrToSeconds(hrtime: ReturnType<typeof process.hrtime>): string {
  const raw = hrtime[0] + hrtime[1] / 1e9;

  return raw.toFixed(2) + 's';
}
