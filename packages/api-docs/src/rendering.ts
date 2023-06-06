import {
  DocExcerpt,
  DocInlineTag,
  DocSection,
  DocComment,
  DocPlainText,
  DocParagraph,
  DocNode,
  DocNodeTransforms,
  DocLinkTag,
  DocNodeContainer,
  DocCodeSpan,
  DocBlock,
  DocNodeKind,
} from '@microsoft/tsdoc';
import { ApiItem, ApiModel, ExcerptToken, IExcerptTokenRange } from '@microsoft/api-extractor-model';
import { ILinkToken } from './types';
import { ICollectedData } from './types-private';

/**
 * Render nodes from `section` (which is part of `apiItem`) into text.
 */
export function renderNodes(apiModel: ApiModel, apiItem: ApiItem, section: DocNodeContainer): string {
  return section.nodes
    .map((node: DocNode) => renderNode(apiModel, apiItem, node))
    .join('')
    .trim();
}

/**
 * Extracts text from a doc node
 *
 * @param apiModel - Model containing all API info
 * @param apiItem - API item the node came from
 * @param node - Node from which to extract text
 */
function renderNode(apiModel: ApiModel, apiItem: ApiItem, node: DocNode): string {
  switch (node.kind) {
    case 'Paragraph':
      const transformedParagraph: DocParagraph = DocNodeTransforms.trimSpacesInParagraph(node as DocParagraph);
      return renderNodes(apiModel, apiItem, transformedParagraph);
    case 'LinkTag':
      return renderLinkTag(apiModel, apiItem, node as DocLinkTag);
    case 'CodeSpan':
      return '`' + (node as DocCodeSpan).code + '`';
    case 'PlainText':
      return (node as DocPlainText).text;
    case 'SoftBreak':
      return ' ';
    default:
      return '';
  }
}

/**
 * Render a link into text. For now we just extract the text or the code item name
 * (rather than returning an actual link).
 */
function renderLinkTag(apiModel: ApiModel, apiItem: ApiItem, link: DocLinkTag): string {
  if (link.linkText) {
    return link.linkText;
  } else if (link.codeDestination) {
    const result = apiModel.resolveDeclarationReference(link.codeDestination, apiItem);
    if (result.resolvedApiItem) {
      return result.resolvedApiItem.getScopedNameWithinPackage();
    }
  }
  return '';
}

/**
 * Loops through excerpt tokens and returns a token array with hyperlink data.
 * In cases where multiple consecutive original tokens don't contain a link, they will be combined
 * to decrease file size and client processing time.
 * @param collectedData - Used to create links from reference tokens
 * @param excerptTokens - Token list containing the relevant info
 * @param excerptTokenRange - Specific relevant range within `excerptTokens`
 * @param isTypeAlias - If true, remove the "export declare" part from the result and don't make
 * a link from the type name (since it will be a self-link).
 */
export function getTokenHyperlinks(
  collectedData: ICollectedData,
  excerptTokens: ReadonlyArray<ExcerptToken>,
  excerptTokenRange: Readonly<IExcerptTokenRange>,
  isTypeAlias?: boolean,
): ILinkToken[] {
  const initialTokens = getTokensInRange(excerptTokens, excerptTokenRange).map((token: ExcerptToken) => {
    const result: ILinkToken = { text: token.text };
    if (token.kind === 'Reference') {
      const page = collectedData.pagesByApi.get(token.text);
      if (page) {
        result.linkedPage = page.name;
        result.linkedPageGroup = page.group;
      }
    }
    return result;
  });

  const conciseTokens: ILinkToken[] = [];
  for (const token of initialTokens) {
    const prevToken = conciseTokens.slice(-1)[0];
    if (prevToken && !prevToken.linkedPage && !token.linkedPage) {
      prevToken.text += token.text;
    } else {
      conciseTokens.push(token);
    }
  }

  if (isTypeAlias && conciseTokens.length >= 2) {
    const [firstToken, secondToken] = conciseTokens;
    // The "export declare" part for a type alias (from firstToken) isn't very helpful,
    // and neither is a self-link for the type name (secondToken). Get rid of them.
    if (firstToken.text === 'export declare type ' && secondToken.linkedPage) {
      firstToken.text = firstToken.text.replace('export declare ', '') + secondToken.text;
      conciseTokens.splice(1, 1);
    }
  }

  return conciseTokens;
}

/**
 * Renders the doc node (likely a DocComment's DocSection) without the inline tag
 */
export function renderDocNodeWithoutInlineTag(docSection?: DocSection): string {
  let result = '';
  if (docSection) {
    if (docSection.kind === DocNodeKind.InlineTag) {
      return result.trim();
    } else if (docSection instanceof DocExcerpt) {
      result += docSection.content.toString();
    }
    for (const childNode of docSection.getChildNodes()) {
      result += renderDocNodeWithoutInlineTag(childNode as DocSection);
    }
  }
  return result;
}

/**
 * Finds an inline tag by name from the provided doc comment
 */
export function findInlineTagByName(tagName: string, docComment: DocComment): DocInlineTag | undefined {
  if (docComment instanceof DocInlineTag && docComment.tagName === tagName) {
    return docComment;
  }
  for (const childNode of docComment.getChildNodes()) {
    const result: DocInlineTag | undefined = findInlineTagByName(tagName, childNode as DocComment);
    if (result) {
      return result;
    }
  }
  return undefined;
}

/**
 * Gets the block tag by name
 */
export function getBlockTagByName(tagName: string, docComment: DocComment): DocSection | undefined {
  const tag = docComment.customBlocks.find(
    (customBlock: DocBlock) => customBlock.blockTag.tagName === tagName.toLowerCase(),
  );
  return tag && tag.content;
}

/**
 * Convert a range of tokens to a string.
 */
export function renderTokens(
  excerptTokens: ReadonlyArray<ExcerptToken>,
  excerptTokenRange: Readonly<IExcerptTokenRange>,
): string {
  return getTokensInRange(excerptTokens, excerptTokenRange)
    .map((token: ExcerptToken) => token.text)
    .join('');
}

function getTokensInRange(
  excerptTokens: ReadonlyArray<ExcerptToken>,
  excerptTokenRange: Readonly<IExcerptTokenRange>,
): ReadonlyArray<ExcerptToken> {
  return excerptTokens.slice(excerptTokenRange.startIndex, excerptTokenRange.endIndex);
}
