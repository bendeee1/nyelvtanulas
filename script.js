const words = {
    hungarian: ["kutya", "macska", "ház", "autó", "könyv", "iskola", "asztal", "szék", "fa", "virág"],
    english: ["dog", "cat", "house", "car", "book", "school", "table", "chair", "tree", "flower"]
};
let selectedHungarian = null, selectedEnglish = null, successCount = 0, failCount = 0;

document.getElementById('startBtn').onclick = startGame;
document.getElementById('resetBtn').onclick = resetGame;

function startGame() {
    toggleVisibility('startBtn', 'gameBoard', 'resetBtn');
    populateWords();
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function populateWords() {
    const hungarianShuffled = [...words.hungarian];
    const englishShuffled = [...words.english];
    
    shuffle(hungarianShuffled);
    shuffle(englishShuffled);

    ['hungarian', 'english'].forEach(lang => {
        const list = document.getElementById(`${lang}Words`);
        list.innerHTML = '';
        const wordsList = lang === 'hungarian' ? hungarianShuffled : englishShuffled;
        wordsList.forEach(word => {
            const li = document.createElement('li');
            li.textContent = word;
            li.onclick = () => selectWord(lang, li);
            list.appendChild(li);
        });
    });
}

function selectWord(lang, element) {
    lang === 'hungarian' ? selectedHungarian = toggleSelection(selectedHungarian, element) : selectedEnglish = toggleSelection(selectedEnglish, element);
    if (selectedHungarian && selectedEnglish) checkMatch();
}

function toggleSelection(current, element) {
    current?.classList.remove('selected');
    element.classList.add('selected');
    return element;
}

function checkMatch() {
    const hungarianIndex = words.hungarian.indexOf(selectedHungarian.textContent);
    const englishIndex = words.english.indexOf(selectedEnglish.textContent);

    if (hungarianIndex === englishIndex) {
        markCorrect(selectedHungarian, selectedEnglish);
        successCount++;
    } else {
        markIncorrect(selectedHungarian, selectedEnglish);
        failCount++;
    }
    updateScore();
    resetSelection();
}

function markCorrect(...elements) {
    elements.forEach(el => {
        el.classList.add('correct');
        el.onclick = null;
    });
}

function markIncorrect(...elements) {
    elements.forEach(el => {
        el.classList.add('incorrect');
        setTimeout(() => el.classList.remove('incorrect'), 1000);  
    });
}

function updateScore() {
    document.getElementById('successCount').textContent = successCount;
    document.getElementById('failCount').textContent = failCount;
}

function resetSelection() {
    selectedHungarian?.classList.remove('selected');
    selectedEnglish?.classList.remove('selected');
    selectedHungarian = selectedEnglish = null;
}

function resetGame() {
    successCount = failCount = 0;
    updateScore();
    toggleVisibility('gameBoard', 'resetBtn', 'startBtn');
    document.getElementById('hungarianWords').innerHTML = '';
    document.getElementById('englishWords').innerHTML = '';
}

function toggleVisibility(...ids) {
    ids.forEach(id => document.getElementById(id).classList.toggle('hidden'));
}
