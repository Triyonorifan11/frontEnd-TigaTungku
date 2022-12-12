$(document).ready(function () {
    console.log('testi');
    function escapeHtml(text) {
        return text
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }

    const formTestimoni = document.getElementById('formTestimoni');
    const namaLengkap = document.querySelector('#namaLengkap');
    const emailTester = document.querySelector('#emailTester');
    const pesanTester = document.querySelector('#pesanTester');
    const btnTesti = document.querySelector('#btnTesti');

    formTestimoni.addEventListener('submit', async (e) => {
        e.preventDefault();
        btnTesti.innerHTML = 'Mohon Tunggu ...';
        btnTesti.setAttribute('disabled', '');
        const dataTesti = {
            nama_lengkap: escapeHtml(namaLengkap.value),
            email_tester: escapeHtml(emailTester.value),
            pesan_tester: escapeHtml(pesanTester.value),
            tgl_input: new Date().toISOString(),
            status: 'pending'
        };
        await addtesti(dataTesti);
    })

    const addtesti = async (data) => {
        try {
            const collec = collection(db, 'testimoni');
            const add = await addDoc(collec, data);
            flassMessage('success', 'Berhasil!', 'Testimoni berhasi ditambah, tunggu konfimasi admin!');
            namaLengkap.value = '';
            emailTester.value = '';
            pesanTester.value = '';
            btnTesti.innerHTML = 'Kirim Testimoni';
            btnTesti.removeAttribute('disabled');
        } catch (error) {
            flassMessage('error', 'Gagal!', `Testimoni gagal ditambah, ${error}`);
        }
    }



})