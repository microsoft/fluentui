const MAX_NAME_LENGTH = 30;
const MAX_TOOLTIP_LENGTH = 80;

const truncateBreadcrumb = (content: string, maxLength: number): string => {
  return content.length > maxLength ? content.trim().slice(0, maxLength).concat('...') : content;
};

export const truncateBreadcrumbLongName = (content: string, maxLength?: number): string => {
  const truncateLength = maxLength || MAX_NAME_LENGTH;
  return truncateBreadcrumb(content, truncateLength);
};

export const truncateBreadcrumLongTooltip = (content: string, maxLength?: number): string => {
  const truncateLength = maxLength || MAX_TOOLTIP_LENGTH;
  return truncateBreadcrumb(content, truncateLength);
};
