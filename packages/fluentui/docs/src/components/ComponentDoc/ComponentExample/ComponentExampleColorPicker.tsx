import { useFluentContext, ColorVariants } from '@fluentui/react-northstar';
import * as Color from 'color';
import * as _ from 'lodash';
import * as React from 'react';

type ComponentExampleColorPickerProps = {
  onChange: (colorValue: string) => void;
  variableValue: string;
};

const ComponentExampleColorPicker: React.FunctionComponent<ComponentExampleColorPickerProps> = props => {
  const { onChange, variableValue } = props;
  const { theme } = useFluentContext();

  const handleClick = (colorValue: string) => () => {
    onChange(colorValue);
  };
  // Some colors are strings only, i.e. black and white
  const filteredColors = _.pickBy(theme.siteVariables.colors, _.isPlainObject);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        lineHeight: '2rem',
        fontSize: '10px',
        fontFamily: 'monospace',
        backgroundImage:
          'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAKUlEQVQoU2NkYGAwZkAD////RxdiYBwKCv///4/hGUZGkNNRAeMQUAgAtxof+nLDzyUAAAAASUVORK5CYII=")',
        backgroundRepeat: 'repeat',
      }}
    >
      {_.map(filteredColors, (colorShades: ColorVariants, colorName: string) => (
        <div style={{ display: 'flex' }}>
          <strong style={{ display: 'block', width: '12ch', background: '#fff' }}>{_.startCase(colorName)}</strong>

          {_.map(_.pickBy(colorShades), (shadeValue, shadeName) => {
            const isActive = variableValue === shadeValue;
            const contrastColor = Color(shadeValue).isDark() ? '#fff' : '#000';

            return (
              <div
                key={shadeName}
                style={{
                  height: '2rem',
                  width: '2rem',
                  fontSize: isActive ? '16px' : 'inherit',
                  textAlign: 'center',
                  color: contrastColor,
                  background: shadeValue,
                  boxShadow: isActive ? `inset 0 0 0 1px ${contrastColor}` : '',
                  outline: 'none',
                  cursor: 'pointer',
                }}
                onClick={handleClick(shadeValue)}
                title={shadeValue}
              >
                {isActive ? '✓' : shadeName}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default ComponentExampleColorPicker;
