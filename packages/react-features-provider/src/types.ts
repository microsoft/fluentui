export interface Features {
  /**
   * Features go here. Please document them well:
   *
   * Describe what the feature enables and where it's used.
   * Outline the owner of the flag and when its expected to be on by default or removed.
   *
   * Feature flags should have a limited lifetime and should be reserved for risky features that
   * need to be validated before becoming the default behavior. Options logic adds risk
   * and code debt, so please reserve using feature flags only when needed.
   *
   * Naming guide:
   *
   * 1. Name things assuming the default is "false".
   * 2. It's better to be descriptive than vague.
   * 3. Try to ensure the name includes the component or scenario in it.
   * 4. Don't get too wordy.
   * 5. Use camelCase.
   * 6. Add descriptive comments.
   *
   * Examples of good feature flag names:
   *
   * enableAriaHiddenForModals
   * disableFocusZoneFocusRestoration
   *
   * Bad:
   *
   * ariaHidden - not explicit about anything unclear if setting it will enable or disable a feature.
   * focusZoneRestoreFocus - clear it is FocusZone related, unclear if it's enabling or disabling something.
   **/
}
