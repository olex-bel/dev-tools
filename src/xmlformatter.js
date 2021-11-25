(function () {
    var XMLFormatter = require('./libs/xml-formatter');
    var ResultContainer = require('./result-container');
    var TextAreaActions = require('./textarea-actions');

    var resultContainer = new ResultContainer();
    var xmlTextArea = new TextAreaActions({
        selectors: {
            textArea: '#xml-text',
        },
        callbacks: {
            validate: validate,
            clear: clear,
        }
    });

    function clear() {
        resultContainer.clear();
    }

    function validate() {
        const xmlText = xmlTextArea.getText();
        let formattedXml;

        resultContainer.clear();

        try {
            formattedXml = XMLFormatter(xmlText);
            xmlTextArea.setText(formattedXml);
        } catch (e) {
            resultContainer.showErrorMessage('XML cannot be formatted.')
        }
    }

})();