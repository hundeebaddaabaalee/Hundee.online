// Function Sidebar Banuu (Open)
function openSidebar() {
    const sidebar = document.getElementById('mainSidebar');
    const overlay = document.getElementById('sidebarOverlay');
    if (sidebar) sidebar.classList.add('active');
    if (overlay) overlay.classList.add('active');
}

// Function Sidebar Cufuu (Close)
function closeSidebar() {
    const sidebar = document.getElementById('mainSidebar');
    const overlay = document.getElementById('sidebarOverlay');
    if (sidebar) sidebar.classList.remove('active');
    if (overlay) overlay.classList.remove('active');
}

// Function Barbaacha Qabiyyee (Search Content)
function searchContent(query = "") {
    const input = query.toLowerCase().trim();

    // Input Box-oota lamaan sinkronize gochuu
    const topSearch = document.getElementById('topSearchInput');
    const sidebarSearch = document.getElementById('sidebarSearchInput');
    if (topSearch && topSearch.value !== query) topSearch.value = query;
    if (sidebarSearch && sidebarSearch.value !== query) sidebarSearch.value = query;

    // Card-iiwwan hunda qorachuu (Fuula haaraa wajjin kan wal-simu)
    const cards = document.querySelectorAll('.cards-grid .card, .content-section article, .search-item');
    let hasResults = false;

    cards.forEach(card => {
        const text = card.textContent.toLowerCase();
        if (input === "" || text.includes(input)) {
            card.style.display = "";
            hasResults = true;
        } else {
            card.style.display = "none";
        }
    });

    // Ergaa "Wanti barbaadame hin argamne"
    let noResultEl = document.getElementById('noResultsMessage');
    if (!noResultEl) {
        noResultEl = document.createElement('div');
        noResultEl.id = 'noResultsMessage';
        noResultEl.style.cssText = 'text-align: center; padding: 40px; font-size: 1.2rem; color: #64748b; font-weight: bold;';
        const mainContent = document.querySelector('main');
        if (mainContent) mainContent.appendChild(noResultEl);
    }

    if (!hasResults && input !== "") {
        noResultEl.innerHTML = '<i class="fa-solid fa-magnifying-glass-minus"></i> Qabiyyeen akka "<i>' + input + '</i>" jedhuun wal-qabatu hin argamne.';
        noResultEl.style.display = "block";
    } else {
        noResultEl.style.display = "none";
    }
}

function triggerSearch() {
    const topSearch = document.getElementById('topSearchInput');
    if (topSearch) searchContent(topSearch.value);
}

// Event Listeners Initialization (Live Search, Security, APK Feedback & Netlify Badge Removal)
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Live Search Input Box-oota Irratti
    const topSearch = document.getElementById('topSearchInput');
    const sidebarSearch = document.getElementById('sidebarSearchInput');

    if (topSearch) {
        topSearch.addEventListener('input', (e) => searchContent(e.target.value));
    }
    if (sidebarSearch) {
        sidebarSearch.addEventListener('input', (e) => searchContent(e.target.value));
    }

    // 2. Right-click & Copying Dhorkuu
    document.addEventListener('contextmenu', (e) => e.preventDefault());
    document.addEventListener('copy', (e) => e.preventDefault());

    // 3. Keyboard Shortcuts (Windows & Mac) Dhorkuu
    document.addEventListener('keydown', (e) => {
        const key = e.key.toLowerCase();
        const isCtrlOrCmd = e.ctrlKey || e.metaKey; // Mac (Cmd) fi Windows (Ctrl)
        
        if (
            (isCtrlOrCmd && (key === 'c' || key === 'u' || key === 's')) || 
            (isCtrlOrCmd && e.shiftKey && key === 'i') || 
            e.key === 'F12'
        ) {
            e.preventDefault();
        }
    });

    // 4. Function tracking & feedback for APK Download Button
    const downloadBtn = document.querySelector('a[download]');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', (e) => {
            const originalText = downloadBtn.innerHTML;
            downloadBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Buufatamaa jira...`;
            
            setTimeout(() => {
                downloadBtn.innerHTML = originalText;
            }, 3000);
        });
    }

    // 5. Netlify Watermark / Badge Guutummaatti Haqquu (Dynamic Removal)
    const removeNetlifyBadge = () => {
        // Elementoota Netlify badge ykn iframe qaban hunda barbadeessuu
        const badges = document.querySelectorAll('iframe[src*="netlify"], #netlify-badge, .netlify-badge, a[href*="netlify.com/wt"], div[style*="z-index: 2147483647"]');
        badges.forEach(b => {
            let parent = b.parentElement;
            if (parent && (parent.tagName === 'DIV' || parent.tagName === 'P')) {
                parent.remove();
            } else {
                b.remove();
            }
        });
    };

    removeNetlifyBadge();
    setTimeout(removeNetlifyBadge, 500);
    setTimeout(removeNetlifyBadge, 1500);
});
