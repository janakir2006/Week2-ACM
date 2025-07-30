const firebaseConfig = {
  apiKey: "AIzaSyAuB-cidPaCzAVqB9oaYTHlsoWWPxQDW4o",
  authDomain: "authorfinder-47fe6.firebaseapp.com",
  databaseURL: "https://authorfinder-47fe6-default-rtdb.firebaseio.com/",
  projectId: "authorfinder-47fe6",
  storageBucket: "authorfinder-47fe6.firebasestorage.app",
  messagingSenderId: "687827260229",
  appId: "1:687827260229:web:1f9a022b329a561264642c"
};


firebase.initializeApp(firebaseConfig);
const db = firebase.database();

function findAuthor() {
  const input = document.getElementById('authorInput').value.trim().toLowerCase().replaceAll('.', '').replaceAll(' ', '_');

  const ref = db.ref('authors/' + input);

  ref.once('value')
    .then((snapshot) => {
      const data = snapshot.val();
      const resultDiv = document.getElementById('result');
      if (data) {
        resultDiv.innerHTML = `<h2>${data.full_name}<p></p></h2><ul>` +
          data.books.map(book => `<li>${book}</li>`).join('') + `</ul>`;
      } else {
        resultDiv.innerHTML = `<p>Author not found.</p>`;
      }
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}