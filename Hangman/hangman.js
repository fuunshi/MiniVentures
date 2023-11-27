function chooseWord() {
    const wordList = ["apple", "banana", "orange", "grape", "melon", "strawberry", "pineapple", "blueberry"];
    return wordList[Math.floor(Math.random() * wordList.length)];
  }
  
  function displayWord(word, guessedLetters) {
    let display = '';
    for (const letter of word) {
      if (guessedLetters.includes(letter)) {
        display += letter + ' ';
      } else {
        display += '_ ';
      }
    }
    return display;
  }
  
  let chosenWord;
  let guessedLetters = [];
  let attempts = 6;
  
  function startGame() {
    chosenWord = chooseWord();
    guessedLetters = [];
    attempts = 6;
    document.getElementById('wordDisplay').textContent = displayWord(chosenWord, guessedLetters);
  }
  
  function makeGuess() {
    const guessInput = document.getElementById('guessInput');
    const guess = guessInput.value.trim().toLowerCase();
  
    if (guess.length !== 1 || !/^[a-zA-Z]+$/.test(guess)) {
      alert("Please enter a single letter.");
      return;
    }
  
    if (guessedLetters.includes(guess)) {
      alert("You've already guessed that letter.");
      return;
    }
  
    guessedLetters.push(guess);
  
    if (!chosenWord.includes(guess)) {
      attempts -= 1;
      alert(`Wrong guess! Attempts left: ${attempts}`);
      if (attempts === 0) {
        alert("Sorry, you're out of attempts. The word was: " + chosenWord);
        startGame();
        return;
      }
    } else {
      alert("Good guess!");
    }
  
    const wordDisplay = displayWord(chosenWord, guessedLetters);
    document.getElementById('wordDisplay').textContent = wordDisplay;
  
    if (!wordDisplay.includes('_')) {
      alert("Congratulations! You've guessed the word: " + chosenWord);
      startGame();
    }
  
    guessInput.value = '';
  }
  
  startGame();
  