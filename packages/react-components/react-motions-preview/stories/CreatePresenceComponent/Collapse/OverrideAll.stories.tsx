import * as React from 'react';
import { Checkbox, Dropdown, Input, Option, ToggleButton, useId } from '@fluentui/react-components';
import { Collapse, durations, curves } from '@fluentui/react-motions-preview';
import description from './OverrideAll.stories.md';

import { loremIpsum } from '../loremIpsum';

type DurationKey = keyof typeof durations;
type CurveKey = keyof typeof curves;

const defaultDurationName: DurationKey | '' = '';
const defaultDuration = defaultDurationName ? durations[defaultDurationName] : 0;
const defaultEasingName: CurveKey | '' = '';

const splitCamelCase = (s: string) => s.replace(/([a-z])([A-Z])/g, '$1 $2').split(' ');

const decamelAndDropPrefix = (s: string) => splitCamelCase(s).slice(1).join(' ');

const optionTextForDuration = ([optionKey, optionValue]: [string, number]) => {
  if (optionKey === '') {
    return '(default)';
  }
  const displayKey = decamelAndDropPrefix(optionKey);
  return `${displayKey} (${optionValue}ms)`;
};

const optionTextForEasing = (optionKey: CurveKey | '') => {
  if (optionKey === '') {
    return '(default)';
  }
  const displayKey = decamelAndDropPrefix(optionKey);
  return `${displayKey}`;
};

const paramStyles: React.CSSProperties = { color: 'lightgreen' };
const monospaceFont = 'Lucida Console, Monaco, Courier New';

export const OverrideAll = () => {
  const [visible, setVisible] = React.useState(false);
  const [animateOpacity, setAnimateOpacity] = React.useState(true);
  const comboId = useId('combo-default');
  const [durationName, setDurationName] = React.useState<DurationKey | ''>(defaultDurationName);
  const [customDuration, setCustomDuration] = React.useState<number>(0);
  const [curveName, setCurveName] = React.useState<CurveKey | ''>(defaultEasingName);

  // Construct the override object, only including properties that are set
  const duration = customDuration ? customDuration : durationName ? durations[durationName] : undefined;
  const easing = curveName ? curves[curveName] : undefined;
  // const all = easing || duration ? { easing, duration } : undefined;
  const all = easing || duration ? ({} as { easing?: string; duration?: number }) : undefined;
  if (duration) {
    all!.duration = duration;
  }
  if (easing) {
    all!.easing = easing;
  }
  const override = all ? { all } : undefined;

  // Create the options for the dropdowns
  const defaultDurationOption: [string, number] = ['', NaN];
  const durationOptions: [string, number][] = [defaultDurationOption, ...Object.entries(durations)];

  const defaultCurveNameOption = '';
  const curveNameOptions = [defaultCurveNameOption, ...Object.keys(curves)];

  // Construct JSX for override properties, hiding them if they are not set
  const durationValueInCode = customDuration ? customDuration : durationName;
  const durationJSX = durationValueInCode ? (
    <>
      {` duration: `}
      <span style={paramStyles}>{durationValueInCode}</span>
    </>
  ) : null;

  const easingJSX = curveName ? (
    <>
      {durationJSX ? ',' : ''}
      {` easing: `}
      <span style={paramStyles}>{curveName}</span>
    </>
  ) : null;

  const overrideJSX = override ? (
    <>
      {` override={{ all: {`}
      {durationJSX}
      {easingJSX}
      {` } }}`}
    </>
  ) : null;

  const exampleCodeJSX = (
    <>
      {`<Collapse ...`}
      <span style={paramStyles}>{animateOpacity ? '' : ' animateOpacity={false}'}</span>
      {overrideJSX}
      {'>'}
    </>
  );

  const exampleCodeBlock = (
    <div
      style={{
        fontWeight: 'bold',
        fontFamily: monospaceFont,
        backgroundColor: 'black',
        color: 'lightgrey',
        padding: 20,
        borderRadius: 5,
      }}
    >
      {exampleCodeJSX}
    </div>
  );

  return (
    <div>
      <div>{exampleCodeBlock}</div>
      <br />
      <table>
        <tbody>
          <tr>
            <td>
              <label id={comboId}>duration: &nbsp;</label>
            </td>
            <td>
              <Dropdown
                aria-labelledby={comboId}
                placeholder="(default)"
                defaultValue={optionTextForDuration([defaultDurationName, defaultDuration])}
                defaultSelectedOptions={[optionTextForDuration([defaultDurationName, defaultDuration])]}
                onOptionSelect={(e, data) => {
                  // Clear the custom duration when a preset is selected
                  setCustomDuration(0);
                  setDurationName(data.optionValue as DurationKey | '');
                }}
              >
                {durationOptions.map(([optionKey, optionValue]) => {
                  return (
                    <Option key={optionKey} value={optionKey}>
                      {optionTextForDuration([optionKey, optionValue])}
                    </Option>
                  );
                })}
              </Dropdown>

              <Input
                style={{ width: '7rem' }}
                defaultValue=""
                value={customDuration ? String(customDuration) : ''}
                placeholder="custom (ms)"
                onChange={(e, data) => {
                  setCustomDuration(Number(data.value || 0));
                }}
              />
            </td>
          </tr>
          <tr>
            <td>
              <label id={comboId}>easing: &nbsp;</label>
            </td>
            <td>
              <Dropdown
                aria-labelledby={comboId}
                placeholder="(default)"
                defaultValue={optionTextForEasing(defaultEasingName)}
                defaultSelectedOptions={[optionTextForEasing(defaultEasingName)]}
                onOptionSelect={(e, data) => {
                  setCurveName(data.optionValue as CurveKey | '');
                }}
              >
                {curveNameOptions.map(optionKey => {
                  return (
                    <Option key={optionKey} value={optionKey}>
                      {optionTextForEasing(optionKey as CurveKey | '')}
                    </Option>
                  );
                })}
              </Dropdown>
            </td>
          </tr>
        </tbody>
      </table>

      <Checkbox label="animate opacity" checked={animateOpacity} onChange={() => setAnimateOpacity(v => !v)} />

      <div style={{ padding: '15px 0' }}>
        <ToggleButton checked={visible} onClick={() => setVisible(v => !v)}>
          <span>{visible ? '☑️' : '🔲'}</span>&nbsp; visible
        </ToggleButton>
      </div>

      <Collapse visible={visible} animateOpacity={animateOpacity} override={override}>
        <div>{loremIpsum(10)}</div>
      </Collapse>
    </div>
  );
};

OverrideAll.parameters = {
  docs: {
    description: {
      story: description,
    },
  },
};
