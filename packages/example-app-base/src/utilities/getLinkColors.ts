import { IRawStyle } from '@fluentui/react';

/**
 * Gets a style which should be specific enough to override the UHF link styles.
 * This should be applied to the root of a Link.
 * @param rest - Color to use in default/rest state
 * @param hover - Color to use in hover/active state
 * @param focus - Color to use in focus state (defaults to `rest`)
 */
export function getLinkColors(rest: string, hover: string, focus?: string): IRawStyle {
  return {
    selectors: {
      // Be specific to override UHF styles
      '& a.ms-Link': {
        color: rest,
        selectors: {
          '&:link': {
            color: rest,
          },
          '&:active, &:hover, &:active:hover': {
            color: hover,
          },
          '&:focus': {
            color: focus || rest,
          },
        },
      },
    },
  };
}
