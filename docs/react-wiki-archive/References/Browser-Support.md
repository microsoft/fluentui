# Browser support

Fluent UI React supports many commonly used web browsers such as Google Chrome, Mozilla Firefox, Apple Safari, and Microsoft Edge. For browsers outside of this matrix, proper behavior of the components may be good but is not guaranteed.

| Browser                             | `@fluentui/react` version 8 | `office-ui-fabric-react` version 7 | `@fluentui/react-northstar` | `@fluentui/react-components` version 9 |
| :---------------------------------- | :-------------------------- | :--------------------------------- | --------------------------- | -------------------------------------- |
| Microsoft Edge Chromium             | ✅                          | ✅                                 | ✅                          | ✅ >= 84                               |
| Google Chrome (latest 2 versions)   | ✅                          | ✅                                 | ✅                          | ✅ >= 84                               |
| Mozilla Firefox (latest 2 versions) | ✅                          | ✅                                 | ✅                          | ✅ >= 75                               |
| Apple Safari (latest 2 versions)    | ✅                          | ✅                                 | ✅                          | ✅ >= 14.1                             |
| Microsoft Edge Legacy               | See below                   | ✅                                 |                             |                                        |
| Internet Explorer 11                | See below                   | ✅                                 |                             |                                        |
| Internet Explorer 9, 10             |                             |                                    |                             |                                        |

## @fluentui/react-components version 9:

- For the full breakdown of the `@fluentui/react-components` browser support matrix and other browser related philosophies we're following, see docsite [here](https://react.fluentui.dev/?path=/docs/concepts-developer-browser-support-matrix--docs).

## Internet Explorer 11 and Microsoft Edge Legacy

[As of June 15th, 2022 Internet Explorer has been sunset](https://github.com/microsoft/fluentui/wiki/Internet-Explorer-11-Sunset). [Microsoft Edge Legacy support ended on March 9th, 2021](https://support.microsoft.com/en-us/microsoft-edge/what-is-microsoft-edge-legacy-3e779e55-4c55-08e6-ecc8-2333768c0fb0). While Fluent may continue to work in IE and Edge Legacy bug fixes and enhancements after this date may affect IE and Edge Legacy compatibility.

As of June 15th, 2022, we will only fix IE 11 and Edge Legacy bugs in `@fluentui/react` if:

1. They block major functionality
2. There is a major accessibility bug

## Mobile Browser support for `@fluentui/react` version 8

Mobile browser support for `@fluentui/react` version 8 is done on a best effort basis. In many cases the controls work and are used. We will strive to fix major functionality that is broken across the board on mobile without workarounds. However, for issues impacting specific browsers, we likely won't be able to prioritize fixing it, but we will welcome PRs that do no regress other browsers.

## Testing `@fluentui/react` version 8 in IE 11

### Doc/demo sites

The public doc site (https://developer.microsoft.com/fluentui) and legacy demo site (https://aka.ms/fluentdemo) should both work in IE 11.

### Testing local changes

To test local changes in IE 11, you must use the legacy demo app (`yarn start:legacy`) due to lack of IE 11 support in storybook. You'll also need to edit a registry setting [as detailed here](https://github.com/microsoft/fluentui/issues/19222#issuecomment-892886588).

### CodePen

CodePen's main UI doesn't support IE 11, but you can view a pen in IE 11 using debug mode.

1. Open the pen in another browser
2. If it's not your pen, create a fork (you can only create debug mode links for your own pens)
3. In the view menu, choose "Debug mode", copy the URL of the tab that opens, and paste that into IE 11
   <!-- this image URL format won't display in editor previews but works properly on the actual page -->
   ![debug mode setting](images/debug-mode.png)

Once generated, a debug mode link can be viewed by anyone, but they expire after a certain period of time and have to be re-generated (so it's not very useful putting them in issue descriptions/comments).
