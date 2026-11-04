import { useEffect, useState } from 'react';

// Mini-Router ohne zusätzliche Abhängigkeit: interne Links (href="/…") wechseln die Seite ohne Neuladen.
const EVT = 'orbiqus:navigate';

export function navigate(to) {
  const url = new URL(to, window.location.origin);
  if (url.pathname + url.hash === window.location.pathname + window.location.hash) return;
  window.history.pushState({}, '', url.pathname + url.hash);
  window.dispatchEvent(new Event(EVT));
}

export function usePath() {
  const [path, setPath] = useState(() => window.location.pathname);

  useEffect(() => {
    const update = () => setPath(window.location.pathname);
    const onClick = (e) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = e.target.closest('a');
      if (!a || a.target || a.hasAttribute('download')) return;
      const href = a.getAttribute('href');
      if (!href || !href.startsWith('/')) return;
      e.preventDefault();
      navigate(href);
    };
    window.addEventListener('popstate', update);
    window.addEventListener(EVT, update);
    document.addEventListener('click', onClick);
    return () => {
      window.removeEventListener('popstate', update);
      window.removeEventListener(EVT, update);
      document.removeEventListener('click', onClick);
    };
  }, []);

  // Nach Seitenwechsel nach oben bzw. zum Anker springen
  useEffect(() => {
    const { hash } = window.location;
    requestAnimationFrame(() => {
      const el = hash && document.getElementById(hash.slice(1));
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      else window.scrollTo({ top: 0, behavior: 'instant' });
    });
  }, [path]);

  return path;
}
