# AI-Powered News Aggregator Design Guidelines

## Design Approach
**Reference-Based Approach**: Drawing inspiration from Twitter/X's feed-based interface and modern news platforms like Apple News, optimized for content consumption and engagement.

## Core Design Elements

### Color Palette
**Dark Mode Primary** (default):
- Background: 220 8% 8% (near-black)
- Surface: 220 8% 12% (dark gray cards)
- Primary accent: 210 100% 60% (bright blue for links/CTAs)
- Text primary: 0 0% 95% (near-white)
- Text secondary: 0 0% 70% (muted gray)
- Border/dividers: 220 8% 20% (subtle borders)

**Light Mode** (optional toggle):
- Background: 0 0% 98% (off-white)
- Surface: 0 0% 100% (white cards)
- Text primary: 220 8% 15% (dark gray)

### Typography
- **Primary**: Inter or system fonts via Google Fonts
- **Headline**: Bold 24-28px for article titles
- **Body**: Regular 16px for article content
- **Metadata**: Medium 14px for timestamps, sources
- **Chat**: Regular 15px for conversational interface

### Layout System
**Tailwind spacing units**: Primarily 2, 4, 6, 8, 12, 16
- Card padding: p-6
- Section gaps: gap-8
- Inline spacing: space-x-4
- Vertical rhythm: space-y-6

### Component Library

**Feed Layout**:
- Center-aligned main feed (max-width 680px)
- Sticky daily summary card at top
- Infinite scroll news cards with clean separation
- Fixed sidebar for filters/categories

**News Cards**:
- Clean white/dark surface with subtle shadows
- Source logos and metadata at top
- Headlines with proper hierarchy
- Snippet preview with "Read more" expansion
- Bottom action bar: AI chat, audio play, share

**AI Chat Interface**:
- Slide-up modal overlay from bottom
- Chat bubbles with user/AI distinction
- Input field with send button
- Contextual article reference at top

**Daily Summary**:
- Prominent card with gradient background (210 100% 60% to 250 100% 70%)
- Key headlines in bullet format
- Overall sentiment indicator with colored badge
- Minimal, scannable design

**Navigation**:
- Top header with logo, search, user menu
- Clean, minimal design without visual clutter
- Mobile-responsive hamburger menu

### Interactive Elements
- Subtle hover states on cards (slight shadow increase)
- Smooth transitions (200ms ease)
- Loading skeletons for content fetching
- Pull-to-refresh on mobile

### Content Strategy
**Feed Structure**:
1. Daily summary (sticky at top)
2. Infinite scroll of fused news articles
3. Each article as individual card
4. Progressive loading with smooth animations

**Information Hierarchy**:
- Source + timestamp (secondary text)
- Headline (primary, bold)
- Article preview (body text)
- Action buttons (chat, audio, share)

This design creates a professional, Twitter-like news consumption experience optimized for AI-enhanced content interaction while maintaining readability and user engagement.