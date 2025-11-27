# ChemMastery Deployment Guide

## 🌐 Sharing Your App with Schoolmates

Your app is now configured for easy deployment! Here are your options:

---

## Option 1: GitHub Pages (Automated) ⭐ RECOMMENDED

**URL:** `https://dhanya-rg.github.io/ChemMastery/`

### Setup Steps:
1. Push your code to GitHub (if not done already):
   ```bash
   git add .
   git commit -m "Add GitHub Pages deployment"
   git push -u origin main
   ```

2. Enable GitHub Pages:
   - Go to: https://github.com/dhanya-rg/ChemMastery/settings/pages
   - Under "Build and deployment":
     - Source: Select "GitHub Actions"
   - Click Save

3. Wait 2-3 minutes for the deployment to complete

4. Your app will be live at: `https://dhanya-rg.github.io/ChemMastery/`

**Benefits:**
- ✅ Completely FREE
- ✅ Auto-deploys on every push
- ✅ No signup needed (uses your GitHub)
- ✅ Easy to share URL

---

## Option 2: Vercel (Professional)

**URL:** `https://chemmastery.vercel.app` (or custom domain)

### Setup Steps:
1. Go to https://vercel.com
2. Sign up with GitHub
3. Click "New Project"
4. Import `ChemMastery` repository
5. Click "Deploy"

**Benefits:**
- ✅ FREE tier is generous
- ✅ Faster than GitHub Pages
- ✅ Better analytics
- ✅ Custom domain support

---

## Option 3: Netlify

**URL:** `https://chemmastery.netlify.app`

### Setup Steps:
1. Go to https://netlify.com
2. Sign up with GitHub
3. "Add new site" → "Import from Git"
4. Select `ChemMastery`
5. Build command: `npm run build`
6. Publish directory: `dist`
7. Deploy!

**Benefits:**
- ✅ FREE
- ✅ Form handling (if you add features)
- ✅ Serverless functions support

---

## Option 4: Share Locally (Quick Demo)

If you just want to demo to friends nearby:

1. Run the dev server:
   ```bash
   npm run dev -- --host
   ```

2. Find your local IP address:
   - Windows: `ipconfig` (look for IPv4 Address)
   - Example: `192.168.1.100`

3. Share the URL with friends on the same WiFi:
   ```
   http://192.168.1.100:5173
   ```

**Note:** This only works when your computer is on and connected to the same network.

---

## 📱 Sharing the Link

Once deployed, share your app with:
- **QR Code:** Use https://qr-code-generator.com with your URL
- **Short Link:** Use https://bit.ly to create a memorable link
- **Social Media:** Share directly on WhatsApp, Discord, etc.

---

## 🔄 Updating Your App

After deployment, any changes you make:
1. Commit and push to GitHub:
   ```bash
   git add .
   git commit -m "Your update message"
   git push
   ```

2. GitHub Pages/Vercel/Netlify will automatically rebuild and deploy!

---

## 🎓 Best for School Use

**I recommend GitHub Pages** because:
- No extra account needed
- Free forever
- Easy to remember URL
- Professional looking
- Works on all devices

Good luck with your project! 🧪✨
