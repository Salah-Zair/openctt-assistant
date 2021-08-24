




function findGetParameter(parameterName) {
    var result = null,
        tmp = [];
    var items = location.search.substr(1).split("&");
    for (var index = 0; index < items.length; index++) {
        tmp = items[index].split("=");
        if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
    }
    return result;
}


function navigate_to(url) {
    window.location = url;
}

function get_url_with() {
    var url = window.location.origin;
    var path_name = window.location.pathname;

   var document = findGetParameter("document")



    return {
        "url": [url, path_name].join(""),
        'document': document
    }
}



function get_page_url(){
    host_url = window.location.host;
    path_url = window.location.pathname

    return [host_url,path_url].join('')
}


