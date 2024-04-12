import * as React from 'react';
import { Input } from '@fluentui/react-input';
import { Dropdown, Option } from '@fluentui/react-combobox';
import { useId } from '@fluentui/react-utilities';

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

export const useMotionConfig = ({ overrideName }: { overrideName: 'enter' | 'exit' | 'all' }) => {
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

  const overrideObjNamed =
    easing || duration ? ({} as { easing?: typeof curveName; duration?: typeof durationName | string }) : undefined;
  if (duration) {
    overrideObjNamed!.duration = customDuration ? String(customDuration) : durationName;
  }
  if (easing) {
    overrideObjNamed!.easing = curveName;
  }

  const override = overrideObj ? { [overrideName]: overrideObj } : undefined;
  const overrideNamed = overrideObj ? { [overrideName]: overrideObjNamed } : undefined;

  return {
    durationName,
    setDurationName,
    customDuration,
    setCustomDuration,
    curveName,
    setCurveName,
    override,
    overrideNamed,
  };
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
              onOptionSelect={React.useCallback(
                (e: unknown, data: { optionValue: string | undefined }) => {
                  // Clear the custom duration when a preset is selected
                  setCustomDuration(0);
                  setDurationName(data.optionValue as DurationKey | '');
                },
                [setCustomDuration, setDurationName],
              )}
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
              onChange={React.useCallback(
                (e: unknown, data: { value: string | undefined }) => {
                  setCustomDuration(Number(data.value || 0));
                },
                [setCustomDuration],
              )}
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
              onOptionSelect={React.useCallback(
                (e: unknown, data: { optionValue: string | undefined }) => {
                  setCurveName(data.optionValue as CurveKey | '');
                },
                [setCurveName],
              )}
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

export const OverrideCodePreviewJSON = ({
  animateOpacity,
  unmountOnExit,
  tagName,
  overrideNamed,
}: {
  animateOpacity: boolean;
  unmountOnExit: boolean;
  tagName: string;
  // overrideNamed: { [key: string]: { duration?: DurationKey; easing?: CurveKey } } | undefined;
  overrideNamed: Record<string, unknown> | undefined;
}) => {
  const overrideJSON =
    overrideNamed && Object.keys(overrideNamed).length
      ? JSON.stringify(overrideNamed, null, ' ').replace(/"/g, '').replace(/:/g, ': ')
      : '';
  const overrideJSX = overrideJSON ? <>{` override={${overrideJSON}}`}</> : null;

  const exampleCodeJSX = (
    <>
      {`<${tagName} ...`}
      <span style={paramStyles}>{animateOpacity ? '' : ' animateOpacity={false}'}</span>
      <span style={paramStyles}>{!unmountOnExit ? '' : ' unmountOnExit={true}'}</span>
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

export const OverrideCodePreview = ({
  animateOpacity,
  unmountOnExit,
  tagName,
  overrideName,
  durationName,
  customDuration,
  curveName,
  override,
  overrideNamed,
}: {
  animateOpacity: boolean;
  unmountOnExit: boolean;
  tagName: string;
  overrideName: 'enter' | 'exit' | 'all';
  durationName: DurationKey | '';
  customDuration: number;
  curveName: CurveKey | '';
  override: { [key: string]: { duration?: number; easing?: string } } | undefined;
  // overrideNamed: { [key: string]: { duration?: DurationKey; easing?: CurveKey } } | undefined;
  overrideNamed: Record<string, unknown> | undefined;
}) => {
  // Construct code preview for override properties, hiding them if they are not set
  // const durationValueInCode = customDuration ? customDuration : durationName;
  // const durationJSX = durationValueInCode ? (
  //   <>
  //     {` duration: `}
  //     <span style={paramStyles}>{durationValueInCode}</span>
  //   </>
  // ) : null;

  // const easingJSX = curveName ? (
  //   <>
  //     {durationJSX ? ',' : ''}
  //     {` easing: `}
  //     <span style={paramStyles}>{curveName}</span>
  //   </>
  // ) : null;

  const overrideJSON = override ? JSON.stringify(overrideNamed, null, ' ').replace(/"/g, '').replace(/:/g, ': ') : '';
  const overrideJSX = overrideJSON ? <>{` override={${overrideJSON}}`}</> : null;

  // const overrideJSX = override ? (
  //   <>
  //     {` override={{ ${overrideName}: {`}
  //     {durationJSX}
  //     {easingJSX}
  //     {` } }}`}
  //   </>
  // ) : null;

  const exampleCodeJSX = (
    <>
      {`<${tagName} ...`}
      <span style={paramStyles}>{animateOpacity ? '' : ' animateOpacity={false}'}</span>
      <span style={paramStyles}>{!unmountOnExit ? '' : ' unmountOnExit={true}'}</span>
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
  unmountOnExit = false,
  tagName,
  overrideName,
}: {
  animateOpacity: boolean;
  unmountOnExit?: boolean;
  tagName: string;
  overrideName: 'enter' | 'exit' | 'all';
}) => {
  // Get the motion configuration from the hook
  const {
    durationName,
    setDurationName,
    customDuration,
    setCustomDuration,
    curveName,
    setCurveName,
    override,
    overrideNamed,
  } = useMotionConfig({ overrideName });

  const codePreviewJSX = OverrideCodePreview({
    animateOpacity,
    unmountOnExit,
    tagName,
    overrideName,
    durationName,
    customDuration,
    curveName,
    override,
    overrideNamed,
  });

  const overrideControlsJSX = OverrideControls({
    overrideName,
    setDurationName,
    customDuration,
    setCustomDuration,
    setCurveName,
  });

  const configuratorJSX = (
    <div>
      <div>{codePreviewJSX}</div>
      <br />
      {overrideControlsJSX}
    </div>
  );

  return { configuratorJSX, codePreviewJSX, overrideControlsJSX, override, overrideNamed };
};
