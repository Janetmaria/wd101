document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("registration-form");
    const tableBody = document.getElementById("table-body");
    const dobInput = document.getElementById("dob");
    const ageError = document.getElementById("age-error");

    // Clear table on page refresh
    localStorage.removeItem("formData");

    function validateDOB(dob) {
        let birthDate = new Date(dob);
        let today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        let monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) age--;
        return age >= 18 && age <= 55;
    }

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        let name = document.getElementById("name").value.trim();
        let email = document.getElementById("email").value.trim();
        let password = document.getElementById("password").value.trim();
        let dob = dobInput.value;
        let acceptedTerms = document.getElementById("terms").checked; // true if checked, false otherwise

        if (!validateDOB(dob)) {
            ageError.style.display = "block";
            return;
        } else ageError.style.display = "none";

        let formData = { name, email, password, dob, acceptedTerms };

        addRowToTable(formData);
        form.reset();
    });

    function addRowToTable(data) {
        let row = document.createElement("tr");
        row.innerHTML = `<td>${data.name}</td><td>${data.email}</td><td>${data.password}</td><td>${data.dob}</td><td>${data.acceptedTerms}</td>`;
        tableBody.appendChild(row);
    }
});
