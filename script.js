/* =========================================================
   NAMA TAMU
========================================================= */

const params = new URLSearchParams(
    window.location.search
);

const guest = params.get("to");

if (guest) {
    document.getElementById("guestName").textContent =
        decodeURIComponent(
            guest.replace(/\+/g, " ")
        );
}


/* =========================================================
   BUKA UNDANGAN + MUSIK
========================================================= */

const openButton =
    document.getElementById("openInvitation");

const opening =
    document.getElementById("opening");

const mainContent =
    document.getElementById("mainContent");

const music =
    document.getElementById("weddingMusic");


openButton.addEventListener(
    "click",
    async function () {

        /* Sembunyikan cover */
        opening.style.display = "none";

        /* Tampilkan isi undangan */
        mainContent.classList.remove("hidden");

        /* Putar musik */
        if (music) {

            try {

                await music.play();

            } catch (error) {

                console.log(
                    "Musik tidak dapat diputar otomatis.",
                    error
                );

            }

        }

        /* Kembali ke posisi paling atas */
        window.scrollTo(0, 0);

    }
);


/* =========================================================
   TOMBOL MUSIK
========================================================= */

const musicButton =
    document.getElementById("musicButton");


if (musicButton && music) {

    musicButton.addEventListener(
        "click",
        async function () {

            if (music.paused) {

                try {

                    await music.play();

                    musicButton.textContent = "♫";

                } catch (error) {

                    console.log(
                        "Musik gagal diputar.",
                        error
                    );

                }

            } else {

                music.pause();

                musicButton.textContent = "🔇";

            }

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


    if (distance <= 0) {

        document.getElementById("days").textContent = 0;
        document.getElementById("hours").textContent = 0;
        document.getElementById("minutes").textContent = 0;
        document.getElementById("seconds").textContent = 0;

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


    document.getElementById("days").textContent =
        days;

    document.getElementById("hours").textContent =
        hours;

    document.getElementById("minutes").textContent =
        minutes;

    document.getElementById("seconds").textContent =
        seconds;

}


updateCountdown();

setInterval(
    updateCountdown,
    1000
);


/* =========================================================
   WHATSAPP RSVP
========================================================= */

const whatsappNumber =
    "6281234567890";


const guestName =
    document.getElementById(
        "guestName"
    ).textContent;


const message =
    `Assalamu'alaikum, saya ${guestName}. Saya ingin mengonfirmasi kehadiran pada acara pernikahan Adi & Kiya.`;


const whatsappLink =
    "https://wa.me/" +
    whatsappNumber +
    "?text=" +
    encodeURIComponent(message);


document.getElementById(
    "whatsappButton"
).href =
    whatsappLink;


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


            try {

                await navigator
                    .clipboard
                    .writeText(number);


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
