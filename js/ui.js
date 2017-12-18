$("#new_card").focus();

$('#new_card').on('keypress', function (e) {
    if(e.which === 13) {
        var value = $(this).val();
        if(value)
        {
            //Disable textbox to prevent multiple submit
            $(this).attr("disabled", "disabled");

            RegisterCard(parseInt(value));
            $(this).val(null);

            //Enable the textbox again if needed.
            $(this).removeAttr("disabled");

            $(this).focus();
        }
    }
});

$('#check_card').on('keypress', function (e) {
    if(e.which === 13) {
        var value = $(this).val();
        if(value && value != '0')
        {
            //Disable textbox to prevent multiple submit
            $(this).attr("disabled", "disabled");

            ReadCard(String(value));
            $(this).val(null);

            //Enable the textbox again if needed.
            $(this).removeAttr("disabled");

            $(this).focus();
        }
    }
});
