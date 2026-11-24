export function readTabFromHash(hash, tabs, defaultId = 'overview') {
  const h = String(hash || '').replace(/^#/, '');
  return tabs.some((t) => t.id === h) ? h : defaultId;
}
