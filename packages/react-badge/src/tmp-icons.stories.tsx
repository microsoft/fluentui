//
// !!!   A temporary workaround to avoid dependencies on any icon packages.
// !!!   A usage of converged icon package should be considered.
// !!!   Used for converged stories to avoid dependencies on non-converged icons
//

import * as React from 'react';
import { mergeClasses, makeStyles } from '@fluentui/react-make-styles';
import { getNativeProps, htmlElementProperties } from '@fluentui/react-utilities';

const useStyles = makeStyles({
  root: {
    display: 'inline-block',
    verticalAlign: 'middle',
    speak: 'none',
    width: '1em',
    height: '1em',
  },
  svg: {
    height: '100%',
    fill: 'currentColor',
    verticalAlign: 'top',
  },
});

const useIconProps = (props: React.HTMLAttributes<HTMLSpanElement>) => {
  const containerProps = props['aria-label']
    ? {}
    : {
        role: 'presentation',
        ['aria-hidden']: true,
      };
  const nativeProps = getNativeProps<React.HTMLAttributes<HTMLElement>>(props, htmlElementProperties);
  const styles = useStyles();

  const rootClasses = styles.root;
  const svgClasses = styles.svg;

  return { containerProps, nativeProps, rootClasses, svgClasses };
};

export const renderIcon = (
  SVGElement: (props: { svgClasses: string }) => JSX.Element,
): React.FC<React.HTMLAttributes<HTMLSpanElement>> => props => {
  const { containerProps, nativeProps, rootClasses, svgClasses } = useIconProps(props);

  return React.createElement(
    'span',
    {
      ...containerProps,
      ...nativeProps,
      className: mergeClasses(rootClasses, props.className),
    },
    <SVGElement svgClasses={svgClasses} />,
  );
};

export const AcceptIcon = renderIcon(props => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={props.svgClasses}>
    <path d="M640 1755L19 1133l90-90 531 530L1939 275l90 90L640 1755z" />
  </svg>
));
