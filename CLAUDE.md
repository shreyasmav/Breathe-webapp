# CLAUDE.md - Breathe-webapp

## Project Overview

Breathe-webapp is a guided breathing exercise web application that helps users practice controlled breathing through visual animations. It guides users through a repeating cycle: breathe in, hold, breathe out.

**Tech stack:** Vanilla HTML, CSS, and JavaScript. No frameworks, no build tools, no package manager.

**Deployment:** Static files served via Netlify at https://breathe-webapp.netlify.app/

## File Structure

```
/
├── index.html      # Single-page HTML entry point
├── script.js       # Breathing animation logic
├── style.css       # Styling and CSS keyframe animations
├── img/
│   └── bg.jpg      # Background image
└── README.md       # Project description
```

## Architecture

### Breathing Animation Cycle

The animation runs on a **7.5-second cycle** defined in `script.js`:

| Phase       | Duration | CSS Class         | Visual Effect       |
|-------------|----------|-------------------|---------------------|
| Breathe In  | 3.0s     | `.container.grow`   | Circle scales 1 → 1.2 |
| Hold        | 1.5s     | (no change)       | Circle stays scaled  |
| Breathe Out | 3.0s     | `.container.shrink` | Circle scales 1.2 → 1 |

**Timing constants** (`script.js`):
- `totalTime = 7500` (full cycle in ms)
- `breatheTime = 3000` (inhale duration, calculated as `totalTime / 5 * 2`)
- `holdTime = 1500` (hold duration, calculated as `totalTime / 5`)

### How It Works

1. `script.js` selects DOM elements by ID (`container`, `text`)
2. `breathAnimation()` sets CSS classes on the container to trigger grow/shrink keyframe animations
3. Text content updates to show current phase ("Breathe In!", "Hold", "Breathe Out!")
4. A rotating pointer (CSS `rotate` animation, 7.5s cycle) visually tracks progress around the circle
5. `start()` calls `breathAnimation()` and sets up the interval; `stop()` clears all timers
6. Clicking the container toggles pause/resume — adds `.paused` class and stops timers

### Accessibility

- `aria-live="polite"` on the text element announces phase changes to screen readers
- `role="img"` and `aria-label` on the container describe the animation
- `<meta name="description">` provides context for search engines and assistive tools

### Styling

- **Font:** Montserrat (Google Fonts import)
- **Color scheme:** Green/teal (`#224941` background fallback, `#55b7a4`/`#336d62` gradient)
- **Layout:** Flexbox centering, full viewport height
- **Responsive:** Container uses `min(300px, 70vw)` for mobile-friendly sizing; gradient circle uses `calc()` and `transform: translate(-50%, -50%)` for robust centering
- **Animations:** CSS `@keyframes` for `grow`, `shrink`, `rotate`, and `fadeIn` (page load)
- **Circle decoration:** Conic gradient ring around the breathing circle
- **Interaction:** `cursor: pointer` and `user-select: none` on the container for click-to-pause

## Development Workflow

### Running Locally

No build step required. Open `index.html` directly in a browser, or use any static file server:

```bash
# Python
python3 -m http.server 8000

# Node.js (if npx available)
npx serve .
```

### No Build Tools

There is no `package.json`, no bundler, no transpiler. Edit files directly and refresh the browser.

### No Testing or Linting

No test framework, linter, or formatter is configured. There are no automated tests.

### No CI/CD Pipelines

No GitHub Actions or other CI workflows exist. Deployment to Netlify happens via direct static file serving.

## Conventions for AI Assistants

- **Keep it vanilla:** Do not introduce frameworks (React, Vue, etc.), build tools (Webpack, Vite), or package managers unless explicitly requested
- **DOM manipulation:** Use `document.getElementById()` for element selection, consistent with existing code
- **Animations:** Prefer CSS `@keyframes` animations triggered by toggling CSS classes via JavaScript
- **Timing:** Breathing timing values derive from `totalTime` — modify that single constant to change the overall pace
- **Styling:** Maintain the existing green/teal color palette and Montserrat font
- **File organization:** This is a flat, single-page app — keep all JS in `script.js` and all CSS in `style.css` unless the project grows significantly
