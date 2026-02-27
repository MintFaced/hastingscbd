# Hastings Spotlight — Who Gets the Spotlight?

A data-driven analysis of [@hastingscitynz](https://instagram.com/hastingscitynz) Instagram coverage, revealing geographic bias in how the Hastings City Business Association promotes CBD businesses.

**Live site:** _[deploy to Railway to get URL]_

---

## What This Shows

The Hastings City Business Association (HCBA) manages the BID (Business Improvement District) representing **480+ rate-paying businesses** in Hastings CBD. This analysis maps every business mentioned across **200 Instagram posts** (Dec 2024 – Feb 2026) to reveal:

- **136 businesses** were mentioned — meaning **~72% of BID members got zero coverage**
- **Heretaunga Street East** receives the vast majority of mentions
- **Heretaunga Street West**, Bay Plaza, Karamu Rd, and the wider BID are significantly under-represented
- Businesses on both sides of the street **pay the same targeted rate** for this promotion

## Key Findings

| Metric | East | West |
|--------|------|------|
| Businesses mentioned | ~67 | ~30 |
| Total mentions | ~130 | ~35 |
| Avg mentions/business | ~2.0 | ~1.2 |

**Toitoi Venues** alone received 18 mentions — more than most businesses combined.

## Project Structure

```
hastings-spotlight/
├── server.js              # Express server (Railway-ready)
├── package.json
├── railway.toml           # Railway deployment config
├── public/
│   └── index.html         # Interactive map application
├── data/
│   ├── businesses.json    # Curated, geocoded business dataset
│   ├── posts-200.json     # Raw Instagram scrape (200 posts)
│   └── mention-counts.json # Processed mention frequency data
└── scripts/
    └── process-data.js    # Data processing script
```

## Deploy to Railway

1. Push this repo to GitHub
2. Connect to [Railway](https://railway.app)
3. Deploy — it auto-detects Node.js
4. Your site is live

Or via Railway CLI:
```bash
railway login
railway init
railway up
```

## API Endpoints

| Endpoint | Description |
|----------|-------------|
| `GET /` | Interactive map |
| `GET /api/businesses` | Curated business dataset with geocoded locations |
| `GET /api/posts` | Raw Instagram post data (200 posts) |
| `GET /data/posts-200.json` | Static data file |
| `GET /health` | Health check |

## Data & Methodology

- **Source:** Public Instagram posts from @hastingscitynz
- **Scrape tool:** Spiffy (Apify-based Instagram scraper)
- **Sample:** 200 of 831 total posts (Dec 2024 – Feb 2026)
- **Business identification:** Extracted from `@mentions` in post captions
- **Geocoding:** Addresses verified where explicitly stated in captions (marked `verified: true`), otherwise placed approximately based on known locations
- **Zone assignment:** East/West split at Railway Rd / Hastings St intersection (lng ~176.8415)

### Limitations

- 200 of 831 posts analysed — full dataset would strengthen findings
- Some business locations are approximate where no address was stated in captions
- General/event posts (98 of 200) mention locations but not always specific businesses
- BID member count (~480) is from HCBA's public website; actual current number may differ

## Custom Domain

To use a custom domain on Railway:
1. Go to your Railway project → Settings → Domains
2. Add your custom domain
3. Update your DNS with the CNAME record Railway provides

## Updating Data

To add new Instagram data:
1. Run a fresh scrape of @hastingscitynz
2. Replace `data/posts-200.json` with the new dataset
3. Run `node scripts/process-data.js` to regenerate mention counts
4. Update `data/businesses.json` with any new businesses (geocode + zone assignment)
5. Update the meta counts in `businesses.json` and `index.html`
6. Push and redeploy

## License

Data analysis and visualisation. Raw Instagram data belongs to the respective account holders.
