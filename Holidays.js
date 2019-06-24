var finesse = finesse || {};
finesse.gadget = finesse.gadget || {};
finesse.container = finesse.container || {};

function addHoliday() {

    var name = $("input[number='name']").val();
    var date = $("input[number='date']").val();
	
	date = new Date(date + " 00:00:00");
	
	var options = {month: 'numeric', day: 'numeric', year: '2-digit' };
	
	date = date.toLocaleString('en-US', options);

    $(".data-table tbody").append("<tr data-name='" + name + "' data-date='" + date + "'><td>" + name + "</td><td>" + date + "</td>" + "</td><td><button class='btn btn-danger btn-xs btn-delete'>Delete</button></td></tr>");

    $("input[number='name']").val('');
    $("input[number='date']").val('');

    var Http = new XMLHttpRequest();

    var url = base_url + xml_api_path + '&param=holidays&action=add&holiday=' + date + '&name=' + name;
    Http.open("GET", url, true);
    Http.send();

};

$("body").on("click", ".btn-delete", function() {

    $(this).parents("tr").remove();

    var date = $(this).parents("tr").attr('data-date');

    $(this).parents("tr").find("td:eq(1)").text(date);

    var Http = new XMLHttpRequest();

    var url = base_url + xml_api_path + '&param=holidays&action=delete&holiday=' + date;
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
    var table = "<tr><th>Name</th><th>Date</th><th width='200px'>Action</th></tr>";
    var x = xmlDoc.getElementsByTagName("Holiday");

    for (i = 0; i < x.length; i++) {
        name = x[i].getElementsByTagName("Name")[0].childNodes[0].nodeValue;
        date = x[i].getElementsByTagName("Date")[0].childNodes[0].nodeValue;
        table += "<tr data-name='" + name + "' data-date = '" + date + "'><td>" +
            name + "</td><td>" + date +
            "</td><td><button class='btn btn-danger btn-xs btn-delete'>Delete</button></td></tr>";
    }
    document.getElementById("holidayTable").innerHTML = table;
}