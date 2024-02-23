import fs from 'fs'
import path from 'path'

interface Person {
    appointment: string;
    id: string;
    team_name: string;
    id_created: number;
}

const parse_data = (pathName: string) => {
    return fs.readFileSync(path.resolve(pathName), {
        encoding: 'utf-8'
    })
    .split('\n')
    .map((row: string): string[] => {
        return row.split(',');
    });
}

const datas = parse_data("staff-id-to-team-mapping.csv");

const add_Map = (datas: string[][]) => {
    let id_Map = new Map<number, Person>();
    for (var i = 1; i < datas.length; i++) {
        var appointment_id = datas[i][0].split("_");
        var appointment_str = appointment_id[0]
        if (appointment_str != '') {
            var id_str = appointment_id[1]
            var team_name_str = datas[i][1]
            var id_created_num: number =+ datas[i][2]
            let person:Person = {
                appointment: appointment_str,
                id: id_str,
                team_name: team_name_str,
                id_created: id_created_num
            }
            id_Map.set(id_created_num, person)
        }
    }
    return id_Map
}

const actual_id_Map = add_Map(datas)

const can_redeem = (teamName: string, mapObj: Map<string, number>): boolean => {
    return mapObj.has(teamName);
}

const add_redemption = (teamName: string, time: number, mapObj: Map<string, number>): string => {
    if (can_redeem(teamName, mapObj) == true) {
        mapObj.set(teamName, time);
        return teamName + " redeemed at " + time;
    } 
    var redeemed_At = mapObj.get(teamName);
    return "Your team has already redeemed present at " + redeemed_At;
}

// Unit testing
let test_ids = parse_data("unit-testing.csv");
let test_id_Map = add_Map(test_ids);
let test_redeemed_Map = new Map<string, number>();

for (let [key, value] of test_id_Map) { // looping through those who want to redeem
    console.log(key, value);
    let look_up_output = actual_id_Map.has(key);
    if (look_up_output == false) {
        console.log("Wrong ID")
    } else {
        let redeem_Person:Person = actual_id_Map.get(key);
        
        let redeem_team:string = redeem_Person.team_name

        console.log(
            add_redemption(
                redeem_team, 
                Date.now(), 
                test_redeemed_Map))
    }
}

