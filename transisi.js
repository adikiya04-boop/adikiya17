/* =========================================================
   TRANSISI / ANIMASI SAAT SCROLL
   Wedding Invitation - Angga & Nur
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /*
     * Elemen yang akan diberi animasi ketika masuk viewport
     */
    const animatedElements = document.querySelectorAll(
        ".section .container > *, " +
        ".person, " +
        ".event-card, " +
        ".countdown div, " +
        ".gallery img, " +
        ".bank-card"
    );


    /*
     * Tambahkan class awal
     */
    animatedElements.forEach(function (element) {

        element.classList.add("scroll-animation");

    });


    /*
     * Observer untuk mendeteksi elemen
     * ketika masuk ke layar
     */
    const observer = new IntersectionObserver(

        function (entries, observer) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "scroll-animation-show"
                    );

                    observer.unobserve(
                        entry.target
                    );

                }

            });

        },

        {
            threshold: 0.15,

            rootMargin:
                "0px 0px -50px 0px"
        }

    );


    /*
     * Jalankan observer
     */
    animatedElements.forEach(function (element) {

        observer.observe(element);

    });


    /*
     * =====================================================
     * ANIMASI KHUSUS GALERI
     * =====================================================
     */

    const galleryImages =
        document.querySelectorAll(
            ".gallery img"
        );


    galleryImages.forEach(
        function (image, index) {

            image.style.transitionDelay =
                (index * 0.12) + "s";

        }
    );


    /*
     * =====================================================
     * ANIMASI KHUSUS KARTU ACARA
     * =====================================================
     */

    const eventCards =
        document.querySelectorAll(
            ".event-card"
        );


    eventCards.forEach(
        function (card, index) {

            card.style.transitionDelay =
                (index * 0.15) + "s";

        }
    );


    /*
     * =====================================================
     * ANIMASI COUNTDOWN
     * =====================================================
     */

    const countdownItems =
        document.querySelectorAll(
            ".countdown div"
        );


    countdownItems.forEach(
        function (item, index) {

            item.style.transitionDelay =
                (index * 0.1) + "s";

        }
    );


    /*
     * =====================================================
     * EFEK PARALLAX RINGAN
     * Untuk bagian hero
     * =====================================================
     */

    const hero =
        document.querySelector(".hero");


    if (hero) {

        window.addEventListener(
            "scroll",
            function () {

                const scrollY =
                    window.pageYOffset;

                const heroHeight =
                    hero.offsetHeight;


                /*
                 * Batasi efek hanya ketika
                 * masih berada di area hero
                 */
                if (
                    scrollY < heroHeight
                ) {

                    const backgroundPosition =
                        "center " +
                        (scrollY * 0.25) +
                        "px";


                    hero.style.backgroundPosition =
                        backgroundPosition;

                }

            }
        );

    }


    /*
     * =====================================================
     * EFEK MOUSE PADA KARTU
     * =====================================================
     */

    const cards =
        document.querySelectorAll(
            ".event-card, .bank-card"
        );


    cards.forEach(
        function (card) {

            card.addEventListener(
                "mousemove",
                function (event) {

                    const rect =
                        card.getBoundingClientRect();


                    const x =
                        event.clientX -
                        rect.left;


                    const y =
                        event.clientY -
                        rect.top;


                    const centerX =
                        rect.width / 2;


                    const centerY =
                        rect.height / 2;


                    const rotateX =
                        ((y - centerY) /
                        centerY) * -2;


                    const rotateY =
                        ((x - centerX) /
                        centerX) * 2;


                    card.style.transform =
                        "perspective(800px) " +
                        "rotateX(" +
                        rotateX +
                        "deg) " +
                        "rotateY(" +
                        rotateY +
                        "deg) " +
                        "translateY(-5px)";

                }
            );


            card.addEventListener(
                "mouseleave",
                function () {

                    card.style.transform =
                        "";

                }
            );

        }
    );


});