import TransactionSchema from "../schema/TransactionSchema"

export const getTransaction = (email) => {
  return TransactionSchema.findOne({ email });
};
