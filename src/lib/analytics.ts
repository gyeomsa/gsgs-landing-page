const GA_ID = import.meta.env.VITE_GA_ID;

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

function init() {
  if (!GA_ID) return;
  if (window.gtag) return;

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer.push(args);
  };

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(script);

  script.onload = () => {
    window.gtag?.('js', new Date());
    window.gtag?.('config', GA_ID);
  };
}

export function pageview(url: string) {
  init();
  if (window.gtag && GA_ID) {
    window.gtag('config', GA_ID, { page_path: url });
  }
}

export function event(action: string, params?: Record<string, unknown>) {
  init();
  if (window.gtag && GA_ID) {
    window.gtag('event', action, params);
  }
}
