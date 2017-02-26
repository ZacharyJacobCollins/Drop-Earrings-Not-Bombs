$(function() {
	var body = {
		"numberOfResults": 10,
		"dymSize": 5,
		"page": 1,
		"filterByPrecedence": 1,
		"searchTerm": "Metal",
		"filterByExpression": "",
		"distinctBy": [],
		"showFields": [],
		"properties": [],
		"clientApp": "App",
		"clientAppVersion": "1.0",
		"siteId": "HospitalA",
		"userId": "UserA",
		"age": 0,
		"sex": "F",
		"filterByAge": "false",
		"filterBySex": "false"
	};

	$.ajax({
		url: "http://184.73.124.73:80/PortalWebService/api/v2/product/allergenIT/search",
		type: "POST",
		headers: 
		{"Authorization": "Basic bG9kOHRiZXltaXoxbzY=",
		"Content-Type": "application/json",
		"Accept": "application/json"},
		data: JSON.stringify(body),
		dataType: "json",
		success: function(msg) {
			msg["SearchTermResponse"]["items"].map((x) => { 
				let domStr = "<span>" + (x["SNOMED_DESCRIPTION"]) + ", </span>";
				$(domStr).appendTo("#HeyWeUsedYourAPI") });
		}
	});
});