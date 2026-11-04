// Leaving a Tabster root can dispatch multiple movefocus events before the same native keydown
// reaches React. Track the native event identity so selecting the active option happens only once.
// Weak references avoid retaining completed keyboard events.
const handledTabKeyEvents = new WeakSet<KeyboardEvent>();

export function isTabKeyEventHandled(nativeEvent: KeyboardEvent | undefined): boolean {
  return !!nativeEvent && handledTabKeyEvents.has(nativeEvent);
}

export function markTabKeyEventHandled(nativeEvent: KeyboardEvent | undefined): void {
  if (nativeEvent) {
    handledTabKeyEvents.add(nativeEvent);
  }
}
