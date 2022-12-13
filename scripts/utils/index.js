$(document).ready(function () {
    const fetchProduk = async () => {
        const dataProduk = document.querySelector('#data-produk');
        const q = query(collection(db,'products'), limit(8));
        const snap = await getDocs(q);
        // dataProduk.innerHTML = '';
        snap.forEach((doc) => {
            const data = doc.data();
            data.idProduk = doc.id;
            dataProduk.innerHTML += `
            <div class="col-lg-3 col-md-6 col-sm-6">
                <div class="product__item">
                    <div class="product__item__pic set-bg" data-setbg="${data.foto_produk}">
                        <div class="product__label">
                            <span>${data.nama_produk}</span>
                        </div>
                    </div>
                    <div class="product__item__text">
                        <h6><a href="${base_url('shop-details', '?produk=' + data.idProduk)}">${data.nama_produk}</a></h6>
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

    const fetchTestiMoni = async () => {
        const testimoni = document.querySelector('#testimoni');
        const q = query(collection(db,'testimoni'), where('status', '==', 'Posting'));
        const snapShot = await getDocs(q);
        testimoni.innerHTML = '';
        snapShot.forEach((doc) => {
            const data = doc.data();
            testimoni.innerHTML += `
            <div class="col-lg-6 col-md-6 col-12">
                <div class="testimonial__item">
                    <div class="testimonial__author">
                        <div class="testimonial__author__pic">
                            <img src="img/testimonial/icon.png" width="60%" alt="">
                        </div>
                        <div class="testimonial__author__text">
                            <h5>${data.nama_lengkap}</h5>
                            <span>${data.email_tester}</span>
                        </div>
                    </div>
                    <p>${data.pesan_tester}</p>
                </div>
            </div>
            ` 

        });

    }


    fetchProduk();
    fetchTestiMoni();
    
    
})