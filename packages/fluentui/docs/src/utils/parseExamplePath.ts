/**
 * Return a dictionary of the parts of a component example file path.
 *
 * @param examplePath - A component example's file path.
 */
const parseExamplePath = (
  examplePath: string,
): {
  type: string;
  displayName: string;
  section: string;
  exampleName: string;
} => {
  const [type, displayName, section, exampleName] = examplePath.split('/').slice(-4);

  return { displayName, section, exampleName, type: type.replace(/s$/, '') };
};

export default parseExamplePath;
