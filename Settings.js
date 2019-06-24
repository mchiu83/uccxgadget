var finesse = finesse || {};
finesse.gadget = finesse.gadget || {};
finesse.container = finesse.container || {};


$("body").on("click", ".btn-edit-systemStateTable", function() {

    var name = $(this).parents("tr").attr('data-name');
    var transfer = $(this).parents("tr").attr('data-transfer');
    var destination = $(this).parents("tr").attr('data-destination');
	
    $(this).parents("tr").find("td:eq(0)").html('<input class="form-control" number="edit_name" value="' + name + '" readonly>');
	switch(transfer){
		case "Enabled":
			$(this).parents("tr").find("td:eq(1)").html('<select number="edit_transfer" id="edit_transfer" name="edit_transfer" class="form-control" required=""><option value="Enabled" selected>Enabled</option><option value="Disabled">Disabled</option>}</select>');
			break;
		case "Disabled":
			$(this).parents("tr").find("td:eq(1)").html('<select number="edit_transfer" id="edit_transfer" name="edit_transfer" class="form-control" required=""><option value="Enabled">Enabled</option><option value="Disabled" selected>Disabled</option>}</select>');
			break;
	}
	
	$(this).parents("tr").find("td:eq(2)").html('<input type="number" class="form-control" number="edit_destination" placeholder="' + destination + '" required="">');

    $(this).parents("tr").find("td:eq(3)").prepend("<button class='btn btn-info btn-xs btn-update-systemStateTable'>Update</button><button class='btn btn-warning btn-xs btn-cancel-systemStateTable'>Cancel</button>")
    $(this).hide();
});

$("body").on("click", ".btn-cancel-systemStateTable", function() {
	var name = $(this).parents("tr").attr('data-name');
    var transfer = $(this).parents("tr").attr('data-transfer');
    var destination = $(this).parents("tr").attr('data-destination');

    $(this).parents("tr").find("td:eq(0)").text(name);
    $(this).parents("tr").find("td:eq(1)").text(transfer);
    $(this).parents("tr").find("td:eq(2)").text(destination);

    $(this).parents("tr").find(".btn-edit-systemStateTable").show();
    $(this).parents("tr").find(".btn-update-systemStateTable").remove();
    $(this).parents("tr").find(".btn-cancel-systemStateTable").remove();
});

$("body").on("click", ".btn-update-systemStateTable", function() {
    var name = $(this).parents("tr").find("input[number='edit_name']").val();
    var transfer = $(this).parents("tr").find("select[number='edit_transfer']").val();
	var destination = $(this).parents("tr").find("input[number='edit_destination']").val();

    $(this).parents("tr").find("td:eq(0)").text(name);
    $(this).parents("tr").find("td:eq(1)").text(transfer);
    $(this).parents("tr").find("td:eq(2)").text(destination);

    $(this).parents("tr").attr('data-name', name);
    $(this).parents("tr").attr('data-transfer', transfer);
    $(this).parents("tr").attr('data-destination', destination);

    $(this).parents("tr").find(".btn-edit-systemStateTable").show();
    $(this).parents("tr").find(".btn-cancel-systemStateTable").remove();
    $(this).parents("tr").find(".btn-update-systemStateTable").remove();

    var Http = new XMLHttpRequest();
	
	destination = destination.replace("+", "");
	
    var url = base_url + xml_api_path + '&action=modify&param=state&name=' + name + '&transfer=' + transfer + '&dest=' + destination;
    Http.open("GET", url, true);
    Http.send();
});

$("body").on("click", ".btn-edit-settingsTable", function() {

    var name = $(this).parents("tr").attr('data-name');
    var description = $(this).parents("tr").attr('data-description');
    var value = $(this).parents("tr").attr('data-value');

    $(this).parents("tr").find("td:eq(0)").html('<input class="form-control" number="edit_name" value="' + name + '" readonly>');
    $(this).parents("tr").find("td:eq(1)").html('<input class="form-control" id="edit_description" number="edit_description" value="' + description + '" readonly>');

    switch (name) {
        case "CSQ":
            $(this).parents("tr").find("td:eq(2)").html('<select number="edit_value" name="edit_value" id="edit_value" class="form-control" required="">' + getTeamID(value) + '</select>');
            break;
		case "CallbackCSQ":
            $(this).parents("tr").find("td:eq(2)").html('<select number="edit_value" name="edit_value" id="edit_value" class="form-control" required="">' + getTeamID(value) + '</select>');
            break;
        case "State":
            switch (value) {
                case "Normal":
                    $(this).parents("tr").find("td:eq(2)").html('<select number="edit_value" name="edit_value" id="edit_value" class="form-control" required="">' +
                        '<option value="Normal" selected>Normal</option>' +
                        '<option value="Emergency">Emergency</option>' +
                        '<option value="Training">Training</option>' +
                        '<option value="Lunch">Lunch</option>' + '</select>');
                    break;
                case "Emergency":
                    $(this).parents("tr").find("td:eq(2)").html('<select number="edit_value" name="edit_value" id="edit_value" class="form-control" required="">' +
                        '<option value="Normal">Normal</option>' +
                        '<option value="Emergency" selected>Emergency</option>' +
                        '<option value="Training">Training</option>' +
                        '<option value="Lunch">Lunch</option>' + '</select>');
                    break;
                case "Training":
                    $(this).parents("tr").find("td:eq(2)").html('<select number="edit_value" name="edit_value" id="edit_value" class="form-control" required="">' +
                        '<option value="Normal">Normal</option>' +
                        '<option value="Emergency">Emergency</option>' +
                        '<option value="Training" selected>Training</option>' +
                        '<option value="Lunch">Lunch</option>' + '</select>');
                    break;
                case "Lunch":
                    $(this).parents("tr").find("td:eq(2)").html('<select number="edit_value" name="edit_value" id="edit_value" class="form-control" required="">' +
                        '<option value="Normal">Normal</option>' +
                        '<option value="Emergency">Emergency</option>' +
                        '<option value="Training">Training</option>' +
                        '<option value="Lunch" selected>Lunch</option>' + '</select>');
                    break;
            }
            break;
        case "Callback":
        case "Record":
		case "VoicemailOpt":
        case "Greeting":
            if (value == "Enabled") {
                $(this).parents("tr").find("td:eq(2)").html('<select number="edit_value" id="edit_value" name="edit_value" class="form-control" required=""><option value="Enabled" selected>Enabled</option><option value="Disabled">Disabled</option>}</select>');
            } else {
                $(this).parents("tr").find("td:eq(2)").html('<select number="edit_value" id="edit_value" name="edit_value" class="form-control" required=""><option value="Enabled">Enabled</option><option value="Disabled" selected>Disabled</option>}</select>');
            }
            break;
		case "Timezone":
			switch(value) {
				case "US/Eastern":
					$(this).parents("tr").find("td:eq(2)").html('<select number="edit_value" id="edit_value" name="edit_value" class="form-control" required="">' +
						'<option value="US/Eastern" selected>US/Eastern</option>' +
						'<option value="US/Central">US/Central</option>' +
						'<option value="US/Mountain">US/Mountain</option>' +
						'<option value="US/Pacific">US/Pacific</option>' +
						'</select>');
					break;
				case "US/Central":
					$(this).parents("tr").find("td:eq(2)").html('<select number="edit_value" id="edit_value" name="edit_value" class="form-control" required="">' +
						'<option value="US/Eastern">US/Eastern</option>' +
						'<option value="US/Central" selected>US/Central</option>' +
						'<option value="US/Mountain">US/Mountain</option>' +
						'<option value="US/Pacific">US/Pacific</option>' +
						'</select>');
					break;
				case "US/Mountain":
					$(this).parents("tr").find("td:eq(2)").html('<select number="edit_value" id="edit_value" name="edit_value" class="form-control" required="">' +
						'<option value="US/Eastern">US/Eastern</option>' +
						'<option value="US/Central">US/Central</option>' +
						'<option value="US/Mountain" selected>US/Mountain</option>' +
						'<option value="US/Pacific">US/Pacific</option>' +
						'</select>');
					break;
				case "US/Pacific":
					$(this).parents("tr").find("td:eq(2)").html('<select number="edit_value" id="edit_value" name="edit_value" class="form-control" required="">' +
						'<option value="US/Eastern">US/Eastern</option>' +
						'<option value="US/Central">US/Central</option>' +
						'<option value="US/Mountain">US/Mountain</option>' +
						'<option value="US/Pacific" selected>US/Pacific</option>' +
						'</select>');
					break;
				default:
					$(this).parents("tr").find("td:eq(2)").html('<select number="edit_value" id="edit_value" name="edit_value" class="form-control" required="">' +
						'<option value="US/Eastern">US/Eastern</option>' +
						'<option value="US/Central" selected>US/Central</option>' +
						'<option value="US/Mountain">US/Mountain</option>' +
						'<option value="US/Pacific">US/Pacific</option>' +
						'</select>');
					break;
			}
			break;
        case "QueueDelay":
        case "QueueCycle":
		case "RecordingCCG":
		case "CallbackCCG":
		case "CallbackDialogGroup":
        case "VoicemailXfer":
        case "AfterHoursXfer":
            $(this).parents("tr").find("td:eq(2)").html('<input type="number" class="form-control" name="edit_value" id="edit_value" number="edit_value" placeholder="' + value + '" value="' + value + '" required>');
            break;
        default:
			 $(this).parents("tr").find("td:eq(2)").html('<input class="form-control" name="edit_value" id="edit_value" number="edit_value" placeholder="' + value + '" value="' + value + '" required>');
			break;
    }

    $(this).parents("tr").find("td:eq(3)").prepend("<button class='btn btn-info btn-xs btn-update-settingsTable'>Update</button><button class='btn btn-warning btn-xs btn-cancel-settingsTable'>Cancel</button>")
    $(this).hide();
});

$("body").on("click", ".btn-cancel-settingsTable", function() {
    var name = $(this).parents("tr").attr('data-name');
    var description = $(this).parents("tr").attr('data-description');
    var value = $(this).parents("tr").attr('data-value');

    $(this).parents("tr").find("td:eq(0)").text(name);
    $(this).parents("tr").find("td:eq(1)").text(description);
    $(this).parents("tr").find("td:eq(2)").text(value);

    $(this).parents("tr").find(".btn-edit-settingsTable").show();
    $(this).parents("tr").find(".btn-update-settingsTable").remove();
    $(this).parents("tr").find(".btn-cancel-settingsTable").remove();
});

$("body").on("click", ".btn-update-settingsTable", function() {
    var name = $(this).parents("tr").find("input[number='edit_name']").val();
    var description = $(this).parents("tr").find("input[number='edit_description']").val();
	
	switch(name) {
		case "CSQ":
		case "CallbackCSQ":
		case "Callback":
		case "VoicemailOpt":
		case "Record":
		case "State":
		case "Greeting":
			var value = $(this).parents("tr").find("select[number='edit_value']").val();
			break;
		case "Timezone":
			var value = $(this).parents("tr").find("select[number='edit_value']").val();
			break;
		case "QueueDelay":
		case "QueueCycle":
			var value = $(this).parents("tr").find("input[number='edit_value']").val();
			break;
		case "VoicemailXfer":
		case "AfterHoursXfer":
			var value = $(this).parents("tr").find("input[number='edit_value']").val();
			var value = value.replace("+", "");
			break;
		default:
			var value = $(this).parents("tr").find("input[number='edit_value']").val();
			break;
	}
    

    $(this).parents("tr").find("td:eq(0)").text(name);
    $(this).parents("tr").find("td:eq(1)").text(description);
    $(this).parents("tr").find("td:eq(2)").text(value);

    $(this).parents("tr").attr('data-name', name);
    $(this).parents("tr").attr('data-description', description);
    $(this).parents("tr").attr('data-value', value);

    $(this).parents("tr").find(".btn-edit-settingsTable").show();
    $(this).parents("tr").find(".btn-cancel-settingsTable").remove();
    $(this).parents("tr").find(".btn-update-settingsTable").remove();

    var Http = new XMLHttpRequest();

    var url = base_url + xml_api_path + '&action=modify&param=settings&name=' + name + '&value=' + value;
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
    var table = "<tr><th>Name</th><th>Description</th><th>Value</th><th width='200px'>Action</th></tr>";
    var x = xmlDoc.getElementsByTagName("Setting");

    for (i = 0; i < x.length; i++) {
        name = x[i].getElementsByTagName("Name")[0].childNodes[0].nodeValue;
        description = x[i].getElementsByTagName("Description")[0].childNodes[0].nodeValue;
        value = x[i].getElementsByTagName("Value")[0].childNodes[0].nodeValue;


        table += "<tr data-name='" + name + "' data-description = '" + description + "' data-value = '" + value + "'><td>" +
            name + "</td><td>" + description + "</td><td>" + value +
            "</td><td><button class='btn btn-info btn-xs btn-edit-settingsTable'>Edit</button></td></tr>";
    }
    document.getElementById("settingsTable").innerHTML = table;

    var table = "<tr><th>State</th><th>Transfer Option</th><th>Destination</th><th width='200px'>Action</th></tr>";
    var x = xmlDoc.getElementsByTagName("State");

    for (i = 0; i < x.length; i++) {
        name = x[i].getElementsByTagName("Name")[0].childNodes[0].nodeValue;
        transfer = x[i].getElementsByTagName("Transfer")[0].childNodes[0].nodeValue;
        destination = x[i].getElementsByTagName("Destination")[0].childNodes[0].nodeValue;

        table += "<tr data-name='" + name + "' data-transfer = '" + transfer + "' data-destination = '" + destination + "'><td>" +
            name + "</td><td>" + transfer + "</td><td>" + destination + 
            "</td><td><button class='btn btn-info btn-xs btn-edit-systemStateTable'>Edit</button></td></tr>";
    }
    document.getElementById("systemStateTable").innerHTML = table;
}

function getTeamID(value) {

    var xhttp, xmlDoc, x, i, url, teamid, y;
    URL = base_api_url + "adminapi/team";
    xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            xmlDoc = this.responseXML;
            x = xmlDoc.getElementsByTagName("team");
            for (i = 0; i < x.length; i++) {
                y = x[i].getElementsByTagName("teamname")[0].childNodes[0].nodeValue;
                if (y == teamname) {
                    teamid = x[i].getElementsByTagName("teamId")[0].childNodes[0].nodeValue;
                    getCSQs(teamid, value);
                }
            }
        }
    };

    xhttp.open("GET", URL, true);
    xhttp.setRequestHeader("Content-Type", "application/xml");
    xhttp.setRequestHeader('Authorization', 'Basic ' + window.btoa(api_credential));
    xhttp.send();
}

function getCSQs(teamid, value) {
    var xhttp, xmlDoc, x, i, url, csq, options;
    URL = base_api_url + "adminapi/team/" + teamid;

    xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            xmlDoc = this.responseXML;
            x = xmlDoc.getElementsByTagName("csq");
            for (i = 0; i < x.length; i++) {
                txt = xmlDoc.getElementsByTagName("csq")[i].attributes;
                csq = txt.getNamedItem("name").nodeValue;
                if (csq == value) {
                    options = options + "<option value='" + csq + "' selected>" + csq + "</option>";
                } else {
                    options = options + "<option value='" + csq + "'>" + csq + "</option>";
                }
            }
            document.getElementById("edit_value").innerHTML = options;
        }
    };

    xhttp.open("GET", URL, true);
    xhttp.setRequestHeader("Content-Type", "application/xml");
    xhttp.setRequestHeader('Authorization', 'Basic ' + window.btoa(api_credential));
    xhttp.send();

}