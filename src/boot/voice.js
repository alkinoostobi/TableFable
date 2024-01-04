import Artyom from "artyom.js"
import { useTokenStore } from "../stores/tokenInfo";
// Access the tokenInfo store
const artyom = new Artyom();
const tokenInfo = useTokenStore();
var myGroup = [
    {
        description:"If my database contains the name of a person say something",
        smart:true, // a Smart command allow you to use wildcard in order to retrieve words that the user should say
        // Ways to trigger the command with the voice
        indexes:["Do you know who is *","I don't know who is *","Is * a good person"],
        // Do something when the commands is triggered
        action:function(i,wildcard){
            var database = ["Carlos","Bruce","David","Joseph","Kenny"];

            //If the command "is xxx a good person" is triggered do, else
            if(i == 2){
                if(database.indexOf(wildcard.trim())){
                    artyom.say("I'm a machine, I dont know what is a feeling");
                }else{
                    artyom.say("I don't know who is " + wildcard + " and i cannot say if is a good person");
                }
            }else{
                if(database.indexOf(wildcard.trim())){
                    artyom.say("Of course i know who is "+ wildcard + ". A really good person");
                }else{
                    artyom.say("My database is not big enough, I don't know who is " + wildcard);
                }
            }
        }
    },
    {
        indexes:["What time is it","Is too late"],
        action:function(i){ // var i returns the index of the recognized command in the previous array
            if(i == 0){
                aFunctionThatSaysTheTime(new Date());
            }else if(i == 1){
                artyom.say("Never is too late to do something my friend !");
            }
        }
    },
    {
        indexes:["Browser  *","I attack hero *"],
        action:function(i,wildcard){
            console.log('here')
            if(i == 1 && wildcard.trim() <= tokenInfo.players.length){
                alert("You attacked the enemy " + wildcard);
            }else if(i == 0 && wildcard.trim() <= tokenInfo.players.length){
                alert("You attacked the hero " + wildcard);
            }else{
                alert("Invalid target");
            }
        }
    }
];

artyom.addCommands(myGroup); 