// import { ZkProgram, Int64, Provable } from 'o1js';

// const LinearRegression = ZkProgram({
//     name: 'LinearRegression',
//     publicOutput: Int64,
//   methods: {
//     predict: {
//       privateInputs: [Provable.Array(Int64, 2)],

//       method(input: Int64[]): Int64 {
//         const coefficients = [Int64.from(5), Int64.from(5)];
//         const intercept = Int64.from(0);
//         let dotProduct = Int64.from(0);

//         for (let i = 0; i < coefficients.length; i++) {
//           dotProduct = dotProduct.add(coefficients[i].mul(input[i]));
//         }

//         const z = dotProduct.div(10).add(intercept); 
//         return z;
//     },
//   },
// },
// });

import { Field, SelfProof, ZkProgram, verify } from 'o1js';

const LinearRegression = ZkProgram({
  name: 'linear-regression',
  publicInput: Field,

  methods: {
    init: {
      privateInputs: [],

      async method(state: Field) {
        state.assertEquals(Field(0));
      },
    },

    predict: {
      privateInputs: [SelfProof, Field],

      async method(
        newState: Field,
        earlierProof: SelfProof<Field, void>,
        numberToAdd: Field
      ) {
        earlierProof.verify();
        newState.assertEquals(earlierProof.publicInput.add(numberToAdd));
      },
    },

  },
});

async function main() {
  console.log('compiling...');

  const { verificationKey } = await LinearRegression.compile();

  console.log('making proof 0');

  const proof0 = await LinearRegression.init(Field(0));

  console.log('making proof 2');

  const proof2 = await LinearRegression.predict(Field(4), proof0, Field(4);

  console.log('verifying proof 2');
  console.log('proof 2 data', proof2.publicInput.toString());

  const ok = await verify(proof2.toJSON(), verificationKey);
  console.log('ok', ok);
}

main();
