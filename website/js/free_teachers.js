

function build_available_teachers(techers_av) {
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
    schedule_group.append(`Available teachers`);

    row_length = techers_av.terms.length + 1;
    column_length = techers_av.days.length + 1;

    for (var row = 0; row < row_length; row++) {
        column_raw = ""
        for (var column = 0; column < column_length; column++) {
            if (row == 0 && column == 0) {
                column_raw += getEmptyHeader()
            } else if (row == 0) {
                column_raw += getCellDay(techers_av.days[column - 1]);
            } else if (column == 0) {
                column_raw += getTerm(techers_av.terms[row - 1]);
            } else {
                column_raw += get_lesson_cell(techers_av,column, row);
            }
        }
        row_raw = getRow(column_raw, row);
        table.append(row_raw);
    }


}




function get_lesson_cell(techers_av,day_index, term_index) {
    var data = ""

    teacher_data = []
    courses_id = []

    var count = 0;
    var count_a = 0;

    techers_av.lessons.forEach(element => {
        if (element.day_index == day_index && element.term_index == term_index) {
            // console.log(day_index, term_index);
            count++
            groups = []
            course = get_realted_item_by_id(techers_av.courses, element.course_id);
            if (!courses_id.includes(course.id)) {
                courses_id = courses_id.concat(course.to_hold_together_with)
                courses_id.push(course.id)
                count_a++


                courses_id.forEach(id => {
                    course_item = get_realted_item_by_id(techers_av.courses, id)
                    // console.log(course_item);
                    group_item = get_realted_item_by_id(techers_av.groups, course_item.related_group);
                    groups.push(group_item)

                })



                teacher = get_realted_item_by_id(techers_av.teachers, course.teacher_id);
                class_room = get_realted_item_by_id(techers_av.class_rooms, element.classroom_id);

                teacher_data.push({
                    "teacher": teacher,
                    "course": course_item,
                    "class_room": class_room,
                    "groups": groups
                })

            }
        }
    });

    inner_data = `<div >`;


    teacher_data.forEach(element => {
        inner_data += `<div class=' course-item-data  ${element.course.course_type.toLocaleLowerCase()}'>`;
        inner_data += `<a class="teacher-data" href='#'>`;
        inner_data += `${element.teacher.name} ${element.teacher.last_name}<br>`;
        inner_data += `<a  href="#" style="font-size:0.75rem;">${element.course.course_type.toLocaleUpperCase()}</a><br>`

        inner_data += `</a>`;
        inner_data += `</div>`;
    }
    );

    inner_data += `</div>`;
    data = `<td> ${inner_data} </td>`;

    if (data)
        return data;

    return "<td></td>"
}
