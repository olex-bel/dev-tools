(function () {
    var jsonTextArea = document.querySelector('#json-text');
    var validateButton = document.querySelector('#validate-button');
    var clearButton = document.querySelector('#clear-button');
    var textResultMessage = document.querySelector('#result-message');
    var resultContainer = document.querySelector('#result-container');

    validateButton.addEventListener('click', validate);
    clearButton.addEventListener('click', clear);

    function validate() {
        const jsonText = jsonTextArea.value;
        const validationStatus = validateJSON(jsonText);

        clearResultContainerState();

        if (!validationStatus.valid) {
            showError(validationStatus);
            return;
        }

        const formatStatus = formatJSON(jsonText);

        if (formatStatus.error) {
            showError(formatStatus);
            return;
        }

        setValidResultContainerState();
        jsonTextArea.value = formatStatus.formattedJSON;
        textResultMessage.innerHTML = 'Valid JSON!'
    }

    function clear() {
        clearTextArea();
        clearResult();
    }

    function validateJSON(json) {
        const linter = new JSONLinter(json);
        return linter.validate();
    }

    function formatJSON(json) {
        var status = {
            error: false
        };

        try {
            const data = JSON.parse(json);

            status.formattedJSON = JSON.stringify(data, null, 4);
        } catch (e) {
            status.error = true;
            status.errorMessage = e.message;
        }

        return status;
    }

    function clearTextArea() {
        jsonTextArea.value = '';
    }

    function clearResult() {
        textResultMessage.innerText = '';
        clearResultContainerState();
    }

    function showError(params) {
        let { errorMessage, errorCodeSnippet } = params;
        let message = '<p>' + errorMessage + '</p>';

        if (errorCodeSnippet) {
            const lastNewLineIndex = errorCodeSnippet.lastIndexOf('\r');
            const padding = lastNewLineIndex === -1 ? errorCodeSnippet.length : errorCodeSnippet.length - lastNewLineIndex;

            message += '<pre><br/>' + errorCodeSnippet + '<br/>';
            message += ' '.repeat(padding - 1) + '^</pre>';
        }

        textResultMessage.innerHTML = message;
        setErrorResultContainerState();
    }

    function setErrorResultContainerState() {
        resultContainer.classList.add('jsonlint__result-container--error');
        resultContainer.classList.remove('jsonlint__result-container--valid');
    }

    function setValidResultContainerState() {
        resultContainer.classList.add('jsonlint__result-container--valid');
        resultContainer.classList.remove('jsonlint__result-container--error');
    }

    function clearResultContainerState() {
        resultContainer.classList.remove('jsonlint__result-container--valid');
        resultContainer.classList.remove('jsonlint__result-container--error');
    }
})();
