/* =========================================================
NAMA TAMU
========================================================= */

const params = new URLSearchParams(window.location.search);

const guest = params.get("to");

const guestNameElement =
document.getElementById("guestName");

if (guest && guestNameElement) {

guestNameElement.textContent =
    guest.replace(/\+/g, " ");

}

/* =========================================================
ELEMEN UTAMA
========================================================= */

const openButton =
document.getElementById("openInvitation");

const opening =
document.getElementById("opening");

const mainContent =
document.getElementById("mainContent");

const music =
document.getElementById("weddingMusic");

const musicButton =
document.getElementById("musicButton");

/* =========================================================
BUKA UNDANGAN + MUSIK
========================================================= */

if (openButton && opening && mainContent) {

openButton.addEventListener(
    "click",
    async function () {

        /* Sembunyikan halaman pembuka */
        opening.style.display = "none";

        /* Tampilkan isi undangan */
        mainContent.classList.remove("hidden");

        /* Kembali ke posisi paling atas */
        window.scrollTo({
            top: 0,
            behavior: "instant"
        });

        /* Putar musik */
        if (music) {

            try {

                await music.play();

                if (musicButton) {

                    musicButton.textContent = "♫";

                    musicButton.classList.add(
                        "playing"
                    );

                }

            } catch (error) {

                console.log(
                    "Musik tidak dapat diputar otomatis.",
                    error
                );

            }

        }

    }
);

}

/* =========================================================
TOMBOL MUSIK
========================================================= */

if (musicButton && music) {

musicButton.addEventListener(
    "click",
    async function () {

        if (music.paused) {

            try {

                await music.play();

                musicButton.textContent = "♫";

                musicButton.classList.add(
                    "playing"
                );

            } catch (error) {

                console.log(
                    "Musik gagal diputar.",
                    error
                );

            }

        } else {

            music.pause();

            musicButton.textContent = "🔇";

            musicButton.classList.remove(
                "playing"
            );

        }

    }
);


/* Sinkronisasi jika audio berubah */
music.addEventListener(
    "play",
    function () {

        musicButton.textContent = "♫";

        musicButton.classList.add(
            "playing"
        );

    }
);


music.addEventListener(
    "pause",
    function () {

        musicButton.textContent = "🔇";

        musicButton.classList.remove(
            "playing"
        );

    }
);

}

/* =========================================================
COUNTDOWN
========================================================= */

const weddingDate =
new Date(
"2026-10-17T08:00:00+07:00"
).getTime();

function updateCountdown() {

const now =
    new Date().getTime();

const distance =
    weddingDate - now;


const daysElement =
    document.getElementById("days");

const hoursElement =
    document.getElementById("hours");

const minutesElement =
    document.getElementById("minutes");

const secondsElement =
    document.getElementById("seconds");


if (
    !daysElement ||
    !hoursElement ||
    !minutesElement ||
    !secondsElement
) {

    return;

}


if (distance <= 0) {

    daysElement.textContent = "0";
    hoursElement.textContent = "0";
    minutesElement.textContent = "0";
    secondsElement.textContent = "0";

    return;

}


const days =
    Math.floor(
        distance /
        (1000 * 60 * 60 * 24)
    );


const hours =
    Math.floor(
        (distance /
            (1000 * 60 * 60))
        % 24
    );


const minutes =
    Math.floor(
        (distance /
            (1000 * 60))
        % 60
    );


const seconds =
    Math.floor(
        (distance / 1000)
        % 60
    );


daysElement.textContent =
    days;

hoursElement.textContent =
    String(hours).padStart(2, "0");

minutesElement.textContent =
    String(minutes).padStart(2, "0");

secondsElement.textContent =
    String(seconds).padStart(2, "0");

}

updateCountdown();

setInterval(
updateCountdown,
1000
);

/* =========================================================
WHATSAPP RSVP
========================================================= */

/*
GANTI NOMOR INI DENGAN NOMOR WHATSAPP TUJUAN.

Format:
628xxxxxxxxxx

Jangan gunakan:
+62
spasi
tanda -
*/

const whatsappNumber =
"6281336301291";

const currentGuestName =
guestNameElement
? guestNameElement.textContent
: "Tamu Undangan";

const message =
"Assalamu'alaikum, saya ${currentGuestName}. Saya ingin mengonfirmasi kehadiran pada acara pernikahan Angga & Nur.";

const whatsappLink =
"https://wa.me/" +
whatsappNumber +
"?text=" +
encodeURIComponent(message);

const whatsappButton =
document.getElementById(
"whatsappButton"
);

if (whatsappButton) {

whatsappButton.href =
    whatsappLink;

}

/* =========================================================
COPY REKENING
========================================================= */

const copyButton =
document.querySelector(
".copy-button"
);

if (copyButton) {

copyButton.addEventListener(
    "click",
    async function () {

        const number =
            this.dataset.copy;


        if (!number) {

            return;

        }


        try {

            await navigator.clipboard.writeText(
                number
            );


            this.textContent =
                "Berhasil Disalin ✓";


            setTimeout(
                () => {

                    this.textContent =
                        "Salin Nomor Rekening";

                },
                2000
            );


        } catch (error) {

            alert(
                "Nomor rekening: " +
                number
            );

        }

    }
);

}
