// Initialize Firebase (you'll need to add your Firebase configuration)
const firebaseConfig = {
    // Replace with your Firebase config
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Function to update visitor count
function updateVisitorCount() {
    const counterRef = db.collection('counters').doc('visitors');
    
    // Check if this is a new session
    if (!sessionStorage.getItem('counted')) {
        // Increment the counter in Firestore
        counterRef.get().then((doc) => {
            if (doc.exists) {
                counterRef.update({
                    count: firebase.firestore.FieldValue.increment(1)
                });
            } else {
                counterRef.set({
                    count: 1
                });
            }
        }).catch((error) => {
            console.error("Error updating counter: ", error);
        });
        
        sessionStorage.setItem('counted', 'true');
    }
    
    // Listen for real-time updates
    counterRef.onSnapshot((doc) => {
        if (doc.exists) {
            const count = doc.data().count;
            const countElement = document.getElementById('visitorCount');
            if (countElement) {
                countElement.textContent = count;
            }
        }
    });
}

// Call the function when the page loads
document.addEventListener('DOMContentLoaded', updateVisitorCount);