var UrlPedidos = 'http://52.152.236.67:90/G4_20/controller/pedido_proveedor.php?op=GetPedidos';
var UrlPostPedidos = 'http://52.152.236.67:90/G4_20/controller/pedido_proveedor.php?op=InsertPedido';
var UrlGetPedido = 'http://52.152.236.67:90/G4_20/controller/pedido_proveedor.php?op=GetPedido';
var UrlPutPedido = 'http://52.152.236.67:90/G4_20/controller/pedido_proveedor.php?op=UpdatePedido';
var UrlDeletePedido = 'http://52.152.236.67:90/G4_20/controller/pedido_proveedor.php?op=DeletePedido';

$(document).ready(function(){
    CargarPedidos();
});

function CargarPedidos(){
    $.ajax({
        url: UrlPedidos,
        type: 'GET',
        datatype: 'JSON',
        success: function(response){
            var MiItems = response;
            var Valores='';

            for(i=0; i < MiItems.length; i++){
                Valores += '<tr>'+
                '<td>'+MiItems[i].ID+'</td>'+
                '<td>'+MiItems[i].ID_SOCIO+'</td>'+
                '<td>'+MiItems[i].FECHA_PEDIDO+'</td>'+
                '<td>'+MiItems[i].DETALLE+'</td>'+
                '<td>'+MiItems[i].SUB_TOTAL+'</td>'+
                '<td>'+MiItems[i].TOTAL_ISV+'</td>'+
                '<td>'+MiItems[i].TOTAL+'</td>'+
                '<td>'+MiItems[i].FECHA_ENTREGA+'</td>'+
                '<td>'+MiItems[i].ESTADO+'</td>'+
                '<td>'+
                '<button class="btn btn-warning id="btneditar" onclick="CargarPedido('+MiItems[i].ID+')">Editar</button>'+
                '<button class="btn btn-danger id="btneliminar" onclick="EliminarPedido('+MiItems[i].ID+')">Eliminar</button>'+
                '</td>'+
            '</tr>';
            $('.Pedidos').html(Valores);
            }
            
        }
    });
}

function AgregarPedido(){
    var datospedido={
        ID:$('#ID').val(),
        ID_SOCIO:$('#ID_SOCIO').val(),
        FECHA_PEDIDO:$('#FECHA_PEDIDO').val(),
        DETALLE:$('#DETALLE').val(),
        SUB_TOTAL:$('#SUB_TOTAL').val(),
        TOTAL_ISV:$('#TOTAL_ISV').val(),
        TOTAL:$('#TOTAL').val(),
        FECHA_ENTREGA:$('#FECHA_ENTREGA').val(),
        ESTADO:$('#ESTADO').val()
    };
    var datospedidojson = JSON.stringify(datospedido);
    $.ajax({
        url: UrlPostPedidos,
        type: 'POST',
        data : datospedidojson,
        datatype: 'JSON',
        contenttype: 'application/json',
        success:function(response){
            console.log(response);
        },
        error:function(){
            alert('Error al crear pedido')
        }

    });
    alert('Pedido Agregado')
}

function CargarPedido(id){
    var datospedido={
        ID: id
    };
    var datospedidojson=JSON.stringify(datospedido);

    $.ajax({
        url: UrlGetPedido,
        type: 'POST',
        data : datospedidojson,
        datatype: 'JSON',
        contenttype: 'application/json',
        success: function(response){
            var MiItems = response;
            $('#ID').val(MiItems[0].ID);
            $('#ID_SOCIO').val(MiItems[0].ID_SOCIO);
            $('#FECHA_PEDIDO').val(MiItems[0].FECHA_PEDIDO);
            $('#DETALLE').val(MiItems[0].DETALLE);
            $('#SUB_TOTAL').val(MiItems[0].SUB_TOTAL);
            $('#TOTAL_ISV').val(MiItems[0].TOTAL_ISV);
            $('#TOTAL').val(MiItems[0].TOTAL);
            $('#FECHA_ENTREGA').val(MiItems[0].FECHA_ENTREGA);
            $('#ESTADO').val(MiItems[0].ESTADO);
            var btnactualizar = '<input type="submit" id="btneditar" onclick="ActualizarPedido('+MiItems[0].ID+')" value="Editar" class="btn btn-dark"></input>';
            $('#btnpedido').html(btnactualizar)
        }
    });
}

function ActualizarPedido(){
    var datospedido={
        ID:$('#ID').val(),
        ID_SOCIO:$('#ID_SOCIO').val(),
        FECHA_PEDIDO:$('#FECHA_PEDIDO').val(),
        DETALLE:$('#DETALLE').val(),
        SUB_TOTAL:$('#SUB_TOTAL').val(),
        TOTAL_ISV:$('#TOTAL_ISV').val(),
        TOTAL:$('#TOTAL').val(),
        FECHA_ENTREGA:$('#FECHA_ENTREGA').val(),
        ESTADO:$('#ESTADO').val()
        
    };

    var datospedidojson = JSON.stringify(datospedido);
    $.ajax({
        url: UrlPutPedido,
        type: 'PUT',
        data : datospedidojson,
        datatype: 'JSON',
        contenttype: 'application/json',
        success:function(response){
            console.log(response);
        },
        error:function(){
            alert('Error al actualizar el pedido')
        }

    });
    alert('Pedido Actualizado')

}

function EliminarPedido(id){
    var datospedido={
        ID: id
    };
    var datospedidojson=JSON.stringify(datospedido);
    $.ajax({
        url: UrlDeletePedido,
        type: 'DELETE',
        data : datospedidojson,
        datatype: 'JSON',
        contenttype: 'application/json',
        success:function(response){
            console.log(response);
            
        },
        error:function(){
            alert('Error al eliminar el pedido')
        }

    });
    alert('Pedido No. ' +id+ ' eliminado')
    

   
    
}