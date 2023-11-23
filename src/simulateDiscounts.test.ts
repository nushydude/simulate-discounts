const simulateDiscounts = require('./simulateDiscounts');

describe('simulateDiscounts', () => {
  describe('Given N is less than 1', () => {
    it('should throw an error', () => {
      expect(() => simulateDiscounts(0, 1)).toThrow();
      expect(() => simulateDiscounts(-1, 1)).toThrow();
    });
  });

  describe('Given N is not an integer', () => {
    it('should throw an error', () => {
      expect(() => simulateDiscounts(0.1, 1)).toThrow();
    });
  });

  describe('Given K is less than 1', () => {
    it('should throw an error', () => {
      expect(() => simulateDiscounts(1, 0)).toThrow();
      expect(() => simulateDiscounts(1, -1)).toThrow();
    });
  });

  describe('Given K is not an integer', () => {
    it('should throw an error', () => {
      expect(() => simulateDiscounts(1, 0.1)).toThrow();
    });
  });

  describe('Given N and K are positive integers', () => {
    describe('When N and K are the smallest values', () => {
      it('should return the expected result', () => {
        const result = simulateDiscounts(1, 1);

        expect(result.customerIDForDoubleDiscount).toEqual(1);
        expect(result.customerIDsForStandardDiscount).toEqual([]);
      });
    });

    describe('When N is greater than K', () => {
      it('should return the expected result', () => {
        const result = simulateDiscounts(5, 2);

        expect(result.customerIDForDoubleDiscount).toEqual(3);
        expect(result.customerIDsForStandardDiscount).toEqual([2, 4, 1, 5]);
      });
    });

    describe('When N is almost same as K', () => {
      it('should return the expected result', () => {
        const result = simulateDiscounts(5, 6);

        expect(result.customerIDForDoubleDiscount).toEqual(4);
        expect(result.customerIDsForStandardDiscount).toEqual([1, 3, 2, 5]);
      });
    });

    describe('When K is greater than N', () => {
      it('should return the expected result', () => {
        const result = simulateDiscounts(5, 15);

        expect(result.customerIDForDoubleDiscount).toEqual(1);
        expect(result.customerIDsForStandardDiscount).toEqual([5, 3, 2, 4]);
      });
    });

    describe('When N is very large', () => {
      it('can handle the load', () => {
        const result = simulateDiscounts(1000, 2);
        expect(result.customerIDForDoubleDiscount).toBeGreaterThan(0);
        expect(result.customerIDsForStandardDiscount).toHaveLength(999);
      });
    });

    describe('When K is very large', () => {
      it('can handle the load', () => {
        const result = simulateDiscounts(10, 1000);
        expect(result.customerIDForDoubleDiscount).toEqual(6);
        expect(result.customerIDsForStandardDiscount).toEqual([
          10, 1, 9, 7, 4, 3, 2, 5, 8,
        ]);
      });
    });
  });
});
