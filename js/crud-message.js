/**
 * endpoint donde se va consumir la api rest
 */
 const endpoint = "https://gddcc2b21654e21-mintic.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/message/message";


function traerInformacion(){
    $.ajax({
        url:endpoint,
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            $("#resultado").empty();
            $("#id").val("");
            $("#messagetext").val("");
            pintarRespuesta(respuesta.items);
        }
    });
}

function guardarInformacion(){
    let data = {
        id:$("#id").val(),
        messagetext:$("#messagetext").val(),
    };
    $.ajax({
        url:endpoint,
        type:"POST",
        data:data,
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado").empty();
            $("#id").val("");
            $("#messagetext").val("");
            traerInformacion();
            alert("Datos guardados");
        }
    });
}

function editarInformacion(){
    let data = {
        id:$("#id").val(),
        messagetext:$("#messagetext").val(),
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
            $("#messagetext").val("");
            traerInformacion();
            alert("Datos actualizados");
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
            alert("Datos eliminados");
        }
    });
}

function pintarRespuesta(items){
    let table = "<table><tr><th>{id}</th><th>{messagetext}</th><th>Acción</th></tr>";
    for(i=0;i<items.length;i++){
        table += "<tr>";
        table += "<td>"+items[i].id+"</td>";
        table += "<td>"+items[i].messagetext+"</td>";
        table += "<td> <button onclick='borrarInformacion("+items[i].id+")'>Borrar</button></td>";
        table += "</tr>";
    }
    table+="</table";
    $("#resultado").append(table);
}
