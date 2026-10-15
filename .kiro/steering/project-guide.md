---
inclusion: auto
name: Project Guide
description: Life Dashboard project structure and coding standards
---

# Life Dashboard — Project Guide

## 📋 Project Overview

Life Dashboard adalah aplikasi web personal productivity yang dibangun dengan vanilla HTML, CSS, dan JavaScript. Tidak menggunakan framework atau build tools - murni web technologies.

## 🏗️ Struktur Proyek

```
.
├── .kiro/                  # Kiro configuration
│   ├── hooks/             # Automation hooks
│   ├── settings/          # MCP and other settings
│   └── steering/          # Project guidelines
├── css/
│   └── style.css          # Premium styling (22+ KB)
├── js/
│   └── app.js             # Application logic (~8.5 KB)
├── index.html             # Main HTML structure
└── README.md              # Documentation
```

## 🎨 Coding Standards

### CSS Guidelines

1. **CSS Variables** — Gunakan CSS custom properties untuk theming
   - Definisikan di `:root` dan `[data-theme="dark"]`
   - Naming convention: `--property-variant` (e.g., `--text-soft`, `--shadow-md`)

2. **Animations** — Gunakan hardware-accelerated properties
   - Prefer `transform` dan `opacity`
   - Gunakan `cubic-bezier(0.4, 0, 0.2, 1)` untuk smooth easing
   - Durasi standar: 300ms

3. **Responsive Design**
   - Mobile-first approach
   - Breakpoints: 390px, 640px, 960px
   - Gunakan `clamp()` untuk fluid typography

4. **Naming Convention**
   - BEM-inspired: `.component-element--modifier`
   - Utility classes: `.sr-only`, `.hidden`

### JavaScript Guidelines

1. **Code Organization**
   - Modular sections dengan comments
   - Helper functions di atas
   - Event listeners terkumpul per feature

2. **Data Persistence**
   - Local Storage sebagai single source of truth
   - Key: `"lifeDashboard"`
   - Always handle JSON parse errors

3. **State Management**
   ```javascript
   const state = {
     theme: "light",
     name: "",
     duration: 25,
     tasks: [],
     links: []
   }
   ```

4. **DOM Manipulation**
   - Use `getElementById()` via helper `$(id)`
   - Minimize reflows
   - Batch DOM updates

### HTML Guidelines

1. **Accessibility**
   - ARIA labels pada interactive elements
   - Semantic HTML tags
   - `.sr-only` untuk screen readers
   - Proper heading hierarchy

2. **Performance**
   - Preconnect ke Google Fonts
   - Meta tags untuk optimal rendering
   - No external dependencies

## 🎯 Feature Specifications

### Focus Timer
- Default: 25 minutes (Pomodoro)
- Range: 1-180 minutes
- Controls: Start, Stop, Reset
- Audio notification on completion
- Progress bar dengan shimmer effect

### To-Do List
- CRUD operations: Create, Read, Update, Delete
- Mark as complete
- Duplicate prevention
- Local storage persistence

### Quick Links
- Add custom links with names
- Auto-prepend https:// if missing
- Avatar dengan first letter
- Remove functionality

### Theme Toggle
- Light/Dark mode
- Persist preference
- Smooth transitions
- Icon changes

## 🚀 Development Workflow

### Making Changes

1. **CSS Changes**
   - Test di both themes (light/dark)
   - Verify responsive behavior
   - Check animation performance
   - Maintain CSS variable consistency

2. **JavaScript Changes**
   - Test all CRUD operations
   - Verify localStorage updates
   - Check error handling
   - Ensure no console errors

3. **HTML Changes**
   - Validate accessibility
   - Check semantic structure
   - Test keyboard navigation

### Testing Checklist

- [ ] Functionality works as expected
- [ ] No console errors
- [ ] Responsive on mobile/tablet/desktop
- [ ] Both light and dark themes work
- [ ] Data persists after refresh
- [ ] Accessibility (ARIA, keyboard nav)
- [ ] Smooth animations (no jank)

## 🎨 Design Principles

### Visual Hierarchy
1. Time display (largest, gradient)
2. Section headings (bold, 800 weight)
3. Interactive elements (prominent, animated)
4. Supporting text (muted colors)

### Interaction Patterns
- **Hover** — Lift effect (translateY)
- **Focus** — Ring outline + transform
- **Active** — Slightly pressed (translateY(0))
- **Disabled** — 50% opacity

### Color Usage
- **Primary Gradient** — Hero elements, CTAs
- **Secondary Colors** — Supporting UI
- **Semantic Colors** — Success, danger, warning
- **Neutral Scale** — Text, borders, backgrounds

## 🔧 Common Tasks

### Add New Feature
1. Update state structure in `app.js`
2. Add HTML markup in `index.html`
3. Style with CSS following patterns
4. Implement logic in `app.js`
5. Add to localStorage save/load
6. Update README.md

### Modify Theme Colors
1. Update `:root` for light mode
2. Update `[data-theme="dark"]` for dark mode
3. Test all components
4. Verify gradients and shadows

### Add Animation
1. Define keyframes at bottom of CSS
2. Apply to element with `animation` property
3. Use `cubic-bezier` easing
4. Test with `prefers-reduced-motion`

## 📚 Resources

- **Fonts**: DM Sans (Google Fonts)
- **Icons**: Inline SVG
- **Storage**: Local Storage API
- **Audio**: Web Audio API (optional beep)

## ⚠️ Important Notes

1. **No Dependencies** — Keep it dependency-free
2. **Browser Support** — Modern browsers (ES6+)
3. **Privacy** — All data stays local
4. **Performance** — No external API calls
5. **Accessibility** — WCAG 2.1 AA compliant

## 🎓 Learning Objectives

Proyek ini mengajarkan:
- Modern CSS (variables, gradients, animations, glassmorphism)
- Vanilla JavaScript patterns
- Local Storage API
- Responsive design
- Accessibility best practices
- Performance optimization
- State management without frameworks

---

**Last Updated**: October 2026
**Version**: 2.0 Premium Edition
