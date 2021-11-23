window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const dependency of ['chrome', 'node', 'electron']) {
    replaceText(`${dependency}-version`, process.versions[dependency])
  }
  setTimeout(()=>{
   const socket =  new WebSocket("ws://localhost:9032");
   socket.onopen = () => {
    setTimeout(()=>{
      socket.send("Hello! i am aaa");
    },2000)
   };
  
   socket.onmessage = (data) => {
    console.log(data);
   };
  })

})