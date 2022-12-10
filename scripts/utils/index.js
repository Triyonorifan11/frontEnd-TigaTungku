$(document).ready(function () {
    const fetchProduk = async () => {
        const dataProduk = document.querySelector('#data-produk');
        const q = query(collection(db,'products'), limit(9));
        const snap = await getDocs(q);
        // dataProduk.innerHTML = '';
        snap.forEach((doc) => {
            console.log(doc.data());
            const data = doc.data();
            dataProduk.innerHTML += `
            <div class="col-lg-3 col-md-6 col-sm-6">
                <div class="product__item">
                    <div class="product__item__pic set-bg" data-setbg="${data.foto_produk}">
                        <div class="product__label">
                            <span>${data.nama_produk}</span>
                        </div>
                    </div>
                    <div class="product__item__text">
                        <h6><a href="#">${data.nama_produk}</a></h6>
                        <div class="product__item__price">Rp${formatRupiah(data.harga_produk)}</div>
                        <div class="cart_add">
                            <a href="#">Add to cart</a>
                        </div>
                    </div>
                </div>
            </div>
            `
        });
        $('.set-bg').each(function () {
            var bg = $(this).data('setbg');
            $(this).css('background-image', 'url(' + bg + ')');
        });
    }
    fetchProduk();
})