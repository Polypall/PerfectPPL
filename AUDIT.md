
# Perfect People - Engineering & Security Audit

## 1. Deployment Analysis (Senior Deployment Engineer)
1. **Platform:** B (Hybrid - Vercel Frontend + Managed Backend like Supabase/Render).
2. **Reason:** The app uses Jitsi (external) and Gemini (Serverless-safe), but requires persistent storage for user profiles, matching history, and block lists. While the frontend can live on Vercel, the data layer must be persistent.
3. **Risks on Vercel:** Pure serverless Vercel without a backend (like Supabase) will lose all state (user profiles, chat history) on every function cold start if stored in memory.
4. **Best Architecture:** Next.js (Frontend) on Vercel + Supabase (Database/Auth/Storage).
5. **Resources:** 512MB RAM / 0.1vCPU is sufficient for the React client.
6. **Workers:** None required; Jitsi handles real-time media.

## 2. Supabase Readiness Audit
- **Pattern:** Use the `@supabase/supabase-js` client with RLS (Row Level Security) enabled on all tables.
- **Checklist:**
  - [ ] RLS policies for `profiles` (owner only can edit).
  - [ ] Public storage bucket for profile pictures with size limits.
  - [ ] Secret `SUPABASE_SERVICE_ROLE_KEY` is NEVER exposed to client.
- **Env Vars:** `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`.

## 3. Production Command & Entry
- **Render Start:** `npm run start` (assuming a built SPA served by static server).
- **Entry Point:** `index.tsx`.
- **Port:** `8080`.
- **Failure Mode:** Missing `API_KEY` environment variable causing Gemini calls to fail silently.

## 4. Security Hardening (Senior Security Engineer)
1. **Secret Identification:** `API_KEY` (Gemini) is the primary secret.
2. **Classification:** Gemini `API_KEY` is Server-Only. Client should ideally call a proxy.
3. **Risk Mitigation:** The app includes a `SecretValidator` to ensure the environment is ready before mounting.
4. **Data Encryption:** User PII (email) is managed by Supabase Auth (BCrypt).

## 5. Top 10 Failure Modes & Hardening
1. **Missing Env Vars:** Fail-fast validation at boot.
2. **Cold Starts:** Minimal dependency footprint.
3. **Gemini Latency:** Show "AI is thinking..." romantic animations.
4. **Jitsi Failures:** Fallback to a "Meeting could not start" UI.
5. **Image Upload:** Client-side compression before upload.
6. **Token Expiry:** Automatic session refresh via Supabase.
7. **Rate Limiting:** Implement on API routes.
8. **Insecure Storage:** Enforce RLS.
9. **XSS:** Content Security Policy (CSP) in `index.html`.
10. **Abuse:** Integrated reporting and blocking logic.
