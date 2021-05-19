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

export const ChevronRightIcon = renderIcon(props => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={props.svgClasses}>
    <path d="M515 1955l930-931L515 93l90-90 1022 1021L605 2045l-90-90z" />
  </svg>
));

export const AcceptIcon = renderIcon(props => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={props.svgClasses}>
    <path d="M640 1755L19 1133l90-90 531 530L1939 275l90 90L640 1755z" />
  </svg>
));

export const CutIcon = renderIcon(props => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={props.svgClasses}>
    <path d="M1416 1536q51 2 96 22t79 56 53 81 20 97q0 53-20 99t-55 81-82 55-99 21q-53 0-99-20t-81-55-55-81-21-100q0-71 36-132t100-94l-266-531-265 529q32 17 57 41t44 54 28 63 10 70q0 53-20 99t-55 81-82 55-99 21q-53 0-99-20t-81-55-55-81-21-100q0-51 19-96t52-80 77-56 96-24l322-646-339-678 58-175 353 708 353-708 58 175-339 678 322 646zm-776 384q27 0 50-10t40-27 28-41 10-50q0-27-10-50t-27-40-41-28-50-10q-27 0-50 10t-40 27-28 41-10 50q0 27 10 50t27 40 41 28 50 10zm768 0q27 0 50-10t40-27 28-41 10-50q0-27-10-50t-27-40-41-28-50-10q-27 0-50 10t-40 27-28 41-10 50q0 27 10 50t27 40 41 28 50 10z" />
  </svg>
));

export const PasteIcon = renderIcon(props => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={props.svgClasses}>
    <path d="M1920 768v1280H896v-128H128V256h512q0-52 20-99t55-81 81-55T896 0q52 0 99 20t81 55 55 82 21 99h512v512h256zM512 384v128h768V384h-256v-33q0-17 1-36 0-34-3-67t-17-60-39-43-70-17q-44 0-69 16t-39 43-17 60-4 68v35q0 17 1 34H512zm384 1408V768h640V384h-128v256H384V384H256v1408h640zm896-896h-768v1024h768V896z" />
  </svg>
));

export const EditIcon = renderIcon(props => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={props.svgClasses}>
    <path d="M2048 335q0 66-25 128t-73 110L633 1890 0 2048l158-633L1475 98q48-48 110-73t128-25q69 0 130 26t106 72 72 107 27 130zM326 1428q106 35 182 111t112 183L1701 640l-293-293L326 1428zm-150 444l329-82q-10-46-32-87t-55-73-73-54-87-33l-82 329zM1792 549q25-25 48-47t41-46 28-53 11-67q0-43-16-80t-45-66-66-45-81-17q-38 0-66 10t-53 29-47 41-47 48l293 293z" />
  </svg>
));
