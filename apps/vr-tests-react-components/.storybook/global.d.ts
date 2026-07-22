/**
 * Global type augmentations for VRT readiness signalling.
 * Set by preview.js decorators; consumed by the StoryWright patch.
 */
interface Window {
  __fluentVrtReady__: boolean | undefined;
}
