const MAX_ACCEPT_CS = 999;
const MAX_ACCEPT_CUSTOMERS = 999999;

const customerSuccessBalancingRules = {
  customerSuccess: function ({ customerSuccess }) {
    const total = customerSuccess.length;

    if (total > MAX_ACCEPT_CS) {
      return `Total de CS acima do permitido. (Max ${MAX_ACCEPT_CS})`;
    }
  },
  customers: function ({ customers }) {
    const total = customers.length;

    if (total > MAX_ACCEPT_CUSTOMERS) {
      return `Total de clientes acima do permitido. (Max ${MAX_ACCEPT_CUSTOMERS})`;
    }
  },
  customerSuccessAway: function ({ customerSuccess, customerSuccessAway }) {
    const total = customerSuccessAway.length;
    const maxCustomersSuccessAway = Math.floor(customerSuccess.length / 2);

    if (total > maxCustomersSuccessAway) {
      return `Número de abstenções acima do permitido. (Max ${maxCustomersSuccessAway})`;
    }
  },
  validate: function (data = {}) {
    let errorBag = {};

    Object.keys(data).forEach((key) => {
      const validateRule = this[key];
      if (!validateRule) return;

      let error = validateRule(data);

      if (error) {
        errorBag[key] = error;
      }
    });

    return errorBag;
  },
};

module.exports = customerSuccessBalancingRules;
