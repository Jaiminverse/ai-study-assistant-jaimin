function loginUser() {

    alert("LOGIN FUNCTION WORKING");

    window.location.href = "Dashboard.html";
}

let activeChatIndex = -1;

let chats =
JSON.parse(localStorage.getItem("chats")) || [];

let currentChat = [];

let currentTitle = "";


function typeMessage(text) {
  const messages = document.getElementById("messages");

  const botMsg = document.createElement("div");
  botMsg.classList.add("bot-msg");

  messages.appendChild(botMsg);

  let i = 0;

  const interval = setInterval(() => {
    if (i < text.length) {
      botMsg.innerText += text.charAt(i);
      i++;
      messages.scrollTop = messages.scrollHeight;
    } else {
      clearInterval(interval);
    }
  }, 15);
}

async function sendMessage() {
  const input = document.getElementById("input");
  const message = input.value.trim();

  if (!message) return;

  currentChat.push({
    sender: "user",
    text: message
});
autoSaveChat();
if(currentTitle === ""){
    currentTitle =
    message.substring(0,25);
}
  const messages = document.getElementById("messages");

  // User Message
  const userMsg = document.createElement("div");
  userMsg.classList.add("user-msg");
  userMsg.innerText = message;
  messages.appendChild(userMsg);

  input.value = "";

  // Thinking message
  const thinking = document.createElement("div");
  thinking.classList.add("bot-msg");
  thinking.innerText = "Thinking.";
  messages.appendChild(thinking);

  messages.scrollTop = messages.scrollHeight;

  let dots = 1;

const thinkingAnimation =
setInterval(() => {

    dots++;

    if(dots > 3){
        dots = 1;
    }

    thinking.innerText =
    "Thinking" + ".".repeat(dots);

},500);

  try {
    const response = await fetch(
  "https://ai-study-assistant-production-9fc3.up.railway.app/chat",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      message: userInput
    })
  }
);

    const data = await res.json();

clearInterval(thinkingAnimation);

thinking.remove();

console.log(data.reply);

const botMsg = document.createElement("div");
botMsg.classList.add("bot-msg");
botMsg.innerText = data.reply;
messages.appendChild(botMsg);

currentChat.push({
    sender: "bot",
    text: data.reply
});
autoSaveChat();

  } 
  catch(error){

    clearInterval(thinkingAnimation);

    console.error(error);

    thinking.innerText =
    "Error connecting to AI";

}
function loginUser() {

    const email =
    document.getElementById("email").value;

    const password =
    document.getElementById("password").value;

    if(email === "" || password === ""){
        alert("Please fill all fields");
        return;
    }

    window.location.href =
    "Dashboard.html";
}
//
function saveCurrentChat() {

    if(currentChat.length === 0)
    return;

    chats.push({

        title: currentTitle,

        messages: [...currentChat]

    });

    localStorage.setItem(
        "chats",
        JSON.stringify(chats)
    );

    loadChatHistory();
}
//
function autoSaveChat() {

    if(currentChat.length === 0) return;

    const existingIndex =
    chats.findIndex(
        chat => chat.title === currentTitle
    );

    const chatData = {
        title: currentTitle,
        messages: [...currentChat]
    };

    if(existingIndex >= 0){

        chats[existingIndex] = chatData;

    }else{

        chats.push(chatData);

    }

    localStorage.setItem(
        "chats",
        JSON.stringify(chats)
    );

    loadChatHistory();
}
//
function loadChatHistory() {

    const chatList =
    document.querySelector(".chat-list");

    if(!chatList) return;

    chatList.innerHTML = "";

    chats.forEach((chat,index)=>{

        const item =
document.createElement("div");

item.classList.add("chat-item");
if(index === activeChatIndex){
    item.classList.add("active-chat");
} 

const title =
document.createElement("span");

title.innerText = chat.title;

const deleteBtn =
document.createElement("span");

deleteBtn.innerHTML = "🗑";

deleteBtn.classList.add("delete-chat");

deleteBtn.addEventListener(
    "click",
    (e) => {

        e.stopPropagation();

        deleteChat(index);

    }
);

item.appendChild(title);
item.appendChild(deleteBtn);

        item.addEventListener(
            "click",
            ()=>loadChat(index)
        );

        chatList.appendChild(item);

    });

}
//
function searchChats() {

    const search =
    document
    .getElementById("chatSearch")
    .value
    .toLowerCase();

    const chatItems =
    document.querySelectorAll(".chat-item");

    chatItems.forEach(item => {

        const title =
        item.querySelector("span")
        .innerText
        .toLowerCase();

        if(title.includes(search)){

            item.style.display = "flex";

        } else {

            item.style.display = "none";

        }

    });

}      
const searchInput =
document.getElementById("chatSearch");

if(searchInput){

    searchInput.addEventListener(
        "input",
        searchChats
    );

}
//
function loadChat(index){
  activeChatIndex = index;

    const messages =
    document.getElementById("messages");

    messages.innerHTML = "";

    currentChat =
    chats[index].messages;

    currentTitle =
    chats[index].title;

    currentChat.forEach(msg=>{

        const div =
        document.createElement("div");

        div.classList.add(

            msg.sender === "user"
            ? "user-msg"
            : "bot-msg"

        );

        div.innerText =
        msg.text;

        messages.appendChild(div);

    });

}
//
function deleteChat(index) {

    const confirmDelete =
    confirm(
        "Delete this chat?"
    );

    if(!confirmDelete) return;

    chats.splice(index,1);

    localStorage.setItem(
        "chats",
        JSON.stringify(chats)
    );

    loadChatHistory();

}
//
async function exportPDF() {

    const { jsPDF } = window.jspdf;

    const doc = new jsPDF();

    let y = 20;

    doc.setFontSize(18);
    doc.text("AI Study Assistant Chat", 10, y);

    y += 15;

    currentChat.forEach(msg => {

        const line =
        `${msg.sender.toUpperCase()}: ${msg.text}`;

        const splitText =
        doc.splitTextToSize(line, 180);

        doc.text(splitText, 10, y);

        y += splitText.length * 8;

        if(y > 270){

            doc.addPage();

            y = 20;
        }

    });

    const fileName =
    (currentTitle || "chat")
    .replace(/[^\w\s]/gi,'');

    doc.save(`${fileName}.pdf`);

}
//
const newChatBtn =
    document.querySelector(".new-chat");

if (newChatBtn) {

    newChatBtn.addEventListener(
        "click",
        () => {

            saveCurrentChat();

            currentChat = [];
            currentTitle = "";

            const messages =
                document.getElementById("messages");

            if (messages) {
                messages.innerHTML = "";
            }
        }
    );
}
//
async function generateNotes() {

    if (currentChat.length === 0) {

        alert("No chat available!");
        return;

    }

    const messages =
        document.getElementById("messages");

    const loading =
        document.createElement("div");

    loading.classList.add("bot-msg");
    loading.innerText = "📚 Generating Notes...";

    messages.appendChild(loading);

    try {

        const chatText =
            currentChat
                .map(msg => msg.text)
                .join("\n");

        const res = await fetch(
            "http://localhost:5000/chat",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    message: `
You are an expert study notes generator.

Create professional study notes from the following conversation.

Rules:
- Do NOT mention USER or BOT.
- Use clear headings.
- Use bullet points.
- Include key concepts.
- Include important exam points.
- Give a short summary.

Format:

# Topic

## Definition

## Key Points

## Important Exam Notes

## Summary

Conversation:

${chatText}
`
                })
            }
        );

        const data = await res.json();

        loading.remove();

        const notesBox =
            document.createElement("div");

        notesBox.classList.add("notes-box");

        notesBox.innerText =
            "📚 STUDY NOTES\n\n" +
            data.reply;

        messages.appendChild(notesBox);

        messages.scrollTop =
            messages.scrollHeight;

    }
    catch (error) {

        console.error(error);

        loading.innerText =
            "❌ Failed to generate notes";

    }

}

const notesBtn =
    document.getElementById("notesBtn");

if (notesBtn) {

    notesBtn.addEventListener(
        "click",
        generateNotes
    );

}
//
async function generateQuiz(){

    if(currentChat.length === 0){

        alert("No chat available!");

        return;

    }

    const messages =
    document.getElementById("messages");

    const loading =
    document.createElement("div");

    loading.classList.add("bot-msg");

    loading.innerText =
    "🧠 Generating Quiz...";

    messages.appendChild(loading);

    try{

        const chatText =
        currentChat
        .map(msg => msg.text)
        .join("\n");

        const res = await fetch(
            "http://localhost:5000/chat",
            {
                method:"POST",

                headers:{
                    "Content-Type":
                    "application/json"
                },

                body:JSON.stringify({

                    message:`
Create a quiz from this topic.

Rules:
- Create 5 MCQs.
- Give 4 options.
- Mark the correct answer.
- Keep formatting clean.

Content:

${chatText}
`

                })

            }
        );

        const data =
        await res.json();

        loading.remove();

        const quizBox =
        document.createElement("div");

        quizBox.classList.add("quiz-box");

        quizBox.innerText =
        "🧠 QUIZ\n\n" +
        data.reply;

        messages.appendChild(quizBox);

    }

    
    catch(error){

        console.error(error);

        loading.innerText =
        "❌ Quiz generation failed";

    }

}
const quizBtn =
document.getElementById("quizBtn");

if(quizBtn){

    quizBtn.addEventListener(
        "click",
         generateQuiz
    );

}

//quiz key
// Enter key support
const inputBox = document.getElementById("input");

if (inputBox) {
    inputBox.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            sendMessage();
        }
    });
}
loadChatHistory();{
const exportBtn =
document.getElementById("exportBtn");

if(exportBtn){

    exportBtn.addEventListener(
        "click",
        exportPDF
    );
}}}
