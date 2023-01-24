const MAX_ACCEPT_CS = 999;
const MAX_ACCEPT_CS_SCORE = 9999;
const MAX_ACCEPT_CUSTOMERS = 999999;

const customerSuccessBalancingRules = {
  customerSuccess: function ({ customerSuccess }) {
    const errors = [];
    const total = customerSuccess.length;

    if (total > MAX_ACCEPT_CS) {
      errors.push(`Total de CS acima do permitido. (Max ${MAX_ACCEPT_CS})`);
    }

    if (customerSuccess.some((cs) => cs.score > MAX_ACCEPT_CS_SCORE)) {
      errors.push(
        `Nível do CS acima do permitido. (Max ${MAX_ACCEPT_CS_SCORE})`
      );
    }

    return errors;
  },
  customers: function ({ customers }) {
    const errors = [];
    const total = customers.length;

    if (total > MAX_ACCEPT_CUSTOMERS) {
      errors.push(
        `Total de clientes acima do permitido. (Max ${MAX_ACCEPT_CUSTOMERS})`
      );
    }

    return errors;
  },
  customerSuccessAway: function ({ customerSuccess, customerSuccessAway }) {
    const errors = [];
    const total = customerSuccessAway.length;
    const maxCustomersSuccessAway = Math.floor(customerSuccess.length / 2);

    if (total > maxCustomersSuccessAway) {
      errors.push(
        `Número de abstenções acima do permitido. (Max ${maxCustomersSuccessAway})`
      );
    }

    return errors;
  },
  validate: function (data = {}) {
    let errorBag = {};

    Object.keys(data).forEach((key) => {
      const validateRule = this[key];
      if (!validateRule) return;

      let errors = validateRule(data);

      if (errors.length) {
        errorBag[key] = errors;
      }
    });

    return errorBag;
  },
  has: function (errors) {
    return Object.keys(errors).length > 0;
  },
};

module.exports = customerSuccessBalancingRules;
