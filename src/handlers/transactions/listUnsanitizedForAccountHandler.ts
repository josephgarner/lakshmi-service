import { Context } from "koa";
import { getUserID } from "../../auth/getUserID";
import { listUnsanitizedForAccountDal } from "../../dal";
import { transactionData } from "../../db";

export const listUnsanitizedForAccountHandler = async (ctx: Context) => {
  const { account } = ctx.params;
  const rawData = await listUnsanitizedForAccountDal(account, getUserID(ctx));
  const allTransactions = rawData.map((transaction) => ({
    date: transaction.date,
    rawDescription: transaction.rawDescription,
    sanitizedDescription: transaction.sanitizedDescription,
    account: transaction.account,
    type: transaction.type,
    category: transaction.category,
    vendor: transaction.vendor,
    credit: transaction.credit,
    debit: transaction.debit,
    balance: transaction.balance,
  }));
  allTransactions.sort(
    (transA, transB) => transA.date.getTime() - transB.date.getTime()
  );
  ctx.body = { result: { transactions: allTransactions } };
};