// ===========================================
// APARTASHOWER SIMULACRO NAVIDEÑO — CONFIG
// ===========================================

const CONFIG = {
    coupleNames: "Nuestro Nuevo Hogar",
    eventTitle: "ApartaShower",
    eventSubtitleBadge: "🎄 Simulacro Navideño · 15 Dic 🎄",
    dateLabel: "Martes 15 de diciembre, 2026",
    time: "6:00 p. m.",
    place: "Conjunto Residencial Balmoral Etapa 2",
    address: "Calle 187 # 15b-21, Bogotá",
    coords: "4.764531136402539,-74.0369122918484",

    // Pon aquí tu número de WhatsApp con indicativo y sin '+' (Ej. "573237231608")
    whatsapp: "3134770973",

    // 15 dic 2026 6:00 PM COT (UTC-5) = 23:00Z del 15 dic a 02:00Z del 16 dic
    calendarStart: "20261215T230000Z",
    calendarEnd: "20261216T020000Z",

    // URL de aplicación web de Google Apps Script
    appsScriptUrl: "https://script.google.com/macros/s/AKfycbw53zNTykNKO1pbixq_wcLVP_BoRTqMBZq4u6v8ksimrL0IspzCw5-fCh9DVrlrDdAFrw/exec"
};


// ===========================================
// LISTA BASE DE REGALOS (Para animación)
// ===========================================

const GIFTS = [
    "Air fryer",
    "Plancha de ropa",
    "Cafetera",
    "Batería de sartenes",
    "Copas de vino",
    "Licuadora",
    "Juego de refractarias",
    "Sanduchera",
    "Juego de tapetes para baño",
    "Exprimidor automático",
    "Juego de cuchillos",
    "Portavinos",
    "Waflera",
    "Florero",
    "Juego de toallas",
    "Picador automático",
    "Organizadores",
    "Portahuevos",
    "Juego de vasos",
    "Carrito de mercado",
    "Olla a presión",
    "Kit de organizadores de alimentos"
];


// ===========================================
// ELEMENTOS Y VARIABLES
// ===========================================

const app = document.getElementById("app");
const clickSound = document.getElementById("clickSound");
const spinSound = document.getElementById("spinSound");
const successSound = document.getElementById("successSound");

let guestName = localStorage.getItem("aparta_guest_name") || "";
let guestGift = localStorage.getItem("aparta_guest_gift") || "";


// ===========================================
// FUNCIONES GENERALES
// ===========================================

function play(audio) {
    if (!audio) return;
    audio.currentTime = 0;
    audio.play().catch(() => {});
}

function stopSpin() {
    if (!spinSound) return;
    spinSound.pause();
    spinSound.currentTime = 0;
}

function safeText(value) {
    return String(value).replace(/[&<>"']/g, char => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[char]);
}

function capitalizeName(value) {
    return value.trim()
        .toLocaleLowerCase("es")
        .split(/\s+/)
        .map(word => word.charAt(0).toLocaleUpperCase("es") + word.slice(1))
        .join(" ");
}


// ===========================================
// ESTRUCTURA PRINCIPAL CON LUCES Y ÁRBOL
// ===========================================

function shell(content) {
    const bulbs = Array.from({ length: 12 }, () => `<span class="bulb"></span>`).join("");

    app.innerHTML = `
        <article class="invite">
            <header class="top-art">
                <div class="lights-bar" aria-hidden="true">${bulbs}</div>

                <svg class="house-mark" viewBox="0 0 100 100" fill="none">
                    <path d="M50 7l2.6 5.5 6 .8-4.4 4.2 1.1 6-5.3-2.9-5.3 2.9 1.1-6-4.4-4.2 6-.8L50 7z" fill="#F6DF9B"/>
                    <path d="M14 48 50 22l36 26" stroke="#FFFDF8" stroke-width="5.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M24 44v40h52V44" stroke="#FFFDF8" stroke-width="5" stroke-linejoin="round"/>
                    <path d="M50 38l-13 16h7l-10 15h32L56 54h7L50 38z" fill="#2E7D4F" stroke="#F6DF9B" stroke-width="2" stroke-linejoin="round"/>
                    <rect x="46.5" y="69" width="7" height="13" rx="1.5" fill="#D4A338"/>
                    <circle cx="47" cy="51" r="2.2" fill="#FF6B6B"/>
                    <circle cx="54" cy="59" r="2.2" fill="#F6DF9B"/>
                    <circle cx="45" cy="63" r="2.2" fill="#FF6B6B"/>
                </svg>

                <div class="eyebrow">${safeText(CONFIG.eventSubtitleBadge)}</div>
                <h1>${safeText(CONFIG.eventTitle)}</h1>
                <p>✨ Simulacro navideño para estrenar y celebrar nuestro hogar ✨</p>
            </header>
            <section class="content">
                ${content}
            </section>
            <footer class="footer">
                🎅 Feliz Navidad y nuevo hogar · ${safeText(CONFIG.coupleNames)} 🎄
            </footer>
        </article>
    `;
}


// ===========================================
// INFORMACIÓN DEL EVENTO
// ===========================================

function eventDetails() {
    return `
        <div class="event-box">
            <h3>🎅 Nos encontramos en Navidad</h3>
            <div class="event-line">
                <span class="symbol">🎄</span>
                <span><strong>${safeText(CONFIG.dateLabel)}</strong> · ${safeText(CONFIG.time)}</span>
            </div>
            <div class="event-line">
                <span class="symbol">📍</span>
                <span>${safeText(CONFIG.place)}<br>${safeText(CONFIG.address)}</span>
            </div>
        </div>
    `;
}


// ===========================================
// PANTALLA INICIAL
// ===========================================

function showHome() {
    shell(`
        <div class="screen">
            <div class="kicker">★ Invitación Decembrina ★</div>
            <h2>¡Llega la Navidad y nuestro Simulacro de ApartaShower!</h2>
            <div class="divider"></div>
            <p>
                Queremos celebrar contigo la magia de diciembre y la alegría de construir nuestro nuevo hogar.
                Ven este 15 de diciembre y descubre qué regalo navideño te tocó.
            </p>
            ${eventDetails()}
            <button class="btn-primary" id="beginBtn">Abrir mi invitación 🎁</button>
            <div class="note">✨ Trae tu mejor espíritu navideño, ¡te esperamos! ✨</div>
        </div>
    `);

    document.getElementById("beginBtn").onclick = () => {
        play(clickSound);
        showName();
    };
}


// ===========================================
// REGISTRO DEL INVITADO
// ===========================================

function showName() {
    shell(`
        <div class="screen">
            <div class="kicker">🎄 Lista de invitados 🎄</div>
            <h2>¿Cómo te llamas?</h2>
            <p>Escribe tu nombre y apellido para reservar tu regalo navideño o consultar el que ya tienes.</p>
            <div class="field">
                <label for="guestName">Tu nombre completo</label>
                <input id="guestName" maxlength="60" autocomplete="name" placeholder="Ej. María Pérez" value="${safeText(guestName)}">
            </div>
            <p class="error" id="nameError" hidden>Por favor, escribe tu nombre y apellido para continuar.</p>
            <button class="btn-primary" id="nameContinue">Continuar ✦</button>
        </div>
    `);

    const input = document.getElementById("guestName");
    input.focus();

    const next = () => {
        const value = input.value.trim();
        if (value.length < 3) {
            document.getElementById("nameError").hidden = false;
            input.focus();
            return;
        }
        play(clickSound);
        guestName = capitalizeName(value);
        localStorage.setItem("aparta_guest_name", guestName);
        showAttendance();
    };

    document.getElementById("nameContinue").onclick = next;
    input.addEventListener("keydown", event => {
        if (event.key === "Enter") next();
    });
}


// ===========================================
// CONFIRMACIÓN DE ASISTENCIA
// ===========================================

function showAttendance() {
    shell(`
        <div class="screen">
            <div class="kicker">✨ Qué alegría tenerte aquí ✨</div>
            <h2>¡Feliz Navidad, ${safeText(guestName)}!</h2>
            <p>Nos haría muy felices compartir contigo esta noche de simulacro navideño.</p>
            <div class="divider"></div>
            <h2 style="font-size:1.42rem">¿Nos acompañas el 15 de diciembre?</h2>
            <button class="btn-primary" id="yesBtn">¡Sí, allí estaré! 🎄</button>
            <button class="btn-light" id="noBtn">Esta vez no podré asistir</button>
        </div>
    `);

    const yesBtn = document.getElementById("yesBtn");
    const noBtn = document.getElementById("noBtn");

    yesBtn.onclick = () => {
        play(clickSound);
        yesBtn.classList.add("loading");
        yesBtn.textContent = "Consultando trineo de regalos...";
        noBtn.classList.add("loading");
        startReservation();
    };

    noBtn.onclick = () => {
        play(clickSound);
        noBtn.classList.add("loading");
        noBtn.textContent = "Enviando respuesta...";
        saveDecline();
    };
}


// ===========================================
// CONEXIÓN CON GOOGLE APPS SCRIPT (JSONP)
// ===========================================

function jsonp(action, params = {}) {
    return new Promise((resolve, reject) => {
        if (!CONFIG.appsScriptUrl) {
            return reject(new Error("Falta configurar la URL de Google Apps Script en app.js."));
        }

        const callbackName = "apartaCallback_" + Date.now() + "_" + Math.floor(Math.random() * 100000);
        const script = document.createElement("script");
        const query = new URLSearchParams({
            action,
            callback: callbackName,
            ...params
        });

        const timeout = setTimeout(() => {
            cleanup();
            reject(new Error("El servidor tardó demasiado en responder. Intenta de nuevo."));
        }, 15000);

        function cleanup() {
            clearTimeout(timeout);
            delete window[callbackName];
            script.remove();
        }

        window[callbackName] = data => {
            cleanup();
            resolve(data);
        };

        script.onerror = () => {
            cleanup();
            reject(new Error("No se pudo conectar con el registro de regalos."));
        };

        script.src = CONFIG.appsScriptUrl + (CONFIG.appsScriptUrl.includes("?") ? "&" : "?") + query.toString();
        document.body.appendChild(script);
    });
}


// ===========================================
// ASIGNACIÓN Y SINCRONIZACIÓN DE REGALOS
// ===========================================

async function startReservation() {
    try {
        const response = await jsonp("reserve", { name: guestName });

        if (!response.ok) {
            if (response.code === "SOLD_OUT") {
                showSoldOut();
                return;
            }
            throw new Error(response.message || "No fue posible asignar el regalo.");
        }

        guestGift = response.gift;
        localStorage.setItem("aparta_guest_gift", guestGift);

        if (response.alreadyAssigned) {
            showResult(true);
        } else {
            spinToGift(guestGift);
        }
    } catch (error) {
        showConnectionError(error.message);
    }
}


// ===========================================
// RULETA DE REGALOS
// ===========================================

function spinToGift(finalGift) {
    shell(`
        <div class="screen">
            <div class="kicker">🎁 Sorpresa de Navidad 🎁</div>
            <h2>¡Abriendo tu regalo asignado!</h2>
            <p>La magia navideña está eligiendo tu detalle para nuestro hogar...</p>
            <div class="slot-shell">
                <div class="slot-window">
                    <div class="slot-reel" id="slotReel"></div>
                </div>
            </div>
            <div class="note">✨ ¡Jo, jo, jo! Ya casi sale tu regalo ✨</div>
        </div>
    `);

    play(spinSound);

    const reel = document.getElementById("slotReel");
    const pool = GIFTS.includes(finalGift) ? GIFTS : [finalGift, ...GIFTS];
    const items = Array.from({ length: 18 }, (_, i) => pool[i % pool.length]);
    items.push(finalGift);

    reel.innerHTML = items.map(gift => `
        <div class="slot-item">🎄 ${safeText(gift)}</div>
    `).join("");

    const target = 18 * 78;
    const started = performance.now();
    const duration = 3600;

    function animate(now) {
        const progress = Math.min((now - started) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 4);
        const position = target * eased;

        reel.style.transform = `translateY(${-position}px)`;

        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            reel.style.transform = `translateY(${-target}px)`;
            stopSpin();
            play(successSound);

            if (window.confetti) {
                confetti({
                    particleCount: 150,
                    spread: 80,
                    colors: ["#b8292f", "#1e4d32", "#d4a338", "#ffffff"],
                    origin: { y: 0.62 }
                });
            }

            setTimeout(() => showResult(false), 900);
        }
    }

    requestAnimationFrame(animate);
}


// ===========================================
// RESULTADO DEL REGALO
// ===========================================

function showResult(returningGuest = false) {
    shell(`
        <div class="screen">
            <div class="kicker">${returningGuest ? "🎄 Tu regalo guardado 🎄" : "🎄 Tu regalo navideño 🎄"}</div>
            <h2>¡Gracias por celebrar esta Navidad con nosotros!</h2>
            <div class="gift-result">
                <div class="gift-icon">🎁</div>
                <div class="small">Tu detalle para el simulacro navideño</div>
                <h3>${safeText(guestGift)}</h3>
            </div>
            <span class="status">🎅 Reservado para ${safeText(guestName)}</span>
            <p>Gracias por ayudarnos a vestir de hogar y Navidad este nuevo comienzo.</p>
            ${eventDetails()}
            <button class="btn-primary" id="calendarBtn">Agregar a Google Calendar 📅</button>
            <div class="btn-row">
                <button class="btn-light" id="mapsBtn">Cómo llegar 📍</button>
                <button class="btn-whatsapp" id="shareBtn">Confirmar WhatsApp</button>
            </div>
            <p class="note">
                ¿Otro invitado va a usar este celular?
                <a href="#" id="resetGuest" style="color: var(--red); font-weight: 700;">Cambiar nombre</a>
            </p>
        </div>
    `);

    document.getElementById("calendarBtn").onclick = addToCalendar;
    document.getElementById("mapsBtn").onclick = openMaps;
    document.getElementById("shareBtn").onclick = shareWhatsApp;

    document.getElementById("resetGuest").onclick = (e) => {
        e.preventDefault();
        localStorage.removeItem("aparta_guest_name");
        localStorage.removeItem("aparta_guest_gift");
        guestName = "";
        guestGift = "";
        showName();
    };
}


// ===========================================
// TODOS LOS REGALOS ASIGNADOS
// ===========================================

function showSoldOut() {
    shell(`
        <div class="screen">
            <div class="kicker">🎄 Gracias por acompañarnos 🎄</div>
            <h2>¡Todos los regalos navideños ya fueron asignados!</h2>
            <p>Aun así te esperamos en nuestro simulacro navideño para brindar y compartir juntos.</p>
            ${eventDetails()}
            <button class="btn-primary" id="calendarBtn">Agregar a Google Calendar 📅</button>
            <button class="btn-light" id="mapsBtn">Cómo llegar 📍</button>
        </div>
    `);

    document.getElementById("calendarBtn").onclick = addToCalendar;
    document.getElementById("mapsBtn").onclick = openMaps;
}


// ===========================================
// ERROR DE CONEXIÓN
// ===========================================

function showConnectionError(message) {
    shell(`
        <div class="screen">
            <div class="kicker">Un momento</div>
            <h2>No pudimos consultar tu regalo</h2>
            <p>${safeText(message)}</p>
            <button class="btn-primary" id="retryBtn">Intentar nuevamente</button>
            <button class="btn-outline" id="backBtn">Volver</button>
        </div>
    `);

    document.getElementById("retryBtn").onclick = startReservation;
    document.getElementById("backBtn").onclick = showAttendance;
}


// ===========================================
// NO ASISTIRÁ
// ===========================================

async function saveDecline() {
    try {
        await jsonp("decline", { name: guestName });
    } catch (error) {
        console.warn(error);
    }

    shell(`
        <div class="screen">
            <div class="kicker">🎄 Gracias por avisarnos 🎄</div>
            <h2>Te vamos a extrañar, ${safeText(guestName)}.</h2>
            <p>¡Te deseamos una muy feliz Navidad y esperamos compartir contigo muy pronto!</p>
        </div>
    `);
}


// ===========================================
// GOOGLE CALENDAR
// ===========================================

function addToCalendar() {
    const params = new URLSearchParams({
        action: "TEMPLATE",
        text: `${CONFIG.eventTitle} - Simulacro Navideño 🎄`,
        dates: `${CONFIG.calendarStart}/${CONFIG.calendarEnd}`,
        details: `¡Feliz Navidad ${guestName}! Tu regalo asignado es: ${guestGift}. Nos vemos el 15 de diciembre a las 6:00 p. m.`,
        location: `${CONFIG.place}, ${CONFIG.address}`
    });

    window.open("https://calendar.google.com/calendar/render?" + params.toString(), "_blank", "noopener");
}


// ===========================================
// GOOGLE MAPS
// ===========================================

function openMaps() {
    const destination = `${CONFIG.place}, ${CONFIG.address}`;
    window.open(
        `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(CONFIG.coords)}`,
        "_blank",
        "noopener"
    );
}


// ===========================================
// WHATSAPP
// ===========================================

function shareWhatsApp() {
    if (!CONFIG.whatsapp || CONFIG.whatsapp === "TU_NUMERO_WHATSAPP") {
        alert("Configura tu número de WhatsApp en CONFIG.whatsapp dentro de app.js.");
        return;
    }

    const message = `🎄 ¡Hola! Soy *${guestName}* y confirmo mi asistencia al *${CONFIG.eventTitle} (Simulacro Navideño)* el 15 de diciembre a las 6:00 p. m.\n\n🎁 Mi regalo asignado es: *${guestGift}*.\n\n¡Nos vemos en Balmoral Etapa 2! ✨`;

    window.open(
        `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(message)}`,
        "_blank",
        "noopener"
    );
}


// ===========================================
// INICIAR APLICACIÓN Y SINCRONIZAR CAMBIOS
// ===========================================

async function init() {
    if (guestName && guestGift) {
        try {
            const response = await jsonp("reserve", { name: guestName });
            if (response && response.ok && response.gift) {
                guestGift = response.gift;
                localStorage.setItem("aparta_guest_gift", guestGift);
            }
        } catch (e) {}
        showResult(true);
    } else {
        showHome();
    }
}

init();