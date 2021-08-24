


function build_free_class_rooms_schedule(free_class_room_data) {
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
    schedule_group.append(`Free ClassRooms`);

    row_length = free_class_room_data.terms.length + 1;
    column_length = free_class_room_data.days.length + 1;

    for (var row = 0; row < row_length; row++) {
        column_raw = ""
        for (var column = 0; column < column_length; column++) {
            if (row == 0 && column == 0) {
                column_raw += getEmptyHeader()
            } else if (row == 0) {
                column_raw += getCellDay(free_class_room_data.days[column - 1]);
            } else if (column == 0) {
                column_raw += getTerm(free_class_room_data.terms[row - 1]);
            } else {
                column_raw += get_lesson_cell(free_class_room_data,column, row);
            }
        }
        row_raw = getRow(column_raw, row);
        table.append(row_raw);
    }
}




var a = [];

function get_lesson_cell(free_class_room_data,day_index, term_index) {
    var data = ""
    inner_data = `<div class='free-class-rooms'>`;
    inner_data += `<ul>`
    var tp_items = free_class_room_data.free_class_rooms[day_index][term_index].forEach(class_room_id => {

        class_room = get_realted_item_by_id(free_class_room_data.class_rooms,class_room_id);

        inner_data += `<li>`
        inner_data += `<a href='#'>`;
        inner_data += `${class_room.name}`;
        inner_data += `</a>`;
        inner_data += `</li>`


    });

    inner_data += `</ul>`
    inner_data += `</div>`;
    data = `<td> ${inner_data} </td>`;

    if (data)
        return data;

    return "<td></td>"
}
