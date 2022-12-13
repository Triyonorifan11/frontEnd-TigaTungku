$(document).ready(function () {
    const rowDaftarProduk = document.querySelector('#daftar-produk');
    const searchProduk = document.querySelector('#searchProduk');
    const formSearch = document.querySelector('#formSearch');
    const datalistOptions = document.getElementById('datalistOptions');

    function escapeHtml(text) {
        return text
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }

    const fetchAllProduk = async () => {
        let q = query(collection(db, 'products'), orderBy('nama_produk'));
        const snap = await getDocs(q);
        rowDaftarProduk.innerHTML = '';
        snap.forEach((doc) => {
            const data = doc.data();
            data.idProduk = doc.id;
            rowDaftarProduk.innerHTML += `
            <div class="col-lg-3 col-md-6 col-sm-6">
                <div class="product__item">
                    <div class="product__item__pic set-bg" data-setbg="${data.foto_produk}">
                        <div class="product__label">
                            <span id="namaProduk">${data.nama_produk}</span>
                        </div>
                    </div>
                    <div class="product__item__text">
                        <h6 data-namaProduk="${data.nama_produk}"><a href="${base_url('shop-details', '?produk=' + data.idProduk)}">${data.nama_produk}</a></h6>
                        <div class="product__item__price">Rp${formatRupiah(data.harga_produk)}</div>
                        <div class="cart_add">
                            <a href="${data.linkShopee_produk}" target="_blank">Link Shopee</a>
                        </div>
                    </div>
                </div>
            </div>
            `
            datalistOptions.innerHTML += `<option value="${data.nama_produk}">`
        });
        $('.set-bg').each(function () {
            let bg = $(this).data('setbg');
            $(this).css('background-image', 'url(' + bg + ')');
        });

    }
    fetchAllProduk();

    const btnRefresh = document.getElementById('btnRefresh');
    formSearch.addEventListener('submit', async (e) => {
        e.preventDefault();
        btnRefresh.classList.remove('d-none')
        const dataInputSearch = escapeHtml(searchProduk.value);
        let q = query(collection(db, 'products'), where('nama_produk', '==', dataInputSearch))
        const snapDoc = await getDocs(q);
        rowDaftarProduk.innerHTML = 'Search..';
        rowDaftarProduk.innerHTML = '';
        snapDoc.forEach((doc) => {
            const data = doc.data();
            if (data) {
                data.idProduk = doc.id;
                rowDaftarProduk.innerHTML += `
            <div class="col-lg-3 col-md-6 col-sm-6">
                <div class="product__item">
                    <div class="product__item__pic set-bg" data-setbg="${data.foto_produk}">
                        <div class="product__label">
                            <span id="namaProduk">${data.nama_produk}</span>
                        </div>
                    </div>
                    <div class="product__item__text">
                        <h6 data-namaProduk="${data.nama_produk}"><a href="${base_url('shop-details', '?produk=' + data.idProduk)}">${data.nama_produk}</a></h6>
                        <div class="product__item__price">Rp${formatRupiah(data.harga_produk)}</div>
                        <div class="cart_add">
                            <a href="${data.linkShopee_produk}" target="_blank">Link Shopee</a>
                        </div>
                    </div>
                </div>
            </div>
            `
            }else{
                console.log('tidak ditemukqn')
            }
        });

        $('.set-bg').each(function () {
            let bg = $(this).data('setbg');
            $(this).css('background-image', 'url(' + bg + ')');
        });
    })

    btnRefresh.addEventListener('click', (e)=>{
        window.location.reload();
    })

})