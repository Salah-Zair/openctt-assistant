


function build_teachers_table(teacher_data){
    url_components = get_url_with();

    result_view = `<h3 class="mt-2">
            <center>Courses</center>
            </h3>
<table class="table mt-5">
    <thead class="table-dark table-borderless">
        <tr>
            <th scope="col" style="width: 10%;">ID</th>
            <th scope="col">name</th>
            <th scope="col">last name</th>        // console.log(course_paramters);

        </tr>
    </thead>
    <tbody>`;


    teacher_data.teachers.forEach(teacher => {
        
        var document_id = url_components.document
        var teacher_paramters = [`document=${document_id}`,`id=${teacher.id}`].join("&");
        var teacher_url = [url_components['url'],teacher_paramters].join("?")

        result_view += ` <tr>
            <td><a href="${teacher_url}">${teacher.id}</a></td>
            <td>${teacher.name}</td>
            <td>${teacher.last_name.toUpperCase()}</td>
        </tr>`;
    });

    result_view += `</tbody></table>`;
    return result_view
}


function build_teacher_schedule(teacher_data) {
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
    schedule_group.append(`Teacher ${teacher_data.teacher.name} ${teacher_data.teacher.last_name}`);

    row_length = teacher_data.terms.length + 1;
    column_length = teacher_data.days.length + 1;

    for (var row = 0; row < row_length; row++) {
        column_raw = ""
        for (var column = 0; column < column_length; column++) {
            if (row == 0 && column == 0) {
                column_raw += getEmptyHeader()
            } else if (row == 0) {
                column_raw += getCellDay(teacher_data.days[column - 1]);
            } else if (column == 0) {
                column_raw += getTerm(teacher_data.terms[row - 1]);
            } else {
                column_raw += get_lesson_cell(teacher_data,column, row);
            }
        }
        row_raw = getRow(column_raw, row);
        table.append(row_raw);
    }
}



function get_lesson_cell(teacher_data,day_index, term_index) {
    var data = ""


    teacher_data.lessons.forEach(element => {
        if (element.day_index == day_index && element.term_index == term_index) {
            course = get_realted_item_by_id(teacher_data.courses, element.course_id);

            group = get_realted_item_by_id(teacher_data.groups, course.related_group);
            // teacher = get_realted_item_by_id(teacher_data.teachers, course.teacher_id);
            class_room = get_realted_item_by_id(teacher_data.class_rooms, element.classroom_id);


            inner_data = `<div class='course-item-data ${course.course_type.toLocaleLowerCase()}'>`;


            inner_data += `<div class='course-data'>`;
            inner_data += `<a href='#'>`;
            inner_data += `${course.short_name}`;
            inner_data += `</a>`;
            inner_data += `</div>`;

            inner_data += `<div class='class-room-data'>`;
            inner_data += `<a href='#'>`;
            inner_data += `${class_room.name}`;
            inner_data += `</a>`;
            inner_data += `</div>`;

            inner_data += `<div class='class-room-data'>`;
            inner_data += `<a href='#'>`;
            inner_data += `${group.name}`;
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
