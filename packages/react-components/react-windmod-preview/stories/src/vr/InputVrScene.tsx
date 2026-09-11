// eslint-disable-next-line import/no-extraneous-dependencies -- story-only helper outside the *.stories.tsx devDependencies exemption
import * as React from 'react';

const appearances = ['outline', 'underline', 'filled-darker', 'filled-lighter'] as const;
const sizes = ['small', 'medium', 'large'] as const;

type InputLike = React.ComponentType<{
  appearance?: (typeof appearances)[number];
  size?: (typeof sizes)[number];
  disabled?: boolean;
  value?: string;
  placeholder?: string;
  'aria-invalid'?: boolean;
  contentBefore?: React.ReactElement;
  contentAfter?: React.ReactElement;
  root?: { style?: React.CSSProperties };
}>;

const row: React.CSSProperties = { display: 'flex', gap: 8, alignItems: 'center' };

const LONG = 'A very long single line of text that cannot fit';

/** No cell is focused, so the focus underline sits at scaleX(0) in all 93 of them. */
export const InputVrScene = ({ Input, Icon }: { Input: InputLike; Icon: React.ComponentType }): React.ReactNode => {
  const band = (key: string, props: (size: (typeof sizes)[number]) => React.ComponentProps<InputLike>) =>
    sizes.map(size => (
      <div key={`${key}-${size}`} style={row}>
        {appearances.map(appearance => (
          <Input key={appearance} appearance={appearance} size={size} {...props(size)} />
        ))}
      </div>
    ));

  return (
    <div style={{ display: 'inline-flex', flexDirection: 'column', gap: 16, padding: 24, background: '#fff' }}>
      {band('value', () => ({ value: 'Text' }))}
      {band('placeholder', size => ({ placeholder: `Placeholder ${size}` }))}
      {band('disabled', () => ({ disabled: true, value: 'Text' }))}
      {band('invalid', () => ({ 'aria-invalid': true, value: 'Text' }))}
      {band('before', () => ({ contentBefore: <Icon />, value: 'Text' }))}
      {band('after', () => ({ contentAfter: <Icon />, value: 'Text' }))}
      {band('both', () => ({ contentBefore: <Icon />, contentAfter: <Icon />, value: 'Text' }))}
      <div style={row}>
        {sizes.map(size => (
          <Input
            key={size}
            size={size}
            disabled
            placeholder="Placeholder"
            contentBefore={<Icon />}
            contentAfter={<Icon />}
          />
        ))}
      </div>
      <div style={row}>
        {sizes.map(size => (
          <Input key={size} size={size} value={LONG} root={{ style: { width: 160 } }} />
        ))}
      </div>
      <div style={row}>
        {sizes.map(size => (
          <Input
            key={size}
            size={size}
            value={LONG}
            contentBefore={<Icon />}
            contentAfter={<Icon />}
            root={{ style: { width: 160 } }}
          />
        ))}
      </div>
    </div>
  );
};
