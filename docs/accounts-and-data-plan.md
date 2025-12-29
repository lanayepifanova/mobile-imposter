# Accounts + Stored Data (Supabase) Implementation Plan

## Goals
- Guest profiles supported with optional upgrade to a full account.
- Full accounts store: used words history (avoid repeats), profile name, friends, custom categories (private/public), past games, and saved player lists.
- Multi-device sync for signed-in users; future Google OAuth support.

## Assumptions / Open Questions
- Primary auth: email + password or magic link (decide).
- Guest profiles: local-only vs anonymous Supabase user (decide).
- Community categories moderation: allow immediate public visibility or require review (decide).
- Word lists: existing categories remain client-side or move to DB (decide).

## Data Model (Supabase)
### Core
- `profiles`
  - `id` (uuid, PK, auth.users.id)
  - `display_name` (text)
  - `created_at`, `updated_at`
- `friends`
  - `id` (uuid, PK)
  - `user_id` (uuid, FK -> profiles.id)
  - `friend_id` (uuid, FK -> profiles.id)
  - `status` (text: pending/accepted/blocked)
  - `created_at`
- `custom_categories`
  - `id` (uuid, PK)
  - `owner_id` (uuid, FK -> profiles.id)
  - `name` (text)
  - `is_public` (boolean)
  - `created_at`, `updated_at`
- `custom_category_words`
  - `id` (uuid, PK)
  - `category_id` (uuid, FK -> custom_categories.id)
  - `word` (text)
  - `created_at`
- `used_words`
  - `id` (uuid, PK)
  - `user_id` (uuid, FK -> profiles.id)
  - `category_key` (text)  // for built-in categories
  - `custom_category_id` (uuid, nullable FK -> custom_categories.id)
  - `word` (text)
  - `last_used_at` (timestamptz)
  - Unique index on `(user_id, category_key, custom_category_id, word)`
- `games`
  - `id` (uuid, PK)
  - `user_id` (uuid, FK -> profiles.id)
  - `played_at` (timestamptz)
  - `category_key` (text)
  - `custom_category_id` (uuid, nullable)
  - `secret_word` (text)
  - `players` (jsonb)  // list of player names + roles
- `saved_players`
  - `id` (uuid, PK)
  - `user_id` (uuid, FK -> profiles.id)
  - `name` (text)
  - `created_at`

### Optional
- `profile_settings`
  - `user_id` (uuid, PK, FK -> profiles.id)
  - `avoid_repeat_window` (int) // e.g., days
  - `created_at`, `updated_at`

## RLS + Security
- Enable RLS on all user tables.
- Policies:
  - `profiles`: user can read/update own row; public read display_name only (optional).
  - `custom_categories`: owner full access; public read if `is_public = true`.
  - `custom_category_words`: owner full access; public read if parent category is public.
  - `used_words`, `games`, `saved_players`: user-only read/write.
  - `friends`: user can see requests involving themselves; limited updates by status.
- Indexes:
  - `used_words` unique index, plus `user_id` index.
  - `custom_categories` index on `owner_id` and `is_public`.
  - `games` index on `user_id`, `played_at`.

## Auth + Guest Flow
- Guest profile:
  - Store locally (localStorage) with guest id + saved players + categories + used words cache.
  - If user creates an account, migrate local data to Supabase tables.
- Signed-in:
  - Sync reads/writes from Supabase.
  - Optional offline cache using localStorage and reconcile on sign-in.
- Future Google OAuth:
  - Add Supabase provider later; no schema changes required.

## Frontend Integration Steps
1. Add Supabase client + env config in `client/`.
2. Build auth screens: sign up, login, logout, session persistence.
3. Create a user profile onboarding step for display name.
4. Add protected routes or guard logic for account-only features.
5. Wire data:
   - Fetch/save custom categories (+ words).
   - Fetch/save used words per category to reduce repeats.
   - Save game history and saved players lists.
6. Guest migration flow:
   - Prompt on sign up to migrate local data.
   - Perform batched inserts and de-dup on the server.

## Migration / Seed Plan
- SQL migration file for tables, indexes, and RLS policies.
- Seed script to insert example public categories (optional).
- Backfill from local storage on first login.

## Milestones
1. Supabase setup + migrations + RLS.
2. Auth UI + session handling.
3. Custom categories + public community list.
4. Used-words tracking + history + saved players.
5. Guest -> account migration + QA.
