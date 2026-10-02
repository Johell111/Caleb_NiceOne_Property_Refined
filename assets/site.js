(() => {
  'use strict';

  const businessPhone = '2348023292798';
  const defaultEnquiry = 'Hello Caleb NiceOne Property, I would like to make an enquiry.';
  const whatsappUrl = message => `https://wa.me/${businessPhone}?text=${encodeURIComponent(message)}`;

  document.querySelectorAll('[data-year]').forEach(element => {
    element.textContent = String(new Date().getFullYear());
  });

  // Keep links native so keyboard, modified clicks and the no-JS fallback work.
  document.querySelectorAll('a[data-whatsapp]').forEach(link => {
    link.href = whatsappUrl(link.dataset.message || defaultEnquiry);
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
  });

  const menuButton = document.querySelector('[data-menu]');
  const navigation = document.querySelector('[data-nav]');
  if (menuButton && navigation) {
    const mobile = window.matchMedia('(max-width: 980px)');
    navigation.id ||= 'primary-navigation';
    menuButton.type = 'button';
    menuButton.setAttribute('aria-controls', navigation.id);

    const setMenuOpen = (open, restoreFocus = false) => {
      const isOpen = Boolean(open && mobile.matches);
      navigation.classList.toggle('open', isOpen);
      menuButton.setAttribute('aria-expanded', String(isOpen));
      menuButton.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
      if (restoreFocus && mobile.matches) menuButton.focus();
    };

    setMenuOpen(false);
    menuButton.addEventListener('click', () => setMenuOpen(!navigation.classList.contains('open')));
    navigation.addEventListener('click', event => {
      if (event.target.closest('a')) setMenuOpen(false);
    });
    document.addEventListener('click', event => {
      if (!navigation.contains(event.target) && !menuButton.contains(event.target)) setMenuOpen(false);
    });
    document.addEventListener('focusin', event => {
      if (!navigation.contains(event.target) && !menuButton.contains(event.target)) setMenuOpen(false);
    });
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && navigation.classList.contains('open')) {
        event.preventDefault();
        setMenuOpen(false, true);
      }
    });
    mobile.addEventListener('change', () => setMenuOpen(false));
  }

  const purchaseBudgets = [
    'Under ₦20 million',
    '₦20 million – ₦50 million',
    '₦50 million – ₦100 million',
    '₦100 million – ₦250 million',
    '₦250 million and above'
  ];
  const budgetConfigurations = {
    Buy: {
      label: 'Purchase budget (required)',
      required: true,
      help: 'Choose your total purchase budget. If you are still deciding, select “Discuss my budget”.',
      choices: [...purchaseBudgets, 'Discuss my budget']
    },
    Invest: {
      label: 'Investment budget (required)',
      required: true,
      help: 'Choose the amount you plan to invest. You can also discuss your budget with the team.',
      choices: [...purchaseBudgets, 'Discuss my budget']
    },
    Rent: {
      label: 'Annual rental budget (required)',
      required: true,
      help: 'These ranges are for annual rent. Add your preferred rental period or other costs in the note below.',
      choices: ['Under ₦1 million per year', '₦1 million – ₦3 million per year', '₦3 million – ₦5 million per year', '₦5 million – ₦10 million per year', '₦10 million and above per year', 'Discuss my budget']
    },
    Sell: {
      label: 'Expected property value (optional)',
      required: false,
      help: 'If you have an expected value, choose a range. You can leave this blank and discuss valuation instead.',
      choices: [...purchaseBudgets, 'Discuss property valuation']
    },
    'Property management': {
      label: 'Service budget (optional)',
      required: false,
      help: 'Management fees depend on the property and scope of work. Add any budget or service requirements in the note below.',
      choices: ['Discuss service scope and fees', 'I have a service budget to discuss']
    },
    'Property marketing': {
      label: 'Marketing budget (optional)',
      required: false,
      help: 'Add your marketing budget or property details in the note below, or discuss the scope with the team.',
      choices: ['Discuss marketing scope and fees', 'I have a marketing budget to discuss']
    }
  };

  const finderForm = document.querySelector('#finderForm');
  const contactForm = document.querySelector('#contactForm');
  const query = new URLSearchParams(window.location.search);

  if (finderForm) {
    const goals = [...finderForm.querySelectorAll('input[name="goal"]')];
    const requestedGoal = query.get('goal');
    const requestedChoice = goals.find(input => input.value === requestedGoal);
    if (requestedChoice) requestedChoice.checked = true;

    const budget = finderForm.elements.namedItem('budget');
    const budgetLabel = finderForm.querySelector('#budget-label') || finderForm.querySelector('label[for="budget"]');
    const budgetHelp = finderForm.querySelector('[data-budget-help]');
    const updateBudgets = () => {
      if (!(budget instanceof HTMLSelectElement)) return;
      const goal = goals.find(input => input.checked)?.value;
      const configuration = budgetConfigurations[goal] || {
        label: 'Budget (optional)', required: false,
        help: 'Select your goal above to see the relevant budget choices.',
        choices: ['Discuss my budget']
      };
      budget.replaceChildren();
      budget.append(new Option(configuration.required ? 'Choose a budget' : 'Select if applicable', ''));
      configuration.choices.forEach(choice => budget.append(new Option(choice, choice)));
      budget.required = configuration.required;
      budget.setCustomValidity('');
      if (budgetLabel) budgetLabel.textContent = configuration.label;
      if (budgetHelp) budgetHelp.textContent = configuration.help;
    };
    updateBudgets();
    goals.forEach(input => input.addEventListener('change', updateBudgets));
  }

  if (contactForm) {
    const interest = contactForm.elements.namedItem('interest');
    const requestedInterest = query.get('interest');
    if (interest instanceof HTMLSelectElement && [...interest.options].some(option => option.value === requestedInterest)) {
      interest.value = requestedInterest;
    }
  }

  const validateField = field => {
    if (!(field instanceof HTMLInputElement || field instanceof HTMLTextAreaElement || field instanceof HTMLSelectElement)) return;
    field.setCustomValidity('');
    if (field instanceof HTMLInputElement && (field.type === 'radio' || field.type === 'checkbox')) return;
    if (field.required && !field.value.trim()) {
      field.setCustomValidity('Please complete this field.');
      return;
    }
    if (field.name === 'phone' && field.value.trim()) {
      const value = field.value.trim();
      const digits = value.replace(/\D/g, '');
      if (!/^\+?[\d\s().-]+$/.test(value) || digits.length < 7 || digits.length > 15) {
        field.setCustomValidity('Enter a valid phone number. Spaces, brackets, dashes and an international country code are welcome.');
      }
    }
  };

  const connectForm = (form, createMessage) => {
    if (!form) return;
    // Validate after trimming so whitespace cannot satisfy a required field.
    form.noValidate = true;
    const status = form.querySelector('[data-form-status]');
    form.querySelectorAll('[data-form-submit]').forEach(button => { button.disabled = false; });
    const clearStatus = () => { if (status) status.replaceChildren(); };
    form.addEventListener('input', event => {
      validateField(event.target);
      clearStatus();
    });
    form.addEventListener('change', event => {
      validateField(event.target);
      clearStatus();
    });

    form.addEventListener('submit', event => {
      event.preventDefault();
      clearStatus();
      [...form.elements].forEach(field => {
        if (field instanceof HTMLTextAreaElement || (field instanceof HTMLInputElement && ['text', 'tel', 'email', 'search'].includes(field.type))) {
          field.value = field.value.trim();
        }
        validateField(field);
      });
      if (!form.reportValidity()) return;

      const data = new FormData(form);
      const value = (name, fallback = 'Not specified') => String(data.get(name) || '').trim() || fallback;
      const url = whatsappUrl(createMessage(value));
      if (status) {
        const explanation = document.createElement('p');
        explanation.textContent = 'Your brief is ready. Review it in WhatsApp and tap Send to finish. If a new tab did not open, use the link below.';
        const fallback = document.createElement('a');
        fallback.href = url;
        fallback.target = '_blank';
        fallback.rel = 'noopener noreferrer';
        fallback.textContent = 'Open your prepared WhatsApp message';
        status.append(explanation, fallback);
      }
      try {
        window.open(url, '_blank', 'noopener,noreferrer');
      } catch {
        // The visible link above remains available when a browser blocks popups.
      }
    });
  };

  connectForm(contactForm, value => [
    defaultEnquiry, '',
    `Name: ${value('name')}`,
    `Phone: ${value('phone')}`,
    `Email: ${value('email', 'Not provided')}`,
    `Interest: ${value('interest')}`,
    `Preferred location: ${value('location')}`,
    `Message: ${value('message', 'None')}`
  ].join('\n'));

  connectForm(finderForm, value => [
    'Hello Caleb NiceOne Property, please help me with this property brief.', '',
    `Goal: ${value('goal')}`,
    `Property type: ${value('type')}`,
    `Preferred location: ${value('location')}`,
    `Budget / expected value: ${value('budget', 'To be discussed')}`,
    `Name: ${value('name')}`,
    `Phone: ${value('phone')}`,
    `Extra note: ${value('note', 'None')}`
  ].join('\n'));
})();
