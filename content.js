function generatePassword(length) {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+<>?";
    let password = "";
    for (let i = 0, n = charset.length; i < length; ++i) {
        password += charset.charAt(Math.floor(Math.random() * n));
    }
    return password;
}

function addSuggestButton(field) {
    if (field.nextSibling && field.nextSibling.className === "suggest-password-btn") return;

    const suggestButton = document.createElement('button');
    suggestButton.textContent = "Suggest Password";
    suggestButton.className = "suggest-password-btn";
    suggestButton.style.marginLeft = "10px";
    suggestButton.style.padding = "5px 10px";
    suggestButton.style.cursor = "pointer";

    field.parentNode.insertBefore(suggestButton, field.nextSibling);

    suggestButton.addEventListener('click', () => {
        const password = generatePassword(16);
        field.value = password;

        alert(`Suggested Password: ${password}`);
    });
}

function detectPasswordFields() {
    const passwordFields = document.querySelectorAll('input[type="password"]');
    passwordFields.forEach(field => addSuggestButton(field));
}

const observer = new MutationObserver(detectPasswordFields);

observer.observe(document.body, { childList: true, subtree: true });

detectPasswordFields();