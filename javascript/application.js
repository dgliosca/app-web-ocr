$(document).ready(function() {

    function readURL(input) {
        if (input.files[0].type != "image/jpeg") {
            $('#error').text("Only jpeg format allowed");
        } else {
            if (input.files && input.files[0]) {
                var reader = new FileReader();
                reader.onload = function (e) {
                    $('#error').remove();
                    $('#previewImage').attr('src', e.target.result);
                };
                reader.readAsDataURL(input.files[0]);
            }
        }
    }

    $("#image").change(function(){
        readURL(this);
    });

    $('#form').submit(function (e) {
        e.preventDefault();
        var formData = new FormData($(this)[0]);
        $.ajax({
            url: '/uploadFile',
            data: formData,
            processData: false,
            contentType: false,
            type: 'POST',
            success: function(data){
                $("#result").text(data.text);
            }
        });
    });

    $('#webcam').fileapi({
        url: 'http://rubaxa.org/FileAPI/server/ctrl.php',
        accept: 'image/*',
        autoUpload: true,
        elements: {
            active: { show: '.js-upload', hide: '.js-webcam' },
            preview: {
                el: '.js-preview',
                width: 200,
                height: 200
            },
            progress: '.js-progress'
        }
    });
    $('.js-webcam', '#webcam').click(function (evt){
        var modal = $('#popup').modal({
            closeOnOverlayClick: false,
            onOpen: function (overlay){
                $('.js-img', overlay).webcam({
                    width: 320,
                    height: 240,
                    error: function (err){
                        // err — https://developer.mozilla.org/en-US/docs/Web/API/Navigator.getUserMedia
                        $.modal().close();
                        alert("Unfortunately, your browser does not support webcam.");
                    },
                    success: function (webcam){
                        $(overlay).on('click', '.js-upload', function (){
                            $('#webcam').fileapi('add', webcam.shot());
                            modal.close();
                        });
                    }
                });
            },
            onClose: function (overlay){
                $('.js-img', overlay).webcam('destroy');
            }
        });
        modal.open();
        evt.preventDefault();
    });
});