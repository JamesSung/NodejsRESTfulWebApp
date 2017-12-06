function deleteUser(id) {

    console.log(id);
    $.ajax({
        type: 'DELETE',
        //data: 'id=' + id,
        crossDomain: true,
        url: 'http://localhost:3000/users/'+id,
        success: function(result){
            console.log(result.data);
            if(result.error)
                alert(result.message);
            else
                loadUsers(result.data);
        }
    });

}

function modifyUser(id, first_name, last_name, email) {
    $("#mod_id").val(id);
    $("#mod_first_name").val(first_name);
    $("#mod_last_name").val(last_name);
    $("#mod_email").val(email);
}

$(function() {
        // form population
        $.ajax({
            type: 'GET',
            processData: false,
            crossDomain: true,
            url: 'http://localhost:3000/users/',
            success: function(result){
                console.log(result.data);
                if(result.error)
                    alert(result.message);
                else
                    loadUsers(result.data);
            }
        });

        var validator = $('#user_add_form').validate({
            rules: { 
               },
               messages: {
               },
            ignore: '.ignore-this',
            submitHandler: function(form) {
                console.log(form.first_name.value + ',' + form.last_name.value + ',' + form.email.value);
                
                var ajaxOptions = {
                    type: 'POST',
                    crossDomain: true,
                    url: 'http://localhost:3000/users/',
                    error: function(jqXHR, textStatus, errorThrown) {
                        //console.log('Error: ' + errorThrown);
                        //console.log('jqXHR: ' + jqXHR);
                        //console.log('textStatus: ' + textStatus);
                        alert("An error has occured");
                    },
                    success: function(result, status, xhr) {
                        if(result.error)
                            alert(result.message);
                        else
                            loadUsers(result.data);
                        //console.log(result);

                    }
                };
                $(form).ajaxSubmit(ajaxOptions);
                $("#add_first_name").val("");
                $("#add_last_name").val("");
                $("#add_email").val("");
            }
    
    });

    var validator_mod = $('#user_mod_form').validate({
        rules: { 
           },
           messages: {
           },
        ignore: '.ignore-this',
        submitHandler: function(form) {
            console.log(form.first_name + ',' + form.last_name + ',' + form.email);
            var ajaxOptions = {
                type: 'PUT',
                //data: 'id=' + form.id.value + '&first_name=' + form.first_name.value + '&last_name=' + form.last_name.value + '&email='+ form.email.value,
                crossDomain: true,
                url: 'http://localhost:3000/users/',
                error: function(jqXHR, textStatus, errorThrown) {
                    alert("An error has occured");
                },
                success: function(result, status, xhr) {
                    if(result.error)
                        alert(result.message);
                    else
                        loadUsers(result.data);
                    //console.log(result);

                }
            };
            $(form).ajaxSubmit(ajaxOptions);
            $("#mod_id").val("");
            $("#mod_first_name").val("");
            $("#mod_last_name").val("");
            $("#mod_email").val("");
        }

    });

});

function loadUsers(result){
    if(result != '') {
                    var jsondata = result;//JSON.parse(result);
                    
                    var htmlList, html;
                    htmlList = '<table>';
                    htmlList += '<thead>';
                    htmlList += '<tr><th>ID</th><th>First Name</th><th>Last Name</th><th>Email</th><th></th></tr>';
                    htmlList += ' </thead><tbody>';

                    console.log(jsondata.rows);
                    $.each(jsondata.rows, function(index, user) {

                        html = '<tr id="list_tr">';
                        html += '<td>' + user.id + '</td>';
                        html += '<td>' + user.first_name + '</td>';
                        html += '<td>' + user.last_name + '</td>';
                        html += '<td>' + user.email + '</td>';
                        html += '<td><a href="javascript:modifyUser(\'' + user.id + '\',\'' + user.first_name + '\',\'' + user.last_name + '\',\'' + user.email + '\')"><input type="button" value="Modify"></a>';
                        html += '    <a href="javascript:deleteUser(\'' + user.id + '\')"><input type="button" value="Delete"></a></td>';
                        html += '</tr>';

                        htmlList += html;
                    });
                    htmlList += '</tbody></table>';
                    //console.log(htmlList);

                    $('#ajax_list').html(htmlList);

                }
}

