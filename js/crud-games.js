/**
 * endpoint donde se va consumir la api rest
 */
 const endpoint = "https://gddcc2b21654e21-mintic.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/games/games";


function traerInformacion(){
    $.ajax({
        url:endpoint,
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            $("#resultado").empty();
            $("#id").val("");
            $("#developer").val("");
            $("#minage").val("");
            $("#category_id").val("");
            $("#name").val("");            
            pintarRespuesta(respuesta.items);
        }
    });
}

function guardarInformacion(){
    let data = {
        id:$("#id").val(),
        developer:$("#developer").val(),
        minage:$("#minage").val(),
        category_id:$("#category_id").val(),
        name:$("#name").val(),
    };
    $.ajax({
        url:endpoint,
        type:"POST",
        data:data,
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado").empty();
            $("#id").val("");
            $("#developer").val("");
            $("#minage").val("");
            $("#category_id").val("");
            $("#name").val("");
            traerInformacion();
            alert("Datos guardados");
        }
    });
}

function editarInformacion(){
    let data = {
        id:$("#id").val(),
        developer:$("#developer").val(),
        minage:$("#minage").val(),
        category_id:$("#category_id").val(),
        name:$("#name").val(),
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
            $("#developer").val("");
            $("#minage").val("");
            $("#category_id").val("");
            $("#name").val("");
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
    let table = "<table><tr><th>{id}</th><th>{developer}</th><th>{minage}</th><th>{category_id}</th><th>{name}</th><th>Acción</th></tr>";
    for(i=0;i<items.length;i++){
        table += "<tr>";
        table += "<td>"+items[i].id+"</td>";
        table += "<td>"+items[i].developer+"</td>";
        table += "<td>"+items[i].minage+"</td>";
        table += "<td>"+items[i].category_id+"</td>";
        table += "<td>"+items[i].name+"</td>";
        table += "<td> <button onclick='borrarInformacion("+items[i].id+")'>Borrar</button></td>";
        table += "</tr>";
    }
    table+="</table";
    $("#resultado").append(table);
}
