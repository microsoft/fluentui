import * as React from 'react';
import { PropertiesTableSet } from '../../PropertiesTable/index';
import { MessageBar, css } from 'office-ui-fabric-react';
import { camelize, pascalize } from '../../../utilities/index2';
import { IPageSectionProps } from '../Page.types';
import * as styles from './ImplementationSection.module.scss';

export interface IImplementationSectionProps extends IPageSectionProps {
  propertiesTablesSources: string[];
  allowNativeProps?: boolean;
  nativePropsElement?: string | string[];
  allowNativePropsForComponentName?: string;
}

export const ImplementationSection: React.StatelessComponent<IImplementationSectionProps> = props => {
  const { className, sectionName = 'Implementation', style, propertiesTablesSources } = props;
  const { readableSectionName = sectionName } = props;
  const sectionClassName = camelize(sectionName);
  const sectionId = pascalize(sectionName);
  return (
    <div className={css(`Page-${sectionClassName}Section`, className)} style={style}>
      <div className={css(styles.sectionHeader, `Page-${sectionClassName}SectionHeader`)}>
        <h2 className={css(styles.subHeading, `Page-subHeading`)} id={sectionId}>
          {readableSectionName}
        </h2>
      </div>
      {_getNativePropsInfo(props)}
      <PropertiesTableSet sources={propertiesTablesSources} />
    </div>
  );
};

function _getNativePropsInfo(props: IImplementationSectionProps): JSX.Element | null {
  const { allowNativeProps, allowNativePropsForComponentName, nativePropsElement = 'div' } = props;
  if (!allowNativeProps) {
    return null;
  }

  const nativePropsElems = Array.isArray(nativePropsElement) ? nativePropsElement : [nativePropsElement];

  const elementsArr: React.ReactNode[] = [];
  for (const elem of nativePropsElems) {
    elementsArr.push(<code key={elem}>{`<${elem}>`}</code>);
    elementsArr.push(' and ');
  }
  elementsArr.pop(); // remove last ' and '
  elementsArr.push(` tag${nativePropsElems.length > 1 ? 's' : ''}`);

  let componentNameJsx: JSX.Element | undefined;
  if (allowNativePropsForComponentName) {
    componentNameJsx = <code>{allowNativePropsForComponentName}</code>;
  }

  return (
    <MessageBar>
      <strong>Native props allowed {componentNameJsx && <>for {componentNameJsx}</>}</strong> - all HTML attributes native to the{' '}
      {elementsArr}, including all aria and custom data attributes, can be applied as native props on {componentNameJsx || 'this component'}
      .
    </MessageBar>
  );
}
