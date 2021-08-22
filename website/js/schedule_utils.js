
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





function get_realted_items_by_ids(list_item, list_ids) {
    let match = [];
    list_item.forEach(item => {
        if (item.id in list_ids) {
            match.push(item)
        }
    })
    return match
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


