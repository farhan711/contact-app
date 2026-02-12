# Contact Manager

A Next.js application for managing client contacts with a glassy dark UI. Each client has three contact fields (Client, Primary Contact, Secondary Contact) with a unified workflow: **search > select > view summary > edit/create in modal**.

## Tech Stack

- **Next.js 16** (App Router, TypeScript)
- **MUI 7** (Material UI components + Icons)
- **Zustand** (state management with localStorage persistence)
- **Fuse.js** (client-side fuzzy search)
- **DummyJSON API** (user data source)

## Setup

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Production build
npm run build
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Features

### Client Tabs
- **Client 1** tab is shown by default
- Click **"Add Client"** to add Client 2, Client 3, etc.
- Each tab has the same 3-field layout
- Tab state persists across page refreshes

### Contact Workflow (per field)
1. **Search** - Type in the search box (min 2 characters, 300ms debounce). Users are fetched once from DummyJSON and searched locally via Fuse.js fuzzy matching on name, email, and company.
2. **Select** - Click a result to fetch full contact details and display a summary card.
3. **View Summary** - Card shows name, avatar, type badge (Individual/Company), email, phone, address. Missing fields are highlighted in red.
4. **Edit** - Opens a modal pre-filled with the contact's data. Save updates the contact in place.
5. **Create New** - Opens a blank modal. Fill in details and save to create a new contact with a generated UUID.
6. **Clear** - Remove the selected contact and return to the search state.

### Validation
- Field-level validation triggers on Save in the modal
- Required fields: First Name, Last Name, Email, Phone
- Company Name is required when type is "Company"
- Email format is validated
- Each invalid field is highlighted red with an error message underneath
- Errors clear per-field as the user types

### Persistence
- All client data and active tab are persisted to `localStorage` via Zustand's `persist` middleware
- Refreshing the page restores all selections

### Server-Side Logging
- `POST /api/log` endpoint writes JSON Lines to `logs/actions.jsonl`
- Logged actions: `create` and `update` (with contact data, field role, client index, and timestamps)
- Log directory is created lazily on first write

### UI
- Dark theme with single blue accent (`#60a5fa`)
- Grid background (48px blue-tinted lines)
- Glassmorphism: frosted glass panels, cards, and dropdowns with `backdrop-filter: blur()`
- Hover animations: cards lift with shadow glow, buttons highlight
- Fade-in-up entrance animations (staggered per field)
- Modal slides up from bottom
- Scrollable tabs for many clients

## Project Structure

```
src/
├── app/
│   ├── api/log/route.ts           # Server-side logging endpoint
│   ├── globals.css                # Grid background, glass classes, animations
│   ├── layout.tsx                 # Root layout + MUI providers
│   ├── page.tsx                   # Main page
│   └── theme.ts                  # MUI dark theme config
├── components/
│   ├── ContactField.tsx           # Search input + results + summary card
│   ├── ContactModal.tsx           # Edit/create dialog with field validation
│   ├── ContactSummaryCard.tsx     # Contact details card with edit/clear
│   ├── MainForm.tsx               # Tab orchestrator + modal + snackbar
│   └── SearchResultsList.tsx      # Fuzzy search results dropdown
├── hooks/
│   └── useDebounce.ts             # Generic debounce hook (300ms)
├── services/
│   └── api.ts                     # fetchContactById + sendLog
├── store/
│   ├── contactStore.ts            # Zustand store (clients, tabs, modal, snackbar)
│   └── searchStore.ts             # Zustand store (Fuse.js user search index)
├── types/
│   └── contact.ts                 # TypeScript interfaces
└── utils/
    ├── mapDummyJsonUser.ts        # DummyJSON API response mapping
    └── validation.ts              # Field-level contact validation
```

## Key Design Decisions

| Decision | Choice | Rationale |
|---|---|---|
| State management | Zustand with `persist` | Simple API, built-in localStorage sync |
| Search | Fuse.js (client-side) | Fetch users once, instant fuzzy search |
| Contact type | Derived from `company.name` | DummyJSON has no explicit type field |
| Modal state | Zustand store | Single source of truth, no prop drilling |
| Log format | JSON Lines (`.jsonl`) | Append-friendly, line-by-line parseable |
| Validation | On Save, field-level | Better UX - no noise while typing |
| New contact IDs | `crypto.randomUUID()` | Browser-native, no dependencies |
| CSS architecture | globals.css + MUI `sx` | Grid/glass in CSS, component styles in MUI |
