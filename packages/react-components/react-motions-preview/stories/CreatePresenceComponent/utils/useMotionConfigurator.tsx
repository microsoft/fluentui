import * as React from 'react';
import { Dropdown, Input, Option, useId } from '@fluentui/react-components';
import { durations, curves } from '@fluentui/react-motions-preview';

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

const useMotionConfig = ({ overrideName }: { overrideName: 'enter' | 'exit' | 'all' }) => {
  const [durationName, setDurationName] = React.useState<DurationKey | ''>(defaultDurationName);
  const [customDuration, setCustomDuration] = React.useState<number>(0);
  const [curveName, setCurveName] = React.useState<CurveKey | ''>(defaultEasingName);

  const duration = customDuration ? customDuration : durationName ? durations[durationName] : undefined;
  const easing = curveName ? curves[curveName] : undefined;
  const overrideObj = easing || duration ? ({} as { easing?: string; duration?: number }) : undefined;
  if (duration) {
    overrideObj!.duration = duration;
  }
  if (easing) {
    overrideObj!.easing = easing;
  }
  const override = overrideObj ? { [overrideName]: overrideObj } : undefined;

  return { durationName, setDurationName, customDuration, setCustomDuration, curveName, setCurveName, override };
};

export const OverrideControls = ({
  overrideName,
  setDurationName,
  customDuration,
  setCustomDuration,
  setCurveName,
}: {
  overrideName: 'enter' | 'exit' | 'all';
  setDurationName: (durationName: DurationKey | '') => void;
  customDuration: number;
  setCustomDuration: (customDuration: number) => void;
  setCurveName: (curveName: CurveKey | '') => void;
}) => {
  const comboId = useId('combo-default');

  // Create the options for the dropdowns
  const defaultDurationOption: [string, number] = ['', NaN];
  const durationOptions: [string, number][] = [defaultDurationOption, ...Object.entries(durations)];

  const defaultCurveNameOption = '';
  const curveNameOptions = [defaultCurveNameOption, ...Object.keys(curves)];

  return (
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
  );
};

export const OverrideCodePreview = ({
  animateOpacity,
  tagName,
  overrideName,
  durationName,
  customDuration,
  curveName,
  override,
}: {
  animateOpacity: boolean;
  tagName: string;
  overrideName: 'enter' | 'exit' | 'all';
  durationName: DurationKey | '';
  customDuration: number;
  curveName: CurveKey | '';
  override: { [key: string]: { duration?: number; easing?: string } } | undefined;
}) => {
  // Construct code preview for override properties, hiding them if they are not set
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

  // const overrideJSON = override ? JSON.stringify(override) : '';
  // const overrideJSX = overrideJSON ? <>{` override={${overrideJSON}}`}</> : null;

  const overrideJSX = override ? (
    <>
      {` override={{ ${overrideName}: {`}
      {durationJSX}
      {easingJSX}
      {` } }}`}
    </>
  ) : null;

  const exampleCodeJSX = (
    <>
      {`<${tagName} ...`}
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
  return exampleCodeBlock;
};

export const useMotionConfigurator = ({
  animateOpacity,
  tagName,
  overrideName,
}: {
  animateOpacity: boolean;
  tagName: string;
  overrideName: 'enter' | 'exit' | 'all';
}) => {
  // Get the motion configuration from the hook
  const { durationName, setDurationName, customDuration, setCustomDuration, curveName, setCurveName, override } =
    useMotionConfig({ overrideName });

  const configuratorJSX = (
    <div>
      <div>
        {OverrideCodePreview({
          animateOpacity,
          tagName,
          overrideName,
          durationName,
          customDuration,
          curveName,
          override,
        })}
      </div>
      <br />
      {OverrideControls({ overrideName, setDurationName, customDuration, setCustomDuration, setCurveName })}
    </div>
  );

  return { configuratorJSX, override };
};
