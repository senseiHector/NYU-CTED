//
fetch('https://covid-19-data.p.rapidapi.com/country/code?code=gh&format=json', {
    method: "GET",
    headers: {
        "x-rapidapi-host": "covid-19-data.p.rapidapi.com",
        "x-rapidapi-key": "b0d8930f6emsh84c722e151961f1p10983fjsn57be636dadb8"
    }
}).then(response => {
    return response.json();
}).then(data => {
    //Set the relevant fields in the html document with data from the api response
    setHTML(data, 'confirmed');
    setHTML(data, 'deaths');
    setHTML(data, 'recovered');
    setHTML(data, 'critical');
    setHTMLBase(new Date(data[0]['lastUpdate']), 'lastUpdate');

    //Calculate percentages for the data and display in corresponding html elements
    setPercentage(data, 'recovered');
    setPercentage(data, 'deaths');
    setPercentage(data, 'critical');

    //Derive active case data and display on the html document
    setActiveData(data);
});

function setHTMLBase(custom, field) {
    document.getElementById(field).innerHTML = custom;
}

function setHTML(data, field) {
    setHTMLBase(data[0][field], field);
}

function setPercentage(data, field) {
    setHTMLBase((Math.round(data[0][field] / data[0].confirmed * 10000) / 100) + "%", field + '-percent')
}

function setActiveData(data) {
    const active = data[0].confirmed - (data[0].deaths + data[0].recovered + data[0].critical);
    setHTMLBase(active, 'active');
    setHTMLBase((Math.round(active / data[0].confirmed * 10000) / 100) + "%", 'active-percent');
}