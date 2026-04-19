// ========== ПЕРЕВОДЫ ==========
const translations = {
    ru: {
        shopTitle: "Магазин",
        inventoryTitle: "Инвентарь",
        settingsTitle: "Настройки",
        resetBtnText: "🔄 Сбросить весь прогресс",
        chancesTitle: "Шансы выпадения",
        languageModalTitle: "Выберите язык",
        free: "БЕСПЛАТНО",
        sell: "Продать",
        sellLabel: "продажа",
        emptyInventory: "🧸 Инвентарь пуст. Открой кейс!",
        searchPlaceholder: "🔍 Поиск...",
        filterTitle: "Сортировка инвентаря",
        filterPriceDesc: "💰 От дорогих к дешёвым",
        filterPriceAsc: "💰 От дешёвых к дорогим",
        notEnoughCoins: "❌ Не хватает монет! Нужно {price}",
        waitAnimation: "⏳ Подожди, анимация открытия!",
        resetConfirm: "Сбросить весь прогресс? Все предметы и монеты исчезнут. Останется 500 монет.",
        resetDone: "✨ Прогресс сброшен. Начинай заново!",
        resetLimit: "❌ Лимит сбросов на сегодня (5/5). Завтра новый лимит.",
        dailyLimit: "📅 Вы уже открыли ежедневный ящик сегодня! Завтра будет новый.",
        freeCase: "Подарок",
        woodenCase: "Деревянный ящик",
        ironChest: "Железный сундук",
        goldenCrate: "Золотой контейнер",
        rarity: { common: "Обычный", rare: "Редкий", epic: "Эпический", legendary: "Легендарный", exotic: "Экзотический" }
    },
    en: {
        shopTitle: "Shop",
        inventoryTitle: "Inventory",
        settingsTitle: "Settings",
        resetBtnText: "🔄 Reset all progress",
        chancesTitle: "Drop chances",
        languageModalTitle: "Select language",
        free: "FREE",
        sell: "Sell",
        sellLabel: "sell price",
        emptyInventory: "🧸 Inventory is empty. Open a case!",
        searchPlaceholder: "🔍 Search...",
        filterTitle: "Sort inventory",
        filterPriceDesc: "💰 Most expensive first",
        filterPriceAsc: "💰 Cheapest first",
        notEnoughCoins: "❌ Not enough coins! Need {price}",
        waitAnimation: "⏳ Wait, opening animation!",
        resetConfirm: "Reset all progress? All items and coins will disappear. You'll have 500 coins.",
        resetDone: "✨ Progress reset. Start over!",
        resetLimit: "❌ Reset limit for today (5/5). Try tomorrow.",
        dailyLimit: "📅 You've already opened the daily crate today! Come back tomorrow.",
        freeCase: "Present",
        woodenCase: "Wooden Case",
        ironChest: "Iron Chest",
        goldenCrate: "Golden Crate",
        rarity: { common: "Common", rare: "Rare", epic: "Epic", legendary: "Legendary", exotic: "Exotic" }
    }
};

let currentLang = 'ru';
let currentSort = 'price-desc';
let searchQuery = '';

// ========== БАЗА ПРЕДМЕТОВ ==========
const itemsDB = [
    { id: 1, nameRu: "Паутина", nameEn: "Spider Web", rarity: "common", sell_price: 5, emoji: "🕸️" },
    { id: 2, nameRu: "Скрепка", nameEn: "Paperclip", rarity: "common", sell_price: 10, emoji: "📎" },
    { id: 3, nameRu: "Кирпичи", nameEn: "Bricks", rarity: "common", sell_price: 15, emoji: "🧱" },
    { id: 4, nameRu: "Перец", nameEn: "Pepper", rarity: "common", sell_price: 25, emoji: "🌶️" },
    { id: 5, nameRu: "Рыба", nameEn: "Fish", rarity: "common", sell_price: 55, emoji: "🐟" },
    { id: 6, nameRu: "Шестерня", nameEn: "Gear", rarity: "rare", sell_price: 100, emoji: "⚙️" },
    { id: 7, nameRu: "Рюкзак", nameEn: "Backpack", rarity: "rare", sell_price: 180, emoji: "🎒" },
    { id: 8, nameRu: "Плюшевый Мишка", nameEn: "Teddy Bear", rarity: "rare", sell_price: 250, emoji: "🧸" },
    { id: 9, nameRu: "Пряжа", nameEn: "Yarn", rarity: "epic", sell_price: 350, emoji: "🧶" },
    { id: 10, nameRu: "Солнечные Очки", nameEn: "Sunglasses", rarity: "epic", sell_price: 450, emoji: "🕶️" },
    { id: 11, nameRu: "Огонь", nameEn: "Fire", rarity: "epic", sell_price: 666, emoji: "🔥" },
    { id: 12, nameRu: "Доллар", nameEn: "Dollar", rarity: "epic", sell_price: 800, emoji: "💸" },
    { id: 13, nameRu: "Часы", nameEn: "Watch", rarity: "epic", sell_price: 1250, emoji: "🕒" },
    { id: 14, nameRu: "Флаг", nameEn: "Flag", rarity: "legendary", sell_price: 1750, emoji: "🏳️" },
    { id: 15, nameRu: "Бриллиант", nameEn: "Brilliant", rarity: "legendary", sell_price: 2000, emoji: "💎️" },
    { id: 16, nameRu: "Стул", nameEn: "Chair", rarity: "legendary", sell_price: 2500, emoji: "🪑" },
    { id: 17, nameRu: "Самолёт", nameEn: "Airplane", rarity: "legendary", sell_price: 3000, emoji: "✈️" },
    { id: 18, nameRu: "Унитаз", nameEn: "Toilet", rarity: "legendary", sell_price: 5000, emoji: "🚽" },
    { id: 19, nameRu: "Череп", nameEn: "Skull", rarity: "legendary", sell_price: 10000, emoji: "💀" },
    { id: 20, nameRu: "Млечный Путь", nameEn: "Milky Way", rarity: "exotic", sell_price: 100000, emoji: "🌌" },
];

// ========== КЕЙСЫ ==========
const casesDB = [
    { 
        id: 1001,
        nameRu: "Ежедневный Ящик",
        nameEn: "Daily Crate",
        price: 0, 
        type: "daily",
        items: [
            { itemId: 8, percent: 30 },
            { itemId: 9, percent: 25 },
            { itemId: 10, percent: 20 },
            { itemId: 11, percent: 15 },
            { itemId: 12, percent: 8 },
            { itemId: 14, percent: 2 }
        ]
    },
    { 
        id: 1002,
        nameRu: "Подарок",
        nameEn: "Present",
        price: 0, 
        type: "free",
        items: [
            { itemId: 1, percent: 35 },
            { itemId: 2, percent: 35 },
            { itemId: 3, percent: 20 },
            { itemId: 5, percent: 8 },
            { itemId: 6, percent: 2 }
        ]
    },
    { 
        id: 1003,
        nameRu: "Деревянный Ящик",
        nameEn: "Wooden Crate",
        price: 100, 
        type: "paid",
        items: [
            { itemId: 4, percent: 30 },
            { itemId: 5, percent: 25 },
            { itemId: 6, percent: 20 },
            { itemId: 7, percent: 15 },
            { itemId: 8, percent: 10 },
            { itemId: 9, percent: 7 }
        ]
    },
    { 
        id: 1004,
        nameRu: "Железный Ящик",
        nameEn: "Iron Crate",
        price: 350, 
        type: "paid",
        items: [
            { itemId: 6, percent: 25 },
            { itemId: 7, percent: 20 },
            { itemId: 8, percent: 15 },
            { itemId: 9, percent: 15 },
            { itemId: 10, percent: 15 },
            { itemId: 11, percent: 15 }
        ]
    },
    { 
        id: 1005,
        nameRu: "Золотой Ящик",
        nameEn: "Golden Crate",
        price: 650, 
        type: "paid",
        items: [
            { itemId: 9, percent: 30 },
            { itemId: 11, percent: 20 },
            { itemId: 12, percent: 15 },
            { itemId: 13, percent: 10 },
            { itemId: 14, percent: 3 }
        ]
    },
    { 
        id: 1006,
        nameRu: "Алмазный Ящик",
        nameEn: "Diamond Crate",
        price: 1550, 
        type: "paid",
        items: [
            { itemId: 12, percent: 30 },
            { itemId: 13, percent: 20 },
            { itemId: 14, percent: 15 },
            { itemId: 15, percent: 5 },
            { itemId: 16, percent: 4 }
        ]
    },
    { 
        id: 1007,
        nameRu: "Платиновый Ящик",
        nameEn: "Platinum Crate",
        price: 2550, 
        type: "paid",
        items: [
            { itemId: 14, percent: 30 },
            { itemId: 15, percent: 20 },
            { itemId: 16, percent: 15 },
            { itemId: 17, percent: 5 },
            { itemId: 18, percent: 4 }
        ]
    },
    { 
        id: 1008,
        nameRu: "Мемный Ящик",
        nameEn: "Meme Crate",
        price: 1337, 
        type: "paid",
        items: [
            { itemId: 11, percent: 35 },
            { itemId: 16, percent: 17 },
            { itemId: 18, percent: 3 }
        ]
    },
    { 
        id: 1009,
        nameRu: "Королевский Ящик",
        nameEn: "Royal Crate",
        price: 4000, 
        type: "paid",
        items: [
            { itemId: 1, percent: 1 },
            { itemId: 2, percent: 1 },
            { itemId: 3, percent: 1 },
            { itemId: 4, percent: 1 },
            { itemId: 5, percent: 1 },
            { itemId: 6, percent: 1 },
            { itemId: 7, percent: 1 },
            { itemId: 8, percent: 1 },
            { itemId: 9, percent: 1 },
            { itemId: 10, percent: 1 },
            { itemId: 11, percent: 1 },
            { itemId: 12, percent: 1 },
            { itemId: 13, percent: 1 },
            { itemId: 14, percent: 1 },
            { itemId: 15, percent: 1 },
            { itemId: 16, percent: 1 },
            { itemId: 17, percent: 1 },
            { itemId: 18, percent: 1 },
            { itemId: 19, percent: 1 },
            { itemId: 20, percent: 0.1 }
        ]
    },
    { 
        id: 1010,
        nameRu: "Ящик 'Всё или Ничего'",
        nameEn: "Crate 'All or Nothing'",
        price: 5000, 
        type: "paid",
        items: [
            { itemId: 1, percent: 98 },
            { itemId: 20, percent: 2 }
        ]
    }
];

// ========== СОСТОЯНИЕ ==========
let gameData = { coins: 500, inventory: [], lockedItems: [] };
let resetCount = 0;
let lastResetDate = "";
let lastDailyOpen = "";
let isOpening = false;

const saved = localStorage.getItem('boxGame');
if (saved) {
    try {
        const parsed = JSON.parse(saved);
        if (parsed.coins !== undefined) gameData.coins = parsed.coins;
        if (parsed.inventory) gameData.inventory = parsed.inventory;
        if (parsed.lockedItems) gameData.lockedItems = parsed.lockedItems;
        if (parsed.resetCount !== undefined) resetCount = parsed.resetCount;
        if (parsed.lastResetDate) lastResetDate = parsed.lastResetDate;
        if (parsed.lastDailyOpen !== undefined) lastDailyOpen = parsed.lastDailyOpen;
        if (parsed.lang) currentLang = parsed.lang;
        if (parsed.currentSort) currentSort = parsed.currentSort;
        if (parsed.searchQuery !== undefined) searchQuery = parsed.searchQuery;
    } catch(e) {}
}

function saveMiscData() {
    const full = { 
        coins: gameData.coins, 
        inventory: gameData.inventory, 
        lockedItems: gameData.lockedItems,
        resetCount, 
        lastResetDate,
        lastDailyOpen,
        lang: currentLang,
        currentSort,
        searchQuery
    };
    localStorage.setItem('boxGame', JSON.stringify(full));
}
function saveAndUpdate() {
    saveMiscData();
    updateUI();
}

function t(key, params = {}) {
    let text = translations[currentLang][key] || key;
    for (let [k, v] of Object.entries(params)) {
        text = text.replace(`{${k}}`, v);
    }
    return text;
}

function getItemName(item) {
    return currentLang === 'ru' ? item.nameRu : item.nameEn;
}

function getCaseName(caseItem) {
    return currentLang === 'ru' ? caseItem.nameRu : caseItem.nameEn;
}

function getRarityName(rarityKey) {
    return t(`rarity.${rarityKey}`);
}

function getRandomItemFromCase(caseItem) {
    const pool = caseItem.items;
    if (!pool || pool.length === 0) return itemsDB[0];
    
    let totalPercent = pool.reduce((sum, i) => sum + i.percent, 0);
    let random = Math.random() * totalPercent;
    let accum = 0;
    
    for (let entry of pool) {
        accum += entry.percent;
        if (random <= accum) {
            const found = itemsDB.find(i => i.id === entry.itemId);
            return found || itemsDB[0];
        }
    }
    return itemsDB[0];
}

function showChancesModal(caseItem) {
    if (!caseItem.items) return;
    
    let totalPercent = caseItem.items.reduce((sum, i) => sum + i.percent, 0);
    let chances = [];
    
    for (let entry of caseItem.items) {
        const item = itemsDB.find(i => i.id === entry.itemId);
        if (item) {
            let percent = (entry.percent / totalPercent * 100).toFixed(1);
            chances.push({
                name: getItemName(item),
                percent: parseFloat(percent),
                percentStr: percent,
                sell_price: item.sell_price,
                rarity: item.rarity
            });
        }
    }
    chances.sort((a, b) => b.percent - a.percent);
    
    const modal = document.getElementById('chancesModal');
    const title = document.getElementById('chancesTitle');
    const listDiv = document.getElementById('chancesList');
    title.textContent = t('chancesTitle') + `: ${getCaseName(caseItem)}`;
    listDiv.innerHTML = '';
    
    for (let ch of chances) {
        let rarityColor;
        if (ch.rarity === 'exotic') {
            rarityColor = 'rainbow';
        } else {
            rarityColor = {
                common: '#9e9e9e',
                rare: '#2196f3',
                epic: '#9c27b0',
                legendary: '#ff9800'
            }[ch.rarity] || '#aaa';
        }
        const div = document.createElement('div');
        div.className = 'chance-item';
        if (rarityColor === 'rainbow') {
            div.classList.add('rainbow-border');
        } else {
            div.style.borderLeftColor = rarityColor;
        }
        div.innerHTML = `
            <span class="chance-name">${ch.name}</span>
            <span class="chance-percent">${ch.percentStr}% (${ch.sell_price}💰)</span>
        `;
        listDiv.appendChild(div);
    }
    modal.style.display = 'block';
}

async function openCaseWithAnimation(caseItem, cardElement) {
    if (isOpening) return;
    
    if (caseItem.type === "daily") {
        const today = new Date().toDateString();
        if (lastDailyOpen === today) {
            alert(t('dailyLimit'));
            return;
        }
        lastDailyOpen = today;
        saveMiscData();
    }
    
    if (caseItem.type !== "free" && caseItem.type !== "daily" && gameData.coins < caseItem.price) return;

    isOpening = true;
    if (cardElement) cardElement.classList.add('opening');
    await new Promise(r => setTimeout(r, 600));

    if (caseItem.type !== "free" && caseItem.type !== "daily") {
        gameData.coins -= caseItem.price;
    }

    const wonItem = getRandomItemFromCase(caseItem);
    gameData.inventory.push(wonItem.id);
    saveAndUpdate();

    if (cardElement) cardElement.classList.remove('opening');
    isOpening = false;
}

function renderCases() {
    const container = document.getElementById('casesShop');
    if (!container) return;
    container.innerHTML = '';
    for (let c of casesDB) {
        const card = document.createElement('div');
        card.className = `case-card ${c.type === 'free' || c.type === 'daily' ? 'free-case' : ''}`;
        card.style.position = 'relative';
        card.style.display = 'flex';
        card.style.flexDirection = 'column';
        card.style.justifyContent = 'space-between';
        card.style.minHeight = '220px';
        
        const infoBtn = document.createElement('div');
        infoBtn.className = 'info-icon';
        infoBtn.textContent = '?';
        infoBtn.onclick = (e) => {
            e.stopPropagation();
            showChancesModal(c);
        };
        
        const emoji = c.type === 'free' ? '🎁' : (c.type === 'daily' ? '📅' : '📦');
        
        const topDiv = document.createElement('div');
        topDiv.style.flex = '1';
        topDiv.innerHTML = `<div style="font-size: 64px;">${emoji}</div><div class="case-name">${getCaseName(c)}</div>`;
        
        let priceHtml;
        if (c.price === 0) {
            priceHtml = `<div class="case-price" style="margin-top: auto;">🎁 0</div>`;
        } else {
            priceHtml = `<div class="case-price" style="margin-top: auto;">💰 ${c.price}</div>`;
        }
        
        const priceDiv = document.createElement('div');
        priceDiv.innerHTML = priceHtml;
        
        card.appendChild(infoBtn);
        card.appendChild(topDiv);
        card.appendChild(priceDiv);
        card.onclick = () => openCaseWithAnimation(c, card);
        container.appendChild(card);
    }
}

function getEmojiForItem(item) {
    return item.emoji || "🎁";
}

function toggleLock(itemId) {
    const index = gameData.lockedItems.indexOf(itemId);
    if (index === -1) {
        gameData.lockedItems.push(itemId);
    } else {
        gameData.lockedItems.splice(index, 1);
    }
    saveAndUpdate();
}

function getFilteredAndSortedInventory() {
    const counts = {};
    for (let id of gameData.inventory) counts[id] = (counts[id] || 0) + 1;
    
    let items = [];
    for (let [id, count] of Object.entries(counts)) {
        const item = itemsDB.find(i => i.id == id);
        if (!item) continue;
        items.push({
            id: item.id,
            name: getItemName(item),
            sell_price: item.sell_price,
            rarity: item.rarity,
            count: count,
            itemObj: item
        });
    }
    
    if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        items = items.filter(i => i.name.toLowerCase().includes(query));
    }
    
    if (currentSort === 'price-desc') {
        items.sort((a, b) => b.sell_price - a.sell_price);
    } else if (currentSort === 'price-asc') {
        items.sort((a, b) => a.sell_price - b.sell_price);
    }
    
    return items;
}

function renderInventory() {
    const container = document.getElementById('inventoryList');
    if (!container) return;
    container.innerHTML = '';
    
    const filteredItems = getFilteredAndSortedInventory();
    
    if (filteredItems.length === 0) {
        container.innerHTML = `<div style="padding: 20px; text-align:center; color: gray; width:100%;">${t('emptyInventory')}</div>`;
        return;
    }
    
    for (let entry of filteredItems) {
        const item = entry.itemObj;
        const count = entry.count;
        const isLocked = gameData.lockedItems.includes(item.id);
        const card = document.createElement('div');
        card.className = `item-card rarity-${item.rarity}`;
        if (item.rarity === 'exotic') {
            card.classList.add('exotic-card');
        }
        card.style.position = 'relative';
        
        const lockIcon = document.createElement('div');
        lockIcon.className = `lock-icon ${isLocked ? 'locked' : 'unlocked'}`;
        lockIcon.textContent = isLocked ? '🔒' : '🔓';
        lockIcon.onclick = (e) => {
            e.stopPropagation();
            toggleLock(item.id);
        };
        
        const sellBtn = document.createElement('button');
        sellBtn.className = 'sell-btn';
        if (isLocked) sellBtn.classList.add('disabled');
        sellBtn.textContent = t('sell');
        sellBtn.onclick = (e) => {
            e.stopPropagation();
            if (!isLocked) {
                sellItem(item.id);
            }
        };
        
        card.innerHTML = `
            <div class="item-emoji">${getEmojiForItem(item)}</div>
            <div class="item-name"><strong>${getItemName(item)}</strong></div>
            <div class="item-count">✖️ ${count}</div>
            <div class="item-price">💰 ${t('sellLabel')}: ${item.sell_price}</div>
        `;
        card.appendChild(lockIcon);
        card.appendChild(sellBtn);
        container.appendChild(card);
    }
}

function sellItem(itemId) {
    const index = gameData.inventory.lastIndexOf(itemId);
    if (index === -1) return;
    const item = itemsDB.find(i => i.id === itemId);
    if (!item) return;
    gameData.inventory.splice(index, 1);
    gameData.coins += item.sell_price;
    saveAndUpdate();
}

function updateUI() {
    document.getElementById('coinDisplay').innerText = gameData.coins;
    document.getElementById('shopTitle').innerText = t('shopTitle');
    document.getElementById('inventoryTitle').innerText = t('inventoryTitle');
    document.getElementById('settingsTitle').innerText = t('settingsTitle');
    document.getElementById('resetBtnText').innerHTML = t('resetBtnText');
    document.getElementById('languageModalTitle').innerText = t('languageModalTitle');
    document.getElementById('filterTitle').innerText = t('filterTitle');
    
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.placeholder = t('searchPlaceholder');
        if (searchInput.value !== searchQuery) {
            searchInput.value = searchQuery;
        }
    }
    
    const langBtn = document.getElementById('languageBtn');
    langBtn.textContent = currentLang === 'ru' ? '🇷🇺' : '🇺🇸';
    
    renderCases();
    renderInventory();
    
    const resetBtnModal = document.getElementById('resetBtnModal');
    if (resetBtnModal) {
        resetBtnModal.disabled = !canResetToday();
        resetBtnModal.title = canResetToday() ? `Осталось сбросов: ${5 - resetCount}` : `Лимит на сегодня (5/5)`;
    }
}

function canResetToday() {
    const today = new Date().toDateString();
    if (lastResetDate !== today) {
        resetCount = 0;
        lastResetDate = today;
        saveMiscData();
        return true;
    }
    return resetCount < 5;
}

function resetGame() {
    if (!canResetToday()) {
        alert(t('resetLimit'));
        return false;
    }
    if (confirm(t('resetConfirm'))) {
        gameData = { coins: 500, inventory: [], lockedItems: [] };
        resetCount++;
        lastDailyOpen = "";
        saveMiscData();
        updateUI();
        return true;
    }
    return false;
}

function openSettingsModal() {
    document.getElementById('settingsModal').style.display = 'block';
}
function closeSettingsModal() {
    document.getElementById('settingsModal').style.display = 'none';
}
function closeChancesModal() {
    document.getElementById('chancesModal').style.display = 'none';
}
function closeLanguageModal() {
    document.getElementById('languageModal').style.display = 'none';
}
function openLanguageModal() {
    document.getElementById('languageModal').style.display = 'block';
}
function openFilterModal() {
    document.getElementById('filterModal').style.display = 'block';
}
function closeFilterModal() {
    document.getElementById('filterModal').style.display = 'none';
}
function setLanguage(lang) {
    currentLang = lang;
    saveMiscData();
    updateUI();
    closeLanguageModal();
}
function setSort(sortType) {
    currentSort = sortType;
    saveMiscData();
    renderInventory();
    closeFilterModal();
}

// ========== ЗАЩИТА ОТ КОНСОЛИ ==========
// Замораживаем массивы (но не глубоко, чтобы не ломать игру)
Object.freeze(itemsDB);
Object.freeze(casesDB);

// Скрываем gameData от консоли
Object.defineProperty(window, 'gameData', {
    get: function() { return null; },
    set: function() { console.warn('%c❌ Доступ к gameData запрещён!', 'color: #ff0000;'); }
});

// Защита от изменения localStorage через консоль (облегчённая версия)
const originalSetItem = localStorage.setItem;
localStorage.setItem = function(key, value) {
    const stack = new Error().stack;
    if (stack && stack.includes('console')) {
        console.warn('%c❌ Изменение сохранения через консоль заблокировано!', 'color: #ff0000;');
        return;
    }
    originalSetItem.call(localStorage, key, value);
};

console.log('%c🔒 Защита активирована! Попытки читерства через консоль будут блокироваться.', 'color: #00ff00; font-size: 14px; font-weight: bold;');

document.addEventListener('DOMContentLoaded', () => {
    updateUI();
    
    document.getElementById('settingsBtn').onclick = openSettingsModal;
    document.getElementById('closeSettings').onclick = closeSettingsModal;
    document.getElementById('closeChances').onclick = closeChancesModal;
    document.getElementById('languageBtn').onclick = openLanguageModal;
    document.getElementById('closeLanguage').onclick = closeLanguageModal;
    document.getElementById('filterBtn').onclick = openFilterModal;
    document.getElementById('closeFilter').onclick = closeFilterModal;
    
    const searchInput = document.getElementById('searchInput');
    let searchTimeout;
    searchInput.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            searchQuery = e.target.value;
            saveMiscData();
            renderInventory();
        }, 300);
    });
    
    window.onclick = (e) => {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
        }
    };
    
    document.getElementById('resetBtnModal').onclick = () => resetGame();
    
    document.querySelectorAll('.lang-option').forEach(btn => {
        btn.onclick = () => setLanguage(btn.dataset.lang);
    });
    
    document.querySelectorAll('.filter-option').forEach(btn => {
        btn.onclick = () => setSort(btn.dataset.sort);
    });
});
