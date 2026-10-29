// Attribute store visits to the landing page. This does not measure purchases.
document.querySelectorAll('[data-play]').forEach(link => {
  const referrer = new URLSearchParams({utm_source: 'beyondbelief.ai', utm_medium: 'website', utm_campaign: 'fiido_landing'});
  const url = new URL(link.href);
  url.searchParams.set('referrer', referrer.toString());
  link.href = url.toString();
});
