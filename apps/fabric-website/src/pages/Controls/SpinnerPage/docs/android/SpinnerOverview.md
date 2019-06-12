When you've exhausted all technical avenues for making a user flow faster, a progress indicator should be used to give the user feedback that the system is busy. Use these feedback animations when you expect the user will have to wait for 2 seconds or more.

For pauses between 2 seconds and 400 milliseconds, adding animations may actually make the experience feel more chaotic. Under 400 milliseconds, most delays in loading new content are perceived as fast, and no feedback is needed.

Use a standalone spinner when you need a progress indicator on an existing surface (such as a view that's already displayed but no content is shown yet, or when the user pulls-to-refresh, revealing the empty space above the scrolling list).

<img src="https://static2.sharepointonline.com/files/fabric/fabric-website/images/controls/android/progress/circular-progress.png" alt="Example of a Spinner on Android" style="width: 50%;" />
