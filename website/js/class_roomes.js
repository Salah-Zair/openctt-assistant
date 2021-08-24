

function build_class_rooms_table(class_room_data) {
    url_components = get_url_with();

    result_view = `<h3 class="mt-2">
            <center>Classrooms table</center>
            </h3>
<table class="table mt-5">
    <thead class="table-dark table-borderless">
        <tr>
            <th scope="col" style="width: 10%;">ID</th>
            <th scope="col">name</th>
            <th scope="col">capacity</th>
        </tr>
    </thead>
    <tbody>`;


    class_room_data.class_rooms.forEach(class_room => {
        // var group = get_realted_item_by_id(data.groups, course.related_group)
        // var teacher = get_realted_item_by_id(data.teachers, course.teacher_id)


        var document_id = url_components.document
        var class_room_paramters = [`document=${document_id}`, `id=${class_room.id}`].join("&");
        var class_room_url = [url_components['url'], class_room_paramters].join("?")

        // console.log(course_paramters);
        result_view += ` <tr>
            <td><a href="${class_room_url}">${class_room.id}</a></td>
            <td>${class_room.name}</td>
            <td>${class_room.capacity}</td>
        </tr>`;
    });

    result_view += `</tbody></table>`;
    return result_view
}


function build_class_room_schedule(class_room_data) {
    let content_area = $("#content-area")

    content_area.html(`   <div class="container d-flex flex-column justify-content-center align-items-center test" >
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
    schedule_group.append(`Class Room ${class_room_data.class_room.name}`);

    row_length = class_room_data.terms.length + 1;
    column_length = class_room_data.days.length + 1;

    for (var row = 0; row < row_length; row++) {
        column_raw = ""
        for (var column = 0; column < column_length; column++) {
            if (row == 0 && column == 0) {
                column_raw += getEmptyHeader()
            } else if (row == 0) {
                column_raw += getCellDay(class_room_data.days[column - 1]);
            } else if (column == 0) {
                column_raw += getTerm(class_room_data.terms[row - 1]);
            } else {
                column_raw += get_lesson_cell(class_room_data, column, row);
            }
        }
        row_raw = getRow(column_raw, row);
        table.append(row_raw);
    }
}



function get_lesson_cell(class_room_data, day_index, term_index) {
    var data = ""


    class_room_data.lessons.forEach(element => {
        if (element.day_index == day_index && element.term_index == term_index) {
            course = get_realted_item_by_id(class_room_data.courses, element.course_id);

            group = get_realted_item_by_id(class_room_data.groups, course.related_group);
            teacher = get_realted_item_by_id(class_room_data.teachers, course.teacher_id);
            // class_room = get_realted_item_by_id(class_room_data.class_rooms, element.classroom_id);


            inner_data = `<div class='course-item-data ${course.course_type.toLocaleLowerCase()}'>`;


            inner_data += `<div class='course-data'>`;
            inner_data += `<a href='#'>`;
            inner_data += `${course.short_name}`;
            inner_data += `</a>`;
            inner_data += `</div>`;

            // inner_data += `<div class='class-room-data'>`;
            // inner_data += `<a href='#'>`;
            // inner_data += `${class_room.name}`;
            // inner_data += `</a>`;
            // inner_data += `</div>`;

            inner_data += `<div class='class-room-data'>`;
            inner_data += `<a href='#'>`;
            inner_data += `${group.name}`;
            inner_data += `</a>`;
            inner_data += `</div>`;

            inner_data += `<div class='teacher-data'>`;
            inner_data += `<a href='#'>`;
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
