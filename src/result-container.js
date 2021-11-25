
function ResultContainer(config) {

    config = config || {};

    this.config = {
        selectors: Object.assign({
            resultMessage: '#result-message',
            resultContainer: '#result-container',
        }, config.selectors),
        classes: Object.assign({
            validContainer: 'result-container--valid',
            errorContainer: 'result-container--error',
        }, config.classes),
    };

    this.textResultMessage = document.querySelector(this.config.selectors.resultMessage);
    this.resultContainer = document.querySelector(this.config.selectors.resultContainer);
}

ResultContainer.prototype = {
    clear: function () {
        this.textResultMessage.innerText = '';
        this.resultContainer.classList.remove(this.config.classes.validContainer);
        this.resultContainer.classList.remove(this.config.classes.errorContainer);
    },
    showErrorMessage: function (message) {
        this.textResultMessage.innerHTML = message;
        this.resultContainer.classList.add(this.config.classes.errorContainer);
        this.resultContainer.classList.remove(this.config.classes.validContainer);

    },
    showValidMessage: function (message) {
        this.textResultMessage.innerHTML = message;
        this.resultContainer.classList.add(this.config.classes.validContainer);
        this.resultContainer.classList.remove(this.config.classes.errorContainer);
    },
};

module.exports = ResultContainer;