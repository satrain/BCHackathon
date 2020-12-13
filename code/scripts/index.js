const guideList = document.querySelector('.guides');
const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');
const accountDetails = document.querySelector('.account-details');
const adminItems = document.querySelectorAll('.admin')
const select = document.querySelector('select');
const addGame = document.querySelector('.gamee');
const search = document.querySelector('.search input');

// Get the modal
var modal = document.getElementById("myModal");
// Get the button that opens the modal
var btn = document.querySelector('.myBtn');
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
// When the user clicks on the button, open the modal
btn.onclick = function() {

  modal.style.display = "block";
}
// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}


//Upload image
var mrk;
function uploadImage(baza) {
  const ref = firebase.storage().ref()

  const file = document.querySelector("#photo").files[0]

  var name = new Date() + '-' + file.name

  const metadata = {
    contentType:file.type
  }


  const task = ref.child(name).put(file, metadata)
  task
    .then(snapshot => snapshot.ref.getDownloadURL())
    .then(url => {
      const image = document.querySelector('#image')
      mrk = url
      image.src = url
    })
    .catch(err => console.log(err))


 
}




//setup gameList
const setupGame = (data) => {

  let html = '';
  data.forEach(doc => {
    const game = doc.data();
    const option = `
    
    <option value="${game.name}">${game.name}</option>
    `;
    html += option;
  });
  select.innerHTML = html;
}

//setup ui
const setupUI = (user) => {
  if(user){
    if(user.admin){
      //setting ui for admins
      adminItems.forEach(item => item.style.display = 'block');
    }
    //account info
    //one line bio
    db.collection('users').doc(user.uid).get().then(doc => {
      const html = `
      <div>Logged in as  ${user.email}</div>
      <div>${doc.data().bio}</div>
      <div class="pink-text">${user.admin ? 'Admin' : ''}</div>
      `;
      accountDetails.innerHTML = html;
    })
   
    
    //toggle UI elements
    loggedInLinks.forEach(item => item.style.display = 'block');
    loggedOutLinks.forEach(item => item.style.display = 'none');
  } else{
    //setting admin ui
    adminItems.forEach(item => item.style.display = 'none');

    //hide account info 
    accountDetails.innerHTML = '';
    //toggle Ui elements
    loggedInLinks.forEach(item => item.style.display = 'none');
    loggedOutLinks.forEach(item => item.style.display = 'block');
  }
}

const now = new Date();
// window.onclick = function() {
//   if(document.querySelector("#searchIcon").style.display == "none") {
//     console.log("Ne vidim ga");
//   }
//   else {
//     console.log("VIdim ga");
//   }
// }

//setup guides
const setupGuides = (data) => {
  if(data.length){

  
  let html = '';
  data.forEach(doc => {
    const guide = doc.data();
    datum = guide.dateend
    vreme = guide.timeend
    let image = guide.imageUrl
    const before = new Date(`${datum} ${vreme}`)

    let datumstart = guide.date
    let vremestart = guide.time
    const start = new Date(`${datumstart} ${vremestart}`)
    let mesec = dateFns.format(start, 'MMMM d');
    const li = `
          <div class="event-card-box">
        <div class="event-img" style="background: url('${image.mrk}'); background-size: cover;">
          <div class="event-time">
            <div class="event-calendar">
              <img src="code/assets/images/calendar.svg">
              <span>${guide.date}</span>
            </div>
            <div class="event-clock">
              <img src="code/assets/images/clock.svg">
              <span>${guide.time}</span>
            </div>
          </div>
        </div>
        <div class="event-copy">
          <span class="event-heading">${guide.title}</span>
          <p>${guide.content}</p>
        </div>
        <span class="event-card-location">${guide.location}</span>
      </div>
    `;
    html += li
    });
    

    guideList.innerHTML = html;
  } else{
    guideList.innerHTML = '<h5 class="center-align">Log in to view events</h5>'
  }
}

//search events
const filterTodos = term => {
  
  // add filtered class
  Array.from(guideList.children)
    .filter(data => !data.textContent.toLowerCase().includes(term))
    .forEach(data => data.classList.add('filtered'));

  // remove filtered class
  Array.from(guideList.children)
    .filter(data => data.textContent.toLowerCase().includes(term))
    .forEach(data => data.classList.remove('filtered'));

};

// filter todos event
search.addEventListener('keyup', () => {

  const term = search.value.trim().toLowerCase();
  filterTodos(term);

});



// setup materialize components
document.addEventListener('DOMContentLoaded', function() {

    var modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);
  
    var items = document.querySelectorAll('.collapsible');
    M.Collapsible.init(items);

    
    var select = document.querySelector('select');
    M.FormSelect.init(select);
     

  var myNav = document.querySelectorAll('.sidenav');
  M.Sidenav.init(myNav, {});
    
});