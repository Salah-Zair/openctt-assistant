var teacher_data =
{"years":{"name":"X- assistance","extid":"aae98b78-fe10-11eb-ac43-b0104192812f","groups":[{"id":22,"name":"3 ISIL-a","code":"","semester":"6","extid":"","courses":[{"id":320,"name":"Test et qualité de logiciel","short_name":"TQL3Info 3ISIL","course_type":"tp","num_of_lessons_per_week":1,"num_of_enrolled_students":35,"group_name":"","teacher_id":53,"extid":"","to_hold_together_with":[]}]},{"id":23,"name":"M1 GSI-a","code":"","semester":"2","extid":"","courses":[{"id":321,"name":"gestion de données multimédia","short_name":"multimedia","course_type":"TP","num_of_lessons_per_week":1,"num_of_enrolled_students":30,"group_name":"","teacher_id":55,"extid":"","to_hold_together_with":[]},{"id":322,"name":"Technologie des middle ware","short_name":"MIDDLEWAREM1 MGSI","course_type":"TP","num_of_lessons_per_week":2,"num_of_enrolled_students":35,"group_name":"","teacher_id":43,"extid":"","to_hold_together_with":[]}]}]},"class_rooms":[{"id":1,"name":"Amphi 5","extid":"","capacity":1000,"spec_slots":{"type":"unallowed","spec_slots":[{"day_index":1,"term_index":4},{"day_index":2,"term_index":4},{"day_index":3,"term_index":4},{"day_index":4,"term_index":4},{"day_index":5,"term_index":4},{"day_index":6,"term_index":4}]}},{"id":3,"name":"Grande Salle 12","extid":"","capacity":120,"spec_slots":{"type":"unallowed","spec_slots":[{"day_index":1,"term_index":4},{"day_index":2,"term_index":4},{"day_index":3,"term_index":4},{"day_index":4,"term_index":4},{"day_index":5,"term_index":4},{"day_index":6,"term_index":4}]}},{"id":10,"name":"Salle 40","extid":"","capacity":40,"spec_slots":{"type":"unallowed","spec_slots":[{"day_index":1,"term_index":4},{"day_index":2,"term_index":4},{"day_index":3,"term_index":4},{"day_index":4,"term_index":4},{"day_index":5,"term_index":4},{"day_index":6,"term_index":4}]}},{"id":22,"name":"Salle-p 46","extid":"","capacity":30,"spec_slots":{"type":"unallowed","spec_slots":[{"day_index":1,"term_index":4},{"day_index":2,"term_index":4},{"day_index":3,"term_index":4},{"day_index":4,"term_index":4},{"day_index":5,"term_index":4},{"day_index":6,"term_index":4}]}}],"courses":[{"id":221,"name":"Recherche d'information","short_name":"RI3Info 3ISIL","course_type":"cours","num_of_lessons_per_week":1,"num_of_enrolled_students":25,"group_name":"","teacher_id":1,"extid":"","to_hold_together_with":[],"related_group":14},{"id":222,"name":"Recherche d'information","short_name":"RI3Info 3ISIL","course_type":"td","num_of_lessons_per_week":1,"num_of_enrolled_students":35,"group_name":"","teacher_id":1,"extid":"","to_hold_together_with":[],"related_group":14},{"id":278,"name":"Système d'exploitation","short_name":"SEM1 MISIL","course_type":"cours","num_of_lessons_per_week":1,"num_of_enrolled_students":35,"group_name":"","teacher_id":1,"extid":"","to_hold_together_with":[297],"related_group":18},{"id":280,"name":"Systemes d'exploitation","short_name":"SE","course_type":"TD","num_of_lessons_per_week":1,"num_of_enrolled_students":25,"group_name":"","teacher_id":1,"extid":"","to_hold_together_with":[],"related_group":18},{"id":297,"name":"Système d'exploitation","short_name":"SEM1 MISIL","course_type":"cours","num_of_lessons_per_week":1,"num_of_enrolled_students":35,"group_name":"","teacher_id":1,"extid":"","to_hold_together_with":[278],"related_group":19},{"id":299,"name":"Systemes d'exploitation","short_name":"SE","course_type":"TD","num_of_lessons_per_week":1,"num_of_enrolled_students":25,"group_name":"","teacher_id":1,"extid":"","to_hold_together_with":[],"related_group":19}],"teacher":{"id":1,"name":"Akli","last_name":"Abbas","title":"Mr","edu_rank":"MCB","extid":null},"groups":[{"id":14,"name":"3Info","code":"ISIL1","semester":"6"},{"id":18,"name":"M1 ISIL G1","code":"","semester":"2"},{"id":19,"name":"M1 ISIL G2","code":"","semester":"2"}],"lessons":[{"course_id":221,"day_index":2,"term_index":2,"classroom_id":1},{"course_id":222,"day_index":2,"term_index":3,"classroom_id":10},{"course_id":278,"day_index":5,"term_index":5,"classroom_id":3},{"course_id":280,"day_index":5,"term_index":1,"classroom_id":3},{"course_id":297,"day_index":5,"term_index":5,"classroom_id":3},{"course_id":299,"day_index":5,"term_index":2,"classroom_id":22}],"days":[{"id":1},{"id":2},{"id":3},{"id":4},{"id":5},{"id":6}],"terms":[{"index":1,"term":"08:00-09:30"},{"index":2,"term":"09:30-11:00"},{"index":3,"term":"11:00-12:30"},{"index":4,"term":"12:30-13:00"},{"index":5,"term":"13:00-14:30"},{"index":6,"term":"14:30-16:00"}]}

// START POINT
$(document).ready(function () {
    build_course_table();
});





function build_course_table() {
    console.log(teacher_data.courses.length);
    
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
                column_raw += get_lesson_cell(column, row);
            }
        }
        row_raw = getRow(column_raw, row);
        table.append(row_raw);
    }
}


function getEmptyCell() {
    return `<td></td>`
}

function getEmptyHeader() {
    return `<th></th>`
}

function getCellDay(day_data) {
    return `<th data-index='${day_data.id}'>${get_day_name_by_index(day_data.id)}</th>`
}

function getTerm(term) {
    return `<td data-index='${term.index}'>${term.term}</td>`
}

function getRow(inner_data, row_number) {
    return `<tr>${inner_data}</tr>`
}



function get_lesson_cell(day_index, term_index) {
    var data = ""


    teacher_data.lessons.forEach(element => {
        if (element.day_index == day_index && element.term_index == term_index) {
            course = get_realted_item_by_id(teacher_data.courses, element.course_id);

            group = get_realted_item_by_id(teacher_data.groups,course.related_group);
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

            // inner_data += `<div class='teacher-data'>`;
            // inner_data += `<a href='#'>`;
            // inner_data += `${teacher.name} ${teacher.last_name}`;
            // inner_data += `</a>`;
            // inner_data += `</div>`;

            inner_data += `</div>`;

            data = `<td> ${inner_data} </td>`;
        }
    });

    if (data)
        return data;

    return "<td></td>"
}

function get_realted_item_by_id(list_item, item_id) {
    let match;
    list_item.forEach(item => {
        if (item.id == item_id) {
            match = item
        }
    })
    return match
}


function get_group_data(groups, group_id) {
    let group;
    groups.forEach(group_item => {
        if (group_item.id == group_id) {
            group = group_item
        }
    })
    return group;
}


function get_teacher_data(teachers, teacher_id) {
    let teacher;
    teachers.forEach(teacher_item => {
        if (teacher_item.id == teacher_id) {
            teacher = teacher_item
        }
    })
    return teacher;
}


function get_class_room(class_rooms, class_room_id) {
    let class_room;
    class_rooms.forEach(class_room_item => {
        if (class_room_item.id == class_room_id) {
            class_room = class_room_item
        }
    })

    return class_room;
}


function get_day_name_by_index(day_index) {
    switch (day_index) {
        case 1:
            return "Saturday"
        case 2:
            return "Sunday"
        case 3:
            return "Monday"
        case 4:
            return "Tuesday"
        case 5:
            return "Wednesday"
        case 6:
            return "Thursday"
        case 7:
            return "Friday"

        default:
            break;
    }
}


