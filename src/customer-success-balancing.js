const customerSuccessBalancingRules = require("./customer-success-balancing-rules");

/**
 * Returns the id of the CustomerSuccess with the most customers
 * @param {array} customerSuccess
 * @param {array} customers
 * @param {array} customerSuccessAway
 */
function customerSuccessBalancing(
  customerSuccess,
  customers,
  customerSuccessAway
) {
  const errors = customerSuccessBalancingRules.validate({
    customerSuccess,
    customers,
    customerSuccessAway,
  });

  if (Object.keys(errors).length) {
    return errors;
  }

  const filteredCustomersSuccess = customerSuccess
    .filter((cs) => !customerSuccessAway.includes(cs.id))
    .sort((a, b) => a.score - b.score);

  let currentMinScore = 0;
  let currentMaxCalls = 0;

  customers
    .sort((c1, c2) => c1.score - c2.score)
    .forEach((customer) => {
      if (customer.score === currentMinScore) return;

      const cs = filteredCustomersSuccess.find(
        (cs) => cs.score >= customer.score
      );

      if (!cs) return;

      cs.calls = (cs.calls || 0) + 1;

      if (cs.calls > currentMaxCalls) {
        currentMaxCalls = cs.calls;
      }

      currentMinScore = cs.score;
    });

  const customerSuccessWithMoreCalls = customerSuccess.filter(
    (c) => c.calls === currentMaxCalls
  );

  const hasTiedCustomersSuccess = customerSuccessWithMoreCalls.length > 1;
  const noCustomersSuccessAvailable = customerSuccessWithMoreCalls.length === 0;

  if (hasTiedCustomersSuccess || noCustomersSuccessAvailable) {
    return 0;
  }

  return customerSuccessWithMoreCalls[0].id;
}

module.exports = customerSuccessBalancing;
