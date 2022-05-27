To determine initials for an avatar, the code initially tries to extract two-letter initials from `contactName`. If that isn't successful, it falls back to trying the first initial of the `contactEmail`. If the algorithm fails to extract a character from the `contactEmail`, it falls back to the `#` character to represent the generic user.

<DisplayToggle onText="Dark" offText="Light" label="Theme Switcher">
### Initials

```Swift
// Without an image
AvatarView(avatarSize: size, contactName: "Amanda Brady", contactEmail: "Amanda.Brady@example.com", contactImage: nil)
```

<img className="off" src="https://static2.sharepointonline.com/files/fabric-cdn-prod_20200504.001/fabric-website/images/controls/macos/Persona/avatar_initials_light.png?text=LightMode" />
<img className="on" src="https://static2.sharepointonline.com/files/fabric-cdn-prod_20200504.001/fabric-website/images/controls/macos/Persona/avatar_initials_dark.png?text=DarkMode" />

### Profile

```Swift
// With an image
AvatarView(avatarSize: size, contactName: "Amanda Brady", contactEmail: "Amanda.Brady@example.com", contactImage: NSImage(named: "Amanda"))
```

<img className="off" src="https://static2.sharepointonline.com/files/fabric-cdn-prod_20200504.001/fabric-website/images/controls/macos/Persona/avatar_profilepicture_light.png?text=LightMode" />
<img className="on" src="https://static2.sharepointonline.com/files/fabric-cdn-prod_20200504.001/fabric-website/images/controls/macos/Persona/avatar_profilepicture_dark.png?text=DarkMode" />

</DisplayToggle>
