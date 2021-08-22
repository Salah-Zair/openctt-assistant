


function get_all_documents() {
  result_view = `<div id="document-area">
  <div class="row pt-4">`


  $("#content-area").html(loading_view);
  url = window.location.origin
  path_name = window.location.pathname

  my_url = [url, path_name].join("")
  options = ['document=safasf', 'id=1'].join("&")

  all_url = [my_url, options].join("?")
  console.log(all_url);

  console.log(url);
  axios.get('http://localhost:8000/document/all')
    .then(function (response) {
      response.data.forEach(element => {

        options = [my_url, `document=${element.document_key}`].join("?")


        result_view += `
        <div class="col-xl-3 col-md-4 col-12 card-column">
        <a href="${options}">
        <div class="card p-2">
        <div class="title">${element.name}</div>
        2016/2017
        </div>
        </a>
        </div>
        `
      });

      result_view += `</div></div>`
      data = response.data
      $("#content-area").html(result_view);
      console.log(data);
    })
    .catch(function (error) {
      // handle error
      $("#content-area").html(error_view);

      console.log(error);
    })
    .then(function () {
      // always executed
    });

}



function get_all_courses(document_link) {
  result_view = `<div id="document-area">
  <div class="row pt-4">`


  $("#content-area").html(loading_view);
  url = window.location.origin
  path_name = window.location.pathname

  my_url = [url, path_name].join("")
  options = ['document=safasf', 'id=1'].join("&")

  all_url = [my_url, options].join("?")
  console.log(all_url);


  axios.get(`http://localhost:8000/courses/${document_link}/`)
    .then(function (response) {
      data = response.data
      console.log(data);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .then(function () {
      // always executed
    });

}


function get_courses_by_id(document_link, id) {
  $("#content-area").html(loading_view);
  axios.get(`http://localhost:8000/courses/${document_link}/${id}`)
    .then(function (response) {
      console.log(response);
      data = response.data
      console.log(data);
      build_course_table(data)
    })
    .catch(function (error) {
      // handle error
      $("#content-area").html(error_view);

      console.log(error);
    })
    .then(function () {
      // always executed
    });

}



function get_teacher_by_id(document_link, id) {
  $("#content-area").html(loading_view);
  axios.get(`http://localhost:8000/teachers/${document_link}/${id}`)
    .then(function (response) {
      console.log(response);
      data = response.data
      console.log(data);
      build_teacher_table(data)
    })
    .catch(function (error) {
      // handle error
      $("#content-area").html(error_view);

      console.log(error);
    })
    .then(function () {
      // always executed
    });

}


function get_free_classrooms_by_id(document_link) {
  $("#content-area").html(loading_view);
  axios.get(`http://localhost:8000/free_class_rooms/${document_link}/`)
    .then(function (response) {
      console.log(response);
      data = response.data
      console.log(data);
      build_table(data)
    })
    .catch(function (error) {
      // handle error
      $("#content-area").html(error_view);

      console.log(error);
    })
    .then(function () {
      // always executed
    });

}

