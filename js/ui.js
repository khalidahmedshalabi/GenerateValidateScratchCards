$('#new_card').on('keypress', function (e) {
     if(e.which === 13) {
         //Disable textbox to prevent multiple submit
        $(this).attr("disabled", "disabled");

        RegisterCard(parseInt($(this).val()));
        $(this).val(null);

        //Enable the textbox again if needed.
        $(this).removeAttr("disabled");

        $(this).focus();
     }
});

$('#check_card').on('keypress', function (e) {
     if(e.which === 13) {
         //Disable textbox to prevent multiple submit
        $(this).attr("disabled", "disabled");

        ReadCard(String($(this).val()));
        $(this).val(null);

        //Enable the textbox again if needed.
        $(this).removeAttr("disabled");

        $(this).focus();
     }
});
