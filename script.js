// --- РОБОТА З ФУНКЦІЯМИ (Лабораторна 6) ---

function showDeveloperInfo(lastName, firstName, role = "Головний шеф-розробник") {
    alert(`Розробник сторінки:\n${lastName} ${firstName}\nПосада: ${role}`);
}

function compareDishes(dish1, dish2) {
    if (dish1.length > dish2.length) {
        alert(`Назва "${dish1}" довша за "${dish2}"`);
    } else if (dish2.length > dish1.length) {
        alert(`Назва "${dish2}" довша за "${dish1}"`);
    } else {
        alert("Назви однакової довжини");
    }
}

function planMenu() {
    let daysInput = prompt("На скільки днів ви хочете скласти меню?", "3");
    let days = parseInt(daysInput);

    if (isNaN(days) || days <= 0) {
        alert("Будь ласка, введіть коректну кількість днів (число).");
        return;
    }

    let schedule = "Ваш план харчування:\n";
    for (let i = 1; i <= days; i++) {
        schedule += `День ${i}: Традиційна страва дня\n`;
    }
    alert(schedule);
}

// --- РОБОТА З DOM ТА ТАЙМЕРАМИ (Лабораторна 6) ---

function nightMode() {
    const originalBg = document.body.style.backgroundColor;
    const originalColor = document.body.style.color;
    
    document.body.style.backgroundColor = "#2c1e12"; 
    document.body.style.color = "#fdf5e6";

    const blocks = document.querySelectorAll(".content-section");
    blocks.forEach(block => {
        block.style.backgroundColor = "#3d2b1f";
        block.style.color = "#fff";
    });

    alert("Увімкнено нічний режим на 30 секунд");

    setTimeout(() => {
        document.body.style.backgroundColor = originalBg;
        document.body.style.color = originalColor;
        blocks.forEach(block => {
            block.style.backgroundColor = "#ffffff";
            block.style.color = "#4a2c2a";
        });
    }, 30000);
}

function orderIngredients() {
    if (confirm("Бажаєте перейти на сайт для замовлення фермерських продуктів?")) {
        location.href = "https://silpo.ua";
    }
}

function updateKitchenInventory() {
    let mainRecipe = document.getElementById("main-recipe"); 
    let ingredients = document.querySelector(".ingredients-list");
    let noteSection = document.getElementById("kitchen-note");

    // Вивід у консоль (Крок 2 лаби 6)
    console.log("innerHTML рецепта:", mainRecipe.innerHTML);
    if (noteSection.childNodes[0]) {
        console.log("nodeValue примітки:", noteSection.childNodes[0].nodeValue);
    }

    // Маніпуляції (Крок 4 лаби 6)
    mainRecipe.textContent = "Сьогодні готуємо: Святковий козацький борщ!";
    mainRecipe.style.color = "#8b4513";
    mainRecipe.style.fontWeight = "bold";

    let spice = document.createElement("li");
    spice.textContent = "Таємна суміш спецій";
    spice.style.color = "#d2691e";
    ingredients.append(spice);

    let water = document.createElement("li");
    water.textContent = "Джерельна вода (3 літри)";
    water.style.color = "#2980b9";
    ingredients.prepend(water);

    let oldTool = document.getElementById("old-utensil");
    if (oldTool) {
        let newTool = document.createElement("span");
        newTool.textContent = " Сучасний блендер ";
        newTool.style.backgroundColor = "#fff9c4";
        oldTool.replaceWith(newTool);
    }

    let saltOverload = document.getElementById("extra-salt");
    if (saltOverload) saltOverload.remove();
}

// --- ОБРОБНИКИ ПОДІЙ (Лабораторна 7) ---

function mouseOverAction() {
    console.log("Подія миші спрацювала!");
    document.getElementById("main-recipe").style.textShadow = "2px 2px 5px #8b4513";
}

// Об'єкт-обробник (Завдання 1.3)
let chefManager = {
    handleEvent(event) {
        alert("Обробник-об'єкт спрацював на тегу: " + event.currentTarget.tagName);
    }
};

// Функції для addEventListener
function handler1() { alert("Починаємо приготування!"); }
function handler2() { console.log("Кнопку натиснуто: обробник 2 зафіксовано."); }

// Делегація: Меню дій (Завдання 2.2)
const menuActions = {
    save() { alert("Рецепт збережено у вибране!"); },
    print() { window.print(); },
    share() { alert("Посилання скопійовано!"); }
};

// Призначення подій після завантаження DOM
document.addEventListener("DOMContentLoaded", () => {
    
    // addEventListener (Завдання 1.2)
    const startBtn = document.getElementById("start-cooking-btn");
    if (startBtn) {
        startBtn.addEventListener("click", handler1);
        startBtn.addEventListener("click", handler2);

        // Видалення через 10 сек (Завдання 1.4)
        setTimeout(() => {
            startBtn.removeEventListener("click", handler1);
            console.log("Перший обробник видалено");
        }, 10000);
    }

    // Об'єкт-обробник (Завдання 1.3)
    const infoBox = document.querySelector(".important-note");
    if (infoBox) {
        infoBox.addEventListener("click", chefManager);
    }

    // Делегація для списку (Завдання 2.1)
    const ingredientsList = document.querySelector(".ingredients-list");
    if (ingredientsList) {
        ingredientsList.onclick = function(event) {
            if (event.target.tagName !== 'LI') return;
            let allItems = ingredientsList.querySelectorAll("li");
            allItems.forEach(li => li.style.backgroundColor = "transparent");
            event.target.style.backgroundColor = "#fff9c4";
        };
    }

    // Делегація для меню (Завдання 2.2)
    const actionMenu = document.getElementById("action-menu");
    if (actionMenu) {
        actionMenu.onclick = function(event) {
            let action = event.target.dataset.action;
            if (action && menuActions[action]) {
                menuActions[action]();
            }
        };
    }
});

// ПАТЕРН "ПОВЕДІНКА" (Завдання 2.3)
document.addEventListener('click', function(event) {
    // Перемикач видимості
    let toggleId = event.target.dataset.toggleId;
    if (toggleId) {
        let elem = document.getElementById(toggleId);
        if (elem) elem.hidden = !elem.hidden;
    }

    // Лічильник вподобань
    if (event.target.dataset.counter !== undefined) {
        let span = event.target.querySelector('span');
        if (span) span.innerHTML = parseInt(span.innerHTML) + 1;
    }
});