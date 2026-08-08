import posthog from "posthog-js";

const key = import.meta.env.VITE_POSTHOG_KEY ?? "";
const host = import.meta.env.VITE_POSTHOG_HOST ?? "";

export function initAnalytics(): void {
  if (!key) return;
  posthog.init(key, {
    api_host: host || "https://us.i.posthog.com",
    person_profiles: "identified_only",
    capture_pageview: false,
    autocapture: false,
    disable_session_recording: true,
  });
}

export function track(event: string, props?: Record<string, unknown>): void {
  if (!key) return;
  posthog.capture(event, props);
}
