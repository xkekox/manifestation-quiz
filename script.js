async function hashEmail(email) {
    try {
        const encoder = new TextEncoder();
        const data = encoder.encode(email.trim().toLowerCase());
        const hash = await crypto.subtle.digest('SHA-256', data);
        return Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join('');
    } catch (e) {
        return '';
    }
}

function nextStep(step) {
    document.querySelectorAll('.quiz-step').forEach(el => el.classList.remove('active'));

    let targetStep = step;
    if (step === "optin") {
        targetStep = "optin";
        document.getElementById('progress-bar').style.width = '98%';
    } else {
        const progress = (step / 5) * 100;
        document.getElementById('progress-bar').style.width = progress + '%';
    }

    const nextEl = document.querySelector('.quiz-step[data-step="' + targetStep + '"]');
    if (nextEl) {
        nextEl.classList.add('active');
        window.scrollTo(0, 0);
    }
}

document.addEventListener('DOMContentLoaded', function () {
    var yearSelect = document.getElementById('birth-year');
    if (yearSelect) {
        for (var y = 2010; y >= 1940; y--) {
            var opt = document.createElement('option');
            opt.value = y;
            opt.text = y;
            yearSelect.appendChild(opt);
        }
    }
});

async function submitEmail() {
    var emailInput = document.getElementById('user-email');
    var email = emailInput.value;
    if (!email || !email.includes('@')) {
        alert('Por favor, insira um e-mail válido.');
        return;
    }

    document.querySelectorAll('.quiz-step').forEach(el => el.classList.remove('active'));
    document.getElementById('loading-step').classList.add('active');

    var emailHash = await hashEmail(email);

    // Rastreio do Pinterest (Lead)
    if (window.pintrk) {
        pintrk('track', 'lead', { em: email });
    }

    // ============================================================
    // CONFIGURAÇÃO DE VENDA - AGÊNCIA GEMINI
    // Link de Checkout Kiwify: https://pay.kiwify.com.br/1Mk1Aaa
    // ============================================================
    var checkoutURL = 'https://pay.kiwify.com.br/1Mk1Aaa'; 

    var finalURL = checkoutURL 
        + '?utm_source=pinterest'
        + '&utm_medium=cpc'
        + '&utm_campaign=codigo2026'
        + '&email=' + encodeURIComponent(email)
        + '&external_id=' + emailHash;

    // Redirecionamento após 1.5s para criar percepção de análise cósmica
    setTimeout(function () {
        window.location.href = finalURL;
    }, 1500);
}
