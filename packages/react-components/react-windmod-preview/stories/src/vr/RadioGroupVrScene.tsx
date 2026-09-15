'use client';

// eslint-disable-next-line import/no-extraneous-dependencies -- story-only helper outside the *.stories.tsx devDependencies exemption
import * as React from 'react';

const layouts = ['vertical', 'horizontal', 'horizontal-stacked'] as const;
const positions = ['after', 'below'] as const;
const checkedValues = [false, true] as const;

type RadioGroupLike = React.ComponentType<{
  children?: React.ReactNode;
  defaultValue?: string;
  disabled?: boolean;
  layout?: (typeof layouts)[number];
  onChange?: () => void;
  required?: boolean;
  value?: string;
}>;

type RadioLike = React.ComponentType<{
  defaultChecked?: boolean;
  disabled?: boolean;
  indicator?: { children?: React.ReactNode };
  label?: string;
  labelPosition?: (typeof positions)[number];
  required?: boolean;
  root?: { style?: React.CSSProperties };
  value?: string;
}>;

const row: React.CSSProperties = { display: 'flex', gap: 24, alignItems: 'flex-start' };

const VALUES = ['a', 'b', 'c'];

// A width narrow enough to force the label onto a second line — the case Griffel's own comment
// says the label's block margin exists for.
const WRAPPING = 'A label long enough to wrap onto a second line';

const noop = () => undefined;

// A fixed px box, no `em` and no icon import, so both sides receive a byte-identical child.
const customChild = <span style={{ display: 'block', width: 8, height: 8, background: '#c50f1f' }} />;

/**
 * `required` cells are deliberately INCLUDED: unlike Switch and Checkbox, neither side renders an
 * asterisk for a Radio, because `required` reaches the input rather than the label. The scene pins
 * that agreement. Selection is driven by `defaultValue`/`defaultChecked` because a Radio publishes
 * no `data-checked` in any mode — the crossing that proves the checked look reads the input.
 */
export const RadioGroupVrScene = ({
  RadioGroup,
  Radio,
}: {
  RadioGroup: RadioGroupLike;
  Radio: RadioLike;
}): React.ReactNode => {
  // The `disabled` prop is omitted entirely rather than passed as false or undefined: the base
  // Radio hook spreads the item's own native props after the group-context defaults, so an own
  // `disabled` key wins whatever its value — which would leave the group-disabled band enabled.
  const items = (props: { disabledValue?: string } = {}) =>
    VALUES.map(value => (
      <Radio
        key={value}
        label={value.toUpperCase()}
        value={value}
        {...(value === props.disabledValue ? { disabled: true } : undefined)}
      />
    ));

  return (
    <div style={{ display: 'inline-flex', flexDirection: 'column', gap: 24, padding: 24, background: '#fff' }}>
      {/* A. layout x selection */}
      {layouts.map(layout => (
        <div key={`a-${layout}`} style={row}>
          <RadioGroup layout={layout}>{items()}</RadioGroup>
          <RadioGroup defaultValue="b" layout={layout}>
            {items()}
          </RadioGroup>
          <RadioGroup layout={layout} onChange={noop} value="b">
            {items()}
          </RadioGroup>
        </div>
      ))}

      {/* B. group disabled x layout */}
      <div style={row}>
        {layouts.map(layout => (
          <RadioGroup key={`b-${layout}`} defaultValue="b" disabled layout={layout}>
            {items()}
          </RadioGroup>
        ))}
      </div>

      {/* C. per-Radio disabled inside an enabled group */}
      <div style={row}>
        <RadioGroup defaultValue="a" layout="horizontal">
          {items({ disabledValue: 'c' })}
        </RadioGroup>
        <RadioGroup defaultValue="c" layout="horizontal">
          {items({ disabledValue: 'c' })}
        </RadioGroup>
      </div>

      {/* D. labelPosition override beats the layout default */}
      <div style={row}>
        <RadioGroup defaultValue="a" layout="horizontal">
          <Radio label="A" labelPosition="below" value="a" />
          <Radio label="B" labelPosition="below" value="b" />
        </RadioGroup>
        <RadioGroup defaultValue="a" layout="horizontal-stacked">
          <Radio label="A" labelPosition="after" value="a" />
          <Radio label="B" labelPosition="after" value="b" />
        </RadioGroup>
      </div>

      {/* E. bare radios, no group */}
      {positions.map(labelPosition => (
        <div key={`e-${labelPosition}`} style={row}>
          {checkedValues.map(checked =>
            checkedValues.map(disabled => (
              <Radio
                key={`${String(checked)}-${String(disabled)}`}
                defaultChecked={checked}
                disabled={disabled}
                label="A"
                labelPosition={labelPosition}
                value="a"
              />
            )),
          )}
        </div>
      ))}

      {/* F. no label */}
      <div style={row}>
        {checkedValues.map(checked => (
          <Radio key={`f-${String(checked)}`} defaultChecked={checked} value="a" />
        ))}
        <RadioGroup defaultValue="b">
          <Radio value="a" />
          <Radio value="b" />
        </RadioGroup>
      </div>

      {/* G. custom indicator */}
      <div style={row}>
        {checkedValues.map(checked => (
          <Radio
            key={`g-${String(checked)}`}
            defaultChecked={checked}
            indicator={{ children: customChild }}
            label="A"
            value="a"
          />
        ))}
        <RadioGroup defaultValue="a">
          <Radio indicator={{ children: customChild }} label="A" value="a" />
        </RadioGroup>
      </div>

      {/* H. wrapping label in a fixed 160px container */}
      <div style={row}>
        {positions.map(labelPosition =>
          checkedValues.map(checked => (
            <Radio
              key={`h-${labelPosition}-${String(checked)}`}
              defaultChecked={checked}
              label={WRAPPING}
              labelPosition={labelPosition}
              root={{ style: { width: 160 } }}
              value="a"
            />
          )),
        )}
      </div>

      {/* I. required — no asterisk on either side */}
      <div style={row}>
        <RadioGroup required>
          <Radio label="A" value="a" />
        </RadioGroup>
        <Radio label="A" required value="a" />
      </div>
    </div>
  );
};
