export function copyToClipboard(copyText: string): void {
  const copyInput = document.createElement('input') as HTMLInputElement;
  document.body.appendChild(copyInput);

  try {
    // Try to copy the text directly to the clipboard
    copyInput.value = copyText;
    copyInput.select();
    if (!document.execCommand('copy')) {
      // The command failed. Fallback to the method below.
      throw new Error();
    }
  } catch (err) {
    // no op
  } finally {
    document.body.removeChild(copyInput);
  }
}
