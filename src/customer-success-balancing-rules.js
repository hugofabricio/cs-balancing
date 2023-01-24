const MAX_ACCEPT_CS = 999;
const MAX_ACCEPT_CUSTOMERS = 999999;

const customerSuccessBalancingRules = {
  customerSuccess: function (data) {
    const total = data.length;

    if (total > MAX_ACCEPT_CS) {
      return `Total de CS acima do permitido. (Max ${MAX_ACCEPT_CS})`;
    }
  },
  customers: function (data) {
    const total = data.length;

    if (total > MAX_ACCEPT_CUSTOMERS) {
      return `Total de clientes acima do permitido. (Max ${MAX_ACCEPT_CUSTOMERS})`;
    }
  },
  validate: function (data = {}) {
    let errorBag = {};

    Object.entries(data).forEach(([key, value]) => {
      const validateRule = this[key];
      if (!validateRule) return;

      let error = validateRule(value);

      if (error) {
        errorBag[key] = error;
      }
    });

    return errorBag;
  },
};

module.exports = customerSuccessBalancingRules;
