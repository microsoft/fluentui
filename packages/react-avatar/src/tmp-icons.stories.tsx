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

const renderIcon = (
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

export const CalendarIcon = renderIcon(props => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={props.svgClasses} focusable="false">
    <path d="M768 768h128v128H768V768zm384 768h128v128h-128v-128zm384-768h128v128h-128V768zm-384 0h128v128h-128V768zm-384 256h128v128H768v-128zm-384 0h128v128H384v-128zm1152 0h128v128h-128v-128zm-384 0h128v128h-128v-128zm-384 256h128v128H768v-128zm-384 0h128v128H384v-128zm1152 0h128v128h-128v-128zm-384 0h128v128h-128v-128zm-384 256h128v128H768v-128zm-384 0h128v128H384v-128zM2048 128v1792H0V128h384V0h128v128h1024V0h128v128h384zM128 256v256h1792V256h-256v128h-128V256H512v128H384V256H128zm1792 1536V640H128v1152h1792z" />
  </svg>
));

export const ContactIcon = renderIcon(props => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={props.svgClasses} focusable="false">
    <path d="M1330 1203q136 47 245 131t186 196 118 243 41 275h-128q0-164-58-304t-162-244-243-161-305-59q-107 0-206 27t-184 76-155 119-119 155-77 185-27 206H128q0-144 42-275t119-242 186-194 245-133q-78-42-140-102T475 969t-67-157-24-172q0-133 50-249t137-204T774 50t250-50q133 0 249 50t204 137 137 203 50 250q0 88-23 171t-67 156-105 133-139 103zM512 640q0 106 40 199t110 162 163 110 199 41q106 0 199-40t162-110 110-163 41-199q0-106-40-199t-110-162-163-110-199-41q-106 0-199 40T663 278 553 441t-41 199z" />
  </svg>
));

export const CatIcon = renderIcon(props => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={props.svgClasses} focusable="false">
    <path d="M2048 576q0 40-15 75t-41 61-61 41-75 15h-64v640q0 66 11 131t34 129q46 8 84 31t67 56 44 76 16 89v40q0 22-4 42t-18 33-42 13H512q-106 0-199-40t-162-110-110-163-41-199q0-79 30-149t82-122 122-83 150-30q26 0 49-10t41-27 28-41 10-50q0-27-10-50t-27-40-41-28-50-10V768q53 0 99 20t82 55 55 81 20 100q0 53-20 99t-55 82-81 55-100 20q-53 0-99 20t-82 55-55 81-20 100q0 80 30 149t82 122 122 83 150 30q26 0 49-10t41-27 28-41 10-50q0-198 69-369t205-315q117-124 177-274t61-322V384q0-79 30-149t82-122 122-83 150-30h128v113q0 17 9 33t26 24q61 30 121 60t122 61q49 25 77 71t29 101v113zm-128 1344q0-26-10-49t-27-41-41-28-50-10q-21 0-35-10t-24-29q-18-34-31-78t-21-90-13-93-4-84V768q0-27 10-50t27-40 41-28 50-10h40q22 0 42-4t33-18 13-42V463q0-17-9-33t-26-24q-61-30-121-60t-122-61q-45-23-72-64t-32-93q-53 0-100 20t-82 54-55 81-21 101v128q0 197-69 369t-205 315q-117 124-177 274t-61 322q0 34-9 66t-27 62h804q0-26-10-49t-27-41-41-28-50-10h-256v-128h256q8 0 15 1t16 2l-93-371 124-32 119 475q36 36 55 83t20 98h256zM1600 384q26 0 45 19t19 45q0 26-19 45t-45 19q-26 0-45-19t-19-45q0-26 19-45t45-19z" />
  </svg>
));

export const ChatBotIcon = renderIcon(props => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={props.svgClasses} focusable="false">
    <path d="M768 1024H640V896h128v128zm512 0h-128V896h128v128zm512-128v256h-128v320q0 40-15 75t-41 61-61 41-75 15h-264l-440 376v-376H448q-40 0-75-15t-61-41-41-61-15-75v-320H128V896h128V704q0-40 15-75t41-61 61-41 75-15h448V303q-29-17-46-47t-18-64q0-27 10-50t27-40 41-28 50-10q27 0 50 10t40 27 28 41 10 50q0 34-17 64t-47 47v209h448q40 0 75 15t61 41 41 61 15 75v192h128zm-256-192q0-26-19-45t-45-19H448q-26 0-45 19t-19 45v768q0 26 19 45t45 19h448v226l264-226h312q26 0 45-19t19-45V704zm-851 462q55 55 126 84t149 30q78 0 149-29t126-85l90 91q-73 73-167 112t-198 39q-103 0-197-39t-168-112l90-91z" />
  </svg>
));

export const GroupIcon = renderIcon(props => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={props.svgClasses} focusable="false">
    <path d="M1850 688q45 25 82 61t62 80 40 93 14 102h-128q0-52-20-99t-55-81-82-55-99-21q-53 0-99 20t-81 55-55 82-21 99q0 91-41 173t-115 136q65 33 117 81t90 108 57 128 20 142h-128q0-79-30-149t-83-122-122-82-149-31q-79 0-149 30t-122 83-82 122-31 149H512q0-73 20-141t57-128 89-108 118-82q-73-54-114-136t-42-173q0-52-20-99t-55-81-82-55-99-21q-53 0-99 20t-81 55-55 82-21 99H0q0-52 14-101t39-93 63-80 82-62q-33-35-51-81t-19-95q0-52 20-99t55-81 81-55 100-21q52 0 99 20t81 55 55 82 21 99q0 49-18 95t-52 81q82 45 134 124 54-80 138-126t182-46q97 0 181 46t139 126q52-79 134-124-33-35-51-81t-19-95q0-52 20-99t55-81 81-55 100-21q52 0 99 20t81 55 55 82 21 99q0 49-18 95t-52 81zM256 512q0 27 10 50t27 40 41 28 50 10q27 0 50-10t40-27 28-41 10-50q0-27-10-50t-27-40-41-28-50-10q-27 0-50 10t-40 27-28 41-10 50zm768 768q52 0 99-20t81-55 55-81 21-100q0-52-20-99t-55-81-82-55-99-21q-53 0-99 20t-81 55-55 82-21 99q0 53 20 99t55 81 81 55 100 21zm512-768q0 27 10 50t27 40 41 28 50 10q27 0 50-10t40-27 28-41 10-50q0-27-10-50t-27-40-41-28-50-10q-27 0-50 10t-40 27-28 41-10 50z" />
  </svg>
));

export const IDBadgeIcon = renderIcon(props => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={props.svgClasses} focusable="false">
    <path d="M1568 384q40 0 68 28t28 68v1472q0 40-28 68t-68 28H480q-40 0-68-28t-28-68V480q0-40 28-68t68-28h312L600 0h144l192 384h176L1304 0h144l-192 384h312zm-32 128h-536l81 163q7 16 7 29 0 26-19 45t-45 19q-18 0-33-9t-24-26L856 512H512v1408h1024V512zm-768 640q0-53 20-99t55-82 81-55 100-20q53 0 99 20t82 55 55 81 20 100q0 49-18 95t-52 81q46 25 82 61t62 80 40 93 14 102h-128q0-53-20-99t-55-82-81-55-100-20q-53 0-99 20t-82 55-55 81-20 100H640q0-52 14-101t39-94 62-80 83-61q-33-35-51-81t-19-95zm384 0q0-27-10-50t-27-40-41-28-50-10q-27 0-50 10t-40 27-28 41-10 50q0 27 10 50t27 40 41 28 50 10q27 0 50-10t40-27 28-41 10-50z" />
  </svg>
));

export const RoomIcon = renderIcon(props => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={props.svgClasses} focusable="false">
    <path d="M1920 128v1664h-442l-473 95-237 47V779l640-128v-11H640v1152H128V128h1792zM896 885v893l512-103V782L896 885zm896 779V256H256v1408h256V512h1024v1152h256z" />
  </svg>
));

export const TelemarketerIcon = renderIcon(props => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={props.svgClasses} focusable="false">
    <path d="M1920 2048h-128q0-106-27-204t-78-183-120-156-155-120-184-77-204-28q-106 0-204 27t-183 78-156 120-120 155-77 184-28 204H128q0-145 42-276t121-240 187-193 244-135q-124-67-210-180h-64q-40 0-75-15t-61-41-41-61-15-75V576q0-38 14-72t38-60 58-42 71-18q39-88 99-159t137-121 166-77 185-27q96 0 185 27t165 77 137 121 100 159q38 2 71 18t57 42 39 60 14 72v256q0 40-15 75t-41 61-61 41-75 15q-30 0-57-9-43 59-97 107t-120 82q134 51 243 134t188 193 120 241 43 276zM1664 576q0-26-19-45t-45-19q-26 0-45 19t-19 45v256q0 26 19 45t45 19q26 0 45-19t19-45V576zM384 832q0 26 19 45t45 19h64V576q0-26-19-45t-45-19q-26 0-45 19t-19 45v256zm301 192q70 62 157 95t182 33q62 0 121-14t112-42 100-67 83-91q-16-23-24-50t-8-56V576q0-46 20-87t59-68q-32-67-80-121t-109-92-130-59-144-21q-74 0-144 20t-130 59-108 93-81 121q38 27 58 68t21 87v320h128q0-27 10-50t27-40 41-28 50-10q27 0 50 10t40 27 28 41 10 50q0 27-10 50t-27 40-41 28-50 10H685z" />
  </svg>
));
