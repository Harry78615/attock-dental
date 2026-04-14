# Attock Dental Clinic Website
**Domain:** attockdental.site  
**Hosted on:** Vercel

---

## File Structure
```
attock-dental/
├── index.html          → Home page
├── services.html       → All services
├── about.html          → About + Dr. Mahwash
├── book.html           → Book appointment (form)
├── vercel.json         → Vercel routing config
├── css/
│   └── style.css       → All styles
├── js/
│   └── main.js         → Navigation + form logic
└── assets/
    ├── logo.png        → Clinic logo
    └── doctor.jpg      → Dr. Mahwash photo
```

---

## FORMSPREE SETUP (for email on booking form)
The booking form needs Formspree to send emails to mahwashkhizran@gmail.com.

1. Go to **https://formspree.io** and create a FREE account
2. Click "New Form" → enter your email (mahwashkhizran@gmail.com)
3. You'll get a URL like: `https://formspree.io/f/xabc1234`
4. Open `book.html` and replace `YOUR_FORMSPREE_ID` with your actual ID
   - Find: `action="https://formspree.io/f/YOUR_FORMSPREE_ID"`
   - Replace with: `action="https://formspree.io/f/xabc1234"` (your real ID)
5. Done! Form submissions will be emailed to you automatically.

---

## DEPLOY TO VERCEL

### Option 1: Via GitHub (recommended)
1. Create a GitHub repo (e.g. `attock-dental-site`)
2. Push this entire folder to it
3. Go to **vercel.com** → Import Project → Select your GitHub repo
4. Click Deploy — it'll auto-detect the static site
5. Go to Settings → Domains → Add `attockdental.site`
6. Update your domain's DNS (add CNAME pointing to `cname.vercel-dns.com`)

### Option 2: Vercel CLI
```bash
npm i -g vercel
cd attock-dental
vercel --prod
```

---

## GOOGLE MAPS
The map in `book.html` uses a free embed (no API key needed).
If you want a more precise pin on your exact clinic location:
1. Go to Google Maps → search your clinic
2. Click Share → Embed a map → Copy iframe src URL
3. Replace the `src` in the map iframe in `book.html`
