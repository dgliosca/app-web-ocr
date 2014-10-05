$(document).ready(function() {

    function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                $('#previewImage').attr('src', e.target.result);
        };
        reader.readAsDataURL(input.files[0]);
    }
}

    $("#image").change(function(){
        readURL(this);
    });

    $('#form').submit(function (e) {
        e.preventDefault();
        var fd = new FormData($(this)[0]);
        $.ajax({
            url: '/uploadFile',
            data: fd,
            processData: false,
            contentType: false,
            type: 'POST',
            success: function(data){
                console.log(data);
                $("#result").text(data.text);
            }
        });
    });
});