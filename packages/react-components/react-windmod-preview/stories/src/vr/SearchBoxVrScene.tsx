// eslint-disable-next-line import/no-extraneous-dependencies -- story-only helper outside the *.stories.tsx devDependencies exemption
import * as React from 'react';

const appearances = ['outline', 'underline', 'filled-darker', 'filled-lighter'] as const;
const sizes = ['small', 'medium', 'large'] as const;

type SearchBoxLike = React.ComponentType<{
  appearance?: (typeof appearances)[number];
  size?: (typeof sizes)[number];
  disabled?: boolean;
  defaultValue?: string;
  placeholder?: string;
  'aria-invalid'?: boolean;
  contentBefore?: React.ReactElement | null;
  contentAfter?: React.ReactElement | null;
  input?: { autoFocus?: boolean };
  root?: { style?: React.CSSProperties };
}>;

const row: React.CSSProperties = { display: 'flex', gap: 8, alignItems: 'center' };

const LONG = 'A very long single line of text that cannot fit';

/**
 * Exactly one cell is focused, and it is rendered last: a second autoFocus would steal focus from
 * the first and leave the focused branch uncaptured.
 */
export const SearchBoxVrScene = ({
  SearchBox,
  Icon,
}: {
  SearchBox: SearchBoxLike;
  Icon: React.ComponentType;
}): React.ReactNode => {
  const band = (key: string, props: (size: (typeof sizes)[number]) => React.ComponentProps<SearchBoxLike>) =>
    sizes.map(size => (
      <div key={`${key}-${size}`} style={row}>
        {appearances.map(appearance => (
          <SearchBox key={appearance} appearance={appearance} size={size} {...props(size)} />
        ))}
      </div>
    ));

  const sizeRow = (key: string, props: (size: (typeof sizes)[number]) => React.ComponentProps<SearchBoxLike>) => (
    <div key={key} style={row}>
      {sizes.map(size => (
        <SearchBox key={size} size={size} {...props(size)} />
      ))}
    </div>
  );

  return (
    <div style={{ display: 'inline-flex', flexDirection: 'column', gap: 16, padding: 24, background: '#fff' }}>
      {band('value', () => ({ defaultValue: 'Search text' }))}
      {band('placeholder', size => ({ placeholder: `Placeholder ${size}` }))}
      {band('disabled', () => ({ disabled: true, defaultValue: 'Search text' }))}
      {band('invalid', () => ({ 'aria-invalid': true, defaultValue: 'Search text' }))}
      {band('disabled-invalid', () => ({ disabled: true, 'aria-invalid': true, defaultValue: 'Search text' }))}
      {sizeRow('no-before', () => ({ contentBefore: null, defaultValue: 'Search text' }))}
      {sizeRow('custom-before', () => ({ contentBefore: <Icon />, defaultValue: 'Search text' }))}
      {sizeRow('no-after', () => ({ contentAfter: null, defaultValue: 'Search text' }))}
      {sizeRow('narrow', () => ({ defaultValue: LONG, root: { style: { width: 160 } } }))}
      <div style={row}>
        <SearchBox defaultValue="Search text" root={{ style: { width: 600 } }} />
      </div>
      <div style={row}>
        <SearchBox defaultValue="Search text" input={{ autoFocus: true }} />
      </div>
    </div>
  );
};
