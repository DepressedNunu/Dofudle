import bcrypt from "bcryptjs";
import fs from "fs";
import data from "../data/icoSpells.json"
import {DailyResponse} from "client/src/type/DailyResponse";


export default async function setDailyRandomSpell(){
    const random = Math.floor(Math.random() * Object.keys(data.characters).length)
    const character = Object.keys(data.characters)[random]
    const spell = Object.values(data.characters)[random][Math.floor(Math.random() * Object.values(data.characters)[random].length)]
    console.log(character, spell)

    const hash = await bcrypt.hash(character, 10)
    const daily: DailyResponse = {
        character: character,
        spell: spell,
        characterHash: await bcrypt.hash(character, hash),
        spellHash: await bcrypt.hash(spell.name, hash),
    }

    fs.writeFileSync("data/daily.json", JSON.stringify({daily}))
    fs.writeFileSync("data/salt.json", JSON.stringify({hash}))
    return daily;
}
