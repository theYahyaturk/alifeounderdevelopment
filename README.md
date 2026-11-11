# Alifeo Coming Soon & Pre-Launch Waitlist Page 🚀

Ek standalone, lightweight aur high-converting pre-launch landing page **HTML + CSS + JS** me banayi gayi hai.

## 📁 Folder Structure
```
alifeo-coming-soon/
├── index.html       # Complete landing page with hero, pillars, FBS, Rider, Seller & waitlist forms
├── style.css        # Modern Alifeo dark/indigo glassmorphism styling
├── script.js       # Countdown timer, modals, and waitlist submission logic
├── logo.png         # Official Alifeo logo
└── README.md        # Hosting & configuration guide
```

---

## 📧 Email Notification Setup (How to get emails on your inbox for free)

Form submission code `script.js` me configured hai. Apne inbox me direct email pane ke 2 sabse aasan free tarike:

### Option 1: Formspree (Recommended - Free)
1. Free me account banaye: [https://formspree.io](https://formspree.io)
2. Ek naya form create karein aur apna email address dalein.
3. Formspree se aapko ek URL milegi jaise: `https://formspree.io/f/mqkenwka`
4. `script.js` open karein aur line 11 par `EMAIL_ENDPOINT` me apni URL paste karein:
   ```javascript
   const EMAIL_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID';
   ```
5. Done! Koi bhi waitlist join karega to direct aapki email par details aa jayengi.

### Option 2: Web3Forms (No signup required - 100% Free)
1. [https://web3forms.com](https://web3forms.com) par email daal kar access key lein.
2. Direct endpoint use kar sakte hain!

*Note: Jab tak email endpoint configure nahi hota, tab tak data user ke browser ke `localStorage` me safely store hota hai taaki development ke dauran koi bhi submission miss na ho.*

---

## 🌐 Free Hosting Guide (Sirf 2 minutes me Live)

Aap is folder ko kisi bhi free static hosting par live kar sakte hain:

### Method 1: Netlify Drop (Sabse aasan - Drag & Drop)
1. [https://app.netlify.com/drop](https://app.netlify.com/drop) par jayein.
2. Poora `alifeo-coming-soon` folder drag & drop karein.
3. 5 second me aapki free custom `.netlify.app` link live ho jayegi!

### Method 2: Vercel
1. Vercel dashboard me naya project banayein aur `alifeo-coming-soon` directory select karke Deploy karein.

### Method 3: GitHub Pages
1. Is folder ko kisi GitHub repository me push karein.
2. Repo Settings -> Pages -> Source branch select karke save karein.

