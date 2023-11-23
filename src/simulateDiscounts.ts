interface ReturnType {
  customerIDForDoubleDiscount: number;
  customerIDsForStandardDiscount: number[];
}

/**
 * Simulate discounts for N customers with K customers getting double discount.
 * @param N Number of customers
 * @param K How many customers to skip at a time for the randomisation logic to work
 * @returns An object containing the customer ID for double discount and an array of customer IDs for standard discount in the order they were given the discounts.
 */
function simulateDiscounts(N: number, K: number): ReturnType {
  // Input validation
  if (N <= 0) {
    throw new Error('N should be larger than 0');
  } else if (!Number.isInteger(N)) {
    throw new Error('N should be an integer');
  } else if (K <= 0) {
    throw new Error('K should be larger than 0');
  } else if (!Number.isInteger(K)) {
    throw new Error('K should be an integer');
  }

  const customerIDsForStandardDiscount: number[] = [];

  // Initialise a customer IDs list to loop over
  const customerIDs = Array.from({ length: N }, (_, id) => id + 1);

  // We start from -1 because then we can simple add K to skip first K.
  // Eg: if K is 3, with customerIDs [1, 2, 3, 4, 5, 6], we would point to array index 2
  // which is ID 3. After we delete customer ID 3, we would decrement the curIndex by 1 and we end up at
  // index 1. Then we can add K to it again to get the next index, which means index 4 of the new array
  // which will be customer ID 6.
  let curIndex = -1;

  // Since we stop when customerIDs are below 2,
  // the one that is left at the end is the one with double discount.
  while (customerIDs.length > 1) {
    // Calculate the index of the customerID to delete.
    // We would need to do a mod operation because we might go out of bounds of the customerIDs array.
    // In that case, what this does it that it loops back to the beginning of the array and continues from there.
    // This also handles multiple loops, eg: if we have 5 customerIDs and K is 2, we would loop over twice.
    // The mod operation would be an extra operation when the looping doesn't occur, however instead of conditionally
    // applying this logic, we can just apply it all the time to make it look cleaner.
    const indexOfTheContactIDToDelete = (curIndex + K) % customerIDs.length;

    // Delete the contact ID from the array which returns an array of the deleted contact ID, which is an array of length 1 in this case.
    const deletedCustomerIDs = customerIDs.splice(
      indexOfTheContactIDToDelete,
      1
    );

    // Store the deleted contact ID in the array of customer IDs for standard discount.
    customerIDsForStandardDiscount.push(deletedCustomerIDs[0]);

    // Decrement indexOfTheContactIDToDelete by 1 and set it to curIndex to begin the next iteraction.
    // In case we are at the beginning of the array, we need to loop back to the end, hence the mod operation.
    curIndex =
      (indexOfTheContactIDToDelete - 1 + customerIDs.length) %
      customerIDs.length;
  }

  return {
    customerIDForDoubleDiscount: customerIDs[0],
    customerIDsForStandardDiscount,
  };
}

export default simulateDiscounts;
