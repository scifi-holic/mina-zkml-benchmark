import { ZkProgram, Int64, Provable } from 'o1js';

const LinearRegression = ZkProgram({
    name: 'LinearRegression',
    publicOutput: Int64,
  methods: {
    predict: {
      privateInputs: [Provable.Array(Int64, 2)],

      method(input: Int64[]): Int64 {
        const coefficients = [Int64.from(5), Int64.from(5)];
        const intercept = Int64.from(0);
        let dotProduct = Int64.from(0);

        for (let i = 0; i < coefficients.length; i++) {
          dotProduct = dotProduct.add(coefficients[i].mul(input[i]));
        }

        const z = dotProduct.div(10).add(intercept); 
        return z;
    },
  },
},
});