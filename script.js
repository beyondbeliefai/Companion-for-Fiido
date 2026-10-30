(() => {
  'use strict';
  const tagId = 'AW-18526264122';
  const conversion = tagId + '/1Z8cCKWG3K4dELq2gYJF';
  const consentKey = 'fiido_measurement_consent_v1';
  let choice = null;
  let loaded = false;
  try { choice = localStorage.getItem(consentKey); } catch (_) { /* Storage is optional. */ }
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
  window.gtag('consent', 'default', {
    ad_storage: 'denied', ad_user_data: 'denied',
    ad_personalization: 'denied', analytics_storage: 'denied'
  });
  function applyConsent(accepted) {
    window.gtag('consent', 'update', {
      ad_storage: accepted ? 'granted' : 'denied',
      ad_user_data: accepted ? 'granted' : 'denied',
      ad_personalization: 'denied', analytics_storage: 'denied'
    });
    if (accepted && !loaded) {
      loaded = true;
      window.gtag('js', new Date());
      window.gtag('config', tagId, {
        send_page_view: false, allow_google_signals: false,
        allow_ad_personalization_signals: false
      });
      const tag = document.createElement('script');
      tag.async = true;
      tag.src = 'https://www.googletagmanager.com/gtag/js?id=' + tagId;
      document.head.appendChild(tag);
    }
  }
  if (choice === 'accepted') applyConsent(true);
  // Keep real destinations functional when measurement is denied or blocked.
  document.querySelectorAll('[data-play]').forEach((link, index) => {
    const referrer = new URLSearchParams({utm_source: 'beyondbelief.ai', utm_medium: 'website', utm_campaign: 'fiido_landing'});
    const url = new URL(link.href);
    url.searchParams.set('referrer', referrer.toString());
    link.href = url.toString();
    function track(event) {
      if (choice !== 'accepted' || (event.type === 'auxclick' && event.button !== 1)) return;
      const sameTab = event.type === 'click' && event.button === 0 &&
        !event.ctrlKey && !event.metaKey && !event.shiftKey && !event.altKey &&
        (!link.target || link.target === '_self') && !link.hasAttribute('download');
      let navigated = false;
      const follow = () => {
        if (!sameTab || navigated) return;
        navigated = true;
        window.location.assign(link.href);
      };
      if (sameTab) {
        event.preventDefault();
        window.setTimeout(follow, 1000);
      }
      window.gtag('event', 'conversion', {
        send_to: conversion,
        button_position: ['navigation', 'hero', 'compatibility', 'footer'][index] || 'store_button',
        event_callback: follow, event_timeout: 900
      });
    }
    link.addEventListener('click', track);
    link.addEventListener('auxclick', track);
  });
  // Basic consent mode: no Google script or measurement request before consent.
  const style = document.createElement('style');
  style.textContent = '.measurement-consent{position:fixed;z-index:1000;bottom:18px;left:18px;right:18px;margin:auto;max-width:700px;padding:20px;border:1px solid #455054;border-radius:14px;background:#141c20;color:#edf1ee;box-shadow:0 12px 45px #0008;font:14px/1.5 system-ui,sans-serif}.measurement-consent[hidden]{display:none}.measurement-consent p{margin:0 0 14px}.measurement-consent a{color:#ffba59}.measurement-actions{display:flex;gap:12px;flex-wrap:wrap}.measurement-actions button{flex:1;cursor:pointer;border:1px solid #738080;border-radius:8px;padding:10px 14px;background:#202b30;color:#fff;font:inherit}.measurement-actions button:focus-visible,.measurement-settings:focus-visible{outline:3px solid #ffba59;outline-offset:3px}.measurement-settings{cursor:pointer;border:0;background:transparent;color:inherit;text-decoration:underline;font:inherit;padding:0}';
  document.head.appendChild(style);
  const banner = document.createElement('section');
  banner.className = 'measurement-consent';
  banner.setAttribute('role', 'region');
  banner.setAttribute('aria-label', 'Advertising measurement preferences');
  banner.hidden = choice === 'accepted' || choice === 'rejected';
  banner.innerHTML = '<p>May we use Google Ads cookies to measure visits and clicks to Google Play? This helps us understand which ads work. We do not enable personalised ads. <a href="tracking-privacy.html">Website privacy</a></p><div class="measurement-actions"><button type="button" data-consent="rejected">Reject measurement</button><button type="button" data-consent="accepted">Allow measurement</button></div>';
  document.body.appendChild(banner);
  banner.querySelectorAll('[data-consent]').forEach(button => {
    button.addEventListener('click', () => {
      choice = button.dataset.consent;
      try { localStorage.setItem(consentKey, choice); } catch (_) { /* Storage is optional. */ }
      applyConsent(choice === 'accepted');
      if (choice === 'rejected') {
        document.cookie.split(';').forEach(cookie => {
          const name = cookie.split('=')[0].trim();
          if (!name.startsWith('_gcl_')) return;
          ['', '; domain=' + location.hostname, '; domain=.beyondbelief.ai'].forEach(domain => {
            document.cookie = name + '=; Max-Age=0; path=/' + domain + '; SameSite=Lax';
          });
        });
      }
      banner.hidden = true;
      if (banner.contains(document.activeElement)) settings.focus();
    });
  });
  const settings = document.createElement('button');
  settings.type = 'button';
  settings.className = 'measurement-settings';
  settings.textContent = 'Cookie settings';
  settings.addEventListener('click', () => {
    banner.hidden = false;
    banner.querySelector('button').focus();
  });
  const footer = document.querySelector('footer');
  if (footer) footer.appendChild(settings);
})();
