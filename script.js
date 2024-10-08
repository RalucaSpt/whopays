let names = [];

document.getElementById('name-input').addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        addName(); 
    }
});

function updateNameList() {
    const nameList = document.getElementById('name-list-ul');
    nameList.innerHTML = ''; 

    names.forEach((name, index) => {
        const listItem = document.createElement('li');
        listItem.classList.add('balloon');
        listItem.dataset.index = index; 

        listItem.innerHTML = `
            <img src="pictures/balloon.png" alt="balloon" style="width:300">
            <div class="name">${name}</div>
        `;

        listItem.addEventListener('click', function() {deleteName(index);});

        nameList.appendChild(listItem);
    });
}

function addName() {
    const nameInput = document.getElementById('name-input');
    const name = nameInput.value.trim();

    if (name) {
        names.push(name); 
        nameInput.value = ''; 
        updateNameList();
    } else {
        alert("Please enter a valid name!");
    }
}

function generateRandomName() {
    if (names.length > 0) {
        const randomIndex = Math.floor(Math.random() * names.length);
        const randomName = names[randomIndex];

        const nameDisplay = document.getElementById('name-display');
        nameDisplay.innerText = "Generated Name: " + randomName;

        const balloon = document.querySelector(`[data-index='${randomIndex}']`);
        if (balloon) {
            balloon.classList.add('explode'); 

            setTimeout(() => {
                balloon.remove();
                updateNameList(); 
            }, 600); 
        }

        names.splice(randomIndex, 1);
    } else {
        alert("No more names to generate!");
    }
}


function deleteName(index) {
    names.splice(index, 1); 
    updateNameList(); 
}


const button = document.getElementById('imageButton');
button.addEventListener('click', function() {
    button.style.backgroundImage = "url('pictures/button-pressed.png')";
    
    setTimeout(function() {
        button.style.backgroundImage = "url('button-normal.png')";
    }, 1000);
});

function reset() {
    names = [];
    updateNameList();
    document.getElementById('name-display').innerText = 'Pop the winner!';
}

document.getElementById('reset-button').addEventListener('click', resetNames);
