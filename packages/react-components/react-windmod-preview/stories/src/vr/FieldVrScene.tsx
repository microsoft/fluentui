// eslint-disable-next-line import/no-extraneous-dependencies -- story-only helper outside the *.stories.tsx devDependencies exemption
import * as React from 'react';

const orientations = ['vertical', 'horizontal'] as const;
const sizes = ['small', 'medium', 'large'] as const;

type FieldLike = React.ComponentType<{
  children?: React.ReactNode;
  hint?: string;
  label?: string;
  orientation?: (typeof orientations)[number];
  required?: boolean;
  size?: (typeof sizes)[number];
  style?: React.CSSProperties;
  validationMessage?: string;
  validationState?: 'error' | 'warning' | 'success' | 'none';
}>;

type InputLike = React.ComponentType<Record<string, never>>;

const row: React.CSSProperties = { display: 'flex', gap: 24, alignItems: 'flex-start' };

const LONG_LABEL = 'A label long enough to wrap inside a constrained field';
const LONG_MESSAGE = 'A validation message long enough to wrap onto a second line inside the field';

/**
 * The control in bands 1-9 is a fixed inline-styled box, identical markup on both sides, so the
 * only variance in those cells belongs to Field. Band 10 swaps in a real Input and is medium-only:
 * a windmod control takes its size from its own prop, where a Griffel control also reads the field
 * context, so small and large disagree on control height and font size by design.
 */
export const FieldVrScene = ({ Field, Input }: { Field: FieldLike; Input: InputLike }): React.ReactNode => {
  const Box = () => (
    <div style={{ boxSizing: 'border-box', width: 200, height: 32, border: '1px solid #999', background: '#fff' }} />
  );

  const band = (key: string, props: React.ComponentProps<FieldLike>) => (
    <div key={key} style={row}>
      {orientations.map(orientation =>
        sizes.map(size => (
          <Field key={`${orientation}-${size}`} orientation={orientation} size={size} {...props}>
            <Box />
          </Field>
        )),
      )}
    </div>
  );

  return (
    <div style={{ display: 'inline-flex', flexDirection: 'column', gap: 24, padding: 24, background: '#fff' }}>
      {band('resting', { label: 'Label' })}
      {band('required', { label: 'Label', required: true })}
      {band('error', { label: 'Label', validationMessage: 'Validation message' })}
      {band('warning', { label: 'Label', validationMessage: 'Validation message', validationState: 'warning' })}
      {band('success', { label: 'Label', validationMessage: 'Validation message', validationState: 'success' })}
      {band('none', { label: 'Label', validationMessage: 'Validation message', validationState: 'none' })}
      {band('hint', { hint: 'Hint text', label: 'Label' })}
      {band('everything', {
        hint: 'Hint text',
        label: 'Label',
        required: true,
        validationMessage: 'Validation message',
      })}
      {band('no-label', { validationMessage: 'Validation message' })}
      <div style={row}>
        {orientations.map(orientation => (
          <React.Fragment key={orientation}>
            <Field label="Label" orientation={orientation} size="medium">
              <Input />
            </Field>
            <Field label="Label" orientation={orientation} size="medium" validationMessage="Validation message">
              <Input />
            </Field>
          </React.Fragment>
        ))}
      </div>
      <div style={row}>
        {orientations.map(orientation => (
          <Field
            key={orientation}
            label={LONG_LABEL}
            orientation={orientation}
            size="medium"
            style={{ width: 320 }}
            validationMessage={LONG_MESSAGE}
          >
            <Box />
          </Field>
        ))}
      </div>
    </div>
  );
};
