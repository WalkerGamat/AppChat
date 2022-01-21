const socket = io()//socket from client to server

//preparation du canal à recevoir les data 
socket.on('chat-message',message=>{
    validateInput(message)
    outputMessage(message)
    
})
socket.on('infos-chat',data=>{
    console.log(data)
})
//get user name 
const user = prompt("what is your name?")
//banner message
appendMessage()
//send user name to the server
socket.emit('user-name',user);

const chatContainer = document.getElementById("send-container")

chatContainer.addEventListener('submit',(e)=>{
    e.preventDefault();
    //catch the value that has been sent from the input
    const msg = chatContainer.querySelector('#message-input').value
    //chat the username + message to server so it will broadcast it
    socket.emit('chatMessage',user,msg)
    //validate Input before print
    if(validateInput(msg)){
        //print value to the screen
        outputMessage(msg)       
    }
    //clear input 
    chatContainer.querySelector('#message-input').value = '';
    chatContainer.querySelector('#message-input').focus();//put the focus after the cleanning

})

/**
 * print comments in the page
 * @param {comment} msgText 
 */
function outputMessage(msgText){
    const chatMessageList = document.getElementById("chat-message-list")//chat container
    const divMessage = document.createElement("div");// Message container
          divMessage.classList.add("your-message");
          divMessage.classList.add("My-message-container");
          divMessage.setAttribute('myself','true');
    const p = document.createElement("p")// message
          p.classList.add('My-message');
          p.classList.add('message');
    const timePostedMessage = document.createElement("div");
          timePostedMessage.classList.add("timestamped");
          timePostedMessage.classList.add("Mt-time");
    //toggle divMessage to chatMessageList
    chatMessageList.appendChild(divMessage);
    //toggle paragraphe tag to divMessage
    divMessage.appendChild(p);
    //toggle message output to paragraphe tag
    p.innerHTML=msgText;
    //toggle timestamped in div element
    //timePostedMessage = formatMessage();
}

function appendMessage(){
    const sendContainer = document.getElementById('banner');
    sendContainer.removeAttribute('hidden');
    //after some seconds hidden attribute should return to true
}

function validateInput(message){
//use regex for validation    
    if(message==='' || message==='fuck'){
        console.log('your message is not good')
        return false;
    }
    return true;
}