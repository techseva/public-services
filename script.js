// --- FIREBASE CONFIGURATION ---
// We first try to load the config from setup.html, otherwise use default
const savedConfig = localStorage.getItem('firebaseConfig');
const firebaseConfig = savedConfig ? JSON.parse(savedConfig) : {
    apiKey: "AIzaSyBN_ZnMYbKYGV7mk4ugFRRzA94U1oMqksU",
    authDomain: "smart-public-services-8abf6.firebaseapp.com",
    projectId: "smart-public-services-8abf6",
    storageBucket: "smart-public-services-8abf6.firebasestorage.app",
    messagingSenderId: "540029989204",
    appId: "1:540029989204:web:e1b59514c32912d57cd8c1"
};

// Application State
let db = null;

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Firebase
    if (typeof firebase !== 'undefined' && firebaseConfig && firebaseConfig.apiKey) {
        try {
            if (!firebase.apps.length) {
                firebase.initializeApp(firebaseConfig);
                console.log("Firebase initialized with " + (savedConfig ? "custom config" : "default config"));
            }
            db = firebase.firestore();
            console.log("Firestore ready.");
        } catch (e) {
            console.error("Firebase Init Error:", e);
        }
    }

    // 2. Load Content
    loadUpdates();
    loadServices();

    // 3. Admin Mode Setup
    setupAdminMode();

    // 4. Modal Logic
    setupModal();
});

function loadUpdates() {
    const container = document.getElementById('dynamic-updates');
    if (!container) return;

    // Clear container and wait for server data
    container.innerHTML = '';

    if (!db) {
        container.innerHTML = '<p style="text-align:center; padding:20px;">Firebase not connected.</p>';
        return;
    }

    // Real-time listener
    db.collection("updates")
        .orderBy("postDate", "desc")
        .onSnapshot({ includeMetadataChanges: true }, (querySnapshot) => {
            // We no longer block the cache completely, as it's needed for instant local updates.
            // We only show the 'No updates' or 'Loading' state when the snapshot is actually empty.

            let html = "";
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                // If postDate is still pending from the server, use current time for display
                if (!data.postDate) data.postDate = { seconds: Date.now() / 1000 };
                html += renderUpdateCard(doc.id, data);
            });

            if (html === "" && querySnapshot.metadata.fromCache) {
                // Keep waiting for server if cache is empty
                return;
            }

            container.innerHTML = html || '<p style="text-align:center; padding:20px;">No updates available.</p>';
        }, (error) => {
            console.error("Firestore Listen Error:", error);
            container.innerHTML = '<p style="text-align:center; padding:20px;">Error loading updates.</p>';
        });
}

function loadServices() {
    const container = document.getElementById('dynamic-services');
    if (!container) return;
    container.innerHTML = '';
    if (!db) {
        // Silent - just show hardcoded services below
        return;
    }

    db.collection("services")
        .orderBy("postDate", "desc")
        .onSnapshot({ includeMetadataChanges: true }, (querySnapshot) => {
            let html = "";
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                if (!data.postDate) data.postDate = { seconds: Date.now() / 1000 };
                html += renderServiceCard(doc.id, data);
            });

            if (html === "" && querySnapshot.metadata.fromCache) {
                return;
            }

            container.innerHTML = html; // Silent if no dynamic services exist
        }, (error) => {
            console.warn("Dynamic Services disabled or rules missing:", error);
            // No intrusive error message, just show hardcoded ones
        });
}

function renderUpdateCard(id, data) {
    const title = data.postTitle || "Update";
    const text = data.postText || "";
    const url = data.postUrl || "";
    const titleColor = data.postTitleColor || "#004AAD";
    const titleBold = data.postTitleBold || "bold";
    const btnColor = data.postButtonColor || "#0076FF";
    const btnStyle = data.postBtnStyle || "solid";
    const btnCase = data.postBtnCase || "uppercase";
    const btnPos = data.postBtnPos || "flex-end";
    const date = data.postDate ? new Date(data.postDate.seconds * 1000).toLocaleString() : "";
    const btnText = data.postButtonText || "Learn More";

    let btnStyleAttr = "";
    if (btnStyle === 'outlined') {
        btnStyleAttr = `background: transparent; border: 2px solid ${btnColor}; color: ${btnColor};`;
    } else if (btnStyle === 'pill') {
        btnStyleAttr = `background: ${btnColor}; color: white; border: none; border-radius: 50px;`;
    } else if (btnStyle === 'gradient') {
        btnStyleAttr = `background: linear-gradient(135deg, ${btnColor}, #ffffff22); color: white; border: none; box-shadow: 0 4px 15px rgba(0,0,0,0.15);`;
    } else if (btnStyle === 'shadow') {
        btnStyleAttr = `background: ${btnColor}; color: white; border: none; box-shadow: 0 8px 20px ${btnColor}44;`;
    } else if (btnStyle === 'underline') {
        btnStyleAttr = `background: transparent; color: ${btnColor}; border: none; padding: 4px 0; border-bottom: 2px solid ${btnColor}; border-radius: 0; font-weight: 800;`;
    } else {
        // Default Solid
        btnStyleAttr = `background: ${btnColor}; color: white; border: none;`;
    }

    let cardHtml = `
        <div class="post-card" id="post-${id}" role="region" aria-label="Update: ${title}">
            ${getAdminMenu(id, 'updates')}
            <div class="post-content">
                <span class="post-date" aria-label="Posted on ${date}">${date}</span>
                <h2 class="post-title" style="color: ${titleColor}; font-weight: ${titleBold === 'bold' ? '800' : 'normal'}" aria-label="Update title: ${title}">${title}</h2>
                <p class="post-text" aria-label="Update details">${text.replace(/\n/g, '<br>')}</p>
                
                ${(data.link1Title || data.link2Title || data.link3Title) ? `
                    <div class="post-extra-links" role="group" aria-label="Additional links">
                        ${data.link1Title ? `<a href="${data.link1Url || '#'}" class="extra-link-item" role="button" tabindex="0" aria-label="Link 1: ${data.link1Title}"><span>1</span> ${data.link1Title}</a>` : ''}
                        ${data.link2Title ? `<a href="${data.link2Url || '#'}" class="extra-link-item" role="button" tabindex="0" aria-label="Link 2: ${data.link2Title}"><span>2</span> ${data.link2Title}</a>` : ''}
                        ${data.link3Title ? `<a href="${data.link3Url || '#'}" class="extra-link-item" role="button" tabindex="0" aria-label="Link 3: ${data.link3Title}"><span>3</span> ${data.link3Title}</a>` : ''}
                    </div>
                ` : ''}
                <div style="display: flex; justify-content: ${btnPos}; margin-top: 12px;">
                    <a href="${url}" class="btn-action" style="${btnStyleAttr} text-transform: ${btnCase};" role="button" tabindex="0" aria-label="${btnText}: ${title}">
                        ${btnText}
                    </a>
                </div>
            </div>
        </div>
    `;
    return cardHtml;
}
function renderServiceCard(id, data) {
    const title = data.postTitle || "Service";
    const subtitle = data.postText || "";
    const url = data.postUrl || "#";
    const date = data.postDate ? new Date(data.postDate.seconds * 1000).toLocaleString() : ""; // Added date for consistency

    return `
        <div class="service-card" id="service-${id}" onclick="window.location.href='${url}'" role="button" tabindex="0" aria-label="${title}. ${subtitle}">
            ${getAdminMenu(id, 'services')}
            <div class="card-content">
                <span class="post-date" aria-label="Added on ${date}">${date}</span>
                <h2 class="card-title" aria-label="Service title: ${title}">${title}</h2>
                <p class="card-subtitle" aria-label="Service description">${subtitle}</p>
            </div>
        </div>
    `;
}

// --- TAB SWITCHING ---
window.switchTab = (tabName) => {
    const updatesSect = document.getElementById('section-updates');
    const servicesSect = document.getElementById('section-services');
    const tabUpdates = document.getElementById('tab-updates');
    const tabServices = document.getElementById('tab-services');
    const indicator = document.getElementById('tabIndicator');

    if (tabName === 'updates') {
        updatesSect.classList.add('active');
        servicesSect.classList.remove('active');
        tabUpdates.classList.add('active');
        tabServices.classList.remove('active');
        indicator.style.transform = 'translateX(0)';
    } else {
        updatesSect.classList.remove('active');
        servicesSect.classList.add('active');
        tabUpdates.classList.remove('active');
        tabServices.classList.add('active');
        indicator.style.transform = 'translateX(100%)';
    }

    // Refresh Admin UI to show/hide FAB based on new tab
    updateAdminUI();
};

function setupAdminMode() {
    let clickCount = 0;
    // Allow secret clicking on any tab
    document.querySelectorAll('.tab').forEach(t => {
        t.addEventListener('click', () => {
            if (!t.classList.contains('active')) return; // Only count clicks on the already active tab
            clickCount++;
            if (clickCount >= 10) {
                const isAdmin = localStorage.getItem('appAdminMode') === 'true';

                // If toggling OFF, just do it
                if (isAdmin) {
                    localStorage.setItem('appAdminMode', 'false');
                    firebase.auth().signOut();
                    updateAdminUI();
                    showToast("Admin Mode Disabled");
                    clickCount = 0;
                    return;
                }

                // If toggling ON, ask for password
                const password = prompt("Enter Admin Password:");
                if (password === "637313240014") {
                    localStorage.setItem('appAdminMode', 'true');
                    firebase.auth().signInAnonymously().catch(e => console.error("Auth Error:", e));
                    updateAdminUI();
                    showToast("🔑 Admin Access Granted!");
                } else if (password !== null) {
                    showToast("❌ Incorrect Password!");
                }

                clickCount = 0;
            }
        });
    });

    updateAdminUI();
}

function updateAdminUI() {
    const isAdmin = localStorage.getItem('appAdminMode') === 'true';
    const fab = document.getElementById('addBtn');

    // Show FAB if Admin
    if (fab) {
        // Safe check for tab existence
        const updatesSect = document.getElementById('section-updates');
        let isTabbedUpdates = updatesSect && updatesSect.classList.contains('active');

        // If we are not on a tabbed page (like updates.html), consider the context
        const isStandaloneUpdates = document.body.dataset.context === 'updates';

        fab.style.display = (isAdmin && (isTabbedUpdates || isStandaloneUpdates)) ? 'flex' : 'none';
        fab.style.zIndex = "9999";
    }

    document.body.classList.toggle('admin-mode', isAdmin);

    // Toggle menu visibility
    const menus = document.querySelectorAll('.card-menu-btn');
    menus.forEach(m => m.style.display = isAdmin ? 'flex' : 'none');
}

function setupModal() {
    const modal = document.getElementById('addModal');
    const addBtn = document.getElementById('addBtn');
    const cancelBtn = document.getElementById('cancelBtn');
    const saveBtn = document.getElementById('saveBtn');

    if (addBtn) addBtn.onclick = () => {
        resetModal();
        modal.classList.add('active');
    };

    if (cancelBtn) cancelBtn.onclick = () => modal.classList.remove('active');

    // Choice Box Logic
    document.querySelectorAll('.choice-box').forEach(box => {
        box.onclick = () => {
            const group = box.parentElement;
            const targetId = group.dataset.target;
            const value = box.dataset.value;

            // Update hidden select
            document.getElementById(targetId).value = value;

            // Update UI
            group.querySelectorAll('.choice-box').forEach(b => b.classList.remove('active'));
            box.classList.add('active');
        };
    });

    if (saveBtn) {
        saveBtn.onclick = async () => {
            const title = document.getElementById('inpTitle').value.trim();
            const text = document.getElementById('inpText').value.trim();

            if (!title || !text) {
                showToast("⚠️ Please enter Title and Content");
                return;
            }

            if (!db) {
                showToast("❌ Database not connected");
                return;
            }

            // Lock UI
            saveBtn.disabled = true;
            saveBtn.innerText = "⏳ Saving...";

            // Failsafe: Reset button if it hangs for 15 seconds
            const failsafe = setTimeout(() => {
                if (saveBtn.disabled) {
                    saveBtn.disabled = false;
                    saveBtn.innerText = "Save";
                    showToast("⏳ Request timed out. Check connection.");
                }
            }, 15000);

            try {
                const docId = modal.dataset.editId;
                const updatesSect = document.getElementById('section-updates');
                const isUpdatesTab = updatesSect ? updatesSect.classList.contains('active') : (document.body.dataset.context === 'updates');
                const activeTab = isUpdatesTab ? 'updates' : 'services';

                // Safely get values with fallbacks for elements that might not exist on all pages
                const getVal = (id) => {
                    const el = document.getElementById(id);
                    return el ? el.value.trim() : "";
                };
                const getSelect = (id, fallback) => {
                    const el = document.getElementById(id);
                    return el ? el.value : fallback;
                };

                const postData = {
                    postTitle: title,
                    postText: text,
                    postUrl: getVal('inpUrl'),
                    postButtonText: getVal('inpButtonText'),
                    postTitleColor: getSelect('inpTitleColor', '#004AAD'),
                    postTitleBold: getSelect('inpTitleBold', 'bold'),
                    postButtonColor: getSelect('inpButtonColor', '#0076FF'),
                    postBtnStyle: getSelect('inpBtnStyle', 'solid'),
                    postBtnCase: getSelect('inpBtnCase', 'uppercase'),
                    postBtnPos: getSelect('inpBtnPos', 'flex-end'),
                    link1Title: getVal('link1Title'),
                    link1Url: getVal('link1Url'),
                    link2Title: getVal('link2Title'),
                    link2Url: getVal('link2Url'),
                    link3Title: getVal('link3Title'),
                    link3Url: getVal('link3Url'),
                    postDate: firebase.firestore.FieldValue.serverTimestamp()
                };

                if (docId) {
                    const collection = modal.dataset.editCollection || activeTab;
                    await db.collection(collection).doc(docId).set(postData, { merge: true });
                    showToast("✅ Updated successfully!");
                } else {
                    await db.collection(activeTab).add(postData);
                    showToast("✅ Item added to " + activeTab.toUpperCase() + "!");
                }

                clearTimeout(failsafe);

                // Close and Refresh
                modal.classList.remove('active');
                window.switchTab(activeTab); // Stay on current tab or redirect to saved one
                window.scrollTo({ top: 0, behavior: 'smooth' });
                resetModal();
            } catch (err) {
                clearTimeout(failsafe);
                console.error("Firestore Save Error:", err);
                showToast("❌ Permission Denied! Check Firestore Rules.");
            } finally {
                saveBtn.disabled = false;
                saveBtn.innerText = "Save";
            }
        };
    }

    // Initial sync
    updateVisualChoices();
}

function resetModal() {
    const modal = document.getElementById('addModal');
    delete modal.dataset.editId;
    delete modal.dataset.editCollection;
    document.querySelector('.modal-header').innerText = "Add Item";
    document.getElementById('inpTitle').value = "";
    document.getElementById('inpText').value = "";
    document.getElementById('inpUrl').value = "";
    document.getElementById('inpButtonText').value = "";
    document.getElementById('inpTitleColor').value = "#004AAD";
    document.getElementById('inpTitleBold').value = "bold";
    document.getElementById('inpButtonColor').value = "#0076FF";
    document.getElementById('inpBtnStyle').value = "solid";
    document.getElementById('inpBtnCase').value = "uppercase";
    document.getElementById('inpBtnPos').value = "flex-end";

    document.getElementById('link1Title').value = "";
    document.getElementById('link1Url').value = "";
    document.getElementById('link2Title').value = "";
    document.getElementById('link2Url').value = "";
    document.getElementById('link3Title').value = "";
    document.getElementById('link3Url').value = "";

    updateVisualChoices();
}

window.editUpdate = async (id, collection = 'updates') => {
    const doc = await db.collection(collection).doc(id).get();
    if (!doc.exists) return;
    const data = doc.data();

    const modal = document.getElementById('addModal');
    modal.dataset.editId = id;
    modal.dataset.editCollection = collection;
    document.querySelector('.modal-header').innerText = "Edit " + collection.toUpperCase();

    // Safely set field values
    const setVal = (id, val) => {
        const el = document.getElementById(id);
        if (el) el.value = val || "";
    };

    setVal('inpTitle', data.postTitle);
    setVal('inpText', data.postText);
    setVal('inpUrl', data.postUrl);
    setVal('inpButtonText', data.postButtonText);
    setVal('inpTitleColor', data.postTitleColor || "#004AAD");
    setVal('inpTitleBold', data.postTitleBold || "bold");
    setVal('inpButtonColor', data.postButtonColor || "#0076FF");
    setVal('inpBtnStyle', data.postBtnStyle || "solid");
    setVal('inpBtnCase', data.postBtnCase || "uppercase");
    setVal('inpBtnPos', data.postBtnPos || "flex-end");

    setVal('link1Title', data.link1Title);
    setVal('link1Url', data.link1Url);
    setVal('link2Title', data.link2Title);
    setVal('link2Url', data.link2Url);
    setVal('link3Title', data.link3Title);
    setVal('link3Url', data.link3Url);

    updateVisualChoices();
    modal.classList.add('active');
};

function updateVisualChoices() {
    document.querySelectorAll('.choice-group').forEach(group => {
        const targetId = group.dataset.target;
        const val = document.getElementById(targetId).value;
        group.querySelectorAll('.choice-box').forEach(box => {
            box.classList.toggle('active', box.dataset.value === val);
        });
    });
}

window.deleteUpdate = async (id, collection = 'updates') => {
    if (confirm("Are you sure you want to delete this from " + collection + "?")) {
        try {
            await db.collection(collection).doc(id).delete();
            showToast("Item deleted");
        } catch (e) {
            showToast("Delete failed");
        }
    }
};

window.toggleCardMenu = (e, id) => {
    e.stopPropagation();
    const dropdown = document.getElementById(`dropdown-${id}`);
    const all = document.querySelectorAll('.card-menu-dropdown');
    all.forEach(d => { if (d !== dropdown) d.classList.remove('active'); });
    dropdown.classList.toggle('active');
};

function getAdminMenu(id, collection = 'updates') {
    return `
        <button class="card-menu-btn" onclick="toggleCardMenu(event, '${id}')" role="button" tabindex="0" aria-label="Card menu options for item ${id}">
            <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none"><circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/></svg>
        </button>
        <div class="card-menu-dropdown" id="dropdown-${id}" role="menu" aria-label="Card actions">
            <div class="card-menu-item" onclick="editUpdate('${id}', '${collection}')" role="button" tabindex="0" aria-label="Edit this ${collection} item">Edit</div>
            <div class="card-menu-item delete" onclick="deleteUpdate('${id}', '${collection}')" role="button" tabindex="0" aria-label="Delete this ${collection} item">Delete</div>
        </div>
    `;
}

function showToast(msg) {
    let t = document.getElementById('app-toast');
    if (!t) {
        t = document.createElement('div');
        t.id = 'app-toast';
        t.className = 'toast';
        document.body.appendChild(t);
    }
    t.innerText = msg;
    t.classList.add('visible');
    setTimeout(() => t.classList.remove('visible'), 3000);
}

// Close menus when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.card-menu-btn')) {
        document.querySelectorAll('.card-menu-dropdown').forEach(d => d.classList.remove('active'));
    }
});

