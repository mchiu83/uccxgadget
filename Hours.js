var finesse = finesse || {};
finesse.gadget = finesse.gadget || {};
finesse.container = finesse.container || {};

$("body").on("click", ".btn-edit", function() {
    var day = $(this).parents("tr").attr('data-day');
    var start = $(this).parents("tr").attr('data-start');
    var end = $(this).parents("tr").attr('data-end');

    $(this).parents("tr").find("td:eq(0)").html('<input class="form-control" number="edit_day" value="' + day + '" readonly>');
    $(this).parents("tr").find("td:eq(1)").html('<input type="time" class="form-control" id="edit_start" number="edit_start" value="' + start + '" required>');
    $(this).parents("tr").find("td:eq(2)").html('<input type="time" class="form-control" id="edit_end" number="edit_end" value="' + end + '" required>');

    $(this).parents("tr").find("td:eq(3)").prepend("<button class='btn btn-info btn-xs btn-update'>Update</button><button class='btn btn-warning btn-xs btn-cancel'>Cancel</button>")
    $(this).hide();
});

$("body").on("click", ".btn-cancel", function() {
    var day = $(this).parents("tr").attr('data-day');
    var start = $(this).parents("tr").attr('data-start');
    var end = $(this).parents("tr").attr('data-end');

    $(this).parents("tr").find("td:eq(0)").text(day);
    $(this).parents("tr").find("td:eq(1)").text(start);
    $(this).parents("tr").find("td:eq(2)").text(end);

    $(this).parents("tr").find(".btn-edit").show();
    $(this).parents("tr").find(".btn-update").remove();
    $(this).parents("tr").find(".btn-cancel").remove();
});

$("body").on("click", ".btn-update", function() {
    var day = $(this).parents("tr").find("input[number='edit_day']").val();
    var start = $(this).parents("tr").find("input[number='edit_start']").val();
    var end = $(this).parents("tr").find("input[number='edit_end']").val();

    $(this).parents("tr").find("td:eq(0)").text(day);
    $(this).parents("tr").find("td:eq(1)").text(start);
    $(this).parents("tr").find("td:eq(2)").text(end);

    $(this).parents("tr").attr('data-day', day);
    $(this).parents("tr").attr('data-start', start);
    $(this).parents("tr").attr('data-end', end);

    $(this).parents("tr").find(".btn-edit").show();
    $(this).parents("tr").find(".btn-cancel").remove();
    $(this).parents("tr").find(".btn-update").remove();
	
	start = new Date("January 01, 1900, " + start);
	var options = {
		hour: 'numeric',
		minute: 'numeric',
		hour12: true
	};
	
	end = new Date("January 01, 1900, " + end);
	
	var startTime = start.toLocaleString('en-US', options);
	var endTime = end.toLocaleString('en-US', options);

    var Http = new XMLHttpRequest();

    var url = base_url + xml_api_path + '&action=modify&param=hours&day=' + day + '&start=' + startTime + '&end=' + endTime;
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
    var table = "<tr><th>Weekday</th><th>Start Time</th><th>End Time</th><th width='200px'>Action</th></tr>";
    var x = xmlDoc.getElementsByTagName("Weekday");
	
    for (i = 0; i < x.length; i++) {
        day = x[i].getElementsByTagName("Day")[0].childNodes[0].nodeValue;
        start = x[i].getElementsByTagName("Start")[0].childNodes[0].nodeValue;
		end = x[i].getElementsByTagName("End")[0].childNodes[0].nodeValue;
		
		
		table += "<tr data-day='" + day + "' data-start = '" + start + "' data-end = '" + end + "'><td>" +
            day + "</td><td>" + start + "</td><td>" + end +
            "</td><td><button class='btn btn-info btn-xs btn-edit'>Edit</button></td></tr>";
    }
    document.getElementById("hoursTable").innerHTML = table;
}