export function normalizeUtmInput(value) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[\s_-]+/g, '_')
    .replace(/[^a-z0-9_]/g, '')
    .replace(/_+/g, '_');
}

export function normalizeUtmValue(value) {
  return normalizeUtmInput(value).replace(/^_+|_+$/g, '');
}

const channelParameters = {
  linkedin: { source: 'linkedin', medium: 'social' },
  facebook: { source: 'facebook', medium: 'social' },
  instagram: { source: 'instagram', medium: 'social' },
  email: { source: 'email', medium: 'email' },
};

export function getUtmChannelParameters(channel, customSource = '') {
  if (channel === 'other') {
    return {
      source: normalizeUtmValue(customSource),
      medium: 'referral',
    };
  }

  return channelParameters[channel];
}

export function buildUtmUrl({ channel, customSource = '', campaign, content }) {
  const url = new URL('https://scientia-academy.com/');
  const { source, medium } = getUtmChannelParameters(channel, customSource);

  url.searchParams.set('utm_source', source);
  url.searchParams.set('utm_medium', medium);
  url.searchParams.set('utm_campaign', normalizeUtmValue(campaign));

  const normalizedContent = normalizeUtmValue(content);
  if (normalizedContent) {
    url.searchParams.set('utm_content', normalizedContent);
  }

  return url.toString();
}
