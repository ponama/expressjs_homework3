$( document ).ready(function() {
    var but = $("#but");
    var name = $("#name");
    var body = $("#body");
    var form = $('form');

    but.on('click', function(){
    	if(name.val() <1 || body.val() < 1){
			but.prop('disabled', 'disabled');   
			form.after("<small>more than one letter required</small>");	    
    	}
    	name.on('keypress', function(){
    		but.prop('disabled', false); 
    		$( "small" ).remove();
    	});
    	body.on('keypress', function(){
    		but.prop('disabled', false);
    		$( "small" ).remove(); 
    	});
    });

    form.submit(function(e){
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: '/',
            dataType: "json",
            data: form.serialize(),
            success: function(data){
	           	form.after(data.name + ' ' + data.body);
	        }
        });
    });   
});