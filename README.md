- [ ] Filter only published posts'
    - [link](https://akashrajpurohit.com/blog/set-up-draft-pages-effectively-in-astro-with-configdriven-content-authoring/)

## Fix

- [ ] When clicking anchors in posts, in puts the anchor in the top of the page, hiding due to gradient

## Enhancements

- [ ] Enhance api source code
- [ ] Check if there's a css way to apply gradient. [link](https://twitter.com/Una/status/1775508527731069069)

```css
@keyframes appear {
    from {
        opacity: 0;
        scale: 0.8;
    }

    to {
        opacity: 1;
        scale: 1;
    }
}

img {
    animation: appear linear both;
    animation-timeline: view();
    animation-range: entry 25% cover 50%;
}
```
