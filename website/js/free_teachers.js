

function build_available_teachers(techers_av) {
    let content_area = $("#content-area")

    content_area.html(`   <div class="container d-flex flex-column justify-content-center align-items-center test" >
    <div id="schedule-year" class="mb-3"></div>

    <div id="schedule-title"></div>
    <div class="container d-flex justify-content-around">
    <div>
    Course type
    <select id='course-type' class="form-select mb-3" aria-label="Default select example" style='width:200px;'>
    <option selected>all</option>
    <option value="1">COURS</option>
    <option value="2">TD</option>
    <option value="3">TP</option>
</select>
</div>
<div>
teacher type
<select id='teacher-type' class="form-select mb-3" aria-label="Default select example" style='width:200px;'>
<option selected>all</option>
<option value="1">M</option>
<option value="1">Mr</option>
<option value="3">Mme</option>
<option value="2">Melle</option>
</select>
</div>
<div>
teacher rank
<select id='teacher-rank' class="form-select mb-3" aria-label="Default select example" style='width:200px;'>
<option selected>all</option>
<option value="1">MAA</option>
<option value="2">Vac</option>
<option value="3">MAB</option>
<option value="3">Professeur</option>
</select>
</div>
</div>
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

    var course_type = $('#course-type')
    selected_course_type = 'all';

    var teacher_type = $('#teacher-type')
    selected_teacher_type = 'all';


    var teacher_rank = $('#teacher-rank')
    selected_teacher_rank = 'all';

    course_type.change(function () {
        selected_course_type = course_type.find(":selected").text();
        _build(techers_av, selected_course_type, selected_teacher_type, selected_teacher_rank);
    });


    teacher_type.change(function () {
        selected_teacher_type = teacher_type.find(":selected").text();
        _build(techers_av, selected_course_type, selected_teacher_type, selected_teacher_rank);
    });


    teacher_rank.change(function () {
        selected_teacher_rank = teacher_rank.find(":selected").text();
        _build(techers_av, selected_course_type, selected_teacher_type, selected_teacher_rank);
    });


    _build(techers_av, selected_course_type, selected_teacher_type, selected_teacher_rank);



}

function _build(techers_av) {
    let table = $('#schedule');
    // let schedule_year = $("#schedule-year")
    let schedule_group = $("#schedule-title")

    table.html("")
    // schedule_year.html("")
    schedule_group.html("")

    // schedule_year.append(`Not yet`);
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
                column_raw += get_lesson_cell(techers_av, selected_course_type, selected_teacher_type, selected_teacher_rank, column, row);
            }
        }
        row_raw = getRow(column_raw, row);
        table.append(row_raw);
    }

}


function get_lesson_cell(techers_av, selected_course_type, selected_teacher_type, selected_teacher_rank, day_index, term_index) {
    var data = ""

    teacher_data = []
    courses_id = []

    var count = 0;
    var count_a = 0;


    var course_page = "courses.html";
    var teacher_page = "teachers.html";
    var class_room_page = "class_room.html";
    var group_page = 'groups.html';
    document_key = findGetParameter('document');

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
        // var group_url = [group_page, [`document=${document_key}`, `id=${element.group.id}`].join("&")].join("?")
        var course_url = [course_page, [`document=${document_key}`, `id=${element.course.id}`].join("&")].join("?")
        var class_room_url = [class_room_page, [`document=${document_key}`, `id=${element.class_room.id}`].join("&")].join("?")
        var teacher_url = [teacher_page, [`document=${document_key}`, `id=${element.teacher.id}`].join("&")].join("?")

        if (selected_course_type.includes("all")) {

        } else if (element.course.course_type.toLocaleUpperCase().includes(selected_course_type)) {
        }
        else {
            console.log("here 1");
            return
        }


        if(selected_teacher_type.includes("all")){}
        else if (selected_teacher_type.length == 1){
            if(element.teacher.title.length > 1){
                return
            }
        }
        else if (element.teacher.title.includes(selected_teacher_type)){}
        else{
            return
        }



        if(selected_teacher_rank.includes("all")){}
        else if (element.teacher.edu_rank.includes(selected_teacher_rank)){}
        else{
            return
        }

        inner_data += `<div class=' course-item-data  ${element.course.course_type.toLocaleLowerCase()}'>`;
        inner_data += `<a class="teacher-data" href='${teacher_url}'>`;
        inner_data += `${element.teacher.name} ${element.teacher.last_name}<br>`;
        inner_data += `<a style="font-size:0.75rem;">${element.course.course_type.toLocaleUpperCase()}</a><br>`
        inner_data += `<a href="${class_room_url}" style="font-size:0.75rem;">${element.class_room.name}</a><br>`

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
