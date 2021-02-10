import * as React from 'react';
import { PropertiesTableSet } from '../../PropertiesTable/index';
import { MessageBar } from '@fluentui/react';
import { IPageSectionPropsWithSectionName } from '../Page.types';
import * as styles from '../Page.module.scss';
import { IPageJson } from '@fluentui/react/lib/common/DocPage.types';
import { ApiReferencesTableSet } from '../../ApiReferencesTable/index';

export interface IImplementationSectionProps extends IPageSectionPropsWithSectionName {
  jsonDocs?: IPageJson;
  propertiesTablesSources?: string[];
  allowNativeProps?: boolean;
  nativePropsElement?: string | string[];
  allowNativePropsForComponentName?: string;
  hideImplementationTitle?: boolean;
}

export const ImplementationSection: React.FunctionComponent<IImplementationSectionProps> = props => {
  const {
    className,
    readableSectionName = props.sectionName,
    style,
    propertiesTablesSources,
    jsonDocs,
    hideImplementationTitle,
    id,
  } = props;
  return (
    <div className={className} style={style}>
      {!hideImplementationTitle && (
        <div className={styles.sectionHeader}>
          {/* This heading must be programmatically focusable for simulating jumping to an anchor */}
          <h2 className={styles.subHeading} id={id} tabIndex={-1}>
            {readableSectionName}
          </h2>
        </div>
      )}
      {jsonDocs && (
        // In this context, the table shouldn't handle jumping to anchors, because Page delay-renders
        // its sections and the table shouldn't need to know about or handle that.
        <ApiReferencesTableSet jsonDocs={jsonDocs} jumpToAnchors={false} />
      )}
      {!jsonDocs && _getNativePropsInfo(props)}
      {!jsonDocs && <PropertiesTableSet sources={propertiesTablesSources} />}
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
    elementsArr.push(<code id={elem}>{`<${elem}>`}</code>);
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
      <strong>Native props allowed {componentNameJsx && <>for {componentNameJsx}</>}</strong> - all HTML attributes
      native to the {elementsArr}, including all aria and custom data attributes, can be applied as native props on{' '}
      {componentNameJsx || 'this component'}.
    </MessageBar>
  );
}
