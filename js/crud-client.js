/**
 * endpoint donde se va consumir la api rest
 */
 const endpoint = "https://gddcc2b21654e21-mintic.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/client/client";


function traerInformacion(){
    $.ajax({
        url:endpoint,
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            $("#resultado").empty();
            $("#id").val("");
            $("#name").val("");
            $("#email").val("");
            $("#age").val("");            
            pintarRespuesta(respuesta.items);
        },
        error:function (error) {

        }
    });
}

function guardarInformacion(){
    let data = {
        id:$("#id").val(),
        name:$("#name").val(),
        email:$("#email").val(),
        age:$("#age").val(),
    };
    $.ajax({
        url:endpoint,
        type:"POST",
        data:data,
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado").empty();
            $("#id").val("");
            $("#name").val("");
            $("#email").val("");
            $("#age").val("");    
            traerInformacion();
            console.log("Datos guardados");
        },
        error:function (error) {

        }
    });
}

function editarInformacion(){
    let data = {
        id:$("#id").val(),
        name:$("#name").val(),
        email:$("#email").val(),
        age:$("#age").val(),
    };
    let dataToSend = JSON.stringify(data);
    $.ajax({
        url:endpoint,
        type:"PUT",
        data:dataToSend,
        contentType:"application/json",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado").empty();
            $("#id").val("");
            $("#name").val("");
            $("#email").val("");
            $("#age").val("");    
            traerInformacion();
            console.log("Datos actualizados");
        },
        error:function (error) {

        }
    });
}

function borrarInformacion(idElemento){
    let data = {
        id:idElemento
    };
    let dataToSend = JSON.stringify(data);
    $.ajax({
        url:endpoint,
        type:"DELETE",
        data:dataToSend,
        contentType:"application/json",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado").empty();
            traerInformacion();
            console.log("Datos eliminados");
        },
        error:function (error) {

        }
    });
}

function pintarRespuesta(items){
    let table = "<table><tr><th>{id}</th><th>{name}</th><th>{email}</th><th>{age}</th><th>Acción</th></tr>";
    for(i=0;i<items.length;i++){
        table += "<tr>";
        table += "<td>"+items[i].id+"</td>";
        table += "<td>"+items[i].name+"</td>";
        table += "<td>"+items[i].email+"</td>";
        table += "<td>"+items[i].age+"</td>";
        table += "<td> <button onclick='borrarInformacion("+items[i].id+")'>Borrar</button></td>";
        table += "</tr>";
    }
    table+="</table";
    $("#resultado").append(table);
}
