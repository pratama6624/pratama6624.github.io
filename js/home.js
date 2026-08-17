        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    "colors": {
                        "primary-container": "#0071e3",
                        "on-tertiary-fixed": "#341000",
                        "on-primary-fixed-variant": "#00458f",
                        "primary": "#0059b5",
                        "on-error": "#ffffff",
                        "surface-variant": "#e4e2e4",
                        "surface-dim": "#dcd9dc",
                        "on-secondary": "#ffffff",
                        "secondary-container": "#e0dfe4",
                        "secondary-fixed": "#e3e2e7",
                        "surface-container-high": "#eae7ea",
                        "surface-container-low": "#f6f3f5",
                        "surface-container-lowest": "#ffffff",
                        "primary-fixed-dim": "#abc7ff",
                        "on-secondary-container": "#626267",
                        "on-background": "#1b1b1d",
                        "on-primary-container": "#fcfbff",
                        "inverse-surface": "#303032",
                        "on-tertiary": "#ffffff",
                        "tertiary-fixed": "#ffdbcb",
                        "surface-container": "#f0edef",
                        "error-container": "#ffdad6",
                        "surface-container-highest": "#e4e2e4",
                        "on-primary": "#ffffff",
                        "outline": "#717785",
                        "on-error-container": "#93000a",
                        "tertiary-fixed-dim": "#ffb693",
                        "on-tertiary-fixed-variant": "#7a3000",
                        "secondary": "#5e5e63",
                        "primary-fixed": "#d7e2ff",
                        "on-secondary-fixed-variant": "#46464b",
                        "inverse-primary": "#abc7ff",
                        "surface": "#fcf8fb",
                        "secondary-fixed-dim": "#c7c6cb",
                        "outline-variant": "#c1c6d6",
                        "inverse-on-surface": "#f3f0f2",
                        "on-surface": "#1b1b1d",
                        "surface-tint": "#005cbb",
                        "tertiary": "#9b3f00",
                        "on-secondary-fixed": "#1a1b1f",
                        "error": "#ba1a1a",
                        "background": "#fcf8fb",
                        "surface-bright": "#fcf8fb",
                        "on-primary-fixed": "#001b3f",
                        "on-tertiary-container": "#fffaf9",
                        "on-surface-variant": "#414753",
                        "tertiary-container": "#c25100"
                    },
                    "borderRadius": {
                        "DEFAULT": "0.25rem",
                        "lg": "0.5rem",
                        "xl": "0.75rem",
                        "full": "9999px"
                    },
                    "spacing": {
                        "container-max": "1200px",
                        "bento-gap": "24px",
                        "gutter": "24px",
                        "margin-desktop": "40px",
                        "margin-mobile": "20px",
                        "section-gap": "120px"
                    },
                    "fontFamily": {
                        "label-sm": ["Inter"],
                        "body-md": ["Inter"],
                        "body-lg": ["Inter"],
                        "label-md": ["Inter"],
                        "display-lg-mobile": ["Inter"],
                        "headline-md": ["Inter"],
                        "display-lg": ["Inter"],
                        "headline-sm": ["Inter"]
                    },
                    "fontSize": {
                        "label-sm": ["12px", { "lineHeight": "1.2", "fontWeight": "600" }],
                        "body-md": ["16px", { "lineHeight": "1.6", "fontWeight": "400" }],
                        "body-lg": ["19px", { "lineHeight": "1.6", "fontWeight": "400" }],
                        "label-md": ["14px", { "lineHeight": "1.2", "letterSpacing": "0.01em", "fontWeight": "500" }],
                        "display-lg-mobile": ["40px", { "lineHeight": "1.2", "letterSpacing": "-0.01em", "fontWeight": "700" }],
                        "headline-md": ["32px", { "lineHeight": "1.3", "letterSpacing": "-0.01em", "fontWeight": "600" }],
                        "display-lg": ["56px", { "lineHeight": "1.1", "letterSpacing": "-0.02em", "fontWeight": "700" }],
                        "headline-sm": ["24px", { "lineHeight": "1.4", "fontWeight": "600" }]
                    }
                }
            }
        }


        document.addEventListener('DOMContentLoaded', () => {
            const observerOptions = {
                root: null,
                /* rootMargin '0px 0px -100px 0px' artinya animasi SUDAH MULAI berjalan 
                   100px sebelum elemen benar-benar sampai di tengah layar */
                rootMargin: '0px 0px -100px 0px',
                threshold: 0
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('active');
                    }
                });
            }, observerOptions);

            document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
        });