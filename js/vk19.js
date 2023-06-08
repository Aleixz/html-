// 获取页面元素
const messageContainer = document.getElementById("message-container");
const inputContainer = document.getElementById("input-container");
const input = inputContainer.querySelector("input[type='text']");
const button = inputContainer.querySelector("button");
const typingContainer = document.getElementById("typing-container");

// 发送问题
async function sendMessage() {
  const question = input.value.trim();
  if (question) {
    const message = createMessage("我", question, true);
    messageContainer.appendChild(message);
    inputContainer.style.display = "none";
    button.style.display = "none";
    typingContainer.style.display = "flex";
    input.value = "";
    setTimeout(async () => {
      let answer = await getAnswer(question);
      if (!answer) {
        answer = createRandomAnswer(question);
      }
      showAnswer("机器人", answer);
      inputContainer.style.display = "flex";
      button.style.display = "block";
      typingContainer.style.display = "none";
    }, 1000);
  }
}

// 创建消息元素
function createMessage(name, content, isMe) {
  const message = document.createElement("div");
  message.classList.add("message");
  message.classList.add(name.toLowerCase());

  const avatar = document.createElement("div");
  avatar.classList.add("avatar");
  avatar.style.backgroundImage = `url(${name.toLowerCase()}.jpg)`;
  message.appendChild(avatar);

  const text = document.createElement("div");
  text.classList.add("text");
  message.appendChild(text);

  if (isMe) {
    message.classList.add("me");
    avatar.classList.add("me");
    text.textContent = content;
  } else {
    message.classList.add("xiaoming");
  }

  return message;
}

// 获取答案
async function getAnswer(question) {
  const url = `https://api.ownthink.com/bot?appid=xiaosi&userid=user&spoken=${question}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data.message === "success") {
      return data.data.info.text;
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
}

// 创建随机答案
function createRandomAnswer(question) {
  const answers = [
    "这个问题好难啊，我得想想。",
  ];
  const index = Math.floor(Math.random() * answers.length);
  return answers[index];
}

// 显示答案
function showAnswer(name, answer) {
  const message = createMessage(name, "", false);
  messageContainer.appendChild(message);
  const text = message.querySelector(".text");
  let index = 0;
  const intervalId = setInterval(() => {
    if (index < answer.length) {
      text.textContent += answer[index];
      index++;
    } else {
      clearInterval(intervalId);
      messageContainer.scrollTop = messageContainer.scrollHeight;
    }
  }, 100);
  // 保持聊天记录在底部栏的上方
  messageContainer.scrollTop = messageContainer.scrollHeight;
}

// 计算聊天记录容器的高度
function calculateMessageContainerHeight() {
  const messageContainerHeight = window.innerHeight - inputContainer.offsetHeight;
  messageContainer.style.height = messageContainerHeight + "px";
}

// 当窗口大小改变时重新计算聊天记录容器的高度
window.addEventListener("resize", calculateMessageContainerHeight);

// 页面加载完成后初始化聊天记录容器的高度
window.addEventListener("load", calculateMessageContainerHeight);

// 处理回车键
function handleKeyPress(event) {
  if (event.keyCode === 13) {
    sendMessage();
  }
}

// 打开模态框
function openModal() {
  const modal = document.getElementById("myModal");
  modal.style.display = "block";
}

// 关闭模态框
function closeModal() {
  const modal = document.getElementById("myModal");
  modal.style.display = "none";
}

// 点击模态框背景时关闭模态框
window.onclick = function (event) {
  const modal = document.getElementById("myModal");
  if (event.target === modal) {
    modal.style.display = "none";
  }
};

// 页面加载完成后自动聚焦到输入框
window.addEventListener("load", () => {
  input.focus();
});

// 页面加载完成后自动滚动到底部
window.addEventListener("load", () => {
  messageContainer.scrollTop = messageContainer.scrollHeight;
});

// 添加事件监听器
input.addEventListener("keypress", handleKeyPress);
button.addEventListener("click", sendMessage);
document.getElementById("openModalBtn").addEventListener("click", openModal);
document.getElementById("closeModalBtn").addEventListener("click", closeModal);
