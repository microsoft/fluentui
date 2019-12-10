import * as React from 'react';
import { BaseButton } from './../BaseButton';
import { ProviderContext } from '../Provider';
import { mergeCss } from '@uifabric/merge-styles';

const getProps = (cssMap: any, props: any) => {
  const newProps = { ...props, slotProps: props.slotProps || {} };
  Object.keys(cssMap).forEach(slotName => {
    if (!newProps.slotProps[slotName]) {
      newProps.slotProps[slotName] = {};
    }
    newProps.slotProps[slotName].className = `${newProps.slotProps[slotName].className || ''} ${cssMap[slotName] || ''}`;
  });

  return newProps;
};

const compose = (displayName: string, BaseComponent: any) => (props: any) => {
  const theme = (React.useContext(ProviderContext) as any)!;
  const cssMap = getClassName(theme, props, displayName);
  const newProps = getProps(cssMap, props);

  return <BaseComponent {...newProps} />;
};

const getClassName = (theme: any, componentProps: any, componentName: string) => {
  const stylesAdditions: any = {};
  const variantNames: string[] = [];
  // What are slots? How do we get them if they are not defined in the variants
  const slotNames: string[] = ['root', 'icon', 'primaryText', 'secondaryText'];
  const componentStyles =
    theme && theme.components && theme.components[componentName] && theme.components[componentName].styles
      ? theme.components[componentName].styles({ typography: theme.typography, colors: theme.colors })
      : {};

  if (theme && theme.components && theme.components[componentName] && theme.components[componentName].variants) {
    Object.keys(theme.components[componentName].variants).forEach(variantName => {
      stylesAdditions[variantName] = {};
      variantNames.push(variantName);
      Object.keys(theme.components[componentName].variants[variantName]).forEach(slotName => {
        if (!slotNames.find(s => s === slotName)) {
          slotNames.push(slotName);
        }
        stylesAdditions[variantName][slotName] = theme.components[componentName].variants[variantName][slotName];
      });
    });
  }

  const mergedSlotStyles: any = {};

  slotNames.forEach(slotName => {
    mergedSlotStyles[slotName] = componentStyles[slotName] || {};
    variantNames.map(v => {
      if (componentProps[v]) {
        mergedSlotStyles[slotName] = { ...mergedSlotStyles[slotName], ...stylesAdditions[v][slotName] };
      }
    });
  });

  const cssMap: any = {};
  // tslint:disable-next-line:no-shadowed-variable
  slotNames.forEach(slotName => {
    // TODO: resolve problems with overrides, now we are just merging classNames
    cssMap[slotName] = mergeCss(mergedSlotStyles[slotName]);
  });

  console.log({
    stylesAdditions,
    mergedSlotStyles,
    cssMap
  });
  return cssMap;
};

export const FluentButton = compose(
  'FluentButton',
  BaseButton
);
