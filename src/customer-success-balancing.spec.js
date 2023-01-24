const customerSuccessBalancing = require("./customer-success-balancing");
const { mapEntities, buildSizeEntities, arraySeq } = require("./utils");

test("Scenario 1", () => {
  const css = [
    { id: 1, score: 60 },
    { id: 2, score: 20 },
    { id: 3, score: 95 },
    { id: 4, score: 75 },
  ];
  const customers = [
    { id: 1, score: 90 },
    { id: 2, score: 20 },
    { id: 3, score: 70 },
    { id: 4, score: 40 },
    { id: 5, score: 60 },
    { id: 6, score: 10 },
  ];
  const csAway = [2, 4];

  expect(customerSuccessBalancing(css, customers, csAway)).toEqual(1);
});

test("Scenario 2", () => {
  const css = mapEntities([11, 21, 31, 3, 4, 5]);
  const customers = mapEntities([10, 10, 10, 20, 20, 30, 30, 30, 20, 60]);
  const csAway = [];

  expect(customerSuccessBalancing(css, customers, csAway)).toEqual(0);
});

test("Scenario 3", () => {
  const testTimeoutInMs = 100;
  const testStartTime = new Date().getTime();

  const css = mapEntities(arraySeq(999, 1));
  const customers = buildSizeEntities(10000, 998);
  const csAway = [999];

  expect(customerSuccessBalancing(css, customers, csAway)).toEqual(998);

  if (new Date().getTime() - testStartTime > testTimeoutInMs) {
    throw new Error(`Test took longer than ${testTimeoutInMs}ms!`);
  }
});

test("Scenario 4", () => {
  const css = mapEntities([1, 2, 3, 4, 5, 6]);
  const customers = mapEntities([10, 10, 10, 20, 20, 30, 30, 30, 20, 60]);
  const csAway = [];

  expect(customerSuccessBalancing(css, customers, csAway)).toEqual(0);
});

test("Scenario 5", () => {
  const css = mapEntities([100, 2, 3, 6, 4, 5]);
  const customers = mapEntities([10, 10, 10, 20, 20, 30, 30, 30, 20, 60]);
  const csAway = [];

  expect(customerSuccessBalancing(css, customers, csAway)).toEqual(1);
});

test("Scenario 6", () => {
  const css = mapEntities([100, 99, 88, 3, 4, 5]);
  const customers = mapEntities([10, 10, 10, 20, 20, 30, 30, 30, 20, 60]);
  const csAway = [1, 3, 2];

  expect(customerSuccessBalancing(css, customers, csAway)).toEqual(0);
});

test("Scenario 7", () => {
  const css = mapEntities([100, 99, 88, 3, 4, 5]);
  const customers = mapEntities([10, 10, 10, 20, 20, 30, 30, 30, 20, 60]);
  const csAway = [4, 5, 6];

  expect(customerSuccessBalancing(css, customers, csAway)).toEqual(3);
});

test("Scenario 8 - Validate max customers success accepted", () => {
  const css = mapEntities(arraySeq(1000, 1));
  const customers = buildSizeEntities(10000, 998);
  const csAway = [4, 5, 6];

  expect(customerSuccessBalancing(css, customers, csAway)).toEqual({
    customerSuccess: ["Total de CS acima do permitido. (Max 999)"],
  });
});

test("Scenario 9 - Validate max customers success score accepted", () => {
  const css = mapEntities(arraySeq(400, 9800));
  const customers = buildSizeEntities(10000, 998);
  const csAway = [4, 5, 6];

  expect(customerSuccessBalancing(css, customers, csAway)).toEqual({
    customerSuccess: ["Nível do CS acima do permitido. (Max 9999)"],
  });
});

test("Scenario 10 - Validate max customers accepted", () => {
  const css = mapEntities(arraySeq(238, 1));
  const customers = buildSizeEntities(1000000, 643);
  const csAway = [4, 5, 6];

  expect(customerSuccessBalancing(css, customers, csAway)).toEqual({
    customers: ["Total de clientes acima do permitido. (Max 999999)"],
  });
});

test("Scenario 11 - Validate max customers success away accepted", () => {
  const css = mapEntities(arraySeq(238, 1));
  const customers = buildSizeEntities(100000, 643);
  const csAway = arraySeq(300, 1);

  expect(customerSuccessBalancing(css, customers, csAway)).toEqual({
    customerSuccessAway: ["Número de abstenções acima do permitido. (Max 119)"],
  });
});

test("Scenario 12 - Validate all rules max accepted", () => {
  const css = mapEntities(arraySeq(1001, 9999));
  const customers = buildSizeEntities(1100001, 122);
  const csAway = arraySeq(600, 1);

  expect(customerSuccessBalancing(css, customers, csAway)).toEqual({
    customerSuccess: [
      "Total de CS acima do permitido. (Max 999)",
      "Nível do CS acima do permitido. (Max 9999)",
    ],
    customers: ["Total de clientes acima do permitido. (Max 999999)"],
    customerSuccessAway: ["Número de abstenções acima do permitido. (Max 500)"],
  });
});
