'use strict';
const fs = require('fs');
const Discord = require('discord.js');
const client = new Discord.Client();

/**
 * @param  {Discord:Message} message: Pass the incurring message for the command
 * @param  {string} commandString: Pass the entire string to strip off the front of the message
 */
module.exports = function(message,commandString){
	var messageText = message.content
	var input = messageText.replace(commandString,"");
	if(/\dd\d/.test(input)){
		message.channel.send(masterDiceRoll(input))
		return
	}
	message.channel.send("No Dice")
}

//receives a phrase with dice rolls and numbers, outputs the results
function masterDiceRoll(phrase){
	var dice = findDice(phrase);
	var rolls = parseDice(dice);
	var output = diceToRolls(phrase,dice,rolls);
	output = output + " = " + eval(output)
	return output;
}

//takes a string and returns and array of every instance of [number]d[number]
function findDice(phrase){
	var dice = phrase.match(/\d+[d]\d+/g);
	return dice;
}

//takes an array of strings formatted [number]d[number] and applies the two numbers to the dieRoller function. Returns an array of the results
function parseDice(dice){
	var rollResults = [];
	var d;
	var numbers;
	var x;
	for (x of dice){
		numbers = x.split("d");
		//console.log("The numbers are" + numbers);
		rollResults.push(dieRoller(numbers[0],numbers[1]));
	}
	//console.log("The rolls are" + rollResults);
	return rollResults;
}

function diceToRolls(phrase,dice,rolls){
	for(var x in dice){
		phrase = phrase.replace(dice[x],rolls[x]);
	}
	return phrase;
}
//Calculate roll of number dice with sides sides 
function dieRoller(number,sides){
	var total = 0;
	for(var i=0;i<number;i++){
		total += Math.floor(Math.random()*sides)+1;
	}
	return total;
}

