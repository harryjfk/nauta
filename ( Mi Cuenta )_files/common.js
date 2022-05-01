//JavaScript Document

var languageComing;
var languageComingRegister;
var languageComingRegisterDetail;
var languageComingRegisterVerify;
var languageComingForgotNew;
var languageComingLogin;
var languageComingIMEI;


$(function(){

		/*$("#datepicker").datepicker();
		$("#datepicker1").datepicker();*/
		
			$('#multiAccordion').multiAccordion({
				active: [1, 2],
				click: function(event, ui) {

				},
				init: function(event, ui) {

				},
				tabShown: function(event, ui) {
				//speed: 'slow'
				},
				tabHidden: function(event, ui) {
				//speed: 'slow'
				}
				
			});
			
			$('#multiAccordion1').multiAccordion({
				active: [1, 2],
				click: function(event, ui) {
				},
				init: function(event, ui) {
				},
				tabShown: function(event, ui) {
				//speed: 'slow'
				},
				tabHidden: function(event, ui) {
				//speed: 'slow'
				}

			});
			
			$('#multiAccordion').multiAccordion("option", "active", [0, 1, 2, 3, 4]);  
			$("#accordion").accordion({collapsible: true, heightStyle: "content", speed: 1500 });
			
			/*$("#accordion").accordion({collapsible: true, animate: {duration: 500}});*/
			
			$('.purchase_new1 #movie').each(function(){
			$(this).prepend('<thead></thead>')
			$(this).find('thead').append($(this).find("tr:eq(0)"));
			});
			
			window.languageComing = $("#languageForgotPassword").val();
	window.languageComingRegister = $("#languageRegisterPassword").val();
	window.languageComingRegisterDetail = $("#languageRegisterDetailPassword").val();
	window.languageComingRegisterVerify = $("#languageRegisterVerifyPassword").val();
	window.languageComingForgotNew = $("#languageForgotPasswordNew").val();
        window.languageComingLogin = $("#languageWelcomeLogin").val();
        window.languageComingIMEI = $("#reqLang").val();

		
});

$(document).ready(function() {
	
		$("#datepicker").attr('readonly', 'readonly');
		$("#datepicker1").attr('readonly', 'readonly');
		
		
		var languagePurchaseHistory = $("#languagePurchaseHistory").val();
	
		var recData=null;
		var cl1=null;
	
		var d = new Date();

		//var month = d.getMonth();
		//alert("months is"+month);
		//var day = d.getDate();

		//var output = ((''+month).length<2 ? '0' : '') + month + '/' + ((''+day).length<2 ? '0' : '') + day + '/' + d.getFullYear();

		//alert("date coming is "+output);
		
		//$("#datepicker").val(output); 
		
		
		d.setMonth(d.getMonth() - 1);
		$("#datepicker").val($.datepicker.formatDate("dd/mm/yy", d));
		$("#datepicker1").val($.datepicker.formatDate("dd/mm/yy", new Date()));
		
		 $("#datepicker").datepicker({
            dateFormat: "dd/mm/yy",
            minDate: "-6m 0d",
			maxDate : 0,
            onSelect: function (date) {
                var date2 = $('#datepicker').datepicker('getDate');
                date2.setDate(date2.getDate() + 1);
                $('#datepicker1').datepicker('setDate', date2);
                $('#datepicker1').datepicker('option', 'minDate', date2);
            }
        });
		
        $('#datepicker1').datepicker({
            dateFormat: "dd/mm/yy",
			minDate : 0,
			maxDate : 0,
            onClose: function () {
                var datepicker = $('#datepicker').datepicker('getDate');
                console.log(datepicker);
                var datepicker1 = $('#datepicker1').datepicker('getDate');
                if (datepicker1 <= datepicker) {
                    var minDate = $('#datepicker1').datepicker('option', 'minDate');
                    $('#datepicker1').datepicker('setDate', minDate);
					var maxDate = $("#datepicker1").datepicker("option", "maxDate");
					$("#datepicker1").datepicker("option", "maxDate",new Date());
                }
            }
        });
		
	
	var valMsisdnComing = $("#msisdnPurchase").val();
	//alert("msisdn coming is "+valMsisdnComing);
	var delimiterNew = "/"; 
	var tableResult = 'https://mi.cubacel.net:8443/AirConnector/rest/AirConnect/getResults';
	var tableStartDate = "&startDate=";
	var tableEndDate = "&endDate=";						
	var subscriberMsisdn = "?subscriber=";
	var origin = "&origin=";
	var plan = "&plans=";
	//var originValue = $('#dropdownOrigin').find(":selected").text();
	var originValue = $('#dropdownOrigin option:selected').attr("value");
	//alert("origin value is "+originValue);
	var planValue = $('#dropdownPaquete option:selected').attr("value");
	var tableStartDateValue = $("#datepicker").val();
	var tableEndDateValue = $("#datepicker1").val();

	
	var onLoadTableUrl = tableResult + subscriberMsisdn + valMsisdnComing + tableStartDate + tableStartDateValue + tableEndDate + tableEndDateValue + origin + originValue + plan + planValue ; 
	
	if($('#myTable').length)  
	
	{ 
	
	jQuery.ajax({	        	
        type: 'GET',
        contentType: 'application/json',
        url: 'https://mi.cubacel.net:8443/AirConnector/rest/AirConnect/getOrigin',
        dataType: 'json',
        success: function (data, status, jqXHR) {
			//alert(JSON.stringify(data));
			$.each(data.getOrigenResult,function(i,data)
            {
				var origin_data="<option value="+data.IdOrigen+" name="+data.DescOrigen+">"+data.DescOrigen+"</option>";
				$(origin_data).appendTo('#dropdownOrigin'); 
            });
        },
        error: function (jqXHR, status, errortext) {
		//	alert("error coming while fetching orgin data "+errortext);
        }
	}); 
	
	jQuery.ajax({	        	
        type: 'GET',
        contentType: 'application/json',
        url: 'https://mi.cubacel.net:8443/AirConnector/rest/AirConnect/getPlans',
        dataType: 'json',
        success: function (data, status, jqXHR) {
			//alert(JSON.stringify(data));
			$.each(data.getPaqueteResult,function(i,data)
            {
				var plan_data="<option value="+data.IdPaquete+" name="+data.DescPaquete+">"+data.DescPaquete+"</option>";
				$(plan_data).appendTo('#dropdownPaquete'); 
            });
        },
        error: function (jqXHR, status, errortext) {
		//	alert("error coming while fetching orgin data "+errortext);
        }
	}); 
	
	jQuery.ajax({	        	
	type: 'GET',
	contentType: 'application/json',
	url: onLoadTableUrl,
	dataType: 'json',
	beforeSend: function() {
	//alert("hi");
	$('#myDivPurchase').show();
	setTimeout(function() { 
		$('#myDivPurchase').fadeOut();
		}, 3000);
	}, 
		success: function (data, status, jqXHR) {
		
		//alert("Initial table url is "+url);
		//alert("Initial table url is "+onLoadTableUrl);
		$('#pNew').css("display","block");
		recData = data.getComprasResult;
		dTable.fnClearTable();
		if(typeof recData!='undefined' && recData!=null && recData.length>0){
			dTable.fnAddData(recData);	            	
		} else{
			recData = null;
			dTable.fnAddData(recData);
		}
				
				dTable.fnDraw();
				recData = null;
	},
	error: function (jqXHR, status, errortext) {
	//alert("Datos no encontrados ");
	$('#popUpDefaultDeactivated').css("display","block");
	recData = null;
	}
	});
		
	}
	
	$('#purchase_submit').click(function() {
		
	$('#pNew').css("display","block");
	
	var valMsisdnComing = $("#msisdnPurchase").val();
	//alert("msisdn coming is "+valMsisdnComing);
	var delimiterNew = "/"; 
	var tableResult = 'https://mi.cubacel.net:8443/AirConnector/rest/AirConnect/getResults';
	var tableStartDate = "&startDate=";
	var tableEndDate = "&endDate=";						
	var subscriberMsisdn = "?subscriber=";
	var origin = "&origin=";
	var plan = "&plans=";
	var originValue = $('#dropdownOrigin option:selected').attr("value");
	//alert("origin value is "+originValue);
	var planValue = $('#dropdownPaquete option:selected').attr("value");
	var tableStartDateValue = $("#datepicker").val();
	var tableEndDateValue = $("#datepicker1").val();

	
	var onLoadTableUrl = tableResult + subscriberMsisdn + valMsisdnComing + tableStartDate + tableStartDateValue + tableEndDate + tableEndDateValue + origin + originValue + plan + planValue ; 
	
		
	jQuery.ajax({	        	
        type: 'GET',
        contentType: 'application/json',
        url: onLoadTableUrl,
        dataType: 'json',
		beforeSend: function() {
	//alert("hi");
	$('#myDivPurchase').show();
	setTimeout(function() { 
		$('#myDivPurchase').fadeOut();
		}, 3000);
	},
        success: function (data, status, jqXHR) {

			// alert("url is "+onLoadTableUrl);
			$('#pNew').css("display","block");
			recData = data.getComprasResult;
			dTable.fnClearTable();
			if(typeof recData!='undefined' && recData!=null && recData.length>0){
				dTable.fnAddData(recData);	            	
			} else{
				recData = null;
				dTable.fnAddData(recData);
			}
	            	
            		dTable.fnDraw();
            		recData = null;
        },
        error: function (jqXHR, status, errortext) {
		//	alert("error coming while fetching table data "+errortext);
			$('#popUpDefaultDeactivated').css("display","block");
			recData = null;
        }
	});
	});


/*LIUVA START CODIGO*/

var localCheckIMEI = $("#reqLang").val();  
		
var languageCheckIMEI = $("#reqLang").val();
		
		if((languageCheckIMEI=="es") || (languageCheckIMEI=="es-ES") || (languageCheckIMEI=="es_ES") || (localCheckIMEI=="es") || 
			(localCheckIMEI=="es-ES") || (localCheckIMEI=="es_ES"))
			{

 $("#imeiForm").validate({
 // Specify validation rules
    rules: {
      // The key name on the left side is the name attribute
      // of an input field. Validation rules are defined
      // on the right side
      imei: {
        required: true,
        minlength: 15,
        maxlength:15,
        digits: true
      }
    },
    // Specify validation error messages
    messages: {
        imei: {
        required: "El c&oacute;digo IMEI no puede estar vac&iacute;o",
        minlength: "El c&oacute;digo IMEI debe contener 15 d&iacute;gitos",
        maxlength: "El c&oacute;digo IMEI debe contener 15 d&iacute;gitos",
        digits: "El c&oacute;digo IMEI solo debe contener d&iacute;gitos"
      }
    }
  });
}

	if((languageCheckIMEI=="en") || (languageCheckIMEI=="en-EN") || (languageCheckIMEI=="en_EN") || (localCheckIMEI=="en") || 
			(localCheckIMEI=="en-EN") || (localCheckIMEI=="en_EN"))
			{

 $("#imeiForm").validate({
 // Specify validation rules
    rules: {
      // The key name on the left side is the name attribute
      // of an input field. Validation rules are defined
      // on the right side
      imei: {
        required: true,
        minlength: 15,
        maxlength:15,
        digits: true
      }
    },
    // Specify validation error messages
    messages: {
        imei: {
        required: "The IMEI code can not be empty",
        minlength: "The IMEI code must contain 15 digits",
        maxlength: "The IMEI code must contain 15 digits",
        digits: "The IMEI code should only contain digits"
      }
    }
  });
}
/*LIUVA END CODIGO*/

	
	/*LIUVA - START CODIGO*/
	/*Llamado al API REST para la validacion imei*/



    $('#refresh_captcha').click(function() {

       refresh_captcha();
       
     });


    function InitIMEIForm(){
    
     $('#imei').val("");
     refresh_captcha();

    }

  

    $('#imei_submit').click(function() {
                  
         if (!jcap()) return;
         
         if(!$("#imeiForm").valid()) return;

         	
	var delimiterNew = "/"; 
	var tableResult = 'https://mi.cubacel.net:8443/AirConnector/rest/AirConnect/getIMEI';
				
	var imei = "?imei=";
	var imeiValue = $('#imei').val();
	
	var onLoadTableUrl = tableResult + imei + imeiValue; 
	//var onLoadTableUrl = "http://10.96.20.88:8091/AirConnector/rest/AirConnect/getIMEI?imei=866369024798169"; 
	
			
	jQuery.ajax({	        	
        type: 'GET',
        contentType: 'application/json',
        url: onLoadTableUrl,
        dataType: 'json',
		beforeSend: function() {
	//alert("hi maria elena");
	
	/*setTimeout(function() { 
		$('#imeiResponse').fadeOut();
		}, 3000);*/
	},
        success: function (data, status, jqXHR) {

			
			recData = data.getIMEIResult;

                        
			//dTable.fnClearTable();
			if(typeof recData!='undefined' && recData!=null && recData.length>0){
                              if (recData==0){
                                if((languageCheckIMEI=="es") || (languageCheckIMEI=="es-ES") || (languageCheckIMEI=="es_ES") || (localCheckIMEI=="es") || 
			         (localCheckIMEI=="es-ES") || (localCheckIMEI=="es_ES"))
                                 {
                                   $("#imeiResponse").text("Su c\u00F3digo IMEI: " + imeiValue  + " puede operar en la Red de ETECSA.");
                                 }
                                if((languageCheckIMEI=="en") || (languageCheckIMEI=="en-EN") || (languageCheckIMEI=="en_EN") || (localCheckIMEI=="en") || 
			         (localCheckIMEI=="en-EN") || (localCheckIMEI=="en_EN"))
                                 {
                                  $("#imeiResponse").text("The IMEI code: " + imeiValue  + " can operate in the ETECSA's mobile network");
                                 }

                                $("#imeiResponse").attr("class","imei_OK");
                                $("#imeiResponse").show();

                               }  
                              else
                                 {
                                  if((languageCheckIMEI=="es") || (languageCheckIMEI=="es-ES") || (languageCheckIMEI=="es_ES") || (localCheckIMEI=="es") || 
			          (localCheckIMEI=="es-ES") || (localCheckIMEI=="es_ES"))
                                  {
                                    $("#imeiResponse").text("Su c\u00F3digo IMEI: " + imeiValue  +  " no est\u00E1 autorizado a operar en la Red de ETECSA.");
                                  }
                                 if((languageCheckIMEI=="en") || (languageCheckIMEI=="en-EN") || (languageCheckIMEI=="en_EN") || (localCheckIMEI=="en") || 
			          (localCheckIMEI=="en-EN") || (localCheckIMEI=="en_EN"))
                                 {
                                   $("#imeiResponse").text("The IMEI code: " + imeiValue  +  " is not authorized to operate in the ETECSA's mobile network");
                                 }
                                  $("#imeiResponse").attr("class","imei_NOOK");
                                  $("#imeiResponse").show();
                                 }

                             InitIMEIForm();
 
					            	
			} else{
				recData = null;
				$("#imeiResponse").text("");	    
				//dTable.fnAddData(recData);
			}
	            	
            		//dTable.fnDraw();
            		recData = null;
        },
        error: function (jqXHR, status, errortext) {
			alert("error : " + status);
			//$('#popUpDefaultDeactivated').css("display","block");
			recData = null;
        }
	});
	});

	/*LIUVA - END CODIGO*/
	
	if($('#myTable').length)
	{
		
	if((languagePurchaseHistory=="es-ES") || (languagePurchaseHistory=="es"))
	{
	var dTable=$('#movie').dataTable({	
        data: recData,
		"language": {
        "sProcessing":    "Procesando...",
        "sLengthMenu":    "Mostrar _MENU_ entradas",
        "sZeroRecords":   "No se encontraron resultados",
        "sEmptyTable":    "Ningún dato disponible en esta tabla",
        "sInfo":          "Mostrando entradas del _START_ al _END_ de un total de _TOTAL_ entradas",
        "sInfoEmpty":     "Mostrando entradas del 0 al 0 de un total de 0 entradas",
        "sInfoFiltered":  "(filtrado de un total de _MAX_ entradas)",
        "sInfoPostFix":   "",
        "sSearch":        "Buscar:",
        "sUrl":           "",
        "sInfoThousands":  ",",
        "sLoadingRecords": "Cargando...",
        "oPaginate": {
            "sFirst":    "Primero",
            "sLast":    "Último",
            "sNext":    "Siguiente",
            "sPrevious": "Anterior"
        },
        "oAria": {
            "sSortAscending":  ": Activar para ordenar la columna de manera ascendente",
            "sSortDescending": ": Activar para ordenar la columna de manera descendente"
        }
    },
       "columns": [
           {"data": "Fecha_Hora"},
          /* {"data": "Numero_Telefono"},*/
           {"data": "Origen"},
           {"data": "Paquete"},
           {"data": "Precio"},
       ]
    });
	}
	
	else
	{
	var dTable=$('#movie').dataTable({	
        data: recData,
       "columns": [
           {"data": "Fecha_Hora"},
          /* {"data": "Numero_Telefono"},*/
           {"data": "Origen"},
           {"data": "Paquete"},
           {"data": "Precio"},
       ]
    });	

	}

	}
	
/*START Servicio SOS Etecsa - Prestame Saldo*/

 	var msisdnValue = $("#msisdnValue").val();
 	var transactionAmount = 1;//$("#transactionAmount").val();
	
			var loanmeCallUrl = "https://mi.cubacel.net:8443/AirConnector/rest/AirConnect/loanMe?subscriber=" + msisdnValue + "&transactionAmount=" + transactionAmount;  
			
			
			
		$('#loanme-btn').click(function(){
		  
		
					$.ajax({
						url: loanmeCallUrl,  
						type: "GET",   
						dataType: "json",           
 						crossDomain: true,    
 						jsonpCallback: "localJsonpCallback", 
						error: function(responseData) {
								var a = responseData.responseCode;
								alert("Failure is "+a);	 										
									},
						success: function(responseData){
								var a = responseData.responseCode;
								 
									
								if (a == 200)    
								{
									
									$("span.cp").hide(); 
									$("#popUpLoanMe").css("display","block");  
									$("#showSpan200LoanMe").css("display","block");									
									$("#showSpan100LoanMe").css("display","none"); 
									$("#coverssLoanMe").css("display","block");   	

								}	

								if (a == 100)
								{
									$("span.cp").hide();
									$("#popUpLoanMe").css("display","block"); 
									$("#showSpan200LoanMe").css("display","none");
									$("#showSpan100LoanMe").css("display","block");									
									$("#coverssLoanMe").css("display","block");   
								}								
							},
								type: "GET"  
						});		


		});

/*END SOS Etecsa*/
		
	
		/*$("#myTablePurchase").DataTable();
		var at = $("#movie tbody").attr("data-pageSize");
		var bt = $("#movie tbody").attr("data-firstrecord");
		
		if((at =="4") && (bt =="0"))
		{
			$("#previous").css("display","none");
		}
		*/
		
	
		/* product page buy button */
		
		var ptype = $("#ptype").val();
		var btype = $("#btype").val();
		if (ptype == "1")
		{
			$(".ptype").css("display","none");
		}
		else
		{
			$(".ptype").css("display","block");
		}
		
		if (btype == "1")
		{
			$(".btype").css("display","none");
		}
		else
		{
			$(".btype").css("display","block");
		}
		
	
		/* for payrent */
	
		var payRent = $("#payRentButton").val();
		
		if(payRent == "true")     
		{ 
		//alert("valueFNF true value is "+valueFNF);
		$("#showPayRent").css("display", "block");	
		}
		
		
		var ea = document.getElementById('parent');
		
		if(ea != null && ea != 'undefined')
		{
		ea.onmouseover = function() {
		  document.getElementById('popups').style.display = 'block';
		}
		ea.onmouseout = function() {
		  document.getElementById('popups').style.display = 'none';
		}
		}
		
		$('.purchase_history_block_new #myTable').each(function(){
		$(this).prepend('<thead></thead>')
		$(this).find('thead').append($(this).find("tr:eq(0)"));
		});   
	$('.purchase_history_block_new #myTableFaq').each(function(){
		$(this).prepend('<thead></thead>')
		$(this).find('thead').append($(this).find("tr:eq(0)"));
		});  
		
	$('.purchase_history_block_new #myTableFaqSms').each(function(){
		$(this).prepend('<thead></thead>')
		$(this).find('thead').append($(this).find("tr:eq(0)"));
		});
		
	/*$('.purchase_new1 #movie').each(function(){
		$(this).prepend('<thead></thead>')
		$(this).find('thead').append($(this).find("tr:eq(0)"));
		}); */
		
	$("#hideLanguage1").parent().parent().parent().parent().children().eq(2).hide();
	$("#hideLanguage2").parent().parent().parent().children().eq(2).hide();
	$("#hideLanguage3").parent().parent().parent().children().eq(2).hide();
	$("#hideLanguage4").parent().parent().parent().children().eq(2).hide();
	
	var languageMyAccount = $("#myAccountLanguage").val();
	if ($("#gettingLanguage").length > 0) 
	{

	var gettingValue = $("#gettingLanguage").val(); 
//		alert("getting language is " +gettingValue);
	
	
		if((gettingValue == "es") || (gettingValue == "es-ES"))  
		{
			window.location.replace($("#spanishLanguage").attr('href'));
			
		}
		else 
		{
			window.location.replace($("#englishLanguage").attr('href')); 
			 	
		}
	}
	$("#myonoffswitch").attr('disabled',true);
	
	
	/* new code for prepaid postpaid redirection */
	
	if ($("#gettingUsertype").length > 0)  
	{

	var gettingValue = $("#gettingUsertype").val(); 

		if(gettingValue == "1")  
		{
			window.location.replace($("#postpaidUserType").attr('href'));
		}
		
		if(gettingValue == "0")  
		{
			window.location.replace($("#prepaidUserType").attr('href'));
		}
	}
	
	var flag =0;
	
	var reqLang = $("#reqLang").val(); 
	var urlLogin = "https://mi.cubacel.net:8443/login/jsp/welcome-login.jsp?language=" + reqLang; 
	var valueFNF = $("#fnfBlockValue").val();
	var valMsisdn = $("#msisdnValue").val();
	var fafUpdateCount = $("#updateCountValue").val();
	//alert(valueFNF);  
	  
		$(".js-modal-close").click(function() {
				window.location.reload(true);         
				$("div#cover").css("display","none");	  
				$("div#popup1").css("display","none");	 			
		}); 
	
		$(".js-modal-close-delete").click(function() {	     
				$("div#deleteMessageDiv").css("display","none");	 			
		});
		
		$(".js-modal-close-deactivated").click(function() {	  
				window.location.reload(true); 
				$("div#coverss").css("display","none");	   
				$("div#popUpDeactivated").css("display","none"); 	 	
				$("div#coverssLoanMe").css("display","none");	   
				$("div#popUpLoanMe").css("display","none"); 		
		}); 
		
		/*$(".js-modal-ok-cancel").click(function() {	  
				$("div#confirmAddMessageDiv").css("display","none");
				$("div#covers").css("display","none");	  			
		}); */
		

	//alert("UpdateCount is " +fafUpdateCount);  
	
	if(valueFNF == "true") 
	{ 
		$("#familyAndFriends").css("display", "block");
	}
	
	else
	{   
		$("#familyAndFriends").css("display", "none");	
	}  
	
	if(fafUpdateCount < 3) 
	{
		$("#warningMSG").css("display", "none");
	}
	
	else
	{
		$("#warningMSG").css("display", "block");	
	}
	
	 var formID = '';
		$('#myLink').click(function(event){  
			$.removeCookie('portaluser', { path: '/' });
			$(location).attr('href', urlLogin);
		});


                $('#mySignin').click(function(event){   
                        $.removeCookie('portaluser', { path: '/' }); 
                        $(location).attr('href', urlLogin);  
                });


		
		$("#backButton").click(function(event) {
			event.preventDefault();
			history.back(1);
		});
		
		
		/* added for family and friends */ 
			var msisdnValue = $("#msisdnValue").val();
	
			var deactivatedCallUrl = "https://mi.cubacel.net:8443/AirConnector/rest/AirConnect/unSubscribeFAF?subscriber=" + msisdnValue;  
			var payRentUrl = "https://mi.cubacel.net:8443/AirConnector/rest/AirConnect/payRent?subscriber=" + valMsisdn; 
			
			
		$('#unsubscribe-btn').click(function(){
		     
		
					$.ajax({
						url: deactivatedCallUrl,  
						type: "GET",   
						dataType: "json",           
 						crossDomain: true,    
 						jsonpCallback: "localJsonpCallback", 
						error: function(responseData) {
								var a = responseData.responseCode;
								alert("Failure is "+a);	 										
									},
						success: function(responseData){
								var a = responseData.responseCode;
									
								if (a == 200)    
								{
									$("span.cp").hide(); 
									$("#popUpDeactivated").css("display","block");  
									$("#showSpan200Deactivated").css("display","block");									
									$("#showSpan100Deactivated").css("display","none"); 
									$("#coverss").css("display","block");   	
								}	

								if (a == 100)
								{
									$("span.cp").hide();
									$("#popUpDeactivated").css("display","block"); 
									$("#showSpan200Deactivated").css("display","none");
									$("#showSpan100Deactivated").css("display","block");									
									$("#coverss").css("display","block");   
								}								
							},
								type: "GET"  
						});		


		});
		
				
		$('#payrent-btn').click(function(){
		     
		
					$.ajax({
						url: payRentUrl,  
						type: "GET",   
						dataType: "json",           
 						crossDomain: true,    
 						jsonpCallback: "localJsonpCallback", 
						error: function(responseData) {
								var a = responseData.responseCode;
								alert("Failure is "+a);	 										
									},
						success: function(responseData){
								var a = responseData.responseCode;
									
								if (a == 200)    
								{
									$("span.cp").hide(); 
									$("#popUpRentDeactivated").css("display","block");  
									$("#showSpanRent200Deactivated").css("display","block");									
									$("#showSpanRent100Deactivated").css("display","none"); 
									$("#showSpanRent124Deactivated").css("display","none");
									$("#coverss").css("display","block");   	
								}	
								
								else if (a == 124)    
								{
									$("span.cp").hide(); 
									$("#popUpRentDeactivated").css("display","block");  
									$("#showSpanRent124Deactivated").css("display","block");									
									$("#showSpanRent100Deactivated").css("display","none"); 
									$("#showSpanRent200Deactivated").css("display","none"); 
									$("#coverss").css("display","block");   	
								}	

								else if (a == 100)
								{
									$("span.cp").hide();
									$("#popUpRentDeactivated").css("display","block"); 
									$("#showSpanRent200Deactivated").css("display","none");
									$("#showSpanRent100Deactivated").css("display","block");
									$("#showSpanRent124Deactivated").css("display","none");									
									$("#coverss").css("display","block");   
								}		

								else {
									$("span.cp").hide();
									$("#popUpDefaultDeactivated").css("display","block"); 
									$("#showSpanRent200Deactivated").css("display","none");
									$("#showSpanRent100Deactivated").css("display","none");
									$("#showSpanRent124Deactivated").css("display","none");
									$("#showSpanRentDefaultDeactivated").css("display","block");									
									$("#coverss").css("display","block");
								}									
							},
								type: "GET"  
						});		


		});
		
		
		
		$("input#ph1").each(function()
			{
			if($(this).val().length >7)   
            {
               // alert("has value");
				 $(this).parent().children().eq(1).prop("disabled",true);   
				 $(this).parent().parent().children().eq(1).children().eq(0).hide();
				  $(this).parent().parent().children().eq(1).children().eq(2).hide();
				 $(this).parent().parent().children().eq(1).children().eq(1).show(); 
            }
			
			else if($(this).val().length <=7)     
            {
				 $(this).parent().children().eq(1).prop("disabled",false); 
				$(this).parent().children().eq(1).val(''); 			 	 
				 $(this).parent().parent().children().eq(1).children().eq(0).show(); 
				  $(this).parent().parent().children().eq(1).children().eq(2).hide();
				 $(this).parent().parent().children().eq(1).children().eq(1).hide(); 
            }
			 
			 else
             {
                 //  alert("no value");    
				// $("label#ph1-error").css("display","none");
				 $(this).parent().parent().children().eq(1).children().eq(0).show();
				 $(this).parent().parent().children().eq(1).children().eq(1).hide(); 
				 $(this).parent().parent().children().eq(1).children().eq(2).hide();	  			 
               
             }
			 
			});
         
								 
				var airCallUrl = "https://mi.cubacel.net:8443/AirConnector/rest/AirConnect/";  	 		
				  var flag = 0; 
				  
			$("a#btn-change-ph1").click(function(){    // when change butotn is clicked
				
				var valueBfrChange = $(this).parent().parent().parent().parent().children().eq(1).children().eq(0).children().eq(1).val();
				//alert("valueBfrChange "+valueBfrChange); 
				$(this).parent().parent().parent().parent().parent().children().eq(0).children().val(valueBfrChange);    
				$(this).parent().parent().children().eq(3).children().val("change");
				$(this).parent().hide();  				
				$(this).parent().parent().children().eq(0).hide();
				$(this).parent().parent().children().eq(2).show();	 
				$(this).parent().parent().parent().children().eq(0).children().eq(1).prop("disabled",false);  
				$(this).parent().parent().parent().children().eq(1).children().eq(9).css("display","block"); 	 
				$(this).parent().parent().parent().children().eq(1).children().eq(4).css("display","none"); 
				$(this).parent().parent().parent().children().eq(1).children().eq(10).css("display","none"); 				
            });    
			
			var setFlag = false;
			
			$("a#btn-add-ph1").click(function(){    // when change butotn is clicked  
				
				var valueBfrAdd = $(this).parent().parent().parent().parent().children().eq(1).children().eq(0).children().eq(1).val();
				//alert("valueBfrAdd "+valueBfrAdd); 
				
				setFlag = $(this).parent().parent().parent().validate({				
				rules: {  
					ph1: "required",
					ph1: {	required: true, minlength: 8,maxlength: 8,digits: true}
				},
				messages: { 
					ph1: "Ingrese su n&uacute;mero de tel&eacute;fono",  
					ph1: {
						required: "El n&uacute;mero de tel&eacute;fono no puede estar vac&iacute;o ",
						minlength: "Número de teléfono con menos de 8 dígitos",
						maxlength: "Número de teléfono superior a 8 dígitos",  
						digits: "El n&uacute;mero de tel&eacute;fono debe contener solo d&iacute;gitos"
					}
				}
				}).form(); 
				
				if(valueBfrAdd != "" && setFlag)       
				{
				//$(this).parent().parent().parent().parent().parent().children().eq(0).children().val(valueBfrChange);    
				$(this).parent().parent().children().eq(3).children().val("add");
				$(this).parent().hide();   				
				$(this).parent().parent().children().eq(1).hide();
				$(this).parent().parent().children().eq(2).show();
				$(this).parent().parent().parent().children().eq(1).children().eq(10).css("display","block");	
				$(this).parent().parent().parent().children().eq(1).children().eq(4).css("display","none");	
				$(this).parent().parent().parent().children().eq(1).children().eq(9).css("display","none");					
				$(this).parent().parent().parent().children().eq(0).children().eq(1).prop("disabled",true);      				
				}  
				/*else
				{
					$(this).parent().parent().parent().parent().children().eq(1).children().eq(0).children().eq(1).focus();
				}*/
            });   
        
           $("a#btn-delete-ph1").click(function(){       // when delete butotn is clicked   
				var valueBfrChange = $(this).parent().parent().parent().parent().children().eq(1).children().eq(0).children().eq(1).val();
				//alert("valueBfrChange "+valueBfrChange);  
				$(this).parent().parent().parent().parent().parent().children().eq(0).children().val(valueBfrChange);				
				$(this).parent().parent().children().eq(3).children().val("delete");
				$(this).parent().parent().children().eq(0).hide();
				$(this).parent().parent().children().eq(2).show();
				$(this).parent().hide();   
				$(this).parent().parent().parent().children().eq(0).children().eq(1).prop("disabled",true);
				$(this).parent().parent().parent().children().eq(1).children().eq(4).css("display","block");    
				$(this).parent().parent().parent().children().eq(1).children().eq(9).css("display","none");
				$(this).parent().parent().parent().children().eq(1).children().eq(10).css("display","none"); 				
            });
			   
			$("a#btn-cancel-ph1").click(function(){      		 // when cancel butotn is clicked
			//	alert("Cancel called");						
				var addValue = $(this).parent().parent().children().eq(3).children().val();
				if(addValue != "add")
				{
				var valueBeforeChange = $(this).parent().parent().parent().parent().parent().children().eq(0).children().val();  
				$(this).parent().parent().parent().parent().children().eq(1).children().eq(0).children().eq(1).val(valueBeforeChange);  
				
				$(this).parent().parent().children().eq(1).show();	
				$(this).parent().parent().children().eq(0).hide();	
				$(this).parent().hide();
				$("label#ph1-error").hide(); 
				$(this).parent().parent().parent().children().eq(0).children().eq(1).prop("disabled",true); 
				$(this).parent().parent().parent().children().eq(0).children().eq(1).removeClass("error");
				$(this).parent().parent().parent().children().eq(1).children().eq(4).css("display","none"); 
				$(this).parent().parent().parent().children().eq(1).children().eq(8).css("display","none"); 
				$(this).parent().parent().parent().children().eq(1).children().eq(9).css("display","none"); 
				$(this).parent().parent().parent().children().eq(1).children().eq(10).css("display","none"); 
				$(this).parent().parent().parent().children().eq(1).children().eq(11).css("display","none"); 
				}
				else{ 
					window.location.reload(true); 
				/*$(this).parent().hide();
				$("label#ph1-error").hide(); 
				$(this).parent().parent().parent().children().eq(0).children().eq(1).prop("disabled",false); 
				$(this).parent().parent().children().eq(0).show(); 
				$(this).parent().parent().children().eq(1).hide();
				$(this).parent().parent().children().eq(4).css("display","none");	
				$(this).parent().parent().children().eq(9).css("display","none");	
				$(this).parent().parent().children().eq(10).css("display","none");	*/ 				
				}				
            });
         
			$('.myForms').each(function(){   //json validation for each form
			
			if((languageMyAccount=="en-US") || (languageMyAccount=="en"))
			{
				$(this).validate({

					rules: { 
						ph1: "required", 
						ph1: {	required: true, minlength: 8,maxlength: 8,digits: true}
					},
					messages: { 
						ph1: "Enter your phone number",  
						ph1: {
							required: "The phone number can not be vacant", 
							minlength: "Phone number less than 8 digits",
							maxlength: "Phone number greater than 8 digits",
							digits: "The phone number must contain only digits"
						} 
					},
            
              submitHandler: function(form) {   				// Using submit handler for validation + handling ajax query simultaneously
					
					if ((form.id == 'phForm1') || (form.id == 'phForm2') || (form.id == 'phForm3')){ 	    			  
					var textboxID = '#' + form.id + ' #main-id-textbox #ph1';  //dynamic value of textbox
					var div1ID = '#' + form.id + ' #boxDiv #add-ph1'; 
					var div2ID = '#' + form.id + ' #boxDiv #edit-ph1';   
					var div3ID = '#' + form.id + ' #boxDiv #confirm-ph1';  
					var div4ID = '#' + form.id + ' #boxDiv #confirmFlag-ph1 #confirmFlag'; //value of confirm hidden div 
					var div5ID = '#' + form.id + ' #boxDiv #deleteMessageDiv';	// value of hidden delete message div	 			
					var div6ID = '#' + form.id + ' #main-id-textbox #cancelFlag-ph1 #cancelFlag';   //value of intial textbox 
					var div7ID = '#' + form.id + ' #boxDiv #valueMsisdn #msisdnValue';
					var divOverlay = '#' + form.id + ' #boxDiv #cover'; 	
				/*	var divOverlays = '#' + form.id + ' #boxDiv #covers'; */					 
					var div8ID = '#' + form.id + ' #boxDiv #popup1';  
					var div8ID200 = '#' + form.id + ' #boxDiv #popup1 #showSpan200'; 
					var div8ID100 = '#' + form.id + ' #boxDiv #popup1 #showSpan100';
					var div8ID102 = '#' + form.id + ' #boxDiv #popup1 #showSpan102';
					var div8ID104 = '#' + form.id + ' #boxDiv #popup1 #showSpan104';
					var div8ID123 = '#' + form.id + ' #boxDiv #popup1 #showSpan123';
					var div8ID124 = '#' + form.id + ' #boxDiv #popup1 #showSpan124';
					var div8ID126 = '#' + form.id + ' #boxDiv #popup1 #showSpan126';
					var div8ID127 = '#' + form.id + ' #boxDiv #popup1 #showSpan127';
					var div8ID129 = '#' + form.id + ' #boxDiv #popup1 #showSpan129';
					var div8ID130 = '#' + form.id + ' #boxDiv #popup1 #showSpan130';
					var div8ID134 = '#' + form.id + ' #boxDiv #popup1 #showSpan134';
					var div8ID135 = '#' + form.id + ' #boxDiv #popup1 #showSpan135';
					var div8ID159 = '#' + form.id + ' #boxDiv #popup1 #showSpan159';
					var div8ID205 = '#' + form.id + ' #boxDiv #popup1 #showSpan205';
					var div8ID206 = '#' + form.id + ' #boxDiv #popup1 #showSpan206';
					var div8ID999 = '#' + form.id + ' #boxDiv #popup1 #showSpan999'; 
					var div9ID = '#' + form.id + ' #boxDiv #noChangeAlert';  
					var div10ID = '#' + form.id + ' #boxDiv #changeMessageDiv';  
					var div11ID = '#' + form.id + ' #boxDiv #addMessageDiv';  
					var div8ID1000 = '#' + form.id + ' #boxDiv #msisdnMessageDiv'; 
					var div8ID1001 = '#' + form.id + ' #boxDiv #popup1 #showSpan1001';
					var div8IDDefault = '#' + form.id + ' #boxDiv #popup1 #showSpanDefault';
									
					
					var flagValue = $(div4ID).val();   					// storing confirm hidden div value in flag value variable 
				//	alert("div6ID is " +$("#valueTextval").val());    
					
					var msisdn = $(div7ID).val();     
				//	alert("msisdn is " +msisdn);      					
					
					var initialPhoneNumber = $(div6ID).val();        
				//	alert("initialPhoneNumber "+initialPhoneNumber);  
					
					var addOne = $(textboxID).val(); 								// getting textbox value in variable addOne
				//	alert("AddOne number is "+addOne);    
					
					var msisdnShow = $(div8ID1000).val();  
					
					var ph1val = $("#phForm1 .form-control").val();
					//alert("ph1val is "+ph1val);
					var ph2val = $("#phForm2 .form-control").val();
					//alert("ph2val is "+ph2val);
					var ph3val = $("#phForm3 .form-control").val();
					//alert("ph3val is "+ph3val); 
					
					var k =0;
					
					var newph1val = "53" + ph1val;
					var newph2val = "53" + ph2val; 
					var newph3val = "53" + ph3val; 
					var ms = 0; 
					
						if((newph1val == msisdn) || (newph2val == msisdn) || (newph3val == msisdn))
						{ 
							if((flagValue == "change") || (flagValue == "add"))
							{	
								$(div11ID).css("display", "none");  
								$(div10ID).css("display", "none");   
								$(div9ID).css("display", "none"); 
								$(div8ID1000).css("display", "block"); 
								ms = 1; 
							}
						}
					
					if(flagValue == "change" && addOne == ph1val)
					{
						if(addOne == ph2val || addOne == ph3val || addOne == initialPhoneNumber)
						{
							$(div5ID).css("display", "none"); 	 					
							$(div9ID).css("display", "block");    
							$(div10ID).css("display", "none"); 
							$(div11ID).css("display", "none"); 
							$(div8ID1000).css("display", "none"); 
							k = 1;
						}	
					}
					
					if(flagValue == "change" && addOne == ph2val)
					{
						
						if(addOne == ph1val || addOne == ph3val || addOne == initialPhoneNumber)
						{
							$(div5ID).css("display", "none"); 	 					
							$(div9ID).css("display", "block");    
							$(div10ID).css("display", "none"); 
							$(div11ID).css("display", "none"); 
							$(div8ID1000).css("display", "none"); 
							k = 1;
						}	
					}
					
					if(flagValue == "change" && addOne == ph3val)
					{
						if(addOne == ph1val || addOne == ph2val || addOne == initialPhoneNumber)
						{
							$(div5ID).css("display", "none"); 	 					
							$(div9ID).css("display", "block");    
							$(div10ID).css("display", "none"); 
							$(div11ID).css("display", "none"); 
							$(div8ID1000).css("display", "none"); 
							k = 1;
						}	
					}
			
					
					var delimiter = "/"; 
					var questionAddString = "?numberToAdd=";
					var questionDeleteString = "?numberToDelete=";
					var questionChangeString = "&numberToDelete=";						
					var jsonFormat = "&format=jsonp";
					var subscriber = "&subscriber=";					 
					
					var addInitialUrl = airCallUrl + "addFAFNumber" + questionAddString; 
					var addFinalUrl = addInitialUrl + addOne + subscriber + msisdn + jsonFormat;      	// final url made to add the number
					
				//	alert("final url made is "+addFinalUrl);         
					  
					var changeInitialUrl = airCallUrl + "changeFAFNumber" + questionAddString; 
					var changeFinalUrl = changeInitialUrl + addOne + questionChangeString + initialPhoneNumber + subscriber + msisdn + jsonFormat;   // final url made to change the number
					
					var deleteInitialUrl = airCallUrl + "deleteFAFNumber" + questionDeleteString;       
					var deleteFinalUrl = deleteInitialUrl + addOne + subscriber + msisdn + jsonFormat;    // final url made to delete the number  
					
					if(flagValue == "change" && k==0 && ms==0)                                
					{   
						
						$(div5ID).css("display", "none"); 
						$(div9ID).css("display", "none");  
						$(div10ID).css("display", "none");  
						$(div11ID).css("display", "none"); 
						$(div8ID1000).css("display", "none"); 
						$.ajax({
						url: changeFinalUrl,
						type: "GET",  
						dataType: "json",           
 						crossDomain: true,    
 						jsonpCallback: "localJsonpCallback", 
						error: function(responseData) {
								var a = responseData.responseCode;
								alert("Failure is "+a);	
							        										
									},
						success: function(responseData){
								var a = responseData.responseCode;
								//alert("Success is "+a);	
							
							if (a == 200)
							{
								$("span.cp").hide(); 
								$(divOverlay).css("display","block");  
								$(div8ID).css("display", "block"); 
								$(div8ID200).css("display", "block");
								//$("span.cp").css("display","none"); 
								$(textboxID).prop("disabled",true);
								$(div1ID).css("display", "none");   
								$(div2ID).css("display", "block"); 	
								$(div3ID).css("display", "none");   	
							}	

							else if (a == 100)
							{
								$("span.cp").hide();
								$(divOverlay).css("display","block");  
								$(div8ID).css("display", "block"); 
								$(div8ID100).css("display", "block");   
							}
							
							else if (a == 102)
							{
								$("span.cp").hide();
								$(divOverlay).css("display","block");  
								$(div8ID).css("display", "block"); 
								$(div8ID102).css("display", "block");   
							}
							
							else if (a == 104)
							{
								$("span.cp").hide();
								$(divOverlay).css("display","block");  
								$(div8ID).css("display", "block"); 
								$(div8ID104).css("display", "block");   
							}
							
							else if (a == 123)
							{
								$("span.cp").hide();
								$(divOverlay).css("display","block");  
								$(div8ID).css("display", "block"); 
								$(div8ID123).css("display", "block");   
							}
							
							else if (a == 124)
							{
								$("span.cp").hide();
								$(divOverlay).css("display","block");  
								$(div8ID).css("display", "block"); 
								$(div8ID130).css("display", "block");   
							}
							
							else if (a == 126)
							{
								$("span.cp").hide();
								$(divOverlay).css("display","block");  
								$(div8ID).css("display", "block"); 
								$(div8ID130).css("display", "block");   
							}
							
							else if (a == 127)
							{
								$("span.cp").hide();
								$(divOverlay).css("display","block");  
								$(div8ID).css("display", "block"); 
								$(div8ID130).css("display", "block");   
							}
							
							else if (a == 129)
							{
								$("span.cp").hide();
								$(divOverlay).css("display","block");  
								$(div8ID).css("display", "block"); 
								$(div8ID130).css("display", "block");   
							}
							
							else if (a == 130)
							{
								$("span.cp").hide();
								$(divOverlay).css("display","block");  
								$(div8ID).css("display", "block"); 
								$(div8ID130).css("display", "block");   
							}
							
							else if (a == 134)
							{
								$("span.cp").hide();
								$(divOverlay).css("display","block");  
								$(div8ID).css("display", "block"); 
								$(div8ID134).css("display", "block");   
							}
							
							else if (a == 135)
							{
								$("span.cp").hide();
								$(divOverlay).css("display","block");  
								$(div8ID).css("display", "block"); 
								$(div8ID135).css("display", "block");   
							}
							
							else if (a == 159)
							{
								$("span.cp").hide();
								$(divOverlay).css("display","block");  
								$(div8ID).css("display", "block"); 
								$(div8ID159).css("display", "block");   
							}
							
							else if (a == 205)
							{
								$("span.cp").hide();
								$(divOverlay).css("display","block");  
								$(div8ID).css("display", "block"); 
								$(div8ID205).css("display", "block");   
							}
							
							else if (a == 206)
							{
								$("span.cp").hide();
								$(divOverlay).css("display","block");  
								$(div8ID).css("display", "block"); 
								$(div8ID206).css("display", "block");   
							}
							
							else if (a == 999)
							{
								$("span.cp").hide();
								$(divOverlay).css("display","block");  
								$(div8ID).css("display", "block"); 
								$(div8ID999).css("display", "block");   
							}	

							else if (a == 1001)
							{
								$("span.cp").hide();
								$(divOverlay).css("display","block");  
								$(div8ID).css("display", "block"); 
								$(div8ID1001).css("display", "block");   
							}	
							
							else
							{
								$("span.cp").hide();
								$(divOverlay).css("display","block");  
								$(div8ID).css("display", "block"); 
								$(div8IDDefault).css("display", "block");  
								
							}
						}, 
						
							type: "GET"   
						});
					}  
					
					if(flagValue == "delete")
					{
						$(div5ID).css("display", "none"); 
						$(div9ID).css("display", "none"); 
						$(div10ID).css("display", "none"); 
						$(div11ID).css("display", "none");
						
						$.ajax({
						url: deleteFinalUrl,
						type: "GET",  
						dataType: "json",           
 						crossDomain: true,  
 						jsonpCallback: "localJsonpCallback", 
						error: function(responseData) {
							var a = responseData.responseCode;
							alert("Failure is "+a);	        										
									},
						success: function(responseData){
							var a = responseData.responseCode;
								
							
							if (a == 200)
							{
								$("span.cp").hide();  
								$(divOverlay).css("display","block");  
								$(div8ID).css("display", "block"); 
								$(div8ID200).css("display", "block");
								//$("span.cp").css("display","none"); 
								$(textboxID).prop("disabled",false); 
								$(textboxID).val("");
								$(div4ID).val("add");   							
								$(div1ID).css("display", "block");   
								$(div2ID).css("display", "none"); 	
								$(div3ID).css("display", "none"); 	  
							}

							if (a == 100)
							{
								$("span.cp").hide();
								$(divOverlay).css("display","block");  
								$(div8ID).css("display", "block"); 
								$(div8ID100).css("display", "block");   
							}
							
							if (a == 102)
							{
								$("span.cp").hide();
								$(divOverlay).css("display","block");  
								$(div8ID).css("display", "block"); 
								$(div8ID102).css("display", "block");   
							}
							
							if (a == 104)
							{
								$("span.cp").hide();
								$(divOverlay).css("display","block");  
								$(div8ID).css("display", "block"); 
								$(div8ID104).css("display", "block");   
							}
							
							if (a == 123)
							{
								$("span.cp").hide();
								$(divOverlay).css("display","block");  
								$(div8ID).css("display", "block"); 
								$(div8ID123).css("display", "block");   
							}
							
							if (a == 124)
							{
								$("span.cp").hide();
								$(divOverlay).css("display","block");  
								$(div8ID).css("display", "block"); 
								$(div8ID130).css("display", "block");   
							}
							
							if (a == 126)
							{
								$("span.cp").hide();
								$(divOverlay).css("display","block");  
								$(div8ID).css("display", "block"); 
								$(div8ID130).css("display", "block");   
							}
							
							if (a == 127)
							{
								$("span.cp").hide();
								$(divOverlay).css("display","block");  
								$(div8ID).css("display", "block"); 
								$(div8ID130).css("display", "block");   
							}
							
							if (a == 129)
							{
								$("span.cp").hide();
								$(divOverlay).css("display","block");  
								$(div8ID).css("display", "block"); 
								$(div8ID130).css("display", "block");   
							}
							
							if (a == 130)
							{
								$("span.cp").hide();
								$(divOverlay).css("display","block");  
								$(div8ID).css("display", "block"); 
								$(div8ID130).css("display", "block");   
							}
							
							if (a == 134)
							{
								$("span.cp").hide();
								$(divOverlay).css("display","block");  
								$(div8ID).css("display", "block"); 
								$(div8ID134).css("display", "block");   
							}
							
							if (a == 135)
							{
								$("span.cp").hide();
								$(divOverlay).css("display","block");  
								$(div8ID).css("display", "block"); 
								$(div8ID135).css("display", "block");   
							}
							
							if (a == 159)
							{
								$("span.cp").hide();
								$(divOverlay).css("display","block");  
								$(div8ID).css("display", "block"); 
								$(div8ID159).css("display", "block");   
							}
							
							if (a == 205)
							{
								$("span.cp").hide();
								$(divOverlay).css("display","block");  
								$(div8ID).css("display", "block"); 
								$(div8ID205).css("display", "block");   
							}
							
							if (a == 206)
							{
								$("span.cp").hide();
								$(divOverlay).css("display","block");  
								$(div8ID).css("display", "block"); 
								$(div8ID206).css("display", "block");   
							}
							
							if (a == 999)
							{
								$("span.cp").hide();
								$(divOverlay).css("display","block");  
								$(div8ID).css("display", "block"); 
								$(div8ID999).css("display", "block");   
							}					 		
						},
						
							type: "GET"   
						}); 
					} 					
					
		
					if(flagValue == "add" && ms==0) 
					{ 
				
						$(div5ID).css("display", "none"); 
						$(div9ID).css("display", "none"); 
						$(div10ID).css("display", "none"); 
						$(div11ID).css("display", "none");
						$(div8ID1000).css("display", "none");  
						$.ajax({  	
						url: addFinalUrl,
						type: "GET",   
						dataType: "json",           
 						crossDomain: true,  
 						jsonpCallback: "localJsonpCallback", 						
						error: function(responseData) {
							var a = responseData.responseCode;
							alert("Failure is "+a);										
									},
						success: function(responseData){
							var a = responseData.responseCode;
							 
							if (a == 200)
							{
								$("span.cp").hide();  
								$(divOverlay).css("display","block");  
								$(div8ID).css("display", "block"); 
								$(div8ID200).css("display", "block");
								$(textboxID).prop("disabled",true);   
								$(div1ID).css("display", "none");    
								$(div2ID).css("display", "block"); 	  
								$(div3ID).css("display", "none"); 
							}
							
							if (a == 100)
							{
								$("span.cp").hide();
								$(divOverlay).css("display","block");  
								$(div8ID).css("display", "block"); 
								$(div8ID100).css("display", "block");   
							}
							
							if (a == 102)
							{
								$("span.cp").hide();
								$(divOverlay).css("display","block");  
								$(div8ID).css("display", "block"); 
								$(div8ID102).css("display", "block");   
							}
							
							if (a == 104)
							{
								$("span.cp").hide();
								$(divOverlay).css("display","block");  
								$(div8ID).css("display", "block"); 
								$(div8ID104).css("display", "block");   
							}
							
							if (a == 123)
							{
								$("span.cp").hide();
								$(divOverlay).css("display","block");  
								$(div8ID).css("display", "block"); 
								$(div8ID123).css("display", "block");   
							}
							
							if (a == 124)
							{
								$("span.cp").hide();
								$(divOverlay).css("display","block");  
								$(div8ID).css("display", "block"); 
								$(div8ID130).css("display", "block");   
							}
							
							if (a == 126)
							{
								$("span.cp").hide();
								$(divOverlay).css("display","block");  
								$(div8ID).css("display", "block"); 
								$(div8ID130).css("display", "block");   
							}
							
							if (a == 127)
							{
								$("span.cp").hide();
								$(divOverlay).css("display","block");  
								$(div8ID).css("display", "block"); 
								$(div8ID130).css("display", "block");   
							}
							
							if (a == 129)
							{
								$("span.cp").hide();
								$(divOverlay).css("display","block");  
								$(div8ID).css("display", "block"); 
								$(div8ID130).css("display", "block");   
							}
							
							if (a == 130)
							{
								$("span.cp").hide();
								$(divOverlay).css("display","block");  
								$(div8ID).css("display", "block"); 
								$(div8ID130).css("display", "block");   
							}
							
							if (a == 134)
							{
								$("span.cp").hide();
								$(divOverlay).css("display","block");  
								$(div8ID).css("display", "block"); 
								$(div8ID134).css("display", "block");   
							}
							
							if (a == 135)
							{
								$("span.cp").hide();
								$(divOverlay).css("display","block");  
								$(div8ID).css("display", "block"); 
								$(div8ID135).css("display", "block");   
							}
							
							if (a == 159)
							{
								$("span.cp").hide();
								$(divOverlay).css("display","block");  
								$(div8ID).css("display", "block"); 
								$(div8ID159).css("display", "block");   
							}
							
							if (a == 205)
							{
								$("span.cp").hide();
								$(divOverlay).css("display","block");  
								$(div8ID).css("display", "block"); 
								$(div8ID205).css("display", "block");   
							}
							
							if (a == 206)
							{
								$("span.cp").hide();
								$(divOverlay).css("display","block");  
								$(div8ID).css("display", "block"); 
								$(div8ID206).css("display", "block");   
							}
							
							if (a == 999)
							{
								$("span.cp").hide();
								$(divOverlay).css("display","block");  
								$(div8ID).css("display", "block"); 
								$(div8ID999).css("display", "block");   
							}
						
						} 
						
							   
						}); 
								
					}		
               	}	  
                   return false;
              } 
            
		});  
			}
			
			
			else
			{
				$(this).validate({

					rules: { 
					ph1: "required", 
					ph1: {	required: true, minlength: 8,maxlength: 8,digits: true}
				},
				messages: { 
					ph1: "Ingrese su n&uacute;mero de tel&eacute;fono",  
					ph1: {
						required: "El n&uacute;mero de tel&eacute;fono no puede estar vac&iacute;o ",
						minlength: "Número de teléfono con menos de 8 dígitos",
						maxlength: "Número de teléfono con menos de 8 dígitos",
						digits: "El n&uacute;mero de tel&eacute;fono s&oacute;lo debe contener d&iacute;gitos" 
					} 
				},
            
              submitHandler: function(form) {   				// Using submit handler for validation + handling ajax query simultaneously
					
					if ((form.id == 'phForm1') || (form.id == 'phForm2') || (form.id == 'phForm3')){ 	    			  
					var textboxID = '#' + form.id + ' #main-id-textbox #ph1';  //dynamic value of textbox
					var div1ID = '#' + form.id + ' #boxDiv #add-ph1'; 
					var div2ID = '#' + form.id + ' #boxDiv #edit-ph1';   
					var div3ID = '#' + form.id + ' #boxDiv #confirm-ph1';  
					var div4ID = '#' + form.id + ' #boxDiv #confirmFlag-ph1 #confirmFlag'; //value of confirm hidden div 
					var div5ID = '#' + form.id + ' #boxDiv #deleteMessageDiv';	// value of hidden delete message div	 			
					var div6ID = '#' + form.id + ' #main-id-textbox #cancelFlag-ph1 #cancelFlag';   //value of intial textbox 
					var div7ID = '#' + form.id + ' #boxDiv #valueMsisdn #msisdnValue';
					var divOverlay = '#' + form.id + ' #boxDiv #cover'; 	
				/*	var divOverlays = '#' + form.id + ' #boxDiv #covers'; */					 
					var div8ID = '#' + form.id + ' #boxDiv #popup1';  
					var div8ID200 = '#' + form.id + ' #boxDiv #popup1 #showSpan200'; 
					var div8ID100 = '#' + form.id + ' #boxDiv #popup1 #showSpan100';
					var div8ID102 = '#' + form.id + ' #boxDiv #popup1 #showSpan102';
					var div8ID104 = '#' + form.id + ' #boxDiv #popup1 #showSpan104';
					var div8ID123 = '#' + form.id + ' #boxDiv #popup1 #showSpan123';
					var div8ID124 = '#' + form.id + ' #boxDiv #popup1 #showSpan124';
					var div8ID126 = '#' + form.id + ' #boxDiv #popup1 #showSpan126';
					var div8ID127 = '#' + form.id + ' #boxDiv #popup1 #showSpan127';
					var div8ID129 = '#' + form.id + ' #boxDiv #popup1 #showSpan129';
					var div8ID130 = '#' + form.id + ' #boxDiv #popup1 #showSpan130';
					var div8ID134 = '#' + form.id + ' #boxDiv #popup1 #showSpan134';
					var div8ID135 = '#' + form.id + ' #boxDiv #popup1 #showSpan135';
					var div8ID159 = '#' + form.id + ' #boxDiv #popup1 #showSpan159';
					var div8ID205 = '#' + form.id + ' #boxDiv #popup1 #showSpan205';
					var div8ID206 = '#' + form.id + ' #boxDiv #popup1 #showSpan206';
					var div8ID999 = '#' + form.id + ' #boxDiv #popup1 #showSpan999'; 
					var div9ID = '#' + form.id + ' #boxDiv #noChangeAlert';  
					var div10ID = '#' + form.id + ' #boxDiv #changeMessageDiv';  
					var div11ID = '#' + form.id + ' #boxDiv #addMessageDiv';  
					var div8ID1000 = '#' + form.id + ' #boxDiv #msisdnMessageDiv'; 
					var div8ID1001 = '#' + form.id + ' #boxDiv #popup1 #showSpan1001';
					var div8IDDefault = '#' + form.id + ' #boxDiv #popup1 #showSpanDefault'; 
									
					
					var flagValue = $(div4ID).val();   					// storing confirm hidden div value in flag value variable 
				//	alert("div6ID is " +$("#valueTextval").val());    
					
					var msisdn = $(div7ID).val();     
				//	alert("msisdn is " +msisdn);      					
					
					var initialPhoneNumber = $(div6ID).val();        
				//	alert("initialPhoneNumber "+initialPhoneNumber);  
					
					var addOne = $(textboxID).val(); 								// getting textbox value in variable addOne
				//	alert("AddOne number is "+addOne);    
					
					var msisdnShow = $(div8ID1000).val();  
					
					var ph1val = $("#phForm1 .form-control").val();
					//alert("ph1val is "+ph1val);
					var ph2val = $("#phForm2 .form-control").val();
					//alert("ph2val is "+ph2val);
					var ph3val = $("#phForm3 .form-control").val();
					//alert("ph3val is "+ph3val); 
					
					var k =0;
					
					var newph1val = "53" + ph1val;
					var newph2val = "53" + ph2val; 
					var newph3val = "53" + ph3val; 
					var ms = 0; 
					
						if((newph1val == msisdn) || (newph2val == msisdn) || (newph3val == msisdn))
						{ 
							if((flagValue == "change") || (flagValue == "add"))
							{	
								$(div11ID).css("display", "none");  
								$(div10ID).css("display", "none");   
								$(div9ID).css("display", "none"); 
								$(div8ID1000).css("display", "block"); 
								ms = 1; 
							}
						}
					
					if(flagValue == "change" && addOne == ph1val)
					{
						if(addOne == ph2val || addOne == ph3val || addOne == initialPhoneNumber)
						{
							$(div5ID).css("display", "none"); 	 					
							$(div9ID).css("display", "block");    
							$(div10ID).css("display", "none"); 
							$(div11ID).css("display", "none"); 
							$(div8ID1000).css("display", "none"); 
							k = 1;
						}	
					}
					
					if(flagValue == "change" && addOne == ph2val)
					{
						
						if(addOne == ph1val || addOne == ph3val || addOne == initialPhoneNumber)
						{
							$(div5ID).css("display", "none"); 	 					
							$(div9ID).css("display", "block");    
							$(div10ID).css("display", "none"); 
							$(div11ID).css("display", "none"); 
							$(div8ID1000).css("display", "none"); 
							k = 1;
						}	
					}
					
					if(flagValue == "change" && addOne == ph3val)
					{
						if(addOne == ph1val || addOne == ph2val || addOne == initialPhoneNumber)
						{
							$(div5ID).css("display", "none"); 	 					
							$(div9ID).css("display", "block");    
							$(div10ID).css("display", "none"); 
							$(div11ID).css("display", "none"); 
							$(div8ID1000).css("display", "none"); 
							k = 1;
						}	
					}
			
					
					var delimiter = "/"; 
					var questionAddString = "?numberToAdd=";
					var questionDeleteString = "?numberToDelete=";
					var questionChangeString = "&numberToDelete=";						
					var jsonFormat = "&format=jsonp";
					var subscriber = "&subscriber=";					 
					
					var addInitialUrl = airCallUrl + "addFAFNumber" + questionAddString; 
					var addFinalUrl = addInitialUrl + addOne + subscriber + msisdn + jsonFormat;      	// final url made to add the number
					
				//	alert("final url made is "+addFinalUrl);         
					  
					var changeInitialUrl = airCallUrl + "changeFAFNumber" + questionAddString; 
					var changeFinalUrl = changeInitialUrl + addOne + questionChangeString + initialPhoneNumber + subscriber + msisdn + jsonFormat;   // final url made to change the number
					
					var deleteInitialUrl = airCallUrl + "deleteFAFNumber" + questionDeleteString;       
					var deleteFinalUrl = deleteInitialUrl + addOne + subscriber + msisdn + jsonFormat;    // final url made to delete the number  
					
					if(flagValue == "change" && k==0 && ms==0)                                
					{   
						
						$(div5ID).css("display", "none"); 
						$(div9ID).css("display", "none");  
						$(div10ID).css("display", "none");  
						$(div11ID).css("display", "none"); 
						$(div8ID1000).css("display", "none"); 
						$.ajax({
						url: changeFinalUrl,
						type: "GET",  
						dataType: "json",           
 						crossDomain: true,    
 						jsonpCallback: "localJsonpCallback", 
						error: function(responseData) {
								var a = responseData.responseCode;
								alert("Failure is "+a);	
							        										
									},
						success: function(responseData){
								var a = responseData.responseCode;
								//alert("Success is "+a);	
							
							if (a == 200)
							{
								$("span.cp").hide(); 
								$(divOverlay).css("display","block");  
								$(div8ID).css("display", "block"); 
								$(div8ID200).css("display", "block");
								//$("span.cp").css("display","none"); 
								$(textboxID).prop("disabled",true);
								$(div1ID).css("display", "none");   
								$(div2ID).css("display", "block"); 	
								$(div3ID).css("display", "none");   	
							}	

							else if (a == 100)
							{
								$("span.cp").hide();
								$(divOverlay).css("display","block");  
								$(div8ID).css("display", "block"); 
								$(div8ID100).css("display", "block");   
							}
							
							else if (a == 102)
							{
								$("span.cp").hide();
								$(divOverlay).css("display","block");  
								$(div8ID).css("display", "block"); 
								$(div8ID102).css("display", "block");   
							}
							
							else if (a == 104)
							{
								$("span.cp").hide();
								$(divOverlay).css("display","block");  
								$(div8ID).css("display", "block"); 
								$(div8ID104).css("display", "block");   
							}
							
							else if (a == 123)
							{
								$("span.cp").hide();
								$(divOverlay).css("display","block");  
								$(div8ID).css("display", "block"); 
								$(div8ID123).css("display", "block");   
							}
							
							else if (a == 124)
							{
								$("span.cp").hide();
								$(divOverlay).css("display","block");  
								$(div8ID).css("display", "block"); 
								$(div8ID130).css("display", "block");   
							}
							
							else if (a == 126)
							{
								$("span.cp").hide();
								$(divOverlay).css("display","block");  
								$(div8ID).css("display", "block"); 
								$(div8ID130).css("display", "block");   
							}
							
							else if (a == 127)
							{
								$("span.cp").hide();
								$(divOverlay).css("display","block");  
								$(div8ID).css("display", "block"); 
								$(div8ID130).css("display", "block");   
							}
							
							else if (a == 129)
							{
								$("span.cp").hide();
								$(divOverlay).css("display","block");  
								$(div8ID).css("display", "block"); 
								$(div8ID130).css("display", "block");   
							}
							
							else if (a == 130)
							{
								$("span.cp").hide();
								$(divOverlay).css("display","block");  
								$(div8ID).css("display", "block"); 
								$(div8ID130).css("display", "block");   
							}
							
							else if (a == 134)
							{
								$("span.cp").hide();
								$(divOverlay).css("display","block");  
								$(div8ID).css("display", "block"); 
								$(div8ID134).css("display", "block");   
							}
							
							else if (a == 135)
							{
								$("span.cp").hide();
								$(divOverlay).css("display","block");  
								$(div8ID).css("display", "block"); 
								$(div8ID135).css("display", "block");   
							}
							
							else if (a == 159)
							{
								$("span.cp").hide();
								$(divOverlay).css("display","block");  
								$(div8ID).css("display", "block"); 
								$(div8ID159).css("display", "block");   
							}
							
							else if (a == 205)
							{
								$("span.cp").hide();
								$(divOverlay).css("display","block");  
								$(div8ID).css("display", "block"); 
								$(div8ID205).css("display", "block");   
							}
							
							else if (a == 206)
							{
								$("span.cp").hide();
								$(divOverlay).css("display","block");  
								$(div8ID).css("display", "block"); 
								$(div8ID206).css("display", "block");   
							}
							
							else if (a == 999)
							{
								$("span.cp").hide();
								$(divOverlay).css("display","block");  
								$(div8ID).css("display", "block"); 
								$(div8ID999).css("display", "block");   
							}		

							else if (a == 1001)
							{
								$("span.cp").hide();
								$(divOverlay).css("display","block");  
								$(div8ID).css("display", "block"); 
								$(div8ID1001).css("display", "block");   
							}			

							else
							{
							
								$("span.cp").hide();
								$(divOverlay).css("display","block");  
								$(div8ID).css("display", "block"); 
								$(div8IDDefault).css("display", "block");  
							}							
						}, 
						
							type: "GET"   
						});
					}  
					
					if(flagValue == "delete")
					{
						$(div5ID).css("display", "none"); 
						$(div9ID).css("display", "none"); 
						$(div10ID).css("display", "none"); 
						$(div11ID).css("display", "none");
						
						$.ajax({
						url: deleteFinalUrl,
						type: "GET",  
						dataType: "json",           
 						crossDomain: true,  
 						jsonpCallback: "localJsonpCallback", 
						error: function(responseData) {
							var a = responseData.responseCode;
							alert("Failure is "+a);	        										
									},
						success: function(responseData){
							var a = responseData.responseCode;
								
							
							if (a == 200)
							{
								$("span.cp").hide();  
								$(divOverlay).css("display","block");  
								$(div8ID).css("display", "block"); 
								$(div8ID200).css("display", "block");
								//$("span.cp").css("display","none"); 
								$(textboxID).prop("disabled",false); 
								$(textboxID).val("");
								$(div4ID).val("add");   							
								$(div1ID).css("display", "block");   
								$(div2ID).css("display", "none"); 	
								$(div3ID).css("display", "none"); 	  
							}

							if (a == 100)
							{
								$("span.cp").hide();
								$(divOverlay).css("display","block");  
								$(div8ID).css("display", "block"); 
								$(div8ID100).css("display", "block");   
							}
							
							if (a == 102)
							{
								$("span.cp").hide();
								$(divOverlay).css("display","block");  
								$(div8ID).css("display", "block"); 
								$(div8ID102).css("display", "block");   
							}
							
							if (a == 104)
							{
								$("span.cp").hide();
								$(divOverlay).css("display","block");  
								$(div8ID).css("display", "block"); 
								$(div8ID104).css("display", "block");   
							}
							
							if (a == 123)
							{
								$("span.cp").hide();
								$(divOverlay).css("display","block");  
								$(div8ID).css("display", "block"); 
								$(div8ID123).css("display", "block");   
							}
							
							if (a == 124)
							{
								$("span.cp").hide();
								$(divOverlay).css("display","block");  
								$(div8ID).css("display", "block"); 
								$(div8ID130).css("display", "block");   
							}
							
							if (a == 126)
							{
								$("span.cp").hide();
								$(divOverlay).css("display","block");  
								$(div8ID).css("display", "block"); 
								$(div8ID130).css("display", "block");   
							}
							
							if (a == 127)
							{
								$("span.cp").hide();
								$(divOverlay).css("display","block");  
								$(div8ID).css("display", "block"); 
								$(div8ID130).css("display", "block");   
							}
							
							if (a == 129)
							{
								$("span.cp").hide();
								$(divOverlay).css("display","block");  
								$(div8ID).css("display", "block"); 
								$(div8ID130).css("display", "block");   
							}
							
							if (a == 130)
							{
								$("span.cp").hide();
								$(divOverlay).css("display","block");  
								$(div8ID).css("display", "block"); 
								$(div8ID130).css("display", "block");   
							}
							
							if (a == 134)
							{
								$("span.cp").hide();
								$(divOverlay).css("display","block");  
								$(div8ID).css("display", "block"); 
								$(div8ID134).css("display", "block");   
							}
							
							if (a == 135)
							{
								$("span.cp").hide();
								$(divOverlay).css("display","block");  
								$(div8ID).css("display", "block"); 
								$(div8ID135).css("display", "block");   
							}
							
							if (a == 159)
							{
								$("span.cp").hide();
								$(divOverlay).css("display","block");  
								$(div8ID).css("display", "block"); 
								$(div8ID159).css("display", "block");   
							}
							
							if (a == 205)
							{
								$("span.cp").hide();
								$(divOverlay).css("display","block");  
								$(div8ID).css("display", "block"); 
								$(div8ID205).css("display", "block");   
							}
							
							if (a == 206)
							{
								$("span.cp").hide();
								$(divOverlay).css("display","block");  
								$(div8ID).css("display", "block"); 
								$(div8ID206).css("display", "block");   
							}
							
							if (a == 999)
							{
								$("span.cp").hide();
								$(divOverlay).css("display","block");  
								$(div8ID).css("display", "block"); 
								$(div8ID999).css("display", "block");   
							}					 		
						},
						
							type: "GET"   
						}); 
					} 					
					
		
					if(flagValue == "add" && ms==0) 
					{ 
				
						$(div5ID).css("display", "none"); 
						$(div9ID).css("display", "none"); 
						$(div10ID).css("display", "none"); 
						$(div11ID).css("display", "none");
						$(div8ID1000).css("display", "none");  
						$.ajax({  	
						url: addFinalUrl,
						type: "GET",   
						dataType: "json",           
 						crossDomain: true,  
 						jsonpCallback: "localJsonpCallback", 						
						error: function(responseData) {
							var a = responseData.responseCode;
							alert("Failure is "+a);										
									},
						success: function(responseData){
							var a = responseData.responseCode;
							 
							if (a == 200)
							{
								$("span.cp").hide();  
								$(divOverlay).css("display","block");  
								$(div8ID).css("display", "block"); 
								$(div8ID200).css("display", "block");
								$(textboxID).prop("disabled",true);   
								$(div1ID).css("display", "none");    
								$(div2ID).css("display", "block"); 	  
								$(div3ID).css("display", "none"); 
							}
							
							if (a == 100)
							{
								$("span.cp").hide();
								$(divOverlay).css("display","block");  
								$(div8ID).css("display", "block"); 
								$(div8ID100).css("display", "block");   
							}
							
							if (a == 102)
							{
								$("span.cp").hide();
								$(divOverlay).css("display","block");  
								$(div8ID).css("display", "block"); 
								$(div8ID102).css("display", "block");   
							}
							
							if (a == 104)
							{
								$("span.cp").hide();
								$(divOverlay).css("display","block");  
								$(div8ID).css("display", "block"); 
								$(div8ID104).css("display", "block");   
							}
							
							if (a == 123)
							{
								$("span.cp").hide();
								$(divOverlay).css("display","block");  
								$(div8ID).css("display", "block"); 
								$(div8ID123).css("display", "block");   
							}
							
							if (a == 124)
							{
								$("span.cp").hide();
								$(divOverlay).css("display","block");  
								$(div8ID).css("display", "block"); 
								$(div8ID130).css("display", "block");   
							}
							
							if (a == 126)
							{
								$("span.cp").hide();
								$(divOverlay).css("display","block");  
								$(div8ID).css("display", "block"); 
								$(div8ID130).css("display", "block");   
							}
							
							if (a == 127)
							{
								$("span.cp").hide();
								$(divOverlay).css("display","block");  
								$(div8ID).css("display", "block"); 
								$(div8ID130).css("display", "block");   
							}
							
							if (a == 129)
							{
								$("span.cp").hide();
								$(divOverlay).css("display","block");  
								$(div8ID).css("display", "block"); 
								$(div8ID130).css("display", "block");   
							}
							
							if (a == 130)
							{
								$("span.cp").hide();
								$(divOverlay).css("display","block");  
								$(div8ID).css("display", "block"); 
								$(div8ID130).css("display", "block");   
							}
							
							if (a == 134)
							{
								$("span.cp").hide();
								$(divOverlay).css("display","block");  
								$(div8ID).css("display", "block"); 
								$(div8ID134).css("display", "block");   
							}
							
							if (a == 135)
							{
								$("span.cp").hide();
								$(divOverlay).css("display","block");  
								$(div8ID).css("display", "block"); 
								$(div8ID135).css("display", "block");   
							}
							
							if (a == 159)
							{
								$("span.cp").hide();
								$(divOverlay).css("display","block");  
								$(div8ID).css("display", "block"); 
								$(div8ID159).css("display", "block");   
							}
							
							if (a == 205)
							{
								$("span.cp").hide();
								$(divOverlay).css("display","block");  
								$(div8ID).css("display", "block"); 
								$(div8ID205).css("display", "block");   
							}
							
							if (a == 206)
							{
								$("span.cp").hide();
								$(divOverlay).css("display","block");  
								$(div8ID).css("display", "block"); 
								$(div8ID206).css("display", "block");   
							}
							
							if (a == 999)
							{
								$("span.cp").hide();
								$(divOverlay).css("display","block");  
								$(div8ID).css("display", "block"); 
								$(div8ID999).css("display", "block");   
							}
						
						} 
						
							   
						}); 
								
					}		
               	}	  
                   return false;
              } 
            
		});  
			}
			
			});	
			
			function refresh_captcha(jfldcls){
if (jfldcls == null){
jfldcls = "";
}
anum = (Math.floor(Math.random()*199))+1;
imgid = parseInt(anum);
cword = 
["7880c97be8d9a4947a622c2ed00ba491",
"97d26422c4b98e265a9594e9b8d9ffc8",
"7bdbf80a423b4ff0c54cc528d1c3969e",
"0693fe7c062d4f0906f36a8e89439646",
"dc9b1131722553bf3a6995ae85466dcf",
"2c3a6b7e3e76217954693940777178ad",
"81ee8c63724b582d051d42df4e3a5d4b",
"f48132fd9bec1fb7f63d96ad2c5959a2",
"609a8f6f218fdfe6f955e19f818ec050",
"cbf4e0b7971051760907c327e975f4e5",
"8cb554127837a4002338c10a299289fb",
"28f9b1cae5ae23caa8471696342f6f0c",
"74e04ddb55ce3825f65ebec374ef8f0d",
"567904efe9e64d9faf3e41ef402cb568",
"7edabf994b76a00cbc60c95af337db8f",
"639849f6b368019778991b32434354fc",
"7edabf994b76a00cbc60c95af337db8f",
"dd8fc45d87f91c6f9a9f43a3f355a94a",
"eb5c1399a871211c7e7ed732d15e3a8b",
"8cb554127837a4002338c10a299289fb",
"0b8263d341de01f741e4deadfb18f9eb",
"87fa4eaaf3698e1b1e2caadabbc8ca60",
"327a6c4304ad5938eaf0efb6cc3e53dc",
"841a2d689ad86bd1611447453c22c6fc",
"ceb20772e0c9d240c75eb26b0e37abee",
"a3e2a6cbf4437e50816a60a64375490e",
"bc8fba5b68a7babc05ec51771bf6be21",
"68934a3e9455fa72420237eb05902327",
"c9fab33e9458412c527c3fe8a13ee37d",
"2fc01ec765ec0cb3dcc559126de20b30",
"fcc790c72a86190de1b549d0ddc6f55c",
"918b81db5e91d031548b963c93845e5b",
"9dfc8dce7280fd49fc6e7bf0436ed325",
"ea82410c7a9991816b5eeeebe195e20a",
"fb81c91eb92d6cb64aeb64c3f37ef2c4",
"8d45c85b51b27a04ad7fdfc3f126f9f8",
"70dda5dfb8053dc6d1c492574bce9bfd",
"b9b83bad6bd2b4f7c40109304cf580e1",
"981c1e7b3795da18687613fbd66d4954",
"e170e3a15923188224c1c2bd1477d451",
"fb81c91eb92d6cb64aeb64c3f37ef2c4",
"cb15e32f389b7af9b285a63ca1044651",
"632a2406bbcbcd553eec45ac14b40a0a",
"e7b95b49658278100801c88833a52522",
"6d4db5ff0c117864a02827bad3c361b9",
"8b373710bcf876edd91f281e50ed58ab",
"508c75c8507a2ae5223dfd2faeb98122",
"97f014516561ef487ec368d6158eb3f4",
"23678db5efde9ab46bce8c23a6d91b50",
"2d6b0cefb06fd579a62bf56f02b6c2b3",
"f1bdf5ed1d7ad7ede4e3809bd35644b0",
"3ddaeb82fbba964fb3461d4e4f1342eb",
"c9507f538a6e79c9bd6229981d6e05a3",
"9e925e9341b490bfd3b4c4ca3b0c1ef2",
"125097a929a62998c06340ea9ef43d77",
"a557264a7d6c783f6fb57fb7d0b9d6b0",
"eba478647c77836e50de44b323564bdb",
"45fe7e5529d283851d93b74536e095a0",
"56609ab6ba04048adc2cbfafbe745e10",
"d938ad5cbe68bec494fbbf4463ad031d",
"9bbd993d9da7df60b3fd4a4ed721b082",
"a6ab62e9da89b20d720c70602624bfc2",
"51037a4a37730f52c8732586d3aaa316",
"7c4f29407893c334a6cb7a87bf045c0d",
"3b7770f7743e8f01f0fd807f304a21d0",
"29d233ae0b83eff6e5fbd67134b88717",
"8d45c85b51b27a04ad7fdfc3f126f9f8",
"9aa91f81de7610b371dd0e6fe4168b01",
"9f27410725ab8cc8854a2769c7a516b8",
"6ee6a213cb02554a63b1867143572e70",
"918b81db5e91d031548b963c93845e5b",
"3767b450824877f2b8f284f7a5625440",
"81513effdf5790b79549208838404407",
"7aea2552dfe7eb84b9443b6fc9ba6e01",
"d8735f7489c94f42f508d7eb1c249584",
"fde27e470207e146b29b8906826589cb",
"2a2d595e6ed9a0b24f027f2b63b134d6",
"99e0d947e01bbc0a507a1127dc2135b1",
"6758fcdc0da017540d11889c22bb5a6e",
"ab1991b4286f7e79720fe0d4011789c8",
"28f9b1cae5ae23caa8471696342f6f0c",
"f5b75010ea8a54b96f8fe7dafac65c18",
"2570c919f5ef1d7091f0f66d54dac974",
"ada15bd1a5ddf0b790ae1dcfd05a1e70",
"eb88d7636980738cd0522ea69e212905",
"83ab982dd08483187289a75163dc50fe",
"8ac20bf5803e6067a65165d9df51a8e7",
"7c4f29407893c334a6cb7a87bf045c0d",
"67942503875c1ae74e4b5b80a0dade01",
"d74fdde2944f475adc4a85e349d4ee7b",
"163ccb6353c3b5f4f03cda0f1c5225ba",
"6b1628b016dff46e6fa35684be6acc96",
"de1b2a7baf7850243db71c4abd4e5a39",
"5eda0ea98768e91b815fa6667e4f0178",
"23ec24c5ca59000543cee1dfded0cbea",
"ea9e801b0d806f2398bd0c7fe3f3f0cd",
"35393c24384b8862798716628f7bc6f4",
"28b26be59c986170c572133aaace31c2",
"c2bfd01762cfbe4e34cc97b9769b4238",
"22811dd94d65037ef86535740b98dec8",
"acaa16770db76c1ffb9cee51c3cabfcf",
"7516c3b35580b3490248629cff5e498c",
"b04ab37e571600800864f7a311e2a386",
"7e25b972e192b01004b62346ee9975a5",
"2764ca9d34e90313978d044f27ae433b",
"660cb6fe7437d4b40e4a04b706b93f70",
"87a429872c7faee7e8bc9268d5bf548e",
"31c13f47ad87dd7baa2d558a91e0fbb9",
"e6ec529ba185279aa0adcf93e645c7cd",
"21a361d96e3e13f5f109748c2a9d2434",
"85814ce7d88361ec8eb8e07294043bc3",
"a5fdad9de7faf3a0492812b9cb818d85",
"0b8263d341de01f741e4deadfb18f9eb",
"0cb47aeb6e5f9323f0969e628c4e59f5",
"23a58bf9274bedb19375e527a0744fa9",
"7e25b972e192b01004b62346ee9975a5",
"b9d27d6b3d1915aacd5226b9d702bdbb",
"6758fcdc0da017540d11889c22bb5a6e",
"e2704f30f596dbe4e22d1d443b10e004",
"da4f0053a5c13882268852ae2da2e466",
"1562eb3f6d9c5ac7e159c04a96ff4dfe",
"a94aa000f9a94cc51775bd5eac97c926",
"1e4483e833025ac10e6184e75cb2d19d",
"a957a3153eb7126b1c5f8b6aac35de53",
"731b886d80d2ea138da54d30f43b2005",
"a850c17cba5eb16b0d3d40a106333bd5",
"7516c3b35580b3490248629cff5e498c",
"d508fe45cecaf653904a0e774084bb5c",
"18ccf61d533b600bbf5a963359223fe4",
"f4d3b5a1116ded3facefb8353d0bd5ba",
"28b26be59c986170c572133aaace31c2",
"d5ca322453f2986b752e58b11af83d96",
"37b19816109a32106d109e83bbb3c97d",
"0423fa423baf1ea8139f6662869faf2f",
"8ab8a4dfab57b4618331ffc958ebb4ec",
"85814ce7d88361ec8eb8e07294043bc3",
"273b9ae535de53399c86a9b83148a8ed",
"4c9184f37cff01bcdc32dc486ec36961",
"8ee2027983915ec78acc45027d874316",
"1cba77c39b4d0a81024a7aada3655a28",
"de1b2a7baf7850243db71c4abd4e5a39",
"608f0b988db4a96066af7dd8870de96c",
"06a224da9e61bee19ec9eef88b95f934",
"df55340f75b5da454e1c189d56d7f31b",
"8c728e685ddde9f7fbbc452155e29639",
"2570c919f5ef1d7091f0f66d54dac974",
"dce7c4174ce9323904a934a486c41288",
"573ce5969e9884d49d4fab77b09a306a",
"d5ca322453f2986b752e58b11af83d96",
"eb88d7636980738cd0522ea69e212905",
"e7e94d9ef1edaf2c6c55e9966b551295",
"762f8817ab6af0971fe330dbf46a359a",
"d8a48e3f0e1322d53d401e3dcb3360db",
"c1940aeeb9693a02e28c52eb85ce261c",
"d74fdde2944f475adc4a85e349d4ee7b",
"b6a5d96a4e99b63723ab54ddb471baad",
"6b157916b43b09df5a22f658ccb92b64",
"bec670e5a55424d840db8636ecc28828",
"4a6cbcd66d270792b89f50771604d093",
"07202a7e6cbfbabe27abba87989f807e",
"d60db28d94d538bbb249dcc7f2273ab1",
"123402c04dcfb6625f688f771a5fc05d",
"cd69b4957f06cd818d7bf3d61980e291",
"be1ab1632e4285edc3733b142935c60b",
"2bda2998d9b0ee197da142a0447f6725",
"ba535ef5a9f7b8bc875812bb081286bb",
"e9f40e1f1d1658681dad2dac4ae0971e",
"eabe04e738cfb621f819e4e8f9489234",
"aa2d6e4f578eb0cfaba23beef76c2194",
"126ac4b07f93bc4f7bed426f5e978c16",
"f43dff9a0dc54f0643d0c6d7971635f0",
"ccaaac957ec37bde4c9993a26a064730",
"2feaaf89c21770ea5c21196bc33848dd",
"07cf4f8f5d8b76282917320715dda2ad",
"1ffd9e753c8054cc61456ac7fac1ac89",
"6050ce63e4bce6764cb34cac51fb44d1",
"327a6c4304ad5938eaf0efb6cc3e53dc",
"b82c91e2103d0a495c099f0a12f66363",
"41d1de28e96dc1cde568d3b068fa17bb",
"cad1c068cb62b0681fe4c33d1db1bad6",
"de1b2a7baf7850243db71c4abd4e5a39",
"75e52a0ecfafeda17a34fc60111c1f0b",
"fc7e987f23de5bd6562b7c0063cad659",
"126ac4b07f93bc4f7bed426f5e978c16",
"fcc790c72a86190de1b549d0ddc6f55c",
"72792fa10d4ca61295194377da0bcc05",
"821f03288846297c2cf43c34766a38f7",
"faec47e96bfb066b7c4b8c502dc3f649",
"78b6367af86e03f19809449e2c365ff5",
"015f28b9df1bdd36427dd976fb73b29d",
"755f85c2723bb39381c7379a604160d8",
"60ee0bc62638fccf2d37ac27a634a9e9",
"68e2d83709f317938b51e53f7552ed04",
"f4c9385f1902f7334b00b9b4ecd164de",
"df491a4de50739fa9cffdbd4e3f4b4bb",
"ef56b0b0ddb93c2885892c06be830c68",
"fe4c0f30aa359c41d9f9a5f69c8c4192",
"cbf4e0b7971051760907c327e975f4e5",
"ea9e801b0d806f2398bd0c7fe3f3f0cd"
];

//alert(decodeURIComponent("../images/cimg/") + imgid + ".jpg");
document.getElementById("uword").value='';
//document.getElementById("imgIDD").innerHTML="";
document.getElementById("captchaError").innerHTML="";
document.getElementById("captchaError").innerHTML="<p id='captchaError'></p>";
document.getElementById("imgIDD").src=decodeURIComponent(imgdir) + imgid + ".jpg";
}

});
/*
  $(function() {
    $( "#accordion" ).accordion({collapsible: true,animate: 500});

  });*/
  
/**
  * @author ComFreek
  * @license MIT (c) 2013-2015 ComFreek <http://stackoverflow.com/users/603003/comfreek>
  * Please retain this author and license notice!
  
(function(exports){
    function valOrFunction(val,ctx,args){
        if(typeof val=="function"){
            return val.apply(ctx, args);
        } else{
            return val;
        }
    }

    function InvalidInputHelper(input,options){
		//alert("calls invalidhelper"); 
        input.setCustomValidity(valOrFunction(options.defaultText,window,[input]));

        function changeOrInput(){
            if(input.value == ""){
                input.setCustomValidity(valOrFunction(options.emptyText,window,[input]));
            } else {
                input.setCustomValidity("");
            }
        }

        function invalid(){
            if(input.value == ""){
                input.setCustomValidity(valOrFunction(options.emptyText,window,[input]));
            }else {
               input.setCustomValidity(valOrFunction(options.invalidText,window,[input]));
            }
        }

        input.addEventListener("change",changeOrInput);
        input.addEventListener("input",changeOrInput);
        input.addEventListener("invalid",invalid);
    }
    exports.InvalidInputHelper = InvalidInputHelper; 
})(window);

$('document').ready(function(){
    InvalidInputHelper(document.getElementById("ph1"),{     
    defaultText: "El n&uacute;mero de tel&eacute;fono debe contener 8 d&iacute;gitos",
    emptyText: "El n&uacute;mero de tel&eacute;fono no puede estar vac&iacute;o",
    invalidText:function(input){
        return 'Number entered "'+input.value+ '" is invalid!';   
    }
}); 
}); */



// PRINCIPIO CODIGO DE MD5.JS
/*
 * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
 * Digest Algorithm, as defined in RFC 1321.
 * Version 2.1 Copyright (C) Paul Johnston 1999 - 2002.
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for more info.
 */

/*
 * Configurable variables. You may need to tweak these to be compatible with
 * the server-side, but the defaults work in most cases.
 */
var hexcase = 0;  /* hex output format. 0 - lowercase; 1 - uppercase        */
var b64pad  = ""; /* base-64 pad character. "=" for strict RFC compliance   */
var chrsz   = 8;  /* bits per input character. 8 - ASCII; 16 - Unicode      */

/*
 * These are the functions you'll usually want to call
 * They take string arguments and return either hex or base-64 encoded strings
 */
function hex_md5(s){ return binl2hex(core_md5(str2binl(s), s.length * chrsz));}
function b64_md5(s){ return binl2b64(core_md5(str2binl(s), s.length * chrsz));}
function str_md5(s){ return binl2str(core_md5(str2binl(s), s.length * chrsz));}
function hex_hmac_md5(key, data) { return binl2hex(core_hmac_md5(key, data)); }
function b64_hmac_md5(key, data) { return binl2b64(core_hmac_md5(key, data)); }
function str_hmac_md5(key, data) { return binl2str(core_hmac_md5(key, data)); }

/*
 * Perform a simple self-test to see if the VM is working
 */
function md5_vm_test()
{
  return hex_md5("abc") == "900150983cd24fb0d6963f7d28e17f72";
}

/*
 * Calculate the MD5 of an array of little-endian words, and a bit length
 */
function core_md5(x, len)
{
  /* append padding */
  x[len >> 5] |= 0x80 << ((len) % 32);
  x[(((len + 64) >>> 9) << 4) + 14] = len;

  var a =  1732584193;
  var b = -271733879;
  var c = -1732584194;
  var d =  271733878;

  for(var i = 0; i < x.length; i += 16)
  {
    var olda = a;
    var oldb = b;
    var oldc = c;
    var oldd = d;

    a = md5_ff(a, b, c, d, x[i+ 0], 7 , -680876936);
    d = md5_ff(d, a, b, c, x[i+ 1], 12, -389564586);
    c = md5_ff(c, d, a, b, x[i+ 2], 17,  606105819);
    b = md5_ff(b, c, d, a, x[i+ 3], 22, -1044525330);
    a = md5_ff(a, b, c, d, x[i+ 4], 7 , -176418897);
    d = md5_ff(d, a, b, c, x[i+ 5], 12,  1200080426);
    c = md5_ff(c, d, a, b, x[i+ 6], 17, -1473231341);
    b = md5_ff(b, c, d, a, x[i+ 7], 22, -45705983);
    a = md5_ff(a, b, c, d, x[i+ 8], 7 ,  1770035416);
    d = md5_ff(d, a, b, c, x[i+ 9], 12, -1958414417);
    c = md5_ff(c, d, a, b, x[i+10], 17, -42063);
    b = md5_ff(b, c, d, a, x[i+11], 22, -1990404162);
    a = md5_ff(a, b, c, d, x[i+12], 7 ,  1804603682);
    d = md5_ff(d, a, b, c, x[i+13], 12, -40341101);
    c = md5_ff(c, d, a, b, x[i+14], 17, -1502002290);
    b = md5_ff(b, c, d, a, x[i+15], 22,  1236535329);

    a = md5_gg(a, b, c, d, x[i+ 1], 5 , -165796510);
    d = md5_gg(d, a, b, c, x[i+ 6], 9 , -1069501632);
    c = md5_gg(c, d, a, b, x[i+11], 14,  643717713);
    b = md5_gg(b, c, d, a, x[i+ 0], 20, -373897302);
    a = md5_gg(a, b, c, d, x[i+ 5], 5 , -701558691);
    d = md5_gg(d, a, b, c, x[i+10], 9 ,  38016083);
    c = md5_gg(c, d, a, b, x[i+15], 14, -660478335);
    b = md5_gg(b, c, d, a, x[i+ 4], 20, -405537848);
    a = md5_gg(a, b, c, d, x[i+ 9], 5 ,  568446438);
    d = md5_gg(d, a, b, c, x[i+14], 9 , -1019803690);
    c = md5_gg(c, d, a, b, x[i+ 3], 14, -187363961);
    b = md5_gg(b, c, d, a, x[i+ 8], 20,  1163531501);
    a = md5_gg(a, b, c, d, x[i+13], 5 , -1444681467);
    d = md5_gg(d, a, b, c, x[i+ 2], 9 , -51403784);
    c = md5_gg(c, d, a, b, x[i+ 7], 14,  1735328473);
    b = md5_gg(b, c, d, a, x[i+12], 20, -1926607734);

    a = md5_hh(a, b, c, d, x[i+ 5], 4 , -378558);
    d = md5_hh(d, a, b, c, x[i+ 8], 11, -2022574463);
    c = md5_hh(c, d, a, b, x[i+11], 16,  1839030562);
    b = md5_hh(b, c, d, a, x[i+14], 23, -35309556);
    a = md5_hh(a, b, c, d, x[i+ 1], 4 , -1530992060);
    d = md5_hh(d, a, b, c, x[i+ 4], 11,  1272893353);
    c = md5_hh(c, d, a, b, x[i+ 7], 16, -155497632);
    b = md5_hh(b, c, d, a, x[i+10], 23, -1094730640);
    a = md5_hh(a, b, c, d, x[i+13], 4 ,  681279174);
    d = md5_hh(d, a, b, c, x[i+ 0], 11, -358537222);
    c = md5_hh(c, d, a, b, x[i+ 3], 16, -722521979);
    b = md5_hh(b, c, d, a, x[i+ 6], 23,  76029189);
    a = md5_hh(a, b, c, d, x[i+ 9], 4 , -640364487);
    d = md5_hh(d, a, b, c, x[i+12], 11, -421815835);
    c = md5_hh(c, d, a, b, x[i+15], 16,  530742520);
    b = md5_hh(b, c, d, a, x[i+ 2], 23, -995338651);

    a = md5_ii(a, b, c, d, x[i+ 0], 6 , -198630844);
    d = md5_ii(d, a, b, c, x[i+ 7], 10,  1126891415);
    c = md5_ii(c, d, a, b, x[i+14], 15, -1416354905);
    b = md5_ii(b, c, d, a, x[i+ 5], 21, -57434055);
    a = md5_ii(a, b, c, d, x[i+12], 6 ,  1700485571);
    d = md5_ii(d, a, b, c, x[i+ 3], 10, -1894986606);
    c = md5_ii(c, d, a, b, x[i+10], 15, -1051523);
    b = md5_ii(b, c, d, a, x[i+ 1], 21, -2054922799);
    a = md5_ii(a, b, c, d, x[i+ 8], 6 ,  1873313359);
    d = md5_ii(d, a, b, c, x[i+15], 10, -30611744);
    c = md5_ii(c, d, a, b, x[i+ 6], 15, -1560198380);
    b = md5_ii(b, c, d, a, x[i+13], 21,  1309151649);
    a = md5_ii(a, b, c, d, x[i+ 4], 6 , -145523070);
    d = md5_ii(d, a, b, c, x[i+11], 10, -1120210379);
    c = md5_ii(c, d, a, b, x[i+ 2], 15,  718787259);
    b = md5_ii(b, c, d, a, x[i+ 9], 21, -343485551);

    a = safe_add(a, olda);
    b = safe_add(b, oldb);
    c = safe_add(c, oldc);
    d = safe_add(d, oldd);
  }
  return Array(a, b, c, d);

}

/*
 * These functions implement the four basic operations the algorithm uses.
 */
function md5_cmn(q, a, b, x, s, t)
{
  return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s),b);
}
function md5_ff(a, b, c, d, x, s, t)
{
  return md5_cmn((b & c) | ((~b) & d), a, b, x, s, t);
}
function md5_gg(a, b, c, d, x, s, t)
{
  return md5_cmn((b & d) | (c & (~d)), a, b, x, s, t);
}
function md5_hh(a, b, c, d, x, s, t)
{
  return md5_cmn(b ^ c ^ d, a, b, x, s, t);
}
function md5_ii(a, b, c, d, x, s, t)
{
  return md5_cmn(c ^ (b | (~d)), a, b, x, s, t);
}

/*
 * Calculate the HMAC-MD5, of a key and some data
 */
function core_hmac_md5(key, data)
{
  var bkey = str2binl(key);
  if(bkey.length > 16) bkey = core_md5(bkey, key.length * chrsz);

  var ipad = Array(16), opad = Array(16);
  for(var i = 0; i < 16; i++)
  {
    ipad[i] = bkey[i] ^ 0x36363636;
    opad[i] = bkey[i] ^ 0x5C5C5C5C;
  }

  var hash = core_md5(ipad.concat(str2binl(data)), 512 + data.length * chrsz);
  return core_md5(opad.concat(hash), 512 + 128);
}

/*
 * Add integers, wrapping at 2^32. This uses 16-bit operations internally
 * to work around bugs in some JS interpreters.
 */
function safe_add(x, y)
{
  var lsw = (x & 0xFFFF) + (y & 0xFFFF);
  var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
  return (msw << 16) | (lsw & 0xFFFF);
}

/*
 * Bitwise rotate a 32-bit number to the left.
 */
function bit_rol(num, cnt)
{
  return (num << cnt) | (num >>> (32 - cnt));
}

/*
 * Convert a string to an array of little-endian words
 * If chrsz is ASCII, characters >255 have their hi-byte silently ignored.
 */
function str2binl(str)
{
  var bin = Array();
  var mask = (1 << chrsz) - 1;
  for(var i = 0; i < str.length * chrsz; i += chrsz)
    bin[i>>5] |= (str.charCodeAt(i / chrsz) & mask) << (i%32);
  return bin;
}

/*
 * Convert an array of little-endian words to a string
 */
function binl2str(bin)
{
  var str = "";
  var mask = (1 << chrsz) - 1;
  for(var i = 0; i < bin.length * 32; i += chrsz)
    str += String.fromCharCode((bin[i>>5] >>> (i % 32)) & mask);
  return str;
}

/*
 * Convert an array of little-endian words to a hex string.
 */
function binl2hex(binarray)
{
  var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
  var str = "";
  for(var i = 0; i < binarray.length * 4; i++)
  {
    str += hex_tab.charAt((binarray[i>>2] >> ((i%4)*8+4)) & 0xF) +
           hex_tab.charAt((binarray[i>>2] >> ((i%4)*8  )) & 0xF);
  }
  return str;
}

/*
 * Convert an array of little-endian words to a base-64 string
 */
function binl2b64(binarray)
{
  var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  var str = "";
  for(var i = 0; i < binarray.length * 4; i += 3)
  {
    var triplet = (((binarray[i   >> 2] >> 8 * ( i   %4)) & 0xFF) << 16)
                | (((binarray[i+1 >> 2] >> 8 * ((i+1)%4)) & 0xFF) << 8 )
                |  ((binarray[i+2 >> 2] >> 8 * ((i+2)%4)) & 0xFF);
    for(var j = 0; j < 4; j++)
    {
      if(i * 8 + j * 6 > binarray.length * 32) str += b64pad;
      else str += tab.charAt((triplet >> 6*(3-j)) & 0x3F);
    }
  }
  return str;
}
// FIN CODIGO DE MD5.JS




// PRINCIPIO CODIGO DE JCAP.JS
<!-- Original:  Jonathan Feaster (http://www.bitdesigner.com/) -->

<!-- Web Site:  http://www.bitdesigner.com/ -->

<!-- Version: 2.0 -->

<!-- Based on: Gimpy CAPTCHA Project at Carnegie Mellon University (http://www.captcha.net/) -->

<!-- Begin



var imgdir = "/EtescaSelfCareApp/images/cimg/"; // identify directory where captcha images are located

var jfldid = "uword"; // identify word field id name
var jfldsz = 10; // identify word field size

function sjcap(jfldcls){

imgdir = encodeURIComponent(imgdir );

if (jfldcls == null){
jfldcls = "";
}
anum = (Math.floor(Math.random()*199))+1;
imgid = parseInt(anum);
cword = 
["7880c97be8d9a4947a622c2ed00ba491",
"97d26422c4b98e265a9594e9b8d9ffc8",
"7bdbf80a423b4ff0c54cc528d1c3969e",
"0693fe7c062d4f0906f36a8e89439646",
"dc9b1131722553bf3a6995ae85466dcf",
"2c3a6b7e3e76217954693940777178ad",
"81ee8c63724b582d051d42df4e3a5d4b",
"f48132fd9bec1fb7f63d96ad2c5959a2",
"609a8f6f218fdfe6f955e19f818ec050",
"cbf4e0b7971051760907c327e975f4e5",
"8cb554127837a4002338c10a299289fb",
"28f9b1cae5ae23caa8471696342f6f0c",
"74e04ddb55ce3825f65ebec374ef8f0d",
"567904efe9e64d9faf3e41ef402cb568",
"7edabf994b76a00cbc60c95af337db8f",
"639849f6b368019778991b32434354fc",
"7edabf994b76a00cbc60c95af337db8f",
"dd8fc45d87f91c6f9a9f43a3f355a94a",
"eb5c1399a871211c7e7ed732d15e3a8b",
"8cb554127837a4002338c10a299289fb",
"0b8263d341de01f741e4deadfb18f9eb",
"87fa4eaaf3698e1b1e2caadabbc8ca60",
"327a6c4304ad5938eaf0efb6cc3e53dc",
"841a2d689ad86bd1611447453c22c6fc",
"ceb20772e0c9d240c75eb26b0e37abee",
"a3e2a6cbf4437e50816a60a64375490e",
"bc8fba5b68a7babc05ec51771bf6be21",
"68934a3e9455fa72420237eb05902327",
"c9fab33e9458412c527c3fe8a13ee37d",
"2fc01ec765ec0cb3dcc559126de20b30",
"fcc790c72a86190de1b549d0ddc6f55c",
"918b81db5e91d031548b963c93845e5b",
"9dfc8dce7280fd49fc6e7bf0436ed325",
"ea82410c7a9991816b5eeeebe195e20a",
"fb81c91eb92d6cb64aeb64c3f37ef2c4",
"8d45c85b51b27a04ad7fdfc3f126f9f8",
"70dda5dfb8053dc6d1c492574bce9bfd",
"b9b83bad6bd2b4f7c40109304cf580e1",
"981c1e7b3795da18687613fbd66d4954",
"e170e3a15923188224c1c2bd1477d451",
"fb81c91eb92d6cb64aeb64c3f37ef2c4",
"cb15e32f389b7af9b285a63ca1044651",
"632a2406bbcbcd553eec45ac14b40a0a",
"e7b95b49658278100801c88833a52522",
"6d4db5ff0c117864a02827bad3c361b9",
"8b373710bcf876edd91f281e50ed58ab",
"508c75c8507a2ae5223dfd2faeb98122",
"97f014516561ef487ec368d6158eb3f4",
"23678db5efde9ab46bce8c23a6d91b50",
"2d6b0cefb06fd579a62bf56f02b6c2b3",
"f1bdf5ed1d7ad7ede4e3809bd35644b0",
"3ddaeb82fbba964fb3461d4e4f1342eb",
"c9507f538a6e79c9bd6229981d6e05a3",
"9e925e9341b490bfd3b4c4ca3b0c1ef2",
"125097a929a62998c06340ea9ef43d77",
"a557264a7d6c783f6fb57fb7d0b9d6b0",
"eba478647c77836e50de44b323564bdb",
"45fe7e5529d283851d93b74536e095a0",
"56609ab6ba04048adc2cbfafbe745e10",
"d938ad5cbe68bec494fbbf4463ad031d",
"9bbd993d9da7df60b3fd4a4ed721b082",
"a6ab62e9da89b20d720c70602624bfc2",
"51037a4a37730f52c8732586d3aaa316",
"7c4f29407893c334a6cb7a87bf045c0d",
"3b7770f7743e8f01f0fd807f304a21d0",
"29d233ae0b83eff6e5fbd67134b88717",
"8d45c85b51b27a04ad7fdfc3f126f9f8",
"9aa91f81de7610b371dd0e6fe4168b01",
"9f27410725ab8cc8854a2769c7a516b8",
"6ee6a213cb02554a63b1867143572e70",
"918b81db5e91d031548b963c93845e5b",
"3767b450824877f2b8f284f7a5625440",
"81513effdf5790b79549208838404407",
"7aea2552dfe7eb84b9443b6fc9ba6e01",
"d8735f7489c94f42f508d7eb1c249584",
"fde27e470207e146b29b8906826589cb",
"2a2d595e6ed9a0b24f027f2b63b134d6",
"99e0d947e01bbc0a507a1127dc2135b1",
"6758fcdc0da017540d11889c22bb5a6e",
"ab1991b4286f7e79720fe0d4011789c8",
"28f9b1cae5ae23caa8471696342f6f0c",
"f5b75010ea8a54b96f8fe7dafac65c18",
"2570c919f5ef1d7091f0f66d54dac974",
"ada15bd1a5ddf0b790ae1dcfd05a1e70",
"eb88d7636980738cd0522ea69e212905",
"83ab982dd08483187289a75163dc50fe",
"8ac20bf5803e6067a65165d9df51a8e7",
"7c4f29407893c334a6cb7a87bf045c0d",
"67942503875c1ae74e4b5b80a0dade01",
"d74fdde2944f475adc4a85e349d4ee7b",
"163ccb6353c3b5f4f03cda0f1c5225ba",
"6b1628b016dff46e6fa35684be6acc96",
"de1b2a7baf7850243db71c4abd4e5a39",
"5eda0ea98768e91b815fa6667e4f0178",
"23ec24c5ca59000543cee1dfded0cbea",
"ea9e801b0d806f2398bd0c7fe3f3f0cd",
"35393c24384b8862798716628f7bc6f4",
"28b26be59c986170c572133aaace31c2",
"c2bfd01762cfbe4e34cc97b9769b4238",
"22811dd94d65037ef86535740b98dec8",
"acaa16770db76c1ffb9cee51c3cabfcf",
"7516c3b35580b3490248629cff5e498c",
"b04ab37e571600800864f7a311e2a386",
"7e25b972e192b01004b62346ee9975a5",
"2764ca9d34e90313978d044f27ae433b",
"660cb6fe7437d4b40e4a04b706b93f70",
"87a429872c7faee7e8bc9268d5bf548e",
"31c13f47ad87dd7baa2d558a91e0fbb9",
"e6ec529ba185279aa0adcf93e645c7cd",
"21a361d96e3e13f5f109748c2a9d2434",
"85814ce7d88361ec8eb8e07294043bc3",
"a5fdad9de7faf3a0492812b9cb818d85",
"0b8263d341de01f741e4deadfb18f9eb",
"0cb47aeb6e5f9323f0969e628c4e59f5",
"23a58bf9274bedb19375e527a0744fa9",
"7e25b972e192b01004b62346ee9975a5",
"b9d27d6b3d1915aacd5226b9d702bdbb",
"6758fcdc0da017540d11889c22bb5a6e",
"e2704f30f596dbe4e22d1d443b10e004",
"da4f0053a5c13882268852ae2da2e466",
"1562eb3f6d9c5ac7e159c04a96ff4dfe",
"a94aa000f9a94cc51775bd5eac97c926",
"1e4483e833025ac10e6184e75cb2d19d",
"a957a3153eb7126b1c5f8b6aac35de53",
"731b886d80d2ea138da54d30f43b2005",
"a850c17cba5eb16b0d3d40a106333bd5",
"7516c3b35580b3490248629cff5e498c",
"d508fe45cecaf653904a0e774084bb5c",
"18ccf61d533b600bbf5a963359223fe4",
"f4d3b5a1116ded3facefb8353d0bd5ba",
"28b26be59c986170c572133aaace31c2",
"d5ca322453f2986b752e58b11af83d96",
"37b19816109a32106d109e83bbb3c97d",
"0423fa423baf1ea8139f6662869faf2f",
"8ab8a4dfab57b4618331ffc958ebb4ec",
"85814ce7d88361ec8eb8e07294043bc3",
"273b9ae535de53399c86a9b83148a8ed",
"4c9184f37cff01bcdc32dc486ec36961",
"8ee2027983915ec78acc45027d874316",
"1cba77c39b4d0a81024a7aada3655a28",
"de1b2a7baf7850243db71c4abd4e5a39",
"608f0b988db4a96066af7dd8870de96c",
"06a224da9e61bee19ec9eef88b95f934",
"df55340f75b5da454e1c189d56d7f31b",
"8c728e685ddde9f7fbbc452155e29639",
"2570c919f5ef1d7091f0f66d54dac974",
"dce7c4174ce9323904a934a486c41288",
"573ce5969e9884d49d4fab77b09a306a",
"d5ca322453f2986b752e58b11af83d96",
"eb88d7636980738cd0522ea69e212905",
"e7e94d9ef1edaf2c6c55e9966b551295",
"762f8817ab6af0971fe330dbf46a359a",
"d8a48e3f0e1322d53d401e3dcb3360db",
"c1940aeeb9693a02e28c52eb85ce261c",
"d74fdde2944f475adc4a85e349d4ee7b",
"b6a5d96a4e99b63723ab54ddb471baad",
"6b157916b43b09df5a22f658ccb92b64",
"bec670e5a55424d840db8636ecc28828",
"4a6cbcd66d270792b89f50771604d093",
"07202a7e6cbfbabe27abba87989f807e",
"d60db28d94d538bbb249dcc7f2273ab1",
"123402c04dcfb6625f688f771a5fc05d",
"cd69b4957f06cd818d7bf3d61980e291",
"be1ab1632e4285edc3733b142935c60b",
"2bda2998d9b0ee197da142a0447f6725",
"ba535ef5a9f7b8bc875812bb081286bb",
"e9f40e1f1d1658681dad2dac4ae0971e",
"eabe04e738cfb621f819e4e8f9489234",
"aa2d6e4f578eb0cfaba23beef76c2194",
"126ac4b07f93bc4f7bed426f5e978c16",
"f43dff9a0dc54f0643d0c6d7971635f0",
"ccaaac957ec37bde4c9993a26a064730",
"2feaaf89c21770ea5c21196bc33848dd",
"07cf4f8f5d8b76282917320715dda2ad",
"1ffd9e753c8054cc61456ac7fac1ac89",
"6050ce63e4bce6764cb34cac51fb44d1",
"327a6c4304ad5938eaf0efb6cc3e53dc",
"b82c91e2103d0a495c099f0a12f66363",
"41d1de28e96dc1cde568d3b068fa17bb",
"cad1c068cb62b0681fe4c33d1db1bad6",
"de1b2a7baf7850243db71c4abd4e5a39",
"75e52a0ecfafeda17a34fc60111c1f0b",
"fc7e987f23de5bd6562b7c0063cad659",
"126ac4b07f93bc4f7bed426f5e978c16",
"fcc790c72a86190de1b549d0ddc6f55c",
"72792fa10d4ca61295194377da0bcc05",
"821f03288846297c2cf43c34766a38f7",
"faec47e96bfb066b7c4b8c502dc3f649",
"78b6367af86e03f19809449e2c365ff5",
"015f28b9df1bdd36427dd976fb73b29d",
"755f85c2723bb39381c7379a604160d8",
"60ee0bc62638fccf2d37ac27a634a9e9",
"68e2d83709f317938b51e53f7552ed04",
"f4c9385f1902f7334b00b9b4ecd164de",
"df491a4de50739fa9cffdbd4e3f4b4bb",
"ef56b0b0ddb93c2885892c06be830c68",
"fe4c0f30aa359c41d9f9a5f69c8c4192",
"cbf4e0b7971051760907c327e975f4e5",
"ea9e801b0d806f2398bd0c7fe3f3f0cd"
]; 

document.write("<p><input  autocomplete=\"off\" type=\"text\" id=\"" + jfldid + "\" name=\"" + jfldid + "\" class=\"form-control mBottom10" + jfldcls + "\" size=\"" +  jfldsz  +"\"><\/p>");
document.write("<p id='captchaError'></p>");
document.write("<p><img id='imgIDD' src=\""  + decodeURIComponent(imgdir) + imgid + ".jpg\" width=\"290\" height=\"80\" alt=\"\"><\/p>");
}

function jcap(){


var var2 = window.languageComing; 
var var3 = window.languageComingRegister;
var var4 = window.languageComingRegisterDetail; 
var var5 = window.languageComingRegisterVerify;
var var6 = window.languageComingForgotNew; 
var var7 = window.languageComingLogin; 
var var8 = window.languageComingIMEI; 

var uword = hex_md5(document.getElementById(jfldid).value);

	if(((var2 =="es") || (var2 =="es-ES") || (var2 =="es_ES")) || ((var3 =="es") || (var3 =="es-ES") || (var3 =="es_ES")) || ((var4 =="es") || (var4 =="es-ES") || (var4 =="es_ES")) || ((var5 =="es") || (var5 =="es-ES") || (var5 =="es_ES")) || ((var6 =="es") || (var6 =="es-ES") || (var6 =="es_ES")) || ((var7 =="es") || (var7 =="es-ES") || (var7 =="es_ES")) || ((var8 =="es") || (var8 =="es-ES") || (var8 =="es_ES")))
	{
		if ( (uword.length == 0) || (uword == "")  || (uword.replace(/\s/g,"") == "") || (uword == "undefined") ){
	//	if  (uword == "undefined") {
	//	alert("Captcha is undefined, Failed to Load the Captcha!");
		document.getElementById('captchaError').innerHTML = "<span class='error'>Captcha se ha introducido incorrectamente o est\u00E1 vac\u00EDo</span>";
		document.getElementById(jfldid).focus();
		return false;
		}

	if (uword==cword[anum-1]) {
	return true;
	}

		else {
	//	alert("Enter the Captcha Code shown below.");
		document.getElementById('captchaError').innerHTML = "<span class='error'>Captcha se ha introducido incorrectamente o est\u00E1 vac\u00EDo</span>";
		document.getElementById(jfldid).focus();
		return false;
		}
	}
 
	if(((var2 =="en") || (var2 =="en-US") || (var2 =="en_US")) || ((var3 =="en") || (var3 =="en-US") || (var3 =="en_US")) || ((var4 =="en") || (var4 =="en-US") || (var4 =="en_US")) || ((var5 =="en") || (var5 =="en-US") || (var5 =="en_US")) || ((var6 =="en") || (var6 =="en-US") || (var6 =="en_US")) || ((var7 =="en") || (var7 =="en-US") || (var7 =="en_US")) || ((var8 =="en") || (var8 =="en-US") || (var8 =="en_US")))
	{
		if ( (uword.length == 0) || (uword == "")  || (uword.replace(/\s/g,"") == "") || (uword == "undefined") ){
	//	if  (uword == "undefined") {
	//	alert("Captcha is undefined, Failed to Load the Captcha!");
		document.getElementById('captchaError').innerHTML = "<span class='error'>Captcha is entered incorrectly or empty</span>";
		document.getElementById(jfldid).focus();
		return false;
		}

		if (uword==cword[anum-1]) {
		return true;
		}

		else { 
	//	alert("Enter the Captcha Code shown below.");
		document.getElementById('captchaError').innerHTML = "<span class='error'>Captcha is entered incorrectly or empty</span>";
		document.getElementById(jfldid).focus();
		return false;
		}
	}

}



//  End -->
// FIN CODIGO DE JCAP.JS


 
  
