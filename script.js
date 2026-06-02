const sections = document.querySelectorAll("section");
const navbar = document.querySelector("nav");

// transition effect
const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }
        });
    },
    {
        threshold: 0.2
    }
);

sections.forEach((section) => {
    observer.observe(section);
});

window.addEventListener("load", () => {
    navbar.classList.add("show");
});


// FORM SUBMIT
const form = document.getElementById("contactForm");

form.addEventListener("submit", async function(e) {
    e.preventDefault();

    const formData = new FormData(form);

    try {
        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData
        });

        const data = await response.json();

        if (data.success) {

            Swal.fire({
                icon: "success",
                title: "Message Sent!",
                text: "Thanks for contacting me.",
                confirmButtonColor: "#000"
            });

            form.reset();

        } else {

            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!"
            });

        }

    } catch (error) {

        Swal.fire({
            icon: "error",
            title: "Error",
            text: "Failed to send message!"
        });

    }
});