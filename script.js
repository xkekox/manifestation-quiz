async function hashEmail(email) {
    const encoder = new TextEncoder();
    const data = encoder.encode(email.trim().toLowerCase());
    const hash = await crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join('');
}

function nextStep(step) {
    document.querySelectorAll('.quiz-step').forEach(el => el.classList.remove('active'));
    const nextEl = document.querySelector(.quiz-step[data-step="\"]);
    if (nextEl) nextEl.classList.add('active');
}

async function submitEmail() {
    const emailInput = document.getElementById('user-email');
    const email = emailInput.value;
    if (!email || !email.includes('@')) {
        alert('Please enter a valid email address.');
        return;
    }

    const emailHash = await hashEmail(email);

    // PINTEREST LEAD EVENT (ENHANCED MATCH)
    if (window.pintrk) {
        pintrk('track', 'lead', { em: email });
    }

    // Loader logic
    document.querySelectorAll('.quiz-step').forEach(el => el.classList.remove('active'));
    document.getElementById('loading-step').classList.add('active');

    // AFFILIATE REDIRECTION WITH UTMs & HASH
    const baseAffiliate = "https://a.moonmystical.com/optin1724860719225";
    const utmParams = ?utm_source=pinterest&utm_medium=cpc&utm_campaign=manifestation_quiz&subid=\;
    const anchor = "#aff=jefersonkeko15e9cd";
    
    const finalURL = baseAffiliate + utmParams + anchor;

    setTimeout(() => {
        window.location.href = finalURL;
    }, 2000);
}
