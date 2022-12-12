$(document).ready(function(){
    const param = findGetParameter('produk');
    const tglUpdate = document.getElementById('tglUpdate');
    const namaProduk = document.getElementById('namaProduk');
    const hargaPRoduk = document.getElementById('hargaPRoduk');
    const big_img = document.querySelector('.big_img');
    const deskripsiProduk = document.getElementById('deskripsiProduk');
    const linkProduk = document.getElementById('linkProduk');
    if(!param){
        window.location.href = './index.html';
    }
    const getDataProdukById = async (id) => {
        const docRef = doc(db, 'products', id);
        const docSnap = await getDoc(docRef);
        const elemen = docSnap.data();
        tglUpdate.innerText = format_date(elemen.tgl_diupdate);
        namaProduk.innerText = elemen.nama_produk;
        hargaPRoduk.innerHTML = `Rp${formatRupiah(elemen.harga_produk)}`;
        big_img.setAttribute('src', elemen.foto_produk);
        deskripsiProduk.innerHTML = elemen.deskripsi_produk;
        linkProduk.setAttribute('href', elemen.linkShopee_produk);
    }

    getDataProdukById(param);
})