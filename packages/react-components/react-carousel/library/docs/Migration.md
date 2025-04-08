# Carousel Migration Guide

## Migration from react-northstar

The northstar carousel utilized a single wrapper with data props, in v9, composable Carousel pieces can be used to fit together, the number, order and styles of CarouselCards within a CarouselSlider is what will drive the majority of Carousel logic, stored and accessed via context provided in the Carousel wrapper.

### Prop mapping

- `items` prop => CarouselCard elements
- `navigation` on the control => CarouselNav/CarouselNavButton/CarouselButton are utilized independently for carousel control, this can also be overwritten externally via the controlled index props - a CarouselNavContainer is provided to simplify this process.

### Example

#### northstar

```jsx
<Carousel
  navigation={{
    items: carouselItems.map((item, index) => ({
      key: item.id,
    })),
  }}
  items={carouselItems}
/>
```

#### v9

```jsx
  <Carousel>
    <CarouselSlider>
      {Cards.map((_cardProps, index) => (
        <CarouselCard>
          Card {index + 1}
        </BannerCard>
      ))}
    </CarouselSlider>
    <CarouselNavContainer>
      <CarouselNav>{index => <CarouselNavButton/>}</CarouselNav>
    </CarouselNavContainer>
  </Carousel>
```

### Aria props

Aria props can be directly passed to their intended elements, or to sub-components via the slot props, a similar pattern to react-northstar aria should be implemented
