const storyText = document.getElementById('story-text');
const choicesDiv = document.getElementById('choices');
const inventoryList = document.getElementById('inventory-list');
const craftingList = document.getElementById('crafting-list');
const backgroundMusic = document.getElementById('background-music');
const soundEffect = document.getElementById('sound-effect');

let gameState = {
    location: 'forest',
    inventory: [],
    relics: 0,
    recipes: {
        'Potion of Healing': ['Herb', 'Water'],
        'Magic Amulet': ['Gold', 'Magic Stone']
    }
};

function updateStory(text) {
    storyText.textContent = text;
}

function playSoundEffect() {
    soundEffect.play();
}

function updateChoices(choices) {
    choicesDiv.innerHTML = '';
    choices.forEach(choice => {
        const button = document.createElement('button');
        button.textContent = choice.text;
        button.onclick = () => {
            playSoundEffect();
            choice.action();
        };
        choicesDiv.appendChild(button);
    });
}

function updateInventory(item) {
    if (item) {
        gameState.inventory.push(item);
        const li = document.createElement('li');
        li.textContent = item;
        li.classList.add('inventory-item');
        inventoryList.appendChild(li);
    }
}

function updateCrafting(item) {
    if (item) {
        const li = document.createElement('li');
        li.textContent = item;
        li.classList.add('crafting-item');
        craftingList.appendChild(li);
    }
}

function updateLocation(newLocation) {
    gameState.location = newLocation;
    document.body.className = newLocation;
}

function forest() {
    updateStory("You are in a dense forest. Paths lead deeper into the woods or back to the village.");
    updateChoices([
        { text: "Go deeper into the forest", action: goDeeperForest },
        { text: "Return to the Village of Eldoria", action: village },
        { text: "Collect herbs", action: collectHerbs }
    ]);
}

function village() {
    updateStory("You arrive at the bustling Village of Eldoria. The blacksmith, alchemist, and library are here.");
    updateChoices([
        { text: "Visit the blacksmith", action: blacksmith },
        { text: "Visit the alchemist", action: alchemist },
        { text: "Visit the library", action: library },
        { text: "Return to the forest", action: forest },
        { text: "Visit the crafting shop", action: craftingShop }
    ]);
}

function blacksmith() {
    updateStory("At the blacksmith's forge, you see various tools and weapons.");
    updateChoices([
        { text: "Buy a sword", action: () => buyItem('Sword') },
        { text: "Buy a shield", action: () => buyItem('Shield') },
        { text: "Return to the village", action: village }
    ]);
}

function alchemist() {
    updateStory("In the alchemist's lab, there are potions and magical items.");
    updateChoices([
        { text: "Buy a healing potion", action: () => buyItem('Healing Potion') },
        { text: "Buy a magic scroll", action: () => buyItem('Magic Scroll') },
        { text: "Return to the village", action: village }
    ]);
}

function library() {
    updateStory("The library contains ancient books and maps.");
    updateChoices([
        { text: "Read a book about ancient relics", action: () => updateStory("You learn about ancient relics.") },
        { text: "Return to the village", action: village }
    ]);
}

function craftingShop() {
    updateStory("The crafting shop offers various materials for crafting.");
    updateChoices([
        { text: "Craft a Potion of Healing", action: () => craftItem('Potion of Healing') },
        { text: "Craft a Magic Amulet", action: () => craftItem('Magic Amulet') },
        { text: "Return to the village", action: village }
    ]);
}

function collectHerbs() {
    updateStory("You gather some herbs from the forest.");
    updateInventory('Herb');
}

function goDeeperForest() {
    updateStory("You venture deeper into the forest and find an old cave.");
    updateChoices([
        { text: "Enter the cave", action: cave },
        { text: "Return to the village", action: village }
    ]);
}

function cave() {
    updateStory("Inside the cave, you find old treasures and hidden paths.");
    updateChoices([
        { text: "Search for treasures", action: () => updateInventory('Gold Coin') },
        { text: "Explore the hidden paths", action: () => updateStory("You find a hidden relic!") },
        { text: "Return to the forest", action: forest }
    ]);
}

function craftItem(itemName) {
    const requiredItems = gameState.recipes[itemName];
    if (requiredItems.every(req => gameState.inventory.includes(req))) {
        updateStory(`You successfully craft a ${itemName}.`);
        updateCrafting(itemName);
        requiredItems.forEach(req => {
            gameState.inventory = gameState.inventory.filter(i => i !== req);
        });
    } else {
        updateStory("You don't have the required items for crafting.");
    }
}

document.addEventListener('DOMContentLoaded', () => {
    updateLocation('forest');
    forest();
});

