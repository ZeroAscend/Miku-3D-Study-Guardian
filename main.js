const { app, BrowserWindow, ipcMain, Tray, Menu, nativeImage, session } = require('electron');

let win;
let tray;

function createWindow() {
    win = new BrowserWindow({
        width: 400,
        height: 600,
        alwaysOnTop: true,
        transparent: true,
        frame: false,
        hasShadow: false,
        skipTaskbar: true,
        backgroundColor: '#00000000',
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            backgroundThrottling: false  // keeps camera running when window is in background
        }
    });

    win.setAlwaysOnTop(true, 'screen-saver', 1);
    win.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true });
    win.setIgnoreMouseEvents(true, { forward: true });
    win.loadFile('index.html');

    // Uncomment to debug:
    // win.webContents.openDevTools({ mode: 'detach' });
}

// ═══════════════════════════════════════════════════
// BUG FIX: Grant camera permission explicitly.
// Without this, getUserMedia silently fails in Electron
// because Chromium blocks it waiting for user approval
// that never comes (no browser UI to approve it).
// ═══════════════════════════════════════════════════
app.whenReady().then(() => {

    // Grant camera (and mic, just in case) permissions automatically
    session.defaultSession.setPermissionRequestHandler(
        (webContents, permission, callback) => {
            if (permission === 'media' ||
                permission === 'mediaKeySystem' ||
                permission === 'camera') {
                callback(true);   // ← approve
            } else {
                callback(false);
            }
        }
    );

    // Also handle the newer permission check handler
    session.defaultSession.setPermissionCheckHandler(
        (webContents, permission, requestingOrigin) => {
            if (permission === 'media' || permission === 'camera') {
                return true;  // ← approve
            }
            return false;
        }
    );

    if (app.dock) app.dock.hide();

    // Empty tray icon — right-click to quit
    tray = new Tray(nativeImage.createEmpty());
    tray.setToolTip('Miku Study Guardian');
    tray.setContextMenu(Menu.buildFromTemplate([
        { label: 'Miku Study Guardian', enabled: false },
        { type: 'separator' },
        { label: 'Quit', click: () => app.quit() }
    ]));

    createWindow();
});

// ═══════════════════════════════════════════════════
// Toggle click-through (ghost mode).
// true  = clicks pass through to whatever is behind
// false = window is clickable (for the alert button)
// ═══════════════════════════════════════════════════
ipcMain.on('set-ignore-mouse', (event, ignore) => {
    const w = BrowserWindow.fromWebContents(event.sender);
    if (!w) return;
    w.setIgnoreMouseEvents(ignore, { forward: true });
    if (!ignore) w.focus();  // bring to front so macOS lets you click
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});