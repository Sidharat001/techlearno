// menu section
const accSingleTriggers = document.querySelectorAll('.js-acc-single-trigger');
accSingleTriggers.forEach(trigger => trigger.addEventListener('click', toggleAccordion));

function toggleAccordion() {
    const items = document.querySelectorAll('.js-acc-item');
    const thisItem = this.parentNode;

    items.forEach(item => {
        if (thisItem == item) {
            thisItem.classList.toggle('is-open');
            return;
        }
        item.classList.remove('is-open');
    });
};

 // Images Upload and select preivew
 function handleFileSelect(event) {
    const input = event.target;
    const imagePreview = document.getElementById('previewImage');
    const removeButton = document.getElementById('removeButton');

    if (input.files && input.files[0]) {
        const reader = new FileReader();

        reader.onload = function(e) {
            imagePreview.src = e.target.result;
            imagePreview.style.display = 'block';
            removeButton.style.display = 'inline-block';
        };

        reader.readAsDataURL(input.files[0]);
    } else {
        imagePreview.src = "#";
        imagePreview.style.display = 'none';
        removeButton.style.display = 'none';
    }
}

function handleRemoveButtonClick(event) {
    const imageInput = document.getElementById('imageInput');
    const imagePreview = document.getElementById('previewImage');
    imageInput.value = ""; // Reset the file input value to clear the selected image
    imagePreview.src = "#";
    imagePreview.style.display = 'none';
    event.target.style.display = 'none';
}

function handleDragOver(event) {
    event.preventDefault();
    event.stopPropagation();
    event.dataTransfer.dropEffect = 'copy';
}

function handleDrop(event) {
    event.preventDefault();
    event.stopPropagation();

    const file = event.dataTransfer.files[0];
    const imageInput = document.getElementById('imageInput');
    imageInput.files = event.dataTransfer.files;
    handleFileSelect(event);
}

document.getElementById('imageInput').addEventListener('change', handleFileSelect);

const imagePreview = document.getElementById('previewImage');
const removeButton = document.getElementById('removeButton');
imagePreview.addEventListener('dragover', handleDragOver);
imagePreview.addEventListener('drop', handleDrop);
removeButton.addEventListener('click', handleRemoveButtonClick);

// Additional code to handle case when the user cancels file selection
document.getElementById('imageInput').addEventListener('click', function() {
    // Use a timeout to wait for the file input value to be updated after the user cancels
    setTimeout(function() {
        handleFileSelect(event);
    }, 100);
});


// Ck Editer
CKEDITOR.replace( 'editor1' );
CKEDITOR.on( 'instanceReady', function( evt )
  {
    var editor = evt.editor;
   
   editor.on('change', function (e) { 
    var contentSpace = editor.ui.space('contents');
    var ckeditorFrameCollection = contentSpace.$.getElementsByTagName('iframe');
    var ckeditorFrame = ckeditorFrameCollection[0];
    var innerDoc = ckeditorFrame.contentDocument;
    var innerDocTextAreaHeight = $(innerDoc.body).height();
    console.log(innerDocTextAreaHeight);
    });
 });
