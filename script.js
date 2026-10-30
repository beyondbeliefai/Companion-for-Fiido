// Identify this website as the source of a Google Play visit.
// No analytics SDK, cookies, click events or Google tag are loaded.
(() => {
  try { localStorage.removeItem('fiido_measurement_consent_v1'); } catch (_) { /* Optional cleanup of the retired consent preference. */ }
  document.cookie.split(';').forEach(cookie => {
    const name = cookie.split('=')[0].trim();
    if (!name.startsWith('_gcl_')) return;
    ['', '; domain=' + location.hostname, '; domain=.beyondbelief.ai'].forEach(domain => {
      document.cookie = name + '=; Max-Age=0; path=/' + domain + '; SameSite=Lax';
    });
  });
  document.querySelectorAll('[data-play]').forEach(link => {
    const referrer = new URLSearchParams({utm_source: 'beyondbelief.ai', utm_medium: 'website', utm_campaign: 'fiido_landing'});
    const url = new URL(link.href);
    url.searchParams.set('referrer', referrer.toString());
    link.href = url.toString();
  });
})();
