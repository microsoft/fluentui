// eslint-disable-next-line import/no-extraneous-dependencies -- story-only helper outside the *.stories.tsx devDependencies exemption
import * as React from 'react';

const appearances = ['outline', 'filled-darker', 'filled-lighter'] as const;
const sizes = ['small', 'medium', 'large'] as const;
const resizes = ['none', 'horizontal', 'vertical', 'both'] as const;

type TextareaLike = React.ComponentType<{
  appearance?: (typeof appearances)[number];
  size?: (typeof sizes)[number];
  resize?: (typeof resizes)[number];
  disabled?: boolean;
  defaultValue?: string;
  placeholder?: string;
  'aria-invalid'?: boolean;
  rows?: number;
}>;

const row: React.CSSProperties = { display: 'flex', gap: 8, alignItems: 'flex-start' };

const LONG = Array.from({ length: 20 }, (_, index) => `Line ${index + 1} of a value that overflows`).join('\n');

/** No cell is focused, so the focus underline sits at scaleX(0) in all 42 enabled ones. */
export const TextareaVrScene = ({ Textarea }: { Textarea: TextareaLike }): React.ReactNode => {
  const appearanceBand = (key: string, props: (size: (typeof sizes)[number]) => React.ComponentProps<TextareaLike>) =>
    sizes.map(size => (
      <div key={`${key}-${size}`} style={row}>
        {appearances.map(appearance => (
          <Textarea key={appearance} appearance={appearance} size={size} {...props(size)} />
        ))}
      </div>
    ));

  return (
    <div style={{ display: 'inline-flex', flexDirection: 'column', gap: 16, padding: 24, background: '#fff' }}>
      {appearanceBand('value', () => ({ defaultValue: 'Text' }))}
      {appearanceBand('placeholder', size => ({ placeholder: `Placeholder ${size}` }))}
      {appearanceBand('disabled', () => ({ defaultValue: 'Text', disabled: true }))}
      {appearanceBand('invalid', () => ({ 'aria-invalid': true, defaultValue: 'Text' }))}
      {sizes.map(size => (
        <div key={`resize-${size}`} style={row}>
          {resizes.map(resize => (
            <Textarea key={resize} defaultValue="Text" resize={resize} size={size} />
          ))}
        </div>
      ))}
      <div style={row}>
        {sizes.map(size => (
          <Textarea key={size} disabled placeholder="Placeholder" size={size} />
        ))}
      </div>
      <div style={row}>
        {sizes.map(size => (
          <Textarea key={size} defaultValue={LONG} rows={20} size={size} />
        ))}
      </div>
      <div style={row}>
        {sizes.map(size => (
          <Textarea key={size} defaultValue="Text" disabled resize="both" size={size} />
        ))}
      </div>
    </div>
  );
};
