# Card Migration

v8 `DocumentCard` and its variants map to v9's composable `Card` family in `@fluentui/react-components`.

## Component Renames

| v8                                     | v9            | Notes                                             |
| -------------------------------------- | ------------- | ------------------------------------------------- |
| `DocumentCard`                         | `Card`        | More generic, less opinionated                    |
| `DocumentCardDetails`                  | `CardHeader`  |                                                   |
| `DocumentCardTitle`                    | —             | Use `Text` component                              |
| `DocumentCardActivity` (activity prop) | `CardHeader`  | Use `description` prop                            |
| `DocumentCardActivity` (people prop)   | `CardHeader`  | Use `image` + `header` props                      |
| `DocumentCardActions`                  | `CardFooter`  |                                                   |
| `DocumentCardPreview`                  | `CardPreview` | No `previewImages` array — pass children directly |

## Prop Mapping — DocumentCard → Card

| v8              | v9          | Notes                                                |
| --------------- | ----------- | ---------------------------------------------------- |
| `className`     | `className` |                                                      |
| `componentRef`  | `ref`       |                                                      |
| `onClick`       | `onClick`   |                                                      |
| `onClickHref`   | —           | Implement via `onClick`                              |
| `onClickTarget` | —           | Implement via `onClick`                              |
| `role`          | `role`      |                                                      |
| `styles`        | `className` |                                                      |
| `theme`         | —           | Use `FluentProvider`                                 |
| `type`          | —           | Use `orientation="horizontal"` for horizontal layout |

## Prop Mapping — DocumentCardActions → CardFooter

| v8             | v9          | Notes                                                 |
| -------------- | ----------- | ----------------------------------------------------- |
| `className`    | `className` |                                                       |
| `componentRef` | `ref`       |                                                       |
| `views`        | —           | Create a view-count element and pass to `action` prop |
| `role`         | `role`      |                                                       |
| `styles`       | `className` |                                                       |
| `theme`        | —           | Use `FluentProvider`                                  |

## Prop Mapping — DocumentCardPreview → CardPreview

| v8                             | v9          | Notes                                            |
| ------------------------------ | ----------- | ------------------------------------------------ |
| `className`                    | `className` |                                                  |
| `componentRef`                 | `ref`       |                                                  |
| `previewImages`                | `children`  | Pass `<img>` or any element as children directly |
| `maxDisplayCount`              | —           | Implement custom overflow via `Card` composition |
| `getOverflowDocumentCountText` | —           | Implement custom overflow via `Card` composition |
| `styles`                       | `className` |                                                  |
| `theme`                        | —           | Use `FluentProvider`                             |

## Before / After

```tsx
// v8
import { DocumentCard, DocumentCardPreview, DocumentCardTitle, DocumentCardActivity } from '@fluentui/react';

<DocumentCard onClick={handleClick}>
  <DocumentCardPreview previewImages={[{ previewImageSrc: imgSrc }]} />
  <DocumentCardTitle title="Report.pdf" />
  <DocumentCardActivity activity="Modified Jan 1" people={[{ name: 'Alice', profileImageSrc: avatarSrc }]} />
</DocumentCard>;

// v9
import { Card, CardHeader, CardPreview } from '@fluentui/react-components';

<Card onClick={handleClick}>
  <CardPreview>
    <img src={imgSrc} alt="Report preview" />
  </CardPreview>
  <CardHeader
    image={<img src={avatarSrc} alt="Alice" />}
    header={<Text weight="semibold">Report.pdf</Text>}
    description="Modified Jan 1 · Alice"
  />
</Card>;
```
