import * as React from 'react';
import { useId, Label, Slider, makeStyles, sliderCSSVars, tokens } from '@fluentui/react-components';

const { sliderProgressColorVar, sliderRailColorVar, sliderThumbColorVar, sliderThumbSizeVar } = sliderCSSVars;

const useStyles = makeStyles({
  enabled: {
    [sliderProgressColorVar]: '#ff0764',
    [sliderRailColorVar]: tokens.colorNeutralForeground1,
    [sliderThumbColorVar]: '#ff0764',
    ':hover': {
      [sliderThumbColorVar]: '#d60d58',
      [sliderProgressColorVar]: '#d60d58',
      ':active': {
        [sliderThumbColorVar]: '#b91150',
        [sliderProgressColorVar]: '#b91150',
      },
    },
  },
  thumb: {
    [sliderThumbSizeVar]: '16px',
    boxShadow: `0 0 0 calc(var(${sliderThumbSizeVar}) * .2) ${tokens.colorTransparentBackground} inset`,
    '::before': {
      content: 'unset',
    },
  },
});

export const Customized = () => {
  const id = useId();
  const styles = useStyles();

  return (
    <>
      <Label htmlFor={id}>Customized slider</Label>
      <Slider className={styles.enabled} thumb={{ className: styles.thumb }} defaultValue={20} size="small" id={id} />
    </>
  );
};

Customized.parameters = {
  docs: {
    description: {
      story: 'Customized slider using its variables',
    },
  },
};
