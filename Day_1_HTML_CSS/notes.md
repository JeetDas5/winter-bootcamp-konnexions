# HTML & CSS Basics

## HTML Tags

### Structure Tags
```html
<!DOCTYPE html>      <!-- Declares HTML5 document -->
<html>              <!-- Root element -->
<head>              <!-- Metadata container -->
<body>              <!-- Visible content -->
```

### Text Tags
```html
<h1> to <h6>        <!-- Headings (h1 largest, h6 smallest) -->
<p>                 <!-- Paragraph -->
<span>              <!-- Inline text container -->
<br>                <!-- Line break -->
<hr>                <!-- Horizontal line -->
```

### Formatting Tags
```html
<strong>            <!-- Bold (important text) -->
<em>                <!-- Italic (emphasized text) -->
<mark>              <!-- Highlighted text -->
<small>             <!-- Smaller text -->
<del>               <!-- Deleted/strikethrough text -->
```

### Container Tags
```html
<div>               <!-- Block-level container -->
<section>           <!-- Thematic content section -->
<article>           <!-- Independent content -->
<header>            <!-- Header section -->
<footer>            <!-- Footer section -->
<nav>               <!-- Navigation links -->
<aside>             <!-- Sidebar content -->
<main>              <!-- Main content -->
```

### List Tags
```html
<ul>                <!-- Unordered list (bullets) -->
<ol>                <!-- Ordered list (numbers) -->
<li>                <!-- List item -->
```

### Link & Media Tags
```html
<a href="url">      <!-- Hyperlink -->
<img src="url">     <!-- Image -->
<video>             <!-- Video player -->
<audio>             <!-- Audio player -->
```

### Form Tags
```html
<form>              <!-- Form container -->
<input>             <!-- Input field -->
<textarea>          <!-- Multi-line text input -->
<button>            <!-- Clickable button -->
<select>            <!-- Dropdown menu -->
<label>             <!-- Input label -->
```

### Table Tags
```html
<table>             <!-- Table container -->
<tr>                <!-- Table row -->
<th>                <!-- Table header cell -->
<td>                <!-- Table data cell -->
```

---

## CSS Selectors
```css
/* Element selector */
p { color: blue; }

/* Class selector */
.class-name { color: red; }

/* ID selector */
#id-name { color: green; }

/* Multiple selectors */
h1, h2, h3 { font-weight: bold; }

/* Descendant selector */
div p { margin: 10px; }

/* Child selector */
div > p { padding: 5px; }

/* Pseudo-classes */
a:hover { color: orange; }
input:focus { border: 2px solid blue; }
```

---

## CSS Box Model
```
┌─────────────────────────────────┐
│         MARGIN (outside)        │
│  ┌───────────────────────────┐  │
│  │    BORDER                 │  │
│  │  ┌─────────────────────┐  │  │
│  │  │   PADDING           │  │  │
│  │  │  ┌───────────────┐  │  │  │
│  │  │  │   CONTENT     │  │  │  │
│  │  │  └───────────────┘  │  │  │
│  │  └─────────────────────┘  │  │
│  └───────────────────────────┘  │
└─────────────────────────────────┘
```
```css
div {
  width: 200px;           /* Content width */
  height: 100px;          /* Content height */
  padding: 20px;          /* Space inside border */
  border: 2px solid black; /* Border around padding */
  margin: 10px;           /* Space outside border */
}
```

---

## Position Property
```css
/* Static - default, normal flow */
position: static;

/* Relative - relative to normal position */
position: relative;
top: 10px;
left: 20px;

/* Absolute - relative to nearest positioned parent */
position: absolute;
top: 0;
right: 0;

/* Fixed - relative to viewport (stays on scroll) */
position: fixed;
bottom: 0;
right: 0;

/* Sticky - switches between relative and fixed */
position: sticky;
top: 0;
```

---

## Flexbox vs Grid

### When to Use What?

| Flexbox | Grid |
|---------|------|
| **One-dimensional** (row OR column) | **Two-dimensional** (rows AND columns) |
| Navigation bars | Page layouts |
| Card layouts (single row/column) | Complex dashboards |
| Centering items | Magazine-style layouts |
| Dynamic content sizes | Fixed grid structures |

### Flexbox Basics
```css
.container {
  display: flex;
  
  /* Direction */
  flex-direction: row;        /* row | column | row-reverse | column-reverse */
  
  /* Main axis alignment */
  justify-content: center;    /* flex-start | flex-end | center | space-between | space-around */
  
  /* Cross axis alignment */
  align-items: center;        /* flex-start | flex-end | center | stretch */
  
  /* Wrap */
  flex-wrap: wrap;           /* nowrap | wrap | wrap-reverse */
  
  /* Gap between items */
  gap: 10px;
}

.item {
  flex: 1;                   /* Grow to fill space */
  flex-shrink: 0;            /* Don't shrink */
  flex-basis: 200px;         /* Base size */
}
```

**Flexbox Example:**
```css
/* Horizontal navbar */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
```

### Grid Basics
```css
.container {
  display: grid;
  
  /* Define columns */
  grid-template-columns: 1fr 2fr 1fr;    /* 3 columns */
  grid-template-columns: repeat(3, 1fr); /* 3 equal columns */
  grid-template-columns: 200px auto 100px;
  
  /* Define rows */
  grid-template-rows: 100px auto 50px;
  
  /* Gaps */
  gap: 20px;                   /* Both row and column */
  row-gap: 10px;               /* Row gap only */
  column-gap: 15px;            /* Column gap only */
}

.item {
  /* Position item */
  grid-column: 1 / 3;          /* Span columns 1-3 */
  grid-row: 1 / 2;             /* Span rows 1-2 */
  
  /* Or use span */
  grid-column: span 2;         /* Span 2 columns */
}
```

**Grid Example:**
```css
/* Page layout */
.layout {
  display: grid;
  grid-template-columns: 200px 1fr 200px;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    "header header header"
    "sidebar main aside"
    "footer footer footer";
}

.header { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main { grid-area: main; }
```

---

## Flexbox vs Grid Visual Comparison

### Flexbox (One Direction)
```
┌──────┬──────┬──────┬──────┐
│  1   │  2   │  3   │  4   │  ← Single row
└──────┴──────┴──────┴──────┘
```

### Grid (Two Directions)
```
┌──────┬──────┬──────┐
│  1   │  2   │  3   │  ← Row 1
├──────┼──────┼──────┤
│  4   │  5   │  6   │  ← Row 2
└──────┴──────┴──────┘
   ↑      ↑      ↑
  Col1   Col2   Col3
```

---

## Common CSS Properties
```css
/* Typography */
font-family: Arial, sans-serif;
font-size: 16px;
font-weight: bold;          /* normal | bold | 100-900 */
text-align: center;         /* left | right | center | justify */
line-height: 1.5;
color: #333;

/* Background */
background-color: #f0f0f0;
background-image: url('image.jpg');
background-size: cover;     /* contain | cover | 100px */

/* Border */
border: 1px solid black;
border-radius: 5px;         /* Rounded corners */

/* Display */
display: block;             /* block | inline | inline-block | none */
visibility: hidden;         /* visible | hidden */
opacity: 0.5;              /* 0 (transparent) to 1 (opaque) */

/* Sizing */
width: 100px;
height: 50px;
max-width: 500px;
min-height: 100px;

/* Spacing */
margin: 10px;              /* top right bottom left */
margin: 10px 20px;         /* vertical horizontal */
padding: 15px;

/* Cursor */
cursor: pointer;           /* default | pointer | not-allowed | grab */
```

---

## Responsive Design
```css
/* Mobile-first approach */
.container {
  width: 100%;
}

/* Tablet */
@media (min-width: 768px) {
  .container {
    width: 750px;
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .container {
    width: 1000px;
  }
}
```

---

## Quick Tips

- Use **Flexbox** for: Navigation bars, button groups, card rows  
- Use **Grid** for: Page layouts, photo galleries, complex dashboards  
- Use **semantic HTML** tags for better SEO and accessibility  
- Always include `<!DOCTYPE html>` at the start  
- Use classes for styling, IDs for JavaScript  
- Mobile-first responsive design is recommended