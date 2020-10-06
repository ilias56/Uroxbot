require("events").EventEmitter.defaultMaxListeners = 200;
const http = require("http");
const express = require("express");
const app = express();
app.get("/", (request, response) => {
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

////بكجات
const { Client, RichEmbed } = require("discord.js");
var { Util } = require("discord.js");
const { prefix, devs } = require("./config");
const client = new Client({ disableEveryone: true });
const ytdl = require("ytdl-core");
const canvas = require("canvas");
const convert = require("hh-mm-ss");
const fetchVideoInfo = require("youtube-info");
const botversion = require("./package.json").version;
const simpleytapi = require("simple-youtube-api");
const moment = require("moment");
const fs = require("fs");
const util = require("util");
const gif = require("gif-search");
const opus = require("node-opus");
const ms = require("ms");
const jimp = require("jimp");
const db = require("quick.db");
const { get } = require("snekfetch");
const guild = require("guild");
const dateFormat = require("dateformat");
const YouTube = require("simple-youtube-api");
const youtube = new YouTube("AIzaSyByXXvIYZ1uSK0kZyMfc6_fDrHki90RaCo"); //تعديل اساسي سوي اي بي اي جديد
const hastebins = require("hastebin-gen");
const getYoutubeID = require("get-youtube-id");
const yt_api_key = "AIzaSyByXXvIYZ1uSK0kZyMfc6_fDrHki90RaCo"; ///تعديل اساسي سوي اي بي اي جديد
const pretty = require("pretty-ms");
client.login(process.env.TOKEN);
const queue = new Map();
var table = require("table").table;
const Discord = require("discord.js");
client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

///setmember
client.on("message", async message => {
  if (message.content.startsWith(prefix + "setmember")) {
    if (!message.guild.member(message.author).hasPermissions("MANAGE_CHANNELS"))
      return message.reply("❌ **لا تمتلك صلاحيه**");
    if (
      !message.guild
        .member(client.user)
        .hasPermissions(["MANAGE_CHANNELS", "MANAGE_ROLES_OR_PERMISSIONS"])
    )
      return message.reply("❌ **You d'ont have permission**");
    message.channel.send("✅| **The room is set**");
    message.guild
      .createChannel(`Members : [ ${message.guild.members.size} ]`, "voice")
      .then(c => {
        console.log(`Done make room in: \n ${message.guild.name}`);
        c.overwritePermissions(message.guild.id, {
          CONNECT: false,
          SPEAK: false
        });
        setInterval(() => {
          c.setName(`Members : [ ${message.guild.members.size} ]`);
        }, 1000);
      });
  }
});
//test welcome
const welcome = JSON.parse(fs.readFileSync("./welcomer.json", "utf8")); //ملف تخزين كود الويلكم

//كود الويلكم

client.on("guildMemberAdd", async member => {
  if (!welcome) return;
  if (!welcome[member.guild.id]) return;
  var findingWlcChannel = welcome[member.guild.id]
    ? welcome[member.guild.id].channel
    : "null";
  const channel = await member.guild.channels.find(
    r => r.name == findingWlcChannel
  );
  if (!channel) return;
  if (channel) {
    const imageUrlRegex = /\?size=2048$/g; ///تعديل غير اساسي
    const wlcImage = await fsn.readFile("./welcome111.png"); //اسم الصورة
    let result = await fetch(
      member.user.displayAvatarURL.replace(imageUrlRegex, "?size=128")
    );
    if (!result.ok) throw new Error("Failed to get the avatar!");
    let avatar = await result.buffer();

    let name =
      member.user.username.length > 12
        ? member.user.username.substring(0, 11) + "..."
        : member.user.username;

    // تعديل غير اساسي : هنا خيارات الصورة لو تبى تغيرها

    //Welcome Image (background)
    var imageWidth = 500; //عرض الصورة
    var imageHeight = 266; //ارتفاع الصورة

    //Avatar
    var imageX = 250; //X coordinate
    var imageY = 145; //Y coordinate
    var imageRadius = 110; //نصف قطر الصورة الدائرية

    //Member Name
    var nameSize = "12pt"; //حجم خط الاسم
    var nameKind = "Source Sans Pro (OT1)"; //نوع خط الاسم
    var nameColor = "#ff9933"; //لون خط الاسم

    //Name Position
    var nameX = 247; //position x
    var nameY = 275; //position y

    let buffer = await new Canvas(500, 300)
      .addImage(wlcImage, 0, 0, imageWidth, imageHeight)
      .addCircularImage(avatar, imageX, imageY, imageRadius)
      .setTextAlign("center")
      .setTextFont(`${nameSize} ${nameKind}`)
      .setColor(nameColor)
      .addText(name, nameX, nameY)
      .toBuffer();
    const filename = `Baron-wlc-${member.id}.jpg`;
    const attachment = new Attachment(buffer, filename);
    await channel.send(attachment);
  }
});

//تحديد روم الويلكم
const wait = require("util").promisify(setTimeout);
client.on("ready", async () => {
  wait(1000);

  await client.guilds.forEach(g => {
    g.fetchInvites().then(guildInvites => {
      invites[g.id] = guildInvites;
    });
  });
});
var gg2;

client.on("guildMemberAdd", async member => {
  if (!welcome[member.guild.id])
    welcome[member.guild.id] = {
      by: "Off",
      channel: null
    };

  if (welcome[member.guild.id].by === "Off") return;
  let channel = member.guild.channels.find(
    c => c.name == welcome[member.guild.id].channel
  );
  if (!channel) return;

  await member.guild.fetchInvites().then(async guildInvites => {
    const ei = await invites[member.guild.id];
    invites[member.guild.id] = guildInvites;
    const invite = await guildInvites.find(i => ei.get(i.code).uses < i.uses);
    const inviter1 = await invite.inviter;
    const inviter =
      (await client.users.get(invite.inviter.id)) ||
      client.users.get(member.guild.owner.user.id);
    const logChannel = member.guild.channels.find(
      channel => channel.name === `${welcome[member.guild.id].channel}`
    );
    if (!logChannel) return console.log("I can't find welcomeChannel");
    let gg1 = await welcome[member.guild.id].msg.replace(
      "[member]",
      `<@!${member.id}>`
    );
    if (!inviter1 || !inviter1.id) {
      gg2 = await gg1.replace("[inviter]", `<@${member.guild.ownerID}>`);
    } else {
      gg2 = await gg1.replace("[inviter]", `<@${inviter1.id}>`);
    }
    setTimeout(() => {
      logChannel.send(`${gg2}`);
    }, 2000);
    fs.writeFile("./welcome.json", JSON.stringify(welcome), err => {
      if (err)
        console.error(err).catch(err => {
          console.error(err);
        });
    });
  });
});
client.on("message", async message => {
  if (!message.channel.guild) return;
  let room = message.content.split(" ").slice(1);
  let findroom = message.guild.channels.find(r => r.name == room);
  if (message.content.startsWith(prefix + "setWelcomer")) {
    if (!welcome[message.guild.id]) {
      if (!message.channel.guild)
        return message.reply("**This Command Only For Servers**");
      if (!message.member.hasPermission("MANAGE_GUILD"))
        return message.channel.send(
          "**Sorry But You Dont Have Permission** `MANAGE_GUILD`"
        );
      if (!room) return message.channel.send("Please Type The Channel Name");
      if (!findroom) return message.channel.send("Cant Find This Channel");
      let embed = new Discord.RichEmbed()
        .setTitle("**Done The Welcome Has Been Setup**")
        .addField("Channel:", `${room}`)
        .addField("Requested By:", `${message.author}`)
        .addField(
          "Default Message:",
          `**Welcome [member], You Joined by [inviter] invite**`
        )
        .setThumbnail(message.author.avatarURL)
        .setFooter(`${client.user.username}`);
      message.channel.sendEmbed(embed);
      welcome[message.guild.id] = {
        channel: room,
        onoff: "On",
        by: "On",
        msg: `**Welcome [member], You Joined by [inviter] invite**`
      };
      fs.writeFile("./welcomer.json", JSON.stringify(welcome), err => {
        if (err) console.error(err);
      });
    } else if (welcome[message.guild.id].channel) {
      let msg = await welcome[message.guild.id].msg;
      let by = await welcome[message.guild.id].by;
      if (!message.channel.guild)
        return message.reply("**This Command Only For Servers**");
      if (!message.member.hasPermission("MANAGE_GUILD"))
        return message.channel.send(
          "**Sorry But You Dont Have Permission** `MANAGE_GUILD`"
        );
      if (!room) return message.channel.send("Please Type The Channel Name");
      if (!findroom) return message.channel.send("Cant Find This Channel");
      let embed = new Discord.RichEmbed()
        .setTitle("**Done The Welcome Has Been Setup**")
        .addField("Channel:", `${room}`)
        .addField("Requested By:", `${message.author}`)
        .addField("Default Message:", msg)
        .setThumbnail(message.author.avatarURL)
        .setFooter(`${client.user.username}`);
      message.channel.sendEmbed(embed);
      welcome[message.guild.id] = {
        channel: room,
        onoff: "On",
        by: by,
        msg: msg
      };
      fs.writeFile("./welcomer.json", JSON.stringify(welcome), err => {
        if (err) console.error(err);
      });
    }
  }
});

client.on("message", async message => {
  let messageArray = message.content.split(" ");
  if (message.content.startsWith(prefix + "setMessage")) {
    if (!welcome[message.guild.id] || !welcome[message.guild.id].onoff == "On")
      return message.channel.send(
        `**please type \`${prefix}setWelcomer\` first **`
      );
    let filter = m => m.author.id === message.author.id;
    let thisMessage;
    let thisFalse;
    let room = welcome[message.guild.id].channel;
    if (!message.member.hasPermission("MANAGE_GUILD"))
      return message.channel.send("You don't have permission").then(msg => {
        msg.delete(4500);
        message.delete(4500);
      });

    message.channel
      .send(
        `**Write the message now:

Ex : 
\`[member] Joined the server by [inviter]\`**`
      )
      .then(msg => {
        message.channel
          .awaitMessages(filter, {
            max: 1,
            time: 90000,
            errors: ["time"]
          })
          .then(collected => {
            collected.first().delete();
            thisMessage = collected.first().content;
            msg.edit("**Nice**").then(msg => {
              let embed = new Discord.RichEmbed()
                .setTitle("**Done The Welcome Msg Has Been Setup**")
                .addField("Message:", `${thisMessage}`)
                .setThumbnail(message.author.avatarURL)
                .setFooter(`${client.user.username}`);
              message.channel.sendEmbed(embed);
              welcome[message.guild.id] = {
                channel: room,
                onoff: "On",
                by: "On",
                msg: thisMessage
              };
              fs.writeFile("./welcomer.json", JSON.stringify(welcome), err => {
                if (err) console.error(err);
              });
            });
          });
      });
  }
});

//YOUR CODE
client.on("message", async message => {
if(!message.guild) return;
  let prefix = db.get(`prefix_${message.guild.id}`)
  if(prefix === null) prefix = prefix;
  
  if(!message.content.startsWith(prefix)) return;
  
  //YOUR CODE
})

///status
var used1 = false;

var version = "1.0.0";
client.on("ready", () => {
  client.user.setStatus("online").catch(console.error);
  setInterval(() => {
    if (used1) {
      client.user.setActivity(
        `${client.users.size} users | ${client.guilds.size} server`,
        {
          type: "playing"
        }
      );
      used1 = false;
    } else {
      client.user.setActivity(prefix + "help", {
        type: "playing"
      });
      used1 = true;
    }
  }, 5000);
});

///My Prefix

client.on("message", msg => {
  if (msg.isMentioned(client.user))
    var botmention = new Discord.RichEmbed()
      .setColor("#36393e")
      .setDescription(
        ` 
 **Public Prefix  :** ${prefix}`
      )
      .setColor("fff")
      .setThumbnail(
        "https://cdn.discordapp.com/avatars/762289758478925824/b989255bbfee1e45566a22ba0f89f080.png?size=2048"
      )
      .addField(
        "> ** <:22c6e387b7a84ab38f192eb10bccc3aa:759908120495128616> BOT LINK**",
        `**•** [**Link**](https://discordapp.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot)`,
        true
      )
      .addField(
        "> ** <:49c4a1375018439e93dec5a8ac6cdcc7:759908106326507591> SUPPORT**",
        `**•** [**Link**](https://discord.gg/aXtdeaW)`,
        true
      )
      .addField(
        "> ** <:9054ddbc276a4646b5f0be0adb24216a:759916701055057930> WEBSITE**",
        `**•** [**Link**](https://sites.google.com/view/mmbot/home)`,
        true
      )
      .addField(
        "> ** <:9baef73e48de4b6481df7c2b281b19c3:759908135518994462> INSTAGRAM**",
        `**•** [**SOON**](Soon)`,
        true
      )
      .addField(
        "> ** <:34f5b59e589b486382e71234ad2409d4:759924389277597717> EMAIL**",
        `**•** [**SOON**](Soon)`,
        true
      )
      .addField(
        "> ** <:bd42f4534e32485fa0d06a957ba4786f:759908091428601878> VOTE**",
        `**•** [**Link**](https://discordapp.com/channels/748255558624083979/748284703634882590/759925480311750658)`,
        true
      );
  msg.channel.send(botmention);
});

///test sever info
client.on('message', message => {
       if(message.content.split(' ')[0] == prefix + 'server') {
    if(!message.channel.guild) return;
    const millis = new Date().getTime() - message.guild.createdAt.getTime();
    const now = new Date();
    
    const verificationLevels = ['None', 'Low', 'Medium', 'Insane', 'Extreme'];
    const days = millis / 1000 / 60 / 60 / 24;
    let roles = client.guilds.get(message.guild.id).roles.map(r => r.name);
    var embed  = new Discord.RichEmbed()
    .setAuthor(message.guild.name, message.guild.iconURL)
    .addField("**Server ID <:d24595kkddfvf77f5fss58f8fd7r7t4g:760072683689213963>**", "**"+message.guild.id+"**",true)
    .addField("**Server Owner <:a9fcbfc855dc4ffe9c506e73d16b23d9:760074432663781396>**", "**"+message.guild.owner+"**" ,true)
    .addField("**Region <:32466996acdd4f4eab6010d1a1cef8d7:760075396938072084>**" , "**"+message.guild.region+"**",true)
    .addField('**Text Channels <:69228bbf5b734f10933561b85b68f4ea:760076587717623808>**',`**[ ${message.guild.channels.filter(m => m.type === 'text').size} ] Channel **`,true)
    .addField("**Voice Room <:0109198620f64d0db420fb98519b6736:760077298568658984>**", ` ** [ ${message.guild.channels.filter(m => m.type === 'voice').size} ] Channel ** `,true)
    .addField("**Created at <:baa4e7084fc9469298dbce4522be9bb0:760077945082478633>**", ` ** [ ${days.toFixed(0)} ] ** Day ` ,true)
    .addField("**Rank <:685718c3fe084140a7c712426c674df7:760078289716379688>**",`**[${message.guild.roles.size}]** Role `,true)
    .addField("**Verification Level <:3079053bd79a48008b21751af0ee6e52:760078829829619742>**", ` ** [ ${verificationLevels[message.guild.verificationLevel]} ] ** `,true)
    .addField("Members <:10eaf53d6ee44e39bf1d015845585494:760079384735383562>",`
    **${message.guild.memberCount}**`, true)
    .setColor('RANDOM')
    message.channel.sendEmbed(embed)
    
    }
    });



client.on("message", message => {
  //iTzMurtaja
  if (message.content.startsWith(prefix + "e")) {
    //iTzMurtaja
    if (message.author.bot) return; //iTzMurtaja
    var emojiid = message.content
      .split(" ")
      .slice(1)
      .join(" "); //iTzMurtaja
    console.log(emojiid); //iTzMurtaja
    if (emojiid.length < "18" || emojiid.length > "18" || isNaN(emojiid))
      return message.channel.send(`- Usage
${prefix}emoji <EmojiID>`);
    //iTzMurtaja
    //iTzMurtaja
    else
      message.channel.send("This is the emoji that you requested:-", {
        //iTzMurtaja
        files: [`https://cdn.discordapp.com/emojis/${emojiid}.png`]
      }); //iTzMurtaja
  } //iTzMurtaja
});

///games
client.on("message", message => {
  if (!message.content.startsWith(prefix)) return;
  if (!message.channel.guild)
    return message.reply("** This command only for servers **");
  let command = message.content.split(" ")[0];
  command = command.slice(prefix.length);
  if (command === "kill") {
    var sabotage = message.mentions.users.first();
    if (sabotage == message.author)
      return message.reply(`**الانتحار مو زين و الله**`);
    if (sabotage === client.user) return message.reply(`** you want to kill me ? **`);
    if (sabotage < 1) {
      message.delete();
      return message.channel.sendMessage(
      "Metion a person to kill him"
      );
    }
    if (!sabotage)
      return message.channel.send(`Please Mention A Member to Kill :warning:`);
    message.channel.send("▄︻̷̿┻̿═━一 ${sabotage").then(msg => {
      msg.edit(`▄︻̷̿┻̿═━一 ${sabotage} :three:`);
      setTimeout(function() {
        msg.edit(`▄︻̷̿┻̿═━一 ${sabotage} :two:`);
      }, 1000);
      setTimeout(function() {
        msg.edit(`▄︻̷̿┻̿═━一 ${sabotage} :one:`);
      }, 2000);
      setTimeout(function() {
        msg.edit(`▄︻̷̿┻̿═━一 :boom:`);
      }, 3000);
      setTimeout(function() {
        msg.edit(`▄︻̷̿┻̿═━一 :fire:`);
      }, 4000);
      setTimeout(function() {
        msg.edit(`▄︻̷̿┻̿═━一 :skull:`);
      }, 5000);
      msg.delete(6000);
      message.delete();
    });
    message.channel
      .send("**The crime has been successfully hidden🕳 **")
      .then(msg => msg.delete(7000));
  }
});

client.on("message", message => {
  if (message.content.startsWith(prefix + "hack")) {
    if (!message.author.id === "") return;
    if (message.author.bot) return;
    message.delete();
    let args = message.content.split(" ").slice(1);

    let virusname = args.join(" ");
    if (virusname < 1) {
      return message.channel.send("**```metion the person that you want to hack```**");
    }
    message.channel
      .send({
        embed: new Discord.RichEmbed()
          .setTitle("Loading " + virusname + "...")
          .setColor(0xff0000)
      })
      .then(function(m) {
        setTimeout(function() {
          m.edit({
            embed: new Discord.RichEmbed()
              .setTitle("[" + virusname + "]: Loading Discord Virus [▓ ] 1%")
              .setColor(0xff0000)
          });
        }, 1000);
        setTimeout(function() {
          m.edit({
            embed: new Discord.RichEmbed()
              .setTitle("[" + virusname + "]: Loading Discord Virus [▓▓ ] 2%")
              .setColor(0xff0000)
          });
        }, 2000);
        setTimeout(function() {
          m.edit({
            embed: new Discord.RichEmbed()
              .setTitle("[" + virusname + "]: Loading Discord Virus [▓▓▓ ] 3%")
              .setColor(0xff0000)
          });
        }, 3000);
        setTimeout(function() {
          m.edit({
            embed: new Discord.RichEmbed()
              .setTitle("[" + virusname + "]: Loading Discord Virus [▓▓▓▓ ] 4%")
              .setColor(0xff0000)
          });
        }, 4000);
        setTimeout(function() {
          m.edit({
            embed: new Discord.RichEmbed()
              .setTitle(
                "[" + virusname + "]: Loading Discord Virus [▓▓▓▓▓▓▓▓▓▓▓▓ ] 20%"
              )
              .setColor(0xff0000)
          });
        }, 5000);
        setTimeout(function() {
          m.edit({
            embed: new Discord.RichEmbed()
              .setTitle(
                "[" +
                  virusname +
                  "]: Loading Discord Virus [▓▓▓▓▓▓▓▓▓▓▓▓▓ ] 30%"
              )
              .setColor(0xff0000)
          });
        }, 6000);
        setTimeout(function() {
          m.edit({
            embed: new Discord.RichEmbed()
              .setTitle(
                "[" +
                  virusname +
                  "]: Loading Discord Virus [▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ ] 40%"
              )
              .setColor(0xff0000)
          });
        }, 7000);
        setTimeout(function() {
          m.edit({
            embed: new Discord.RichEmbed()
              .setTitle(
                "[" +
                  virusname +
                  "]: Loading Discord Virus [▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ ] 50%"
              )
              .setColor(0xff0000)
          });
        }, 8000);
        setTimeout(function() {
          m.edit({
            embed: new Discord.RichEmbed()
              .setTitle(
                "[" +
                  virusname +
                  "]: Loading Discord Virus [▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ ] 70%"
              )
              .setColor(0xff0000)
          });
        }, 9000);
        setTimeout(function() {
          m.edit({
            embed: new Discord.RichEmbed()
              .setTitle(
                "[" +
                  virusname +
                  "]: Loading Discord Virus [▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ ] 85%"
              )
              .setColor(0xff0000)
          });
        }, 10000);
        setTimeout(function() {
          m.edit({
            embed: new Discord.RichEmbed()
              .setTitle(
                "[" +
                  virusname +
                  "]: Loading Discord Virus [▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ ] 90%"
              )
              .setColor(0xff0000)
          });
        }, 11000);
        setTimeout(function() {
          m.edit({
            embed: new Discord.RichEmbed()
              .setTitle(
                "[" +
                  virusname +
                  "]: Loading Discord Virus [▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ ] 95%"
              )
              .setColor(0xff0000)
          });
        }, 12000);
        setTimeout(function() {
          m.edit({
            embed: new Discord.RichEmbed()
              .setTitle(
                "[" +
                  virusname +
                  "]: Loading Discord Virus [▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ ] 96%"
              )
              .setColor(0xff0000)
          });
        }, 13000);
        setTimeout(function() {
          m.edit({
            embed: new Discord.RichEmbed()
              .setTitle(
                "[" +
                  virusname +
                  "]: Loading Discord Virus [▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ ] 97%"
              )
              .setColor(0xff0000)
          });
        }, 14000);
        setTimeout(function() {
          m.edit({
            embed: new Discord.RichEmbed()
              .setTitle(
                "[" +
                  virusname +
                  "]: Loading Discord Virus [▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓] 98%"
              )
              .setColor(0xff0000)
          });
        }, 15000);
        setTimeout(function() {
          m.edit({
            embed: new Discord.RichEmbed()
              .setTitle(
                "[" +
                  virusname +
                  "]: Loading Discord Virus [▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ ] 99%"
              )
              .setColor(0xff0000)
          });
        }, 16000);
        setTimeout(function() {
          m.edit({
            embed: new Discord.RichEmbed()
              .setTitle(
                "[" +
                  virusname +
                  "]: Loading Discord Virus [▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓] 100%"
              )
              .setColor(0xff0000)
          });
        }, 17000);
        setTimeout(function() {
          m.edit({
            embed: new Discord.RichEmbed()
              .setTitle(
                "[" +
                  virusname +
                  "]:" +
                  virusname +
                  "done it's going good 100.9%"
              )
              .setColor(0xff0000)
          });
        }, 18000);
        setTimeout(function() {
          m.edit({
            embed: new Discord.RichEmbed()
              .setTitle("[" + virusname + "]: Is being hacked ")
              .setColor(0xff0000)
          });
        }, 19000);
        setTimeout(function() {
          m.edit({
            embed: new Discord.RichEmbed()
              .setTitle("[" + virusname + "]: Simple update" + virusname + ".key")
              .setColor(0xff0000)
          });
        }, 22000);
        setTimeout(function() {
          m.edit({
            embed: new Discord.RichEmbed()
              .setTitle("[" + virusname + "]: Please wait seconds 5...")
              .setColor(0xff0000)
          });
        }, 25000);
        setTimeout(function() {
          m.edit({
            embed: new Discord.RichEmbed()
              .setTitle("[" + virusname + "]: Please wait seconds 4...")
              .setColor(0xff0000)
          });
        }, 26000);
        setTimeout(function() {
          m.edit({
            embed: new Discord.RichEmbed()
              .setTitle("[" + virusname + "]: Please wait seconds 3...")
              .setColor(0xff0000)
          });
        }, 27000);
        setTimeout(function() {
          m.edit({
            embed: new Discord.RichEmbed()
              .setTitle("[" + virusname + "]: Please wait seconds 2...")
              .setColor(0xff0000)
          });
        }, 28000);
        setTimeout(function() {
          m.edit({
            embed: new Discord.RichEmbed()
              .setTitle("[" + virusname + "]: Please wait seconds 1...")
              .setColor(0xff0000)
          });
        }, 29000);
        setTimeout(function() {
          m.edit({
            embed: new Discord.RichEmbed()
              .setTitle(
                "[" +
                  virusname +
                  "]: ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓] 99%"
              )
              .setColor(0xff0000)
          });
        }, 30000);
        setTimeout(function() {
          m.edit({
            embed: new Discord.RichEmbed()
              .setTitle(
                "[" +
                  virusname +
                  "]: ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓]100% virus added"
              )
              .setColor(0xff0000)
          });
        }, 31000);
        setTimeout(function() {
          m.delete();
        }, 32000);
        setTimeout(function() {
          message.channel.send("** The hack process was successful !**");
        }, 33000);
      });
  }
});

client.on("message", message => {
  let args = message.content.split(" ");
  let prefix = "-";

  if (args[0] === `-{prefix}avatar`) {
    let mentions = message.mentions.members.first();
    if (!mentions) {
      let sicon = message.author.avatarURL;
      let embed = new Discord.RichEmbed()
        .setImage(message.author.avatarURL)
        .setColor("#f7abab")
        .setDescription(
          `**${message.author.username}#${message.author.discriminator}**'s avatar :`
        );
      message.channel.send({ embed });
    } else {
      let sicon = mentions.user.avatarURL;
      let embed = new Discord.RichEmbed()
        .setColor("#f7abab")
        .setDescription(
          `**${mentions.user.username}#${mentions.user.discriminator}**'s avatar :`
        )
        .setImage(sicon);
      message.channel.send({ embed });
    }
  }
});

client.on("message", message => {
  if (message.content == prefix + "decompose") {
    var x = [
      "member",
      "MMBot",
      "commands",
      "help",
      "MMGold",
      "support",
      "admin",
      "developer",
      "bot",
      "owners",
      "server"
    ];
    var x2 = [
      "m e m b e r",
      "M M B o t",
      "c o m m a n d s",
      "h e l p",
      "M M G o l d",
      "s u p p o r t",
      "a d m i n",
      "d e v e l o p e r",
      "b o t",
      "o w n e r s",
      "s e r v e r"
    ];

    var x3 = Math.floor(Math.random() * x.length);
    message.channel
      .send(
        `  فكك
 :  __**${x[x3]}**__
You have 20 second to decompose.`
      )
      .then(msg1 => {
        var r = message.channel.awaitMessages(msg => msg.content == x2[x3], {
          maxMatches: 1,
          time: 20000,
          errors: ["time"]
        });
        r.catch(() => {
          return message.channel
            .send(`:negative_squared_cross_mark: The Time is finished
            The reponse is __**${x2[x3]}**__`);
        });

        r.then(collected => {
          message.channel.send(
            `${collected.first().author} GG You won <:3079053bd79a48008b21751af0ee6e52:760078829829619742>`
          );
        });
      });
  }
});

//كود تغيير الحالة

client.on("message", message => {
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;

  let command = message.content.split(" ")[0];
  command = command.slice(prefix.length);

  let args = message.content.split(" ").slice(1);

  if (command == "say") {
    if (!message.member.hasPermission("ADMINISTRATOR"))
      return message.channel.send(
        "**You do not have permissions ADMINISTRATOR :rolling_eyes:**"
      );

    message.channel.send("Hi how are you fine ?");
    message.delete();
  }
});

client.on("message", message => {
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;
  if (message.content.startsWith("m!savatar")) {
    let embed = new Discord.RichEmbed()
      .setColor("BLACK")
      .setAuthor(message.guild.name, message.guild.iconURL)
      .setTitle("Avatar Link")
      .setURL(message.guild.iconURL)
      .setImage(message.guild.iconURL)
      .setFooter(
        `Requested By ${message.author.tag}`,
        message.author.avatarURL
      );
    message.channel.send(embed);
  }
});

///TAX

client.on("message", message => {
  var args = message.content.split(" ");
  var command = args[0];
  var num = args[1];
  var tax = 5.2; //غير قيمة الضريبة من هنا
  if (command == prefix + "tax") {
    let nume = new Discord.RichEmbed()
      .setColor("RED")
      .setDescription(command + " <number>");
    if (!num) {
      return message.channel.send(nume);
    }
    var numerr = Math.floor(num);
    if (numerr < 0 || numerr == NaN || !numerr) {
      return message.reply("**The value must be correct.**");
    }
    var taxval = Math.floor(numerr * (tax / 100));
    var amount = Math.floor(numerr - taxval);
    var amountfinal = Math.floor(numerr + taxval);
    let taxemb = new Discord.RichEmbed()
      .setTitle("Tax command <a:vraiii:749056483043311697> :")
      .setColor("RED")
      .setThumbnail(client.user.displayAvatarURL)
      .setDescription(
        `The principal amount : **${numerr}**\n Tax : **${tax}%**\n The tax amount : **${taxval}**\n Amount with tax : **${amount}**\n Amount to be paid  : **${amountfinal}**`
      )
      .setTimestamp()
      .setFooter(`By MMBot Team`);
    message.channel.send(taxemb);
  }
});

///memes

client.on("message", message => {
  var cats = [
    "https://cdn.discordapp.com/attachments/750367890439536760/751111715638345798/IMG-20200902-WA0043.jpg",
    "https://cdn.discordapp.com/attachments/750367890439536760/751111849046573227/IMG-20200902-WA0040.jpg",
    "https://cdn.discordapp.com/attachments/750367890439536760/751111850841604218/IMG-20200902-WA0041.jpg",
    "https://cdn.discordapp.com/attachments/750367890439536760/751111852783566913/IMG-20200902-WA0039.jpg",
    "https://media.discordapp.net/attachments/750367890439536760/751112106836754493/IMG-20200902-WA0035.jpg?width=384&height=560",
    "https://media.discordapp.net/attachments/750367890439536760/751112107101126687/IMG-20200902-WA0032.jpg?width=480&height=560",
    "https://media.discordapp.net/attachments/750367890439536760/751112107101126687/IMG-20200902-WA0032.jpg?width=480&height=560",
    "https://media.discordapp.net/attachments/750367890439536760/751112107965022284/IMG-20200902-WA0028.jpg?width=472&height=560",
    "https://media.discordapp.net/attachments/750367890439536760/751112108787368015/IMG-20200902-WA0030.jpg",
    "https://media.discordapp.net/attachments/750367890439536760/751112672065486918/IMG-20200902-WA0023.jpg?width=517&height=560",
    "https://media.discordapp.net/attachments/750367890439536760/751112672292110427/IMG-20200828-WA0023.jpg?width=514&height=560",
    "https://media.discordapp.net/attachments/750367890439536760/751112672292110427/IMG-20200828-WA0023.jpg?width=514&height=560",
    "https://cdn.discordapp.com/attachments/750367890439536760/751112672765935676/IMG-20200828-WA0022.jpg",
    "https://cdn.discordapp.com/attachments/750367890439536760/751112672950616064/IMG-20200828-WA0024.jpg",
    "https://cdn.discordapp.com/attachments/750367890439536760/751112672950616064/IMG-20200828-WA0024.jpg",
    "https://cdn.discordapp.com/attachments/750367890439536760/751112673239760976/IMG-20200828-WA0020.jpg"
  ];
  var args = message.content.split(" ").slice(1);
  if (message.content.startsWith(prefix + "meme ar")) {
    var cat = new Discord.RichEmbed().setImage(
      cats[Math.floor(Math.random() * cats.length)]
    );
    message.channel.sendEmbed(cat);
  }
});

client.on("message", message => {
  var cats = [
    "https://i.chzbgr.com/full/8976892160/h19015E63/grrrrrr",
    "https://www.rd.com/wp-content/uploads/2020/07/00_OPENER-Final.jpg",
    "https://starecat.com/content/wp-content/uploads/cat-when-your-english-teacher-explains-how-to-pronounce-th-weird-face.jpg",
    "https://i.pinimg.com/originals/e0/21/28/e02128175ee90c9ce7a3e01aeecaed66.jpg",
    "https://www.englishwithnick.de/wp-content/uploads/2015/03/CarryingShirt.jpg",
    "data:image/jpeg;base64,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",
    "https://www.getcleartouch.com/wp-content/uploads/meme-to-go-back-to-school.jpg",
    "https://mycalcas.com/wp-content/uploads/2020/07/Copy-of-Untitled-2020-07-08T105340.290-1080x630.png",
    "https://images.theconversation.com/files/177834/original/file-20170712-14488-19lw3sc.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=1200.0&fit=crop"
  ];
  if (message.content.startsWith(prefix + "meme en")) {
    var cat = new Discord.RichEmbed().setImage(
      cats[Math.floor(Math.random() * cats.length)]
    );
    message.channel.sendEmbed(cat);
  }
});
///credits cod

const credits = JSON.parse(fs.readFileSync("./credits.json"));
var time = require("./time.json");
client.on("message", async message => {
  if (message.author.bot || message.channel.type === "dm") return;
  let args = message.content.split(" ");
  let author = message.author.id;
  if (!credits[author])
    credits[author] = {
      credits: 0
    };
  fs.writeFileSync("./credits.json", JSON.stringify(credits, null, 4));
  if (args[0].toLowerCase() == `${prefix}credits`) {
    const mention = message.mentions.users.first() || message.author;
    const mentionn = message.mentions.users.first();
    if (!args[2]) {
      message.channel.send(
        `**${mention.username}, your :credit_card: balance is \`$${credits[mention.id].credits}\`**`
      );
    } else if (mentionn && args[2]) {
      if (isNaN(args[2]) || [",", "."].includes(args[2]))
        return message.channel.send(`**:x: | Error**`);

      if (args[2] < 1) return message.channel.send(`**:x: | Error**`);
      if (mention.bot) return message.channel.send(`**:x: | Error**`);
      if (mentionn.id === message.author.id)
        return message.channel.send(`**:x: | Error**`);
      if (args[2] > credits[author].credits)
        return message.channel.send(
          `**:x: | Error , You Don't Have Enough Credit**`
        );
      if (args[2].includes("-")) return message.channel.send(`**:x: | Error**`);
      let resulting =
        parseInt(args[2]) == 1
          ? parseInt(args[2])
          : Math.floor(args[2] - args[2] * (5 / 100));
      let tax =
        parseInt(args[2]) == 1
          ? parseInt(args[2])
          : Math.floor(args[2] * (5 / 100));
      let first = Math.floor(Math.random() * 9);
      let second = Math.floor(Math.random() * 9);
      let third = Math.floor(Math.random() * 9);
      let fourth = Math.floor(Math.random() * 9);
      let num = `${first}${second}${third}${fourth}`;
      let Canvas = require("canvas");
      let canvas = Canvas.createCanvas(108, 40);
      let ctx = canvas.getContext("2d");
      const background = await Canvas.loadImage(
        "https://cdn.discordapp.com/attachments/608278049091223552/617791172810899456/hmmm.png"
      );
      ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
      ctx.font = "20px Arial Bold";
      ctx.fontSize = "20px";
      ctx.fillStyle = "#ffffff";
      message.channel
        .send(
          `**${
            message.author.username
          }, Transfer Fees: \`${tax}\`, Amount: \`$${resulting.toLocaleString()}\`**
type these numbers to confirm: `
        )
        .then(async essss => {
          message.channel.send(`\`${num}\``).then(m => {
            message.channel
              .awaitMessages(r => r.author.id === message.author.id, {
                max: 1,
                time: 20000,
                errors: ["time"]
              })
              .then(collected => {
                if (collected.first().content === num) {
                  essss.delete();
                  message.channel.send(
                    `**:moneybag: | ${
                      message.author.username
                    }, Done Trans \`$${resulting.toLocaleString()}\` To ${mentionn}**`
                  );
                  mention.send(
                    `**:money_with_wings: | Transfer Receipt **\`\`\`You Have Received \`$${resulting.toLocaleString()}\` From User ${
                      message.author.username
                    }; (ID (${message.author.id})\`\`\``
                  );
                  m.delete();
                  credits[author].credits += Math.floor(
                    -resulting.toLocaleString()
                  );
                  credits[mentionn.id].credits += Math.floor(
                    +resulting.toLocaleString()
                  );
                  fs.writeFileSync(
                    "./credits.json",
                    JSON.stringify(credits, null, 4)
                  );
                } else {
                  m.delete();
                  essss.delete();
                }
              });
          });
        });
    } else {
      message.channel.send(
        `**:x: | Error , Please Command True Ex: \`${prefix}credits [MentionUser] [Balance]\`**`
      );
    }
  }
  if (args[0].toLowerCase() === `${prefix}daily`) {
    let cooldown = 8.64e7;
    let Daily = time[message.author.id];
    if (Daily !== null && cooldown - (Date.now() - Daily) > 0) {
      let times = cooldown - (Date.now() - Daily);
      message.channel.send(
        `**:stopwatch: |  ${
          message.author.username
        }, your daily :dollar: credits refreshes in ${pretty(times, {
          verbose: true
        })}.**`
      );
      fs.writeFile("./time.json", JSON.stringify(time), function(e) {
        if (e) throw e;
      });
    } else {
      var ammount =
        (780, 670, 590, 430, 300, 500, 100, 200, 120, 150, 350, 320, 220, 250);
      ammount[Math.floor(Math.random(1) * ammount.length)];
      credits[author].credits += ammount;
      time[message.author.id] = Date.now();
      message.channel.send(
        `**:atm:  | ${message.author.username}, you received your :dollar: ${ammount} daily credits!**`
      );
      fs.writeFile("./credits.json", JSON.stringify(credits), function(e) {
        if (e) throw e;
      });
    }
  }
}); //

client.on("message", async message => {
  let Fire = message.content.split(" ")[0].substring(prefix.length);
  let mention = message.mentions.users.first() || message.author;
  if (Fire === "addcredits") {
    let args = message.content.split(" ");
    if (!devs.includes(message.author.id)) return;
    if (!args[1] || isNaN(args[1])) return message.reply("**Type Credit**");
    if (!credits[mention.id]) return;
    credits[mention.id].credits += +args[1];
    fs.writeFileSync("./credits.json", JSON.stringify(credits));
    console.log(credits[mention.id]);
    message.reply(`** Adedd Money For : \`${args[1]}\` Done **`);
  } else if (Fire === "removecredits") {
    let args = message.content.split(" ");
    if (!devs.includes(message.author.id)) return;
    if (!args[1] || isNaN(args[1])) return message.reply("**Type Credit**");
    if (!credits[mention.id]) return;
    credits[mention.id].credits += -args[1];
    fs.writeFileSync("./credits.json", JSON.stringify(credits));
    console.log(credits[mention.id]);
    message.reply(`**, Remove Money For : \`${args[1]}\`**`);
  }
});

var time = require("./time.json");


////ticket cod
client.on("message", message => {
  if (message.content.startsWith(prefix + "new")) {
    const reason = message.content
      .split(" ")
      .slice(1)
      .join(" ");
    if (!message.guild.roles.exists(gg => gg.name === "Ticket Manager"))
      return message.channel.send(`لازم تسوي رتبة اسمها \`Ticket Manager\`.`);
    if (
      message.guild.channels.filter(
        Channel =>
          Channel.name == `ticket-${message.author.id}` &&
          Channel.type == "text"
      ).size > 0
    )
      return message.channel.send(`You already have a ticket open.`);
    message.guild
      .createChannel(`ticket-${message.author.id}`, "text")
      .then(c => {
        let role = message.guild.roles.find(gg => gg.name === "Ticket Manager");
        let role2 = message.guild.roles.find(gg => gg.name === "@everyone");
        c.overwritePermissions(role, {
          SEND_MESSAGES: true,
          READ_MESSAGES: true
        });
        c.overwritePermissions(message.author, {
          SEND_MESSAGES: true,
          READ_MESSAGES: true
        });
        c.overwritePermissions(message.guild.id, {
          READ_MESSAGES: false
        });
        message.channel.send(
          `:white_check_mark: Your ticket has been created, ${c}.`
        );
        const embed = new Discord.RichEmbed()
          .setColor(0xcf40fa)
          .addField(
            `Hey ${message.author.username}!`,
            `Please wait for the ticket manager help you and answer you and thank you.`
          )
          .setTimestamp();
        c.send({
          embed: embed
        });
      })
      .catch(console.error);
  } else if (message.content.startsWith(prefix + "delete")) {
    if (!message.guild.roles.exists(gg => gg.name === "Ticket Manager"))
      return message.channel.send(` لازم تسوي رتبة اسمها \`Ticket Manager\`.`);
    if (!message.channel.name.startsWith("ticket-"))
      return message.channel.send("This isn't a ticket channel!");
    if (
      !message.member.roles.has(
        message.guild.roles.filter(r => r.name === "Ticket Manager").first().id
      )
    )
      return message.channel.send("You don't have the `Ticket Manager` role!");
    message.channel
      .delete()
      .catch(e => message.channel.send("Check my permissions!"));
  }
});

client.on("message", async message => {
  if (!message.guild || message.author.bot) return;
  let args = message.content.split(" ");
  if (args[0] == `${prefix}cr`) {
    if (
      !message.guild.me.hasPermission("MANAGE_ROLES") ||
      !message.member.hasPermission("MANAGE_ROLES")
    )
      return;
    if (!args[1] || !args[2])
      return message.reply(
        `Usage: ${args[0]} [role color] [role name]\nExample: ${
          args[0]
        } blue Admin`
      );
    try {
      let role = await message.guild.createRole({
        name: args.slice(2).join(" ") || "new role",
        color: args[1].toUpperCase() || null
      });
      await message.reply(`Done, Created **${role.name}** role!`);
    } catch (e) {
      message.reply(`Error! ${e.message || e}`);
    }
  }
});

//new help
client.on("message", message => {
  if (message.content === prefix + "help") {
    const help = new Discord.RichEmbed()
      .setAuthor(client.user.username, client.user.avatarURL)
      .setColor("#4b00ca")
      .setDescription(
        "<:4f93fe3c84fc47bc816d32d146e4f30a:759913025011449886>** | help**\n\n<:d14f7448c2764488889d4185db25b2a8:759902685653893180>__**▸Modération Commands**__\n`kick` `-` `ban` `-` `mute` `-` `unmute` `-` `lock` `-` `unlock` `-` `move`\n`clear` `-` `ls` `-` `setmember`\n◦ ▬▬▬▬▬▬▬▬▬▬▬▬ •\n<:f4e5d4341f814e1699512c154cbe5170:759900983009607693>__**▸Economy Commands**__\n`credits` `-` `daily` `-` `tax`\n◦ ▬▬▬▬▬▬▬▬▬▬▬▬ •\n<:03bbd47b8ca7462eb620e27e8359554a:759900305738956911>__**▸Fun Commands**__\n`Meme ar` `-` `Meme en` `-` `Marry` `-` `Slap` `-` `Hug` `-` `Kiss`\n◦ ▬▬▬▬▬▬▬▬▬▬▬▬ •\n<:fb0b0fb482924405bc5fb8a17a24304c:759892104058110012>__**▸Games Commands**__\n`Decompose` `xo` `hack` `kill`\n◦ ▬▬▬▬▬▬▬▬▬▬▬▬ •\n<:2bd1d923275e44429dd19e592e954061:759885655597121596>__**▸Ticket Commands**__\n`Ticket` `New` `Delete`\n◦ ▬▬▬▬▬▬▬▬▬▬▬▬ •\n__**<:aed721e4091b4a7ea95a16c4064f5184:759883201782349865>▸Public Commands**__\n`Bot` `-` `User` `-` `Avt + id` `-` `Avatar`\n`Server Avatar` `-` `color` `-` `colors` `-` `sinf` `-` `Ping`\n◦ ▬▬▬▬▬▬▬▬▬▬▬▬ •\n<:09c0b6bc74cd4eab84bfdd5390f89594:759887439157788672>__**▸Music Commands**__\n`Play` `Pause` `Resume` `Stop` `Forceskip` `Queue` `Skipto`\n`Skip` `Volume` `Nowplaying` `Repeat` `Leave`\n◦ ▬▬▬▬▬▬▬▬▬▬▬▬ •\n<:2381a03a3b624a9eb4bd7b726c88093e:759886228093927464>__**▸Giveaway Commands**__\n`Create`\n◦ ▬▬▬▬▬▬▬▬▬▬▬▬ •\n<:22320350f44c4eeb99a8fdc01f6bbf15:759888076184223785>__**▸Staff Application**__\n`staff submit`"
      );
    message.channel.send(help);
  }
});

////كود معلومات البوت
client.on("message", message => {
  if (message.content === prefix + "bot") {
    const bot = new Discord.RichEmbed()
      .setAuthor(client.user.username, client.user.avatarURL)
      .setColor("#00000")
      .addField("**Servers <:32466996acdd4f4eab6010d1a1cef8d7:760075396938072084>** :  ", `» ${client.guilds.size}`, true)
      .addField("**Prefix ** :  ", `» ${prefix}`, true)
      .addField("**Channels** : ", `» ${client.channels.size} `, true)
      .addField("**Users** : ", `» ${client.users.size} `, true)
      .addField("**Bot Name** :  ", `» <@748254787145039872> `, true)
      .addField(
        "**Bot Devs** :  ",
        `» <@487655712302825505> <@533615354459586560> <@740599112835268608> 
<@730092371206996079> <@728880588114624572> `,
        true
      ) // تعديل اساسي غير الايدي لايدي حسابك
      .setImage("")
      .setFooter(message.author.username, message.client.avatarURL);
    message.channel.send(bot);
  }
});

client.on("message", message => {
  if (message.author.codes) return;
  if (!message.content.startsWith(prefix)) return;

  let command = message.content.split(" ")[0];
  command = command.slice(prefix.length);

  let args = message.content.split(" ").slice(1);

  if (command == "ban") {
    if (message.author.bot) return;
    if (!message.channel.guild)
      return message.reply("** This command only for servers**");

    if (!message.guild.member(message.author).hasPermission("BAN_MEMBERS"))
      return message.reply("**You do not have the required powers**");
    if (!message.guild.member(client.user).hasPermission("BAN_MEMBERS"))
      return message.reply("**I Don't Have ` BAN_MEMBERS ` Permission**");
    let user = message.mentions.users.first();

    if (message.mentions.users.size < 1)
      return message.reply("**Munch person**");
    if (
      message.mentions.members.first().highestRole.position >=
      message.member.highestRole.position
    )
      return message.channel.send(
        "You cannot refer to someone whose rank is higher than you !"
      );
    if (!message.guild.member(user).bannable)
      return message.reply(
        "**The rank of the bot must be higher than the rank of the person to be adopted**"
      );

    message.guild.member(user).ban(7, user);

    message.channel.send(
      `**:white_check_mark: ${user.tag} banned from the server ! :airplane: **  `
    );
  }
});

client.on("message", async message => {
  if (message.content.startsWith(prefix + "invites")) {
    //// وهون الامر طبعا
    let oi = message.mentions.users.first()
      ? message.mentions.users.first().id
      : message.author.id;
    let Tag = message.mentions.users.first()
      ? message.mentions.users.first().tag
      : message.author.tag;
    let Username = message.mentions.users.first()
      ? message.mentions.users.first().username
      : message.author.username;
    let Avatar = message.mentions.users.first()
      ? message.mentions.users.first().avatarURL
      : message.author.avatarURL;

    message.guild.fetchInvites().then(invs => {
      let member = client.guilds.get(message.guild.id).members.get(oi);
      let personalInvites = invs.filter(i => i.inviter.id === oi);
      let urll = invs.filter(i => i.inviter.id === oi);
      let link = urll.reduce(
        (p, v) =>
          v.url + ` , Total de membros recrutados no convite: ${v.uses}.\n` + p,
        `\nServidor: ${message.guild.name} \n `
      );
      let inviteCount = personalInvites.reduce((p, v) => v.uses + p, 0);
      let inviteCode = personalInvites.reduce((p, v) => v.code);
      let possibleInvites = [["Total de membros recrutados:"]];
      possibleInvites.push([inviteCount, inviteCode]);
      let user = message.mentions.users.first() || message.author;
      let mem = message.guild.member(user);
      let millisJoined = new Date().getTime() - mem.joinedAt.getTime();
      let daysJoined = millisJoined / 1000 / 60 / 60 / 24;
      console.log(inviteCode);
      var inviteInfo = new Discord.RichEmbed()
        .setTitle(`:incoming_envelope: **[INVITE INFO]** ${Username}`)
        .addField(
          "**Number of invite in server**",
          `[ Person **${Number(inviteCount)}** ]   `
        )
        .addField(
          "**The date you joined our server**",
          ` [ **${daysJoined.toFixed(0)}**  days ago]   `
        )
        .addField(
          "**Link server**  ",
          `[ **${
            inviteCode &&
            inviteCode.code &&
            inviteCode.code.includes("discord.gg")
              ? inviteCode.code
              : `https://discord.gg/${inviteCode.code || "kSXJr6f"}`
          }** ]   `
        )
        .setImage("")
        .setColor("RANDOM")
        .setTimestamp()
        .setFooter(Tag, Avatar);

      message.channel.send(inviteInfo);
    });
  }
});
//welcome

//welcome private
client.on("guildMemberAdd", member => {
  let memberavatar = member.user.avatarURL;
  let embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setThumbnail(memberavatar)
    .addField(":bust_in_silhouette: | name : ", `${member}`)
    .addField(":microphone2: | Welcome!", `Welcome to the server, ${member}`)
    .addField(":id: | User :", "**[" + `${member.id}` + "]**")
    .addField(
      ":family_mwgb: | Your are the member",
      `${member.guild.memberCount}`
    )
    .addField("Name", `<@` + `${member.id}` + `>`, true)
    .addField("Server", `${member.guild.name}`, true)
    .setFooter(`**${member.guild.name}**`)
    .setTimestamp();

  member.send(embed);
});

client.on("message", message => {
  if (message.author.x5bz) return;
  if (!message.content.startsWith(prefix)) return;

  let command = message.content.split(" ")[0];
  command = command.slice(prefix.length);

  let args = message.content.split(" ").slice(1);

  if (command == "kick") {
    if (message.author.bot) return;
    if (!message.channel.guild)
      return message.reply("** This command only for servers**");

    if (!message.guild.member(message.author).hasPermission("KICK_MEMBERS"))
      return message.reply("**You Don't Have ` KICK_MEMBERS ` Permission**");
    if (!message.guild.member(client.user).hasPermission("KICK_MEMBERS"))
      return message.reply("**I Don't Have ` KICK_MEMBERS ` Permission**");
    let user = message.mentions.users.first();
    let reason = message.content
      .split(" ")
      .slice(2)
      .join(" ");
    if (message.mentions.users.size < 1)
      return message.reply("**Mention the person**");
    if (!reason)
      return message.reply("**Write down the reason for the expulsion**");
    if (!message.guild.member(user).kickable)
      return message.reply(
        "**I can't kick someone higher than my rank, hoping to give the bot a high rank**"
      );
    if (
      message.mentions.members.first().highestRole.position >=
      message.member.highestRole.position
    )
      return message.channel.send(
        "You cannot expluse a person of higher rank than you!"
      );

    message.guild.member(user).kick();

    const kickembed = new Discord.RichEmbed()
      .setAuthor(`KICKED!`, user.displayAvatarURL)
      .setColor("RANDOM")
      .setTimestamp()
      .addField("**User:**", "**[ " + `${user.tag}` + " ]**")
      .addField("**By:**", "**[ " + `${message.author.tag}` + " ]**")
      .addField("**Reason:**", "**[ " + `${reason}` + " ]**");
    message.channel.send({
      embed: kickembed
    });
  }
});
client.on("message", message => {
  if (message.content.split(" ")[0] === prefix + "avt") {
    if (message.author.bot || message.channel.type == "dm") return;
    var args = message.content.split(" ")[1];
    var avt = args || message.author.id;
    client
      .fetchUser(avt)
      .then(user => {
        avt = user;
        let avtEmbed = new Discord.RichEmbed()
          .setColor("#36393e")
          .setAuthor(`${avt.username}'s Avatar`, message.author.avatarURL)
          .setImage(avt.avatarURL)
          .setFooter(`Avatar`, message.client.user.avatarURL);
        message.channel.send(avtEmbed);
      })
      .catch(() => message.channel.send(`You have to put the ID of person`));
  } // Julian
}); // Codes - Toxic Codes

const invites = {}; // Codes

client.on("message", message => {
  if (message.author.bot) return;

  let command = message.content.split(" ")[0];

  if (command === prefix + "unmute") {
    if (message.author.bot) return;
    if (!message.member.hasPermission("MANAGE_ROLES"))
      return message
        .reply("** You have no permition 'Manage Roles' **")
        .catch(console.error);
    let user = message.mentions.users.first();
    let modlog = client.channels.find(gg => gg.name === "log");
    let muteRole = client.guilds
      .get(message.guild.id)
      .roles.find(gg => gg.name === "Muted");
    if (!muteRole)
      return message
        .reply("** You have no death rank 'Muted' **")
        .catch(console.error);
    if (message.mentions.users.size < 1)
      return message
        .reply("** You have to build someone first**")
        .catch(console.error);
    const embed = new Discord.RichEmbed()
      .setColor(0x00ae86)
      .setTimestamp()
      .addField("Usage:", "Shut up/Tell")
      .addField(
        "the person is now unmute:",
        `${user.username}#${user.discriminator} (${user.id})`
      )
      .addField(
        "by :",
        `${message.author.username}#${message.author.discriminator}`
      );

    if (
      !message.guild
        .member(client.user)
        .hasPermission("MANAGE_ROLES_OR_PERMISSIONS")
    )
      return message
        .reply("** I d'ont have permission Manage Roles **")
        .catch(console.error);

    if (message.guild.member(user).removeRole(muteRole.id)) {
      return message
        .reply(
          "**:white_check_mark: .. The mute was removed from the person **"
        )
        .catch(console.error);
    } else {
      message.guild
        .member(user)
        .removeRole(muteRole)
        .then(() => {
          return message
            .reply(
              "**:white_check_mark: .. The mute was removed from the person **"
            )
            .catch(console.error);
        });
    }
  }
});

////كود ميوت او اسكات
client.on("message", message => {
  if (message.author.bot) return;

  let command = message.content.split(" ")[0];

  if (command === prefix + "mute") {
    if (message.author.bot) return;
    if (!message.member.hasPermission("MANAGE_ROLES"))
      return message
        .reply("** You have no permition 'Manage Roles' **")
        .catch(console.error);
    let user = message.mentions.users.first();
    let modlog = client.channels.find(gg => gg.name === "log");
    let muteRole = client.guilds
      .get(message.guild.id)
      .roles.find(gg => gg.name === "Muted");
    if (!muteRole)
      return message
        .reply("** There is no rank 'Muted' **")
        .catch(console.error);
    if (message.mentions.users.size < 1)
      return message
        .reply("** You have to metion someone first**")
        .catch(console.error);

    const embed = new Discord.RichEmbed()
      .setColor(0x00ae86)
      .setTimestamp()
      .addField("Usage:", "Shut up/Tell")
      .addField(
        "You will be muted:",
        `${user.username}#${user.discriminator} (${user.id})`
      )
      .addField(
        "by :",
        `${message.author.username}#${message.author.discriminator}`
      );

    if (
      !message.guild
        .member(client.user)
        .hasPermission("MANAGE_ROLES_OR_PERMISSIONS")
    )
      return message
        .reply("** i d'ont have permission Manage Roles **")
        .catch(console.error);

    if (message.guild.member(user).roles.has(muteRole.id)) {
      return message
        .reply("**:white_check_mark: .. The member was given mute**")
        .catch(console.error);
    } else {
      message.guild
        .member(user)
        .addRole(muteRole)
        .then(() => {
          return message
            .reply("**:white_check_mark: .. The member was given mute**")
            .catch(console.error);
        });
    }
  }
});

//// كود فتح واغلاق الروم
client.on("message", message => {
  if (message.content === prefix + "lock") {
    if (!message.channel.guild)
      return message.reply(" This matter is only for servers !!");

    if (!message.member.hasPermission("MANAGE_MESSAGES"))
      return message.reply(" You do not have permissions");
    message.channel
      .overwritePermissions(message.guild.id, {
        SEND_MESSAGES: false
      })
      .then(() => {
        message.reply("**The chat has been locked :no_entry: **");
      });
  }
  if (message.content === prefix + "unlock") {
    if (!message.channel.guild)
      return message.reply(" This matter is only for servers !!");

    if (!message.member.hasPermission("MANAGE_MESSAGES"))
      return message.reply("You do not have permissions");
    message.channel
      .overwritePermissions(message.guild.id, {
        SEND_MESSAGES: true
      })
      .then(() => {
        message.reply("**The chat has been opened:white_check_mark:**");
      });
  }
});

client.on("error", err => {
  console.log(err);
});

client.on("messageCreate", async message => {
  let args = message.cleanContent.split(" ");
  if (args[0] == `${prefix}roles`) {
    let space = "                         ";
    let roles = message.guild.roles
      .map(r => r)
      .sort((a, b) => b.position - a.position);
    let rr = roles
      .map(
        r =>
          `${r.name +
            space.substring(r.name.length) +
            message.guild.members.filter(m => m.roles.includes(r.id))
              .length} members`
      )
      .join("\n");
    await message.channel.sebd(`\`\`\`${rr}\`\`\``);
  }
});

//// كود سحب شخص
client.on("message", message => {
  if (!message.channel.guild) return;
  if (message.content.startsWith(prefix + "move")) {
    if (message.member.hasPermission("MOVE_MEMBERS")) {
      if (message.mentions.users.size === 0) {
        return message.channel.send("``Use : " + prefix + "move @User``");
      }
      if (message.member.voiceChannel != null) {
        if (message.mentions.members.first().voiceChannel != null) {
          var authorchannel = message.member.voiceChannelID;
          var usermentioned = message.mentions.members.first().id;
          var embed = new Discord.RichEmbed()
            .setTitle("Succes!")
            .setColor("#000000")
            .setDescription(
              `✅ You Have Moved <@${usermentioned}> To Your Channel `
            );
          var embed = new Discord.RichEmbed()
            .setTitle(`You are Moved in ${message.guild.name} `)
            .setColor("RANDOM")
            .setTitle(`✽ 🔰🔰🔰`)

            .setDescription(
              `**<@${message.author.id}> Moved You To His Channel!\nServer --> ${message.guild.name}**`
            );
          message.guild.members
            .get(usermentioned)
            .setVoiceChannel(authorchannel)
            .then(m => message.channel.send(embed));
          message.guild.members.get(usermentioned).send(embed);
        } else {
          message.channel.send(
            "`You Cant Move" +
              message.mentions.members.first() +
              " `The User Should Be In channel To Move It`"
          );
        }
      } else {
        message.channel.send(
          "**``You Should Be In Room Voice To Move SomeOne``**"
        );
      }
    } else {
      message.react("❌");
    }
  }
});

client.on("message", function(message) {
  if (!message.channel.guild) return;
  if (message.author.bot) return;
  if (message.author.id === client.user.id) return;
  if (message.author.equals(client.user)) return;
  if (!message.content.startsWith(prefix)) return;

  var args = message.content.substring(prefix.length).split(" ");
  switch (args[0].toLocaleLowerCase()) {
    case "clear":
      message.delete();
      if (!message.channel.guild) return;
      if (message.member.hasPermission(0x2000)) {
        if (!args[1]) {
          message.channel.fetchMessages().then(messages => {
            message.channel.bulkDelete(messages);
            var messagesDeleted = messages.array().length;
            message.channel
              .send(
                " " +
                  "**```fix\n" +
                  messagesDeleted +
                  "" +
                  ": The number of messages deleted" +
                  "```**"
              )
              .then(m => m.delete(5000));
          });
        } else {
          let messagecount = parseInt(args[1]);
          message.channel
            .fetchMessages({ limit: messagecount })
            .then(messages => message.channel.bulkDelete(messages));
          message.channel
            .send(
              " " +
                "**```fix\n" +
                args[1] +
                " " +
                ": The number of messages deleted" +
                "```**"
            )
            .then(m => m.delete(5000));
          message.delete(60000);
        }
      } else {
        var manage = new Discord.RichEmbed()
          .setDescription("You Do Not Have Permission MANAGE_MESSAGES :(")
          .setColor("RANDOM");
        message.channel.sendEmbed(manage);
        return;
      }
  }
});

//all copyrighit for revenge https://github.com/Bowlingtoolkit

///تعديل غير اساسي
///تقدر الصورة الخلفية ، شوف الشرح الرابط فوق اول الكود
/// كود الوان
client.on("message", message => {
  if (!message.guild || message.author.bot) return;
  if (message.content == prefix + "colors") {
    var fsn = require("fs-nextra");
    fs.readdir("./colors", async (err, files) => {
      var f = files[Math.floor(Math.random() * files.length)];
      var { Canvas } = require("canvas-constructor");
      var x = 0;
      var y = 0;
      if (message.guild.roles.filter(role => !isNaN(role.name)).size <= 0)
        return;
      message.guild.roles
        .filter(role => !isNaN(role.name))
        .sort((b1, b2) => b1.name - b2.name)
        .forEach(() => {
          x += 100;
          if (x > 100 * 12) {
            x = 100;
            y += 80;
          }
        });
      var image = await fsn.readFile(`./colors/${f}`);
      var xd = new Canvas(100 * 11, y + 350)
        .addBeveledImage(image, 0, 0, 100 * 11, y + 350, 100)
        .setTextBaseline("middle")
        .setColor("white")
        .setTextSize(60)
        .addText(`colors list`, 375, 40);
      x = 0;
      y = 150;
      message.guild.roles
        .filter(role => !isNaN(role.name))
        .sort((b1, b2) => b1.name - b2.name)
        .forEach(role => {
          x += 75;
          if (x > 100 * 10) {
            x = 75;
            y += 80;
          }
          xd.setTextBaseline("middle")
            .setTextAlign("center")
            .setColor(role.hexColor)
            .addBeveledRect(x, y, 60, 60, 15)
            .setColor("white");
          if (`${role.name}`.length > 2) {
            xd.setTextSize(30);
          } else if (`${role.name}`.length > 1) {
            xd.setTextSize(40);
          } else {
            xd.setTextSize(50);
          }
          xd.addText(role.name, x + 30, y + 30);
        });
      message.channel.sendFile(xd.toBuffer());
    });
  }
});

///////////////////

///تعديل اساسي
/// كود الرد التلقائي
client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});
client.on("message", message => {
  if (message.content === "السلام عليكم") {
    message.channel.send("**:heart:وعليكم السلام ورحمة الله وبركاته:heart:**");
    message.channel.sendFile("");
  }
});

////تعديل غير اساسي
/// كود اختيار لون

client.on("message", message => {
  let args = message.content.split(" ").slice(1);
  if (message.content.split(" ")[0] == prefix + "color") {
    const embedd = new Discord.RichEmbed()
      .setFooter(
        "Requested by " + message.author.username,
        message.author.avatarURL
      )
      .setDescription(`**There's No Color With This Number ** :x: `)
      .setColor(`ff0000`);
    if (!args[0]) return message.channel.sendEmbed(embedd);
    if (isNaN(args[0]))
      return message.channel.sendEmbed(
        embedd.setDescription("Please select a number :x:")
      );
    if (!message.guild.roles.find("name", `${args[0]}`))
      return message.channel.sendEmbed(embedd);

    var a = message.guild.roles.find("name", `${args[0]}`);
    if (!a) return;
    if (a.hasPermission(8))
      return message.channel.send(
        embedd.setDescription("This color has administrator!")
      );
    const embed = new Discord.RichEmbed()

      .setFooter(
        "Requested by " + message.author.username,
        message.author.avatarURL
      )
      .setDescription(`**Color Changed To Successfully** :white_check_mark: `)

      .setColor(`${a.hexColor}`);
    message.channel.sendEmbed(embed);
    if (!args[0]) return;
    setInterval(function() {});
    let count = 0;
    let ecount = 0;
    for (let x = 1; x < 201; x++) {
      message.member.removeRole(message.guild.roles.find("name", `${x}`));
    }
    message.member.addRole(message.guild.roles.find("name", `${args[0]}`));
  }
});

///تعديل اساسي
///لو تبي تعطل كود بدون حذفه حط هذي الرموز

/*
///test
*/

///// كود خروج الاعضاء

client.on("message", message => {
  if (message.content.startsWith(prefix + "setby")) {
    let args = message.mentions.channels.first();
    if (!args)
      message.channel.send("**❌ .Mention room**").then(m => {
        m.delete(1500);
      });
    if (
      !message.guild.member(message.author.id).hasPermission("MANAGE_CHANNELS")
    )
      return message.channel.send("**❌ .You do not have permissions.**");
    message.channel.send(
      `**${args}.  | :ballot_box_with_check:  goodbye is activatedا**`
    );
    client.on("guildMemberAdd", member => {
      if (member.user.bot) return;
      var embed = new Discord.RichEmbed()
        .setAuthor(member.user.username, member.user.avatarURL)
        .setThumbnail(member.user.avatarURL)
        .setTitle(`**الله معاك ✋ **`)
        .addField("**__شكرا لوقتك__**  ", `${member}`)
        .setDescription(`**مع السلامه تشرفنا بك ✋** `)
        .addField("👤   تبقي", `**[ ${member.guild.memberCount} ]**`, true)
        .setColor("RANDOM")
        .setFooter(`نتمنى لكم الاستمتاع`);

      var channel = member.guild.channels.find(gg => gg.name === "log"); //// تعديل اساسي
      if (!channel) return;
      channel.send({ embed: embed });
    });
  }
});

/////كود سرعة البوت او البينق
client.on("message", message => {
  if (!message.channel.guild) return;
  if (message.content.startsWith(prefix + "ping")) {
    if (message.author.bot) return;
    if (!message.channel.guild) return;
    var Bping = `${Math.round(client.ping)}`;

    const E1ping = new Discord.RichEmbed()
      .setTitle("ــــــــــــــــــــــــــــــ")
      .addField(
        `**BOT Ping Is** :__${Bping}📶__`,
        "ــــــــــــــــــــــــــــــ"
      )
      .setFooter(`Requested by | ${message.author.tag}`)
      .setColor("RANDOM");
    message.channel.send(E1ping);
  }
});

client.on("message", async message => {
  const moment = require("moment"); //npm i moment
  const ms = require("ms"); //npm i ms
  // var prefix = '' //Bot Prefix !
  var time = moment().format("Do MMMM YYYY , hh:mm");
  var room;
  var title;
  var duration;
  var currentTime = new Date(),
    hours = currentTime.getHours() + 3,
    minutes = currentTime.getMinutes(),
    done = currentTime.getMinutes() + duration,
    seconds = currentTime.getSeconds();
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  var suffix = "AM";
  if (hours >= 12) {
    suffix = "PM";
    hours = hours - 12;
  }
  if (hours == 0) {
    hours = 12;
  }

  var filter = m => m.author.id === message.author.id;
  if (message.content.startsWith(prefix + "create")) {
    let embed1 = new Discord.RichEmbed()
      .setColor()
      .setDescription("Missing the following permission `MANAGE_GUILD`");

    let embed2 = new Discord.RichEmbed()
      .setColor()
      .setDescription("Please send the `room` name without mentioning it");

    let embed3 = new Discord.RichEmbed()
      .setColor()
      .setDescription("Wrong room name");

    let embed4 = new Discord.RichEmbed()
      .setColor()
      .setDescription("Please send the `time`");

    let embed5 = new Discord.RichEmbed()
      .setColor()
      .setDescription(
        "Wrong time format\nExample of time format: 1s / 1m / 1h / 1d / 1w"
      );

    let embed6 = new Discord.RichEmbed()
      .setColor()
      .setDescription("Please send the `gift`");

    if (!message.guild.member(message.author).hasPermission("MANAGE_GUILD"))
      return message.channel.send(embed1);
    message.channel.send(embed2).then(msg => {
      message.channel
        .awaitMessages(filter, {
          max: 1,
          time: 20000,
          errors: ["time"]
        })
        .then(collected => {
          let room = message.guild.channels.find(
            gg => gg.name === collected.first().content
          );
          if (!room) return message.channel.send(embed3);
          room = collected.first().content;
          collected.first().delete();
          msg.edit(embed4).then(msg => {
            message.channel
              .awaitMessages(filter, {
                max: 1,
                time: 20000,
                errors: ["time"]
              })
              .then(collected => {
                if (!collected.first().content.match(/[1-60][s,m,h,d,w]/g))
                  return message.channel.send(embed5);
                duration = collected.first().content;
                collected.first().delete();
                msg.edit(embed6).then(msg => {
                  message.channel
                    .awaitMessages(filter, {
                      max: 1,
                      time: 20000,
                      errors: ["time"]
                    })
                    .then(collected => {
                      title = collected.first().content;
                      collected.first().delete();
                      msg.delete();
                      message.delete();
                      try {
                        let giveEmbed = new Discord.RichEmbed()
                          .setColor("RANDOM")
                          .setTitle(`${title}`)
                          .setFooter("Hosted by : " + message.author.username)
                          .setDescription(
                            `React With 🎉 To Enter! \nTime remaining : ${duration} \n **Created at :** ${hours}:${minutes}:${seconds} ${suffix}`
                          );
                        //.setFooter(message.author.username, message.author.avatarURL);
                        message.guild.channels
                          .find(gg => gg.name === room)
                          .send(
                            " <a:tada1:759519205422268486> **GIVEAWAYS** <a:tada1:759519205422268486>",
                            {
                              embed: giveEmbed
                            }
                          )
                          .then(m => {
                            let re = m.react("🎉");
                            setTimeout(() => {
                              let users = m.reactions.get("🎉").users;
                              let list = users
                                .array()
                                .filter(
                                  u => (u.id !== m.author.id) !== client.user.id
                                );
                              let gFilter =
                                list[
                                  Math.floor(Math.random() * list.length) + 1
                                ];
                              if (gFilter === undefined) {
                                let endEmbed = new Discord.RichEmbed()
                                  .setColor()
                                  .setTitle(title)
                                  .setDescription(
                                    `Winners : no enough number of reaction so there is no winner`
                                  )
                                  .setAuthor(
                                    "Hosted by : " + message.author.username
                                  )
                                  .setFooter("Ended at :")
                                  .setTimestamp();
                                m.edit(
                                  "** <a:tada1:759519205422268486> GIVEAWAY ENDED <a:tada1:759519205422268486>**",
                                  {
                                    embed: endEmbed
                                  }
                                );
                              } else {
                                let endEmbed = new Discord.RichEmbed()
                                  .setColor()
                                  .setAuthor(
                                    "Hosted by : " + message.author.username
                                  )
                                  .setTitle(title)
                                  .setDescription(`Winners : ${gFilter}`)
                                  .setFooter("Ended at :")
                                  .setTimestamp();
                                m.edit("** 🎉 GIVEAWAY ENDED 🎉**", {
                                  embed: endEmbed
                                });
                              }
                              if (gFilter === undefined) {
                                // message.guild.channels.find("name" , room).send("No enough number of reactions")
                              } else {
                                message.guild.channels
                                  .find(gg => gg.name === room)
                                  .send(
                                    `**Congratulations ${gFilter}! You won The \`${title}\`**`
                                  );
                              }
                            }, ms(duration));
                          });
                      } catch (e) {
                        message.channel.send(
                          `:heavy_multiplication_x:| **i Don't Have Prem**`
                        );
                        console.log(e);
                      }
                    });
                });
              });
          });
        });
    });
  }
});

///كود حذف الروابط
/// تعديل اساسي حذف روابط الديسكورد
/// تم حذف الكود لانه يسبب مشاكل مثلا يحذف كل الروابط حتى من الادارة ، يمكنك استخدام بوت بروبوت في الحماية من الروابط
////كود رابط
////تعديل غير اساسي

client.on("message", message => {
  if (message.content.split(" ")[0] === prefix + "link") {
    message.channel
      .createInvite({
        thing: true,
        maxUses: 5,
        maxAge: 86400
      })
      .then(invite => message.author.send(invite.url));
    const embed = new Discord.RichEmbed()
      .setColor("RANDOM")
      .setDescription("**✅ -The link has been sent to the private**")
      .setAuthor(client.user.username, client.user.avatarURL)
      .setAuthor(client.user.username, client.user.avatarURL)
      .setFooter("Request by: " + message.author.tag);

    message.channel.sendEmbed(embed).then(message => {
      message.delete(10000);
    });
    const Embed11 = new Discord.RichEmbed().setColor("RANDOM")
      .setDescription(`**Ⓜ️ -Link duration: 1 day
 Ⓜ️ -The number of uses of the link : 5 **`);

    message.author.sendEmbed(Embed11);
  }
});

////تعديل غير اساسي

client.on("message", message => {
  if (message.content.startsWith(prefix + "staff submit")) {
    if (!message.channel.guild) return;
    if (message.author.bot) return;
    let channel = message.guild.channels.find(gg => gg.name === "staff-apply");
    if (!channel) return message.reply("**pls create a room staff apply**");
    if (channel) {
      message.channel.send(message.member + ", **:timer:**").then(m => {
        m.edit(message.member + ", **Your name ✍**");
        m.channel
          .awaitMessages(m1 => m1.author == message.author, {
            maxMatches: 1,
            time: 60 * 1000
          })
          .then(m1 => {
            m1 = m1.first();
            var name = m1.content;
            m1.delete();
            m.edit(message.member + ", **:timer:**").then(m => {
              m.edit(message.member + ", **How old are you 🎓**");
              setTimeout(() => {
                m.delete();
              }, 10000);
              m.channel
                .awaitMessages(m2 => m2.author == message.author, {
                  maxMatches: 1,
                  time: 60 * 1000
                })
                .then(m2 => {
                  m2 = m2.first();
                  var age = m2.content;
                  m2.delete();
                  message.channel
                    .send(message.member + ", **:timer:**")
                    .then(m => {
                      m.edit(
                        message.member + ", **What is the role you want ?**"
                      );
                      setTimeout(() => {
                        m.delete();
                      }, 10000);
                      m.channel
                        .awaitMessages(m1 => m1.author == message.author, {
                          maxMatches: 1,
                          time: 60 * 1000
                        })
                        .then(m3 => {
                          m3 = m3.first();
                          var ask = m3.content;
                          m3.delete();
                          message.channel
                            .send(message.member + ", **:timer:**")
                            .then(m => {
                              m.edit(
                                message.member +
                                  ", **Will you respect the rule ؟ 📑**"
                              );
                              setTimeout(() => {
                                m.delete();
                              }, 10000);
                              m.channel
                                .awaitMessages(
                                  m1 => m1.author == message.author,
                                  { maxMatches: 1, time: 60 * 1000 }
                                )
                                .then(m4 => {
                                  m4 = m4.first();
                                  var ask2 = m4.content;
                                  m4.delete();
                                  message.channel
                                    .send(message.member + ", **:timer:**")
                                    .then(m => {
                                      m.edit(
                                        message.member +
                                          ", **What you can help this server ? 🤔**"
                                      );
                                      m.channel
                                        .awaitMessages(
                                          m1 => m1.author == message.author,
                                          { maxMatches: 1, time: 60 * 1000 }
                                        )
                                        .then(m5 => {
                                          m5 = m5.first();
                                          var ask3 = m5.content;
                                          m5.delete();
                                          m.edit(
                                            message.member +
                                              ", **Data collection is in progress....**"
                                          ).then(mtime => {
                                            setTimeout(() => {
                                              let embed = new Discord.RichEmbed()
                                                .setColor("RANDOM")
                                                .setTitle(
                                                  `**Staff in server** [__**${message.guild.name}**__]`
                                                )
                                                .addField(
                                                  "**`Name`**",
                                                  `${name}`,
                                                  true
                                                )
                                                .addField(
                                                  "**`Age`**",
                                                  `${age}`,
                                                  true
                                                )
                                                .addField(
                                                  "**`The role`**",
                                                  `${ask}`
                                                )
                                                .addField(
                                                  "**`You will respect the rule ؟`**",
                                                  `${ask2}`
                                                )
                                                .addField(
                                                  "**`What you can help`**",
                                                  `${ask3}`
                                                )
                                                .setFooter(
                                                  `Name : ${message.author.username}\nID User : ${message.author.id}`,
                                                  "https://images-ext-2.discordapp.net/external/JpyzxW2wMRG2874gSTdNTpC_q9AHl8x8V4SMmtRtlVk/https/orcid.org/sites/default/files/files/ID_symbol_B-W_128x128.gif"
                                                );
                                              channel.send(embed);
                                            }, 2500);
                                            setTimeout(() => {
                                              mtime.delete();
                                            }, 3000);
                                          });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
          });
      });
    }
  }
});

client.on("message", message => {
  if (message.content.startsWith(prefix + "room1")) {
    if (!message.channel.guild) return;
    if (message.author.bot) return;
    if (!message.member.hasPermission("`MANAGE_CHANNELS"))
      return message.reply("**you need permission `MANAGE_CHANNELS`**");
    message.guild.createChannel("staff apply", "text").then(c => {
      c.overwritePermissions(message.guild.id, {
        SEND_MESSAGES: false
      });
    });
    message.channel.send("**STAFF APPLY ROOM HAS BEEN CREATED**");
  }
});

client.on("message", message => {
  var args = message.content.split(" ").slice(1);
  var msg = message.content.toLowerCase();
  if (!message.guild) return;
  if (!msg.startsWith(prefix + "role")) return;
  if (!message.member.hasPermission("MANAGE_ROLES"))
    return message.channel.send(" **ليس لديك صلاحيات :rolling_eyes:**");
  if (args[0].toLowerCase() == "clear") {
    if (!args[0])
      return message.reply("**:x: metion the person**");
    if (!args[1])
      return message.reply("**:x: write the rank**");
    var role = msg
      .split(" ")
      .slice(2)
      .join(" ")
      .toLowerCase();
    var role1 = message.guild.roles
      .filter(r => r.name.toLowerCase().indexOf(role) > -1)
      .first();
    if (!role1)
      return message.reply("**:x: write the role you want to remove it from this person without @**");
    if (message.mentions.members.first()) {
      if (role1.position >= message.member.highestRole.position)
        return message.channel.send(
          " Ypou d'ont have the permission :rolling_eyes:"
        );

      message.mentions.members.first().removeRole(role1);
      return message.reply(
        "**:white_check_mark: [ " +
          role1.name +
          " ] Rank [ " +
          args[0] +
          " ] cleared **"
      );
    }
    if (args[0].toLowerCase() == "all") {
      if (role1.position >= message.member.highestRole.position)
        return message.channel.send(
          "انت لا تمتلك الصلاحيات الكافية :rolling_eyes:"
        );

      message.guild.members.forEach(m => m.removeRole(role1));
      return message.reply(
        "**:white_check_mark: [ " + role1.name + " ] the rank was cleared for everyone**"
      );
    } else if (args[0].toLowerCase() == "bots") {
      if (role1.position >= message.member.highestRole.position)
        return message.channel.send(
          "انت لا تمتلك الصلاحيات الكافية :rolling_eyes:"
        );

      message.guild.members
        .filter(m => m.user.bot)
        .forEach(m => m.removeRole(role1));
      return message.reply(
        "**:white_check_mark: [ " + role1.name + " ] the rank was cleared for all bots**"
      );
    } else if (args[0].toLowerCase() == "humans") {
      if (role1.position >= message.member.highestRole.position)
        return message.channel.send(
          "you d'ont have permission :rolling_eyes:"
        );

      message.guild.members
        .filter(m => !m.user.bot)
        .forEach(m => m.removeRole(role1));
      return message.reply(
        "**:white_check_mark: [ " + role1.name + " ] The rank was cleared to two person**"
      );
    }
  } else {
    if (!args[0])
      return message.reply("**:x: put the person **");
    if (!args[1])
      return message.reply("**:x: put the rank**");
    var role = msg
      .split(" ")
      .slice(2)
      .join(" ")
      .toLowerCase();
    var role1 = message.guild.roles
      .filter(r => r.name.toLowerCase().indexOf(role) > -1)
      .first();
    if (!role1)
      return message.reply("**:x: put the rank**");
    if (message.mentions.members.first()) {
      if (role1.position >= message.member.highestRole.position)
        return message.channel.send(
          "You d'ont have permissionة :rolling_eyes:"
        );

      message.mentions.members.first().addRole(role1);
      return message.reply(
        "**:white_check_mark: [ " +
          role1.name +
          " ] Rank [ " +
          args[0] +
          " ] give **"
      );
    }
    if (args[0].toLowerCase() == "all") {
      if (role1.position >= message.member.highestRole.position)
        return message.channel.send(
          "You d'ont have permission :rolling_eyes:"
        );
      message.guild.members.forEach(m => m.addRole(role1));
      return message.reply(
        "**:white_check_mark: [ " + role1.name + " ] The rank is given**"
      );
    } else if (args[0].toLowerCase() == "bots") {
      if (role1.position >= message.member.highestRole.position)
        return message.channel.send(
          "you d'ont have permission :rolling_eyes:"
        );

      message.guild.members
        .filter(m => m.user.bot)
        .forEach(m => m.addRole(role1));
      return message.reply(
        "**:white_check_mark: [ " + role1.name + " ] the bots has given the rank**"
      );
    } else if (args[0].toLowerCase() == "humans") {
      if (role1.position >= message.member.highestRole.position)
        return message.channel.send(
          "You d'ont have permission :rolling_eyes:"
        );

      message.guild.members
        .filter(m => !m.user.bot)
        .forEach(m => m.addRole(role1));
      return message.reply(
        "**:white_check_mark: [ " + role1.name + " ] The rank is given**"
      );
    }
  }
});

client.on("message", async message => {
  if (!message.guild) return;
  let mention = message.mentions.members.first();
  let role = message.content
    .split(" ")
    .slice(2)
    .join(" ");
  let mySupport = message.guild.roles.find(gg => gg.name === role);
  if (message.content.startsWith(prefix + "accept")) {
    let acRoom = message.guild.channels.find(gg => gg.name === "accept-denied");
    if (!acRoom)
      return message.reply(
        `Write the commands m!room2 or create room **accept-denied** `
      );
    if (acRoom) {
      if (!message.guild.member(message.author).hasPermission("MANAGE_ROLES"))
        return;
      if (!mention) return message.reply("metion the person");
      if (!role) return message.reply("ادخل اسم رتبة");
      if (!mySupport) return message.reply("هذه الرتبة غير موجودة");
      if (mention.roles.has(mySupport))
        return message.reply("هذا الشخص معه الرتبة مسبقا");
      if (mySupport.position >= message.member.highestRole.position)
        return message.channel.send(
          "انت لا تمتلك الصلاحيات الكافية :rolling_eyes:"
        );

      mention.addRole(mySupport).then(() => {
        acRoom.send(
          `**[ ${mySupport} ] واعطائك رتبة ${mention} تم قبولك بنجاح**`
        );
      });
    }
  }
});

client.on("message", async message => {
  if (message.content.startsWith(prefix + "denied")) {
    if (!message.channel.guild) return;

    let mention = message.mentions.members.first();
    let acRoom = message.guild.channels.find("name", "accept-denied");
    let rrrr = message.content.split(/ +/).slice(2);
    let reason = rrrr.join(" ");
    if (!acRoom)
      return message.reply(
        `${prefix}room2 من فضلك انشاء روم **accept-denied** او اكتب الامر`
      );
    if (!message.guild.member(message.author).hasPermission("MANAGE_ROLES"))
      return;
    if (!mention) return message.reply("منشن شخص");
    message.react("✅");
    acRoom
      .send(
        `**${mention} تم رفضك للأسف **
السبب : \`${reason}\``
      )
      .then(m => m.react("✅"));
  }
});
client.on("message", message => {
  if (message.content.startsWith(prefix + "room2")) {
    if (!message.channel.guild) return;
    if (message.author.bot) return;
    if (!message.member.hasPermission("MANAGE_CHANNELS"))
      return message.reply("**تحتاج الى `MANAGE_CHANNELS`**");
    message.guild.createChannel("accept-denied", "text").then(c => {
      c.overwritePermissions(message.guild.id, {
        SEND_MESSAGES: false
      });
    });
    message.channel.send("**✅ تم انشاء روم القبول والرفض بنجاح**");
  }
});
client.on("message", async msg => {
  if (msg.author.bot) return undefined;
  if (!msg.content.startsWith(prefix)) return undefined;

  let args = msg.content.split(" ");

  let command = msg.content.toLowerCase().split(" ")[0];
  command = command.slice(prefix.length);

  if (command === `avatar`) {
    if (msg.channel.type === "dm")
      return msg.channel.send(
        "Nope Nope!! u can't use avatar command in DMs (:"
      );
    let mentions = msg.mentions.members.first();
    if (!mentions) {
      let sicon = msg.author.avatarURL;
      let embed = new Discord.RichEmbed()
        .setImage(msg.author.avatarURL)
        .setColor("#5074b3");
      msg.channel.send({ embed });
    } else {
      let sicon = mentions.user.avatarURL;
      let embed = new Discord.RichEmbed().setColor("#5074b3").setImage(sicon);
      msg.channel.send({ embed });
    }
  }
});

//// تغير غير اساسي
///// كود ميوزك

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

let cmds = {
  play: { cmd: "play", a: ["p", "شغل", "تشغيل"] },
  skip: { cmd: "skip", a: ["s", "تخطي", "next"] },
  stop: { cmd: "stop", a: ["ايقاف", "توقف"] },
  pause: { cmd: "pause", a: ["لحظة", "مؤقت"] },
  resume: { cmd: "resume", a: ["r", "اكمل", "استكمال"] },
  volume: { cmd: "volume", a: ["vol", "صوت"] },
  queue: { cmd: "queue", a: ["q", "list", "قائمة"] },
  repeat: { cmd: "repeat", a: ["re", "تكرار", "اعادة"] },
  forceskip: { cmd: "forceskip", a: ["fs", "fskip"] },
  skipto: { cmd: "skipto", a: ["st", "تخطي الي"] },
  nowplaying: { cmd: "Nowplaying", a: ["np", "الان"] }
};

Object.keys(cmds).forEach(key => {
  var value = cmds[key];
  var command = value.cmd;
  client.commands.set(command, command);

  if (value.a) {
    value.a.forEach(alias => {
      client.aliases.set(alias, command);
    });
  }
});

let active = new Map();

client.on("warn", console.warn);

client.on("error", console.error);

client.on("message", async msg => {
  if (msg.author.bot) return undefined;
  if (!msg.content.startsWith(prefix)) return undefined;

  const args = msg.content
    .slice(prefix.length)
    .trim()
    .split(/ +/g);
  const command = args.shift().toLowerCase();

  const url = args[1] ? args[1].replace(/<(.+)>/g, "$1") : "";

  let cmd =
    client.commands.get(command) ||
    client.commands.get(client.aliases.get(command));

  let s;

  if (cmd === "play") {
    const voiceChannel = msg.member.voiceChannel;
    if (!voiceChannel)
      return msg.channel.send(
        `:no_entry_sign: You must be listening in a voice channel to use that!`
      );
    const permissions = voiceChannel.permissionsFor(msg.client.user);
    if (!permissions.has("CONNECT")) {
      return msg.channel.send(
        `:no_entry_sign: I can't join Your voiceChannel because i don't have ` +
          "`" +
          "`CONNECT`" +
          "`" +
          ` permission!`
      );
    }

    if (!permissions.has("SPEAK")) {
      return msg.channel.send(
        `:no_entry_sign: I can't SPEAK in your voiceChannel because i don't have ` +
          "`" +
          "`SPEAK`" +
          "`" +
          ` permission!`
      );
    }

    if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
      const playlist = await youtube.getPlaylist(url);
      const videos = await playlist.getVideos();

      for (const video of Object.values(videos)) {
        const video2 = await youtube.getVideoByID(video.id); // eslint-disable-line no-await-in-loop
        await handleVideo(video2, msg, voiceChannel, true); // eslint-disable-line no-await-in-loop
      }
      return msg.channel.send(`Added to queue: ${playlist.title}`);
    } else {
      try {
        var video = await youtube.getVideo(url);
      } catch (error) {
        try {
          var videos = await youtube.searchVideos(args, 1);

          // eslint-disable-next-line max-depth
          var video = await youtube.getVideoByID(videos[0].id);
        } catch (err) {
          console.error(err);
          return msg.channel.send("I can't find any thing");
        }
      }

      return handleVideo(video, msg, voiceChannel);
    }

    async function handleVideo(video, msg, voiceChannel, playlist = false) {
      const serverQueue = active.get(msg.guild.id);

      //	console.log('yao: ' + Util.escapeMarkdown(video.thumbnailUrl));

      let hrs =
        video.duration.hours > 0
          ? video.duration.hours > 9
            ? `${video.duration.hours}:`
            : `0${video.duration.hours}:`
          : "";
      let min =
        video.duration.minutes > 9
          ? `${video.duration.minutes}:`
          : `0${video.duration.minutes}:`;
      let sec =
        video.duration.seconds > 9
          ? `${video.duration.seconds}`
          : `0${video.duration.seconds}`;
      let dur = `${hrs}${min}${sec}`;

      let ms = video.durationSeconds * 1000;

      const song = {
        id: video.id,
        title: video.title,
        duration: dur,
        msDur: ms,
        url: `https://www.youtube.com/watch?v=${video.id}`
      };
      if (!serverQueue) {
        const queueConstruct = {
          textChannel: msg.channel,
          voiceChannel: voiceChannel,
          connection: null,
          songs: [], // حسن كههربا

          volume: 50,
          requester: msg.author,
          playing: true,
          repeating: false
        };
        active.set(msg.guild.id, queueConstruct);

        queueConstruct.songs.push(song);

        try {
          var connection = await voiceChannel.join();
          queueConstruct.connection = connection;
          play(msg.guild, queueConstruct.songs[0]);
        } catch (error) {
          console.error(`I could not join the voice channel: ${error}`);
          active.delete(msg.guild.id);
          return msg.channel.send(`I cant join this voice channel`);
        } // حسن كههربا
      } else {
        serverQueue.songs.push(song);

        if (playlist) return undefined;
        if (!args) return msg.channel.send("no results.");
        else
          return msg.channel
            .send(":watch: Loading... [`" + args + "`]")
            .then(m => {
              setTimeout(() => {
                //:watch: Loading... [let]
                m.edit(
                  `:notes: Added **${song.title}**` +
                    "(` " +
                    song.duration +
                    ")`" +
                    ` to the queue at position ` +
                    `${serverQueue.songs.length}`
                );
              }, 500);
            });
      }
      return undefined;
    }

    function play(guild, song) {
      const serverQueue = active.get(guild.id);

      if (!song) {
        serverQueue.voiceChannel.leave();
        active.delete(guild.id);
        return;
      }
      //console.log(serverQueue.songs);
      if (serverQueue.repeating) {
        console.log("Repeating");
      } else {
        serverQueue.textChannel.send(
          ":notes: Added **" +
            song.title +
            "** (`" +
            song.duration +
            "`) to begin playing."
        );
      }
      const dispatcher = serverQueue.connection
        .playStream(ytdl(song.url))
        .on("end", reason => {
          //if (reason === 'Stream is not generating quickly enough.') console.log('Song ended.');
          //else console.log(reason);
          if (serverQueue.repeating) return play(guild, serverQueue.songs[0]);
          serverQueue.songs.shift();
          play(guild, serverQueue.songs[0]);
        })
        .on("error", error => console.error(error));
      dispatcher.setVolumeLogarithmic(serverQueue.volume / 100);

      // حسن كههربا
    }
  } else if (cmd === "stop") {
    if (msg.guild.me.voiceChannel !== msg.member.voiceChannel)
      return msg.channel.send(
        `You must be in ${msg.guild.me.voiceChannel.name}`
      );
    if (!msg.member.hasPermission("ADMINISTRATOR")) {
      msg.react("❌");
      return msg.channel.send("You don't have permission `ADMINSTRATOR`");
    }
    let queue = active.get(msg.guild.id);
    if (queue.repeating)
      return msg.channel.send(
        "Repeating Mode is on, you can't stop the music, run `" +
          `${prefix}repeat` +
          "` to turn off it."
      );
    queue.songs = [];
    queue.connection.dispatcher.end();
    return msg.channel.send(
      ":notes: The player has stopped and the queue has been cleared."
    );
    // 04
  } else if (cmd === "skip") {
    let vCh = msg.member.voiceChannel;

    let queue = active.get(msg.guild.id);

    if (!vCh)
      return msg.channel.send(
        "Sorry, but you can't because you are not in voice channel"
      );

    if (!queue) return msg.channel.send("No music playing to skip it");

    if (queue.repeating)
      return msg.channel.send(
        "You can't skip it, because repeating mode is on, run " +
          `\`${prefix}forceskip\``
      );
    // 14
    let req = vCh.members.size - 1;

    if (req == 1) {
      msg.channel.send("**:notes: Skipped **" + args);
      return queue.connection.dispatcher.end("Skipping ..");
    }

    if (!queue.votes) queue.votes = [];

    if (queue.votes.includes(msg.member.id))
      return msg.say(
        `You already voted for skip! ${queue.votes.length}/${req}`
      );

    queue.votes.push(msg.member.id);

    if (queue.votes.length >= req) {
      msg.channel.send("**:notes: Skipped **" + args);

      delete queue.votes;

      return queue.connection.dispatcher.end("Skipping ..");
    }

    msg.channel.send(
      `**You have successfully voted for skip! ${queue.votes.length}/${req}**`
    );
  } else if (cmd === "pause") {
    let queue = active.get(msg.guild.id);

    let vCh = msg.member.voiceChannel;

    if (!vCh || vCh !== msg.guild.me.voiceChannel)
      return msg.channel.send(`You are not in my voice channel.`);

    if (!queue) {
      return msg.channel.send("No music playing to pause.");
    }

    if (!queue.playing)
      return msg.channel.send(
        ":no_entry_sign: There must be music playing to use that!"
      );

    let disp = queue.connection.dispatcher;

    disp.pause("Pausing..");

    queue.playing = false;
    // 2002
    msg.channel.send(
      ":notes: Paused " + args + ". **Type** `" + prefix + "resume` to unpause!"
    );
  } else if (cmd === "resume") {
    let queue = active.get(msg.guild.id);

    let vCh = msg.member.voiceChannel;

    if (!vCh || vCh !== msg.guild.me.voiceChannel)
      return msg.channel.send(`You are not in my voice channel.`);

    if (!queue) return msg.channel.send(":notes: No music paused to resume.");

    if (queue.playing)
      return msg.channel.send(":notes: No music paused to resume.");

    let disp = queue.connection.dispatcher;

    disp.resume("Resuming..");

    queue.playing = true;

    msg.channel.send(":notes: Resumed.");
  } else if (cmd === "volume") {
    let queue = active.get(msg.guild.id);

    if (!queue || !queue.songs)
      return msg.channel.send(
        ":notes: There is no music playing to set volume."
      );

    let vCh = msg.member.voiceChannel;

    if (!vCh || vCh !== msg.guild.me.voiceChannel)
      return msg.channel.send(":notes: You are not in my voice channel");

    let disp = queue.connection.dispatcher;

    if (isNaN(args[0])) return msg.channel.send(":notes: Numbers only!");

    if (parseInt(args[0]) > 100)
      return msg.channel.send("You can't set the volume more than 100.");
    //:speaker: Volume changed from 20 to 20 ! The volume has been changed from ${queue.volume} to ${args[0]}
    msg.channel.send(
      ":speaker: Volume has been **changed** from (`" +
        queue.volume +
        "`) to (`" +
        args[0] +
        "`)"
    );

    queue.volume = args[0];
    // 14-04-2002
    disp.setVolumeLogarithmic(queue.volume / 100);
  } else if (cmd === "queue") {
    let queue = active.get(msg.guild.id);

    if (!queue)
      return msg.channel.send(
        ":no_entry_sign: There must be music playing to use that!"
      );

    let embed = new Discord.RichEmbed().setAuthor(
      `${client.user.username}`,
      client.user.displayAvatarURL
    );
    let text = "";

    for (var i = 0; i < queue.songs.length; i++) {
      let num;
      if (i > 8) {
        let st = `${i + 1}`;
        let n1 = converter.toWords(st[0]);
        let n2 = converter.toWords(st[1]);
        num = `:${n1}::${n2}:`;
      } else {
        let n = converter.toWords(i + 1);
        num = `:${n}:`;
      }
      text += `${num} ${queue.songs[i].title} [${queue.songs[i].duration}]\n`;
    }
    embed.setDescription(`Songs Queue | ${msg.guild.name}\n\n ${text}`);
    msg.channel.send(embed);
    // 14-04-2002
  } else if (cmd === "repeat") {
    let vCh = msg.member.voiceChannel;

    if (!vCh || vCh !== msg.guild.me.voiceChannel)
      return msg.channel.send("You are not in my voice channel");

    let queue = active.get(msg.guild.id);

    if (!queue || !queue.songs)
      return msg.channel.send("There is no music playing to repeat it.");

    if (queue.repeating) {
      queue.repeating = false;
      return msg.channel.send(
        ":arrows_counterclockwise: **Repeating Mode** (`False`)"
      );
    } else {
      queue.repeating = true;
      return msg.channel.send(
        ":arrows_counterclockwise: **Repeating Mode** (`True`)"
      );
    }
  } else if (cmd === "forceskip") {
    let vCh = msg.member.voiceChannel;

    if (!vCh || vCh !== msg.guild.me.voiceChannel)
      return msg.channel.send("You are not in my voice channel");

    let queue = active.get(msg.guild.id);
    // 14-04-2002
    if (queue.repeating) {
      queue.repeating = false;

      msg.channel.send("ForceSkipped, Repeating mode is on.");

      queue.connection.dispatcher.end("ForceSkipping..");

      queue.repeating = true;
    } else {
      // 14-04-2002
      queue.connection.dispatcher.end("ForceSkipping..");

      msg.channel.send("ForceSkipped.");
    }
  } else if (cmd === "skipto") {
    let vCh = msg.member.voiceChannel;
    // 14-04-2002
    if (!vCh || vCh !== msg.guild.me.voiceChannel)
      return msg.channel.send("You are not in my voice channel");

    let queue = active.get(msg.guild.id);

    if (!queue.songs || queue.songs < 2)
      return msg.channel.send("There is no music to skip to.");

    if (queue.repeating)
      return msg.channel.send(
        "You can't skip, because repeating mode is on, run " +
          `\`${prefix}repeat\` to turn off.`
      );

    if (!args[0] || isNaN(args[0]))
      return msg.channel.send(
        "Please input song number to skip to it, run " +
          prefix +
          `queue` +
          " to see songs numbers."
      );
    // 14-04-2002
    let sN = parseInt(args[0]) - 1;

    if (!queue.songs[sN])
      return msg.channel.send("There is no song with this number.");

    let i = 1;

    msg.channel.send(
      `Skipped to: **${queue.songs[sN].title}[${queue.songs[sN].duration}]**`
    );

    while (i < sN) {
      i++;
      queue.songs.shift();
    }

    queue.connection.dispatcher.end("SkippingTo..");
    // 14-04-2002
  } else if (cmd === "Nowplaying") {
    let q = active.get(msg.guild.id);

    let now = npMsg(q);

    msg.channel.send(now.mes, now.embed).then(me => {
      setInterval(() => {
        let noww = npMsg(q);
        me.edit(noww.mes, noww.embed);
      }, 5000);
    });

    function npMsg(queue) {
      let m =
        !queue || !queue.songs[0] ? "No music playing." : "Now Playing...";

      const eb = new Discord.RichEmbed();

      eb.setColor(msg.guild.me.displayHexColor);

      if (!queue || !queue.songs[0]) {
        // 14-04-2002
        eb.setTitle("No music playing");
        eb.setDescription(
          "\u23F9 " + bar(-1) + " " + volumeIcon(!queue ? 100 : queue.volume)
        );
      } else if (queue.songs) {
        if (queue.requester) {
          let u = msg.guild.members.get(queue.requester.id);

          if (!u) eb.setAuthor("Unkown (ID:" + queue.requester.id + ")");
          else eb.setAuthor(u.user.tag, u.user.displayAvatarURL);
        }

        if (queue.songs[0]) {
          try {
            eb.setTitle(queue.songs[0].title);
            eb.setURL(queue.songs[0].url);
          } catch (e) {
            eb.setTitle(queue.songs[0].title);
          }
        }
        eb.setDescription(embedFormat(queue));
      } // 14-04-2002

      return {
        mes: m,
        embed: eb
      };
    }

    function embedFormat(queue) {
      if (!queue || !queue.songs) {
        return "No music playing\n\u23F9 " + bar(-1) + " " + volumeIcon(100);
      } else if (!queue.playing) {
        return (
          "No music playing\n\u23F9 " + bar(-1) + " " + volumeIcon(queue.volume)
        );
      } else {
        let progress = queue.connection.dispatcher.time / queue.songs[0].msDur;
        let prog = bar(progress);
        let volIcon = volumeIcon(queue.volume);
        let playIcon = queue.connection.dispatcher.paused ? "\u23F8" : "\u25B6";
        let dura = queue.songs[0].duration;

        return (
          playIcon +
          " " +
          prog +
          " `[" +
          formatTime(queue.connection.dispatcher.time) +
          "/" +
          dura +
          "]`" +
          volIcon
        );
      }
    }

    function formatTime(duration) {
      var milliseconds = parseInt((duration % 1000) / 100),
        seconds = parseInt((duration / 1000) % 60),
        minutes = parseInt((duration / (1000 * 60)) % 60),
        hours = parseInt((duration / (1000 * 60 * 60)) % 24);

      hours = hours < 10 ? "0" + hours : hours;
      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      return (hours > 0 ? hours + ":" : "") + minutes + ":" + seconds;
    }

    function bar(precent) {
      var str = "";

      for (var i = 0; i < 12; i++) {
        let pre = precent;
        let res = pre * 12;

        res = parseInt(res);

        if (i == res) {
          str += "\uD83D\uDD18";
        } else {
          str += "▬";
        }
      }

      return str;
    }

    function volumeIcon(volume) {
      if (volume == 0) return "\uD83D\uDD07";
      if (volume < 30) return "\uD83D\uDD08";
      if (volume < 70) return "\uD83D\uDD09";
      return "\uD83D\uDD0A";
    }
  }
});

client.on("message", message => {
  if (message.content === prefix + "ping") {
    let start = Date.now();
    message.channel.send("pong").then(message => {
      message.edit(`\`\`\`js
Time taken: ${Date.now() - start} ms
Discord API: ${client.ping.toFixed(0)} ms\`\`\``);
    });
  }
});

client.on("message", message => {
  var helplist = `**:notes:  قائمة الاوامر:  

> Play : تشغيل الاغنية او اضافتها للقائمة او اكمال الاغنية [p] 
> Pause : ايقاف مؤقت الاغنية  
> Resume : اكمال الاغنية 
> stop : لأيقاف الأغنية وخروج البوت من الروم
> forceskip : لتخطي الأغنية بشكل مباشر
> Queue : عرض القائمة 
> skipto : لتخطي الأغنية الى الأغنية القادمة في طابور الموسيقى القادمة
> Skip : تخطي للاغنية التالية 
> Volume : تغيير الصوت [vol] 
> Nowplaying : عرض مايتم تشغيله الان [np] 
> Ping : سرعة استجابة البوت 
> repeat : تكرار الاغنية 
> Leave : الخروج من الروم الصوتي  
**`;
});

//// مهم
/// {} عند عمل ريمكس للبوت احذف مايوجد بملفات الجيسون وحط قوسين مثل
//// يجب ان يكون البوت رتبة اقل من رتبة البوتات الموثوقة والكبيرة مثل داينو بوت وبروبوت والاخرى لكي لا يعطيهم باند
//// يجب اعطاء البوت جميع الصلاحيات
//// البوت امن تماما من اي اخطاء في الحماية او حتى في اصل الاكواد
//// تم تجربة البوت اكثر من 3 ايام
//// هذا البوت هو الاصدار الثاني من بوت السيستم من قناة اسامة بلس
//// الاكواد مجمعة من سيرفرات كثير مثل الفا وتوكسك كودز
////شكر خاص لـ سرحان ولوفي ومرتجى على المساعدة لو لله وهم ماكان خلصنا هذا البوت الرهيب وما انسى بارون

///mention bot
client.on("message", message => {
  if (message.content === prefix + "ls") {
    var list_all = [];
    message.guild.members.forEach(bb => {
      if (!bb.user.bot) return;
      list_all.push(`<@${bb.user.id}>`);
    });
    message.channel.send(list_all.join(", "));
  }
});
client.on("message", message => {
  if (message.content.startsWith("m!kiss")) {
    let user = message.mentions.users.first();
    if (!user) {
      return message.emit("commandUsage", message, this.help);
    }
    var kiss = [
      "https://media.giphy.com/media/dP8ONh1mN8YWQ/giphy.gif",
      "https://media.giphy.com/media/KMuPz4KDkJuBq/giphy.gif",
      "https://media.giphy.com/media/3o7TKzkCiuW3E0Gn4Y/giphy.gif",
      "https://media.giphy.com/media/HKQZgx0FAipPO/giphy.gif",
      "https://media.giphy.com/media/PFjXmKuwQsS9q/giphy.gif",
      "https://media.giphy.com/media/CzCi6itPr3yBa/giphy.gif",
      "https://media.giphy.com/media/hnNyVPIXgLdle/giphy.gif",
      "https://media.giphy.com/media/bGm9FuBCGg4SY/giphy.gif",
      "https://media.giphy.com/media/G3va31oEEnIkM/giphy.gif",
      "https://media.giphy.com/media/G3va31oEEnIkM/giphy.gif",
      "https://media.giphy.com/media/BaEE3QOfm2rf2/giphy.gif",
      "https://media.giphy.com/media/OSq9souL3j5zW/giphy.gif",
      "https://giphy.com/gifs/kiss-anime-nISHppsUAzosMhttps://media.giphy.com/media/nISHppsUAzosM/giphy.gif",
      "https://media.giphy.com/media/ll5leTSPh4ocE/giphy.gif",
      "https://media.giphy.com/media/10r6oEoT6dk7E4/giphy.gif",
      "https://media.giphy.com/media/YC4QEtFmz64sE/giphy.gif",
      "https://media.giphy.com/media/KH1CTZtw1iP3W/giphy.gif",
      "https://media.giphy.com/media/flmwfIpFVrSKI/giphy.gif",
      "https://media.giphy.com/media/Z21HJj2kz9uBG/giphy.gif",
      "https://media.giphy.com/media/mGAzm47irxEpG/giphy.gif",
      "https://media.giphy.com/media/JynbO9pnGxPrO/giphy.gif",
      "https://media.giphy.com/media/7z1xs4Fl9Kb8A/giphy.gif",
      "https://media.giphy.com/media/EP9YxsbmbplIs/giphy.gif",
      "https://media.giphy.com/media/q7MxQyarcDHDW/giphy.gif",
      "https://media.giphy.com/media/uSHX6qYv1M7pC/giphy.gif",
      "https://media.giphy.com/media/EVODaJHSXZGta/giphy.gif",
      "https://media.giphy.com/media/EVODaJHSXZGta/giphy.gif",
      "https://media.giphy.com/media/fHtb1JPbfph72/giphy.gif",
      "https://media.giphy.com/media/pwZ2TLSTouCQw/giphy.gif",
      "https://media.giphy.com/media/DfzHC09hY64Gk/giphy.gif",
      "https://media.giphy.com/media/l0MYB8Ory7Hqefo9a/giphy.gif",
      "https://media.giphy.com/media/Y9iiZdUaNRF2U/giphy.gif",
      "https://media.giphy.com/media/CTo4IKRN4l4SA/giphy.gif",
      "https://media.giphy.com/media/jR22gdcPiOLaE/giphy.gif",
      "https://media.giphy.com/media/pFg4Ko6pXqQVy/giphy.gif"
    ];

    message.channel
      .send({
        embed: {
          description: `${message.author.username} give you a kiss ${user.username}!`,
          image: {
            url: kiss[Math.floor(Math.random() * kiss.length)]
          }
        }
      })
      .catch(e => {
        client.log.error(e);
      });
  }
});
client.on("message", message => {
  if (message.channel.type === "dm") return;
  if (message.content.startsWith("m!marry")) {
    if (!message.channel.guild)
      return message.reply(" This command only for servers ");
    var proposed = message.mentions.members.first();

    if (!message.mentions.members.first())
      return message.reply("You need to ask for alone").catch(console.error);
    if (message.mentions.users.size > 1)
      return message
        .reply("A boy does not control what is necessary for a girl")
        .catch(console.error);
    if (proposed === message.author) return message.reply(`**I betrayed ؟ **`);
    if (proposed === client.user)
      return message.reply(`** Do you want to marry me؟ **`);
    message.channel.send(`**${proposed}
You want to accept the offer to marry me${message.author}
Display for 10 seconds
Write down, agree or not**`);

    const filter = m => m.content.startsWith("Assent");
    message.channel
      .awaitMessages(filter, { max: 1, time: 15000, errors: ["time"] })
      .then(collected => {
        message.channel.send(
          `**${message.author} و ${proposed} A thousand congratulations, God willing, you will enjoy your married life and extend your life long and do not forget the honeymoon**`
        );
      })
      .catch(collected =>
        message.channel.send(
          `**Silence is a sign of satisfaction. We say congratulations**`
        )
      );

    const filte = m => m.content.startsWith("no");
    message.channel
      .awaitMessages(filte, { max: 1, time: 15000, errors: ["time"] })
      .then(collected => {
        message.channel.send(
          `**${message.author} Your offer has been rejected *`
        );
      });
  }
});
client.on("message", message => {
  if (message.content.startsWith(prefix + "love")) {
    let user = message.mentions.users.first();
    if (!user) {
      return message.channel.send("💋 Mention the person you want to love");
    }
    let slaps = [
      "https://cdn.discordapp.com/attachments/747092964613816330/748548024573362287/screen-3.jpg"
    ];

    message.channel
      .send({
        embed: {
          description: `${message.author.username} ** Gave a 💋love to ** ${user.username}!`,
          image: {
            url: slaps[Math.floor(Math.random() * slaps.length)]
          }
        }
      })
      .catch(e => {
        client.log.error(e);
      });
  }
});

client.on("message", message => {
  if (message.content.startsWith("m!slap")) {
    let user = message.mentions.users.first();
    if (!user) {
      return message.emit("commandUsage", message, this.help);
    }
    let slaps = [
      "https://imgur.com/gallery/DVft5D6",
      "https://giphy.com/gifs/Gf3AUz3eBNbTW/html5",
      "https://i.giphy.com/media/j3iGKfXRKlLqw/giphy.gif",
      "https://i.giphy.com/media/2M2RtPm8T2kOQ/giphy.gif",
      "https://media.giphy.com/media/1zgOyLCRxCmV5G3GFZ/giphy.gif",
      "https://media.giphy.com/media/3oEdv1Rdmo0Vd0YdW0/giphy.gif",
      "https://media.giphy.com/media/eIRFsjX4LULXa/giphy.gif",
      "https://media.giphy.com/media/LImd5H5oQ7Oms/giphy.gif",
      "https://i.giphy.com/media/l3YSimA8CV1k41b1u/giphy.gif",
      "https://media.giphy.com/media/81kHQ5v9zbqzC/giphy.gif",
      "https://media.giphy.com/media/QYT2VEOXVyVmE/giphy.gif",
      "https://media.giphy.com/media/xUNd9HZq1itMkiK652/giphy.gif",
      "https://media.giphy.com/media/xXRDuvEcMA2JO/giphy.gif",
      "https://media.giphy.com/media/zRlGxKCCkatIQ/giphy.gif",
      "https://media.giphy.com/media/9U5J7JpaYBr68/giphy.gif",
      "https://media.giphy.com/media/q0uYk5uwJVFug/giphy.gif",
      "https://media.giphy.com/media/iREUC7qrjN4vC/giphy.gif",
      "https://media.giphy.com/media/AkKEOnHxc4IU0/giphy.gif",
      "https://media.giphy.com/media/6Fad0loHc6Cbe/giphy.gif",
      "https://media.giphy.com/media/prKt29rL7zAbe/giphy.gif",
      "https://media.giphy.com/media/LeTDEozJwatvW/giphy.gif",
      "https://media.giphy.com/media/6UTkJXBd26qiI/giphy.gif",
      "https://media.giphy.com/media/VEmm8ngZxwJ9K/giphy.gif",
      "https://media.giphy.com/media/EtdEOL3MbPbmE/giphy.gif",
      "https://media.giphy.com/media/CIvfqJqBbvliU/giphy.gif",
      "https://media.giphy.com/media/3pSKnxaDzl9Oo/giphy.gif",
      "https://media.giphy.com/media/1iw7RG8JbOmpq/giphy.gif",
      "https://media.giphy.com/media/m0VwgrO5yXxQY/giphy.gif",
      "https://media.giphy.com/media/2o855hr1xVotO/giphy.gif",
      "https://media.giphy.com/media/URBigLkgWoYzS/giphy.gif",
      "https://media.giphy.com/media/pGOdXNi6J7ML6/giphy.gif",
      "https://media.giphy.com/media/HHUd5nOFbSYtG/giphy.gif",
      "https://media.giphy.com/media/TZp6XSDusOnXG/giphy.gif",
      "https://media.giphy.com/media/wqP5TOFnOMwqQ/giphy.gif",
      "https://i.giphy.com/media/WLXO8OZmq0JK8/giphy.gif"
    ];

    message.channel
      .send({
        embed: {
          description: `${message.author.username} I'm about to pen you. ${user.username}!`,
          image: {
            url: slaps[Math.floor(Math.random() * slaps.length)]
          }
        }
      })
      .catch(e => {
        client.log.error(e);
      });
  }
});

client.on("message", message => {
  if (message.content.startsWith("m!hug")) {
    let user = message.mentions.users.first();
    if (!user) {
      return message.emit("commandUsage", message, this.help);
    }
    let hugs = [
      "https://media.giphy.com/media/od5H3PmEG5EVq/giphy.gif",
      "https://media.giphy.com/media/KL7xA3fLx7bna/giphy.gif",
      "https://media.giphy.com/media/1dOH0aFZz3LyVVEMn9/giphy.gif",
      "https://media.giphy.com/media/yidUzriaAGJbsxt58k/giphy.gif",
      "https://media.giphy.com/media/26FeTvBUZErLbTonS/giphy.gif",
      "https://media.giphy.com/media/xT0Gqne4C3IxaBcOdy/giphy.gif",
      "https://media.giphy.com/media/eMIGPdZ77kPgD7nf4j/giphy.gif",
      "https://media.giphy.com/media/13YrHUvPzUUmkM/giphy.gif",
      "https://media.giphy.com/media/wnsgren9NtITS/giphy.gif",
      "https://media.giphy.com/media/qscdhWs5o3yb6/giphy.gif",
      "https://media.giphy.com/media/hi0VuTUqLrmuc/giphy.gif",
      "https://media.giphy.com/media/xJlOdEYy0r7ZS/giphy.gif",
      "https://media.giphy.com/media/7WQQXPg6o3YNa/giphy.gif",
      "https://media.giphy.com/media/LWTxLvp8G6gzm/giphy.gif",
      "https://media.giphy.com/media/xZshtXrSgsRHy/giphy.gif",
      "https://media.giphy.com/media/BXrwTdoho6hkQ/giphy.gif",
      "https://media.giphy.com/media/10BcGXjbHOctZC/giphy.gif",
      "https://media.giphy.com/media/49mdjsMrH7oze/giphy.gif",
      "https://media.giphy.com/media/xUPGcgtKxm4PADy3Cw/giphy.gif",
      "https://media.giphy.com/media/JTjSlqiz63j5m/giphy.gif",
      "https://media.giphy.com/media/aD1fI3UUWC4/giphy.gif",
      "https://media.giphy.com/media/5eyhBKLvYhafu/giphy.gif",
      "https://media.giphy.com/media/ddGxYkb7Fp2QRuTTGO/giphy.gif",
      "https://media.giphy.com/media/pXQhWw2oHoPIs/giphy.gif",
      "https://media.giphy.com/media/ZRI1k4BNvKX1S/giphy.gif",
      "https://media.giphy.com/media/ZQN9jsRWp1M76/giphy.gif",
      "https://media.giphy.com/media/s31WaGPAmTP1e/giphy.gif",
      "https://media.giphy.com/media/wSY4wcrHnB0CA/giphy.gif",
      "https://media.giphy.com/media/aVmEsdMmCTqSs/giphy.gif",
      "https://media.giphy.com/media/C4gbG94zAjyYE/giphy.gif",
      "https://media.giphy.com/media/ArLxZ4PebH2Ug/giphy.gif",
      "https://media.giphy.com/media/kFTKQfjK4ysZq/giphy.gif",
      "https://media.giphy.com/media/vVA8U5NnXpMXK/giphy.gif",
      "https://media.giphy.com/media/2q2qHJu838EyQ/giphy.gif",
      "https://media.giphy.com/media/q3kYEKHyiU4kU/giphy.gif",
      "https://media.giphy.com/media/3ZnBrkqoaI2hq/giphy.gif",
      "https://media.giphy.com/media/ExQqjagJBoECY/giphy.gif",
      "https://media.giphy.com/media/3o6Yg5fZCGeFArIcbm/giphy.gif"
    ];

    message.channel
      .send({
        embed: {
          description: `${message.author.username} Give you a hug  ${user.username}!`,
          image: {
            url: hugs[Math.floor(Math.random() * hugs.length)]
          }
        }
      })
      .catch(e => {
        client.log.error(e);
      });
  }
});
client.on("message", message => {
  var prefix = "m!";
  if (message.author.bot) return;

  if (message.content.startsWith(prefix + "xo")) {
    let array_of_mentions = message.mentions.users.array();
    let symbols = [":o:", ":heavy_multiplication_x:"];
    var grid_message;

    if (array_of_mentions.length == 1 || array_of_mentions.length == 2) {
      let random1 = Math.floor(Math.random() * (1 - 0 + 1)) + 0;
      let random2 = Math.abs(random1 - 1);
      if (array_of_mentions.length == 1) {
        random1 = 0;
        random2 = 0;
      }
      var player1_id = message.author.id;
      let player2_id = array_of_mentions[random2].id;
      var turn_id = player1_id;
      var symbol = symbols[0];
      let initial_message = `Game match between <@${player1_id}> and <@${player2_id}>!`;
      if (player1_id == player2_id) {
        initial_message += "\n_( Play with yourself)_";
      }
      message.channel
        .send(`Xo ${initial_message}`)
        .then(console.log("Successful tictactoe introduction"))
        .catch(console.error);
      message.channel
        .send(
          ":one::two::three:" +
            "\n" +
            ":four::five::six:" +
            "\n" +
            ":seven::eight::nine:"
        )
        .then(new_message => {
          grid_message = new_message;
        })
        .then(console.log("Successful tictactoe game initialization"))
        .catch(console.error);
      message.channel
        .send("You must wait where it is approved")
        .then(async new_message => {
          await new_message.react("1⃣");
          await new_message.react("2⃣");
          await new_message.react("3⃣");
          await new_message.react("4⃣");
          await new_message.react("5⃣");
          await new_message.react("6⃣");
          await new_message.react("7⃣");
          await new_message.react("8⃣");
          await new_message.react("9⃣");
          await new_message.react("🆗");
          await new_message
            .edit(`It\'s <@${turn_id}>\'s turn! Your symbol is ${symbol}`)
            .then(new_new_message => {
              require("./xo.js")(
                client,
                message,
                new_new_message,
                player1_id,
                player2_id,
                turn_id,
                symbol,
                symbols,
                grid_message
              );
            })
            .then(console.log("Successful tictactoe listener initialization"))
            .catch(console.error);
        })
        .then(console.log("Successful tictactoe react initialization"))
        .catch(console.error);
    } else {
      message
        .reply(`tag with whom you want to play`)
        .then(console.log("Successful error reply"))
        .catch(console.error);
    }
  }
});

client.on("message", async message => {
  if (!message.content.startsWith(prefix)) return;
  if (message.author.bot) return;
  if (message.channel.type === "dm") return;
  var messageArray = message.content.split(" ");
  var command = messageArray[0];
  var args = messageArray.slice(1);
  var year = message.author.createdAt.getFullYear();
  var month = message.author.createdAt.getMonth();
  var day = message.author.createdAt.getDate();

  if (command === `${prefix}user`) {
    let user = message.mentions.users.first();
    if (!user) user = message.author;
    let color = message.member.displayHexColor;
    if (color == "") color = message.member.hoistRole.hexColor;
    const userinfoEmbed = new Discord.RichEmbed()
      .setColor("#c09e53")
      .setAuthor(message.author.tag, message.author.displayAvatarURL)
      .addField("⍣ ``User ID``:", message.author.id, true)
      .addField("⍣ ``Status``:", message.author.presence.status, true)
      .addField(
        "⍣ ``Date of Creation``: ",
        year + "-" + month + "-" + day,
        true
      )
      .addField(
        "⍣ ``Date of Joining the server``:",
        message.member.joinedAt.toLocaleString(),
        true
      )
      .setImage(
        "https://cdn.discordapp.com/icons/738728098647769148/a_c587febf2b2c03c40937e531e5a634cf.gif?size=1024"
      );
    message.channel.send(userinfoEmbed);
  }
})

client.on("message", message => {
  if (message.content.startsWith("m!slots")) {
    let slot1 = ["🍏", "🍇", "🍒", "🍍", "🍅", "🍆", "🍑", "🍓"];
    let slots1 = `${slot1[Math.floor(Math.random() * slot1.length)]}`;
    let slots2 = `${slot1[Math.floor(Math.random() * slot1.length)]}`;
    let slots3 = `${slot1[Math.floor(Math.random() * slot1.length)]}`;
    let member = `${message.author.username}`;
    let we;
    if (slots1 === slots2 && slots2 === slots3) {
      we = "Win! :moneybag:  ";
    } else {
      we = "Lose! :tired_face:  ";
    }

    var h = member.user;

    const slotsembed = new Discord.RichEmbed()
      .setColor("RANDOM")
      .setDescription(
        `------金${slots1}金------金${slots2}金------金${slots3}金------`
      )
      .addField("Player:", `${member}`)
      .addField("You:", `${we}`)
      .setThumbnail(message.author.avatarURL)
      .setImage(
        "https://cdn.discordapp.com/icons/738728098647769148/a_c587febf2b2c03c40937e531e5a634cf.gif?size=1024"
      )
      .setTimestamp()
      .setFooter(message.guild.name, message.guild.iconURL);

    message.channel.send({
      embed: slotsembed
    });
  }
});

client.on("message", m => {
  if (m.content === "m!invite") {
    let Dashboard = "soon";
    var addserver =
      "https://discord.com/oauth2/authorize?client_id=748254787145039872&permissions=8&scope=bot";
    var SUPPORT = "https://discord.gg/Sfjj89z";
    let embed = new Discord.RichEmbed().setTitle(`Helpful Links`)
      .setDescription(`                                                                                                               
  **[Add To Your Server ](${addserver})**    
  **[Dashboard](${Dashboard})**
  **[ Server Support](${SUPPORT})**`);
    m.react("✅");
    m.channel.send(embed);
  }
});

client.on("guildMemberAdd", member => {
  const channel = client.channels.get("749039123112919051");
  if (member.guild.id === "748255558624083979") {
    var embed = new Discord.RichEmbed()
      .setColor("#c09e53")
      .setThumbnail(client.user.avatarURL)
      .setTitle("Hello and Welcome, to MMBOT SUPPORT")
      .setDescription(
        `Before entering MMBOT SUPPORT,
Feel Free to check out these Channels first: 
**-** <#748280310814343299>
**-** <#748272210036392036>
`
      )
      .addField("⍣  ``Username``", member.user, true)
      .addField("⍣  ``Server``", "**MMBOT SUPPORT™**", true)
      .addField("⍣  ``Users``", member.guild.memberCount, true)
      .setImage(
        "https://cdn.discordapp.com/icons/756960002236874945/a_c587febf2b2c03c40937e531e5a634cf.gif?size=1024"
      );
    channel.send(embed);
  }
});

