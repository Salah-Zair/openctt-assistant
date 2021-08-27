


function build_free_class_rooms_schedule(free_class_room_data) {
    let content_area = $("#content-area")

    var choiceses = ["all", "amphi", "salle", "tp"];

    content_area.html(`   <div class="container d-flex flex-column justify-content-center align-items-center test" >
    <div id="schedule-year" class="mb-3"></div>
    <div id="schedule-title" ></div>
    <select id='class-room-type' class="form-select mb-3" aria-label="Default select example" style='width:200px;'>
        <option selected>all</option>
        <option value="1">amphi</option>
        <option value="2">salle</option>
        <option value="3">tp</option>
    </select>
    <table border="1" id="schedule">
  `)


    var select_field = $('#class-room-type')
    selected_item = 'all';

    select_field.change(function () {
        selected_item = select_field.find(":selected").text();
        _build(free_class_room_data, selected_item);
    });

    _build(free_class_room_data, selected_item);


}


function _build(free_class_room_data, selected_item) {
    let table = $('#schedule');
    // let schedule_year = $("#schedule-year")
    let schedule_group = $("#schedule-title")

    table.html("");
    // schedule_year.html("");
    schedule_group.html("");

    // schedule_year.append(`Not yet`);
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
                column_raw += get_lesson_cell(free_class_room_data, selected_item, column, row);
            }
        }
        row_raw = getRow(column_raw, row);
        table.append(row_raw);
    }
}

var a = [];

function get_lesson_cell(free_class_room_data, selected_item, day_index, term_index) {


    var data = ""
    inner_data = `<div class='free-class-rooms'>`;
    inner_data += `<ul>`


    var class_room_page = "class_room.html";
    document_key = findGetParameter('document')


    var tp_items = free_class_room_data.free_class_rooms[day_index][term_index].forEach(class_room_id => {

        class_room = get_realted_item_by_id(free_class_room_data.class_rooms, class_room_id);
        var class_room_url = [class_room_page, [`document=${document_key}`, `id=${class_room.id}`].join("&")].join("?")

        if ("All".includes(selected_item)) {
            inner_data += `<li>`
            inner_data += `<a href='${class_room_url}'>`;
            inner_data += `${class_room.name}`;
            inner_data += `</a>`;
            inner_data += `</li>`
        }
        else if (class_room.name.toLowerCase().includes(selected_item)) {
            inner_data += `<li>`
            inner_data += `<a href='${class_room_url}'>`;
            inner_data += `${class_room.name}`;
            inner_data += `</a>`;
            inner_data += `</li>`
        }



    });

    inner_data += `</ul>`
    inner_data += `</div>`;
    data = `<td> ${inner_data} </td>`;

    if (data)
        return data;

    return "<td></td>"
}
