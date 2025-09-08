### 1. Overview

**SizeUp** is a single-page web application that helps users visually compare the size of real-world objects (e.g., UPS, smartphone) against familiar reference items (comparators like a cupboard, desk, hand, or standing person). The goal is to provide an intuitive sense of scale before purchasing or deciding on fit.

---

### 2. Functional Requirements

#### Core Features

1. **Select Comparator**

   - Initial set:
     - Hand palm (approx 18cm x 9cm)
     - Standing person (180cm height)
     - Cupboard (100cm x 50cm x 180cm)
     - Desk (120cm x 60cm x 75cm)
   - Rendered in 3D as simple shapes approximating the object.

2. **Define Target Item**

   - User chooses shape type:
     - **3D only for MVP**: box (width, height, depth), sphere (diameter).
     - **2D shapes**: Deferred to future implementation.
   - User enters dimensions with unit toggle (cm / inches).
   - **Live updates**: 3D scene updates in real-time as user types (no generate button needed).

3. **Visualization**

   - Side panel: configuration (inputs, unit toggle, shape selection).
   - Main canvas: 3D scene showing comparator + target item together.
   - Camera is rotatable (drag to rotate), **no zoom** (preserve relative size).
   - Labels show dimensions always visible but faded, brighten on hover.
   - **Positioning**: Hand palm = target on top, Standing person = target beside, Desk/Cupboard = target on top.
   - **Default state**: Standing person + box target item on app load.

4. **Unit Toggle**

   - Simple toggle between **cm ↔ inches**.
   - Automatically converts entered dimensions.

5. **Export / Share**

   - Button: _“Export View”_ → saves canvas as PNG (screenshot).

#### Future Features (not MVP but planned)

- Pixel-perfect mode (1:1 ratio visualization).
- Ability to upload/import 3D comparator models.
- AR mode (place comparator + item in real space with phone camera).
- Save presets (requires storage).

---

### 3. Non-Functional Requirements

- **Performance**: Smooth rendering, optimized meshes (low-poly shapes).
- **Security**: No backend, no user data stored.
- **Usability**: Mobile & desktop friendly (responsive SPA).

---

### 4. System Architecture

- **Frontend**: React (Vite)
- **3D Rendering**: react-three-fiber (+ drei helpers for orbit controls, grid, labels).
- **State Management**: Local React state (or Zustand if needed).
- **Units Conversion**: Simple utility functions (cm ↔ inch).
- **Deployment**: Static hosting (Vercel, Netlify, etc.).

**No backend, no DB.**

---

### 5. Data Model (Frontend only)

```ts
// Comparator definition
type Comparator = {
  id: string;
  name: string; // "Standing Man"
  type: "box" | "sphere"; // Basic shape approximation
  dimensions: { w?: number; h?: number; d?: number; r?: number }; // cm
};

// Target item definition
type TargetItem = {
  shape: "box" | "sphere"; // 3D only for MVP
  dimensions: { w?: number; h?: number; d?: number; r?: number }; // cm
};
```

### 6. API Contracts

_(Not needed for MVP since no backend, but could be used if saving/sharing added later.)_

---

### 7. User Flow

1. User opens app → sees side panel (form) + 3D canvas with default standing person + box.
2. (Optional) Selects different comparator.
3. Defines target item → shape type + dimensions.
4. 3D canvas updates live as user types → shows comparator + target item positioned appropriately.
5. User rotates view to inspect relative size.
6. (Optional) Toggle unit to inches.
7. (Optional) Export screenshot.

---

### 8. UI/UX Notes

- **Layout**:
  - Left sidebar: controls (comparator selection, shape selection, input fields, unit toggle).
  - Right (main): 3D scene.
  - **Mobile**: Vertical stack layout (controls on top, 3D scene below).
- **Visual Style**:
  - Clean, minimal (light/dark mode optional later).
  - Comparators: neutral colors (gray, beige).
  - Target item: highlight color (blue or green).
- **Interactions**:
  - Drag to rotate view.
  - Labels for dimensions always visible.

---

### 9. Implementation Notes

- Use `react-three-fiber` + `drei` for 3D scene.
- Use `<OrbitControls enableZoom={false} />` to lock zoom but allow rotation.
- Use `<Html />` (from drei) for dimension labels.
- Export via `toDataURL()` on canvas for screenshot.
- Comparators stored in JSON config, can add more later.

---

### 10. Roadmap / Priority

1. Setup SPA with Vite + React + R3F.
2. Add comparator selection & rendering (basic shapes).
3. Add target item input & rendering.
4. Add unit toggle + dimension labels.
5. Implement screenshot export.
6. Polish UI (responsive, easy forms).

### 🎨 Styling & UI Framework

- **Primary styling**: **TailwindCSS** (for utility-first, rapid styling).
- **Complex styling / animations**:
  - Use **CSS modules** (or plain CSS-in-JS with Tailwind overrides) for component-specific customizations.
  - For animations:
    - Prefer **Framer Motion** (works smoothly with React + Tailwind).
    - Fallback: CSS transitions / keyframes when simple.
- **Component library**: None for MVP (keep lightweight). If needed later, consider **shadcn/ui** for consistent styled components.
- **Responsiveness**: Tailwind breakpoints for mobile-first design.
