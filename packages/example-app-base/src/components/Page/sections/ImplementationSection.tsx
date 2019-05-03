import * as React from 'react';
import { PropertiesTableSet } from '../../PropertiesTable/index';
import { MessageBar } from 'office-ui-fabric-react';
import { pascalize } from '../../../utilities/index2';
import { IPageSectionProps } from '../Page.types';
import * as styles from '../Page.module.scss';
import { IPageJson } from 'office-ui-fabric-react/lib/common/DocPage.types';
import { ApiReferencesTableSet } from '../../ApiReferencesTable/index';

export interface IImplementationSectionProps extends IPageSectionProps {
  jsonDocs?: IPageJson;
  propertiesTablesSources?: string[];
  allowNativeProps?: boolean;
  nativePropsElement?: string | string[];
  allowNativePropsForComponentName?: string;
  hideImplementationTitle?: boolean;
}

export const ImplementationSection: React.StatelessComponent<IImplementationSectionProps> = props => {
  const { className, sectionName = 'Implementation', style, propertiesTablesSources, jsonDocs, hideImplementationTitle } = props;
  const { readableSectionName = sectionName } = props;
  const sectionId = pascalize(sectionName);
  return (
    <div className={className} style={style}>
      {!hideImplementationTitle && (
        <div className={styles.sectionHeader}>
          <h2 className={styles.subHeading} id={sectionId}>
            {readableSectionName}
          </h2>
        </div>
      )}
      {jsonDocs && <ApiReferencesTableSet jsonDocs={jsonDocs} />}
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
