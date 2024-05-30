import express from "express";
import cors from "cors";
import characters from "./data/icoSpells.json";
import daily from "./data/daily.json";
import setDailyRandomSpell from "./utils/crontab";
import salt from "./data/salt.json";
import cron from "node-cron";

const app = express()
app.use(cors())

cron.schedule('0 0 * * *', async () => {
    const daily = await setDailyRandomSpell();
    console.log(daily);
});


app.get('/', ( req, res) => {
    res.json({
        message: "Welcome to the Dofudle API!"
    })
})

app.get('/characters', (req, res) => {
        return res.json(characters)
    })

app.get('/daily', (req, res) => {
    return res.json(daily)
})

app.get('/salt', (req, res) => {
    return res.json(salt)
})

app.listen(3000, () => {
    console.log(`Server is running on http://localhost:3000`)
})