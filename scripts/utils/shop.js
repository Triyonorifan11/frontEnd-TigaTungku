$(document).ready(function(){
    const rowDaftarProduk = document.querySelector('#daftar-produk');
    const fetchProduk = async () => {
        const q = query(collection(db,'products'));
        const snap = await getDocs(q);
        snap.forEach((doc) => {
            const data = doc.data();
            data.idProduk = doc.id;
            rowDaftarProduk.innerHTML += `
            <div class="col-lg-3 col-md-6 col-sm-6">
                <div class="product__item">
                    <div class="product__item__pic set-bg" data-setbg="${data.foto_produk}">
                        <div class="product__label">
                            <span>${data.nama_produk}</span>
                        </div>
                    </div>
                    <div class="product__item__text">
                        <h6><a href="${base_url('shop-details', '?produk=' + data.idProduk)}" target="_blank">${data.nama_produk}</a></h6>
                        <div class="product__item__price">Rp${formatRupiah(data.harga_produk)}</div>
                        <div class="cart_add">
                            <a href="${data.linkShopee_produk}" target="_blank">Link Shopee</a>
                        </div>
                    </div>
                </div>
            </div>
            `
        });
        $('.set-bg').each(function () {
            let bg = $(this).data('setbg');
            $(this).css('background-image', 'url(' + bg + ')');
        });
    }
    fetchProduk();
})