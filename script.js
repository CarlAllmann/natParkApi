'use strict'

const endPointUrl = 'https://developer.nps.gov/api/v1/parks'; 
const apiKey = 'ah5zlsPzgvk9dDQ8hRXmA9CNbGdbVSdmxQyHUfZz'; 



function formatQueryParams(params) {
    const queryItems = Object.keys(params).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');

}

function displayResults(responseJson, maxResults) {
    console.log(responseJson); 
    $('#results-list').empty(); 
    for (let i = 0; i < responseJson.data.length & i <maxResults; i++) {
        $('#results-list').append(
            `<li>
                <h3>${responseJson.data[i].fullName}</h3>
                <a href='${responseJson.data[i].url}'>${responseJson.data[i].url}</a>
                <p>${responseJson.data[i].description}</p>
                
            </li>`)
        
    }; 
    $('#results').removeClass('hidden');
    }



function getParkInfo(searchTerm, maxResults=10) {
    console.log("getting park info")
    const params = {
        stateCode: searchTerm, 
        limit: maxResults
       };

    const queryString = formatQueryParams(params); 
    const url = endPointUrl + '?' + queryString + '&api_key=' + apiKey; 
    console.log(url); 

    

    fetch(url)
        .then(response => {
            if(response.ok) {
                return response.json(); 
            }
            throw new Error(response.statusText); 
        })
        .then(responseJson => displayResults(responseJson, maxResults))
        .catch(err => {
            $('#js-error-message').text(`Something went wrong: ${err.message}`);
            console.log("fetch complete");
        });
}



function watchForm() {
$('#js-form').submit(event => {
    event.preventDefault(); 
    const searchTerm = $('#js-search-term').val();
    const maxResults = $('#js-max-results').val();
    getParkInfo(searchTerm, maxResults); 
    console.log("Form Submitted");
})
}


$(watchForm); 