import * as _ from 'lodash';
import parseExamplePath from './parseExamplePath';

/**
 * Creates a short hash path from an example filename.
 *
 * Typical Hash structure   ${pathname}-${section}-${exampleName}
 * shorten to new structure ${section} -          -${exampleName without "component-example"}
 */
const examplePathToHash = (examplePath: string) => {
  const { displayName, section, exampleName } = parseExamplePath(examplePath);

  // ButtonExample => Button
  // ButtonExampleButton => Button
  // ButtonExampleActive => Active
  const shortExampleName = exampleName.replace(`${displayName}Example`, '').replace('.tsx', '');

  return _.kebabCase(`${section}-${shortExampleName || displayName}`);
};

export default examplePathToHash;
