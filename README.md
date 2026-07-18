# Collector's Hub

A responsive React web application for discovering, managing, and trading collectible items.

## Setup Instructions

```bash
npm install
npm run dev       # Start development server at http://localhost:5173
npm run build     # Build for production
```

## Project Structure

```
src/
  components/
    layout/      Navbar
    ui/          SearchBar, EmptyState, Toast, Img (fallback)
    marketplace/ ListingCard
    feed/        PostCard, PostModal
    collection/  CollectionItem
  context/       AppContext (global state)
  data/          marketplace.js, feed.js (mock data)
  hooks/         useDebounce.js
  pages/         Home, Marketplace, ListingDetail, Feed, Collection
```

## Libraries Used

- **React** — UI framework
- **React Router v6** — client-side routing
- **Google Fonts** (Fraunces + Inter) — typography
- No additional UI library; all components custom-built

## Features Implemented

### Core
- Marketplace with 12 listings: search, filter by category/condition, sort by price/newest
- Listing detail page with full info and collection actions
- Community Feed: 10 posts, like/save, post detail modal
- My Collection: Owned / Wishlist / Selling tabs, search, sort, filter by category

### Logical Requirements
- Duplicate prevention with toast feedback
- Meaningful empty states on every list
- "No results" states for filtered searches
- Image error fallback component
- Move items between collections
- Two-step confirmation for remove (click once to arm, again to confirm)
- Filters maintained within a session via state

### Bonus
- Debounced search (300ms)
- Local Storage persistence for collections, likes, saves
- Smooth card hover transitions and modal animations
- Lazy image loading (`loading="lazy"`)
- Toast notification system for all user actions
- Collection value summary dashboard

## Assumptions

- Authentication not required; single-user app
- Mock data is static (no backend / JSON server)
- Estimated value = listing price at time of adding to collection
- "Community posts" are read-only (no user-generated content in scope)
