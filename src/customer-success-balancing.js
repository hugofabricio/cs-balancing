// const customerSuccessBalancingRules = require("./customer-success-balancing-rules");

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
  customerSuccess = customerSuccess.sort((cs1, cs2) => cs1.score - cs2.score);

  let minScore = 0;
  let maxCalls = 0;

  customers
    .sort((c1, c2) => c1.score - c2.score)
    .forEach((customer) => {
      if (customer.score >= minScore) {
        const cs = customerSuccess.find(
          (cs) =>
            !customerSuccessAway.includes(cs.id) && cs.score >= customer.score
        );

        if (cs) {
          cs.calls = cs.calls || 0;

          if (++cs.calls > maxCalls) {
            maxCalls = cs.calls;
          }

          minScore = cs.score;
        }
      }
    });

  const customerSuccessWithMoreCalls = customerSuccess.filter(
    (c) => c.calls === maxCalls
  );

  const hasTiedCustomersSuccess = customerSuccessWithMoreCalls.length > 1;
  const noCustomersSuccessAvailable = customerSuccessWithMoreCalls.length === 0;

  if (hasTiedCustomersSuccess || noCustomersSuccessAvailable) {
    return 0;
  }

  return customerSuccessWithMoreCalls[0].id;
}

module.exports = customerSuccessBalancing;
