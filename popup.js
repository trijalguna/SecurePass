document.getElementById("checkButton").addEventListener("click", function() {
    const password = document.getElementById("passwordInput").value;

    const strength = checkPasswordStrength(password);
    document.getElementById("strengthOutput").innerText = `Strength: ${strength}`;

    chrome.runtime.sendMessage({ action: "logMessage", message: password }, (response) => {
        console.log(response.status);
    });

    checkVulnerability(password);
});

document.getElementById("generateButton").addEventListener("click", function() {
    const password = generatePassword(16);
    document.getElementById("passwordInput").value = password;
    document.getElementById("strengthOutput").innerText = `Generated Password: ${password}`;
});

function checkPasswordStrength(password) {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength++;

    if (strength <= 2) return "Weak";
    if (strength === 3 || strength === 4) return "Medium";
    return "Strong";
}

function checkVulnerability(password) {
    const hashedPassword = sha1(password);
    fetch(`https://api.pwnedpasswords.com/range/${hashedPassword.slice(0, 5)}`)
        .then(response => response.text())
        .then(data => {
            const suffix = hashedPassword.slice(5).toUpperCase();
            const found = data.includes(suffix);
            document.getElementById("vulnerabilityOutput").innerText = 
                found ? "Warning: Password found in data breaches!" : "Safe: Password not found in breaches.";
        })
        .catch(error => {
            document.getElementById("vulnerabilityOutput").innerText = "Error checking vulnerability.";
        });
}

function sha1(msg) {
    const hash = CryptoJS.SHA1(msg);
    return hash.toString();
}

function generatePassword(length) {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+<>?";
    let password = "";
    for (let i = 0, n = charset.length; i < length; ++i) {
        password += charset.charAt(Math.floor(Math.random() * n));
    }
    return password;
}