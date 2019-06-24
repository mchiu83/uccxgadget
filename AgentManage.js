var finesse = finesse || {};
finesse.gadget = finesse.gadget || {};
finesse.container = finesse.container || {};

function addAgent() {

    var number = $("input[number='number']").val();
    var resource = $("select[number='resource']").val();
    var redirect = $("select[number='redirect']").val();
    var voicemail = $("input[number='voicemail']").val();
	var tablenumber = number;
	var tablevoicemail = voicemail;

    var Http = new XMLHttpRequest();
	
	switch(tablenumber.length){
			case 10:
				tablenumber = "+1" + tablenumber;
			break;
			case 11:
				tablenumber = "+" + tablenumber
			break;
	}
	
		switch(tablevoicemail.length){
			case 10:
				tablevoicemail = "+1" + tablevoicemail;
			break;
			case 11:
				tablevoicemail = "+" + tablevoicemail
			break;
	}
	

    $(".data-table tbody").append("<tr data-number='" + tablenumber + "' data-resource='" + resource + "' data-redirect='" + redirect + "' data-voicemail='" + tablevoicemail + "'><td>" + tablenumber + "</td><td>" + resource + "</td><td>" + redirect + "</td><td>" + tablevoicemail + "</td><td><button class='btn btn-info btn-xs btn-edit'>Edit</button><button class='btn btn-danger btn-xs btn-delete'>Delete</button></td></tr>");

    $("input[number='number']").val('');
    $("select[number='resource']").val('');
    $("select[number='redirect']").val('');
    $("input[number='voicemail']").val('');

    var mungednumber = number.replace("+", "");
    var mungedvoicemail = voicemail.replace("+", "");

    var url = base_url + xml_api_path + '&param=DID&action=add&number=' + mungednumber + '&resource=' + resource + '&redirect=' + redirect + '&voicemail=' + voicemail;
    Http.open("GET", url, true);
    Http.send();

};

$("body").on("click", ".btn-delete", function() {

    $(this).parents("tr").remove();
    var number = $(this).parents("tr").attr('data-number');
    var resource = $(this).parents("tr").attr('data-resource');
    var voicemail = $(this).parents("tr").attr('data-voicemail');
    var redirect = $(this).parents("tr").attr('data-redirect');

    $(this).parents("tr").find("td:eq(0)").text(number);
    $(this).parents("tr").find("td:eq(1)").text(resource);
    $(this).parents("tr").find("td:eq(2)").text(redirect);
    $(this).parents("tr").find("td:eq(3)").text(voicemail);

    var Http = new XMLHttpRequest();

    var mungednumber = number.replace("+", "");

    var url = base_url + xml_api_path + '&param=DID&action=delete&number=' + mungednumber + '&resource=' + resource;
    Http.open("GET", url, true);
    Http.send();
});

$("body").on("click", ".btn-edit", function() {
    var number = $(this).parents("tr").attr('data-number');
    var resource = $(this).parents("tr").attr('data-resource');
    var voicemail = $(this).parents("tr").attr('data-voicemail');
    var redirect = $(this).parents("tr").attr('data-redirect');

    $(this).parents("tr").find("td:eq(0)").html('<input class="form-control" number="edit_number" value="' + number + '" readonly>');
    $(this).parents("tr").find("td:eq(1)").html('<select class="form-control" id="edit_resource" number="edit_resource"><option value="' + resource + '">' + resource + '</option></select>');
    $(this).parents("tr").find("td:eq(2)").html('<select class="form-control" id="edit_redirect" number="edit_redirect"><option value="CSQ">CSQ</option><option value="Voicemail">Voicemail</option></select>');
    $(this).parents("tr").find("td:eq(3)").html('<input class="form-control" type="number" number="edit_voicemail" value="' + voicemail + '">');

    editResource();

    $(this).parents("tr").find("td:eq(4)").prepend("<button class='btn btn-info btn-xs btn-update'>Update</button><button class='btn btn-warning btn-xs btn-cancel'>Cancel</button>")
    $(this).hide();
});

$("body").on("click", ".btn-cancel", function() {
    var number = $(this).parents("tr").attr('data-number');
    var resource = $(this).parents("tr").attr('data-resource');
    var redirect = $(this).parents("tr").attr('data-redirect');
    var voicemail = $(this).parents("tr").attr('data-voicemail');

    $(this).parents("tr").find("td:eq(0)").text(number);
    $(this).parents("tr").find("td:eq(1)").text(resource);
    $(this).parents("tr").find("td:eq(2)").text(redirect);
    $(this).parents("tr").find("td:eq(3)").text(voicemail);

    $(this).parents("tr").find(".btn-edit").show();
    $(this).parents("tr").find(".btn-update").remove();
    $(this).parents("tr").find(".btn-cancel").remove();
});

$("body").on("click", ".btn-update", function() {
    var number = $(this).parents("tr").find("input[number='edit_number']").val();
    var resource = $(this).parents("tr").find("select[number='edit_resource']").val();
    var redirect = $(this).parents("tr").find("select[number='edit_redirect']").val();
    var voicemail = $(this).parents("tr").find("input[number='edit_voicemail']").val();

    $(this).parents("tr").find("td:eq(0)").text(number);
    $(this).parents("tr").find("td:eq(1)").text(resource);
    $(this).parents("tr").find("td:eq(2)").text(redirect);
    $(this).parents("tr").find("td:eq(3)").text(voicemail);

    $(this).parents("tr").attr('data-number', number);
    $(this).parents("tr").attr('data-resource', resource);
    $(this).parents("tr").attr('data-redirect', redirect);
    $(this).parents("tr").attr('data-voicemail', voicemail);

    $(this).parents("tr").find(".btn-edit").show();
    $(this).parents("tr").find(".btn-cancel").remove();
    $(this).parents("tr").find(".btn-update").remove();

    var Http = new XMLHttpRequest();

    var mungednumber = number.replace("+", "");
    var mungedvoicemail = voicemail.replace("+", "");

    var url = base_url + xml_api_path + '&action=modify&param=DID&number=' + mungednumber + '&resource=' + resource + '&voicemail=' + mungedvoicemail + '&redirect=' + redirect;
    Http.open("GET", url, true);
    Http.send();
});


function loadXMLDoc() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            myFunction(this);
        }
    };
    xmlhttp.open("GET", base_url + xml_api_path, true);
    xmlhttp.send();

}

function myFunction(xml) {
    var i;
    var xmlDoc = xml.responseXML;
    var table = "<tr><th>Number</th><th>Resource</th><th>Redirect</th><th>Voicemail</th><th width='200px'>Action</th></tr>";
    var x = xmlDoc.getElementsByTagName("Agent");
    var numbers;
    var resources;
    var voicemail;
    var redirect;

    for (i = 0; i < x.length; i++) {
        numbers = x[i].getElementsByTagName("Number")[0].childNodes[0].nodeValue;
        resources = x[i].getElementsByTagName("Resource")[0].childNodes[0].nodeValue;
        voicemail = x[i].getElementsByTagName("Voicemail")[0].childNodes[0].nodeValue;
        redirect = x[i].getElementsByTagName("Redirect")[0].childNodes[0].nodeValue;
        table += "<tr data-number='" + numbers + "' data-resource = '" + resources + "' data-redirect = '" + redirect + "' data-voicemail = '" + voicemail + "'><td>" +
            numbers + "</td><td>" + resources + "</td><td>" + redirect + "</td><td>" + voicemail +
            "</td><td><button class='btn btn-info btn-xs btn-edit'>Edit</button><button class='btn btn-danger btn-xs btn-delete'>Delete</button></td></tr>";
    }
    document.getElementById("marion").innerHTML = table;
}

function getResource() {
    var xhttp, xmlDoc, txt, x, i, url;
    URL = base_api_url + "adminapi/resource";
    xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            xmlDoc = this.responseXML;
            txt = "";
            x = xmlDoc.getElementsByTagName("resource");
            for (i = 0; i < x.length; i++) {
                txt = txt + "<option value='" + x[i].childNodes[1].childNodes[0].nodeValue + "'>" + x[i].childNodes[1].childNodes[0].nodeValue + "</option>";
            }
            document.getElementById("Resource").innerHTML = txt;
        }
    };

    xhttp.open("GET", URL, true);
    xhttp.setRequestHeader("Content-Type", "application/xml");
    xhttp.setRequestHeader('Authorization', 'Basic ' + window.btoa(api_credential));
    xhttp.send();
}

function editResource(resource) {
    var xhttp, xmlDoc, txt, x, i, url;
    URL = base_api_url + "adminapi/resource";
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            xmlDoc = this.responseXML;
            txt = "";
            x = xmlDoc.getElementsByTagName("resource");
            for (i = 0; i < x.length; i++) {
                txt = txt + "<option value='" + x[i].childNodes[1].childNodes[0].nodeValue + "'>" + x[i].childNodes[1].childNodes[0].nodeValue + "</option>";
            }
            document.getElementById("edit_resource").innerHTML = txt;
        }
    };

    xhttp.open("GET", URL, true);
    xhttp.setRequestHeader("Content-Type", "application/xml");
    xhttp.setRequestHeader('Authorization', 'Basic ' + window.btoa(api_credential));
    xhttp.send();
}