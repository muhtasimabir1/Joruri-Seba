1. What is the difference between `getElementById`, `getElementsByClassName`, and `querySelector` / `querySelectorAll`?

Key Differences:
- `getElementById` is fastest and most specific—only works with IDs.
- `getElementsByClassName` returns a live collection that updates if DOM changes.
- `querySelector` and `querySelectorAll` are more flexible (can select by tag, class, attribute, etc.) but return static results.

---

2. How do you create and insert a new element into the DOM?

```js
// 1. Create the element
const newDiv = document.createElement('div');

// 2. Add content or attributes
newDiv.textContent = 'Hello World';
newDiv.className = 'greeting';

// 3. Insert into the DOM
const parent = document.getElementById('container');
parent.appendChild(newDiv);
```

You can also use:
- `parent.prepend(newDiv)` → adds at the beginning
- `parent.insertBefore(newDiv, referenceNode)` → adds before a specific child

---

3. What is Event Bubbling and how does it work?

'Event Bubbling' is the process where an event triggered on a child element travels upward through its parent elements.

Example:
```html
<div id="parent">
  <button id="child">Click Me</button>
</div>
```

```js
document.getElementById('parent').addEventListener('click', () => {
  console.log('Parent clicked');
});
document.getElementById('child').addEventListener('click', () => {
  console.log('Child clicked');
});
```

If you click the button:
```
Child clicked
Parent clicked
```

The event "bubbles" from child → parent → document.

---

4. What is Event Delegation in JavaScript? Why is it useful?

'Event Delegation' means attaching a single event listener to a parent element and handling events from its children using `event.target`.

Why it's useful:
- You don’t need to add listeners to every child.
- Works for dynamically added elements.
- Improves performance and keeps code cleaner.

Example:
```js
document.getElementById('cardContainer').addEventListener('click', (e) => {
  if (e.target.classList.contains('btn-call')) {
    console.log('Call button clicked');
  }
});
```

Even if `.btn-call` is added later, this still works.

---

5. What is the difference between `preventDefault()` and `stopPropagation()`?

| Method             | What it does                                      |
|-------------------|---------------------------------------------------|
| `preventDefault()` | Stops the browser’s default behavior (e.g. link navigation, form submit) |
| `stopPropagation()` | Stops the event from bubbling up to parent elements |

Example:
```js
document.querySelector('form').addEventListener('submit', (e) => {
  e.preventDefault(); // stops form from submitting
});

document.querySelector('.child').addEventListener('click', (e) => {
  e.stopPropagation(); // stops parent click from firing
});
```

Use them together when needed to fully control event behavior.