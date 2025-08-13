# Stagger Component Examples

This directory contains comprehensive Storybook examples demonstrating the `Stagger` choreography component with various FluentUI React components and motion types.

## Overview

The `Stagger` component provides choreographed animations for lists and grids, allowing items to appear with delayed timing for a smooth, visually appealing experience. These examples showcase real-world usage patterns with different motion components and UI patterns.

## Examples

### 1. UserCards (`StaggerUserCards.stories.tsx`)

- **Motion**: Slide animation with fade
- **Use Case**: Social media feeds, activity streams
- **Components**: Avatar, Card, CardHeader, CardFooter, Badge
- **Features**:
  - User posts with avatars and presence indicators
  - Interactive like buttons
  - Responsive card layout
  - Social media-style interactions

### 2. DashboardTiles (`StaggerDashboard.stories.tsx`)

- **Motion**: Scale animation for tile reveals
- **Use Case**: Business dashboards, analytics panels
- **Components**: Card, Badge, Text with custom styling
- **Features**:
  - KPI metrics and status indicators
  - Trend visualization
  - Grid-based layout
  - Performance data display

### 3. NotificationCenter (`StaggerNotifications.stories.tsx`)

- **Motion**: Slide-in animation from right
- **Use Case**: Notification panels, alert systems
- **Components**: Avatar, Card, Badge with status colors
- **Features**:
  - Different notification types (urgent, info, success)
  - Dismissible cards
  - Unread indicators
  - System message formatting

### 4. TeamDirectory (`StaggerTeamDirectory.stories.tsx`)

- **Motion**: Combined fade and scale animation
- **Use Case**: Employee directories, team pages
- **Components**: Avatar with presence, Card, Badge, Button
- **Features**:
  - Employee profiles with status
  - Role and department indicators
  - Contact actions (email, chat, call)
  - Expertise tags

### 5. FileExplorer (`StaggerFileExplorer.stories.tsx`)

- **Motion**: Collapse animation for file reveals
- **Use Case**: File management, document libraries
- **Components**: Card, Badge, Button with file icons
- **Features**:
  - File type icons and metadata
  - Status badges (recent, shared)
  - Quick actions (view, share, more)
  - File size and modification dates

### 6. ShoppingCart (`StaggerShoppingCart.stories.tsx`)

- **Motion**: Slide animation with interactive elements
- **Use Case**: E-commerce, shopping applications
- **Components**: Avatar (product images), Card, Input, Button
- **Features**:
  - Product cards with images and pricing
  - Quantity controls
  - Sale indicators and stock status
  - Cart total calculation

### 7. InteractiveControls (`StaggerInteractiveControls.stories.tsx`)

- **Motion**: Different animations per section (Fade, Rotate, Scale)
- **Use Case**: Settings panels, configuration forms
- **Components**: Full range of form controls (Input, Select, Radio, Checkbox, Slider)
- **Features**:
  - Multiple form control types
  - Real-time validation feedback
  - Different motion types per section
  - Interactive form state

### 8. AdvancedConfiguration (`StaggerAdvancedConfiguration.stories.tsx`)

- **Motion**: All motion types with real-time switching
- **Use Case**: Animation tools, developer interfaces
- **Components**: Complete control panel with all motion variants
- **Features**:
  - Live motion type selection
  - Timing and delay controls
  - Animation playback controls
  - Progress tracking and statistics
  - Real-time configuration changes

## Motion Components Used

- **Fade**: Opacity transitions for subtle appearances
- **Scale**: Size-based animations for emphasis
- **Slide**: Directional movement animations
- **Collapse**: Height-based reveals for content
- **Blur**: Focus-based transitions
- **Rotate**: Rotational animations for icons/controls

## Common Patterns

### Timing Configuration

- `itemDelay`: 80-150ms for optimal perception
- `itemDuration`: 350-600ms for smooth transitions
- `appear`: Always enabled for initial load animations

### Animation Variants

```tsx
const CustomVariant = createPresenceComponentVariant(MotionComponent, {
  duration: motionTokens.durationSlow,
});
```

### Stagger Setup

```tsx
<Stagger presence visible={visible} reversed={reversed} appear itemDelay={120} itemDuration={400}>
  {items.map(item => (
    <AnimationVariant key={item.id}>
      <YourComponent />
    </AnimationVariant>
  ))}
</Stagger>
```

## Best Practices

1. **Consistent Timing**: Use motionTokens for consistent timing across examples
2. **Responsive Design**: All examples work on various screen sizes
3. **Accessibility**: Proper ARIA labels and keyboard navigation
4. **Performance**: Efficient animations that don't block UI interactions
5. **Real Data**: Examples use realistic data structures and content

## Development Notes

- All examples include proper TypeScript typing
- Lint-free code following FluentUI conventions
- Comprehensive Storybook documentation
- Interactive controls for testing different configurations
- Error handling for edge cases
