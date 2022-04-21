const container = document.querySelector('.container');
const slotMachineItemsAdd = document.getElementById('slot-machine-items-add');
const submitButton = document.getElementById('submit-btn');
const slotMachineForm = document.getElementById('slot-machine-form');
const slotMachineSelect = document.getElementById('slot-machine-items-select');

const slotMachineList = {
    creatureType: [],
    skinColor: [],
    hairColor: [],
    hairStyle: [],
    bodyType: [],
    eyeColor: [],
    gender:["male", "female"],
};

let category = "";

const addItemCategoryCheck = (item) => {
    slotMachineItemsAdd.value = '';
    slotMachineList[this.category].push(item);
    updateDIVs(slotMachineList[this.category]);
}

const onChangeCategoryCheck = (category) => {
    this.category = category;
    updateDIVs(slotMachineList[category]);
}

const addItem = (item) => {
    if (slotMachineList[this.category].indexOf(item) != -1) {
        return alert('Item already exists');
    }
    addItemCategoryCheck(item);
};

const updateDIVs = (items) => {
    clearI();
    const slotMachineItemContainer = document.createElement('ul');
    slotMachineItemContainer.classList.add('slot-machine-items-container');
    slotMachineItemContainer.classList.add(`-${this.category}`);
    for (let item of items) {
        // slot machine item
        const slotMachineItem = document.createElement('li');
        slotMachineItem.classList.add('slot-machine-item');
        slotMachineItem.classList.add(`slot-machine-item__${item.replaceAll(' ', '-')}`);
        slotMachineItem.classList.add('slot-machine-item');
        slotMachineItem.innerHTML = `<p>${item}</p>`;
        // adding remove button
        const removeButton = document.createElement('li');
        removeButton.classList.add('remove-button');
        removeButton.onclick = () => {
            slotMachineItemContainer.removeChild(slotMachineItem);
            slotMachineItemContainer.removeChild(removeButton);
            slotMachineList[this.category].splice(slotMachineList[this.category].indexOf(item), 1);
        };
        removeButton.innerHTML = '&#10006;';
        // appending
        slotMachineItemContainer.appendChild(removeButton);
        slotMachineItemContainer.appendChild(slotMachineItem);
        container.appendChild(slotMachineItemContainer);
    }
};

const createSlotMachine = async () => {
    let categories = [];
    const slotMachineContainer = document.querySelector('.slot-machine-container');
    slotMachineContainer.classList.remove('hidden');
    const slotMachine = document.querySelector('.slot-machine');
    slotMachine.classList.remove('hidden');
    let randomizedPositions;
    for(let category in slotMachineList) {
        const Duplicate = duplicateItems(category);
        if(Duplicate) {
            randomizedPositions = randomizePositions(Duplicate);
            const winnerIndex = Math.floor(Math.random() * randomizedPositions.length);
            const winner = randomizedPositions[winnerIndex];
            
            const categoryDiv = document.createElement('div');
            categoryDiv.classList.add('slot-machine-category-div');
            const categoryDivDiv = document.createElement('div');
            categoryDivDiv.classList.add('slot-machine-category-div-div');
            
            const categoryUL = document.createElement('ul');
            categoryUL.classList.add('slot-machine-category');
            categoryUL.classList.add(`-${category}`);
            const categoryHeader = document.createElement('h3');
            categoryHeader.innerHTML = category;
            for (let item of randomizedPositions) {
                const slotMachineLI = document.createElement('li');
                slotMachineLI.classList.add(`${category}`);
                slotMachineLI.classList.add('slot-machine__item');
                slotMachineLI.classList.add(`${item.replaceAll(" ", "-")}`);
                slotMachineLI.innerHTML = `<p>${item}</p>`;
                categoryUL.appendChild(slotMachineLI);
                categoryDiv.appendChild(categoryUL);
                categoryDivDiv.appendChild(categoryHeader);
                categoryDivDiv.appendChild(categoryDiv);
                slotMachine.appendChild(categoryDivDiv);
                slotMachineContainer.appendChild(slotMachine);
            }
            if(winner) {
                console.log(winner);
                const slotMachineLI = document.createElement('li');
                slotMachineLI.classList.add(`${category}`);
                slotMachineLI.classList.add('slot-machine__item');
                slotMachineLI.classList.add(`${winner.replaceAll(" ", "-")}`);
                slotMachineLI.innerHTML = `<p>${winner}</p>`;
                categoryUL.appendChild(slotMachineLI);
                categoryDiv.appendChild(categoryUL);
                categoryDivDiv.appendChild(categoryDiv)
                slotMachine.appendChild(categoryDivDiv);
                slotMachineContainer.appendChild(slotMachine);
            }
            for(let i = 0; i < 4; i++) {
                const slotMachineLI = document.createElement('li');
                slotMachineLI.classList.add(`${category}`);
                slotMachineLI.classList.add('slot-machine__item');
                slotMachineLI.classList.add(`${randomizedPositions[i].replaceAll(" ", "-")}`);
                slotMachineLI.innerHTML = `<p>${randomizedPositions[i]}</p>`;
                categoryUL.appendChild(slotMachineLI);
                categoryDiv.appendChild(categoryUL);
                categoryDivDiv.appendChild(categoryDiv)
                slotMachine.appendChild(categoryDivDiv);
                slotMachineContainer.appendChild(slotMachine);
            }
            categories[category] = {winner: winnerIndex, items: randomizedPositions};
        }
    }
    return categories;
}

const spin = (object) => { // add the winner position * 50 to css height
    const slotMachineUl = document.querySelectorAll('.slot-machine-category');
    console.log(object);
    for (element of slotMachineUl) {
        if(object[element.classList[1].replace("-", "")].items.length == 20) {
            document.documentElement.style.setProperty(`--height${element.classList[1]}`,
            `${850}px`);
        } else if(object[element.classList[1].replace("-", "")].items.length % 2 == 0) {
            document.documentElement.style.setProperty(`--height${element.classList[1]}`,
            `${(object[element.classList[1].replace("-", "")].items.length - 5) * 50}px`);
        } else {
            document.documentElement.style.setProperty(`--height${element.classList[1]}`,
            `${(object[element.classList[1].replace("-", "")].items.length - 5) * 50 + 75}px`);
        }
        element.style.animation = `spin${element.classList[1]} 1s ease-in-out both`;
    }
}

const clearI = () => {
    const slotMachineItems = document.querySelectorAll('.slot-machine-item');
    for (let item of slotMachineItems) {
        item.parentNode.remove();
    }
    // slotMachineItems[0].parentNode.parentNode.removeChild(slotMachineItems[0].parentNode);
};

const clearAll = () => {
    container.innerHTML = '';
    container.classList.add('hidden');
}

// make a function that will add the items to the slot machine
// with the correct category
// if category is empty don't add it to the slot machine

window.onload = () => {
    const slotMachineItemsSelect = document.getElementById('slot-machine-items-select');
    Object.keys(slotMachineList).forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.innerHTML = category;
        slotMachineItemsSelect.appendChild(option);
    });
}

document.addEventListener('keypress', (e) => {
    if (e.keyCode === 13) {
        const slotMachineItemsSelect = document.getElementById('slot-machine-items-select');
        e.preventDefault();
        if(slotMachineItemsAdd.value === '') {
            alert('Please enter something');
        } else if(slotMachineItemsSelect.value === 'None') {
            alert('Please select a category');
        }
        else {
            addItem(slotMachineItemsAdd.value);
        }
    }
})

slotMachineSelect.onchange = () => {
    if(slotMachineSelect.value === 'None') {
    }
    onChangeCategoryCheck(slotMachineSelect.value);
}

const slotTheMachine = async() => {
    clearAll();
    const winnerPos = await createSlotMachine();
    spin(winnerPos);
}

slotMachineForm.onsubmit = (e) => {
    e.preventDefault();
    slotTheMachine();
}

const duplicateItems = (category) => {
    let Duplicate = [];
    if(slotMachineList[category].length > 1) {
        while(Duplicate.length < 20) {
            Duplicate = Duplicate.concat(slotMachineList[category])
        }
        return Duplicate
    }
}

// function to randomize positions and then get the winner's position and to add it to the css

const randomizePositions = (array) => {
    let currentIndex = array.length,  randomIndex;
    
    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
    
        [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    
    }
    return array;
}