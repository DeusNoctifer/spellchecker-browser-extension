let timerPausa = null;

document.addEventListener('input', function(event) {
  const target = event.target;
  
  if (target.tagName === 'TEXTAREA' || (target.tagName === 'INPUT' && target.type === 'text')) {
    
    clearTimeout(timerPausa);
    
    timerPausa = setTimeout(() => {
      let textoActual = target.value;
      
      if (textoActual.length > 3) {
        
        chrome.runtime.sendMessage(
          { action: "checkSpelling", text: textoActual }, 
          function(response) {
            
            if (response && response.result && response.result.matches.length > 0) {
              
              let error = response.result.matches[0];
              let mejorSugerencia = error.replacements[0]?.value;
              
              if (mejorSugerencia) {
                let nuevoTexto = textoActual.substring(0, error.offset) + 
                                 mejorSugerencia + 
                                 textoActual.substring(error.offset + error.length);
                
                target.value = nuevoTexto;
              }
            }
          }
        );
      }
    }, 1000); 
  }
});