---
name: WingsRiver
colors:
  surface: '#f9f9f8'
  surface-dim: '#d9dad9'
  surface-bright: '#f9f9f8'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f4f3'
  surface-container: '#edeeed'
  surface-container-high: '#e7e8e7'
  surface-container-highest: '#e1e3e2'
  on-surface: '#191c1c'
  on-surface-variant: '#424841'
  inverse-surface: '#2e3131'
  inverse-on-surface: '#f0f1f0'
  outline: '#727971'
  outline-variant: '#c2c8bf'
  surface-tint: '#436649'
  primary: '#092d15'
  on-primary: '#ffffff'
  primary-container: '#214329'
  on-primary-container: '#8ab08e'
  inverse-primary: '#a9d0ad'
  secondary: '#506354'
  on-secondary: '#ffffff'
  secondary-container: '#d3e8d5'
  on-secondary-container: '#56695a'
  tertiary: '#735c00'
  on-tertiary: '#ffffff'
  tertiary-container: '#cba72f'
  on-tertiary-container: '#4e3d00'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#c5edc8'
  primary-fixed-dim: '#a9d0ad'
  on-primary-fixed: '#00210b'
  on-primary-fixed-variant: '#2c4e33'
  secondary-fixed: '#d3e8d5'
  secondary-fixed-dim: '#b7ccb9'
  on-secondary-fixed: '#0e1f13'
  on-secondary-fixed-variant: '#394b3d'
  tertiary-fixed: '#ffe088'
  tertiary-fixed-dim: '#e9c349'
  on-tertiary-fixed: '#241a00'
  on-tertiary-fixed-variant: '#574500'
  background: '#f9f9f8'
  on-background: '#191c1c'
  surface-variant: '#e1e3e2'
typography:
  headline-xl:
    fontFamily: Hanken Grotesk
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-xl-mobile:
    fontFamily: Hanken Grotesk
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Hanken Grotesk
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
  headline-md:
    fontFamily: Hanken Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-caps:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 8px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 40px
  max-width: 1440px
---

## Brand & Style
The brand identity for WingsRiver centers on operational excellence and the high-touch nature of the hospitality industry. It evokes a sense of calm authority, designed to serve as a reliable backbone for high-pressure restaurant environments. 

The aesthetic is **Corporate / Modern** with a focus on precision and utility. By utilizing a deep, grounded primary palette and expansive whitespace, the design system creates a focused environment that reduces cognitive load for managers. The UI remains sophisticated yet functional, balancing the elegance of a fine-dining establishment with the robust technical requirements of a SaaS platform.

## Colors
The palette is anchored by a deep forest green (#214329), providing a sense of stability and prestige. 

- **Primary:** Used for key brand moments, primary actions, and navigational anchors.
- **Secondary:** A muted sage that serves as a bridge between the deep primary and light backgrounds, ideal for secondary buttons or active states.
- **Tertiary:** A refined gold, used sparingly for "Special Offers," "VIP Status," or critical highlights that require immediate attention without being alarming.
- **Neutral:** A cool, crisp white-to-gray scale that ensures the interface feels airy and organized. Surface containers use subtle shifts in gray to define hierarchy rather than heavy lines.

## Typography
The typography system prioritizes legibility under varying light conditions (common in restaurant settings). 

**Hanken Grotesk** provides a sharp, contemporary look for headlines, giving the platform a modern SaaS feel. **Inter** is used for all body copy due to its exceptional readability and neutral tone. **JetBrains Mono** is introduced for labels and data points (like SKU numbers, timestamps, or table IDs) to provide a distinct visual cue for technical information. 

Large display type should use tighter letter-spacing, while small labels should be slightly tracked out to ensure clarity.

## Layout & Spacing
The layout follows a **Fluid Grid** model built on an 8px base unit. 

- **Desktop:** A 12-column grid with 24px gutters. Sidebars are fixed at 280px to maximize the working area for data-heavy tables and floor plans.
- **Tablet:** An 8-column grid. The interface should prioritize touch-targets (minimum 44x44px).
- **Mobile:** A 4-column grid with 16px margins. Complex data tables should collapse into "Card" views to maintain readability.

Spacing should be generous between sections (48px+) to prevent the management dashboard from feeling cluttered, while density can be increased within data tables using 8px vertical padding.

## Elevation & Depth
Depth is communicated through **Tonal Layers** supplemented by **Ambient Shadows**. 

The background uses a slightly off-white neutral. Main content areas (cards, tables) are pure white with a very soft, diffused shadow (0px 4px 20px rgba(33, 67, 41, 0.05)). This subtle green-tinted shadow connects the depth system back to the primary brand color. 

Modals and pop-overs use a higher elevation with a more pronounced shadow to create a clear "focus" layer. Overlays should use a 40% opacity blur of the primary color to keep the user grounded in the brand's atmosphere.

## Shapes
A **Soft** shape language (roundedness 1) is used throughout the design system. 

- Standard components (buttons, inputs) utilize a 4px (0.25rem) corner radius. 
- Large containers and cards use an 8px (0.5rem) radius. 
- Status indicators (chips) are the only elements allowed to be fully pill-shaped, ensuring they are instantly recognizable as distinct from interactive buttons.

This geometric approach maintains a professional, structured feel while avoiding the coldness of sharp 90-degree corners.

## Components
- **Buttons:** Primary buttons use the deep #214329 background with white text. Secondary buttons use a 1px border of the primary color. Action icons within buttons should always be 20px.
- **Input Fields:** Use a light gray background (#F1F3F1) with a 1px bottom border. On focus, the border transitions to the primary green. Labels should use the `label-caps` style.
- **Cards:** Cards are the primary container for data. They should have no border, a white background, and the standard soft elevation.
- **Chips/Badges:** Used for order status (e.g., "Pending," "Served"). These use low-saturation background tints of semantic colors (Red for alert, Green for success) with high-contrast text.
- **Lists:** Table rows should have a hover state with a 2% opacity primary color tint to aid row tracking in dense data views.
- **Restaurant Specifics:** Custom components include a "Floor Plan Node" (draggable table representations) and "Kitchen Timers" which utilize the monospace label font for countdowns.