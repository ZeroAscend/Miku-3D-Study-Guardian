🎧 Miku Study Guardian ✨📚

An AI-powered, 3D desktop pet that yells at you when you look at your phone.

Miku Study Guardian is a native desktop productivity application built with Electron. It lives invisibly on your screen and uses real-time computer vision to monitor your webcam. When it catches you holding a mobile phone, a 3D animated Hatsune Miku rises from the bottom of your screen to scold you and protect your focus!

✨ Features

👁️ Real-Time AI Vision: Uses TensorFlow.js and the COCO-SSD object detection model to scan your webcam feed specifically for phones.

🧊 3D Desktop Mascot: Renders a fully 3D, animated .glb model right on your desktop using Three.js.

👻 "Ghost Mode" UI: The app is completely borderless, transparent, and ignores mouse clicks. It sits seamlessly over your code editor, browser, or notes without getting in your way.

🧠 Smart Auto-Dismiss: The warning alert automatically vanishes the exact second you put your phone out of sight—no clicking required.

🔋 Native macOS Overrides: Bypasses Apple's background app throttling so the camera keeps scanning even when Miku is hidden.

🛠️ Tech Stack

Wrapper: Electron & Node.js

Machine Learning: TensorFlow.js (COCO-SSD)

3D Engine: Three.js

Frontend: Vanilla HTML, CSS, and JavaScript

🚀 Installation & Setup

Prerequisites: You must have Node.js installed on your computer.

Clone the repository:

git clone https://github.com/YOUR_USERNAME/miku-study-guardian.git
cd miku-study-guardian


Install dependencies:

npm install


Add the 3D Model:

Ensure you have a file named miku_chibi.glb in the root directory (the same folder as index.html).

Run the application:

npm start


🎮 How to Use

Run the app using npm start.

Camera Permission: Your OS may ask for permission to use the camera. Please allow it!

The app will launch silently in the background. You won't see a window, but you will see a blank icon appear in your top Menu Bar (Mac) or System Tray (Windows).

Study! Go about your work. If you bring a phone into the camera's view for more than 2.5 seconds, Miku will slide up from the bottom of the screen and a red alert will lock your focus.

Put the phone away to dismiss the alert and send Miku back into hiding.

To fully quit the app, click the invisible icon in your top Menu Bar and select "Quit Miku Guardian", or press Ctrl + C in your terminal.

⚠️ Troubleshooting

Black Screen instead of Invisible Background (macOS):
Ensure your main.js includes backgroundColor: '#00000000' in the BrowserWindow settings.

Camera Freezes in Background:
The app uses backgroundThrottling: false to prevent macOS from pausing the camera loop when the window isn't focused.

No 3D Model Rendering:
Check your developer console. If Three.js cannot find miku_chibi.glb, it will fail to render. Check your file paths and capitalization.

📝 Credits

3D Model: "Miku (chibi)" by mega mix on Sketchfab (CC-BY-4.0).

AI Model: TensorFlow's pre-trained COCO-SSD.
