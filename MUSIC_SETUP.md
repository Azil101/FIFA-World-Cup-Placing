# Background Music Setup Guide

The FIFA World Cup booking application now includes a background music player with an animated music button in the bottom-right corner.

## Features

✅ **Floating Music Button** - Beautiful animated button in bottom-right corner
✅ **Play/Pause Control** - Click to toggle music on/off
✅ **Visual Feedback** - Button changes color when playing (green) or paused (red)
✅ **Smooth Animations** - Pulsing effect and animated music note icon
✅ **Auto-Loop** - Music loops continuously when playing
✅ **Volume Control** - Set to 30% by default for comfortable listening

## How to Add "Locked Away" Instrumental by CG5

### Option 1: Local File (Recommended for index.html)

1. **Download the instrumental version** of "Locked Away" by CG5
   - Search for "Locked Away CG5 instrumental" on YouTube
   - Use a YouTube to MP3 converter (ensure you have the rights to use it)
   - Or purchase the instrumental version from official sources

2. **Create music folder** in your project:
   ```bash
   mkdir music
   ```

3. **Add the music file**:
   - Save the file as `locked-away-instrumental.mp3`
   - Place it in the `music/` folder
   - Path should be: `music/locked-away-instrumental.mp3`

4. **File is already configured** in `index.html`:
   ```html
   <audio id="background-music" loop>
       <source src="music/locked-away-instrumental.mp3" type="audio/mpeg">
   </audio>
   ```

### Option 2: Host Online (For Standalone HTML)

The standalone HTML file uses an online music URL by default. To use "Locked Away":

1. **Upload the instrumental** to a file hosting service:
   - Google Drive (make public and get direct link)
   - Dropbox (use direct download link)
   - Your own web server
   - SoundCloud (use embed URL)

2. **Update the standalone HTML** file (line ~519):
   ```html
   <audio id="background-music" loop>
       <source src="YOUR_MUSIC_URL_HERE" type="audio/mpeg">
   </audio>
   ```

### Option 3: YouTube Embed (Alternative)

If you prefer using YouTube directly, you can embed a YouTube video:

```html
<iframe
    id="background-music-youtube"
    width="0"
    height="0"
    src="https://www.youtube.com/embed/VIDEO_ID?autoplay=1&loop=1&playlist=VIDEO_ID"
    frameborder="0"
    allow="autoplay">
</iframe>
```

Note: You'll need to modify the JavaScript to control YouTube player API instead of HTML5 audio.

## Music Player Controls

### Button States

- **Blue (Pulsing)**: Ready to play - click to start
- **Green**: Currently playing music
- **Red**: Paused - click to resume

### User Interaction

1. User visits the page
2. Clicks the animated music button (🎵)
3. Music starts playing and button turns green
4. Click again to pause - button turns red
5. Music loops automatically when playing

## Customization

### Change Volume

In `script.js` or standalone HTML, find:
```javascript
backgroundMusic.volume = 0.3; // 30% volume
```

Change to any value between 0.0 (mute) and 1.0 (full volume).

### Change Button Position

In `styles.css` or standalone HTML CSS, find:
```css
.music-player {
    position: fixed;
    bottom: 30px;  /* Distance from bottom */
    right: 30px;   /* Distance from right */
}
```

### Different Music Icon

Change the emoji in the HTML:
```html
<span class="music-icon">🎵</span>
```

Try: 🎶 🎧 🔊 🎼 🎹 or any other music emoji

## File Format Support

The audio player supports:
- **MP3** (recommended) - `.mp3`
- **WAV** - `.wav`
- **OGG** - `.ogg`
- **M4A** - `.m4a`

For best compatibility, use **MP3 format**.

## Troubleshooting

### Music Not Playing?

1. **Check file path**: Make sure the music file exists at the specified location
2. **Check browser console**: Open Developer Tools (F12) and check for errors
3. **Try different browser**: Some browsers block autoplay
4. **File format**: Ensure the file is a valid audio format
5. **CORS issues**: If using external URL, ensure it allows cross-origin access

### Button Not Appearing?

1. Check if JavaScript is enabled
2. Check browser console for errors
3. Verify the music-player HTML code is present

### Music Cuts Off?

1. Ensure `loop` attribute is present: `<audio loop>`
2. Check if file is corrupted
3. Try a different audio file

## Copyright Notice

⚠️ **Important**: Ensure you have the legal right to use any music in your application.

- For personal/testing use only
- For commercial use, obtain proper licenses
- Consider using royalty-free music alternatives
- Respect artist copyrights

## Royalty-Free Music Alternatives

If you can't use "Locked Away" legally, try these free music sources:

- **YouTube Audio Library** - Free music for creators
- **Free Music Archive** - Creative Commons music
- **Incompetech** - Royalty-free music by Kevin MacLeod
- **Bensound** - Free music for videos and projects
- **Purple Planet** - Free music downloads

## Technical Details

### Music Player Features

```javascript
// Volume: 30% (0.3)
// Loop: Enabled
// Autoplay: Disabled (requires user interaction)
// Format: MP3
// Button Animation: Pulse effect (2s cycle)
// Icon Animation: Bounce when idle, rotate when playing
```

### Browser Compatibility

✅ Chrome, Firefox, Safari, Edge (latest versions)
✅ Mobile browsers (iOS Safari, Chrome Mobile)
⚠️ Autoplay requires user interaction (browser policy)

## Project Structure

```
FIFA-World-Cup-Placing/
├── music/
│   └── locked-away-instrumental.mp3  (add this file)
├── index.html                         (references local music file)
├── fifa-booking-standalone.html       (uses online URL)
├── styles.css                         (music player styles)
├── script.js                          (music player logic)
└── MUSIC_SETUP.md                    (this file)
```

## Next Steps

1. ✅ Music player is already integrated
2. 📥 Download/obtain "Locked Away" instrumental
3. 📁 Create `music/` folder
4. 💾 Save file as `locked-away-instrumental.mp3`
5. 🎵 Refresh page and click the music button!

Enjoy your FIFA World Cup booking experience with background music! 🎉⚽🎶
