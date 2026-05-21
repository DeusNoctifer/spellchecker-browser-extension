let timerPausa = null;

document.addEventListener('input', function (event) {
    const target = event.target;

    if (target.tagName === 'TEXTAREA' || (target.tagName === 'INPUT' && target.type === 'text')) {

        clearTimeout(timerPausa);

        timerPausa = setTimeout(() => {
            let textoActual = target.value;

            if (textoActual.length > 3) {

                chrome.runtime.sendMessage(
                    { action: "checkSpelling", text: textoActual },
                    function (response) {

                        if (response && response.result && response.result.matches.length > 0) {

                            let nuevoTexto = textoActual;

                            let errores = response.result.matches;

                            for (let i = errores.length - 1; i >= 0; i--) {

                                let error = errores[i];
                                let mejorSugerencia = error.replacements[0]?.value;

                                if (mejorSugerencia) {

                                    nuevoTexto =
                                        nuevoTexto.substring(0, error.offset) +
                                        mejorSugerencia +
                                        nuevoTexto.substring(error.offset + error.length);
                                }
                            }

                            target.value = nuevoTexto;
                        }
                    }
                );
            }
        }, 1000);
    }
});