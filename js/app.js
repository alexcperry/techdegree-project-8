
const numUsers = 12;
const gridDiv = document.getElementById('grid');

const makeUserDiv = (user, grid) => {
  const userDiv = document.createElement('div');
  userDiv.className = "user";

  const photo = user.picture.large;
  const name = user.name.first + " " + user.name.last;
  const email = user.email;
  const location = user.location.city;

  userDiv.innerHTML = `
  <img src="${photo}" alt="A headshot of ${name}">
  <h3>${name}</h3>
  <p>${email}</p>
  <p>${location}</p>
  `;
  grid.appendChild(userDiv);
}

fetch(`https://randomuser.me/api/?results=${numUsers}`)
  .then(response => response.json())
  .then(data => data.results)
  .then(results => results.forEach(user => makeUserDiv(user, gridDiv)));  //data.results is the list of person objects