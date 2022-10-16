let allEvents = []
const eventsList = document.querySelector("ol");

document.addEventListener("DOMContentLoaded", event => {
  const app = firebase.app()

  const db = firebase.firestore()

  const events = db.collection('events')

  

  events.onSnapshot((event) => {
    allEvents = []
    event.forEach((doc) => {
      data = doc.data();
      allEvents.push(data.title);
    });
    printEvents();
  }); 
  

})

function printEvents() {
  eventsList.innerHTML = '';
  allEvents.forEach((event) => {
    const listItem = document.createElement("li");
    listItem.innerHTML = event;
    eventsList.append(listItem);
  });
}

function clearEvents() {
  events = [];
}

function googleLogin() {
  const provider = new firebase.auth.GoogleAuthProvider()
  firebase.auth().signInWithPopup(provider)
    .then(result => {
      const user = result.user
      document.write(`Hello ${user.displayName}`)
      console.log(user)
    })
    .catch(console.log)
}

async function addEvent(e) {
  const db = firebase.firestore()
  const newEvent = document.querySelector('input').value
  const res = await db.collection('events').add({
    title: newEvent
  })
  console.log(res);
}
