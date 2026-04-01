/**
 * @agentcraftworks/fluentui-theme
 *
 * Shared FluentUI brand theme for all AgentCraftworks surfaces.
 *
 * Usage in any surface:
 *
 *   import { lightTheme, darkTheme } from '../../path-to-fork/agentcraftworks';
 *   // or via npm/workspace link:
 *   import { lightTheme, darkTheme } from '@agentcraftworks/fluentui-theme';
 *
 *   <FluentProvider theme={lightTheme}>
 *     <App />
 *   </FluentProvider>
 */

// Brand ramp (16-step palette from #0C6FD1)
export { agentCraftworksBrand } from './brand.js';

// Ready-to-use themes with semantic overrides
export { lightTheme, darkTheme, highContrastTheme } from './theme.js';

// Base themes without overrides (if a surface needs to customize further)
export { agentCraftworksLightTheme, agentCraftworksDarkTheme, agentCraftworksHighContrastTheme } from './brand.js';
