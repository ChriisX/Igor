const confSaver = require("./conf");
const { RichEmbed } = require('discord.js');

// Changes the prefix that triggers the bot
exports.prefix = (message, conf) => {
    const arg = message.content.split(' ')[1];
    if(typeof arg !== "undefined" && arg.length <= 3 && arg.length > 0){
        conf.prefix = arg;
        conf.prefixlen = arg.length + 1;

        confSaver.save(conf, "./conf/config.json");

        message.channel.send("New prefix : " + arg);
    }
}

// Adds a new granted user
exports.grant = (message, users) => {
    var user = users.users.find((element) => {
        return element.id == message.mentions.users.first().id && element.server == message.guild.id;
    });

    if(user && user.grade != "0"){
        var rank = message.content.split(' ')[2];
        if(!isNaN(rank) && parseInt(rank) < 3 && parseInt(rank) >= 0){
            user.grade = rank;
            confSaver.save(users, "./conf/users.json");
            message.channel.send(message.mentions.users.first().username + " promoted to rank " + rank + "! :tada:");
        }
    }
}

exports.setWake = (message, conf) => {
    var current = conf.wakeChannels.find((element) => {
        return element.serverId == message.guild.id;
    });

    if(current){
        current.channelId = message.channel.id;
    }
    else{
        conf.wakeChannels.push({"serverId": message.channel.guild.id, "channelId": message.channel.id});
    }

    confSaver.save(conf, "./conf/config.json");
}

exports.nextUpdate = (message, conf) => {
    var reply = new RichEmbed()
    .setTitle("Next update !")
    .setDescription(conf.incoming);

    message.channel.send(reply);
}