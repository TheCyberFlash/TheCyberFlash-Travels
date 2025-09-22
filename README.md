# TheCyberFlash Travels

A 14-week travel adventure with Bruno and friends. New character reveals every Wednesday.

## 🌟 Project Overview

TheCyberFlash Travels is a static GitHub Pages site showcasing a weekly NFT character reveal series. Each Wednesday, a new traveler character is unveiled, leading up to a special Christmas finale where all characters reunite.

## 🚀 Features

- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Weekly Reveals**: Easy JSON-based system for weekly character updates
- **Interactive Gallery**: Live characters are clickable with marketplace links
- **Lock System**: Upcoming characters appear locked with unlock dates
- **Timeline View**: Visual timeline showing all weeks and reveal dates
- **Dark/Light Mode**: User preference toggle with localStorage persistence
- **Accessibility**: Full keyboard navigation and screen reader support
- **Performance**: Vanilla JavaScript with no build dependencies

## 📁 Project Structure

```
/
├── index.html          # Main HTML file
├── styles.css          # All CSS styling and animations
├── script.js           # JavaScript functionality
├── data/
│   └── animals.json    # Character data (edit for weekly updates)
├── assets/
│   ├── *.png          # Character placeholder images
│   ├── lock.svg       # Lock icon for unrevealed characters
│   ├── og-image.png   # Open Graph image for social sharing
│   ├── favicon-32x32.png
│   └── favicon-16x16.png
├── README.md          # This file
└── .nojekyll         # GitHub Pages compatibility
```

## 🔄 Weekly Updates

To reveal a new character each week:

1. **Edit `data/animals.json`**:
   ```json
   {
     "id": "character-name",
     "status": "live",           // Change from "locked" to "live"
     "marketLink": "https://..."  // Add marketplace URL
   }
   ```

2. **Replace the character's promo image** in `/assets/` with the actual reveal image

3. **Commit and push** changes to update the live site

### Character Data Fields

- `id`: Unique identifier (kebab-case)
- `name`: Display name (e.g., "Bruno the Explorer")
- `emoji`: Character emoji
- `bio`: Character description
- `status`: `"live"` or `"locked"`
- `unlockDate`: ISO date string for reveal date
- `promoImage`: Path to character image
- `marketLink`: Marketplace URL (null for locked characters)

## 🚢 GitHub Pages Deployment

### Option 1: New Repository

1. Create a new public repository on GitHub
2. Clone this code to your repository
3. Push to the `main` branch
4. Go to Settings → Pages
5. Set Source to "Deploy from a branch"
6. Select `main` branch and `/ (root)` folder
7. Save and wait for deployment

### Option 2: Existing Repository

1. Copy all files to your existing repository
2. Ensure `.nojekyll` file exists in the root
3. Enable GitHub Pages in repository settings
4. Your site will be available at `https://username.github.io/repository-name`

### Important Notes

- The `.nojekyll` file is **required** for GitHub Pages to serve the site correctly
- All paths in the code are relative, so the site works in any subdirectory
- Images should be optimized for web (recommended: PNG/WebP, max 500KB each)

## 🖼️ Image Guidelines

### Character Images
- **Dimensions**: 400x300px recommended
- **Format**: PNG or WebP for best quality
- **Size**: Keep under 500KB for fast loading
- **Content**: Should represent the character's personality and role

### Optimization Tips
- Use tools like TinyPNG or ImageOptim to compress images
- Consider WebP format for better compression
- Ensure images look good when blurred (for locked state)

## ♿ Accessibility Features

- **Semantic HTML5**: Proper heading hierarchy and landmarks
- **ARIA Labels**: Screen reader friendly descriptions
- **Keyboard Navigation**: Full tab-through functionality
- **Focus Indicators**: Visible focus states for all interactive elements
- **Color Contrast**: WCAG 2.1 AA compliant color combinations
- **Alternative Text**: Descriptive alt text for all images
- **Screen Reader Support**: Live regions for dynamic content updates

## 🎨 Customization

### Colors
Edit CSS variables in `styles.css`:
```css
:root {
  --accent-primary: #4f46e5;    /* Main brand color */
  --accent-secondary: #06b6d4;  /* Secondary accent */
  --bg-primary: #ffffff;        /* Main background */
  /* ... more variables */
}
```

### Typography
The site uses system fonts for optimal performance:
```css
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
```

### Animations
- Sparkle animation on Christmas finale card
- Hover effects on character cards
- Smooth transitions throughout
- All animations respect `prefers-reduced-motion`

## 🛠️ Technical Details

### Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- ES6+ JavaScript features used
- CSS Grid and Flexbox for layout
- CSS Custom Properties for theming

### Performance
- No external dependencies
- Optimized images with lazy loading
- Minimal JavaScript bundle
- CSS animations over JavaScript
- Local storage for theme preference

### SEO & Social
- Complete Open Graph meta tags
- Twitter Card support
- Structured semantic HTML
- Descriptive meta descriptions
- Sitemap friendly URLs

## 🐛 Troubleshooting

### Images Not Loading
- Verify image paths in `animals.json` match actual files
- Check that images are in the `/assets/` directory
- Ensure proper file extensions (.png, .jpg, .webp)

### Site Not Updating
- Check that changes are committed and pushed to `main` branch
- GitHub Pages can take a few minutes to deploy changes
- Clear browser cache if needed

### JavaScript Errors
- Open browser developer tools (F12) to see console errors
- Verify `animals.json` is valid JSON format
- Check that all required fields are present in character data

## 📄 License

This project is open source. Feel free to use, modify, and distribute as needed.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For issues or questions:
1. Check this README for common solutions
2. Review browser console for error messages
3. Ensure all files are properly uploaded to GitHub
4. Verify GitHub Pages is enabled in repository settings

---

**Happy travels with TheCyberFlash! 🧸✈️**
