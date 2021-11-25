
function TextAreaActions(config) {

    config = config || {};

    this.config = {
        selectors: Object.assign({
            textArea: '',
            validateButton: '#validate-button',
            clearButton: '#clear-button',
            copyButton: '#copy-button',
        }, config.selectors),
        callbacks: Object.assign({
            validate: null,
            clear: null,
            copy: null,
        }, config.callbacks),
    };

    this.validateButton = document.querySelector(this.config.selectors.validateButton);
    this.clearButton = document.querySelector(this.config.selectors.clearButton);
    this.copyButton = document.querySelector(this.config.selectors.copyButton);
    this.textArea = document.querySelector(this.config.selectors.textArea);

    this.validateButton.addEventListener('click', this.onValidate.bind(this));
    this.clearButton.addEventListener('click', this.onClear.bind(this));
    this.copyButton.addEventListener('click', this.onCopy.bind(this));
}

TextAreaActions.prototype = {
    getText: function () {
        return this.textArea.value;
    },
    setText: function (text) {
        this.textArea.value = text;
    },
    onValidate: function () {
        if (this.config.callbacks.validate) {
            this.config.callbacks.validate();
        }
    },
    onClear: function () {

        this.textArea.value = '';

        if (this.config.callbacks.clear) {
            this.config.callbacks.clear();
        }
    },
    onCopy: function () {

        this.textArea.select();
        this.textArea.setSelectionRange(0, 99999);
        navigator.clipboard.writeText(this.getText());

        if (this.config.callbacks.copy) {
            this.config.callbacks.copy();
        }
    },
}

module.exports = TextAreaActions;