console.log("Content script loaded");
function findComposeToolbar() {
  const selectors = [
    '.aDh', // Gmail's new compose toolbar
    '.btC', // Gmail's older compose toolbar
    '[role="toolbar"]',
    '.gU.Up'
   ];
   for(const selector of selectors) {
    const toolbar = document.querySelector(selector);
    if(toolbar) {
      return toolbar;
    } 
    return null;
   }
}
function createAIButton() {
   const button = document.createElement('div');
   const box = document.querySelector('.aDh');
   const space = document.querySelector('.U6Cexb');
  //  box.className = 'aDh';
  space.style.margin = '0px';
   box.style.display = 'flex';
   box.style.flexDirection = 'row';
   button.className = 'T-I J-J5-Ji aoO v7 T-I-atl L3';
   button.style.marginRight = '-18px';
   button.style.margin = '10px 5px 5px 5px';
   button.innerHTML = 'AI Reply';
   button.setAttribute('role', 'button');
   button.setAttribute('data-tooltip', 'Generate AI Reply');
   return button;
}
function getEmailContent() {
   const selectors = [
    '.h7', // Gmail's new compose toolbar
    '.a3s.ail', // Gmail's older compose toolbar
    '.gmail_quote', // Quoted email content
    '[role="presentation"]'
   ];
   for(const selector of selectors) {
    const content = document.querySelector(selector);
    if(content) {
      return content.innerText.trim();
    } 
    return '';
   }
}
function injectButton() {
   const existingButton = document.querySelector(".ai-reply-button");
   if (existingButton) {
     existingButton.remove();
   }
   const toolbar = findComposeToolbar();
   if(!toolbar){
    console.log("Toolbar not found");
    return;
   }
   console.log("Toolbar found");
   const button = createAIButton();
   button.classList.add('ai-reply-button');
   button.addEventListener('click', async () => {
      try {
        button.innerHTML = "Generating...";
        button.disabled = true;
        const emailContent = getEmailContent();
        const response = await fetch('http://localhost:8080/api/email/generate',{
          method:'POST',
          headers:{
            'Content-Type':'application/json',
          },
          body: JSON.stringify({  emailContent: emailContent,tone:"professional" })
        })
        if(!response.ok){
          throw new Error("Api Request failed");
        }
        const generatedReply = await response.text();
        const composeBox = document.querySelector('[g_editable="true"][role="textbox"]');
        if(composeBox) {
          composeBox.focus();
          document.execCommand('insertText', false, generatedReply);
        } 
        else{
          
          console.error('Compose box not found');
        }

      } catch (error) {
        console.error(error);
       alert("Error generating AI reply:");
      
      }
      finally{
        button.innerHTML = 'AI Reply';
        button.disabled = false;

      }
   });
   toolbar.insertBefore(button, toolbar.firstChild); 
}
const observer = new MutationObserver((mutations) => {
  console.log("nishar......😎😎");
  for(const mutation of mutations) {
    const addedNodes = Array.from(mutation.addedNodes);
    const hasComposeElements = addedNodes.some(node=>
      node.nodeType === Node.ELEMENT_NODE &&(node.matches('.aDh, .btC,[role="dialog"]') || node.querySelector('.aDh,.btC,[role="dialog"]'))
    );
    if(hasComposeElements){
      console.log("Compose window detected");
      setTimeout(injectButton, 500);
    }
  }
});
observer.observe(document.body, { childList: true, subtree: true });