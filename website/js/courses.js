


function build_courses_table(data) {
    url_components = get_url_with();

    result_view = `<h3 class="mt-2">
            <center>Courses</center>
            </h3>
<table class="table mt-5">
    <thead class="table-dark table-borderless">
        <tr>
            <th scope="col" style="width: 10%;">ID</th>
            <th scope="col">name</th>
            <th scope="col">course type</th>
            <th scope="col">group</th>
            <th scope="col">teacher</th>
        </tr>
    </thead>
    <tbody>`;


    data.courses.forEach(course => {
        var group = get_realted_item_by_id(data.groups, course.related_group)
        var teacher = get_realted_item_by_id(data.teachers, course.teacher_id)


        var document_id = url_components.document
        var course_paramters = [`document=${document_id}`, `id=${course.id}`].join("&");
        var course_url = [url_components['url'], course_paramters].join("?")
        // console.log(course_paramters);
        result_view += ` <tr>
            <td><a href=${course_url}>${course.id}</a></td>
            <td>${course.name}</td>
            <td>${course.course_type.toUpperCase()}</td>
            <td>${group.name}</td>
            <td>${teacher.title}.${teacher.last_name} </td>
        </tr>`;
    });

    result_view += `</tbody></table>`;
    return result_view;
}

function build_course_schedule(data) {
    var show_colors = true;
    var show_course = true;
    var show_td = true;
    var show_tp = true;

    let content_area = $("#content-area")

    content_area.html(`<div class="container d-flex flex-column justify-content-center align-items-center test" >
    <div id="schedule-year" class="mb-3"></div>

    <div id="schedule-title"></div>
    <table border="1" id="schedule">
    </table>
    <div class="d-flex justify-content-end meta-data-table" style="width: 70%;">
        <div class="course-type-color-data">
            <div class="box-color ">
                <span class="box cours"></span> Course
            </div>
            <div class="box-color ">
                <span class="box td"></span> TD

            </div>
            <div class="box-color ">
                <span class="box tp"></span> TP
            </div>
        </div>
    </div>`)

    let table = $('#schedule');
    let schedule_year = $("#schedule-year")
    let schedule_group = $("#schedule-title")

    schedule_year.append(`Not yet`);
    schedule_group.append(`Course ${data.course.name}`);

    row_length = data.terms.length + 1;
    column_length = data.days.length + 1;

    for (var row = 0; row < row_length; row++) {
        column_raw = ""
        for (var column = 0; column < column_length; column++) {
            if (row == 0 && column == 0) {
                column_raw += getEmptyHeader()
            } else if (row == 0) {
                column_raw += getCellDay(data.days[column - 1]);
            } else if (column == 0) {
                column_raw += getTerm(data.terms[row - 1]);
            } else {
                column_raw += get_lesson_cell(data, column, row);
            }
        }
        row_raw = getRow(column_raw, row);
        table.append(row_raw);
    }
}




function get_lesson_cell(course_data, day_index, term_index) {
    var data = ""


    var course_page = "courses.html";
    var teacher_page = "teachers.html";
    var class_room_page = "class_room.html";
    var group_page = 'groups.html';
    document_key = findGetParameter('document')

    course_data.lessons.forEach(element => {
        if (element.day_index == day_index && element.term_index == term_index) {
            course = get_realted_item_by_id(course_data.related_courses, element.course_id);

            // group = get_realted_item_by_id(data.groups,course.related_group);
            teacher = get_realted_item_by_id(course_data.teachers, course.teacher_id);
            class_room = get_realted_item_by_id(course_data.class_rooms, element.classroom_id);



            var teacher_url = [teacher_page, [`document=${document_key}`, `id=${teacher.id}`].join("&")].join("?")
            var course_url = [course_page, [`document=${document_key}`, `id=${course.id}`].join("&")].join("?")
            var class_room_url = [class_room_page, [`document=${document_key}`, `id=${class_room.id}`].join("&")].join("?")

            // TODO: find a way to add all groups 
            inner_data = `<div class='course-item-data ${course.course_type.toLocaleLowerCase()}'>`;


            inner_data += `<div class='course-data'>`;
            inner_data += `<a href='${course_url}'>`;
            inner_data += `${course.short_name}`;
            inner_data += `</a>`;
            inner_data += `</div>`;

            inner_data += `<div class='class-room-data'>`;
            inner_data += `<a href='${class_room_url}'>`;
            inner_data += `${class_room.name}`;
            inner_data += `</a>`;
            inner_data += `</div>`;

            // inner_data += `<div class='class-room-data'>`;
            // inner_data += `<a href='#'>`;
            // inner_data += `${group.name}`;
            // inner_data += `</a>`;
            // inner_data += `</div>`;

            inner_data += `<div class='teacher-data'>`;
            inner_data += `<a href='${teacher_url}'>`;
            inner_data += `${teacher.name} ${teacher.last_name}`;
            inner_data += `</a>`;
            inner_data += `</div>`;

            inner_data += `</div>`;

            data = `<td> ${inner_data} </td>`;
        }
    });

    if (data)
        return data;

    return "<td></td>"
}









temp = ``` <div class="d-flex  meta-data-table" style="width: 90%;">
<div class="course-type-color-data">
<div class="form-check form-switch">
<input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault">
<label class="form-check-label" for="flexSwitchCheckDefault">Default switch checkbox input</label>
</div>
<div class="form-check">
<input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" checked>
<label class="form-check-label" for="flexCheckDefault">
Course
</label>
</div>
<div class="form-check">
<input class="form-check-input" type="checkbox" value="" id="flexCheckChecked" checked>
<label class="form-check-label" for="flexCheckChecked">
TD
</label>
</div>
<div class="form-check">
<input class="form-check-input" type="checkbox" value="" id="flexCheckChecked" checked>
<label class="form-check-label" for="flexCheckChecked">
TP
</label>
</div>
</div>
</div>```