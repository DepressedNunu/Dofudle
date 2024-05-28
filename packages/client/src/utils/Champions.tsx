import data from "../data/icoSpells.json";
import {Spell} from "@/type/Spell.ts";

export function getChampionList(): string[] {
    return Object.keys(data.characters);
}

export function getChampionSpells(name: string): Spell[] {
    return data.characters[name] ? data.characters[name] : [];
}