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
});