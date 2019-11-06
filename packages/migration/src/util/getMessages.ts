export function getWarningNote(message?: string): string {
  return `[Warn]: ${message}. Manual changes required to the following files:`;
}

export function getModificationNote(message?: string): string {
  return `${message}. Following files would be modified if in write mode:`;
}
