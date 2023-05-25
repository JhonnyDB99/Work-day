$(document).ready(function() {
    
    tipo = "";
    
    $("#btInsere").click(function() {
        $("#form")[0].reset();
        $("#modalInsere").modal("show"); 
        tipo = $(this).data("tipo");
    }); 
    
    $("#btAdd").click(function() {
        var nome = $("#txtNome").val();
        var mail = $("#txtMail").val();
        var salario = $("#txtSalario").val();
        
        cont = $("#tabela tbody tr").length + 1;
        
        if(nome=="" || mail=="" || salario=="" || isNaN(salario)) {
            alert("Dados incorretos...");
            $("#form")[0].reset();
            return;
        } else {
            if(tipo=="N") {
                bloco = "<tr>";
                bloco += '<td class="text-center">' + cont +'</td>';
                bloco += '<td class="text-left">' + nome + '</td>';
                bloco += '<td class="text-left">' + mail + '</td>';
                bloco += '<td class="text-right salario">' + parseFloat(salario).toFixed(2) + '</td>';
                bloco += '<td class="text-center">';
                bloco += '  <button class="btn btn-info btn-sm btEdit" data-tipo="E">';
                bloco += '      <i class="fa fa-edit"></i> Editar';
                bloco += '  </button>';
                bloco += '</td>';
                bloco += '<td class="text-center">';
                bloco += '  <button class="btn btn-danger btn-sm btApagar">';
                bloco += '      <i class="fa fa-times"></i> Apagar';
                bloco += '  </button>';
                bloco += '</td>';
                bloco += "</tr>";

                $("#tabela tbody").append(bloco);
                $("#form")[0].reset();
            } else {
                //jogar os valores na linha que está sendo editada
                $(".editado").find("td:eq(1)").html(nome);
                $(".editado").find("td:eq(2)").html(mail);
                $(".editado").find("td:eq(3)").html(salario);
                
                $(".editado").removeClass("editado");
            }
            $("#modalInsere").modal("hide");
            calcular();
        }
        
    });
    
    $(document).on("click",".btEdit",function() {
        el = $(this).closest("tr");
        
        nome = el.find("td:eq(1)").html();
        mail = el.find("td:eq(2)").html();
        salario = el.find("td:eq(3)").html();
        
        $("#txtNome").val(nome);
        $("#txtMail").val(mail);
        $("#txtSalario").val(salario);
        
        $(this).closest("tr").addClass("editado");
        
        $("#modalInsere").modal("show");
        
        tipo = $(this).data("tipo");
    });
    
    $(document).on("click",".btApagar",function() {
         
         /*
         if(confirm("Deseja realmente apagar essa linha?")) {
             $(this).closest("tr").remove();
         } else {
             alert("por que apertou então, catzo!!!!");
         }
         */
        $(this).closest("tr").addClass("apagar");
        bootbox.confirm({
            message: "<img src='images/assustado.jpg' class='w-100' alt='' /><br />Deseja REALMENTE apagar essa linha?",
            buttons: {
                confirm: {
                    label: 'SIM',
                    className: 'btn-success'
                },
                cancel: {
                    label: 'NÃO!!!',
                    className: 'btn-danger'
                }
            },
            callback: function (result) {
                if(result) {
                    $(".apagar").remove();
                    calcular();
                } else { 
                    $(".apagar").removeClass("apagar");
                }
            },
            size: 'small'
        });
    });
    
    $("#btCalcular").click(function() {
        total = 0;
        $(".salario").each(function() {
            total += parseFloat($(this).html());
        })
        $("#total").html(total.toFixed(2));
    })
    
    function calcular() {
        //calcula o total
        total = 0;
        $(".salario").each(function() {
            total += parseFloat($(this).html());
        })
        $("#total").html(total.toFixed(2));
        
        //vê quantas linhas eu tenho e atualiza o contador
        cont = 1;
        $("#tabela tbody tr").each(function() {
            $(this).find("td:eq(0)").html(cont);
            cont++;
        });
        
        $("#bgNumero").html(cont-1);
    }
});













