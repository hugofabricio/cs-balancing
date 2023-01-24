const { buildSizeEntities, mapEntities, arraySeq } = require("./utils");
const customerSuccessBalancingRules = require("./customer-success-balancing-rules");

describe("validate cs", () => {
  test("have exceeded the max quantity accepted", () => {
    const css = mapEntities(arraySeq(1999, 1));

    expect(customerSuccessBalancingRules.customerSuccess(css)).toEqual(
      "Total de CS acima do permitido. (Max 999)"
    );
  });

  test("in the max quantity accepted", () => {
    const css = mapEntities(arraySeq(56, 1));

    expect(customerSuccessBalancingRules.customerSuccess(css)).toBeUndefined();
  });
});

describe("validate customers", () => {
  test("have exceeded the max quantity accepted", () => {
    const customers = buildSizeEntities(1000000, 998);

    expect(customerSuccessBalancingRules.customers(customers)).toEqual(
      "Total de clientes acima do permitido. (Max 999999)"
    );
  });

  test("in the max quantity accepted", () => {
    const customers = buildSizeEntities(23213, 998);

    expect(customerSuccessBalancingRules.customers(customers)).toBeUndefined();
  });
});
