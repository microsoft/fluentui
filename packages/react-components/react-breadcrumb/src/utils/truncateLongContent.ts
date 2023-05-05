const MAX_NAME_LENGTH = 30;
const MAX_TOOLTIP_LENGTH = 80;

export const truncate = (content: string, maxLength: number): string => {
  return content.length > maxLength
    ? content
        .trim()
        .slice(0, maxLength - 3)
        .concat('...')
    : content;
};

export const truncateLongName = (content: string, maxLength?: number): string => {
  const truncateLength = maxLength || MAX_NAME_LENGTH;
  return truncate(content, truncateLength);
};

export const truncateLongTooltip = (content: string, maxLength?: number): string => {
  const truncateLength = maxLength || MAX_TOOLTIP_LENGTH;
  return truncate(content, truncateLength);
};
