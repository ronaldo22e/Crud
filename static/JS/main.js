// main.js

$(document).ready(function() {
   
    cargarDatos();
   
});
function cargarDatos() {
    $.ajax({
        url: 'http://localhost:8080/Api/personas', 
        dataType: 'json',
        success: function(data) {
         
            mostrarDatosEnTabla(data);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log('Error en la solicitud AJAX:', textStatus, errorThrown);
        }
    });
}


function mostrarDatosEnTabla(datos) {
    var tabla = $('#tabla-artistas');

    
    tabla.empty();

  
    $.each(datos, function(index, artista) {
        var fila = '<tr>' +
            '<td>' + artista.nombre + '</td>' +
            '<td>' + artista.genero + '</td>' +
            '<td>' + artista.descripcion + '</td>' +
         
           
            '<td><button class="btn btn-danger" onclick="eliminar(' + artista.id + ')">eliminar</button></td>' +
        
            '<td><button class="btn btn-primary" onclick="cargarDatosParaEditar(' + artista.id + ')">actualizar</button></td>'



            '</tr>';
        tabla.append(fila);
    });
}


function crearPersona(id) {
    if (id) {
        actualizar(id);
    } else {
        var nuevaPersona = {
            nombre: $('#nombre').val(),
            genero: $('#genero').val(),
            descripcion: $('#descripcion').val()
        };

        $.ajax({
            url: 'http://localhost:8080/Api/personas',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(nuevaPersona),
            success: function(response) {
                alert('Persona creada exitosamente');
                cargarDatos();
                limpiarFormulario();
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log('Error en la solicitud AJAX:', textStatus, errorThrown);
            }
        });
    }
}

function actualizar(id) {
    var actualizarDatos = {
        nombre: $('#nombre').val(),
        genero: $('#genero').val(),
        descripcion: $('#descripcion').val()
    };

    $.ajax({
        url: 'http://localhost:8080/Api/personas/actualizar/' + id,
        type: 'PUT',
        data: JSON.stringify(actualizarDatos),
        contentType: 'application/json',
        success: function(response) {
            alert('Persona actualizada exitosamente');
            cargarDatos();
            limpiarFormulario();
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log('Error en la solicitud AJAX:', textStatus, errorThrown);
        }
    });
}


function eliminar(id) {
    if (confirm('¿Estás seguro de que deseas eliminar el registro?')) {
        $.ajax({
            url: 'http://localhost:8080/Api/personas/eliminar/' + id, 
            type: 'DELETE',
            success: function(response) {
                alert('Persona eliminada exitosamente');
                cargarDatos(); 
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log('Error en la solicitud AJAX:', textStatus, errorThrown);
            }
        });
    }
}



function limpiarFormulario() {
    $('#id').val('');
    $('#nombre').val('');
    $('#genero').val('');
    $('#descripcion').val('');

    $('#btnCrear').text('Crear');
    $('#btnCrear').attr('onclick', 'crearPersona()');
}
function mostrarDatosParaEditar(id) {
    $.ajax({
        url: 'http://localhost:8080/Api/personas/' + id, 
        type: 'GET',
        dataType: 'json',
        success: function(data) {
            if (data) {
                $('#id').val(data.id);
                $('#nombre').val(data.nombre);
                $('#genero').val(data.genero);
                $('#descripcion').val(data.descripcion);

               
                cargarDatosParaEditar(id);
            } else {
                alert('No se encontraron datos para editar.');
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log('Error en la solicitud AJAX:', textStatus, errorThrown);
        }
    });
}


function cargarDatosParaEditar(id) {
    $.ajax({
        url: 'http://localhost:8080/Api/personas/' + id, 
        type: 'GET',
        dataType: 'json',
        success: function(data) {
            if (data) {
                $('#id').val(data.id);
                $('#nombre').val(data.nombre);
                $('#genero').val(data.genero);
                $('#descripcion').val(data.descripcion);

                $('#btnCrear').attr('onclick', 'actualizar(' + id + ')');

                $('#staticBackdropLabel').text('Editar Persona');
                $('#staticBackdrop').modal('show');
            } else {
                alert('No se encontraron datos para editar.');
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log('Error en la solicitud AJAX:', textStatus, errorThrown);
        }
    });
}





