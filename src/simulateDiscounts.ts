interface ReturnType {
  customerIDForDoubleDiscount: number;
  customerIDsForStandardDiscount: number[];
}

function simulateDiscounts(N: number, K: number): ReturnType {
  const customerIDsForStandardDiscount: number[] = [];

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
    // Assumption: There is a little ambiguity here. It says
    // "skips K customers and applies discount to the Kth customer and they are removed from the list."
    let nextIndex = curIndex + K;

    if (nextIndex >= customerIDs.length) {
      // If we are going out of bounds of the array
      // we need to get the mod (or the remainder) because if K is large enough -
      // especially once we have deleted many customer IDs
      // we will need to loop multiple times to land on the nextIndex.
      // This should work if we don't loop multiple times as well.
      nextIndex = (curIndex + K) % customerIDs.length;
    }

    // delete the item from array
    const deletedCustomerIDs = customerIDs.splice(nextIndex, 1);

    customerIDsForStandardDiscount.push(deletedCustomerIDs[0]);

    // Decrement nextIndex by 1 and set it to curIndex.
    // In case we are at the beginning of the array, we need to loop back to the end.
    curIndex = (nextIndex - 1 + customerIDs.length) % customerIDs.length;
  }

  return {
    customerIDForDoubleDiscount: customerIDs[0],
    customerIDsForStandardDiscount,
  };
}

export default simulateDiscounts;
