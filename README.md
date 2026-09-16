# To-Do List Application

A responsive web-based To-Do List application built with Vanilla JavaScript, HTML5, and CSS3. It features a modern glassmorphism design, real-time progress tracking, task completion celebrations, and persistent data storage via LocalStorage.

---

## Features

* **Glassmorphism Interface:** UI built using CSS `backdrop-filter` blur, semi-transparent overlays, and custom styled interactive elements.
* **Dynamic Progress Tracking:** Updates the completed task ratio (`X / Y`) and animated progress bar as tasks are added, modified, or checked off.
* **Celebratory Confetti Effect:** Triggers a confetti animation powered by `canvas-confetti` when all items on the list are marked as complete.
* **Persistent Local Storage:** Retains all tasks and their completion statuses across browser refreshes and sessions.
* **Task Actions:**
* **Add:** Fast entry with form submission on button click or `Enter` keypress.
* **Edit:** Load active task text back into the input field for instant editing (disabled for completed tasks).
* **Delete:** Remove tasks individually with automatic layout and progress updates.
* **Complete:** Toggle task status with strike-through styling and checkbox animations.


* **Empty State Toggle:** Displays a visual background state when no tasks are present.
* **Fully Responsive:** Styled with relative units and CSS media queries for desktop and mobile displays.

---

## Tech Stack

| Layer | Technologies / Libraries |
| --- | --- |
| **Markup** | HTML5 |
| **Styling** | CSS3 (Flexbox, Glassmorphism, Google Fonts) |
| **Icons** | [Font Awesome 6.7.2](https://fontawesome.com/) |
| **Scripting** | Vanilla JavaScript (ES6+, DOM Manipulation, LocalStorage API) |
| **Animations** | [Canvas Confetti CDN v1.9.3](https://www.npmjs.com/package/canvas-confetti) |

---

## Project Structure

```text
todo-app/
├── index.html        # Main HTML layout and structural markup
├── style.css         # Custom styling, fonts, animations, and media queries
├── script.js        # Core logic, state management, and DOM event listeners
└── images/
    ├── background.jpg # Body background image
    └── empty_1.svg    # Empty state vector illustration

```

---

## Quick Start

1. **Clone or Download:** Clone this repository or download the source files into a single directory.
2. **Directory Check:** Ensure the `images/` directory contains `background.jpg` and `empty_1.svg`.
3. **Run Application:** Open `index.html` directly in any standard web browser. No local server build process required.

---

## Usage Guide

* **Adding Tasks:** Type a task description into the input box and click the **+** button or press `Enter`.
* **Completing Tasks:** Click the circular checkbox next to any task. Completed items get a line-through style, and the progress bar increases.
* **Editing Tasks:** Click the yellow pencil icon on an uncompleted task to return its text to the input field for modification.
* **Deleting Tasks:** Click the red trash icon to remove the task completely.
* **Clearing All:** Once all current tasks are completed, enjoy the confetti celebration!