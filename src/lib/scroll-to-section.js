export function getNavbarOffset() {
  return document.querySelector('nav > div')?.offsetHeight ?? 64;
}

export function scrollToSection(target, { offset = getNavbarOffset(), behavior = 'smooth' } = {}) {
  const element = typeof target === 'string' ? document.querySelector(target) : target;

  if (!element) {
    return false;
  }

  const top = Math.max(element.getBoundingClientRect().top + window.scrollY - offset, 0);

  window.scrollTo({ top, behavior });
  return true;
}
