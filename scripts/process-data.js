/**
 * Process raw Instagram scrape data into structured business dataset.
 * Run: node scripts/process-data.js
 */
const fs = require('fs');
const path = require('path');

const raw = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'posts-200.json'), 'utf8'));

const EXCLUDE_HANDLES = new Set([
  'hastingscitynz', 'hastings_nz', 'hawkesbaynz', 'moikiha',
  'hastingscitynz.', 'contentment.co.nz.', 'hastings_nz.'
]);

// Count mentions
const mentionCounts = {};
const mentionContexts = {};

raw.forEach(post => {
  const mentions = post.mentions || [];
  const caption = post.caption || '';
  const timestamp = post.timestamp || '';

  mentions.forEach(m => {
    const clean = m.trim().replace(/[.,;:!]+$/, '').replace(/\u2060/g, '');
    if (!clean || clean.length < 3 || EXCLUDE_HANDLES.has(clean.toLowerCase())) return;

    if (!mentionCounts[clean]) {
      mentionCounts[clean] = 0;
      mentionContexts[clean] = [];
    }
    mentionCounts[clean]++;
    mentionContexts[clean].push({
      caption: caption.slice(0, 300),
      timestamp,
      postUrl: post.url
    });
  });
});

// Summary
const sorted = Object.entries(mentionCounts).sort((a, b) => b[1] - a[1]);
console.log(`Total unique businesses: ${sorted.length}`);
console.log(`Total posts: ${raw.length}`);
console.log(`Date range: ${raw.map(p => p.timestamp).filter(Boolean).sort()[0].slice(0,10)} to ${raw.map(p => p.timestamp).filter(Boolean).sort().pop().slice(0,10)}`);
console.log('\nTop 20:');
sorted.slice(0, 20).forEach(([name, count]) => {
  console.log(`  ${count}x  @${name}`);
});

// Write processed data
fs.writeFileSync(
  path.join(__dirname, '..', 'data', 'mention-counts.json'),
  JSON.stringify(sorted.map(([handle, count]) => ({ handle, count, contexts: mentionContexts[handle] })), null, 2)
);

console.log('\nWritten to data/mention-counts.json');
