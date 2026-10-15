# CSS Patterns — Life Dashboard

> Panduan pola CSS yang digunakan dalam proyek ini

## 🎨 CSS Variables System

### Light Mode Variables
```css
:root {
  /* Colors */
  --bg: #f8f9fd;
  --surface: rgba(255,255,255,.85);
  --text: #0f1419;
  --accent: #6366f1;
  
  /* Shadows */
  --shadow-sm: 0 2px 4px rgba(0,0,0,.04);
  --shadow-md: 0 10px 40px -10px rgba(99,102,241,.15);
  
  /* Radius */
  --radius-lg: 28px;
  --radius-md: 18px;
  
  /* Gradients */
  --gradient-primary: linear-gradient(135deg, #6366f1, #8b5cf6, #ec4899);
}
```

### Usage
```css
.element {
  background: var(--surface);
  color: var(--text);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-md);
}
```

## ✨ Glassmorphism Pattern

```css
.glass-element {
  background: var(--gradient-surface);
  backdrop-filter: blur(20px);
  border: 1px solid var(--border);
  box-shadow: var(--shadow-md);
}
```

Digunakan pada:
- Cards
- Topbar
- Theme toggle
- Status badges

## 🎭 Animation Patterns

### Hover Lift Effect
```css
.card {
  transition: all .4s cubic-bezier(0.4, 0, 0.2, 1);
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-xl);
}
```

### Ripple Effect
```css
.btn::before {
  content: '';
  position: absolute;
  top: 50%; left: 50%;
  width: 0; height: 0;
  border-radius: 50%;
  background: rgba(255,255,255,.3);
  transform: translate(-50%, -50%);
  transition: width .6s, height .6s;
}

.btn:hover::before {
  width: 300px;
  height: 300px;
}
```

### Shimmer Effect
```css
@keyframes shimmer {
  0% { transform: translateX(-100%) translateY(-100%) rotate(45deg); }
  100% { transform: translateX(100%) translateY(100%) rotate(45deg); }
}

.shimmer::before {
  content: '';
  position: absolute;
  top: -50%; left: -50%;
  width: 200%; height: 200%;
  background: linear-gradient(45deg, transparent, rgba(255,255,255,.1), transparent);
  animation: shimmer 3s infinite;
}
```

## 🎯 Component Patterns

### Card Pattern
```css
.card {
  padding: 28px;
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  background: var(--gradient-surface);
  backdrop-filter: blur(20px);
  box-shadow: var(--shadow-md);
  transition: all .4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.card::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 2px;
  background: var(--gradient-primary);
  opacity: 0;
  transition: opacity .4s;
}

.card:hover::before {
  opacity: 1;
}
```

### Button Pattern
```css
.btn-primary {
  min-height: 46px;
  padding: 12px 20px;
  border: 1px solid transparent;
  border-radius: 13px;
  color: #fff;
  background: var(--gradient-primary);
  font-size: .88rem;
  font-weight: 700;
  box-shadow: 0 8px 20px rgba(99,102,241,.25);
  cursor: pointer;
  transition: all .3s cubic-bezier(0.4, 0, 0.2, 1);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 30px rgba(99,102,241,.35);
}
```

### Input Pattern
```css
input {
  padding: 12px 14px;
  border: 1.5px solid var(--border-strong);
  border-radius: var(--radius-sm);
  background: var(--surface-muted);
  backdrop-filter: blur(10px);
  color: var(--text);
  outline: none;
  transition: all .3s cubic-bezier(0.4, 0, 0.2, 1);
}

input:focus {
  border-color: var(--accent);
  background: var(--surface);
  box-shadow: 0 0 0 4px var(--ring);
  transform: translateY(-1px);
}
```

## 📐 Layout Patterns

### Dashboard Grid
```css
.dashboard {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 22px;
}

@media (max-width: 960px) {
  .dashboard {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 640px) {
  .dashboard {
    grid-template-columns: 1fr;
  }
}
```

### Flexbox Pattern
```css
.flex-container {
  display: flex;
  align-items: center;
  gap: 12px;
}

.flex-grow {
  flex: 1;
  min-width: 0; /* Important for text truncation */
}
```

## 🎨 Gradient Patterns

### Text Gradient
```css
.gradient-text {
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
```

### Animated Gradient
```css
@keyframes gradient-shift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

.animated-gradient {
  background: var(--gradient-primary);
  background-size: 200% 200%;
  animation: gradient-shift 8s ease infinite;
}
```

## 🌊 Floating Animation
```css
@keyframes float {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(30px, -30px) scale(1.1); }
  66% { transform: translate(-20px, 20px) scale(0.9); }
}

.ambient {
  animation: float 20s ease-in-out infinite;
  filter: blur(80px);
}
```

## ✅ Best Practices

1. **Always use CSS variables** untuk theming
2. **Cubic-bezier easing** untuk natural motion
3. **Hardware-accelerated properties** (transform, opacity)
4. **Backdrop-filter** untuk glassmorphism
5. **Position: relative** pada parent untuk pseudo-elements
6. **Overflow: hidden** untuk contained effects
7. **Will-change** untuk performance hints
8. **Transition: all** hanya jika benar-benar perlu

## 🔧 Utility Classes

```css
.sr-only { /* Screen reader only */
  position: absolute;
  width: 1px; height: 1px;
  padding: 0; margin: -1px;
  overflow: hidden;
  clip: rect(0,0,0,0);
  white-space: nowrap;
  border: 0;
}

[hidden] {
  display: none !important;
}
```

---

**Note**: Semua pattern ini sudah terimplementasi di `css/style.css`
