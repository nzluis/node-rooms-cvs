import { writeFile } from "fs";

const rooms = require('./rooms.json')

export interface RoomData {
    id: string
    photo: string
    room_number: string
    room_type: string
    description: string
    offer: boolean
    price: string
    discount: string
    cancelation: string
    amenities: string[]
    status: string
}

function orderByPrice(list: RoomData[]) {
    return list.sort((a, b) => {
        if (a.price > b.price) {
            return 1
        } else if (a.price < b.price) {
            return -1
        } else {
            return 0
        }
    })
}

const orderedRooms = orderByPrice(rooms)

writeFile('orderedRooms.json', JSON.stringify(orderedRooms), error => {
    if (error) {
        console.error(error)
    } else {
        console.log('Json file written successfully')
    }
})

const replacer = (key: string, value: string | boolean) => typeof (value) != 'string' ? value.toString() : value
const header = Object.keys(rooms[0])
const csv = [
    header.join(','),
    ...orderedRooms.map((row: any) => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','))
].join('\r\n')

writeFile('orderedRooms.csv', csv, error => {
    if (error) {
        console.error(error)
    } else {
        console.log('Csv file written successfully')
    }
})