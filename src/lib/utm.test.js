import test from 'node:test';
import assert from 'node:assert/strict';

import {
  buildUtmUrl,
  getUtmChannelParameters,
  normalizeUtmInput,
  normalizeUtmValue,
} from './utm.js';

const utmData = {
  channel: 'linkedin',
  campaign: 'Webinar CRA 2026',
  content: 'Post 1',
};

const channelCases = [
  ['linkedin', 'linkedin', 'social'],
  ['facebook', 'facebook', 'social'],
  ['instagram', 'instagram', 'social'],
  ['email', 'email', 'email'],
];

for (const [channel, source, medium] of channelCases) {
  test(`maps ${channel} to source=${source} and medium=${medium}`, () => {
    assert.deepEqual(getUtmChannelParameters(channel), { source, medium });
  });
}

test('normalizes a custom source and assigns the referral medium', () => {
  assert.deepEqual(
    getUtmChannelParameters('other', '  Partner Branżowy!  '),
    { source: 'partner_branzowy', medium: 'referral' },
  );
  assert.equal(
    buildUtmUrl({ ...utmData, channel: 'other', customSource: '  Partner Branżowy!  ' }),
    'https://scientia-academy.com/?utm_source=partner_branzowy&utm_medium=referral&utm_campaign=webinar_cra_2026&utm_content=post_1',
  );
});

test('builds a UTM link using the Scientia Academy landing page', () => {
  assert.equal(
    buildUtmUrl(utmData),
    'https://scientia-academy.com/?utm_source=linkedin&utm_medium=social&utm_campaign=webinar_cra_2026&utm_content=post_1',
  );
});

test('omits utm_content when the optional value is empty', () => {
  assert.equal(
    buildUtmUrl({ ...utmData, content: '' }),
    'https://scientia-academy.com/?utm_source=linkedin&utm_medium=social&utm_campaign=webinar_cra_2026',
  );
});

test('normalizes campaign and content values', () => {
  assert.equal(
    buildUtmUrl({ ...utmData, campaign: 'Webinar_CRA 2026', content: 'Post_1' }),
    'https://scientia-academy.com/?utm_source=linkedin&utm_medium=social&utm_campaign=webinar_cra_2026&utm_content=post_1',
  );
  assert.equal(normalizeUtmValue('  Jesienny Webinar: GCP 2026!  '), 'jesienny_webinar_gcp_2026');
});

test('uses one underscore as the separator while typing campaign values', () => {
  const examples = [
    ['Webinar CRA 2026', 'webinar_cra_2026'],
    ['Webinar-CRA-2026', 'webinar_cra_2026'],
    ['Webinar___CRA___2026', 'webinar_cra_2026'],
    ['Webinar - CRA 2026', 'webinar_cra_2026'],
    ['Webinar_CRA 2026', 'webinar_cra_2026'],
    ['webinar_cra_2026', 'webinar_cra_2026'],
    ['webinar_', 'webinar_'],
    ['webinar   cra', 'webinar_cra'],
    ['webinar___cra', 'webinar_cra'],
  ];

  for (const [input, expected] of examples) {
    assert.equal(normalizeUtmInput(input), expected);
  }
});

test('uses the same underscore rules while typing content values', () => {
  const examples = [
    ['Grafika-A', 'grafika_a'],
    ['Grafika A', 'grafika_a'],
    ['grafika___a', 'grafika_a'],
    ['Post_1', 'post_1'],
    ['video_1', 'video_1'],
    ['grafika_', 'grafika_'],
  ];

  for (const [input, expected] of examples) {
    assert.equal(normalizeUtmInput(input), expected);
  }
});

test('removes leading and trailing underscores only from final URL values', () => {
  assert.equal(normalizeUtmInput('_Webinar'), '_webinar');
  assert.equal(normalizeUtmInput('Webinar_'), 'webinar_');
  assert.equal(normalizeUtmInput('_Grafika'), '_grafika');
  assert.equal(normalizeUtmInput('Grafika_'), 'grafika_');
  assert.equal(
    buildUtmUrl({ ...utmData, campaign: '_Webinar-CRA_', content: '_Grafika-A_' }),
    'https://scientia-academy.com/?utm_source=linkedin&utm_medium=social&utm_campaign=webinar_cra&utm_content=grafika_a',
  );
});
