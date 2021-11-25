(function () {
    var ResultContainer = require('./result-container');
    var TextAreaActions = require('./textarea-actions');
    var JSONLinter = require('./libs/json-linter');

    var resultContainer = new ResultContainer();
    var jsonTextArea = new TextAreaActions({
        selectors: {
            textArea: '#json-text',
        },
        callbacks: {
            validate: validate,
            clear: clear,
        }
    });

    function validate() {
        const jsonText = jsonTextArea.getText();
        const validationStatus = validateJSON(jsonText);

        resultContainer.clear();

        if (!validationStatus.valid) {
            showError(validationStatus);
            return;
        }

        const formatStatus = formatJSON(jsonText);

        if (formatStatus.error) {
            showError(formatStatus);
            return;
        }

        resultContainer.showValidMessage('Valid JSON!');
        jsonTextArea.setText(formatStatus.formattedJSON);
    }

    function clear() {
        resultContainer.clear();
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

    function showError(params) {
        let { errorMessage, errorCodeSnippet } = params;
        let message = '<p>' + errorMessage + '</p>';

        if (errorCodeSnippet) {
            const lastNewLineIndex = errorCodeSnippet.lastIndexOf('\r');
            const padding = lastNewLineIndex === -1 ? errorCodeSnippet.length : errorCodeSnippet.length - lastNewLineIndex;

            message += '<pre><br/>' + errorCodeSnippet + '<br/>';
            message += ' '.repeat(padding - 1) + '^</pre>';
        }

        resultContainer.showErrorMessage(message);
    }
})();
