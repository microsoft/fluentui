import { readFileSync } from "fs";
import path from "path";
import ts from "typescript";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getTagNameFromCommentInDefinitionFile = function (definitionPathName) {
  const indexFilePath = path.resolve(__dirname, `./${definitionPathName}`);
  let name;

  try {
    let sourceFile = ts.createSourceFile(
      indexFilePath,
      readFileSync(indexFilePath).toString(),
      ts.ScriptTarget.ES2015,
      /*setParentNodes */ true
    );

    if (Array.isArray(sourceFile.statements)) {
      sourceFile.statements.forEach((statement) => {
        if (Array.isArray(statement.jsDoc) && statement.jsDoc[0].tags !== undefined) {
          statement.jsDoc.forEach((jsDoc) => {
            if (Array.isArray(jsDoc.tags)) {
              jsDoc.tags.forEach((tag) => {
                if (typeof tag.comment === "string" && tag.comment.startsWith("HTML Element:")) {
                  name = tag.comment.match(/<(.*)>/)[1].replace("\\", "");
                }
              });
            }
          })
        }
      })
    }
  } catch (err) {
    // do nothing
  }

  return name;
}

const resolveDefinitionFilePath = function(filePathName) {
  return filePathName.split("/").map((pathItem) => {
    if (pathItem.endsWith(".ts")) {
      const splitPathItem = pathItem.split(".");
      splitPathItem.splice(1, 0, "definition");
      return splitPathItem.join(".");
    }

    return pathItem;
  }).join("/");
}

const checkIsUnresolvedTypeScriptType = function(type) {
  /**
   * Due to TypeScript types being PascalCase, and all other default
   * types being lowercase, we determine if this is a typescript type by checking
   * the first letter.
   */
  return type[0] === type[0].toUpperCase() && isNaN(type[0]);
}

const resolveTypeToValues = function(CEM, type) {
  let values = "";

  CEM.modules.forEach((cemModule) => {
    if (cemModule.kind === "javascript-module") {
      cemModule.declarations.forEach((declaration) => {
        if (declaration.name === type) {
          const sanitizedType = declaration.type?.text;
          const matches = sanitizedType
            .match(/((?:.*):(?:.*))/gm)
            .map((match) => {
              return match.match(/(?:(?:')(.*)(?:')|(\d+))/)[0];
            });
          values = matches.reduce((accum, match) => {
            return `${accum}${accum === "" ? "" : " | "}${match}`;
          }, values)
        }
      })
    }
  });

  return values;
}

/**
 * @return {import('@custom-elements-manifest/analyzer').Plugin}
 *
 * This plugin adds the tagName after the manifest has been processed
 * See: https://github.com/webcomponents/custom-elements-manifest/blob/main/schema.json
 */
export function tagNameFix() {
  return {
    name: "fluentTagName",
    packageLinkPhase({customElementsManifest, context}){
      customElementsManifest.modules.map((item) => {
        item.declarations.forEach((declaration) => {
          if (declaration.customElement) {
            const name = getTagNameFromCommentInDefinitionFile(
              resolveDefinitionFilePath(item.path)
            );

            if (typeof name === "undefined") {
              console.error(`no tag name for ${item.path}`);
            } else {
              declaration.tagName = name;
            }
          }
        })
      });
    },
  };
}

/**
 * @return {import('@custom-elements-manifest/analyzer').Plugin}
 *
 * This plugin changes the types to use pipe syntax so that the vscode plugin can
 * correctly interpret the possible values, eg.
 * from:
 * {
 *    "name": "heading-level",
 *    "type": {
 *        "text": "HeadingLevel"
 *    },
 *    "fieldName": "headinglevel"
 * }
 *
 * to:
 * {
 *    "name": "heading-level",
 *    "type": {
 *        "text": "1 | 2 | 3 | 4 | 5 | 6"
 *    },
 *    "fieldName": "headinglevel"
 * },
 */
export function typescriptTypeTextSanitize() {
  return {
    name: "typescriptTypeTextSanitize",
    packageLinkPhase({customElementsManifest, context}){
      customElementsManifest.modules.map((item) => {
        item.declarations.forEach((declaration) => {
          if (declaration.customElement && Array.isArray(declaration.attributes)) {
            declaration.attributes.forEach((attribute) => {
              if (typeof attribute.type?.text === "string") {
                const possibleTypes = attribute.type.text.split("|").map((item) => {
                  return item.trim();
                }).map((possibleType) => {
                  if (checkIsUnresolvedTypeScriptType(possibleType)) {
                    return resolveTypeToValues(customElementsManifest, possibleType);
                  }

                  return possibleType;
                }).join(" | ");

                attribute.type.text = possibleTypes;
              }
            });
          }
        })
      });
    },
  };
}
