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

function format_date(date) {
    const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    };
    const dateTemp = new Date(date);
    return dateTemp.toLocaleDateString("id-ID", options);
}

function base_url(param = "/", params = "") {
    if (param[0] != "/") {
        param = "/" + param;
    }
    if (!param.includes(".html")) {
        param = param + ".html";
    }
    return window.location.origin + param + params;
}

function findGetParameter(parameterName) {
    var result = null,
        tmp = [];
    location.search
        .substr(1)
        .split("&")
        .forEach(function(item) {
            tmp = item.split("=");
            if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
        });
    return result;
}

window.db = db;
window.base_url = base_url;
window.formatRupiah = formatRupiah;
window.findGetParameter = findGetParameter;
window.fb = firebasedatabase;
window.getDoc = firebasedatabase.getDoc;
window.doc = firebasedatabase.doc;
window.getDocs = firebasedatabase.getDocs;
window.collection = firebasedatabase.collection;
window.query = firebasedatabase.query;
window.format_date = format_date;
window.limit = firebasedatabase.limit;