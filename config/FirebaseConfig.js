// Importa las funciones necesarias de Firebase
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Importa Firestore

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBUml_S2CQadA4ldbSlhZvAF1BdLrsIAbA",
  authDomain: "lachispa-d0295.firebaseapp.com",
  projectId: "lachispa-d0295",
  storageBucket: "lachispa-d0295.appspot.com",
  messagingSenderId: "366050594321",
  appId: "1:366050594321:web:932a7825c6c93d3cb22bb0",
  measurementId: "G-ET6M95JFBY"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app); // Inicializa Firestore

// Solo inicializa Analytics si el entorno es un navegador
if (typeof window !== "undefined") {
  const { getAnalytics } = require("firebase/analytics");
  const analytics = getAnalytics(app);
}

// Exporta auth y db para ser utilizados en otros archivos
export { auth, db };

