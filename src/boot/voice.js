import Artyom from "artyom.js"
import socket from "../boot/socket"; // Adjust the path as needed
import { useTokenStore } from "../stores/tokenInfo";
const artyom = new Artyom();
const tokenInfo = useTokenStore();
console.log('hehe')
var commandHello = {
  indexes:["hello","good morning","hey"], // These spoken words will trigger the execution of the command
  action:function(){ // Action to be executed when a index match with spoken word
      artyom.say("fagma, what the heck is fagma my brochocho , well can you fuck my ass? dabs");
  }
};
artyom.addCommands(commandHello); // Add the command with addCommands method. No
var ohcholera = {
  indexes:["playground bear appears"], // These spoken words will trigger the execution of the command
  action:function(){ // Action to be executed when a index match with spoken word
      artyom.say("oh cholera, cheeto freddy fazbear, ur ur ur ur ur ur ur ur ur ur ur ur ur");
  }
};

var ohcholera2 = {
  indexes:["I play fighting games"], // These spoken words will trigger the execution of the command
  action:function(){ // Action to be executed when a index match with spoken word
      artyom.say("Kill yourself");
  }
};
artyom.addCommands(ohcholera2);
var no = {
  indexes:["no"], // These spoken words will trigger the execution of the command
  action:function(){ // Action to be executed when a index match with spoken word
      artyom.say("Kill yourself");
  }
};


artyom.addCommands(no);
var scrollUp = {
  indexes:["up"], // These spoken words will trigger the execution of the command
  action:function(){ // Action to be executed when a index match with spoken word
      socket.emit("scrollUp")
  }
};


artyom.addCommands(scrollUp);
var scrollDown = {
  indexes:["down"], // These spoken words will trigger the execution of the command
  action:function(){ // Action to be executed when a index match with spoken word
      socket.emit("scrollDown")
  }
};


artyom.addCommands(scrollDown);
artyom.addCommands(ohcholera);
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
        indexes:["I attack enemy *","I attack hero *"],
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
// This function activates artyom and will listen all that you say forever (requires https conection, otherwise a dialog will request if you allow the use of the microphone)
function startContinuousArtyom(){
  artyom.fatality();// use this to stop any of

  setTimeout(function(){// if you use artyom.fatality , wait 250 ms to initialize again.
       artyom.initialize({
          lang:"en-GB",// A lot of languages are supported. Read the docs !
          continuous:true,// Artyom will listen forever
          listen:true, // Start recognizing
          debug:true, // Show everything in the console
          speed:1 // talk normally
      }).then(function(){
          console.log("Ready to work !");
      });
  },250);
}
startContinuousArtyom()

export default artyom;
