// eslint-disable-next-line import/no-extraneous-dependencies -- story-only helper outside the *.stories.tsx devDependencies exemption
import * as React from 'react';

const appearances = ['default', 'subtle'] as const;

const roots = [
  { key: 'anchor', props: { href: 'https://example.com' } },
  { key: 'anchor-no-href', props: { as: 'a' as const } },
  { key: 'button', props: {} },
  { key: 'span', props: { as: 'span' as const } },
];

const states = [
  { key: 'enabled', props: {} },
  { key: 'disabled', props: { disabled: true } },
  { key: 'disabled-focusable', props: { disabledFocusable: true } },
];

const inlines = [false, true] as const;

type LinkLike = React.ComponentType<{
  appearance?: (typeof appearances)[number];
  inline?: boolean;
  disabled?: boolean;
  disabledFocusable?: boolean;
  href?: string;
  as?: 'a' | 'button' | 'span';
  children?: React.ReactNode;
}>;

const BASE_FONT_FAMILY =
  "'Segoe UI', 'Segoe UI Web (West European)', -apple-system, BlinkMacSystemFont, Roboto, 'Helvetica Neue', sans-serif";

const cellStyle: React.CSSProperties = { display: 'inline-block', width: 170 };

/**
 * fontFamily/fontSize/lineHeight/color are inherited by Link (it sets no line-height, and an
 * anchor with an href takes `font-size: inherit`); the scene supplies them identically on both
 * sides so the row's inherited values are fixed here rather than by either provider. Rows are
 * plain blocks, never flex: a flex parent would blockify the Link and hide its own
 * `display: inline`.
 */
export const LinkVrScene = ({ Link }: { Link: LinkLike }): React.ReactNode => (
  <div
    style={{
      display: 'inline-block',
      padding: 24,
      background: '#ffffff',
      color: '#242424',
      fontFamily: BASE_FONT_FAMILY,
      fontSize: 14,
      lineHeight: '20px',
    }}
  >
    {roots.map(root =>
      appearances.map(appearance => (
        <div key={`${root.key}-${appearance}`}>
          {states.map(state =>
            inlines.map(inline => (
              <span key={`${state.key}-${inline}`} style={cellStyle}>
                <Link {...root.props} {...state.props} appearance={appearance} inline={inline}>
                  {root.key} {appearance}
                </Link>
              </span>
            )),
          )}
        </div>
      )),
    )}

    {/* The only place `font-size: inherit` on an anchor-with-href is observable. */}
    <div style={{ fontSize: 20, lineHeight: '28px' }}>
      {roots.map(root => (
        <span key={`inherit-${root.key}`} style={cellStyle}>
          <Link {...root.props}>{root.key}</Link>
        </span>
      ))}
    </div>

    <div style={{ maxWidth: 520 }}>
      Running text around{' '}
      <Link inline href="https://example.com">
        an inline link
      </Link>
      , then{' '}
      <Link inline appearance="subtle" href="https://example.com">
        a subtle one
      </Link>{' '}
      and finally{' '}
      <Link inline disabled href="https://example.com">
        a disabled one
      </Link>{' '}
      to close the sentence.
    </div>
  </div>
);
