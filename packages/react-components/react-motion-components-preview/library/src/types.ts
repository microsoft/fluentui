// import { PresenceDirection } from '@fluentui/react-motion';

// type DurationMS = number;
// type EasingString = string;

// /** Standard parameters for all presence transitions. */
// export type PresenceOverrideFields = { duration: DurationMS; easing: EasingString };

// /**
//  * Override properties for presence transitions.
//  *
//  * @example <caption>Override duration for all transitions</caption>
//  * ```
//  * const override: PresenceOverride = {
//  *  all: { duration: 1000 },
//  * };
//  * ```
//  *
//  * @example <caption>Override easing for exit transition</caption>
//  * ```
//  * const override: PresenceOverride = {
//  *  exit: { easing: 'ease-out' },
//  * };
//  * ```
//  */
// export type PresenceOverride<CustomOverrideFields extends Record<string, string | number |> = {}> = {
//   /** Override supplied properties (e.g. duration) for all transitions, i.e. the `enter` and `exit` atoms.  */
//   all?: Partial<PresenceOverrideFields & CustomOverrideFields>;
// } & {
//   /** Override properties in specific transitions, e.g. change duration for `exit` only. */
//   [transition in PresenceDirection]?: Partial<PresenceOverrideFields & CustomOverrideFields>;
// };
