import Multer from "@koa/multer";
import Router from "@koa/router";
import { handleError } from "../utils";
import {
  addSanitizingHandler,
  deleteSanitizingHandler,
  listAllCategoriesHandler,
  listSanitizingHandler,
  runSanitizationHandler,
  updateSanitizingHandler,
  updateTransactionHandler,
  uploadHistoryHandler,
} from "../handlers";
import { listUnsanitizedForAccountHandler } from "../handlers/transactions/listUnsanitizedForAccountHandler";
import { listAllForAccountHandler } from "../handlers/transactions/listAllForAccountHandler";

export const transactionRoute = new Router({ prefix: "/transaction" });

const form = Multer();

transactionRoute.post(
  "/upload-history",
  form.fields([
    {
      name: "transactionRecord",
      maxCount: 1,
    },
    {
      name: "bank",
      maxCount: 1,
    },
    {
      name: "account",
      maxCount: 1,
    },
  ]),
  async (ctx, next) => {
    await handleError(async () => {
      await next();
      await uploadHistoryHandler(ctx);
    }, ctx);
  }
);

transactionRoute.get("/list-all", async (ctx, next) => {
  await handleError(async () => {
    await next();
    await listAllForAccountHandler(ctx);
  }, ctx);
});

transactionRoute.get("/list-unsanitized", async (ctx, next) => {
  await handleError(async () => {
    await next();
    await listUnsanitizedForAccountHandler(ctx);
  }, ctx);
});

transactionRoute.post("/add-sanitizing", async (ctx, next) => {
  await handleError(async () => {
    await next();
    await addSanitizingHandler(ctx);
  }, ctx);
});

transactionRoute.get("/list-sanitizing", async (ctx, next) => {
  await handleError(async () => {
    await next();
    await listSanitizingHandler(ctx);
  }, ctx);
});

transactionRoute.post("/update-sanitizing", async (ctx, next) => {
  await handleError(async () => {
    await next();
    await updateSanitizingHandler(ctx);
  }, ctx);
});

transactionRoute.post("/delete-sanitizing", async (ctx, next) => {
  await handleError(async () => {
    await next();
    await deleteSanitizingHandler(ctx);
  }, ctx);
});

transactionRoute.post("/update", async (ctx, next) => {
  await handleError(async () => {
    await next();
    await updateTransactionHandler(ctx);
  }, ctx);
});

transactionRoute.post("/run-sanitization", async (ctx, next) => {
  await handleError(async () => {
    await next();
    await runSanitizationHandler(ctx);
  }, ctx);
});

transactionRoute.get("/list-categories", async (ctx, next) => {
  await handleError(async () => {
    await next();
    await listAllCategoriesHandler(ctx);
  }, ctx);
});
