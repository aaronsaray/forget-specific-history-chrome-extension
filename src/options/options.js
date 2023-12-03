customElements.define('options-form', class extends HTMLElement {
    async connectedCallback() {
        this.innerHTML = '<form><fieldset></fieldset></form>';
        const form = this.querySelector('form');
        this.fields = form.querySelector('fieldset');

        const { domains } = await chrome.storage.sync.get('domains');
        if (Array.isArray(domains)) {
            domains.forEach(domain => this.addRow(domain));
        }

        const actions = document.getElementById('domain-action-row').content.cloneNode(true);
        actions.querySelector('a').addEventListener('click', e => {
            e.preventDefault();
            this.addRow('', true);
        });
        form.append(actions);

        form.addEventListener('submit', e => this.saveDomains(e));
    }

    addRow(domain, shouldFocus) {
        const template = document.getElementById('domain-row').content.cloneNode(true);
        template.querySelector('input').value = domain;
        template.querySelector('.remove-row').addEventListener('click', c => {
            c.preventDefault();
            const row = c.currentTarget.parentNode;
            row.parentNode.removeChild(row);
        })
        this.fields.append(template);
        shouldFocus && this.fields.querySelector('div:last-of-type input').focus();
    }

    async saveDomains(e) {
        e.preventDefault();
        const form = e.currentTarget;
        const formData = new FormData(form);
        let domains = [];
        formData.forEach(el => {
            domains.push(el);
        });

        await chrome.storage.sync.set({
            domains
        });

        const success = this.querySelector('.success');
        success.style.opacity = 1;
        setTimeout(() => {
            success.style.opacity = 0;
        }, 4000);
    }
});