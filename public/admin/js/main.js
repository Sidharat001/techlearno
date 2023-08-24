$('.course_curriculum_secton h5 span, .faq_section h5 span, .certification_section h5 span').on("click", function(e) {
    var colnesection = $(this).closest('.add-blog-details').find('.colnesection');
    var clonedSection = colnesection.clone();
    $(this).closest('.add-blog-details').append(clonedSection);
});












// Get references to the input fields by class name
const titleInput = document.querySelector(".titleclass");
const pagetitleInput = document.querySelector(".pagetitleclass");
const urlInput = document.querySelector(".urlholderclass");

// Url crated fillter   
function generateUrl(text) {
    return text.trim().toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}
// type any title to setmeta uel 
titleInput.addEventListener("input", function() {
    const titleText = titleInput.value;
    pagetitleInput.value = titleText;
    const titleUrl = generateUrl(titleText);
    urlInput.value = titleUrl;
});
// page title fill data to crated url
pagetitleInput.addEventListener("input", function() {
    const pagetitleText = pagetitleInput.value;
    const pagetitleUrl = generateUrl(pagetitleText);
    urlInput.value = pagetitleUrl;
});




// Login and register
const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('loginsecticons');


signUpButton.addEventListener('click', () => {
    container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
    container.classList.remove("right-panel-active");
});