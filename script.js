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
        document.getElementById('progress-bar').style.width = `${progress}%`;
    }

    const nextEl = document.querySelector(`.quiz-step[data-step="${targetStep}"]`);
    if (nextEl) {
        nextEl.classList.add('active');
        window.scrollTo(0, 0); // Garante que no celular o topo da pergunta apareça
    }
}

// Popular os anos de forma segura ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    const yearSelect = document.getElementById('birth-year');
    if (yearSelect) {
        for (let y = 2010; y >= 1940; y--) {
            const opt = document.createElement('option');
            opt.value = y;
            opt.innerHTML = y;
            yearSelect.appendChild(opt);
        }
    }
});

async function submitEmail() {
    const emailInput = document.getElementById('user-email');
    const email = emailInput.value;
    if (!email || !email.includes('@')) {
        alert('Please enter a valid email address.');
        return;
    }

    // Hide optin and show loader instantly
    document.querySelectorAll('.quiz-step').forEach(el => el.classList.remove('active'));
    document.getElementById('loading-step').classList.add('active');

    // Execute Hashing and Tracking in Background
    const emailHash = await hashEmail(email);

    if (window.pintrk) {
        pintrk('track', 'lead', { em: email });
    }

    // Build Premium Redirection URL
    const baseAffiliate = "https://a.moonmystical.com/optin1724860719225";
    const utmParams = `?utm_source=pinterest&utm_medium=cpc&utm_campaign=quantum_v4&subid=${emailHash}`;
    const anchor = "&aff=jefersonkeko15e9cd";

    const finalURL = baseAffiliate + utmParams + anchor;

    // Redirection with 1.5s delay for value perception
    setTimeout(() => {
        window.location.href = finalURL;
    }, 1500);
}
