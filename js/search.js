const setupSearch = () => {

  const searchBar = document.querySelector('.search-bar');
  const employeeDivs = document.querySelectorAll('.employee-grid');

  searchBar.addEventListener('keyup', () => {
    const searchTerm = searchBar.value.toLowerCase();
    employeeDivs.forEach(employeeDiv => {
      const employeeName = employeeDiv.querySelector('.employee-info h3').innerText.toLowerCase();

      if (!employeeName.includes(searchTerm)) {
        console.log("bad result");
        employeeDiv.style.display = "none";
      } else {
        console.log("good result");
        employeeDiv.style.display = "flex";
      }

    })
  })
}

// $('.search-box').on('keyup', function () {

//   let searchTerm = $('.search-box').val().toLowerCase();

//   $('.gallery-link').each(function (index, link) {

//     let photoDescription = $(link).attr('data-title').toLowerCase();

//     console.log(!photoDescription.includes(searchTerm));
//     if (!photoDescription.includes(searchTerm)) {
//       $(link).css('display', 'none');
//     } else {
//       $(link).css('display', 'block');
//     }

//   });
// });