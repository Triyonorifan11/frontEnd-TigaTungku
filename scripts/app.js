import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import * as firebasedatabase from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyBaHHiaS_gXqlAIkHi7m9o_ZWo35LefCVw",
    authDomain: "tigatungkuproject.firebaseapp.com",
    projectId: "tigatungkuproject",
    storageBucket: "tigatungkuproject.appspot.com",
    messagingSenderId: "215385545595",
    appId: "1:215385545595:web:26f6381e045bdcba32fbde",
    measurementId: "G-ME057FPG2N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = firebasedatabase.getFirestore();

function formatRupiah(angka) {
    let separator = ".";
    var number_string = angka.replace(/[^,\d]/g, "").toString(),
        split = number_string.split(","),
        sisa = split[0].length % 3,
        rupiah = split[0].substr(0, sisa),
        ribuan = split[0].substr(sisa).match(/\d{3}/gi);

    // tambahkan titik jika yang di input sudah menjadi angka ribuan
    if (ribuan) {
        separator = sisa ? "." : "";
        rupiah += separator + ribuan.join(".");
    }

    rupiah = split[1] != undefined ? rupiah + "," + split[1] : rupiah;
    return rupiah;
}

window.db = db;
window.fb = firebasedatabase;
window.formatRupiah = formatRupiah;
window.getDocs = firebasedatabase.getDocs;
window.collection = firebasedatabase.collection;
window.query = firebasedatabase.query;
window.limit = firebasedatabase.limit;