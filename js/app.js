
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
  <div class="user-info">
  <h3>${name}</h3>
  <p>${email}</p>
  <p>${location}</p>
  </div>
  `;
  grid.appendChild(userDiv);
}

fetch(`https://randomuser.me/api/?nat=us&results=${numUsers}`)
  .then(response => response.json())
  .then(data => data.results)
  .then(results => results.forEach(user => makeUserDiv(user, gridDiv)));  //data.results is the list of person objects