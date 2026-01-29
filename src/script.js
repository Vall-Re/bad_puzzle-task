window.onload = function () {
  if (typeof DATA !== 'undefined' && DATA.fragments) { 
    document.getElementById('totalCount').innerText = 
    DATA.fragments.length; 
  } 
};

function solvePuzzle() {
  let fragments = [...DATA.fragments.map(String)];
  if (fragments.length === 0) {
    return;
  }

  // Беремо перший елемент як основу
  let element = [fragments.shift()];
  let foundMatch = true;

  while (foundMatch) {
    foundMatch = false;

    for (let i = 0; i < fragments.length; i++) {
      const currentFragment = fragments[i];
      const firstTwoNum = element[0];
      const lastTwoNum = element[element.length - 1];

      if (lastTwoNum.slice(-2) === currentFragment.slice(0, 2)) {
        element.push(fragments.splice(i, 1)[0]);
        foundMatch = true;
        break; // Знайшли збіг — перериваємо for і починаємо заново
      }

      // Дивимось: чи підходить фрагмент у ПОЧАТОК?
      if (currentFragment.slice(-2) === firstTwoNum.slice(0, 2)) {
        element.unshift(fragments.splice(i, 1)[0]);
        foundMatch = true;
        break;
      }
    }
  }

  render(element);
}

function render(finalChain) {
  const board = document.getElementById('puzzleBoard');
  const fullStr = document.getElementById('fullString');
  const output = document.getElementById('output');

  output.classList.remove('hidden');
  board.innerHTML = '';

  let resultNumber = finalChain[0];

  finalChain.forEach((num, index) => {
    const piece = document.createElement('div');
    piece.className = 'puzzle-piece';
    piece.innerHTML = num
    board.appendChild(piece);

    if (index > 0) {
      resultNumber += num.slice(2);
    }
  });

  // Виводимо довге число
  fullStr.innerText = resultNumber.match(/.{1,50}/g).join('\n');
  document.getElementById('finalCount').innerText = finalChain.length;
}
