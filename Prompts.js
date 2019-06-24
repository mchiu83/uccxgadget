var finesse = finesse || {};
finesse.gadget = finesse.gadget || {};
finesse.container = finesse.container || {};

$("body").on("click", ".btn-edit", function() {
	
    var id = $(this).parents("tr").attr('data-id');
    var name = $(this).parents("tr").attr('data-name');
    var description = $(this).parents("tr").attr('data-description');
	var filename = $(this).parents("tr").attr('data-filename');
	var value = $(this).parents("tr").attr('data-value');

	$(this).parents("tr").find("td:eq(3)").html('<input class="form-control" number="edit_filename" value="' + filename + '">');
	
	
	switch(value){
		case "True":
			$(this).parents("tr").find("td:eq(4)").html('<select number="edit_value" id="edit_value" name="edit_value" class="form-control" required=""><option value="True" selected>True</option><option value="False">False</option>}</select>');
			break;
		case "False":
			$(this).parents("tr").find("td:eq(4)").html('<select number="edit_value" id="edit_value" name="edit_value" class="form-control" required=""><option value="True">True</option><option value="False" selected>False</option>}</select>');
			break;
	}
	
    $(this).parents("tr").find("td:eq(5)").prepend("<button class='btn btn-info btn-xs btn-update'>Update</button><button class='btn btn-warning btn-xs btn-cancel'>Cancel</button>")
    $(this).hide();
	
	$(this).parents("tr").find(".btn-play").hide();
	$(this).parents("tr").find(".btn-record").hide();

});

$("body").on("click", ".btn-cancel", function() {
	
    var id = $(this).parents("tr").attr('data-id');
    var name = $(this).parents("tr").attr('data-name');
    var description = $(this).parents("tr").attr('data-description');
	var filename = $(this).parents("tr").attr('data-filename');
	var value = $(this).parents("tr").attr('data-value');

    $(this).parents("tr").find("td:eq(0)").text(id);
    $(this).parents("tr").find("td:eq(1)").text(name);
	$(this).parents("tr").find("td:eq(2)").text(description);
    $(this).parents("tr").find("td:eq(3)").text(filename);
	$(this).parents("tr").find("td:eq(4)").text(value);

    $(this).parents("tr").find(".btn-edit").show();
	$(this).parents("tr").find(".btn-play").show();
	$(this).parents("tr").find(".btn-record").show();
    $(this).parents("tr").find(".btn-update").remove();
    $(this).parents("tr").find(".btn-cancel").remove();
});

$("body").on("click", ".btn-update", function() {
	var id = $(this).parents("tr").attr('data-id');
	var name = $(this).parents("tr").find("input[number='edit_name']").val();
	var description = $(this).parents("tr").find("input[number='edit_description']").val();
	var filename = $(this).parents("tr").find("input[number='edit_filename']").val();
    var value = $(this).parents("tr").find("select[number='edit_value']").val();

    $(this).parents("tr").find("td:eq(0)").text(id);
	$(this).parents("tr").find("td:eq(1)").text(name);
	$(this).parents("tr").find("td:eq(2)").text(description);
    $(this).parents("tr").find("td:eq(3)").text(filename);
    $(this).parents("tr").find("td:eq(4)").text(value);

    $(this).parents("tr").attr('data-id', id);
    $(this).parents("tr").attr('data-name', name);
    $(this).parents("tr").attr('data-description', description);
	$(this).parents("tr").attr('data-filename', filename);
	$(this).parents("tr").attr('data-value', value);

    $(this).parents("tr").find(".btn-edit").show();
	$(this).parents("tr").find(".btn-play").show();
    $(this).parents("tr").find(".btn-cancel").remove();
    $(this).parents("tr").find(".btn-update").remove();
	
    var Http = new XMLHttpRequest();

    var url = base_url + xml_api_path + '&action=modify&param=greetings&id=' + id + '&value=' + value + '&filename=' + filename;
    Http.open("GET", url, true);
    Http.send();
});

$("body").on("click",".btn-record", function() {
	var id = $(this).parents("tr").attr('data-id');
	var extension = prompt("Please enter your extension: ", "your extension here");
	var Http = new XMLHttpRequest();

	var url = base_url + xml_api_path + '&action=modify&param=record&id=' + id + '&number=' + extension;
    Http.open("GET", url, true);
    Http.send();

	var container = document.getElementById('.' + id);
	var content = container.innerHTML;
	container.innerHTML = content;
});


$("body").on("click", ".btn-play", function() {
	var id = $(this).parents("tr").attr('data-id');
	$('.' + id).get(0).play();
	
	$('.' + id).get(0).onended = function() {
		$(this).parents("tr").find(".btn-stop").hide();
		$(this).parents("tr").find(".btn-edit").show();
		$(this).parents("tr").find(".btn-play").show();
		$(this).parents("tr").find(".btn-record").show();
		
	};
	
	$(this).parents("tr").find("td:eq(5)").append("<button class='btn btn-danger btn-xs btn-stop'>Stop</button>")
	$(this).parents("tr").find(".btn-record").hide();
	$(this).parents("tr").find(".btn-edit").hide();
	$(this).hide();
});

$("body").on("click", ".btn-stop", function() {
	var id = $(this).parents("tr").attr('data-id');
	$('.' + id).get(0).pause();
	$('.' + id).get(0).currentTime = 0;
	$(this).hide();
	$(this).parents("tr").find(".btn-edit").show();
	$(this).parents("tr").find(".btn-play").show();
	$(this).parents("tr").find(".btn-record").show();
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
	var x = xmlDoc.getElementsByTagName("Setting");

    for (i = 0; i < x.length; i++) {
        name = x[i].getElementsByTagName("Name")[0].childNodes[0].nodeValue;
        description = x[i].getElementsByTagName("Description")[0].childNodes[0].nodeValue;
        value = x[i].getElementsByTagName("Value")[0].childNodes[0].nodeValue;

		if (name == "PromptFolder") {
			var folder = value;
		}
    }
	
    var table = "<tr><th>ID</th><th>Name</th><th>Description</th><th>File Name</th><th>Enabled</th><th width='200px'>Action</th></tr>";
    x = xmlDoc.getElementsByTagName("Greeting");
	
    for (i = 0; i < x.length; i++) {
		var cache = new Date().getTime();
        id = x[i].getElementsByTagName("ID")[0].childNodes[0].nodeValue;
        name = x[i].getElementsByTagName("Name")[0].childNodes[0].nodeValue;
		description = x[i].getElementsByTagName("Description")[0].childNodes[0].nodeValue;
		filename = x[i].getElementsByTagName("FileName")[0].childNodes[0].nodeValue;
		value = x[i].getElementsByTagName("Value")[0].childNodes[0].nodeValue;
		
		
		table += "<tr data-id='" + id + "' data-name = '" + name + "' data-description = '" + description + "' data-filename = '" + filename + "' data-value = '" + value + "'><td>" +
            id + "</td><td>" + name + "</td><td>" + description + "</td><td>" + filename + "</td><td>" + value +
            "</td><td><button class='btn btn-info btn-xs btn-edit'>Edit</button><button id='play' class='btn btn-primary btn-xs btn-play'>Play</button>" +
			"<audio id='" + id + "' class='" + id + "' src='" + base_url + "prompts/" + folder + "/" + filename + "?cb=" + cache + "' type='audio/wave' /></audio>" +
			"<button id='record' class='btn btn-danger btn-xs btn-record'>Record</button>" +
			"</td></tr>";
    }
    document.getElementById("Table").innerHTML = table;
}