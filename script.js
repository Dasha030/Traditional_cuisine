// --- ЗАВДАННЯ 1: Функції та логіка ---

// Інформація про розробника з параметром за замовчуванням
function showDeveloperInfo(lastName, firstName, role = "Головний шеф-розробник") {
    alert(`Розробник сторінки:\n${lastName} ${firstName}\nПосада: ${role}`);
}

// Порівняння назв страв (порівняння рядків)
function compareDishes(dish1, dish2) {
    if (dish1.length > dish2.length) {
        alert(`Назва "${dish1}" довша за "${dish2}"`);
    } else if (dish2.length > dish1.length) {
        alert(`Назва "${dish2}" довша за "${dish1}"`);
    } else {
        alert("Назви однакової довжини");
    }
}

// Планування меню (Діалог з циклом та перевіркою)
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

// --- ЗАВДАННЯ 2: DOM, Таймери та Локація ---

// Зміна теми на 30 секунд (Нічний режим)
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

// Перенаправлення (наприклад, на доставку продуктів або рецепти)
function orderIngredients() {
    if (confirm("Бажаєте перейти на сайт для замовлення фермерських продуктів?")) {
        location.href = "https://silpo.ua"; // Або будь-який інший лінк
    }
}

// Функція для вставки елементів через DOM (createElement / prepend)
function addNewNote() {
    const newDiv = document.createElement("div");
    newDiv.className = "js-note";
    newDiv.style.padding = "10px";
    newDiv.style.backgroundColor = "#fff9c4";
    
    const text = document.createTextNode("Сьогодні діє знижка на всі рецепти випічки!");
    newDiv.append(text);
    
    const container = document.querySelector(".content-section");
    container.prepend(newDiv);
}

function updateKitchenInventory() {
    // 1. Використання getElementById та querySelectorAll
    // (Припустимо, у вас в HTML є блоки з такими id та класами)
    let mainRecipe = document.getElementById("main-recipe"); 
    let ingredients = document.querySelectorAll(".ingredients-list li");
    let noteSection = document.getElementById("kitchen-note");

    // 2. Демонстрація властивостей DOM-вузла у консолі
    console.log("innerHTML головного рецепта:", mainRecipe.innerHTML);
    console.log("outerHTML головного рецепта:", mainRecipe.outerHTML);
    // Беремо значення текстового вузла
    if (noteSection.childNodes[0]) {
        console.log("nodeValue примітки:", noteSection.childNodes[0].nodeValue);
    }

    // 3. Зміна тексту через textContent
    mainRecipe.textContent = "Сьогодні готуємо: Святковий козацький борщ!";
    mainRecipe.style.color = "#8b4513"; // Ваш коричневий колір
    mainRecipe.style.fontWeight = "bold";

    // 4. Створення елементів та вставка через append (в кінець списку)
    let spice = document.createElement("li");
    let spiceText = document.createTextNode("Таємна суміш спецій");
    spice.append(spiceText);
    spice.style.color = "#d2691e";
    document.querySelector(".ingredients-list").append(spice);

    // 5. Вставка через prepend (на початок списку)
    let water = document.createElement("li");
    water.textContent = "Джерельна вода (3 літри)";
    water.style.color = "#2980b9";
    document.querySelector(".ingredients-list").prepend(water);

    // 6. Вставка через after (одразу після елемента)
    let safetyNote = document.createElement("p");
    safetyNote.textContent = "Обережно з гострим ножем!";
    safetyNote.style.color = "red";
    safetyNote.style.fontSize = "0.9em";
    mainRecipe.after(safetyNote);

    // 7. Заміна елемента через replaceWith
    let oldTool = document.getElementById("old-utensil");
    if (oldTool) {
        let newTool = document.createElement("span");
        newTool.textContent = " Сучасний блендер ";
        newTool.style.backgroundColor = "#fff9c4";
        oldTool.replaceWith(newTool);
    }

    // 8. Видалення вузла через remove
    let saltOverload = document.getElementById("extra-salt");
    if (saltOverload) {
        saltOverload.remove(); 
    }
}