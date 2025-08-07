"use strict ;"
const apiUrl = 'https://hp-api.onrender.com/api/characters';
const container = document.getElementById('characterContainer');
const filter = document.getElementById('houseFilter');

let characters = [];

function createCard(character) {
  const card = document.createElement('div');
  card.className = 'card';

  const image = document.createElement('img');
  image.src = character.image || 'images/not-found.png';
  image.alt = character.name;

  const name = document.createElement('h3');
  name.textContent = character.name;

  const house = document.createElement('p');
  house.textContent =` House: ${character.house || 'Unknown'}`;

  const dob = document.createElement('p');
  dob.textContent =`DOB: ${character.dateOfBirth || 'Unknown'}`;

  card.append(image, name, house, dob);
  return card;
}

function renderCharacters(list) {
  container.innerHTML = '';
  list.slice(0, 16).forEach(char => {
    const card = createCard(char);
    container.appendChild(card);
  });
}

filter.addEventListener('change', () => {
  const selectedHouse = filter.value;
  const filtered = selectedHouse === 'all' ? characters : characters.filter(c => c.house === selectedHouse);
  renderCharacters(filtered);
});

fetch(apiUrl)
  .then(res => res.json())
  .then(data => {
    characters = data;
    renderCharacters(characters);
  });
