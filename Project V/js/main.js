
const gallery = document.querySelector('.gallery');
const container = document.querySelector('.search-container');
const modal_Container = document.querySelector('.modal-container');
// global variable to store all the profiles of the employees
let profiles = "";

//function to fetch the api for the url provided
function FetchData(url) {
	return fetch(url).then(res => res.json());
}

// IIFE to load the site for the first time with gallery of 12 employees
(function loadfirst() {

  	container.innerHTML = `<form action="#" method="get">
        <input type="search" id="search-input" class="search-input" placeholder="Search...">
        <input type="submit" value="🔍" id="serach-submit" class="search-submit">
    </form>`;
//url with only English Employee Name
  	var url = "https://randomuser.me/api/?results=12&nat=us";
//fetch the api
  	FetchData(url).then(function (items) {
  		profiles = items.results;
  		createGallery(profiles);
  	});

})();

//function to create the gallery for the provided list of employee
function createGallery(items) {

	let employees = items;
//function to create card for the list of employee provided
	let showItems = function (employees) {
		let empId = 0;
		var html = employees.map(item => `<div class="card" id=${empId++}>
        <div class="card-img-container">
            <img class="card-img" src=${item.picture.medium} alt="profile picture">
        </div>
        <div class="card-info-container">
            <h3 id="name" class="card-name cap">${item.name.first} ${item.name.last}</h3>
            <p class="card-text">${item.email}</p>
            <p class="card-text cap">${item.location.city}, ${item.location.state}</p>
        </div>
    </div>`).join('');


		gallery.innerHTML = html;
	}
  //show the cards of 12 employees
	showItems(employees);

// click event to show the details of each employee
	$('.card').bind('click',
		function () {
      //variable to store empId
			let userId = parseInt(this.getAttribute('id'));
      // function to format the dob
			function convertDate(inputFormat) {
				function pad(s) {
					return (s < 10) ? '0' + s : s;
				}
				var d = new Date(inputFormat);
				return [pad(d.getMonth() + 1), pad(d.getDate()), d.getYear()].join('/');
			}
//function ot show the modal
			function showModal(userId) {
				$('body').append(`
                <div class="modal-container">
                     <div class="modal">
                         <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                         <div class="modal-info-container">
                             <img class="modal-img" src=${employees[userId].picture.large} alt="profile picture">
                             <h3 id="name" class="modal-name cap">${employees[userId].name.first} ${employees[userId].name.last}</h3>
                             <p class="modal-text">${employees[userId].email}</p>
                             <p class="modal-text cap">${employees[userId].location.city}</p>
                             <hr>
                             <p class="modal-text">${employees[userId].phone}</p>
                             <p class="modal-text">${employees[userId].location.street}, ${employees[userId].location.state}, ${employees[userId].location.postcode}</p>
                             <p class="modal-text">Birthday: ${convertDate(employees[userId].dob.date)}</p>
                         </div>
                     </div>

                     <div class="modal-btn-container">
                         <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                         <button type="button" id="modal-next" class="modal-next btn">Next</button>
                     </div>

                </div>`);
			}
      //Funciton called to show the modal of provided EmpID
			showModal(userId);

      //Next button event to shuffle through the profiles
			$('body').on('click', '#modal-next', function () {
				if (userId !== employees.length - 1) {
					userId++;
					showModal(userId);
				} else {
					userId = 0;
					showModal(userId);
				}
			});
      //Right keyboard button to move to next profile
      $(document).keyup(function (e) {
        if (e.keyCode == 39) {
          if (userId !== employees.length - 1) {
            userId++;
            showModal(userId);
          } else {
            userId = 0;
            showModal(userId);
          }
        }
      });

//Previous button event to shuffle through the profiles
			$("body").on('click', '#modal-prev', function () {
				if (userId !== 0) {
					userId--;
					showModal(userId);
				} else {
					userId = employees.length - 1;
					showModal(userId)
				}
			});
//Left keyboard button to move to next profile
			$(document).keyup(function (e) {
				if (e.keyCode == 37) {
					if (userId !== 0) {
						userId--;
						showModal(userId);
					} else {
						userId = employees.length - 1;
						showModal(userId)
					}
				}
			});

//Close button to hide the modal
			$("body").on('click', '#modal-close-btn', function () {
				$(".modal-container").hide();
			});

	//Esc Keyboaed button to close the modal
			$(document).keyup(function (e) {
				if (e.keyCode == 27) {
					$(".modal-container").hide();
				}
			});
		});

//search button event
	$('.search-submit').click(
		function (e) {
			e.preventDefault();
      //varibale to store matched profiles searched by Name
			let filtered = "";
			let src = $('.search-input').val().toLowerCase();
			if (src === "") {
        //if no value in search field then show all profile
				createGallery(profiles);
			} else {
				filtered = profiles.filter(function (item) {
					return item.name.first.toLowerCase().indexOf(src) > -1 ||
						item.name.last.toLowerCase().indexOf(src) > -1;
				});
        //show only profiles which matches the search condition
				createGallery(filtered);
			}
		});

}
