//Import Roll2D20
import { Roller2D20 } from "./roller/fo2d20-roller.mjs"
import { Dialog2d20 } from './roller/dialog2d20.mjs'
import { DialogD6 } from './roller/DialogD6.mjs'

Hooks.once('init', async function () {
    game.fallout = {
        Roller2D20,
        Dialog2d20,
        DialogD6
    };
});

Hooks.on('renderChatMessage', (message, html, data) => {
    let rrlBtn = html.find('.reroll-button');
    if (rrlBtn.length > 0) {
        rrlBtn[0].setAttribute('data-messageId', message.id);
        rrlBtn.click((el) => {
            let selectedDiceForReroll = $(el.currentTarget).parent().find('.dice-selected');
            let rerollIndex = [];
            for (let d of selectedDiceForReroll) {
                rerollIndex.push($(d).data('index'));
            }
            if (!rerollIndex.length) {
                ui.notifications.notify('Select Dice you want to Reroll');
            }
            else {
                let falloutRoll = message.data.flags.falloutroll;
                if (falloutRoll.diceFace == "d20") {
                    Roller2D20.rerollD20({
                        rollname: falloutRoll.rollname,
                        rerollIndexes: rerollIndex,
                        successTreshold: falloutRoll.successTreshold,
                        critTreshold: falloutRoll.critTreshold,
                        complicationTreshold: falloutRoll.complicationTreshold,
                        dicesRolled: falloutRoll.dicesRolled
                    });
                } else if (falloutRoll.diceFace == "d6") {
                    Roller2D20.rerollD6({
                        rollname: falloutRoll.rollname,
                        rerollIndexes: rerollIndex,
                        dicesRolled: falloutRoll.dicesRolled
                    });
                } else {
                    ui.notifications.notify('No dice face reckognized');
                }

            }
        })
    }
    html.find('.dice-icon').click((el) => {
        if ($(el.currentTarget).hasClass('reroll'))
            return;
        if ($(el.currentTarget).hasClass('dice-selected')) {
            $(el.currentTarget).removeClass('dice-selected');
        } else {
            $(el.currentTarget).addClass('dice-selected')
        }
    })
});

Handlebars.registerHelper("ifCond", function (v1, operator, v2, options) {
    switch (operator) {
        case "==":
            return v1 == v2 ? options.fn(this) : options.inverse(this);
        case "===":
            return v1 === v2 ? options.fn(this) : options.inverse(this);
        case "!=":
            return v1 != v2 ? options.fn(this) : options.inverse(this);
        case "!==":
            return v1 !== v2 ? options.fn(this) : options.inverse(this);
        case "<":
            return v1 < v2 ? options.fn(this) : options.inverse(this);
        case "<=":
            return v1 <= v2 ? options.fn(this) : options.inverse(this);
        case ">":
            return v1 > v2 ? options.fn(this) : options.inverse(this);
        case ">=":
            return v1 >= v2 ? options.fn(this) : options.inverse(this);
        case "&&":
            return v1 && v2 ? options.fn(this) : options.inverse(this);
        case "||":
            return v1 || v2 ? options.fn(this) : options.inverse(this);
        default:
            return options.inverse(this);
    }
});

// ! DICE SO NICE

Hooks.once("diceSoNiceReady", (dice3d) => {
    dice3d.addSystem(
        { id: "fallout", name: "Fallout 2d20" },
        true
    );
    dice3d.addDicePreset({
        type: "d6",
        labels: [
            "modules/fallout-roller/assets/dice/d1.webp",
            "modules/fallout-roller/assets/dice/d2.webp",
            "modules/fallout-roller/assets/dice/d3.webp",
            "modules/fallout-roller/assets/dice/d4.webp",
            "modules/fallout-roller/assets/dice/d5.webp",
            "modules/fallout-roller/assets/dice/d6.webp",
        ],
        system: "fallout",
    });
    dice3d.addColorset(
        {
            name: "fallout",
            description: "Fallout 2d20",
            category: "Colors",
            foreground: "#fcef71",
            background: "#008cd1",
            outline: "gray",
            texture: "none",
        },
        "force"
    );
});