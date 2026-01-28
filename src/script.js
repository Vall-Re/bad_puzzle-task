window.onload = function() {
    if (typeof DATA !== 'undefined' && DATA.fragments) {
        document.getElementById('totalCount').innerText = DATA.fragments.length;
    }
};

function solvePuzzle() {
  // 1. Отримуємо дані з нашого JSON-об'єкта
  let fragments = [...DATA.fragments];

  // 2. Беремо перший фрагмент як основу нашого ланцюжка
  let chain = [fragments.shift()];

  let foundMatch = true;
  while (foundMatch) {
    foundMatch = false;

    for (let i = 0; i < fragments.length; i++) {
      let currentFragment = fragments[i];
      let firstInChain = chain[0];
      let lastInChain = chain[chain.length - 1];

      // Перевірка: чи можна доклеїти в КІНЕЦЬ?
      // (останні дві цифри ланцюжка == перші дві нового фрагмента)
      if (lastInChain.slice(-2) === currentFragment.slice(0, 2)) {
        chain.push(currentFragment);
        fragments.splice(i, 1); // Видаляємо використаний фрагмент
        foundMatch = true;
        break;
      }

      // Перевірка: чи можна доклеїти в ПОЧАТОК?
      // (останні дві нового фрагмента == перші дві ланцюжка)
      if (currentFragment.slice(-2) === firstInChain.slice(0, 2)) {
        chain.unshift(currentFragment);
        fragments.splice(i, 1); // Видаляємо використаний фрагмент
        foundMatch = true;
        break;
      }
    }
  }

  render(chain);
}

// Функція для відображення результату
function render(finalChain) {
  const board = document.getElementById('puzzleBoard');
  const fullStrDisplay = document.getElementById('fullString');

  document.getElementById('output').classList.remove('hidden');
  board.innerHTML = '';

  // Склеюємо фінальне число
  let resultNumber = finalChain[0];

  finalChain.forEach((num, index) => {
    // Додаємо візуальний блок
    const piece = document.createElement('div');
    piece.className = 'puzzle-piece';
    piece.innerText = num;
    board.appendChild(piece);

    // Додаємо до результату тільки унікальну частину (без перших 2 цифр)
    if (index > 0) {
      resultNumber += num.slice(2);
    }
  });

  fullStrDisplay.innerText = resultNumber;
  document.getElementById('finalCount').innerText = finalChain.length;
}